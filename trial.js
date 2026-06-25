(function () {
  'use strict';

  var ACTIVE_MODULES = new Set(['dashboard', 'avaliacao', 'ps', 'esap', 'reclamacoes']);
  var COMING_SOON_TEXT = 'Disponível em breve';
  var EMPTY_TEXT = 'Ainda não há registos. Cria o primeiro.';
  var MAILTO_CONTINUAR = 'mailto:geral@hsilva.org?subject=SGAS%20Pro%20%E2%80%94%20continuar%20ap%C3%B3s%20trial';
  var DAY_MS = 24 * 60 * 60 * 1000;
  var emptyStateScheduled = false;
  var trialRefreshTimer = null;

  function injectStyles() {
    if (document.getElementById('sgas-trial-styles')) return;
    var style = document.createElement('style');
    style.id = 'sgas-trial-styles';
    style.textContent = [
      '.main{padding-bottom:34px;}',
      '#sgas-trial-banner,#sgas-network-error{display:none;align-items:center;justify-content:center;gap:8px;margin:0;padding:8px 18px;border-bottom:1px solid var(--border);font-size:12px;font-weight:600;line-height:1.35;flex-shrink:0;}',
      '#sgas-trial-banner{background:#E1F5EE;color:#0D2E1E;border-color:#A7F3D0;}',
      '#sgas-trial-banner.urgent{background:#FFFBEB;color:#92400E;border-color:#FCD34D;}',
      '#sgas-network-error{background:#FEF2F2;color:#991B1B;border-color:#FCA5A5;}',
      '.nav-item.sgas-coming-soon{opacity:.56;cursor:not-allowed;}',
      '.nav-item.sgas-coming-soon:hover{background:transparent;color:var(--sidebar-text);}',
      '.nav-item.sgas-coming-soon .nav-badge:not(.sgas-coming-soon-badge){display:none;}',
      '.nav-badge.sgas-coming-soon-badge{background:rgba(255,255,255,.16);color:rgba(255,255,255,.86);border:1px solid rgba(255,255,255,.16);font-size:9px;padding:1px 6px;}',
      '.sgas-empty-row td{text-align:center!important;padding:28px 16px!important;color:var(--text-2)!important;background:#FAFAFA!important;font-size:13px!important;}',
      '#sgas-legal-disclaimer{position:fixed;left:240px;right:0;bottom:0;z-index:35;background:rgba(255,255,255,.94);border-top:1px solid var(--border);color:var(--text-2);font-size:11px;line-height:1.35;text-align:center;padding:6px 14px;box-shadow:0 -2px 8px rgba(15,23,42,.04);}',
      '#sgas-coming-soon-toast{position:fixed;right:20px;bottom:48px;z-index:12000;background:#0D2E1E;color:#fff;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:10px 12px;font-size:12px;font-weight:600;box-shadow:0 10px 24px rgba(13,46,30,.22);opacity:0;transform:translateY(6px);pointer-events:none;transition:opacity .18s ease,transform .18s ease;}',
      '#sgas-coming-soon-toast.show{opacity:1;transform:translateY(0);}',
      '#sgas-trial-expired{position:fixed;inset:0;z-index:9000;background:rgba(13,46,30,.96);display:none;align-items:center;justify-content:center;padding:24px;}',
      'body.sgas-trial-expired-active #sgas-trial-expired{display:flex;}',
      'body.sgas-trial-expired-active .sidebar,body.sgas-trial-expired-active .main{pointer-events:none;user-select:none;}',
      '.sgas-trial-expired-card{width:min(540px,100%);background:#fff;border:1px solid rgba(255,255,255,.28);border-radius:12px;padding:28px;box-shadow:0 24px 80px rgba(0,0,0,.28);text-align:left;}',
      '.sgas-trial-kicker{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#1D9E75;font-weight:800;margin-bottom:10px;}',
      '.sgas-trial-expired-card h2{font-size:24px;line-height:1.15;color:#0D2E1E;margin:0 0 10px;font-weight:800;}',
      '.sgas-trial-expired-card p{font-size:14px;line-height:1.55;color:#374151;margin:0 0 18px;}',
      '.sgas-trial-actions{display:flex;gap:10px;align-items:center;flex-wrap:wrap;}',
      '.sgas-trial-cta{display:inline-flex;align-items:center;justify-content:center;padding:10px 16px;border-radius:8px;background:#1D9E75;color:#fff;text-decoration:none;font-size:13px;font-weight:700;border:1px solid #1D9E75;}',
      '.sgas-trial-cta:hover{background:#0F6E56;border-color:#0F6E56;}',
      '@media(max-width:760px){#sgas-legal-disclaimer{left:0;}#sgas-trial-banner,#sgas-network-error{padding:8px 12px;text-align:center;}.sgas-trial-expired-card{padding:22px;}.sgas-trial-expired-card h2{font-size:21px;}}'
    ].join('\n');
    document.head.appendChild(style);
  }

  function ensureMainNotice(id, text) {
    var main = document.querySelector('.main');
    if (!main) return null;
    var el = document.getElementById(id);
    if (!el) {
      el = document.createElement('div');
      el.id = id;
      el.setAttribute('role', 'status');
      var topbar = main.querySelector('.topbar');
      main.insertBefore(el, topbar || main.firstChild);
    }
    if (text) el.textContent = text;
    return el;
  }

  function injectScaffolding() {
    ensureMainNotice('sgas-trial-banner', '');
    ensureMainNotice('sgas-network-error', 'Não foi possível ligar. Tenta recarregar.');

    if (!document.getElementById('sgas-legal-disclaimer')) {
      var legal = document.createElement('div');
      legal.id = 'sgas-legal-disclaimer';
      legal.setAttribute('role', 'contentinfo');
      legal.textContent = 'SGAS Pro não substitui certificação oficial IFC/World Bank nem aconselhamento jurídico.';
      document.body.appendChild(legal);
    }

    if (!document.getElementById('sgas-coming-soon-toast')) {
      var toast = document.createElement('div');
      toast.id = 'sgas-coming-soon-toast';
      toast.textContent = COMING_SOON_TEXT;
      document.body.appendChild(toast);
    }

    if (!document.getElementById('sgas-trial-expired')) {
      var overlay = document.createElement('div');
      overlay.id = 'sgas-trial-expired';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.setAttribute('aria-labelledby', 'sgas-trial-expired-title');
      overlay.innerHTML = [
        '<section class="sgas-trial-expired-card">',
        '<div class="sgas-trial-kicker">Demonstração SGAS Pro</div>',
        '<h2 id="sgas-trial-expired-title">O teu período de demonstração terminou</h2>',
        '<p>Para continuar a usar o SGAS Pro com a tua equipa, fala connosco e activamos o plano certo para a tua organização.</p>',
        '<div class="sgas-trial-actions">',
        '<a class="sgas-trial-cta" href="' + MAILTO_CONTINUAR + '">Falar connosco</a>',
        '</div>',
        '</section>'
      ].join('');
      document.body.appendChild(overlay);
    }
  }

  function parseNavId(item) {
    var onclick = item && item.getAttribute('onclick');
    var match = onclick && onclick.match(/nav\('([^']+)'/);
    return match ? match[1] : null;
  }

  function isComingSoon(id) {
    return !!id && !ACTIVE_MODULES.has(id);
  }

  function showComingSoonToast() {
    var toast = document.getElementById('sgas-coming-soon-toast');
    if (!toast) return;
    toast.classList.add('show');
    clearTimeout(toast._sgasTimer);
    toast._sgasTimer = setTimeout(function () {
      toast.classList.remove('show');
    }, 1800);
  }

  function markComingSoonModules() {
    document.querySelectorAll('.nav-item[onclick]').forEach(function (item) {
      var id = parseNavId(item);
      if (!isComingSoon(id)) return;

      item.classList.add('sgas-coming-soon');
      item.dataset.sgasComingSoon = 'true';
      item.setAttribute('aria-disabled', 'true');
      item.setAttribute('title', COMING_SOON_TEXT);

      if (!item.querySelector('.sgas-coming-soon-badge')) {
        var badge = document.createElement('span');
        badge.className = 'nav-badge sgas-coming-soon-badge';
        badge.textContent = 'Em breve';
        item.appendChild(badge);
      }
    });
  }

  function protectComingSoonClicks() {
    if (document.body.dataset.sgasComingSoonClicks === 'installed') return;
    document.body.dataset.sgasComingSoonClicks = 'installed';
    document.addEventListener('click', function (event) {
      var item = event.target.closest && event.target.closest('.nav-item.sgas-coming-soon');
      if (!item) return;
      event.preventDefault();
      event.stopPropagation();
      showComingSoonToast();
    }, true);
  }

  function patchNavFunction() {
    if (typeof window.nav !== 'function' || window.nav._sgasTrialPatched) return;
    var originalNav = window.nav;
    var patched = function (id, el) {
      if (isComingSoon(id)) {
        markComingSoonModules();
        showComingSoonToast();
        return;
      }
      return originalNav.apply(this, arguments);
    };
    patched._sgasTrialPatched = true;
    patched._sgasOriginal = originalNav;
    window.nav = patched;
  }

  function ensureActivePageAllowed() {
    var activeItem = document.querySelector('.nav-item.active');
    var activeId = parseNavId(activeItem);
    if (!isComingSoon(activeId)) return;
    var dash = document.querySelector('.nav-item[onclick*="\'dashboard\'"]');
    if (typeof window.nav === 'function') {
      window.nav('dashboard', dash);
    }
  }

  function showNetworkError() {
    var el = ensureMainNotice('sgas-network-error', 'Não foi possível ligar. Tenta recarregar.');
    if (el) el.style.display = 'flex';
  }

  function hideNetworkError() {
    var el = document.getElementById('sgas-network-error');
    if (el) el.style.display = 'none';
  }

  function looksLikeNetworkError(err) {
    var message = '';
    if (typeof err === 'string') message = err;
    else if (err && err.message) message = err.message;
    else if (err && err.error_description) message = err.error_description;
    message = String(message || '').toLowerCase();
    return message.includes('failed to fetch') ||
      message.includes('network') ||
      message.includes('load failed') ||
      message.includes('timeout') ||
      message.includes('connection') ||
      message.includes('fetch');
  }

  function isMissingSchemaError(err) {
    if (!err) return false;
    var code = String(err.code || '');
    var message = String(err.message || err.details || '').toLowerCase();
    return code === '42703' ||
      code === '42P01' ||
      code === 'PGRST204' ||
      message.includes('trial_ends_at') ||
      message.includes('organization_settings') ||
      message.includes('schema cache') ||
      message.includes('could not find') ||
      message.includes('column') ||
      message.includes('relation');
  }

  function getClient() {
    if (typeof window.getSupaClient === 'function') return window.getSupaClient();
    if (window.SGAS_AUTH && window.SGAS_AUTH.client) return window.SGAS_AUTH.client;
    return null;
  }

  async function readOrgId(client) {
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

    if (memRes.error) throw memRes.error;
    return memRes.data ? memRes.data.organization_id : null;
  }

  async function readTrialEndFromOrganizations(client, orgId) {
    var res = await client
      .from('organizations')
      .select('trial_ends_at')
      .eq('id', orgId)
      .maybeSingle();
    if (res.error) throw res.error;
    return res.data ? res.data.trial_ends_at : null;
  }

  async function readTrialEndFromSettings(client, orgId) {
    var res = await client
      .from('organization_settings')
      .select('trial_ends_at')
      .eq('organization_id', orgId)
      .maybeSingle();
    if (res.error) throw res.error;
    return res.data ? res.data.trial_ends_at : null;
  }

  async function readTrialEnd(client, orgId) {
    try {
      return await readTrialEndFromOrganizations(client, orgId);
    } catch (err) {
      if (!isMissingSchemaError(err)) throw err;
    }

    try {
      return await readTrialEndFromSettings(client, orgId);
    } catch (err) {
      if (isMissingSchemaError(err)) return null;
      throw err;
    }
  }

  function clearTrialUI() {
    var banner = document.getElementById('sgas-trial-banner');
    if (banner) {
      banner.style.display = 'none';
      banner.classList.remove('urgent');
      banner.textContent = '';
    }
    document.body.classList.remove('sgas-trial-expired-active');
    var main = document.querySelector('.main');
    if (main) main.removeAttribute('aria-hidden');
  }

  function setTrialBanner(endDate) {
    var banner = ensureMainNotice('sgas-trial-banner', '');
    if (!banner) return;
    var diff = endDate.getTime() - Date.now();
    var days = Math.max(0, Math.ceil(diff / DAY_MS));
    var text = days === 0
      ? 'Demonstração — termina hoje'
      : days === 1
        ? 'Demonstração — falta 1 dia'
        : 'Demonstração — faltam ' + days + ' dias';

    banner.textContent = text;
    banner.classList.toggle('urgent', days <= 1);
    banner.style.display = 'flex';
    document.body.classList.remove('sgas-trial-expired-active');
  }

  function setTrialExpired() {
    var banner = document.getElementById('sgas-trial-banner');
    if (banner) banner.style.display = 'none';
    document.body.classList.add('sgas-trial-expired-active');
    var main = document.querySelector('.main');
    if (main) main.setAttribute('aria-hidden', 'true');
  }

  async function refreshTrialState() {
    try {
      var client = getClient();
      if (!client) {
        clearTrialUI();
        return;
      }

      var orgId = await readOrgId(client);
      if (!orgId) {
        clearTrialUI();
        return;
      }

      var trialEnd = await readTrialEnd(client, orgId);
      if (!trialEnd) {
        clearTrialUI();
        hideNetworkError();
        return;
      }

      var endDate = new Date(trialEnd);
      if (Number.isNaN(endDate.getTime())) {
        clearTrialUI();
        return;
      }

      hideNetworkError();
      if (Date.now() > endDate.getTime()) {
        setTrialExpired();
      } else {
        setTrialBanner(endDate);
      }
    } catch (err) {
      if (looksLikeNetworkError(err)) showNetworkError();
      clearTrialUI();
      console.warn('[SGAS Trial] Leitura do trial falhou; app mantida activa.', err);
    }
  }

  function scheduleTrialRefresh(delay) {
    clearTimeout(trialRefreshTimer);
    trialRefreshTimer = setTimeout(refreshTrialState, delay || 0);
  }

  function installAuthHooks() {
    if (window.SGAS_AUTH && typeof window.SGAS_AUTH.onChange === 'function' && !window.SGAS_AUTH._sgasTrialHooked) {
      window.SGAS_AUTH._sgasTrialHooked = true;
      window.SGAS_AUTH.onChange(function () {
        scheduleTrialRefresh(250);
      });
    }

    if (typeof window.onAuthSuccess === 'function' && !window.onAuthSuccess._sgasTrialPatched) {
      var originalAuthSuccess = window.onAuthSuccess;
      var patchedAuthSuccess = async function () {
        var result = await originalAuthSuccess.apply(this, arguments);
        scheduleTrialRefresh(250);
        return result;
      };
      patchedAuthSuccess._sgasTrialPatched = true;
      window.onAuthSuccess = patchedAuthSuccess;
    }
  }

  function safeGlobalArrayLength(name) {
    try {
      if (name === 'esapData' && typeof esapData !== 'undefined' && Array.isArray(esapData)) return esapData.length;
      if (name === 'complaints' && typeof complaints !== 'undefined' && Array.isArray(complaints)) return complaints.length;
    } catch (err) {
      return null;
    }
    return null;
  }

  function setTableEmpty(tbodyId, colspan) {
    var tbody = document.getElementById(tbodyId);
    if (!tbody) return;
    var existing = tbody.querySelector('.sgas-empty-row');
    if (existing) return;
    tbody.innerHTML = '<tr class="sgas-empty-row"><td colspan="' + colspan + '">' + EMPTY_TEXT + '</td></tr>';
  }

  function applyEmptyStates() {
    var esapLength = safeGlobalArrayLength('esapData');
    var complaintsLength = safeGlobalArrayLength('complaints');
    var esapBody = document.getElementById('esap-tbody');
    var complaintBody = document.getElementById('complaint-tbody');

    if (esapBody && (esapLength === 0 || (!esapBody.textContent.trim() && esapLength !== null))) {
      setTableEmpty('esap-tbody', 12);
    }

    if (complaintBody && (complaintsLength === 0 || !complaintBody.textContent.trim())) {
      setTableEmpty('complaint-tbody', 15);
    }
  }

  function scheduleEmptyStates() {
    if (emptyStateScheduled) return;
    emptyStateScheduled = true;
    window.requestAnimationFrame(function () {
      emptyStateScheduled = false;
      applyEmptyStates();
    });
  }

  function patchRenderFunction(name) {
    var fn = window[name];
    if (typeof fn !== 'function' || fn._sgasEmptyPatched) return;
    var patched = function () {
      var result = fn.apply(this, arguments);
      scheduleEmptyStates();
      return result;
    };
    patched._sgasEmptyPatched = true;
    patched._sgasOriginal = fn;
    window[name] = patched;
  }

  function installEmptyStateHooks() {
    patchRenderFunction('renderAll');
    patchRenderFunction('renderEsap');
    patchRenderFunction('renderComplaints');
    scheduleEmptyStates();
  }

  function installErrorHooks() {
    if (window._sgasNetworkHooksInstalled) return;
    window._sgasNetworkHooksInstalled = true;
    window.addEventListener('unhandledrejection', function (event) {
      if (looksLikeNetworkError(event.reason)) showNetworkError();
    });
    window.addEventListener('error', function (event) {
      if (looksLikeNetworkError(event.error || event.message)) showNetworkError();
    });

    if (typeof window.fetch === 'function' && !window.fetch._sgasNetworkPatched) {
      var originalFetch = window.fetch.bind(window);
      var patchedFetch = function () {
        return originalFetch.apply(window, arguments).catch(function (err) {
          if (looksLikeNetworkError(err)) showNetworkError();
          throw err;
        });
      };
      patchedFetch._sgasNetworkPatched = true;
      window.fetch = patchedFetch;
    }
  }

  function boot() {
    injectStyles();
    injectScaffolding();
    markComingSoonModules();
    protectComingSoonClicks();
    patchNavFunction();
    ensureActivePageAllowed();
    installEmptyStateHooks();
    installErrorHooks();
    installAuthHooks();
    scheduleTrialRefresh(150);
    setTimeout(refreshTrialState, 1800);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
