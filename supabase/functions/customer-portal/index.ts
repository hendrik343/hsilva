import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14?target=deno'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

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
      return json({ error: 'Portal de facturação ainda não configurado.', code: 'BILLING_NOT_CONFIGURED' }, 503)
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

    let body: { organizationId?: string } = {}
    try {
      body = await req.json()
    } catch (_) {
      return json({ error: 'Pedido inválido.', code: 'BILLING_BAD_REQUEST' }, 400)
    }

    const { organizationId } = body
    if (!organizationId) {
      return json({ error: 'Falta organizationId.', code: 'BILLING_BAD_REQUEST' }, 400)
    }

    const { data: membership } = await supabase
      .from('organization_members')
      .select('id, role')
      .eq('organization_id', organizationId)
      .eq('user_id', user.id)
      .maybeSingle()

    if (!membership || !['owner', 'manager'].includes(membership.role)) {
      return json({ error: 'Não tens acesso à facturação desta organização.', code: 'BILLING_FORBIDDEN' }, 403)
    }

    const { data: sub } = await supabase
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('organization_id', organizationId)
      .maybeSingle()

    if (!sub?.stripe_customer_id) {
      return json({ error: 'Esta organização ainda não tem uma subscrição activa.', code: 'BILLING_NO_SUBSCRIPTION' }, 404)
    }

    const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' })
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: sub.stripe_customer_id,
      return_url: `${SITE_URL}/sgas-pro.html`,
    })

    return json({ url: portalSession.url })

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('customer-portal uncaught error:', msg)
    return json({ error: 'Não foi possível abrir o portal de facturação.', code: 'BILLING_INTERNAL_ERROR' }, 500)
  }
})
