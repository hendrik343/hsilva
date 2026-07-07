# SGAS Pro — Ficha de Disciplina de Demo

Uma página. Duas colunas. Ler antes de qualquer demo ao vivo a um cliente ou financiador.

**Regra de ouro:** nunca afirmar em demo o que não está nesta coluna "Disponível hoje". Se a pergunta for sobre algo na coluna "No roadmap", a resposta é sempre: *"Está no roadmap, ainda não está disponível hoje."* — nunca "sim, já fazemos isso".

## Disponível hoje / No roadmap

| Disponível hoje | No roadmap |
|---|---|
| Diagnóstico de Prontidão (Wizard IFC) — PS1–PS8, 5 etapas, relatório com bloqueadores críticos | SSO / SAML (nível Enterprise) |
| Fórmula de prontidão 100% divulgada (11 componentes, pesos visíveis) | Notificações por email/SMS/WhatsApp |
| Autoavaliação SGAS (42 perguntas · 9 elementos · matriz 0–5) | PostHog / Sentry (observabilidade self-serve) |
| Padrões IFC PS1–PS8 com referência ao parágrafo exacto | Enforcement do CSP (hoje em modo `Report-Only`) |
| Plano ESAP — tabela manual + construtor guiado (fila de lacunas → conversor → revisão → activação) | **Exportação da Ficha 2A em PDF — é um stub.** O botão "Exportar Ficha 2A" mostra apenas um alerta; não gera PDF nenhum. Nunca clicar nele em demo. |
| Registo de Riscos E&S + Mapas de Risco (físico e de processo) | Multi-tenant RBAC avançado / portfólio multi-projecto |
| Terceiros / Subempreiteiros com scorecard dos 9 elementos | Migração de arquitectura (Next.js/React) — decisão deliberada de não fazer antes de ≥10 assinaturas pagas |
| Partes Interessadas — engajamento, BCS, comunidades | |
| Mecanismo de Reclamações (GRM) com prazo de 15 dias controlado | |
| Evidências de Implementação + Cofre de Documentos + Chips PS1–PS8 | |
| Monitoramento e KPIs, Calendário de Relatórios IFC | |
| Relatório mensal (formato Banco Mundial, PT/EN) | |
| Sala de Auditoria — pacote lender-ready | |
| Gestão SGAS — Revisão de Gestão, Formação, Registo Legal | |
| Kit de Ferramentas IFC — as 6 fichas (Políticas, Riscos 2A, Causa Raiz 3A, Emergências, Mapeamento PI, Auditoria 9B) | |
| Assistente IA (PS1–PS8 + ESS1–ESS10, contextualizado ao projecto) | |
| Idiomas PT/EN (toggle instantâneo); wizard também em FR | |
| Roteiro missão BM — jornada guiada de 6 passos no Dashboard | |

## Nunca afirmar em demo

- **Nenhuma certificação ISO.** O SGAS Pro não é, nem afirma ser, uma certificação ISO 14001/45001 ou equivalente. É uma ferramenta de gestão e preparação de evidências.
- **Nenhuma reivindicação de residência de dados em Angola.** Os dados residem no Supabase, região **West EU (Ireland)** — confirmado via `supabase projects list`, projecto `sgas-pro` / `txkyedcqancetuoxtapf`. Se perguntarem onde os dados ficam, a resposta é essa, não "em Angola" nem "localmente".
- **O aviso legal tem de estar sempre visível.** Já está no rodapé da aplicação (barra lateral) e repetido no `trial.js`: *"SGAS Pro não substitui certificação oficial IFC/World Bank nem aconselhamento jurídico."* Nunca remover ou minimizar esta frase durante uma demo partilhada de ecrã.

## Se perguntarem sobre a Ficha 2A em PDF

Resposta pronta: *"A Ficha 2A está disponível para preenchimento na plataforma; a exportação directa para PDF está no roadmap — hoje recomendamos captura de ecrã ou cópia dos dados para o vosso modelo, enquanto finalizamos essa funcionalidade."*
