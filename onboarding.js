(function () {
  'use strict';

  var STORAGE_PREFIX = 'sgas_onboarding_completed_';
  var SNOOZE_PREFIX = 'sgas_onboarding_snoozed_';
  var state = {
    step: 0,
    orgId: null,
    opening: false,
    completed: false
  };

  function $(id) {
    return document.getElementById(id);
  }

  function getClient() {
    if (typeof window.getSupaClient === 'function') return window.getSupaClient();
    if (window.SGAS_AUTH && window.SGAS_AUTH.client) return window.SGAS_AUTH.client;
    return null;
  }

  function storageKey(orgId) {
    return STORAGE_PREFIX + orgId;
  }

  function snoozeKey(orgId) {
    return SNOOZE_PREFIX + orgId;
  }

  function isLocallyComplete(orgId) {
    try {
      return window.localStorage.getItem(storageKey(orgId)) === 'true';
    } catch (_) {
      return false;
    }
  }

  function setLocalComplete(orgId) {
    try {
      window.localStorage.setItem(storageKey(orgId), 'true');
    } catch (_) {}
  }

  function isSnoozed(orgId) {
    try {
      return window.sessionStorage.getItem(snoozeKey(orgId)) === 'true';
    } catch (_) {
      return false;
    }
  }

  function setSnoozed(orgId) {
    try {
      window.sessionStorage.setItem(snoozeKey(orgId), 'true');
    } catch (_) {}
  }

  async function resolveOrgId(client) {
    if (window.SGAS_SESSION && window.SGAS_SESSION.orgId) return window.SGAS_SESSION.orgId;
    if (!client || !client.auth || typeof client.auth.getUser !== 'function') return null;

    var userRes = await client.auth.getUser();
    var user = userRes && userRes.data ? userRes.data.user : null;
    if (!user) return null;

    var memRes = await client
      .from('organization_members')
      .select('organization_id')
      .eq('user_id', user.id)
      .is('suspended_at', null)
      .limit(1)
      .maybeSingle();

    if (memRes.error) return null;
    return memRes.data ? memRes.data.organization_id : null;
  }

  async function readOnboardingCompleted(client, orgId) {
    if (!client || !orgId) return false;
    if (isLocallyComplete(orgId)) return true;

    try {
      var res = await client
        .from('organizations')
        .select('onboarding_completed')
        .eq('id', orgId)
        .maybeSingle();

      if (res.error) return false;
      return !!(res.data && res.data.onboarding_completed);
    } catch (_) {
      return false;
    }
  }

  async function markOnboardingCompleted(client, orgId) {
    if (!orgId) return;
    setLocalComplete(orgId);

    if (!client) return;
    try {
      await client
        .from('organizations')
        .update({ onboarding_completed: true })
        .eq('id', orgId);
    } catch (_) {}
  }

  function updateSlides() {
    var slides = Array.from(document.querySelectorAll('.sgas-onboarding-slide'));
    var dots = Array.from(document.querySelectorAll('.sgas-onboarding-dot'));
    var next = $('sgas-onboarding-next');
    var count = $('sgas-onboarding-count');

    slides.forEach(function (slide, index) {
      slide.classList.toggle('is-active', index === state.step);
      slide.setAttribute('aria-hidden', index === state.step ? 'false' : 'true');
    });

    dots.forEach(function (dot, index) {
      dot.classList.toggle('is-active', index === state.step);
      dot.setAttribute('aria-current', index === state.step ? 'step' : 'false');
    });

    if (count) count.textContent = String(state.step + 1) + '/3';
    if (next) next.textContent = state.step === 2 ? 'Terminado' : 'Seguinte';
  }

  function setVisible(visible) {
    var overlay = $('sgas-onboarding-overlay');
    if (!overlay) return;

    overlay.classList.toggle('is-open', visible);
    overlay.setAttribute('aria-hidden', visible ? 'false' : 'true');

    if (visible) {
      var next = $('sgas-onboarding-next');
      window.setTimeout(function () {
        if (next) next.focus();
      }, 80);
    }
  }

  function showOnboarding(orgId) {
    if (state.completed || state.opening) return;
    if (document.body.classList.contains('sgas-trial-expired-active')) return;
    if (isSnoozed(orgId)) return;

    state.orgId = orgId;
    state.step = 0;
    state.opening = true;
    var note = $('sgas-onboarding-note');
    if (note) note.textContent = '';
    updateSlides();
    setVisible(true);
  }

  function hideOnboarding() {
    state.opening = false;
    setVisible(false);
  }

  function softClose() {
    if (state.orgId) setSnoozed(state.orgId);
    var note = $('sgas-onboarding-note');
    if (note) {
      note.textContent = 'Podes voltar a este tour na tua página de perfil.';
      note.classList.add('is-visible');
    }
    window.setTimeout(function () {
      hideOnboarding();
      if (note) note.classList.remove('is-visible');
    }, 1500);
  }

  async function nextStep() {
    if (state.step < 2) {
      state.step += 1;
      updateSlides();
      return;
    }

    state.completed = true;
    hideOnboarding();
    await markOnboardingCompleted(getClient(), state.orgId);
  }

  function previousStep() {
    if (state.step === 0) return;
    state.step -= 1;
    updateSlides();
  }

  async function maybeOpenOnboarding() {
    if (state.completed || state.opening) return;

    var overlay = $('sgas-onboarding-overlay');
    if (!overlay) return;

    var client = getClient();
    var orgId = await resolveOrgId(client);
    if (!orgId) return;

    var completed = await readOnboardingCompleted(client, orgId);
    if (completed) {
      state.completed = true;
      return;
    }

    showOnboarding(orgId);
  }

  function installEvents() {
    var next = $('sgas-onboarding-next');
    var prev = $('sgas-onboarding-prev');
    var close = $('sgas-onboarding-close');
    var overlay = $('sgas-onboarding-overlay');

    if (next && !next.dataset.sgasOnboardingBound) {
      next.dataset.sgasOnboardingBound = 'true';
      next.addEventListener('click', nextStep);
    }

    if (prev && !prev.dataset.sgasOnboardingBound) {
      prev.dataset.sgasOnboardingBound = 'true';
      prev.addEventListener('click', previousStep);
    }

    if (close && !close.dataset.sgasOnboardingBound) {
      close.dataset.sgasOnboardingBound = 'true';
      close.addEventListener('click', softClose);
    }

    if (overlay && !overlay.dataset.sgasOnboardingBound) {
      overlay.dataset.sgasOnboardingBound = 'true';
      overlay.addEventListener('click', function (event) {
        if (event.target === overlay) softClose();
      });
    }

    document.addEventListener('keydown', function (event) {
      var isOpen = overlay && overlay.classList.contains('is-open');
      if (!isOpen) return;
      if (event.key === 'Escape') softClose();
      if (event.key === 'ArrowRight') nextStep();
      if (event.key === 'ArrowLeft') previousStep();
    });
  }

  function installAuthHooks() {
    if (window.SGAS_AUTH && typeof window.SGAS_AUTH.onChange === 'function' && !window.SGAS_AUTH._sgasOnboardingHooked) {
      window.SGAS_AUTH._sgasOnboardingHooked = true;
      window.SGAS_AUTH.onChange(function () {
        window.setTimeout(maybeOpenOnboarding, 700);
      });
    }

    if (typeof window.onAuthSuccess === 'function' && !window.onAuthSuccess._sgasOnboardingPatched) {
      var originalAuthSuccess = window.onAuthSuccess;
      var patchedAuthSuccess = async function () {
        var result = await originalAuthSuccess.apply(this, arguments);
        window.setTimeout(maybeOpenOnboarding, 700);
        return result;
      };
      patchedAuthSuccess._sgasOnboardingPatched = true;
      window.onAuthSuccess = patchedAuthSuccess;
    }
  }

  function boot() {
    installEvents();
    installAuthHooks();
    updateSlides();
    window.setTimeout(maybeOpenOnboarding, 900);
    window.setTimeout(maybeOpenOnboarding, 2400);
    window.setTimeout(maybeOpenOnboarding, 5000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
