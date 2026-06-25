/* auth.js — SGAS Pro vanilla auth module
 * Requires: supabase-js CDN + config.js loaded before this file.
 * Exposes: window.SGAS_AUTH, window.onAuthSuccess, window.signOut,
 *          window.showAuthOverlay, window.hideAuthOverlay, window.switchAuthTab
 */
(function () {
  'use strict';

  var cfg = window.SGAS_CONFIG || {};
  var url = cfg.SUPABASE_URL || 'https://txkyedcqancetuoxtapf.supabase.co';
  var key = cfg.SUPABASE_ANON_KEY;
  if (!key) { console.error('[SGAS] SUPABASE_ANON_KEY missing from config.js'); return; }

  var sb = window.supabase.createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce'
    }
  });

  // ── Public API ─────────────────────────────────────────────────────────
  window.SGAS_AUTH = {
    client: sb,
    signUp: function (email, password, fullName, orgName) {
      return sb.auth.signUp({
        email: email, password: password,
        options: {
          data: { full_name: fullName, org_name: orgName },
          emailRedirectTo: window.location.origin
        }
      });
    },
    signInPassword: function (email, password) {
      return sb.auth.signInWithPassword({ email: email, password: password });
    },
    signInMagicLink: function (email) {
      return sb.auth.signInWithOtp({ email: email, options: { emailRedirectTo: window.location.href } });
    },
    signInGoogle: function () {
      return sb.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.href } });
    },
    signInMicrosoft: function () {
      return sb.auth.signInWithOAuth({ provider: 'azure', options: { redirectTo: window.location.href } });
    },
    signOut: function () { return sb.auth.signOut(); },
    getSession: function () { return sb.auth.getSession(); },
    getUser: function () { return sb.auth.getUser(); },
    getOrgContext: async function () {
      var user = (await sb.auth.getUser()).data.user;
      if (!user) return null;
      var res = await sb.from('organization_members')
        .select('organization_id, role, organizations(*)')
        .eq('user_id', user.id)
        .is('suspended_at', null)
        .limit(1)
        .maybeSingle();
      return res.data;
    },
    onChange: function (cb) {
      var res = sb.auth.onAuthStateChange(cb);
      return res.data.subscription;
    }
  };

  // ── Internal helpers ───────────────────────────────────────────────────
  function ptErr(msg) {
    if (!msg) return 'Ocorreu um erro. Tente novamente.';
    var m = msg.toLowerCase();
    if (m.includes('invalid login') || m.includes('invalid credentials')) return 'Email ou palavra-passe incorrectos.';
    if (m.includes('already registered') || m.includes('already exists')) return 'Este email já está registado.';
    if (m.includes('password') && m.includes('short')) return 'Palavra-passe demasiado curta — mínimo 8 caracteres.';
    if (m.includes('invalid email')) return 'Email inválido.';
    if (m.includes('network') || m.includes('fetch')) return 'Sem ligação ao servidor. Tente novamente.';
    if (m.includes('email not confirmed')) return 'Confirme o seu email antes de entrar.';
    if (m.includes('rate limit')) return 'Demasiadas tentativas. Aguarde um momento.';
    return msg;
  }

  function showErr(id, msg) {
    var el = document.getElementById(id);
    if (el) { el.textContent = msg; el.style.display = 'block'; }
  }

  function clearErrs() {
    ['login-error', 'register-error', 'magic-error'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) { el.style.display = 'none'; el.textContent = ''; }
    });
  }

  function setBtnLoading(id, loading) {
    var btn = document.getElementById(id);
    if (!btn) return;
    btn.disabled = loading;
    btn.textContent = loading ? 'A processar…' : (btn.dataset.label || btn.textContent);
  }

  // ── Overlay + tab controls (global — called from inline onclick) ───────
  window.showAuthOverlay = function () {
    var ov = document.getElementById('auth-overlay');
    if (ov) ov.style.display = 'flex';
    document.querySelectorAll('.sidebar, .main').forEach(function (el) { el.style.visibility = 'hidden'; });
  };

  window.hideAuthOverlay = function () {
    var ov = document.getElementById('auth-overlay');
    if (ov) ov.style.display = 'none';
    document.querySelectorAll('.sidebar, .main').forEach(function (el) { el.style.visibility = ''; });
  };

  window.switchAuthTab = function (tab) {
    ['login', 'register'].forEach(function (t) {
      var form = document.getElementById('form-' + t);
      var btn  = document.getElementById('tab-' + t);
      var active = (t === tab);
      if (form) form.style.display = (active && tab !== 'magic') ? '' : 'none';
      if (btn) {
        btn.style.borderBottom = active ? '2px solid #1D9E75' : '2px solid transparent';
        btn.style.fontWeight   = active ? '600' : '400';
        btn.style.color        = active ? '#111827' : '#6B7280';
      }
    });
    var magic = document.getElementById('panel-magic');
    if (magic) magic.style.display = (tab === 'magic') ? '' : 'none';
    clearErrs();
  };

  // ── User avatar ────────────────────────────────────────────────────────
  function renderUserAvatar() {
    var s = window.SGAS_SESSION;
    if (!s) return;
    var old = document.getElementById('user-avatar-btn');
    if (old) old.remove();
    var initials = (s.fullName || s.email || 'U')
      .split(' ').map(function (w) { return w[0]; }).join('').toUpperCase().slice(0, 2);
    var topbar = document.querySelector('.topbar-right');
    if (!topbar) return;

    var btn = document.createElement('div');
    btn.id = 'user-avatar-btn';
    btn.style.cssText = 'width:34px;height:34px;border-radius:50%;background:#1D9E75;color:#fff;' +
      'font-size:12px;font-weight:600;display:flex;align-items:center;justify-content:center;' +
      'cursor:pointer;position:relative;flex-shrink:0;user-select:none;';
    btn.textContent = initials;
    btn.title = s.fullName || s.email;

    var dd = document.createElement('div');
    dd.id = 'user-dropdown';
    dd.style.cssText = 'position:absolute;top:44px;right:0;background:#fff;border:1px solid #E5E7EB;' +
      'border-radius:8px;padding:6px;min-width:180px;box-shadow:0 4px 12px rgba(0,0,0,0.1);display:none;z-index:1000;';
    dd.innerHTML =
      '<div style="padding:8px 10px;border-bottom:1px solid #F3F4F6;margin-bottom:4px;">' +
        '<div style="font-size:13px;font-weight:600;color:#111827;">' + (s.fullName || '') + '</div>' +
        '<div style="font-size:11px;color:#6B7280;">' + (s.orgName || s.email || '') + '</div>' +
      '</div>' +
      '<hr style="border:none;border-top:1px solid #F3F4F6;margin:4px 0;">' +
      '<div style="padding:8px 10px;cursor:pointer;border-radius:6px;font-size:13px;color:#DC2626;" onclick="signOut()">Terminar sessão</div>';
    btn.appendChild(dd);
    topbar.appendChild(btn);

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      dd.style.display = dd.style.display === 'none' ? 'block' : 'none';
    });
    document.addEventListener('click', function () { dd.style.display = 'none'; });
  }

  // ── onAuthSuccess — called on SIGNED_IN; extended by Evidence + AI hooks ──
  window.onAuthSuccess = async function (session) {
    try {
      // 1. Profile (auto-created by DB trigger on auth.users insert)
      var profileRes = await sb.from('profiles').select('*').eq('id', session.user.id).single();
      var profile = profileRes.data;

      // 2. Org membership (new schema: organization_members → organizations)
      var memRes = await sb
        .from('organization_members')
        .select('organization_id, role, organizations(*)')
        .eq('user_id', session.user.id)
        .is('suspended_at', null)
        .limit(1)
        .maybeSingle();
      var membership = memRes.data;

      var orgId   = membership ? membership.organization_id : null;
      var orgData = membership ? membership.organizations   : null;

      // 3. First-login org provisioning — runs once, idempotent via RPC
      if (!orgId) {
        var orgName =
          session.user.user_metadata && session.user.user_metadata.org_name
            ? session.user.user_metadata.org_name
            : (profile && profile.full_name ? profile.full_name + ' — Org' : session.user.email.split('@')[0]);
        var rpcRes = await sb.rpc('create_organization', {
          organization_name: orgName,
          organization_country: 'AO'
        });
        if (!rpcRes.error && rpcRes.data) {
          orgId   = rpcRes.data.id;
          orgData = rpcRes.data;
        } else if (rpcRes.error) {
          console.warn('[SGAS] create_organization:', rpcRes.error.message);
        }
      }

      window.SGAS_SESSION = {
        userId:      session.user.id,
        orgId:       orgId,
        role:        membership ? membership.role : 'owner',
        fullName:    (profile && profile.full_name)
          ? profile.full_name
          : (session.user.user_metadata && session.user.user_metadata.full_name
              ? session.user.user_metadata.full_name
              : session.user.email),
        email:       session.user.email,
        avatarUrl:   profile ? profile.avatar_url : null,
        orgName:     orgData ? orgData.name : null,
        trialEndsAt: orgData ? orgData.trial_ends_at : null
      };

      // 4. Resolve or create active project for this org
      if (orgId) {
        var projRes = await sb
          .from('projects')
          .select('id, name, metadata')
          .eq('organization_id', orgId)
          .eq('status', 'active')
          .limit(1)
          .maybeSingle();

        if (projRes.data) {
          ACTIVE_PROJECT_ID = projRes.data.id;
          localStorage.setItem('sgas_project_id', projRes.data.id);
          _updateProjPill(projRes.data);
        } else {
          var slug = 'demo-' + Date.now().toString(36);
          var newProjRes = await sb.from('projects').insert({
            organization_id: orgId,
            name: 'Projecto de Demonstração',
            slug: slug,
            country: 'Angola',
            created_by: session.user.id,
            status: 'active',
            metadata: { ida_code: 'P171880', category: 'Substancial', source: 'seed', editable: true,
                        disclaimer: 'Este é um projeto de demonstração. Podes criar o teu próprio ou editar este.' }
          }).select('id, name, metadata').single();
          if (newProjRes.error) {
            console.warn('[SGAS] Criar projecto demo falhou:', newProjRes.error.message);
          } else if (newProjRes.data) {
            ACTIVE_PROJECT_ID = newProjRes.data.id;
            localStorage.setItem('sgas_project_id', newProjRes.data.id);
            _updateProjPill(newProjRes.data);
            // First-time seed — must complete before syncFromSupabase reads
            try {
              await _seedDemoData(sb, orgId, newProjRes.data.id, session.user.id);
            } catch (e) {
              console.warn('[SGAS] Seed parcialmente falhou:', e.message);
            }
          }
        }
      }

      renderUserAvatar();
      if (typeof syncFromSupabase === 'function') {
        syncFromSupabase().then(function (ok) {
          if (ok && typeof renderAll === 'function') renderAll();
        });
      }
    } catch (err) {
      console.warn('[SGAS] onAuthSuccess error:', err.message);
      window.SGAS_SESSION = {
        userId:   session.user.id,
        email:    session.user.email,
        fullName: session.user.email
      };
    }
    window.hideAuthOverlay();
  };

  // ── Sign out (global — called from avatar dropdown onclick) ────────────
  window.signOut = async function () {
    await sb.auth.signOut();
    window.SGAS_SESSION = null;
    ACTIVE_PROJECT_ID   = null;
    localStorage.removeItem('sgas_project_id');
    var av = document.getElementById('user-avatar-btn');
    if (av) av.remove();
    window.showAuthOverlay();
  };

  // ── Update sidebar project pill from DB row ────────────────────────────
  function _updateProjPill(proj) {
    var nameEl = document.getElementById('proj-pill-name');
    var loanEl = document.getElementById('proj-pill-loan');
    if (nameEl) nameEl.textContent = proj.name || '';
    if (loanEl) {
      var meta = proj.metadata || {};
      loanEl.textContent = (meta.ida_code ? meta.ida_code + ' · ' : '') + (proj.country || '');
    }
  }

  // ── Seed demo data for first project ──────────────────────────────────
  async function _seedDemoData(client, orgId, projectId, userId) {
    var base = { organization_id: orgId, project_id: projectId, created_by: userId };

    // 1. compliance_scores — 0-100 scale
    var scoresRes = await client.from('compliance_scores').upsert(
      [
        { ps_code: 'PS1', score: 72 }, { ps_code: 'PS2', score: 85 },
        { ps_code: 'PS3', score: 60 }, { ps_code: 'PS4', score: 65 },
        { ps_code: 'PS5', score: 90 }, { ps_code: 'PS6', score: 50 },
        { ps_code: 'PS7', score: 55 }, { ps_code: 'PS8', score: 58 }
      ].map(function (s) { return Object.assign({}, base, s); }),
      { onConflict: 'project_id,ps_code' }
    );
    if (scoresRes.error) throw new Error('compliance_scores: ' + scoresRes.error.message);

    // 2. esap_actions — column is `ps` (not ps_code), status text free-form
    var esapRes = await client.from('esap_actions').upsert(
      [
        { esap_id: 'ESAP-001', ps: 'PS1', priority: 'Alta',  description: 'Finalizar ESMS completo',                       responsible: 'João Silva',      due_date: '2026-06-30', status: 'Em curso',  evidence: '', hierarchy: '', metadata: {} },
        { esap_id: 'ESAP-002', ps: 'PS1', priority: 'Alta',  description: 'Activar GRM formal',                            responsible: 'Maria Costa',     due_date: '2026-05-31', status: 'Em atraso', evidence: '', hierarchy: '', metadata: {} },
        { esap_id: 'ESAP-003', ps: 'PS3', priority: 'Média', description: 'Instalar sistema monitoramento de água',        responsible: 'Pedro Dias',      due_date: '2026-08-01', status: 'Em curso',  evidence: '', hierarchy: '', metadata: {} },
        { esap_id: 'ESAP-004', ps: 'PS1', priority: 'Alta',  description: 'Consulta pública com comunidades afectadas',   responsible: 'Ana Santos',      due_date: '2026-07-01', status: 'Em atraso', evidence: '', hierarchy: '', metadata: {} },
        { esap_id: 'ESAP-005', ps: 'PS2', priority: 'Média', description: 'Formação A&S para 100% dos trabalhadores',     responsible: 'Francisco Neves', due_date: '2026-06-20', status: 'Em curso',  evidence: '', hierarchy: '', metadata: {} }
      ].map(function (e) { return Object.assign({}, base, e); }),
      { onConflict: 'project_id,esap_id' }
    );
    if (esapRes.error) throw new Error('esap_actions: ' + esapRes.error.message);

    // 3. grievances
    var grievRes = await client.from('grievances').upsert(
      [
        { grm_id: 'GRM-001', received_date: '2026-06-15', origin: 'Comunidade Kibala', category: 'Ambiental', description: 'Qualidade da água no rio junto à obra',      responsible: 'Dir. Ambiente', status: 'Aberta', accepted: 'Em análise', profile: 'Chefe da aldeia',    notify_method: 'Reunião presencial', closure_evidence: '', satisfaction: 'Pendente', resources: '', post_monitoring: '', cao: false, cao_link: '', due_date: '2026-07-15' },
        { grm_id: 'GRM-002', received_date: '2026-06-18', origin: 'Trabalhador',       category: 'Laboral',   description: 'Falta de equipamento de protecção individual', responsible: 'RH',            status: 'Aberta', accepted: 'Em análise', profile: 'Supervisor de obra', notify_method: 'Formulário GRM',     closure_evidence: '', satisfaction: 'Pendente', resources: '', post_monitoring: '', cao: false, cao_link: '', due_date: '2026-07-18' }
      ].map(function (g) { return Object.assign({}, base, g); }),
      { onConflict: 'project_id,grm_id' }
    );
    if (grievRes.error) throw new Error('grievances: ' + grievRes.error.message);
  }

  // ── Wire DOM event listeners after all body scripts have executed ──────
  document.addEventListener('DOMContentLoaded', function () {

    // Boot: check for existing session (returning visitor or OAuth redirect)
    (async function () {
      var res = await sb.auth.getSession();
      if (res.data.session) {
        await window.onAuthSuccess(res.data.session);
      } else {
        window.showAuthOverlay();
      }
    })();

    // Supabase auth state listener (OAuth callbacks, magic-link tokens, refresh)
    sb.auth.onAuthStateChange(async function (event, session) {
      if (event === 'SIGNED_IN' && session)   await window.onAuthSuccess(session);
      if (event === 'SIGNED_OUT')              window.showAuthOverlay();
      if (event === 'PASSWORD_RECOVERY')       window.switchAuthTab('login');
    });

    window.switchAuthTab('login');

    // Login
    var formLogin = document.getElementById('form-login');
    if (formLogin) {
      formLogin.addEventListener('submit', async function (e) {
        e.preventDefault();
        var email    = document.getElementById('login-email').value.trim();
        var password = document.getElementById('login-password').value;
        setBtnLoading('btn-login', true);
        clearErrs();
        try {
          var res = await sb.auth.signInWithPassword({ email: email, password: password });
          if (res.error) showErr('login-error', ptErr(res.error.message));
        } catch (err) {
          showErr('login-error', ptErr(err.message));
        } finally {
          setBtnLoading('btn-login', false);
        }
      });
    }

    // Google OAuth
    var btnGoogle = document.getElementById('btn-google');
    if (btnGoogle) {
      btnGoogle.addEventListener('click', async function () {
        await sb.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.href } });
      });
    }

    // Microsoft OAuth
    var btnMs = document.getElementById('btn-microsoft');
    if (btnMs) {
      btnMs.addEventListener('click', async function () {
        await sb.auth.signInWithOAuth({ provider: 'azure', options: { redirectTo: window.location.href } });
      });
    }

    // Magic link panel toggle
    var lMagic = document.getElementById('link-magic');
    if (lMagic) lMagic.addEventListener('click', function (e) { e.preventDefault(); window.switchAuthTab('magic'); });

    var lBack = document.getElementById('link-back-login');
    if (lBack) lBack.addEventListener('click', function (e) { e.preventDefault(); window.switchAuthTab('login'); });

    // Magic link send
    var btnMagic = document.getElementById('btn-magic');
    if (btnMagic) {
      btnMagic.addEventListener('click', async function () {
        var email = document.getElementById('magic-email').value.trim();
        if (!email) return showErr('magic-error', 'Introduza o seu email.');
        setBtnLoading('btn-magic', true);
        clearErrs();
        try {
          var res = await sb.auth.signInWithOtp({ email: email, options: { emailRedirectTo: window.location.href } });
          if (res.error) showErr('magic-error', ptErr(res.error.message));
          else {
            var ok = document.getElementById('magic-success');
            if (ok) ok.style.display = 'block';
          }
        } catch (err) {
          showErr('magic-error', ptErr(err.message));
        } finally {
          setBtnLoading('btn-magic', false);
        }
      });
    }

    // Register
    var formReg = document.getElementById('form-register');
    if (formReg) {
      formReg.addEventListener('submit', async function (e) {
        e.preventDefault();
        var fullName = document.getElementById('reg-name').value.trim();
        var email    = document.getElementById('reg-email').value.trim();
        var password = document.getElementById('reg-password').value;
        var orgName  = document.getElementById('reg-org').value.trim();
        if (!fullName || !email || !password || !orgName) {
          return showErr('register-error', 'Preencha todos os campos obrigatórios.');
        }
        setBtnLoading('btn-register', true);
        clearErrs();
        try {
          var res = await sb.auth.signUp({
            email: email,
            password: password,
            options: {
              data: { full_name: fullName, org_name: orgName },
              emailRedirectTo: window.location.href
            }
          });
          if (res.error) {
            showErr('register-error', ptErr(res.error.message));
          } else if (!res.data.session) {
            // Email confirmation required
            var ok = document.getElementById('register-success');
            if (ok) ok.style.display = 'block';
          }
          // If session present → SIGNED_IN fires → onAuthSuccess handles the rest
        } catch (err) {
          showErr('register-error', ptErr(err.message));
        } finally {
          setBtnLoading('btn-register', false);
        }
      });
    }
  });

})();
