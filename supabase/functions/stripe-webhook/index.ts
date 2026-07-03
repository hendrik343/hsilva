import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14?target=deno'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

// Mapeia price_id -> plan_key, lido dos mesmos secrets que create-checkout usa.
function buildPriceToPlanMap(): Record<string, string> {
  const plans = ['pilot', 'professional', 'business', 'enterprise']
  const intervals = ['monthly', 'yearly']
  const map: Record<string, string> = {}
  for (const plan of plans) {
    for (const interval of intervals) {
      const priceId = Deno.env.get(`STRIPE_PRICE_${plan.toUpperCase()}_${interval.toUpperCase()}`)
      if (priceId) map[priceId] = plan
    }
  }
  return map
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const SUPABASE_URL          = Deno.env.get('SUPABASE_URL')
    const SUPABASE_SERVICE_KEY  = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    const STRIPE_SECRET_KEY     = (Deno.env.get('STRIPE_SECRET_KEY') ?? '').replace(/[^\x21-\x7E]/g, '')
    const STRIPE_WEBHOOK_SECRET = (Deno.env.get('STRIPE_WEBHOOK_SECRET') ?? '').replace(/[^\x21-\x7E]/g, '')

    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY || !STRIPE_SECRET_KEY) {
      console.error('stripe-webhook: server env incomplete')
      return new Response(JSON.stringify({ error: 'Server misconfigured' }), { status: 503, headers: corsHeaders })
    }
    if (!STRIPE_WEBHOOK_SECRET) {
      console.error('stripe-webhook: STRIPE_WEBHOOK_SECRET not set — refusing to process unverified events')
      return new Response(JSON.stringify({ error: 'Webhook not configured' }), { status: 503, headers: corsHeaders })
    }

    const signature = req.headers.get('stripe-signature')
    if (!signature) {
      return new Response(JSON.stringify({ error: 'Missing signature' }), { status: 400, headers: corsHeaders })
    }

    const rawBody = await req.text()
    const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' })

    let event: Stripe.Event
    try {
      event = await stripe.webhooks.constructEventAsync(rawBody, signature, STRIPE_WEBHOOK_SECRET)
    } catch (err) {
      console.error('stripe-webhook: signature verification failed', err instanceof Error ? err.message : err)
      return new Response(JSON.stringify({ error: 'Invalid signature' }), { status: 400, headers: corsHeaders })
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    const priceToPlan = buildPriceToPlanMap()

    let organizationId: string | null = null

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        organizationId = session.client_reference_id || session.metadata?.organization_id || null
        const subscriptionId = typeof session.subscription === 'string' ? session.subscription : session.subscription?.id
        const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id
        const plan = session.metadata?.plan || null

        if (organizationId) {
          await supabase.from('subscriptions').upsert({
            organization_id: organizationId,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            plan,
            status: 'trialing',
          }, { onConflict: 'organization_id' })
        }
        break
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        organizationId = sub.metadata?.organization_id || null
        const priceId = sub.items.data[0]?.price?.id
        const plan = priceId ? priceToPlan[priceId] : undefined

        if (organizationId) {
          await supabase.from('subscriptions').upsert({
            organization_id: organizationId,
            stripe_customer_id: typeof sub.customer === 'string' ? sub.customer : sub.customer?.id,
            stripe_subscription_id: sub.id,
            plan: plan ?? undefined,
            status: event.type === 'customer.subscription.deleted' ? 'canceled' : sub.status,
            current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
            trial_end: sub.trial_end ? new Date(sub.trial_end * 1000).toISOString() : null,
          }, { onConflict: 'organization_id' })
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const subId = typeof invoice.subscription === 'string' ? invoice.subscription : invoice.subscription?.id
        if (subId) {
          const { data: existing } = await supabase
            .from('subscriptions')
            .select('organization_id')
            .eq('stripe_subscription_id', subId)
            .maybeSingle()
          organizationId = existing?.organization_id ?? null
          if (organizationId) {
            await supabase.from('subscriptions').update({ status: 'past_due' }).eq('organization_id', organizationId)
          }
        }
        break
      }

      default:
        // Outros eventos: só log, sem acção.
        break
    }

    await supabase.from('billing_events').insert({
      organization_id: organizationId,
      stripe_event_id: event.id,
      event_type: event.type,
      payload: event.data.object as unknown as Record<string, unknown>,
    })

    return new Response(JSON.stringify({ received: true }), { status: 200, headers: corsHeaders })

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('stripe-webhook uncaught error:', msg)
    return new Response(JSON.stringify({ error: 'Internal error' }), { status: 500, headers: corsHeaders })
  }
})
