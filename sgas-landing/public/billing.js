(function () {
  'use strict';

  var PLAN_LIMITS = {
    pilot:        { maxProjects: 1,  features: ['advisory-assisted'] },
    professional: { maxProjects: 3,  features: [] },
    business:     { maxProjects: 10, features: ['relatorios-avancados'] },
    enterprise:   { maxProjects: Infinity, features: ['sso-roadmap'] },
    trial:        { maxProjects: 1,  features: [] } // sem subscrição activa — mesmo limite do pilot
  };

  var state = {
    subscription: null,
    planLimits: PLAN_LIMITS.trial,
    loaded: false
  };

  function getClient() {
    if (typeof window.getSupaClient === 'function') return window.getSupaClient();
    if (window.SGAS_AUTH && window.SGAS_AUTH.client) return window.SGAS_AUTH.client;
    return null;
  }

  function edgeUrl(fn) {
    var base = (window.SGAS_CONFIG && window.SGAS_CONFIG.SUPABASE_URL) || 'https://txkyedcqancetuoxtapf.supabase.co';
    return base + '/functions/v1/' + fn;
  }

  async function getSessionToken(client) {
    if (!client || !client.auth) return null;
    var res = await client.auth.getSession();
    return res && res.data && res.data.session ? res.data.session.access_token : null;
  }

  async function refresh() {
    try {
      var client = getClient();
      var orgId = (window.SGAS_SESSION && window.SGAS_SESSION.orgId) || null;
      if (!client || !orgId || window.SGAS_DEMO_ACTIVE) {
        state.subscription = null;
        state.planLimits = PLAN_LIMITS.trial;
        state.loaded = true;
        return state;
      }

      var res = await client
        .from('subscriptions')
        .select('plan, status, current_period_end, trial_end')
        .eq('organization_id', orgId)
        .maybeSingle();

      if (res.error) throw res.error;

      state.subscription = res.data || null;
      var planKey = state.subscription && state.subscription.plan ? state.subscription.plan : 'trial';
      state.planLimits = PLAN_LIMITS[planKey] || PLAN_LIMITS.trial;
      state.loaded = true;
    } catch (err) {
      console.warn('[SGAS Billing] refresh falhou; a assumir limites de trial.', err);
      state.subscription = null;
      state.planLimits = PLAN_LIMITS.trial;
      state.loaded = true;
    }
    return state;
  }

  function isSubscriptionActive() {
    var s = state.subscription;
    return !!(s && (s.status === 'active' || s.status === 'trialing'));
  }

  async function startCheckout(planKey, interval) {
    var client = getClient();
    var orgId = window.SGAS_SESSION && window.SGAS_SESSION.orgId;
    var token = await getSessionToken(client);
    if (!token || !orgId) {
      alert('Sessão inválida. Faz login novamente antes de escolher um plano.');
      return;
    }
    try {
      var res = await fetch(edgeUrl('create-checkout'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        body: JSON.stringify({ organizationId: orgId, plan: planKey, interval: interval || 'monthly' })
      });
      var data = await res.json().catch(function () { return {}; });
      if (!res.ok || !data.url) {
        alert(data.error || 'Não foi possível iniciar o checkout. Tenta novamente.');
        return;
      }
      window.location.href = data.url;
    } catch (err) {
      console.error('[SGAS Billing] startCheckout error', err);
      alert('Não foi possível ligar ao checkout. Verifica a ligação e tenta novamente.');
    }
  }

  async function openPortal() {
    var client = getClient();
    var orgId = window.SGAS_SESSION && window.SGAS_SESSION.orgId;
    var token = await getSessionToken(client);
    if (!token || !orgId) {
      alert('Sessão inválida. Faz login novamente.');
      return;
    }
    try {
      var res = await fetch(edgeUrl('customer-portal'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        body: JSON.stringify({ organizationId: orgId })
      });
      var data = await res.json().catch(function () { return {}; });
      if (!res.ok || !data.url) {
        alert(data.error || 'Ainda não há uma subscrição activa para gerir.');
        return;
      }
      window.location.href = data.url;
    } catch (err) {
      console.error('[SGAS Billing] openPortal error', err);
      alert('Não foi possível abrir o portal de facturação.');
    }
  }

  window.SGAS_BILLING = {
    refresh: refresh,
    isSubscriptionActive: isSubscriptionActive,
    startCheckout: startCheckout,
    openPortal: openPortal,
    get subscription() { return state.subscription; },
    get planLimits() { return state.planLimits; },
    get loaded() { return state.loaded; }
  };

  function boot() {
    refresh();
    if (window.SGAS_AUTH && typeof window.SGAS_AUTH.onChange === 'function' && !window.SGAS_AUTH._sgasBillingHooked) {
      window.SGAS_AUTH._sgasBillingHooked = true;
      window.SGAS_AUTH.onChange(function () { setTimeout(refresh, 250); });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
