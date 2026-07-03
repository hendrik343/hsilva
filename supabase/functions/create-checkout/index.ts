import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14?target=deno'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const PLAN_KEYS = ['pilot', 'professional', 'business', 'enterprise'] as const
type PlanKey = typeof PLAN_KEYS[number]
const INTERVALS = ['monthly', 'yearly'] as const
type Interval = typeof INTERVALS[number]

const TRIAL_PERIOD_DAYS = 7

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const json = (body: Record<string, unknown>, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    })

  try {
    const SUPABASE_URL         = Deno.env.get('SUPABASE_URL')
    const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    const STRIPE_SECRET_KEY    = (Deno.env.get('STRIPE_SECRET_KEY') ?? '').replace(/[^\x21-\x7E]/g, '')
    const SITE_URL             = Deno.env.get('SITE_URL') || 'https://sgas-landing.vercel.app'

    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
      return json({ error: 'Configuração do servidor incompleta.', code: 'BILLING_SERVER_MISCONFIGURED' }, 503)
    }
    if (!STRIPE_SECRET_KEY) {
      return json({ error: 'Checkout ainda não configurado. Falta a chave Stripe.', code: 'BILLING_NOT_CONFIGURED' }, 503)
    }

    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return json({ error: 'Não autenticado.', code: 'BILLING_AUTH_REQUIRED' }, 401)
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    const token = authHeader.replace('Bearer ', '').trim()
    const { data: authResult, error: authError } = await supabase.auth.getUser(token)
    const user = authResult?.user
    if (authError || !user) {
      return json({ error: 'Sessão inválida. Faça login novamente.', code: 'BILLING_AUTH_INVALID' }, 401)
    }

    let body: { organizationId?: string; plan?: string; interval?: string } = {}
    try {
      body = await req.json()
    } catch (_) {
      return json({ error: 'Pedido inválido.', code: 'BILLING_BAD_REQUEST' }, 400)
    }

    const { organizationId, plan, interval } = body
    if (!organizationId || !plan || !interval) {
      return json({ error: 'Faltam campos obrigatórios (organizationId, plan, interval).', code: 'BILLING_BAD_REQUEST' }, 400)
    }
    if (!PLAN_KEYS.includes(plan as PlanKey)) {
      return json({ error: 'Plano desconhecido.', code: 'BILLING_BAD_REQUEST' }, 400)
    }
    if (!INTERVALS.includes(interval as Interval)) {
      return json({ error: 'Periodicidade desconhecida.', code: 'BILLING_BAD_REQUEST' }, 400)
    }

    // Confirmar que o user é membro da organização (nunca confiar no client_reference_id sem verificar)
    const { data: membership, error: memberError } = await supabase
      .from('organization_members')
      .select('id, role')
      .eq('organization_id', organizationId)
      .eq('user_id', user.id)
      .maybeSingle()

    if (memberError || !membership) {
      return json({ error: 'Não tens acesso a esta organização.', code: 'BILLING_FORBIDDEN' }, 403)
    }
    if (!['owner', 'manager'].includes(membership.role)) {
      return json({ error: 'Só o owner ou manager da organização pode gerir a subscrição.', code: 'BILLING_FORBIDDEN' }, 403)
    }

    const priceEnvKey = `STRIPE_PRICE_${plan.toUpperCase()}_${interval.toUpperCase()}`
    const priceId = Deno.env.get(priceEnvKey)
    if (!priceId) {
      console.error('Missing price env var:', priceEnvKey)
      return json({ error: 'Plano ainda não disponível para checkout.', code: 'BILLING_PLAN_UNAVAILABLE' }, 503)
    }

    // Reutilizar stripe_customer_id existente para a org, se houver
    const { data: existingSub } = await supabase
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('organization_id', organizationId)
      .maybeSingle()

    const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' })

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      client_reference_id: organizationId,
      customer: existingSub?.stripe_customer_id || undefined,
      customer_email: existingSub?.stripe_customer_id ? undefined : user.email,
      subscription_data: {
        trial_period_days: TRIAL_PERIOD_DAYS,
        metadata: { organization_id: organizationId, plan },
      },
      metadata: { organization_id: organizationId, plan, interval },
      success_url: `${SITE_URL}/sgas-pro.html?billing=success`,
      cancel_url: `${SITE_URL}/sgas-pro.html?billing=cancelled`,
    })

    return json({ url: session.url })

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('create-checkout uncaught error:', msg)
    return json({ error: 'Não foi possível iniciar o checkout. Tente novamente.', code: 'BILLING_INTERNAL_ERROR' }, 500)
  }
})
