# Path E — Completion Report

Branch: `path-e-guided-journey` (from `fix/client-readiness-3`)
Commits: `c06323b` (L() hotfix) → `f78f273` (E2) → `5ff093c` (E1) → `afb5e5a` (E1.6)
Preview: https://sgas-landing-een4etbwx-hendriksilva-vamedcoms-projects.vercel.app
Demo link: https://sgas-landing-een4etbwx-hendriksilva-vamedcoms-projects.vercel.app/sgas-pro.html?projectId=demo-kibala

**Note on preview access:** Vercel's own SSO wall protects preview URLs by default (separate from the app's login screen) — you'll see it fine logged into the Vercel dashboard, but automated `curl` verification from this session returned a 302 to `vercel.com/sso-api`, not app content. This is normal preview-deployment behavior, not a bug in the deploy.

## Deviations from the brief (read this first)

1. **Branch base was `fix/client-readiness-3`, not `main`.** This repo's `main`/`master` branches span multiple unrelated projects sharing one git root (`New project/`); `origin/main`'s last commit is an unrelated Netlify trigger and contains none of the current SGAS Pro code. Branching from it would have discarded Path B/C and the UX layer. Branched from the only line that actually contains the live app instead.
2. **E1.1 step 4 (GRM) has no "channels/SLA/responsável config" screen to check** — that UI doesn't exist yet. Used `complaints.length > 0` as the practical proxy: logging a grievance already requires an origin and an investigation owner (manual §6.4), so the first logged complaint is treated as "GRM operating."
3. **ESAP activation writes status `"Não iniciada"`, not `"Pendente"`** as the brief's prose said. The real ESAP status enum (`cycleEsap()`, `statusBadge()`) is `Não iniciada / Em curso / Concluída / Em atraso` — `"Pendente"` isn't a member of it and would have silently broken the existing status-cycle button (`states.indexOf('Pendente') === -1` → cycling would reset to `Não iniciada` on first click instead of advancing). Used the real equivalent value.
4. **Ficha 2A export cannot honestly include justified gaps** — `exportRiscosId()` (the button wired to "Ficha 2A") is currently `alert('...disponível na versão cloud.')`, a stub with no real PDF generation to extend. Justified gaps are persisted additively in a new `window.esapJustifiedGaps` array (shape: `{psId, psName, justification, date}`) so they're ready the moment a real export exists, but they are **not** in any PDF today. This acceptance criterion is marked N/A below rather than falsely marked pass.
5. **Activation requires ≥1 real action, not just justifications**, before the review badge can go green — a safeguard beyond the brief's literal validation rules, to stop a plan of 100% justified/0% actions from counting as "complete."
6. **Migration state (005/006) unknown** — `supabase migration list --linked` requires the DB password interactively; that's not something to be sought or piped in per the project's own credential-handling guardrail. Per the brief, Path E has zero functional dependency on either migration either way (confirmed: E1.6.4 step 5's audit trigger and E1.6.5's rate limit are both handled as "may not exist" from the start).

## E2 — dynamic-string migration table

| Location | Old PT string | New key |
|---|---|---|
| `sgas-pro.html:1028` (card title) | Fase do projeto | `card.title.fase_projeto` |
| `sgas-pro.html:1029` (badge) | Implementação | `phase.implementacao` |
| `sgas-pro.html:1033` (strong) | Categoria B | `phase.categoria_b` |
| `sgas-pro.html:1033` (trailing text) | — Preparação para due diligence. | `phase.due_diligence_prep` |
| `sgas-pro.html:1034` (span) | Supervisão / Implementação | `phase.supervisao_implementacao` |
| `sgas-pro.html:915` (sidebar) | ⏰ Próxima auditoria IFC | `audit.countdown.label` |
| `sgas-pro.html:917` (sidebar) | dias · Missão de supervisão | `audit.countdown.sub` |
| `sgas-pro.html:3751` (dashboard critical list, inline) | Atraso / Em curso | `status.ematraso` / `status.emcurso` (reused from statusBadge map) |
| `sgas-pro.html:4978` (doc vault fallback) | Owner por definir | `doc.owner.undefined` |
| `sgas-pro.html:4979` | Aprovador por definir | `doc.approver.undefined` |
| `sgas-pro.html:4980` | Próxima revisão por definir | `doc.nextreview.undefined` |
| `sgas-pro.html:4981` | Sem obsoleto registado | `doc.replaces.none` |
| `sgas-pro.html:4986` | Não submetido / Controlo documental / Última versão: | `doc.notsubmitted` / `doc.control_label` / `doc.lastversion` |
| `sgas-pro.html:4988-4992` (labels) | Versão / Owner / Aprovador / Próxima revisão / Obsoleto/substituído | `doc.version_label`, `doc.owner_label`, `doc.approver_label`, `doc.nextreview_label`, `doc.replaces_label` |
| `sgas-pro.html:4995` | Obrigatório / Recomendado | `doc.tag.obrigatorio` / `doc.tag.recomendado` |
| `sgas-pro.html:782` | Projecto activo | **no new key — already had `data-i18n="sidebar.pill.label"`**; the old `EN_SWEEP` entry was fully redundant |
| *(dead in old EN_SWEEP)* | Categoria B — Preparação para due diligence. | Never matched any real text node (the `<strong>` tag split it into two DOM text nodes) — split into `phase.categoria_b` + `phase.due_diligence_prep` above instead |

Plus `statusBadge()` (`sgas-pro.html:3488`): 48 status values now routed through `t('status.*')` for display while the underlying data value (used by `cycleEsap()` comparisons, filters, etc.) stays PT/unchanged — a `STATUS_I18N_KEY` lookup map added alongside the existing color map.

`EN_SWEEP` (the blunt text-node sweep) and its call site in `enSweep()`/`uxRefresh()` were deleted per the brief's one sanctioned non-additive change.

## Function/store names actually reused

- **Journey conditions**: `SGAS_READINESS_ASSESSMENT` (diagnostic done), `esapData` (ESAP has items), `complaints` (GRM proxy — see deviation #2), `e.status==='Concluída' && !e.evid` (the exact Path B amber-badge condition, inverted for step 5)
- **ESAP structure**: exact field set from `addEsap()` (`id, ps, prio, desc, objective, outcome, kpi, budget, procedure, stakeholders, hierarchy, resp, prazo, status, evid`) — new fields left `''`, matching how the table already renders blanks (`||'X pendente'` fallbacks)
- **Gap threshold**: `renderPS()`'s exact `pct = done/total*100`, `pct<80` = not-yet-conforme, using the same `PS_DATA`/`psReqStatus` structures, not re-derived
- **Nav**: existing `nav(pageId)` function reused for all journey/step deep links (`esap`, `reclamacoes`, `implementacao`, `relatorio`)
- **AI**: new `esapAiSuggest()` calls the existing `AI_EDGE_URL` endpoint with the same auth pattern (`getSupaClient().auth.getSession()`) and SSE parsing as `ai_sendMessage()`, but does **not** touch `window.AI_CONVERSATION` or the chat bubble UI — it's a silent, isolated one-shot call
- **Export hook**: `exportAudit()` wrapped (not modified) the same way `renderAll`/`renderDashboard`/`setLang` already were, to set the step-6 flag only after a real export runs

## New localStorage keys

| Key | Set by | Read by |
|---|---|---|
| `sgas_journey_results_seen` | `journeyGo(1)` | `journeyState()` step 2 |
| `sgas_esap_activated` | `esapActivate()` | `journeyState()` step 3 |
| `sgas_journey_report_exported` | wrapped `exportAudit()` | `journeyState()` step 6 |
| `sgas_welcome_v1` | `_welcomeDismiss()` (via start/tour/later) | `maybeShowWelcome()` |
| `sgas_esap_draft` | `esapAddGap()`/`esapConfirmSkip()` | `esapDraftState()`, cleared on `esapActivate()` |

`sgas_tour_v1` already existed; behavior changed (no longer auto-set by an auto-firing tour — only set when the user explicitly opts in via the welcome modal's "quick tour" link and finishes/skips it).

## Acceptance checklist

**E2**
- [x] EN walkthrough: all touched strings route through `t()`/`data-i18n`; `window.SGAS_LANG` bug fixed so EN actually renders (was silently stuck on PT before Commit 0)
- [x] Refresh persists language (`localStorage.sgas_lang`, unchanged mechanism)
- [x] First visit with `navigator.language=en-*` and no saved pref loads EN (`detectDefaultLang()`)
- [x] Glossary tooltips show EN definitions in EN mode (fixed by the `window.SGAS_LANG` hotfix — dictionary itself was already complete)
- [x] `t()` warns on missing key instead of rendering `undefined`
- [x] Segmented PT|EN toggle — already met spec pre-Path E, no change needed

**E1**
- [x] Fresh non-demo project: welcome modal appears once, wizard opens from "Começar diagnóstico", dismissal persists (`sgas_welcome_v1`)
- [x] Roteiro card renders in both languages; steps computed from real signals (manually verified logic by tracing `journeyState()` against each data source)
- [x] Locked steps not clickable, tooltip shows; done/current steps navigate via `journeyGo()`
- [x] Journey % (process metric) visually separate from Prontidão score — different card, different section, never combined into one number
- [x] `demo-kibala`: fixed steps 1-2 done / step 3 current narrative, no modal
- [x] No new console errors from the added code (syntax-checked all 18 script blocks with `node --check` after every commit)

**E1.6**
- [x] Gap queue derives from `PS_DATA`/`psReqStatus` at the real <80% threshold
- [x] Skip without justification blocked (`esapConfirmSkip` requires non-empty text)
- [x] Missing prazo / past prazo → amber review badge naming the exact PS + reason
- [x] Draft restored from `sgas_esap_draft` on refresh
- [x] AI suggestion path is non-blocking; on Edge Function unreachable (6s `AbortController` timeout), field stays empty with normal placeholder — flow fully usable
- [ ] **N/A** — Ficha 2A export: no real export exists to extend (deviation #4); data is stored and ready, not yet exported
- [x] Manual ESAP entry via the existing table/modal untouched — `addEsap()`, `renderEsap()`, `cycleEsap()`, `delEsap()` unmodified
- [x] All new strings via `t()`; every new `innerHTML` write with user/db-influenced content passes through `escapeHtml()` (verified line by line, including the review-table date/priority cells)

## Next step

Validate on the preview URL + `?projectId=demo-kibala` (logged into Vercel to clear the SSO wall). Prod deploy only after you write "aprovo prod".
