# Path G — Dashboard Hydration Fix + Hierarchy Restructure — Completion Report

Branch: `path-g-dashboard` (from `fix/client-readiness-3`)
Commits: `9dbbf04` (P1) → `804be8c` (P2) → `65d189d` (P3) → `c480e99` (P4) → `e3dcd67` (P5)
Preview: https://sgas-landing-n0r4afoy0-hendriksilva-vamedcoms-projects.vercel.app
Demo: same URL + `?projectId=demo-kibala`

**Note on preview access:** as with Path E, the preview URL sits behind Vercel's own SSO wall (separate from the app's login) — `curl` returns a 302 to `vercel.com/sso-api`. You'll see it fine logged into Vercel; I could not independently screenshot/verify content this session.

## Deviations (read first)

1. **P1 scope changed after discussion, with your sign-off.** The brief asked for PS bars/Maturidade SGAS to populate from completing the wizard. Tracing the code found this is deliberately prevented by two explicit guardrail comments left by your own immediately-prior commit (`fix(wizard): corrige cálculo ps.score PS1-8`), which fixed a real bug where the wizard and the PS1-8 checklist both wrote conflicting scores to the same field. Reversing that would re-open the bug. Agreed resolution: PS/maturity zero-states are handled by P4's lock-cards instead, not by wizard-derived numbers. Project-card wiring was traced and found already correct (not touched). One real, unrelated bug *was* found and fixed: `sgasScores[]` was being corrupted by a stray `compliance_scores` DB sync using PS-code indices, colliding with the ESMS autoavaliação's Elemento-number indices on the same array — removed.
2. **No general-purpose responsive breakpoint existed to reuse for P5.** The file has exactly 3 `@media` rules total; only `@media (max-width:820px)` is a general (non-wizard-specific) one, and even that was auth-screen-only before this change. Extended it rather than inventing a new breakpoint, since no better candidate existed.
3. **"Ver maturidade" radar isn't itself gated pre-diagnostic** — Chart.js would still draw a degenerate all-zero radar if reached. Its only entry point (the link inside "Onde atuar primeiro") is now behind that card's own lock state, so a pre-diagnostic user has no path to it through normal navigation. Flagging rather than silently leaving it as a partial gap.
4. Two real regressions were caught and fixed *while restructuring*, not left for later: `renderDashboard()`'s empty-state toggle referenced the removed `dash-kpi-grid` (guarded, so it would have just silently stopped ever showing the empty state again); the critical-actions render did an **unguarded** `getElementById('dash-critical-list').innerHTML=` on a now-missing element, which would have thrown and aborted `updateReadiness()` on every single render. Both fixed inline as part of P2.

## Pre-flight: dashboard render-path inventory

| Widget | Function |
|---|---|
| KPI grid (readiness/maturity/overdue/complaints) | `updateReadiness()` |
| Project card (name/IDA/amount/etc.) | `applyReadinessProfile()` |
| PS bars | `renderPS()` (full page) / `renderDashboard()`'s PS-compact block (dashboard) |
| Radar / 9 elements | `renderRadar()`, reads `sgasScores[]` |
| Critical actions (removed) | was inline in `renderDashboard()` |
| Roteiro (Path E) | `renderRoteiro()`, host `#sgas-onb-host` |
| Context line / status strip / priority list (new) | `renderDashContext()`, `updateReadiness()`, `renderDashPriority()` |

## Root cause: PS/maturity hydration

The wizard (`sgas-readiness-wizard.html`) computes real per-PS scores in `profileJSON().scores_by_ps` from its own 5-level answers. `applyReadinessProfile()` in `sgas-pro.html` receives this via `postMessage`/DB row but **only extracts project metadata**, never touching `PS_DATA`/`psReqStatus`/`sgasScores` — by explicit design (see the two guardrail comments cited above). This is not a bug; it's the fix for a prior bug. The dashboard's job is to present that honestly (P4's lock-cards), not to paper over it with a second, conflicting scoring path.

## Removed / merged DOM

| Removed | Where it went |
|---|---|
| `#dash-kpi-grid` (4 metric cards: readiness, maturity, overdue, complaints) | Readiness → status strip cell. Overdue/complaints → footer strip cells. Maturity → no standalone number; only in "Ver maturidade" modal (radar + legend + per-element list). |
| Topbar `#readiness-pill` (as a topbar element) | Same element (same id), relocated into the status strip — the ONLY place readiness now renders. |
| Categoria IFC card + Fase card (`.grid-2` block) | `modal-profile`, verbatim, reachable via the context line's "Ver perfil" link. |
| Loan card (`#proj-name`/`#proj-ida`/etc.) | `modal-profile`, verbatim. |
| `#ps-bars` (full-size PS card) | `#dash-ps-compact` (2-column compact bars, "Ver detalhes" preserved). |
| Radar card (`#radarChart`/`#radar-legend`) | `modal-maturity`, verbatim, linked from "Onde atuar primeiro". |
| Critical-actions card (`#dash-critical-list`, itemised) | Dropped entirely per spec ("must not remain a separate stacked card") — counts already covered by the footer strip. |
| Due-diligence full banner | Dismissible note (`#dash-diligence-note`), placed **before** the status strip (not between strip and hero), plus verbatim copy retained in `modal-profile`. |

## Acceptance checklist

**P1**
- [x] Real bug found and fixed (sgasScores index collision)
- [x] No hardcoded values introduced
- [~] PS bars/maturity "populate from diagnostic" — reinterpreted as P4 lock-states, agreed with you, not a literal pass of the original wording
- [x] Project-card wiring traced, confirmed correct, untouched

**P2**
- [x] Readiness renders exactly once (status strip only)
- [x] Docs-missing renders exactly once (status strip only)
- [x] One primary CTA on the page (roteiro's Continuar)
- [x] Categoria/Fase reachable via "Ver perfil" with all original content intact
- [x] Nothing between status strip and roteiro hero (diligence note moved before the strip)
- [x] Full removed/merged DOM table above

**P3**
- [x] Bottom 3 PS by ascending score, only among PS with any touched requirement
- [x] Gap text from the same `esapGapQueue()` source as the ESAP builder (exposed via `window.esapGapQueue`, no duplicated logic)
- [x] Severity color reuses existing 40%/80% thresholds
- [x] "no ESAP"/"in ESAP" chip when an open action already covers the gap

**P4**
- [x] PS bars, priority list lock (muted card + lock icon + copy) pre-diagnostic — never 0%
- [x] Status strip: countdown always renders; readiness shows "—" + microcopy; docs cell always renders
- [x] Footer ESAP/complaints cells lock instead of "0"; rebuilt in full each render so locked↔unlocked never references a stale/missing span
- [x] Demo tenants always fully hydrated (`isPreDiagnostic()` excludes `SGAS_DEMO_ACTIVE`)
- [~] Radar itself not gated, but unreachable pre-diagnostic through normal nav (see deviations)

**P5**
- [x] Mobile order: context → roteiro hero → status strip → priority → PS bars → footer (verified via CSS `order`, not visually screenshotted this session — SSO wall)
- [x] Stepper compresses to dots + current-step label; Continuar full-width
- [x] Fixed a genuine flexbox overflow risk (priority-list gap text missing `min-width:0`)
- [~] "No horizontal scroll at 380px" — reasoned through CSS, not visually confirmed live; recommend a real DevTools pass before merge

## Next step

Validate on the preview URL + `?projectId=demo-kibala`: fresh pre-diagnostic project, post-diagnostic hydration, demo tenant, mobile at 380px, PT/EN. Prod only on your written "aprovo prod".
