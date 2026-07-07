# SGAS Pro — Respostas prontas: metodologia de pontuação (§06) e região de alojamento (§09)

Duas perguntas que um responsável E&S de um banco ou uma equipa de procurement vão sempre fazer. Respostas escritas, para não improvisar sob pressão.

---

## §06 — Metodologia de pontuação ("Prontidão para missão BM")

O SGAS Pro divulga integralmente a fórmula — não é uma caixa negra. A prontidão é uma média ponderada de 11 componentes:

| Componente | Peso |
|---|---|
| Cofre de documentos | 18% |
| Conformidade PS1–PS8 | 15% |
| Maturidade SGAS (autoavaliação, 42 perguntas / 9 elementos) | 14% |
| Execução do ESAP | 11% |
| Evidências de implementação | 10% |
| Registo legal | 8% |
| Mapas de risco | 8% |
| GRM (reclamações) | 6% |
| Contratantes | 4% |
| KPIs de monitoramento | 3% |
| Sala de auditoria | 3% |

**Leitura:** ≥80% = verde · 60–79% = âmbar · <60% = vermelho. **Meta pré-missão: ≥85%.**

Cada componente é calculado a partir de dados reais introduzidos na plataforma (documentos carregados, requisitos PS verificados, medidas ESAP com evidência, etc.) — não é uma auto-avaliação qualitativa isolada, é a soma de estado real de cada módulo. Os pesos foram definidos por alinhamento com o **IFC ESMS Handbook** e o **Kit de Ferramentas SGAS do IFC**, dando o maior peso à prontidão documental (a primeira coisa que uma missão de supervisão do Banco Mundial pede) e à conformidade directa com PS1–PS8.

**O que dizer se pedirem mais detalhe:** o indicador ⓘ ao lado do score de prontidão, na barra superior da aplicação, mostra a mesma tabela em tempo real dentro do produto — pode ser mostrado ao vivo em vez de apenas descrito.

---

## §09 — Região de alojamento dos dados

**West EU (Ireland)** — AWS `eu-west-1`.

Confirmado directamente via `supabase projects list`:

```
REFERENCE ID: txkyedcqancetuoxtapf   NAME: sgas-pro   REGION: West EU (Ireland)
```

Toda a base de dados (Postgres via Supabase), autenticação e as Edge Functions (incluindo o assistente de IA) correm nesta região. Não há residência de dados em Angola nem processamento local — se um cliente exigir contratualmente residência de dados dentro do país ou uma região diferente, isso é uma limitação técnica actual a esclarecer antes da assinatura, não depois.
