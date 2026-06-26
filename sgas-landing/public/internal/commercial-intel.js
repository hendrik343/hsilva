/* ================================================================
   SGAS Pro — Inteligência Comercial (INTERNAL MODULE)
   Load via:  ?internal=1  OR  localStorage.setItem('sgas_internal','1')
   This file must NEVER ship in the client-facing bundle.
   ================================================================ */

// ── Data ──────────────────────────────────────────────────────────
const COMMERCIAL_INTELLIGENCE_DB = JSON.parse(String.raw`{
  "$schema": "https://sgas.pro/schema/commercial-intelligence/v1",
  "version": "1.3.0",
  "lastUpdated": "2026-06-08",
  "language": "pt",
  "module": "commercial_intelligence",
  "disclaimer": "Este dashboard apoia readiness/alinhamento. Não equivale a certificação, parecer jurídico ou aprovação IFC/World Bank.",
  "projectRef": {
    "name": "",
    "id": "",
    "country": "",
    "region": "",
    "sector": ""
  },
  "positioning": "IFC / World Bank E&S Due Diligence Readiness Platform",
  "verdict": "O dashboard é vendável hoje como cockpit de prontidão para due diligence IFC / World Bank E&S, sobretudo em modelo paid pilot com apoio consultivo. Com evidência de implementação real, mapa físico de riscos, mapeamento de processos, GRM completo, scorecard de contratantes, protocolos KPI, Source Version Watcher e Sala de Auditoria Banco Mundial, o produto está mais próximo de uma operação enterprise assistida.",
  "recommendedOffer": "Software + advisory: diagnóstico inicial, configuração do SGAS, upload de evidências, gap analysis, ESAP/ESCP e relatório para financiador.",
  "sellabilityScores": {
    "scale": {
      "min": 0,
      "max": 10,
      "precision": 1,
      "unit": "points"
    },
    "demo": 8.5,
    "paidPilot": 8.0,
    "enterpriseSaaS": 8.3
  },
  "quickExtraction": [
    {
      "label": "Pitch",
      "value": "Ajuda empresas a organizar evidências, riscos, ESAP/ESCP, stakeholders, reclamações, contratados e relatórios antes e durante due diligence IFC / World Bank."
    },
    {
      "label": "Buyer pain",
      "value": "Grandes empresas perdem tempo a provar prontidão E&S porque evidências ficam dispersas em PDFs, Excel, emails e pastas."
    },
    {
      "label": "Best first sale",
      "value": "Paid pilot para projecto em preparação de financiamento ou auditoria E&S, com configuração assistida."
    },
    {
      "label": "Commercial warning",
      "value": "Não prometer certificação IFC/World Bank; vender como readiness, evidence management e management cockpit."
    },
    {
      "label": "Strategic correction",
      "value": "Manter IFC PS1-PS8 para clientes IFC/MIGA e adicionar World Bank ESS1-ESS10 para borrowers IBRD/IDA."
    },
    {
      "label": "Local AI requirement",
      "value": "O cliente deve receber uma base local pré-indexada; o sistema não pode depender de leitura lenta dos PDFs durante o preenchimento."
    },
    {
      "label": "Audit-readiness upgrade 1.2.0",
      "value": "O SaaS passou a capturar evidência de implementação real, validação por gestor, comunicações às comunidades, versionamento documental, eficácia de formação e registo legal."
    },
    {
      "label": "Audit-room upgrade 1.3.0",
      "value": "O SaaS adicionou mapa físico de riscos, mapeamento de processos, GRM completo, scorecard de contratantes por 9 elementos, protocolos KPI, watcher de fontes oficiais e Sala de Auditoria Banco Mundial."
    }
  ],
  "buyerTargets": [
    "Empresas de construção e EPC em projectos financiados pelo Banco Mundial.",
    "Empresas de energia, mineração, água, saúde, infraestrutura e agronegócio que procuram IFC/MIGA/DFI finance.",
    "Project Implementation Units e donos de obra que precisam controlar evidências E&S.",
    "Consultores ESG/HSE que preparam clientes para lender due diligence.",
    "Subempreiteiros grandes que precisam demonstrar cláusulas laborais, HSE, resíduos e comunidade.",
    "Intermediários financeiros (bancos, fundos de PE, MFIs) que precisam de ESMS para carteira IFC/DFI.",
    "Empresas extractivas (petróleo, gás, mineração) sujeitas a requisitos de divulgação de receitas e governação."
  ],
  "enterpriseGaps": [
    "Mapeamento World Bank ESS1-ESS10 e ESCP, além de IFC PS1-PS8 e ESAP.",
    "Audit trail: quem alterou risco, documento, reclamação, contratante ou submissão.",
    "Controlo de utilizadores e permissões: gestor, HSE, contractor, auditor, lender viewer.",
    "Versionamento de evidências e anexos por requisito, acção e submissão.",
    "Relatórios exportáveis PDF/DOCX/XLSX para due diligence, ESAP/ESCP, GRM, SEP e contractor compliance.",
    "Multi-project portfolio view para grupos empresariais.",
    "Motor local de apoio com base pré-indexada, regras instantâneas e LLM pequeno para explicações sem depender da internet.",
    "Disclaimer legal visível em todos os exports: readiness não equivale a certificação ou aprovação IFC/World Bank.",
    "Módulos sectoriais para indústrias extractivas (petróleo, gás, mineração): divulgação de receitas, HGA/IGA e avaliação de governação.",
    "Módulo de infraestrutura essencial: divulgação de tarifas, padrões de serviço, obrigações de investimento e apoio governamental.",
    "Verificação de Exclusion List IFC no intake de projecto: bloquear actividades proibidas antes de avançar.",
    "Workflow específico para Intermediários Financeiros (Categoria FI): ESMS da carteira, Exclusion List para sub-projectos e distinção Categoria C/FI.",
    "Broad Community Support como gate distinto: registo de expressões de apoio, investigação independente e evidência antes de submissão ao financiador."
  ],
  "localAiArchitecture": [
    {
      "label": "Base local",
      "value": "Converter PDFs e páginas oficiais em requisitos curtos, checklists, gatilhos, evidências e exemplos; entregar isso junto com o SaaS."
    },
    {
      "label": "Busca rápida",
      "value": "Criar índice local por norma, requisito, módulo, risco, evidência, pergunta do formulário e palavras-chave em português/inglês."
    },
    {
      "label": "Regras primeiro",
      "value": "Validações críticas devem ser determinísticas e instantâneas; o LLM só explica a razão, recomenda acção e aponta evidência."
    },
    {
      "label": "LLM pequeno",
      "value": "Usar modelo local substituível para respostas curtas, sem enviar dados do cliente para fora do ambiente instalado."
    },
    {
      "label": "Modo sem internet",
      "value": "O cliente consegue preencher, receber alertas e gerar recomendações mesmo offline; internet só serve para verificar versões oficiais."
    }
  ],
  "implementedAuditControls": [
    {
      "module": "Autoavaliação SGAS",
      "control": "Cada resposta pode guardar tipo de evidência, referência/ficheiro, validador, estado e notas."
    },
    {
      "module": "Evidência de Implementação Real",
      "control": "Registo de observação visual, medição/teste, revisão documental, entrevista, foto/vídeo e validação por gestor."
    },
    {
      "module": "Comunicações às Comunidades Afetadas",
      "control": "Histórico com data, público, tema, canal, feedback recebido, novos riscos, evidência, responsável e estado."
    },
    {
      "module": "Cofre de Documentos",
      "control": "Controlo de versão, owner, aprovador, data de revisão, próxima revisão e documento obsoleto/substituído."
    },
    {
      "module": "Plano de Formação",
      "control": "Mede eficácia por quiz, avaliação prática, entrevista, assinatura e capacidade de explicar o procedimento."
    },
    {
      "module": "ESAP",
      "control": "Acções com objectivo, resultado esperado, KPI, orçamento/recurso, procedimento associado e stakeholders consultados."
    },
    {
      "module": "Registo Legal Angola + IFC/ESS",
      "control": "Requisitos, licenças, autoridade, validade, owner, evidência e alertas de vencimento para revisão de gestão."
    },
    {
      "module": "Mapas de Risco",
      "control": "Planta física com hotspots de poeira, ruído, tráfego, químicos, resíduos e comunidades afectadas, ligados a riscos e evidências."
    },
    {
      "module": "Mapeamento de Processo",
      "control": "Liga recepção de material, obra civil, transporte, armazenamento, resíduos, segurança, limpeza e emergência a riscos, controlos e responsáveis."
    },
    {
      "module": "Mecanismo de Reclamações",
      "control": "GRM completo com decisão aceite/não aceite, perfil do reclamante, método de notificação, evidência de encerramento, satisfação/apelo, recursos e pós-monitoramento."
    },
    {
      "module": "Terceiros / Subempreiteiros",
      "control": "Scorecard por contratante contra os 9 elementos SGAS: política, riscos, ESAP, formação, emergência, stakeholders, GRM, relatórios e monitoramento."
    },
    {
      "module": "Monitoramento e KPIs",
      "control": "Protocolos por KPI com frequência, método, equipamento, norma de referência, responsável, registo e acção correctiva automática."
    },
    {
      "module": "Sala de Auditoria Banco Mundial",
      "control": "Pacote lender-ready com documentos obrigatórios, evidências por requisito, auditorias/inspecções, ESAP/ESCP, GRM, SEP, legal register, contractor compliance e monitoramento."
    },
    {
      "module": "Source Version Watcher",
      "control": "Registo local de fontes oficiais IFC/World Bank, data de verificação, estado, URL e alerta para mudanças em templates, notas e checklists."
    }
  ],
  "localDecisionGuards": [
    {
      "label": "Categoria A sem ESIA",
      "standard": "IFC categorization / PS1 / ESS1",
      "value": "Alerta crítico: projecto de alto risco não pode avançar sem ESIA, consulta pública robusta, ESAP e evidências."
    },
    {
      "label": "Comunidades afectadas sem SEP/GRM",
      "standard": "PS1 / ESS10",
      "value": "Exigir plano de engajamento, mecanismo de reclamações e histórico de consultas."
    },
    {
      "label": "Trabalhadores sem mecanismo laboral",
      "standard": "PS2 / ESS2",
      "value": "Exigir mecanismo de reclamação laboral, comunicação aos trabalhadores, registo de casos e prazos de resposta."
    },
    {
      "label": "Subempreiteiro sem cláusulas E&S",
      "standard": "PS2 / ESS2",
      "value": "Bloquear conformidade até cláusulas, indução, HSE e evidências laborais estarem completas."
    },
    {
      "label": "Biodiversidade sem triagem",
      "standard": "PS6 / ESS6",
      "value": "Exigir screening de habitats, espécies sensíveis, áreas protegidas e medidas de evitar/reduzir/mitigar/compensar."
    },
    {
      "label": "Património cultural sem procedimento",
      "standard": "PS8 / ESS8",
      "value": "Exigir chance-find procedure, consulta a autoridades competentes e registo de achados quando aplicável."
    },
    {
      "label": "Reassentamento marcado como não aplicável sem justificativa",
      "standard": "PS5 / ESS5",
      "value": "Exigir triagem documentada, mapa de afectados ou declaração técnica."
    },
    {
      "label": "FPIC pendente",
      "standard": "PS7 / ESS7",
      "value": "Indicar pendência de consulta livre, prévia e informada quando comunidades tradicionais forem aplicáveis."
    },
    {
      "label": "Actividade na Exclusion List IFC",
      "standard": "IFC Environmental and Social Review Procedure – Exclusion List",
      "value": "Bloquear criação de projecto: actividades proibidas pelo IFC não podem receber apoio de due diligence. Notificar utilizador e exigir reclassificação ou encerramento do registo."
    },
    {
      "label": "Broad Community Support não documentado em projecto Categoria A",
      "standard": "IFC Sustainability Policy §20 / PS1",
      "value": "Exigir registo de expressões de apoio das comunidades afectadas (indivíduos ou representantes reconhecidos), documentação do processo de consulta livre, prévia e informada, e evidência de que não há oposição generalizada antes de submissão ao financiador. Broad support pode coexistir com objecções individuais mas não com rejeição sistemática de grupos afectados."
    },
    {
      "label": "Intermediário financeiro sem ESMS de carteira",
      "standard": "IFC Sustainability Policy §28-29 / ESS9",
      "value": "Exigir que o FI estabeleça e mantenha Sistema de Gestão E&S para a carteira, aplique a Exclusion List a todos os sub-projectos, e aplique PS/ESS completos a sub-projectos com riscos E&S significativos. FI com riscos mínimos qualifica como Categoria C e fica isento de requisitos específicos."
    },
    {
      "label": "Projecto extractivo significativo sem divulgação de receitas",
      "standard": "IFC Sustainability Policy §22",
      "value": "Projectos de petróleo, gás ou mineração que representem 10% ou mais das receitas governamentais são considerados significativos. Exigir divulgação pública de pagamentos materiais ao governo (royalties, impostos, partilha de lucros) e dos termos relevantes de HGA e IGA."
    },
    {
      "label": "Infraestrutura essencial sob monopólio sem divulgação tarifária",
      "standard": "IFC Sustainability Policy §23",
      "value": "Para distribuição de água, electricidade, gás canalizado ou telecomunicações em regime de monopólio: encorajar divulgação pública de tarifas domésticas, mecanismos de ajuste, padrões de serviço, obrigações de investimento e apoio governamental. Em privatizações, incluir taxas de concessão ou receitas de privatização."
    }
  ],
  "exclusionListCheck": {
    "policyRef": "IFC Environmental and Social Review Procedure – Exclusion List",
    "sustainabilityPolicyRef": "IFC Sustainability Policy §17",
    "note": "A Exclusion List é mantida no Environmental and Social Review Procedure e actualizada pelo IFC. O SGAS deve verificar o sector e actividade do projecto no intake e bloquear o avanço se a actividade se enquadrar em categorias proibidas.",
    "intakeGate": {
      "trigger": "Criação ou edição do campo 'sector / actividade principal' do projecto",
      "action": "Verificar contra lista de actividades excluídas; bloquear se positivo; requerer confirmação explícita do utilizador se borderline",
      "outputOnBlock": "Alerta crítico com referência ao item da Exclusion List e instrução para contactar financiador antes de prosseguir"
    },
    "typicalExclusionCategories": [
      "Produção ou comércio de armas e munições",
      "Produção ou comércio de álcool (excepções aplicam-se)",
      "Produção ou comércio de tabaco",
      "Jogos de azar, cassinos e equiparados",
      "Indústrias e actividades envolvendo trabalho forçado ou trabalho infantil prejudicial",
      "Produção ou comércio de materiais radioactivos sem gestão adequada",
      "Produção ou comércio de produtos contendo PCBs",
      "Pesca de arrasto em águas internacionais",
      "Madeira tropical sem certificação sustentável para comércio internacional",
      "Actividades classificadas como Património Mundial da UNESCO sem aprovação de impacto",
      "Produção, uso ou comércio de pesticidas/herbicidas proibidos internacionalmente"
    ]
  },
  "financialIntermediaryWorkflow": {
    "policyRef": "IFC Sustainability Policy §27-29",
    "description": "Workflow específico para clientes IFC que são Intermediários Financeiros (FI): bancos, fundos de private equity, microfinanceiras, fundos de habitação e similares.",
    "categoryDetermination": {
      "categoryC_FI": {
        "criteria": "FI com actividades de negócio que apresentam riscos E&S mínimos ou nulos",
        "requirements": "Nenhum requisito E&S específico além do cumprimento da Exclusion List",
        "dashboardBehaviour": "Módulo E&S simplificado; apenas Exclusion List obrigatória"
      },
      "categoryFI": {
        "criteria": "Todos os outros FI que não se qualificam como Categoria C",
        "requirements": [
          "Aplicar a Exclusion List a todos os sub-projectos da carteira",
          "Para financiamento corporativo ou de projecto de longo prazo: requerer ao destinatário seguir leis nacionais (risco E&S limitado) ou aplicar PS/ESS completos (risco E&S significativo)",
          "Estabelecer e manter ESMS para a carteira",
          "Reportar periodicamente ao IFC com base no ESMS"
        ],
        "dashboardBehaviour": "Módulo ESMS de carteira activado; triagem de sub-projectos; Exclusion List obrigatória; relatório de desempenho do ESMS"
      }
    },
    "esmsPortfolioRequirements": [
      "Política E&S do FI aprovada pela gestão",
      "Procedimento de triagem E&S de sub-projectos por nível de risco",
      "Aplicação da Exclusion List IFC a cada sub-projecto antes de aprovação",
      "Due diligence E&S proporcional ao risco do sub-projecto",
      "Monitoramento E&S da carteira com frequência definida",
      "Mecanismo de reclamação acessível a comunidades afectadas por sub-projectos",
      "Capacitação interna da equipa de crédito/investimento em riscos E&S",
      "Relatório anual de desempenho E&S da carteira para o IFC"
    ],
    "subProjectRiskTiers": [
      {
        "tier": "Risco limitado",
        "requirement": "Cumprimento de leis e regulamentos nacionais aplicáveis",
        "dashboardModule": "Checklist de conformidade legal nacional"
      },
      {
        "tier": "Risco significativo",
        "requirement": "Aplicação dos Performance Standards IFC PS1-PS8 ou ESS1-ESS10 conforme o financiador",
        "dashboardModule": "Módulo PS/ESS completo com ESAP e monitoramento"
      }
    ]
  },
  "broadCommunitySupport": {
    "policyRef": "IFC Sustainability Policy §19-20",
    "definition": "Conjunto de expressões das comunidades afectadas — através de indivíduos ou dos seus representantes reconhecidos — em apoio ao projecto. Pode existir apoio comunitário amplo mesmo quando alguns indivíduos ou grupos se opõem ao projecto.",
    "applicability": "Obrigatório em projectos Categoria A e em qualquer projecto onde seja exigido processo de consulta livre, prévia e informada (FPIC), antes da submissão ao Conselho de Administração do financiador.",
    "gate": {
      "trigger": "Projecto classificado como Categoria A ou com PS7/ESS7 activado",
      "blocksSubmission": true,
      "requiredEvidenceBeforeSubmission": [
        "Documentação do processo de consulta livre, prévia e informada com datas, participantes e métodos",
        "Registo das expressões de apoio das comunidades afectadas (actas, declarações, cartas, vídeos ou equivalentes aceites pelo financiador)",
        "Identificação e registo de objecções individuais ou de grupos, com resposta documentada do cliente",
        "Avaliação de que não existe oposição generalizada ou sistemática de grupos afectados materialmente pelo projecto",
        "Confirmação de que o processo de engajamento foi conduzido sem coerção, intimidação ou incentivos indevidos"
      ],
      "outputOnPending": "Alerta de bloqueio de submissão: Broad Community Support não demonstrado. O financiador conduzirá investigação própria antes de apresentar o projecto ao Conselho — cliente deve garantir que a documentação está disponível e consistente."
    },
    "postApprovalMonitoring": {
      "requirement": "Após aprovação do financiador, monitorar continuamente o processo de engajamento comunitário do cliente como parte da supervisão de portfólio.",
      "dashboardModule": "Registo contínuo de consultas, reclamações e expressões de apoio/oposição ao longo da vida do projecto"
    }
  },
  "sectorSpecificModules": {
    "policyRef": "IFC Sustainability Policy §21-23",
    "extractiveIndustries": {
      "sectors": ["Petróleo", "Gás", "Mineração"],
      "policyRef": "IFC Sustainability Policy §22",
      "governanceRiskAssessment": {
        "required": true,
        "significantProjectThreshold": "Projecto que representa 10% ou mais das receitas governamentais do país anfitrião",
        "significantProjectRequirements": [
          "Avaliação de riscos de governação com mitigação adequada documentada",
          "Divulgação pública de pagamentos materiais ao governo: royalties, impostos, partilha de lucros",
          "Divulgação dos termos relevantes de acordos de interesse público: HGA (Host Government Agreement) e IGA (Intergovernmental Agreement)"
        ],
        "smallerProjectRequirements": [
          "Revisão de benefícios líquidos esperados e riscos de governação fraca",
          "Avaliação da aceitabilidade do balanço benefícios/riscos antes de aprovação"
        ]
      },
      "revenueTransparency": {
        "mandatory": true,
        "applicableFrom": "2007-01-01",
        "scope": "Todos os projectos extractivos financiados pelo IFC, independentemente da dimensão",
        "disclosureItems": [
          "Pagamentos materiais ao(s) governo(s) anfitrião(ões) por projecto",
          "Royalties",
          "Impostos aplicáveis ao projecto",
          "Partilha de lucros (profit sharing)"
        ]
      },
      "dashboardModules": [
        "Avaliação de risco de governação com score e mitigações",
        "Registo de pagamentos ao governo com evidências (recibos, extractos, declarações)",
        "Tracker de divulgação de HGA/IGA: estado, data de publicação e link",
        "Calculadora de materialidade: percentagem estimada das receitas governamentais",
        "Alerta de projecto significativo (≥10% receitas) com requisitos adicionais activados automaticamente"
      ]
    },
    "infrastructure": {
      "sectors": ["Água", "Electricidade", "Gás canalizado", "Telecomunicações"],
      "policyRef": "IFC Sustainability Policy §23",
      "applicabilityCondition": "Distribuição final de serviços essenciais ao público geral em condições de monopólio",
      "disclosureItems": [
        "Tarifas domésticas actuais e mecanismos de ajuste tarifário",
        "Padrões de serviço comprometidos (níveis de qualidade, cobertura, tempo de resposta)",
        "Obrigações de investimento do operador",
        "Forma e extensão de qualquer apoio governamental em curso",
        "Em privatizações: taxas de concessão ou receitas de privatização"
      ],
      "disclosureResponsibility": "Divulgação pode ser feita pela entidade governamental responsável (ex: regulador sectorial) ou pelo cliente",
      "dashboardModules": [
        "Registo de tarifas domésticas com histórico e fórmula de ajuste",
        "Tracker de padrões de serviço: comprometido vs. realizado com evidências",
        "Registo de obrigações de investimento e estado de cumprimento",
        "Registo de apoio governamental: tipo, valor, prazo e condições",
        "Módulo de privatização: taxas de concessão, receitas e documentação de divulgação"
      ]
    }
  },
  "sourceVersionClarity": {
    "note": "O IFC mantém duas camadas documentais distintas que o SGAS usa em conjunto. É crítico não confundir os papéis de cada documento.",
    "layers": [
      {
        "id": "ifc-sustainability-policy-2006-local",
        "role": "governance",
        "description": "Política de governação IFC 2006: define missão, categorização A/B/C/FI, responsabilidades IFC, CAO, disclosure e regras para FI e sectores específicos. Não é substituída pelos PS 2012 — permanece como quadro institucional.",
        "useInSaaS": "Categorização de projectos, workflow FI, requisitos sectoriais (extractivo/infraestrutura), Broad Community Support, CAO e Exclusion List."
      },
      {
        "id": "ifc-performance-standards-2012",
        "role": "substantive_requirements",
        "description": "PS1-PS8 versão 2012: são os requisitos substantivos operacionais actuais para clientes IFC/MIGA. Actualizam e superam a versão 2006 dos PS. São a referência principal para evidências, ESAP e monitoramento.",
        "useInSaaS": "Todos os módulos de evidências, checklists, ESAP, contratados, GRM, SEP, biodiversidade, reassentamento, FPIC e monitoramento."
      }
    ]
  },
  "preIndexedKnowledge": [
    {
      "id": "ifc-ps-matrix",
      "label": "Matriz IFC PS1-PS8",
      "schema": "knowledge.ifcPerformanceStandards[]",
      "sourceRef": "ifc-performance-standards-2012",
      "fields": ["code", "dashboard", "requirements", "evidence", "guards"]
    },
    {
      "id": "wb-ess-matrix",
      "label": "Matriz World Bank ESS1-ESS10",
      "schema": "knowledge.worldBankESS[]",
      "sourceRef": "world-bank-esf-resources",
      "fields": ["code", "dashboard", "requirements", "evidence", "guards"]
    },
    {
      "id": "esms-toolkit-index",
      "label": "Toolkit SGAS/ESMS em português",
      "schema": "knowledge.esmsToolkit[]",
      "sourceRef": "esms-toolkit-general-2016-pt",
      "path": "/Users/hendrikribeiro/Library/Mobile Documents/com~apple~CloudDocs/untitled folder 2/112174-WP-PORTUGUESE-ESMS-Toolkit-General-2016-PUBLIC.pdf"
    },
    {
      "id": "self-assessment-index",
      "label": "Autoavaliação SGAS",
      "schema": "knowledge.selfAssessment[]",
      "sourceRef": "esms-self-assessment-2016-pt",
      "path": "/Users/hendrikribeiro/Library/Mobile Documents/com~apple~CloudDocs/untitled folder 2/112104-WP-PORTUGUESE-ESMS-Self-Assessment-v2-3-PUBLIC.pdf",
      "dashboardStatus": "implemented",
      "dashboardModule": "Autoavaliação SGAS",
      "elements": 9,
      "questionCount": 42,
      "scoring": "Escala 0-5; média das perguntas por elemento; média global dos 9 elementos.",
      "dashboardFields": ["company", "projectId", "assessor", "role", "email", "date", "useCase", "questionScores", "elementAverage", "improvementPlan"]
    },
    {
      "id": "exclusion-list-index",
      "label": "Exclusion List IFC",
      "schema": "knowledge.exclusionList[]",
      "sourceRef": "ifc-esrp-exclusion-list",
      "fields": ["category", "description", "exceptions", "dashboardTrigger"]
    },
    {
      "id": "sector-extractive-index",
      "label": "Requisitos sectoriais – Indústrias extractivas",
      "schema": "knowledge.sectorSpecificModules.extractiveIndustries",
      "sourceRef": "ifc-sustainability-policy-2006-local",
      "fields": ["governanceRisk", "revenueDisclosure", "hga", "iga", "materialityThreshold"]
    },
    {
      "id": "sector-infrastructure-index",
      "label": "Requisitos sectoriais – Infraestrutura essencial",
      "schema": "knowledge.sectorSpecificModules.infrastructure",
      "sourceRef": "ifc-sustainability-policy-2006-local",
      "fields": ["tariffs", "serviceStandards", "investmentObligations", "governmentSupport", "privatization"]
    },
    {
      "id": "fi-workflow-index",
      "label": "Workflow Intermediários Financeiros (FI)",
      "schema": "knowledge.financialIntermediaryWorkflow",
      "sourceRef": "ifc-sustainability-policy-2006-local",
      "fields": ["categoryDetermination", "esmsRequirements", "subProjectTiers", "exclusionListApplication"]
    },
    {
      "id": "broad-community-support-index",
      "label": "Broad Community Support – gate e evidências",
      "schema": "knowledge.broadCommunitySupport",
      "sourceRef": "ifc-sustainability-policy-2006-local",
      "fields": ["definition", "applicability", "requiredEvidence", "blockConditions", "postApprovalMonitoring"]
    },
    {
      "id": "implementation-evidence-index",
      "label": "Evidência de implementação real",
      "schema": "dashboard.implementationEvidence[]",
      "sourceRef": "esms-handbook-general-2016-pt",
      "fields": ["date", "module", "procedure", "type", "ref", "validatedBy", "status", "notes"]
    },
    {
      "id": "community-communications-index",
      "label": "Comunicações às comunidades afectadas",
      "schema": "dashboard.communityReports[]",
      "sourceRef": "esms-handbook-general-2016-pt",
      "fields": ["date", "community", "topic", "channel", "feedback", "newRisk", "evidence", "owner", "status"]
    },
    {
      "id": "document-version-control-index",
      "label": "Controlo de versões de documentos",
      "schema": "dashboard.documents[]",
      "sourceRef": "esms-handbook-general-2016-pt",
      "fields": ["name", "version", "owner", "approver", "date", "nextReview", "replaces", "status"]
    },
    {
      "id": "training-effectiveness-index",
      "label": "Eficácia de formação SGAS",
      "schema": "dashboard.trainingPlan[]",
      "sourceRef": "esms-handbook-general-2016-pt",
      "fields": ["topic", "target", "done", "total", "quiz", "practical", "interview", "explains", "signature", "proof"]
    },
    {
      "id": "legal-register-index",
      "label": "Registo Legal Angola + IFC/ESS",
      "schema": "dashboard.legalRegister[]",
      "sourceRef": "esms-handbook-general-2016-pt",
      "fields": ["requirement", "source", "authority", "permit", "expiry", "owner", "evidence", "status"]
    },
    {
      "id": "physical-risk-map-index",
      "label": "Mapa físico de riscos e hotspots",
      "schema": "dashboard.physicalRiskHotspots[]",
      "sourceRef": "esms-toolkit-general-2016-pt",
      "fields": ["id", "label", "type", "risk", "x", "y", "level", "control", "community", "evidence"]
    },
    {
      "id": "process-risk-map-index",
      "label": "Mapeamento de processo para risco e controlo",
      "schema": "dashboard.processRiskMap[]",
      "sourceRef": "esms-toolkit-general-2016-pt",
      "fields": ["process", "step", "risks", "control", "evidence", "owner", "status"]
    },
    {
      "id": "full-grm-index",
      "label": "Registo de reclamações completo",
      "schema": "dashboard.complaints[]",
      "sourceRef": "esms-toolkit-general-2016-pt",
      "fields": ["id", "data", "origem", "cat", "desc", "accepted", "profile", "notifyMethod", "closureEvidence", "satisfaction", "resources", "postMonitoring", "cao", "caoLink", "prazo"]
    },
    {
      "id": "contractor-scorecard-index",
      "label": "Scorecard de contratantes por 9 elementos SGAS",
      "schema": "dashboard.contractors[].scorecard",
      "sourceRef": "esms-toolkit-general-2016-pt",
      "fields": ["policy", "risks", "esap", "training", "emergency", "stakeholders", "grm", "reporting", "monitoring"]
    },
    {
      "id": "kpi-monitoring-protocol-index",
      "label": "Protocolos de monitoramento por KPI",
      "schema": "dashboard.kpiProtocols[]",
      "sourceRef": "esms-handbook-general-2016-pt",
      "fields": ["kpi", "frequency", "method", "equipment", "standard", "owner", "record", "action"]
    },
    {
      "id": "source-version-watcher-index",
      "label": "Watcher de versões oficiais IFC/World Bank",
      "schema": "dashboard.sourceWatchers[]",
      "sourceRef": "world-bank-esf-resources",
      "fields": ["name", "current", "lastChecked", "status", "url", "owner", "note"]
    },
    {
      "id": "world-bank-audit-room-index",
      "label": "Sala de Auditoria Banco Mundial",
      "schema": "dashboard.lenderPackage[]",
      "sourceRef": "world-bank-esf-resources",
      "fields": ["section", "owner", "evidence", "readiness", "status", "gap"]
    },
    {
      "id": "source-register",
      "label": "Registo de fontes e versão",
      "schema": "sources[]",
      "fields": ["id", "type", "name", "path", "url", "dateVerified", "documentDate", "sha256", "role"]
    }
  ],
  "releaseChecklist": [
    {
      "gapRef": "enterpriseGaps[0]",
      "item": "Mapear PS1-PS8, ESS1-ESS10, ESAP e ESCP em campos do dashboard."
    },
    {
      "gapRef": "enterpriseGaps[1]",
      "item": "Activar audit trail para alterações em risco, documento, reclamação, contratante e submissão."
    },
    {
      "gapRef": "enterpriseGaps[2]",
      "item": "Implementar perfis e permissões: gestor, HSE, contractor, auditor e lender viewer."
    },
    {
      "gapRef": "enterpriseGaps[3]",
      "item": "Adicionar versionamento de evidências e anexos por requisito, acção e submissão."
    },
    {
      "gapRef": "enterpriseGaps[4]",
      "item": "Gerar exports PDF/DOCX/XLSX para due diligence, ESAP/ESCP, GRM, SEP e contractor compliance."
    },
    {
      "gapRef": "enterpriseGaps[5]",
      "item": "Adicionar visão multi-projecto para grupos empresariais e donos de obra."
    },
    {
      "gapRef": "enterpriseGaps[6]",
      "item": "Empacotar base local pré-indexada, regras instantâneas e LLM pequeno offline-first."
    },
    {
      "gapRef": "enterpriseGaps[7]",
      "item": "Mostrar disclaimer legal em dashboard, relatórios, exports e JSON."
    },
    {
      "gapRef": "enterpriseGaps[8]",
      "item": "Implementar módulo sectorial extractivo: avaliação de risco de governação, calculadora de materialidade (≥10% receitas), tracker de divulgação de pagamentos, HGA e IGA."
    },
    {
      "gapRef": "enterpriseGaps[9]",
      "item": "Implementar módulo sectorial de infraestrutura: registo de tarifas, padrões de serviço, obrigações de investimento, apoio governamental e privatização."
    },
    {
      "gapRef": "enterpriseGaps[10]",
      "item": "Adicionar gate de Exclusion List no intake de projecto: verificar sector/actividade e bloquear com alerta crítico se enquadrado em actividade proibida."
    },
    {
      "gapRef": "enterpriseGaps[11]",
      "item": "Implementar workflow de Intermediário Financeiro: determinar Categoria C vs. FI, activar módulo ESMS de carteira, triagem de sub-projectos por risco e relatório de desempenho FI."
    },
    {
      "gapRef": "enterpriseGaps[12]",
      "item": "Implementar gate de Broad Community Support: activado automaticamente em Categoria A e PS7/ESS7; bloquear submissão ao financiador até evidências de consulta livre, prévia e informada e expressões de apoio comunitário estarem completas."
    }
  ],
  "ifcPerformanceStandards": [
    {
      "code": "PS1",
      "dashboard": "Autoavaliação SGAS, riscos, ESAP, documentos, relatórios, monitoramento"
    },
    {
      "code": "PS2",
      "dashboard": "Trabalho, HSE, formação, contratados, mecanismo laboral de reclamações"
    },
    {
      "code": "PS3",
      "dashboard": "Resíduos, água, energia, poluição, derrames, indicadores ambientais"
    },
    {
      "code": "PS4",
      "dashboard": "Saúde e segurança comunitária, tráfego, emergência, reclamações comunitárias"
    },
    {
      "code": "PS5",
      "dashboard": "Reassentamento / compensação quando aplicável"
    },
    {
      "code": "PS6",
      "dashboard": "Biodiversidade, habitats, recursos naturais vivos e compensação quando aplicável"
    },
    {
      "code": "PS7",
      "dashboard": "FPIC, povos indígenas / comunidades tradicionais e suporte comunitário amplo quando aplicável"
    },
    {
      "code": "PS8",
      "dashboard": "Património cultural, procedimento de achados fortuitos e consulta a autoridades quando aplicável"
    }
  ],
  "worldBankESS": [
    {
      "code": "ESS1",
      "dashboard": "Avaliação e gestão de riscos e impactos E&S; ESCP; monitoramento"
    },
    {
      "code": "ESS2",
      "dashboard": "Trabalho, condições laborais, HSE e trabalhadores de contratados"
    },
    {
      "code": "ESS3",
      "dashboard": "Eficiência de recursos, poluição, resíduos, água e energia"
    },
    {
      "code": "ESS4",
      "dashboard": "Saúde e segurança da comunidade, tráfego, emergência e segurança"
    },
    {
      "code": "ESS5",
      "dashboard": "Aquisição de terras, restrições de uso e reassentamento involuntário"
    },
    {
      "code": "ESS6",
      "dashboard": "Biodiversidade e recursos naturais vivos"
    },
    {
      "code": "ESS7",
      "dashboard": "Povos indígenas / comunidades tradicionais e FPIC quando aplicável"
    },
    {
      "code": "ESS8",
      "dashboard": "Património cultural"
    },
    {
      "code": "ESS9",
      "dashboard": "Intermediários financeiros: ESMS de carteira, triagem de sub-projectos, Exclusion List e relatório de desempenho"
    },
    {
      "code": "ESS10",
      "dashboard": "Stakeholder engagement, disclosure, SEP e grievance mechanism"
    }
  ],
  "sources": [
    {
      "id": "ifc-sustainability-policy-2006-local",
      "type": "local",
      "role": "governance",
      "roleNote": "Quadro institucional IFC: categorização, CAO, FI, sectores extractivo/infraestrutura, Broad Community Support e Exclusion List. Não substituído pelos PS 2012.",
      "name": "IFC Policy on Social and Environmental Sustainability (2006)",
      "fileName": "Safari 4.pdf",
      "path": "/Users/hendrikribeiro/Library/Mobile Documents/com~apple~CloudDocs/untitled folder 2/Safari 4.pdf",
      "url": null,
      "documentDate": "2006",
      "dateVerified": "2026-06-07",
      "sha256": "42a71b965b0dcf66bd9985f87d0dee19c3992c38aa49635b8cc268bbce6ececf",
      "use": "Política IFC 2006: categorização A/B/C/FI, relatórios de monitoramento, CAO, requisitos sectoriais extractivos e infraestrutura, workflow FI, Broad Community Support e Exclusion List."
    },
    {
      "id": "esms-toolkit-general-2016-pt",
      "type": "local",
      "role": "implementation_tool",
      "name": "IFC ESMS Toolkit General - Portuguese (2016)",
      "fileName": "112174-WP-PORTUGUESE-ESMS-Toolkit-General-2016-PUBLIC.pdf",
      "path": "/Users/hendrikribeiro/Library/Mobile Documents/com~apple~CloudDocs/untitled folder 2/112174-WP-PORTUGUESE-ESMS-Toolkit-General-2016-PUBLIC.pdf",
      "url": null,
      "documentDate": "2016",
      "dateVerified": "2026-06-07",
      "sha256": "2b07f63004cc992d424d467fdb1b9ae363f7245145e250ec7b5266e4bd510094",
      "use": "Ferramentas SGAS, checklists, mecanismos de reclamação, contratados, indicadores e auditoria."
    },
    {
      "id": "esms-handbook-general-2016-pt",
      "type": "local",
      "role": "implementation_tool",
      "name": "IFC ESMS Implementation Handbook General - Portuguese (2016)",
      "fileName": "esms-handbook-general-2016-portuguese.pdf",
      "path": "/Users/hendrikribeiro/Library/Mobile Documents/com~apple~CloudDocs/untitled folder 2/esms-handbook-general-2016-portuguese.pdf",
      "url": null,
      "documentDate": "2016",
      "dateVerified": "2026-06-07",
      "sha256": "4f99c114de82e466843155be200f3747a331aa90d9ed6b37ce36c1f9e2345202",
      "use": "Manual de implementação SGAS, nove elementos, cadeia de abastecimento, monitoramento e revisão."
    },
    {
      "id": "esms-self-assessment-2016-pt",
      "type": "local",
      "role": "implementation_tool",
      "name": "IFC ESMS Self-Assessment and Improvement Guide - Portuguese (2016)",
      "fileName": "112104-WP-PORTUGUESE-ESMS-Self-Assessment-v2-3-PUBLIC.pdf",
      "path": "/Users/hendrikribeiro/Library/Mobile Documents/com~apple~CloudDocs/untitled folder 2/112104-WP-PORTUGUESE-ESMS-Self-Assessment-v2-3-PUBLIC.pdf",
      "url": null,
      "documentDate": "2016",
      "dateVerified": "2026-06-07",
      "sha256": "3d19a347533c8acaa0b9fe1c17bf98293b88a8efb262c0c21341017e8c19a9d4",
      "use": "Guia de autoavaliação e melhoria SGAS, maturidade 0-5 e plano de melhoria."
    },
    {
      "id": "world-bank-esf",
      "type": "official",
      "role": "substantive_requirements",
      "name": "World Bank Environmental and Social Framework",
      "path": null,
      "url": "https://www.worldbank.org/en/projects-operations/environmental-and-social-framework",
      "documentDate": "2016",
      "dateVerified": "2026-06-07",
      "sha256": null,
      "use": "ESF para borrowers IBRD/IDA e IPF."
    },
    {
      "id": "world-bank-esf-resources",
      "type": "official",
      "role": "substantive_requirements",
      "name": "World Bank ESF Resources",
      "path": null,
      "url": "https://www.worldbank.org/en/projects-operations/environmental-and-social-framework/brief/environmental-and-social-framework-resources",
      "documentDate": "current-online",
      "dateVerified": "2026-06-07",
      "sha256": null,
      "use": "Recursos ESS1-ESS10, templates e orientação operacional."
    },
    {
      "id": "ifc-performance-standards-2012",
      "type": "official",
      "role": "substantive_requirements",
      "roleNote": "PS1-PS8 versão operacional actual para clientes IFC/MIGA. Actualiza e supera a versão PS de 2006. Referência principal para evidências, ESAP e monitoramento no SGAS.",
      "name": "IFC Performance Standards on Environmental and Social Sustainability",
      "path": null,
      "url": "https://www.ifc.org/en/insights-reports/2012/ifc-performance-standards",
      "documentDate": "2012",
      "dateVerified": "2026-06-07",
      "sha256": null,
      "use": "PS1-PS8 para clientes IFC/MIGA e project finance: requisitos substantivos, evidências, ESAP, GRM, SEP, monitoramento, contratados e todos os módulos de conformidade."
    },
    {
      "id": "cao-complaints-process",
      "type": "official",
      "role": "accountability_mechanism",
      "name": "CAO Complaints / Intake and Assessment",
      "path": null,
      "url": "https://www.cao-ombudsman.org/how-we-work/intake-assessment",
      "documentDate": "current-online",
      "dateVerified": "2026-06-07",
      "sha256": null,
      "use": "Mecanismo independente para reclamações de comunidades afectadas por projectos IFC/MIGA. Independente da gestão IFC; reporta ao Presidente do Grupo Banco Mundial."
    },
    {
      "id": "ifc-esrp-exclusion-list",
      "type": "official",
      "role": "intake_gate",
      "name": "IFC Environmental and Social Review Procedure – Exclusion List",
      "path": null,
      "url": "https://www.ifc.org/en/what-we-do/sector-expertise/environmental-social-governance/e-s-policies-standards/environmental-and-social-review-procedure",
      "documentDate": "current-online",
      "dateVerified": "2026-06-07",
      "sha256": null,
      "use": "Lista de actividades que o IFC não financia. Deve ser verificada no intake de projecto no SGAS; actividades excluídas bloqueiam avanço."
    }
  ],
  "extractionTags": [
    "due-diligence",
    "ifc",
    "world-bank",
    "esms",
    "sgas",
    "ess",
    "ps",
    "esap",
    "escp",
    "grm",
    "stakeholders",
    "contractors",
    "audit-readiness",
    "angola",
    "africa",
    "construction",
    "hse",
    "fpic",
    "cao",
    "hospital",
    "exclusion-list",
    "financial-intermediary",
    "broad-community-support",
    "extractive-industries",
    "infrastructure",
    "revenue-disclosure",
    "hga",
    "iga",
    "tariff-disclosure",
    "governance-risk",
    "category-fi",
    "esms-portfolio",
    "self-assessment-v2-3",
    "esms-maturity",
    "due-diligence-readiness",
    "implementation-evidence",
    "community-reporting",
    "affected-communities",
    "document-version-control",
    "training-effectiveness",
    "legal-register",
    "management-review",
    "field-observation",
    "visual-observation",
    "interviews",
    "manager-validation",
    "audit-room",
    "physical-risk-map",
    "process-risk-map",
    "kpi-protocol",
    "source-version-watcher",
    "lender-package",
    "contractor-scorecard",
    "grm-closure",
    "post-closure-monitoring",
    "hotspots",
    "process-mapping",
    "world-bank-audit"
  ]
}`);


// ── Inject markup ─────────────────────────────────────────────────
(function injectCommercialIntelUI(){
  // Nav item
  const sidebar = document.querySelector('#grp-principal');
  if (sidebar) {
    const navItem = document.createElement('div');
    navItem.className = 'nav-item';
    navItem.innerHTML = '<span class="nav-icon">💼</span>Inteligência Comercial';
    navItem.onclick = function(){ nav('comercial', this); };
    sidebar.appendChild(navItem);
  }

  // Dashboard card (replace placeholder if present)
  const placeholder = document.getElementById('commercial-intel-mount');
  if (placeholder) {
    placeholder.innerHTML = `
      <div class="card">
        <div class="card-header"><span class="card-title">💼 Valor comercial</span><span class="badge blue">Pré-loan</span></div>
        <div class="card-body commercial-note">
          <strong id="commercial-positioning">Preparação para due diligence IFC / World Bank E&S.</strong><br>
          Empresas em fase de aprovação de financiamento já precisam demonstrar capacidade de SGAS.
          <div class="intel-actions" id="dash-sell-badges">
            <span class="badge green" id="dash-sell-demo">Demo: 8.5/10</span>
            <span class="badge amber" id="dash-sell-pilot">Paid pilot: 8.0/10</span>
            <span class="badge amber" id="dash-sell-enterprise">Enterprise SaaS: 7.0/10</span>
            <button class="btn" onclick="nav('comercial',null)">Abrir análise</button>
          </div>
        </div>
      </div>`;
  }

  // Page section
  const mainArea = document.getElementById('main-content') || document.querySelector('.main-content');
  if (mainArea) {
    const pageDiv = document.createElement('div');
    pageDiv.className = 'page-content';
    pageDiv.id = 'page-comercial';
    pageDiv.style.display = 'none';
    pageDiv.innerHTML = `  <div class="page-content" id="page-comercial">
    <div class="section-header">
      <div><div class="section-title">Inteligência Comercial e Due Diligence</div><div class="section-sub">Base estruturada para venda, extração rápida e evolução do dashboard IFC / World Bank</div></div>
      <div style="display:flex;gap:8px">
        <button class="btn" onclick="copyCommercialPitch()">Copiar pitch</button>
        <button class="btn primary" onclick="downloadCommercialJSON()">Exportar JSON</button>
      </div>
    </div>
    <div class="grid-4" style="margin-bottom:20px">
      <div class="metric-card"><div class="metric-label">Sellability demo</div><div class="metric-value green" id="sell-demo">8.5/10</div><div class="metric-sub">para apresentação comercial</div></div>
      <div class="metric-card"><div class="metric-label">Paid pilot</div><div class="metric-value amber" id="sell-pilot">8.0/10</div><div class="metric-sub">com consultoria de onboarding</div></div>
      <div class="metric-card"><div class="metric-label">Enterprise SaaS</div><div class="metric-value amber" id="sell-enterprise">7.0/10</div><div class="metric-sub">gaps sectoriais e FI preenchidas</div></div>
      <div class="metric-card"><div class="metric-label">Modelo recomendado</div><div class="metric-value" style="font-size:22px" id="sell-model">Pilot+</div><div class="metric-sub">software + advisory</div></div>
    </div>
    <div class="intel-grid">
      <div class="card">
        <div class="card-header"><span class="card-title">Veredicto do gestor</span><span class="badge green">Vendável</span></div>
        <div class="card-body">
          <div class="commercial-note" id="manager-verdict"></div>
          <div class="intel-actions" id="positioning-tags"></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">Extração rápida</span><span class="badge blue">Sales-ready</span></div>
        <div class="card-body">
          <div class="intel-list" id="quick-extraction-list"></div>
        </div>
      </div>
    </div>
    <div class="grid-2" style="margin-bottom:16px">
      <div class="card">
        <div class="card-header"><span class="card-title">Motor local de apoio</span><span class="badge green">Offline-first</span></div>
        <div class="card-body"><div class="intel-list" id="local-ai-stack"></div></div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">Alertas rápidos no preenchimento</span><span class="badge red">Guardrails</span></div>
        <div class="card-body"><div class="intel-list" id="local-decision-guards"></div></div>
      </div>
    </div>
    <div class="grid-2" style="margin-bottom:16px">
      <div class="card">
        <div class="card-header"><span class="card-title">Base pronta para extração</span><span class="badge blue">Pré-indexada</span></div>
        <div class="card-body"><div class="intel-list" id="preindexed-knowledge"></div></div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">Mínimo antes de vender</span><span class="badge amber">Go-live</span></div>
        <div class="card-body"><div class="intel-list" id="release-checklist"></div></div>
      </div>
    </div>
    <div class="grid-2" style="margin-bottom:16px">
      <div class="card">
        <div class="card-header"><span class="card-title">Exclusion List IFC</span><span class="badge red">Intake gate</span></div>
        <div class="card-body"><div class="intel-list" id="exclusion-list-check"></div></div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">Intermediários Financeiros</span><span class="badge blue">Categoria FI</span></div>
        <div class="card-body"><div class="intel-list" id="fi-workflow"></div></div>
      </div>
    </div>
    <div class="grid-2" style="margin-bottom:16px">
      <div class="card">
        <div class="card-header"><span class="card-title">Broad Community Support</span><span class="badge amber">Gate</span></div>
        <div class="card-body"><div class="intel-list" id="broad-community-support"></div></div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">Módulos sectoriais</span><span class="badge purple">Extractivo · Infraestrutura</span></div>
        <div class="card-body"><div class="intel-list" id="sector-specific-modules"></div></div>
      </div>
    </div>
    <div class="card" style="margin-bottom:16px">
      <div class="card-header"><span class="card-title">Clareza de versão das fontes</span><span class="badge gray">2006 vs 2012</span></div>
      <div class="card-body"><div class="intel-list" id="source-version-clarity"></div></div>
    </div>
    <div class="grid-2" style="margin-bottom:16px">
      <div class="card">
        <div class="card-header"><span class="card-title">Compradores-alvo</span></div>
        <div class="card-body"><div class="intel-list" id="buyer-targets"></div></div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">Gaps antes de enterprise</span></div>
        <div class="card-body"><div class="intel-list" id="enterprise-gaps"></div></div>
      </div>
    </div>
    <div class="grid-2" style="margin-bottom:16px">
      <div class="card">
        <div class="card-header"><span class="card-title">Mapeamento IFC PS</span><span class="badge purple">PS1–PS8</span></div>
        <div class="card-body" id="ifc-mapping"></div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">Mapeamento World Bank ESF</span><span class="badge amber">ESS1–ESS10</span></div>
        <div class="card-body" id="ess-mapping"></div>
      </div>
    </div>
    <div class="card">
      <div class="card-header"><span class="card-title">Fontes carregadas na base</span><span class="badge gray">Documentos + links oficiais</span></div>
      <div class="card-body" id="commercial-sources"></div>
    </div>
  </div>

  <!-- AUTOAVALIAÇÃO -->
  <div class="page-content" id="page-diagnostico">
    <div class="section-header">
      <div>
        <div class="section-title">Diagnóstico IFC PS1–PS8</div>
        <div class="section-sub">Descarregue o template PDF preenchível · preencha com dados da sua empresa · carregue para obter o relatório de conformidade automático</div>
      </div>
      <button class="btn primary" onclick="diagnostico_generatePDF()" id="btn-diag-download">⬇ Descarregar Template PDF</button>
    </div>
    <div class="alert-banner info" style="margin-bottom:20px">
      📋 <strong>Como funciona:</strong> 1 — Descarregue o PDF preenchível &nbsp;·&nbsp; 2 — Preencha no Adobe Reader (S / N / D / NA) &nbsp;·&nbsp; 3 — Carregue o PDF preenchido abaixo &nbsp;·&nbsp; 4 — O sistema compara com IFC PS1–PS8 e mostra os gaps
    </div>
    <div class="card" style="margin-bottom:20px">
      <div class="card-header"><span class="card-title">📤 Carregar PDF Preenchido</span></div>
      <div style="padding:20px">
        <div id="diag-drop-zone"
          style="border:2px dashed var(--border);border-radius:10px;padding:40px;text-align:center;cursor:pointer;transition:all 0.2s;background:#FAFAFA"
          onclick="document.getElementById('diag-file-input').click()"
          ondragover="event.preventDefault();this.style.borderColor='var(--accent)';this.style.background='#F0FDF9'"
          ondragleave="this.style.borderColor='var(--border)';this.style.background='#FAFAFA'"
          ondrop="event.preventDefault();this.style.borderColor='var(--border)';this.style.background='#FAFAFA';diagnostico_handleDrop(event)">
          <div style="font-size:36px;margin-bottom:10px">📄</div>
          <div style="font-weight:600;color:var(--text);margin-bottom:4px">Arrastar PDF aqui ou clicar para seleccionar</div>
          <div style="font-size:12px;color:var(--text-2)">Apenas ficheiros .pdf gerados pelo template SGAS Pro</div>
        </div>
        <input type="file" id="diag-file-input" accept=".pdf" style="display:none" onchange="diagnostico_handleFile(this.files[0])">
        <div id="diag-parse-status" style="display:none;margin-top:14px;padding:10px 14px;border-radius:6px;font-size:13px"></div>
      </div>
    </div>
    <div id="diag-results" style="display:none">
      <div id="diag-profile-card" class="card" style="margin-bottom:16px"></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <div class="card">
          <div class="card-header"><span class="card-title">📊 Pontuação por Padrão IFC</span></div>
          <div id="diag-scores" style="padding:8px 20px 16px"></div>
        </div>
        <div class="card">
          <div class="card-header"><span class="card-title">⚠️ Gaps Identificados</span></div>
          <div id="diag-gaps" style="padding:8px 20px 16px;max-height:420px;overflow-y:auto"></div>
        </div>
      </div>
    </div>
  </div>

  <div class="page-content" id="page-avaliacao">
    <div class="section-header">
      <div><div class="section-title">Autoavaliação SGAS</div><div class="section-sub">9 elementos IFC ESMS · Guia de Autoavaliação e Melhoria v2.3 · Escala 0–5</div></div>
      <div style="display:flex;gap:8px">
        <button class="btn" onclick="expandAllElems()">Expandir todos</button>
        <button class="btn primary" onclick="saveAvaliacao()">✓ Guardar e actualizar dashboard</button>
      </div>
    </div>
    <div class="alert-banner info">
      📋 <strong>Instrução:</strong> Clica em cada elemento para expandir. Responde às perguntas do Guia IFC ESMS v2.3 numa escala 0–5. A média de cada elemento alimenta o radar, o dashboard e o plano de melhoria para due diligence.
    </div>
    <div class="card" style="margin-bottom:16px">
      <div class="card-header">
        <span class="card-title">Ficha da autoavaliação</span>
        <span class="badge blue">IFC ESMS Self-Assessment v2.3</span>
      </div>
      <div class="card-body">
        <div class="assessment-field-grid">
          <div class="form-group"><label class="form-label">Empresa / projecto</label><input class="form-input" id="ass-company" onchange="setAssessmentMeta('company',this.value)"></div>
          <div class="form-group"><label class="form-label">Referência / loan</label><input class="form-input" id="ass-project-id" onchange="setAssessmentMeta('projectId',this.value)"></div>
          <div class="form-group"><label class="form-label">Avaliador</label><input class="form-input" id="ass-assessor" onchange="setAssessmentMeta('assessor',this.value)"></div>
          <div class="form-group"><label class="form-label">Data</label><input class="form-input" type="date" id="ass-date" onchange="setAssessmentMeta('date',this.value)"></div>
        </div>
        <div class="assessment-field-grid" style="margin-top:10px">
          <div class="form-group"><label class="form-label">Função</label><input class="form-input" id="ass-role" onchange="setAssessmentMeta('role',this.value)"></div>
          <div class="form-group"><label class="form-label">Email</label><input class="form-input" id="ass-email" onchange="setAssessmentMeta('email',this.value)"></div>
          <div class="form-group"><label class="form-label">Tipo de uso</label><select class="form-select" id="ass-use" onchange="setAssessmentMeta('useCase',this.value)"><option>Preparação para due diligence</option><option>Supervisão pós-financiamento</option><option>Auditoria interna SGAS</option><option>Plano de melhoria pré-Board</option></select></div>
          <div class="form-group"><label class="form-label">Fonte base</label><input class="form-input" value="Guia IFC ESMS v2.3 · 2015" disabled></div>
        </div>
      </div>
    </div>
    <!-- Summary metrics -->
    <div class="grid-4" style="margin-bottom:20px" id="esms-summary-metrics"></div>
    <!-- Radar + Progress -->
    <div class="grid-2" style="margin-bottom:24px">
      <div class="card">
        <div class="card-header"><span class="card-title">📡 Radar de Maturidade SGAS</span></div>
        <div class="card-body" style="display:flex;justify-content:center;padding:12px">
          <canvas id="qa-radar" width="240" height="240"></canvas>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">📊 Score por Elemento</span><span id="esms-overall-label" class="badge amber">—</span></div>
        <div class="card-body" style="padding:12px 20px" id="esms-bars"></div>
      </div>
    </div>
    <!-- Element accordion -->
    <div id="esms-elements-container"></div>
    <div style="margin-top:20px;display:flex;gap:10px;padding-bottom:4px">
      <button class="btn primary" onclick="saveAvaliacao()">✓ Guardar e actualizar dashboard</button>
      <button class="btn" onclick="exportAvaliacao()">↓ Exportar relatório PDF</button>
    </div>
  </div>

  <!-- PS1-PS8 -->
  <div class="page-content" id="page-ps">
    <div class="section-header">
      <div><div class="section-title">Padrões de Desempenho IFC</div><div class="section-sub">PS1–PS8 · Conformidade detalhada com requisitos do Banco Mundial</div></div>
      <div style="display:flex;gap:8px">
        <span class="badge green">✓ <span id="ps-conforme">0</span> conformes</span>
        <span class="badge amber">◑ <span id="ps-parcial">0</span> parciais</span>
        <span class="badge red">✗ <span id="ps-nc">0</span> NC</span>
      </div>
    </div>
    <div id="ps-container"></div>
  </div>

`;
    mainArea.appendChild(pageDiv);
  }

  // Wire renderCommercialIntelligence into renderAll if available
  if (typeof renderAll === 'function') {
    const origRenderAll = renderAll;
    window.renderAll = function(){ origRenderAll(); renderCommercialIntelligence(); };
  }
  renderCommercialIntelligence();
})();

// ── Functions ─────────────────────────────────────────────────────
// ===================== COMMERCIAL INTELLIGENCE =====================
function formatSellabilityScore(value, scale){
  const precision = scale && Number.isInteger(scale.precision) ? scale.precision : 1;
  const max = scale && scale.max ? scale.max : 10;
  return `${Number(value).toFixed(precision)}/${max}`;
}

function intelItemHtml(item, dotStyle=''){
  if(typeof item === 'string'){
    return `<div class="intel-item"><span class="intel-dot" ${dotStyle}></span><div>${item}</div></div>`;
  }
  const label = item.label || item.item || item.id || 'Item';
  const value = item.value || item.description || '';
  const meta = [
    item.standard,
    item.schema,
    item.sourceRef ? `source: ${item.sourceRef}` : '',
    item.gapRef ? `gap: ${item.gapRef}` : '',
    item.path ? `path: ${item.path}` : '',
    item.url ? `url: ${item.url}` : ''
  ].filter(Boolean).join('<br>');
  return `<div class="intel-item"><span class="intel-dot" ${dotStyle}></span><div><strong>${label}</strong>${value}${meta?`<div class="field-note">${meta}</div>`:''}</div></div>`;
}

function listItemsHtml(items, dotStyle=''){
  return (items||[]).map(item=>intelItemHtml(item,dotStyle)).join('');
}

function simpleListHtml(items, dotStyle=''){
  return (items||[]).map(item=>`<div class="intel-item"><span class="intel-dot" ${dotStyle}></span><div>${item}</div></div>`).join('');
}

function renderCommercialIntelligence(){
  const db=COMMERCIAL_INTELLIGENCE_DB;
  const scale=db.sellabilityScores.scale;
  const demoScore=db.sellabilityScores.demo;
  const pilotScore=db.sellabilityScores.paidPilot;
  const enterpriseScore=db.sellabilityScores.enterpriseSaaS;

  // ── Scores (commercial page) ──
  document.getElementById('sell-demo').textContent=formatSellabilityScore(demoScore,scale);
  document.getElementById('sell-pilot').textContent=formatSellabilityScore(pilotScore,scale);
  document.getElementById('sell-enterprise').textContent=formatSellabilityScore(enterpriseScore,scale);

  // ── Sync dashboard badges ──
  const dDemo=document.getElementById('dash-sell-demo');
  const dPilot=document.getElementById('dash-sell-pilot');
  const dEnt=document.getElementById('dash-sell-enterprise');
  if(dDemo){dDemo.textContent=`Demo: ${formatSellabilityScore(demoScore,scale)}`;dDemo.className='badge '+(demoScore>=8?'green':demoScore>=6?'amber':'red');}
  if(dPilot){dPilot.textContent=`Paid pilot: ${formatSellabilityScore(pilotScore,scale)}`;dPilot.className='badge '+(pilotScore>=8?'green':pilotScore>=6?'amber':'red');}
  if(dEnt){dEnt.textContent=`Enterprise SaaS: ${formatSellabilityScore(enterpriseScore,scale)}`;dEnt.className='badge '+(enterpriseScore>=8?'green':enterpriseScore>=6?'amber':'red');}

  // ── Veredicto ──
  document.getElementById('manager-verdict').innerHTML=`
    <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--accent);margin-bottom:6px">${db.positioning}</div>
    <p style="font-size:13px;color:var(--text);line-height:1.7;margin-bottom:12px">${db.verdict}</p>
    <div style="padding:10px 12px;background:var(--accent-light);border-radius:var(--radius);margin-bottom:8px">
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;color:var(--accent-dark);margin-bottom:3px">Oferta recomendada</div>
      <div style="font-size:13px;color:var(--text)">${db.recommendedOffer}</div>
    </div>
    <div style="padding:8px 12px;background:#FFFBEB;border-radius:var(--radius);border-left:3px solid var(--warning)">
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;color:var(--warning);margin-bottom:2px">Disclaimer legal</div>
      <div style="font-size:12px;color:#92400E">${db.disclaimer}</div>
    </div>`;

  // ── Tags (compactas, sem dominar o ecrã) ──
  document.getElementById('positioning-tags').innerHTML=`
    <details style="margin-top:12px">
      <summary style="font-size:11px;font-weight:600;color:var(--text-3);cursor:pointer;text-transform:uppercase;letter-spacing:.06em;list-style:none">
        ▸ ${db.extractionTags.length} tags de extração
      </summary>
      <div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:8px">
        ${db.extractionTags.map(t=>`<span class="badge gray" style="font-size:10px">${t}</span>`).join('')}
      </div>
    </details>`;

  // ── Extração rápida ──
  document.getElementById('quick-extraction-list').innerHTML=db.quickExtraction.map(item=>`
    <div style="padding:10px 12px;border:1px solid var(--border);border-radius:var(--radius);margin-bottom:8px;background:#FAFAFA">
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--accent);margin-bottom:4px">${item.label}</div>
      <div style="font-size:13px;color:var(--text);line-height:1.5">${item.value}</div>
    </div>`).join('');

  // ── Motor local de apoio ──
  document.getElementById('local-ai-stack').innerHTML=db.localAiArchitecture.map(item=>`
    <div style="display:flex;gap:10px;padding:9px 0;border-bottom:1px solid #F3F4F6">
      <div style="width:8px;height:8px;border-radius:50%;background:var(--accent);flex-shrink:0;margin-top:5px"></div>
      <div><div style="font-size:12px;font-weight:600;color:var(--text)">${item.label}</div>
      <div style="font-size:12px;color:var(--text-2);margin-top:2px;line-height:1.5">${item.value}</div></div>
    </div>`).join('');

  // ── Alertas / Guardrails (cards com severidade) ──
  const G={
    crit:{bg:'#FEE2E2',brd:'#FCA5A5',txt:'#991B1B',icon:'🔴'},
    warn:{bg:'#FFFBEB',brd:'#FCD34D',txt:'#92400E',icon:'⚠️'},
    info:{bg:'#EFF6FF',brd:'#BFDBFE',txt:'#1E40AF',icon:'ℹ️'},
  };
  function guardStyle(v){
    if(/^Bloquear|^Alerta crítico/.test(v)) return G.crit;
    if(/^Indicar|^Para distribuição/.test(v)) return G.info;
    return G.warn;
  }
  document.getElementById('local-decision-guards').innerHTML=db.localDecisionGuards.map(g=>{
    const s=guardStyle(g.value);
    return `<div style="padding:10px 12px;border:1px solid ${s.brd};border-radius:var(--radius);margin-bottom:8px;background:${s.bg}">
      <div style="display:flex;align-items:center;gap:7px;margin-bottom:4px;flex-wrap:wrap">
        <span style="font-size:13px">${s.icon}</span>
        <strong style="font-size:12px;color:${s.txt};flex:1">${g.label}</strong>
        <span style="font-size:10px;font-weight:600;color:${s.txt};opacity:.65;white-space:nowrap">${g.standard}</span>
      </div>
      <div style="font-size:12px;color:${s.txt};line-height:1.55;padding-left:20px">${g.value}</div>
    </div>`;
  }).join('');

  // ── Base pré-indexada (sem schemas/paths internos) ──
  const srcShort=id=>id.replace('ifc-','').replace('world-bank-','wb-').replace(/-2016-pt|-2006-local|-2012/g,'').replace(/-/g,' ');
  document.getElementById('preindexed-knowledge').innerHTML=db.preIndexedKnowledge.map(item=>`
    <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #F3F4F6">
      <div style="width:8px;height:8px;border-radius:50%;background:var(--accent);flex-shrink:0"></div>
      <div style="flex:1;font-size:13px;color:var(--text)">${item.label}</div>
      ${item.sourceRef?`<span class="badge gray" style="font-size:10px;white-space:nowrap">${srcShort(item.sourceRef)}</span>`:''}
    </div>`).join('');

  // ── Release checklist (numerado com progresso) ──
  const total=db.releaseChecklist.length;
  document.getElementById('release-checklist').innerHTML=`
    <div style="margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;margin-bottom:5px">
        <span style="font-size:12px;color:var(--text-2)">${total} itens para go-live enterprise</span>
        <span class="badge amber">Em desenvolvimento</span>
      </div>
      <div style="height:5px;background:#F3F4F6;border-radius:3px"><div style="height:5px;background:var(--warning);border-radius:3px;width:0%"></div></div>
    </div>
    ${db.releaseChecklist.map((item,i)=>`
      <div style="display:flex;align-items:flex-start;gap:8px;padding:7px 0;border-bottom:1px solid #F9FAFB">
        <div style="width:20px;height:20px;border-radius:50%;border:1.5px solid #D1D5DB;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--text-3);flex-shrink:0">${i+1}</div>
        <div style="font-size:12px;color:var(--text);line-height:1.5">${item.item}</div>
      </div>`).join('')}`;

  // ── Exclusion List (gate visual) ──
  const el=db.exclusionListCheck;
  document.getElementById('exclusion-list-check').innerHTML=`
    <div style="padding:12px;background:#FEE2E2;border-radius:var(--radius);border:1px solid #FCA5A5;margin-bottom:12px">
      <div style="font-size:11px;font-weight:700;color:#991B1B;text-transform:uppercase;margin-bottom:3px">🚫 Trigger de intake</div>
      <div style="font-size:12px;color:#7F1D1D;line-height:1.5;margin-bottom:6px">${el.intakeGate.trigger}</div>
      <div style="font-size:12px;color:#991B1B;font-style:italic">${el.intakeGate.action}</div>
    </div>
    <div style="font-size:11px;font-weight:600;color:var(--text-2);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">Categorias bloqueadas</div>
    ${el.typicalExclusionCategories.map(cat=>`
      <div style="display:flex;align-items:flex-start;gap:8px;padding:5px 0;border-bottom:1px solid #FEE2E2;font-size:12px;color:var(--text)">
        <span style="color:#DC2626;flex-shrink:0;font-weight:700">✕</span>${cat}
      </div>`).join('')}`;

  // ── FI Workflow (dois estados + checklist ESMS) ──
  const fi=db.financialIntermediaryWorkflow;
  document.getElementById('fi-workflow').innerHTML=`
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">
      <div style="padding:10px;background:var(--success-bg);border:1px solid #A7F3D0;border-radius:var(--radius)">
        <div style="font-size:10px;font-weight:700;color:var(--success);text-transform:uppercase;margin-bottom:4px">✓ Categoria C</div>
        <div style="font-size:12px;color:var(--text);line-height:1.4">${fi.categoryDetermination.categoryC_FI.dashboardBehaviour}</div>
      </div>
      <div style="padding:10px;background:var(--info-bg);border:1px solid #BFDBFE;border-radius:var(--radius)">
        <div style="font-size:10px;font-weight:700;color:var(--info);text-transform:uppercase;margin-bottom:4px">→ Categoria FI</div>
        <div style="font-size:12px;color:var(--text);line-height:1.4">${fi.categoryDetermination.categoryFI.dashboardBehaviour}</div>
      </div>
    </div>
    <div style="font-size:11px;font-weight:600;color:var(--text-2);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">Requisitos ESMS de carteira</div>
    ${fi.esmsPortfolioRequirements.map(r=>`
      <div style="display:flex;align-items:flex-start;gap:8px;padding:5px 0;border-bottom:1px solid #F3F4F6;font-size:12px;color:var(--text)">
        <span style="color:var(--accent);flex-shrink:0">✓</span>${r}
      </div>`).join('')}`;

  // ── Broad Community Support (gate numerado) ──
  const bcs=db.broadCommunitySupport;
  document.getElementById('broad-community-support').innerHTML=`
    <div style="padding:10px 12px;background:var(--warning-bg);border:1px solid #FCD34D;border-radius:var(--radius);margin-bottom:12px">
      <div style="font-size:11px;font-weight:700;color:#92400E;text-transform:uppercase;margin-bottom:3px">⚠️ Gate — Bloqueia submissão ao financiador</div>
      <div style="font-size:12px;color:#92400E;line-height:1.5">${bcs.applicability}</div>
    </div>
    <div style="font-size:11px;font-weight:600;color:var(--text-2);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">Evidências obrigatórias antes da submissão</div>
    ${bcs.gate.requiredEvidenceBeforeSubmission.map((e,i)=>`
      <div style="display:flex;align-items:flex-start;gap:8px;padding:6px 0;border-bottom:1px solid #F3F4F6;font-size:12px;color:var(--text)">
        <span style="width:18px;height:18px;border-radius:50%;border:1.5px solid #D97706;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#D97706;flex-shrink:0">${i+1}</span>${e}
      </div>`).join('')}
    <div style="margin-top:10px;padding:8px 10px;background:var(--accent-light);border-radius:var(--radius);font-size:12px;color:var(--accent-dark)">
      <strong>Pós-aprovação:</strong> ${bcs.postApprovalMonitoring.requirement}
    </div>`;

  // ── Módulos sectoriais ──
  // §22-23 IFC Policy 2006 — Sector-specific disclosure trackers
  const sectorDisc=JSON.parse(localStorage.getItem('sector-disc')||'{"extractive":{"materiality":"no","royalties":"pendente","taxes":"pendente","profits":"pendente","hga":"pendente","iga":"pendente"},"infra":{"tariff":"pendente","standards":"pendente","investment":"pendente","govSupport":"pendente"}}');
  const statusBadge=s=>s==='divulgado'?'<span class="badge green">Divulgado</span>':s==='nao-aplicavel'?'<span class="badge gray">N/A</span>':'<span class="badge amber">Pendente</span>';
  const saveDisc=()=>localStorage.setItem('sector-disc',JSON.stringify(sectorDisc));
  document.getElementById('sector-specific-modules').innerHTML=`
    <div style="margin-bottom:14px">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
        <span style="font-size:18px">⛏️</span>
        <div style="flex:1"><div style="font-size:13px;font-weight:600;color:var(--text)">Indústrias Extractivas — §22 Política IFC 2006</div><div style="font-size:11px;color:var(--text-3)">Petróleo · Gás · Mineração · Gatilho: ≥10% receitas gov.</div></div>
        <span class="badge purple">§22</span>
      </div>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;padding:8px;background:var(--bg-3);border-radius:6px">
        <div style="font-size:12px;flex:1">O projecto representa ≥10% das receitas governamentais?</div>
        <select class="form-select" style="width:120px;font-size:11px" onchange="const sd=JSON.parse(localStorage.getItem('sector-disc')||'{}');if(!sd.extractive)sd.extractive={};sd.extractive.materiality=this.value;localStorage.setItem('sector-disc',JSON.stringify(sd));renderCommercialIntelligence()" >
          <option value="no" ${sectorDisc.extractive.materiality==='no'?'selected':''}>Não / N/A</option>
          <option value="yes" ${sectorDisc.extractive.materiality==='yes'?'selected':''}>Sim — aplicável</option>
          <option value="unknown" ${sectorDisc.extractive.materiality==='unknown'?'selected':''}>Desconhecido</option>
        </select>
      </div>
      ${sectorDisc.extractive.materiality==='yes'?`
      <div style="display:flex;flex-direction:column;gap:6px">
        ${[['royalties','Pagamentos de royalties ao governo'],['taxes','Impostos e taxas sectoriais'],['profits','Partilha de lucros (profit sharing)'],['hga','Acordos de Interesse Público (HGA)'],['iga','Acordos Intergovernamentais (IGA)']].map(([k,label])=>`
        <div style="display:flex;align-items:center;gap:8px;padding:6px 8px;background:var(--bg-3);border-radius:4px">
          <div style="font-size:12px;flex:1">${label}</div>
          <select class="form-select" style="width:140px;font-size:11px" onchange="const sd=JSON.parse(localStorage.getItem('sector-disc')||'{}');if(!sd.extractive)sd.extractive={};sd.extractive['${k}']=this.value;localStorage.setItem('sector-disc',JSON.stringify(sd));renderCommercialIntelligence()">
            <option value="pendente" ${(sectorDisc.extractive[k]||'pendente')==='pendente'?'selected':''}>Pendente</option>
            <option value="divulgado" ${sectorDisc.extractive[k]==='divulgado'?'selected':''}>Divulgado</option>
            <option value="nao-aplicavel" ${sectorDisc.extractive[k]==='nao-aplicavel'?'selected':''}>N/A</option>
          </select>
          ${statusBadge(sectorDisc.extractive[k]||'pendente')}
        </div>`).join('')}
      </div>`:'<div style="font-size:11px;color:var(--text-3);padding:6px 0">Marcar "Sim" acima para activar o tracker de divulgação.</div>'}
    </div>
    <div style="padding-top:12px;border-top:1px solid var(--border)">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
        <span style="font-size:18px">🏗️</span>
        <div style="flex:1"><div style="font-size:13px;font-weight:600;color:var(--text)">Infraestrutura Essencial — §23 Política IFC 2006</div><div style="font-size:11px;color:var(--text-3)">Água · Electricidade · Gás · Telecomunicações · Monopólio</div></div>
        <span class="badge blue">§23</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px">
        ${[['tariff','Tarifas domésticas e mecanismos de ajuste tarifário'],['standards','Padrões de serviço e metas de qualidade'],['investment','Obrigações de investimento'],['govSupport','Apoio governamental (subsídios, garantias, concessões)']].map(([k,label])=>`
        <div style="display:flex;align-items:center;gap:8px;padding:6px 8px;background:var(--bg-3);border-radius:4px">
          <div style="font-size:12px;flex:1">${label}</div>
          <select class="form-select" style="width:140px;font-size:11px" onchange="const sd=JSON.parse(localStorage.getItem('sector-disc')||'{}');if(!sd.infra)sd.infra={};sd.infra['${k}']=this.value;localStorage.setItem('sector-disc',JSON.stringify(sd));renderCommercialIntelligence()">
            <option value="pendente" ${(sectorDisc.infra[k]||'pendente')==='pendente'?'selected':''}>Pendente</option>
            <option value="divulgado" ${sectorDisc.infra[k]==='divulgado'?'selected':''}>Divulgado</option>
            <option value="nao-aplicavel" ${sectorDisc.infra[k]==='nao-aplicavel'?'selected':''}>N/A</option>
          </select>
          ${statusBadge(sectorDisc.infra[k]||'pendente')}
        </div>`).join('')}
      </div>
    </div>`;

  // ── Clareza de versão das fontes ──
  const svc=db.sourceVersionClarity;
  document.getElementById('source-version-clarity').innerHTML=`
    <div style="padding:10px 12px;background:var(--info-bg);border:1px solid #BFDBFE;border-radius:var(--radius);margin-bottom:14px;font-size:13px;color:#1E40AF;line-height:1.5">${svc.note}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      ${svc.layers.map(layer=>`
        <div style="padding:12px;border:1px solid var(--border);border-radius:var(--radius);background:#FAFAFA">
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;color:var(--accent);margin-bottom:5px">${layer.role==='governance'?'🏛 Quadro institucional':'📋 Requisitos substantivos'}</div>
          <div style="font-size:12px;font-weight:600;color:var(--text);margin-bottom:4px">${layer.id.includes('2006')?'IFC Sustainability Policy 2006':'IFC Performance Standards 2012'}</div>
          <div style="font-size:12px;color:var(--text-2);line-height:1.5">${layer.description}</div>
        </div>`).join('')}
    </div>`;

  // ── Compradores-alvo (numerados) ──
  document.getElementById('buyer-targets').innerHTML=db.buyerTargets.map((item,i)=>`
    <div style="display:flex;align-items:flex-start;gap:10px;padding:8px 0;border-bottom:1px solid #F3F4F6">
      <div style="width:20px;height:20px;border-radius:50%;background:var(--accent-light);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--accent);flex-shrink:0">${i+1}</div>
      <div style="font-size:13px;color:var(--text);line-height:1.5">${item}</div>
    </div>`).join('');

  // ── Gaps com marcação v1.0 vs v1.1 ──
  document.getElementById('enterprise-gaps').innerHTML=db.enterpriseGaps.map((item,i)=>{
    const isNew=i>=8;
    return `<div style="display:flex;align-items:flex-start;gap:8px;padding:7px 0;border-bottom:1px solid #F3F4F6">
      <span class="badge ${isNew?'green':'amber'}" style="font-size:10px;flex-shrink:0">${isNew?'✓ v1.1':'→'}</span>
      <div style="font-size:12px;color:var(--text);line-height:1.5">${item}</div>
    </div>`;
  }).join('')+`<div style="margin-top:8px;font-size:11px;color:var(--text-3)">
    <span class="badge green" style="font-size:10px">✓ v1.1</span> preenchido em v1.1.0 &nbsp;·&nbsp; <span class="badge amber" style="font-size:10px">→</span> pendente de implementação
  </div>`;

  // ── Mapeamentos PS/ESS (tabela limpa) ──
  document.getElementById('ifc-mapping').innerHTML=db.ifcPerformanceStandards.map(m=>`
    <div style="display:flex;align-items:flex-start;gap:10px;padding:7px 0;border-bottom:1px solid #F3F4F6">
      <span style="background:#F5F3FF;color:#7C3AED;font-size:11px;font-weight:700;padding:2px 8px;border-radius:4px;flex-shrink:0">${m.code}</span>
      <span style="font-size:12px;color:var(--text-2);line-height:1.4">${m.dashboard}</span>
    </div>`).join('');
  document.getElementById('ess-mapping').innerHTML=db.worldBankESS.map(m=>`
    <div style="display:flex;align-items:flex-start;gap:10px;padding:7px 0;border-bottom:1px solid #F3F4F6">
      <span style="background:var(--warning-bg);color:#B45309;font-size:11px;font-weight:700;padding:2px 8px;border-radius:4px;flex-shrink:0">${m.code}</span>
      <span style="font-size:12px;color:var(--text-2);line-height:1.4">${m.dashboard}</span>
    </div>`).join('');

  // ── Fontes (sem sha256/paths internos) ──
  const roleIcon={governance:'🏛',substantive_requirements:'📋',implementation_tool:'🔧',accountability_mechanism:'⚖️',intake_gate:'🚫'};
  const roleLabel={governance:'Governação',substantive_requirements:'Requisitos',implementation_tool:'Ferramenta',accountability_mechanism:'Responsabilização',intake_gate:'Gate intake'};
  document.getElementById('commercial-sources').innerHTML=db.sources.map(s=>`
    <div style="display:flex;align-items:flex-start;gap:12px;padding:12px 0;border-bottom:1px solid #F3F4F6">
      <div style="font-size:22px;flex-shrink:0;line-height:1">${roleIcon[s.role]||'📄'}</div>
      <div style="flex:1;min-width:0">
        <div style="font-size:13px;font-weight:600;color:var(--text);margin-bottom:2px">${s.name}</div>
        <div style="font-size:12px;color:var(--text-2);margin-bottom:6px;line-height:1.5">${s.roleNote||s.use}</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center">
          <span class="badge ${s.type==='official'?'blue':'gray'}" style="font-size:10px">${s.type}</span>
          <span class="badge gray" style="font-size:10px">${roleLabel[s.role]||s.role}</span>
          <span style="font-size:11px;color:var(--text-3)">doc: ${s.documentDate} · verificado: ${s.dateVerified}</span>
          ${s.url?`<a href="${s.url}" target="_blank" style="font-size:11px;color:var(--accent);text-decoration:none;font-weight:600">→ abrir</a>`:''}
        </div>
      </div>
    </div>`).join('');
}

function commercialPitchText(){
  const db=COMMERCIAL_INTELLIGENCE_DB;
  return [
    db.positioning,
    '',
    db.quickExtraction.map(i=>`${i.label}: ${i.value}`).join('\n'),
    '',
    `Sellability: demo ${formatSellabilityScore(db.sellabilityScores.demo,db.sellabilityScores.scale)}; paid pilot ${formatSellabilityScore(db.sellabilityScores.paidPilot,db.sellabilityScores.scale)}; enterprise SaaS ${formatSellabilityScore(db.sellabilityScores.enterpriseSaaS,db.sellabilityScores.scale)}.`,
    `Recommended offer: ${db.recommendedOffer}`,
    `Disclaimer: ${db.disclaimer}`
  ].join('\n');
}

function copyCommercialPitch(){
  const text=commercialPitchText();
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(()=>alert('Pitch comercial copiado.')).catch(()=>alert(text));
  } else {
    alert(text);
  }
}

function downloadCommercialJSON(){
  const payload=JSON.stringify(COMMERCIAL_INTELLIGENCE_DB,null,2);
  const blob=new Blob([payload],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download='sgas-commercial-intelligence.json';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}


