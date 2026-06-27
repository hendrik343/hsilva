/* ── SGAS Pro · Demo tenant: Hospital Kibala ──────────────────────────────
   Single source of truth for demo data.
   Load via: ?projectId=demo-kibala
   Access via: window.DEMO_TENANT_KIBALA
   ────────────────────────────────────────────────────────────────────── */
window.DEMO_TENANT_KIBALA = {
  metadata: {
    name: 'Hospital Kibala — Reabilitação e Expansão',
    loanId: 'IDA P171880',
    country: 'Angola',
    region: 'Cuanza Sul',
    sector: 'Saúde / infraestrutura hospitalar rural',
    desc: 'Reabilitação e expansão do Hospital Kibala · Cuanza Sul, Angola',
    amount: 'USD 45M',
    esCategory: 'Moderado',
    approvalDate: 'Nov 2024',
    closureDate: 'Nov 2029',
    esSpecialist: 'BM Luanda',
    projectCategory: 'B',
    /* 9 ESMS elements — avg must equal 2.7 */
    sgasScores: [3.5, 3.0, 2.0, 2.5, 3.0, 2.5, 2.0, 3.0, 2.8],
    /* PS1–PS8 scores — 4 conforme(≥70), 3 parcial(30-69), 1 NC(<30) */
    psScores: [58, 82, 88, 79, 18, 62, 55, 84],
    /* Doc statuses per DOC_SECTIONS section/doc — null = keep default */
    docStatuses: [
      ['ok','ok','ok','ok','ok','missing'],   /* PS1: 5/6 ok */
      ['ok','ok','ok','ok'],                   /* PS2: 4/4 ok */
      ['ok','ok','ok','old'],                  /* PS3: 3/4 ok */
      ['ok','ok','missing'],                   /* PS4: 2/3 ok */
      ['ok','missing','missing'],              /* PS5: 1/3 ok */
      ['ok','missing','missing'],              /* PS6: 1/3 ok */
      ['ok','missing','missing'],              /* PS7: 1/3 ok */
      ['ok','missing','missing'],              /* PS8: 1/3 ok */
      ['ok','ok','missing'],                   /* Monit: 2/3 ok */
    ],
  },
  data: {
    /* ── ESAP: 18 rows — 7 Concluída / 6 Em curso / 2 Não iniciada / 3 Em atraso ── */
    esapData: [
      { id:'ESAP-001', ps:'PS1', prio:'Crítica', desc:'Elaborar e submeter ESMS completo ao Banco Mundial para aprovação', hierarchy:'', resp:'Dir. Ambiente', prazo:'2025-08-31', status:'Concluída', evid:'ESMS Hospital Kibala v2.1 — aprovado BM Jul 2025' },
      { id:'ESAP-002', ps:'PS1', prio:'Crítica', desc:'Activar mecanismo de reclamações multisector (caixa + linha + registo digital)', hierarchy:'', resp:'RSC', prazo:'2025-09-15', status:'Concluída', evid:'Registo GRM activo; caixas instaladas nos 4 blocos' },
      { id:'ESAP-003', ps:'PS2', prio:'Alta', desc:'Rever contratos dos 3 empreiteiros principais — cláusulas IFC PS2', hierarchy:'Minimizar', resp:'RH / Jurídico', prazo:'2025-10-01', status:'Concluída', evid:'Adendas assinadas e arquivadas' },
      { id:'ESAP-004', ps:'PS2', prio:'Alta', desc:'Realizar indução HSE + PS2 para 100% dos trabalhadores em obra', hierarchy:'Minimizar', resp:'HST', prazo:'2025-11-30', status:'Concluída', evid:'Listas de presença + registos de quiz — 247 trabalhadores' },
      { id:'ESAP-005', ps:'PS3', prio:'Alta', desc:'Implementar plano de gestão de resíduos clínicos e perigosos', hierarchy:'Reduzido', resp:'Eng. Ambiente', prazo:'2026-01-15', status:'Concluída', evid:'PGR v1.2 + contrato operador licenciado MINEA' },
      { id:'ESAP-006', ps:'PS4', prio:'Alta', desc:'Instalar barreiras de segurança e plano de tráfego na zona da obra', hierarchy:'Minimizar', resp:'Dir. Obra', prazo:'2026-02-28', status:'Concluída', evid:'Fotos instalação + checklist semanal condutores' },
      { id:'ESAP-007', ps:'PS1', prio:'Média', desc:'Submeter relatório semestral E&S ao Banco Mundial (Jan–Jun 2026)', hierarchy:'', resp:'Dir. Ambiente', prazo:'2026-07-31', status:'Concluída', evid:'Relatório IFC-ES-KIB-2026-H1 submetido em 2026-07-15' },
      { id:'ESAP-008', ps:'PS1', prio:'Alta', desc:'Elaborar e implementar Plano de Engajamento de Partes Interessadas (SEP)', hierarchy:'', resp:'RSC', prazo:'2026-04-30', status:'Em curso', evid:'SEP v1.0 em revisão interna — aprovação prevista Jun 2026' },
      { id:'ESAP-009', ps:'PS2', prio:'Alta', desc:'Completar registo de horas, salários e condições de todos os trabalhadores do hospital', hierarchy:'Minimizar', resp:'RH', prazo:'2026-06-30', status:'Em curso', evid:'Base de dados RH: 89% completa' },
      { id:'ESAP-010', ps:'PS4', prio:'Alta', desc:'Realizar consultas públicas com comunidade do Kibala e aldeias vizinhas', hierarchy:'', resp:'RSC', prazo:'2026-07-31', status:'Em curso', evid:'1 de 3 sessões realizadas — acta e lista de presença arquivadas' },
      { id:'ESAP-011', ps:'PS6', prio:'Alta', desc:'Concluir avaliação de biodiversidade da área de influência directa e indirecta', hierarchy:'Evitar', resp:'Esp. Ambiental', prazo:'2026-06-15', status:'Em curso', evid:'Levantamento de campo em curso; relatório final Jul 2026' },
      { id:'ESAP-012', ps:'PS7', prio:'Alta', desc:'Conduzir triagem PS7 e documentar BCS / não-aplicabilidade', hierarchy:'', resp:'Esp. Social', prazo:'2026-07-15', status:'Em curso', evid:'Triagem em curso; consulta líderes locais agendada' },
      { id:'ESAP-013', ps:'PS8', prio:'Média', desc:'Activar procedimento de achados fortuitos e notificar equipa de obra', hierarchy:'Minimizar', resp:'Dir. Obra', prazo:'2026-05-01', status:'Em curso', evid:'Procedimento comunicado; placa de obra disponível' },
      { id:'ESAP-014', ps:'PS3', prio:'Média', desc:'Instalar sistema de monitoramento de qualidade da água e efluentes hospitalares', hierarchy:'Reduzido', resp:'Eng. Ambiente', prazo:'2026-09-30', status:'Não iniciada', evid:'Especificações técnicas em preparação' },
      { id:'ESAP-015', ps:'PS2', prio:'Média', desc:'Implementar sistema de relatórios de incidentes laborais e quase-acidentes', hierarchy:'Minimizar', resp:'HST', prazo:'2026-08-31', status:'Não iniciada', evid:'Template aprovado; rollout pendente' },
      { id:'ESAP-016', ps:'PS5', prio:'Crítica', desc:'Completar triagem PS5 e submeter declaração de não-aplicabilidade ou RAP', hierarchy:'Evitar', resp:'Esp. Social', prazo:'2026-04-15', status:'Em atraso', evid:'Declaração N/A em revisão jurídica — prazo expirado' },
      { id:'ESAP-017', ps:'PS1', prio:'Alta', desc:'Elaborar e submeter plano de encerramento do ESMS ao Banco Mundial', hierarchy:'', resp:'Dir. Ambiente', prazo:'2026-05-31', status:'Em atraso', evid:'Pendente da conclusão do SEP e relatório PS5' },
      { id:'ESAP-018', ps:'PS6', prio:'Alta', desc:'Submeter plano de gestão de biodiversidade (PGB) com medidas de compensação', hierarchy:'Reduzido', resp:'Esp. Ambiental', prazo:'2026-06-01', status:'Em atraso', evid:'Aguarda relatório de avaliação de biodiversidade' },
    ],
    /* ── Risks: 10 total — 2 critical (sev×prob ≥ 15) ── */
    riskData: [
      { id:'R-001', type:'HSE', ps:'PS2', act:'Trabalho em altura (andaimes, cobertura do bloco cirúrgico)', imp:'Queda de trabalhador com potencial fatalidade', sev:5, prob:3, hierarchy:'Mitigado', ctrl:'PTW obrigatório + guarda-corpos + EPI altura + supervisão contínua', status:'Activo' },
      { id:'R-002', type:'Social', ps:'PS4', act:'Obras de reabilitação em hospital a funcionar', imp:'Infecção nosocomial ou acidente envolvendo pacientes', sev:5, prob:3, hierarchy:'Minimizar', ctrl:'Compartimentação de obra + plano de controlo de infecção + coordinação com director clínico', status:'Activo' },
      { id:'R-003', type:'HSE', ps:'PS2', act:'Movimentação de equipamentos pesados dentro do recinto hospitalar', imp:'Atropelamento de trabalhadores ou pessoal médico', sev:4, prob:3, hierarchy:'Mitigado', ctrl:'Rotas exclusivas + velocidade ≤ 10 km/h + sinaleiro + horário restrito', status:'Monitorado' },
      { id:'R-004', type:'Ambiental', ps:'PS3', act:'Geração de resíduos clínicos e perigosos da fase de obras', imp:'Contaminação do solo e risco de saúde pública', sev:4, prob:3, hierarchy:'Reduzido', ctrl:'PGR implementado + contrato operador licenciado MINEA + manifesto mensal', status:'Activo' },
      { id:'R-005', type:'Social', ps:'PS5', act:'Reabilitação de bloco que pode afectar residências informais adjacentes', imp:'Deslocamento involuntário sem compensação adequada', sev:4, prob:2, hierarchy:'Evitar', ctrl:'Triagem PS5 pendente; decreto de non-displacement em preparação', status:'A avaliar' },
      { id:'R-006', type:'Ambiental', ps:'PS6', act:'Escavação para fundação de novo bloco de maternidade', imp:'Destruição de habitat de espécies endémicas do Cuanza Sul', sev:3, prob:3, hierarchy:'Reduzido', ctrl:'Avaliação biodiversidade em curso; no-go zones provisórias demarcadas', status:'A avaliar' },
      { id:'R-007', type:'Social', ps:'PS7', act:'Acesso da comunidade a zona de obras dentro do recinto hospitalar', imp:'Conflito por restrição de acesso a serviços de saúde', sev:3, prob:4, hierarchy:'Mitigado', ctrl:'Entrada alternativa mapeada + comunicação semanal com administração hospitalar', status:'Monitorado' },
      { id:'R-008', type:'HSE', ps:'PS2', act:'Exposição a silica durante demolição de estruturas antigas', imp:'Doença pulmonar ocupacional (silicose)', sev:4, prob:2, hierarchy:'Minimizar', ctrl:'Humidificação + EPI respiratório + medição PM2.5 semanal', status:'Activo' },
      { id:'R-009', type:'Ambiental', ps:'PS3', act:'Descarga de efluentes de obra na linha de água a 400 m', imp:'Contaminação de ponto de água comunitário', sev:3, prob:2, hierarchy:'Reduzido', ctrl:'Bacia de retenção + monitoramento qualidade água mensal', status:'Monitorado' },
      { id:'R-010', type:'Comunitário', ps:'PS4', act:'Ruído e vibrações de maquinaria pesada próxima de enfermarias', imp:'Perturbação de doentes internados e stress comunitário', sev:2, prob:4, hierarchy:'Minimizar', ctrl:'Horário restrito (7h–18h) + isolamento acústico + comunicação mensal', status:'Activo' },
    ],
    /* ── Stakeholders: 14 total ── */
    stakeholders: [
      { name:'Administração do Hospital Kibala', cat:'govt', initials:'AH', concerns:'Continuidade de serviços durante obras, segurança de doentes', method:'Reunião mensal', freq:'Mensal', last:'2026-06-10', fpic:'Não', support:'Sim' },
      { name:'Direcção Provincial de Saúde — Cuanza Sul', cat:'govt', initials:'DP', concerns:'Conformidade regulatória, relatórios de progresso', method:'Correspondência oficial', freq:'Trimestral', last:'2026-05-20', fpic:'Não', support:'Sim' },
      { name:'Município do Kibala — Administração', cat:'govt', initials:'MK', concerns:'Tráfego, emprego local, impactos comunitários', method:'Reunião presencial', freq:'Trimestral', last:'2026-04-15', fpic:'Não', support:'Sim' },
      { name:'MINAMB — Direcção Provincial', cat:'govt', initials:'MA', concerns:'Licença ambiental, resíduos hospitalares, monitoramento', method:'Visita técnica', freq:'Semestral', last:'2026-03-10', fpic:'Não', support:'Sim' },
      { name:'Comunidade do Kibala — Bairro Norte', cat:'community', initials:'CN', concerns:'Ruído, poeira, acesso ao hospital, emprego local', method:'Reunião pública', freq:'Mensal', last:'2026-06-05', fpic:'A avaliar', support:'Condicionado' },
      { name:'Comunidade do Kibala — Bairro Sul', cat:'community', initials:'CS', concerns:'Tráfego pesado, segurança de crianças na escola adjacente', method:'Reunião pública', freq:'Mensal', last:'2026-06-05', fpic:'A avaliar', support:'Pendente' },
      { name:'Aldeia de Caluquembe — líderes tradicionais', cat:'community', initials:'AC', concerns:'Gestão de resíduos, emprego para jovens locais', method:'Consulta presencial', freq:'Semestral', last:'2026-02-20', fpic:'A avaliar', support:'Pendente' },
      { name:'Associação de Doentes e Familiares', cat:'community', initials:'AD', concerns:'Continuidade de serviços, comunicação sobre obras', method:'Caixa de sugestões + reunião', freq:'Mensal', last:'2026-06-01', fpic:'Não', support:'Sim' },
      { name:'Sindicato dos Trabalhadores da Saúde (SINTSAS)', cat:'worker', initials:'SS', concerns:'Condições de trabalho durante obras, segurança no posto', method:'Reunião laboral', freq:'Trimestral', last:'2026-05-12', fpic:'Não', support:'Sim' },
      { name:'Empreiteiro principal — ConstructAngola Lda', cat:'worker', initials:'CA', concerns:'Cláusulas IFC PS2, formação HST, pontuação no scorecard', method:'Reunião de obra', freq:'Semanal', last:'2026-06-15', fpic:'Não', support:'Sim' },
      { name:'ONG Saúde Para Angola (SPA)', cat:'ngo', initials:'SP', concerns:'Acesso a serviços de saúde, grupos vulneráveis, GRM', method:'Monitoramento independente', freq:'Trimestral', last:'2026-04-30', fpic:'Não', support:'Sim' },
      { name:'Cruz Vermelha Angola — Cuanza Sul', cat:'ngo', initials:'CV', concerns:'Impactos humanitários, acesso a serviços de emergência', method:'Reunião técnica', freq:'Semestral', last:'2026-03-25', fpic:'Não', support:'Sim' },
      { name:'Banco Mundial — Equipa E&S', cat:'govt', initials:'BM', concerns:'Conformidade PS1–PS8, ESAP, relatórios e missões de supervisão', method:'Missão de supervisão + relatórios', freq:'Semestral', last:'2026-05-08', fpic:'Não', support:'Sim' },
      { name:'Ministério da Saúde — DNSP', cat:'govt', initials:'MS', concerns:'Padrões de construção hospitalar, integração com rede de saúde nacional', method:'Correspondência + visita', freq:'Anual', last:'2025-11-15', fpic:'Não', support:'Sim' },
    ],
    /* ── Complaints: 7 total — 5 Resolvida / 2 Em análise ── */
    complaints: [
      { id:'GRM-001', data:'2026-01-14', origem:'Comunidade', cat:'Ambiental', desc:'Poeira excessiva da demolição do bloco antigo afectou residências e escola próxima', resp:'Eng. Ambiente', status:'Resolvida', accepted:'Aceite', profile:'Moradores Bairro Norte / escola adjacente', notifyMethod:'Reunião pública', closureEvidence:'Humidificação reforçada; medições PM10 sob controlo', satisfaction:'Satisfeito', resources:'Camião cisterna + equipa ambiente', postMonitoring:'Monitoramento semanal PM10 — 30 dias', cao:'Não', caoLink:'', prazo:'2026-01-28' },
      { id:'GRM-002', data:'2026-02-03', origem:'Trabalhador', cat:'Laboral', desc:'Pagamento de subsídio de deslocação pendente há 6 semanas', resp:'RH', status:'Resolvida', accepted:'Aceite', profile:'Trabalhador subempreiteiro / categoria pedreiro', notifyMethod:'SMS', closureEvidence:'Transferência bancária realizada em 2026-02-10', satisfaction:'Satisfeito', resources:'Revisão processo pagamento subempreiteiros', postMonitoring:'Verificação mensal salários', cao:'Não', caoLink:'', prazo:'2026-02-17' },
      { id:'GRM-003', data:'2026-03-20', origem:'Comunidade', cat:'Social', desc:'Restrição de acesso ao bloco de urgências durante obras criou demora no atendimento', resp:'RSC', status:'Resolvida', accepted:'Aceite', profile:'Doente / família — urgência pediátrica', notifyMethod:'Reunião presencial', closureEvidence:'Entrada alternativa sinalizada; comunicação afixada na portaria', satisfaction:'Satisfeito', resources:'Sinalização + coordenação com Dir. Clínico', postMonitoring:'Relatório de acesso mensal', cao:'Não', caoLink:'', prazo:'2026-03-27' },
      { id:'GRM-004', data:'2026-04-08', origem:'Comunidade', cat:'HSE', desc:'Resíduos de construção depositados provisoriamente junto à cerca da escola durante fim de semana', resp:'Dir. Obra', status:'Resolvida', accepted:'Aceite', profile:'Director da escola / comunidade escolar', notifyMethod:'Telefone', closureEvidence:'Remoção imediata; reforço regras de deposição temporária', satisfaction:'Satisfeito', resources:'Camião remoção resíduos + fiscalização', postMonitoring:'Inspecção sexta-feira antes de fim de semana', cao:'Não', caoLink:'', prazo:'2026-04-09' },
      { id:'GRM-005', data:'2026-05-15', origem:'Trabalhador', cat:'Laboral', desc:'Equipamentos de protecção individual (EPI) de altura com defeito reportados à chefia mas não substituídos', resp:'HST', status:'Resolvida', accepted:'Aceite', profile:'Equipa de cobertura / 12 trabalhadores', notifyMethod:'Caixa de reclamações', closureEvidence:'EPI substituídos; reporte acelerado activado', satisfaction:'Satisfeito', resources:'Stock EPI emergência + auditoria fornecedor', postMonitoring:'Inspecção semanal EPI altura', cao:'Não', caoLink:'', prazo:'2026-05-17' },
      { id:'GRM-006', data:'2026-06-03', origem:'Comunidade', cat:'Social', desc:'Família alega que muro de delimitação da obra cortou acesso histórico ao cemitério comunitário', resp:'Esp. Social', status:'Em análise', accepted:'Aceite', profile:'Família residente Bairro Norte / uso histórico de terra', notifyMethod:'Reunião presencial', closureEvidence:'Investigação em curso — levantamento topográfico agendado', satisfaction:'Pendente', resources:'Esp. Social + topógrafo + Dir. Obra', postMonitoring:'Relatório de investigação em 15 dias', cao:'Não', caoLink:'', prazo:'2026-06-18' },
      { id:'GRM-007', data:'2026-06-12', origem:'Anónimo', cat:'Laboral', desc:'Denúncia de horas extraordinárias não pagas a trabalhadores de uma subempreitada', resp:'RH', status:'Em análise', accepted:'Aceite', profile:'Trabalhadores subempreiteiro (anónimo)', notifyMethod:'Caixa anónima', closureEvidence:'Auditoria de folha de horas iniciada', satisfaction:'Pendente', resources:'Auditor RH + fiscal laboral externo', postMonitoring:'Relatório de auditoria em 21 dias', cao:'Não', caoLink:'', prazo:'2026-07-03' },
    ],
    /* ── Contractors: 3 ── */
    contractors: [
      { name:'ConstructAngola Lda', scope:'Obra civil geral — reabilitação bloco internamento e cirurgia', ps:'PS2, PS3, PS4', clauses:'Incluídas', induction:'Concluída', score:72, scorecard:[78,72,68,82,74,65,63,70,74], status:'Conforme', action:'Revisão scorecard mensal; manter registo de incidentes actualizado' },
      { name:'MedEquip Services Angola', scope:'Instalação de equipamentos médicos e climatização', ps:'PS2, PS3', clauses:'Incluídas', induction:'Concluída', score:85, scorecard:[88,85,82,90,86,80,78,84,88], status:'Conforme', action:'Verificação anual de conformidade + registo de resíduos electrónicos' },
      { name:'CivilSub Cuanza', scope:'Fundações do bloco de maternidade', ps:'PS2, PS4, PS6', clauses:'Pendente', induction:'Pendente', score:42, scorecard:[48,42,38,52,44,36,30,34,44], status:'Não conforme', action:'Suspender início até assinatura de adenda IFC PS2 e realização de indução HST obrigatória' },
    ],
    /* ── IFC Reports ── */
    ifcReports: [
      { title:'Relatório semestral E&S Jan–Jun 2026', due:'2026-07-31', submitted:'2026-07-15', status:'Submetido', ref:'IFC-ES-KIB-2026-H1' },
      { title:'Actualização ESAP — Agosto 2026', due:'2026-08-31', submitted:'', status:'Em preparação', ref:'ESAP-KIB-2026-08' },
      { title:'Relatório de reclamações Q2 2026', due:'2026-07-15', submitted:'', status:'Pendente', ref:'GRM-KIB-Q2-2026' },
      { title:'Relatório mensal HSE Junho 2026', due:'2026-07-05', submitted:'', status:'Pendente', ref:'HSE-KIB-037-2026-06' },
      { title:'Relatório biodiversidade e PS6 — Jul 2026', due:'2026-07-31', submitted:'', status:'Em preparação', ref:'PS6-KIB-2026-07' },
      { title:'Triagem PS5 / declaração não-aplicabilidade', due:'2026-04-15', submitted:'', status:'Em atraso', ref:'PS5-KIB-2026-TRIAGEM' },
    ],
    /* ── Implementation evidence: 15 Validada / 3 em revisão (for 68% impl score) ── */
    implementationEvidence: [
      { id:'IMP-001', date:'2026-01-10', module:'PS2 / HST', procedure:'Indução HST para trabalhadores de entrada', type:'Lista de presença + quiz', ref:'HST-IND-KIB-2026-01', validatedBy:'HST Manager', status:'Validada', notes:'247 trabalhadores induzidos desde Nov 2024.' },
      { id:'IMP-002', date:'2026-02-15', module:'GRM', procedure:'Activação da caixa de reclamações nos 4 blocos hospitalares', type:'Foto / vídeo', ref:'GRM-BOX-KIB-2026-02', validatedBy:'RSC', status:'Validada', notes:'Caixas instaladas; folheto de processo disponível em 2 línguas.' },
      { id:'IMP-003', date:'2026-02-20', module:'PS3 / Resíduos', procedure:'Implementação de segregação de resíduos clínicos e perigosos', type:'Foto + manifesto', ref:'PGR-KIB-2026-02', validatedBy:'Eng. Ambiente', status:'Validada', notes:'Contentores identificados por cor; contrato MINEA activo.' },
      { id:'IMP-004', date:'2026-03-01', module:'PS4 / Tráfego', procedure:'Instalação de sinalização e barreiras de tráfego na obra', type:'Observação visual + foto', ref:'TRAF-KIB-2026-03', validatedBy:'Dir. Obra', status:'Validada', notes:'Roteiros exclusivos demarcados; sinaleiro em turnos.' },
      { id:'IMP-005', date:'2026-03-15', module:'PS2 / EPI', procedure:'Verificação e distribuição de EPI para trabalho em altura', type:'Inventário + foto', ref:'EPI-ALTU-KIB-2026-03', validatedBy:'HST Manager', status:'Validada', notes:'Stock de emergência criado após GRM-005.' },
      { id:'IMP-006', date:'2026-04-01', module:'Monitoramento', procedure:'Medição PM10 nas áreas de demolição e limite com escola', type:'Medição / registo', ref:'PM10-KIB-2026-04', validatedBy:'Eng. Ambiente', status:'Validada', notes:'Valores abaixo do limiar IFC EHS após ajuste de humidificação.' },
      { id:'IMP-007', date:'2026-04-20', module:'PS4 / Entrada alternativa', procedure:'Abertura e sinalização de entrada alternativa para urgências', type:'Observação visual', ref:'ACCESSO-KIB-2026-04', validatedBy:'Dir. Clínico', status:'Validada', notes:'Tempo médio de acesso a urgências mantido.' },
      { id:'IMP-008', date:'2026-05-05', module:'PS2 / Formação', procedure:'Formação PS2 e condições laborais para RH e supervisores', type:'Lista presença + avaliação', ref:'TRN-PS2-KIB-2026-05', validatedBy:'RH', status:'Validada', notes:'12 supervisores e 5 gestores de RH certificados.' },
      { id:'IMP-009', date:'2026-05-12', module:'GRM / Resposta', procedure:'Investigação e encerramento de GRM-004 (resíduos junto escola)', type:'Relatório + foto', ref:'GRM-CLOSE-KIB-005', validatedBy:'RSC', status:'Validada', notes:'Remoção imediata; inspecção de fim de semana activada.' },
      { id:'IMP-010', date:'2026-05-25', module:'PS8 / Chance find', procedure:'Comunicação do procedimento de achados fortuitos a toda a equipa', type:'Acta + registo de briefing', ref:'PS8-CHANCE-KIB-2026-05', validatedBy:'Dir. Obra', status:'Validada', notes:'Placa afixada na zona de escavação do bloco de maternidade.' },
      { id:'IMP-011', date:'2026-06-01', module:'PS1 / ESMS', procedure:'Revisão semestral do ESMS com equipa de gestão', type:'Acta de revisão', ref:'ESMS-REV-KIB-2026-06', validatedBy:'Dir. Ambiente', status:'Validada', notes:'Acções correctivas definidas e registadas no ESAP.' },
      { id:'IMP-012', date:'2026-06-08', module:'PS2 / Incidentes', procedure:'Investigação de quase-acidente em andaime (bloco cirurgia)', type:'RCA 5 Porquês + foto', ref:'INC-RCA-KIB-2026-06', validatedBy:'HST Manager', status:'Validada', notes:'Guarda-corpos reforçados; PTW actualizado.' },
      { id:'IMP-013', date:'2026-06-10', module:'Stakeholders', procedure:'Reunião pública com Bairros Norte e Sul — actualização progresso', type:'Acta + lista de presença + foto', ref:'SEP-PUB-KIB-2026-06', validatedBy:'RSC', status:'Validada', notes:'38 participantes; 2 novos temas para ESAP registados.' },
      { id:'IMP-014', date:'2026-06-14', module:'PS6 / Biodiversidade', procedure:'Levantamento de campo para avaliação de biodiversidade', type:'GPS track + fotos', ref:'PS6-FIELD-KIB-2026-06', validatedBy:'Esp. Ambiental', status:'Em revisão', notes:'Dados de campo recolhidos; análise e relatório em preparação.' },
      { id:'IMP-015', date:'2026-06-16', module:'PS5 / Triagem', procedure:'Levantamento topográfico para triagem PS5', type:'Mapa + relatório', ref:'PS5-TRIAGE-KIB-2026-06', validatedBy:'Esp. Social', status:'Em revisão', notes:'Inclui análise de uso histórico de terra — GRM-006 em paralelo.' },
      { id:'IMP-016', date:'2026-06-18', module:'PS7 / Comunidades', procedure:'Consulta com líderes locais sobre aplicabilidade PS7', type:'Acta + lista de presença', ref:'PS7-CONSULT-KIB-2026-06', validatedBy:'Esp. Social', status:'Em revisão', notes:'Triagem de comunidades tradicionais em curso; documentação final pendente.' },
      { id:'IMP-017', date:'2026-06-20', module:'PS2 / Auditoria laboral', procedure:'Início de auditoria de folha de horas (GRM-007)', type:'Folha de horas + entrevistas', ref:'RH-AUDIT-KIB-2026-06', validatedBy:'RH', status:'Em revisão', notes:'Auditoria em curso; prazo de conclusão 2026-07-03.' },
      { id:'IMP-018', date:'2026-06-22', module:'PS3 / Monitoramento', procedure:'Monitoramento mensal qualidade da água no ponto de descarga', type:'Análise laboratorial', ref:'AGUA-KIB-2026-06', validatedBy:'Eng. Ambiente', status:'Em revisão', notes:'Resultados laboratoriais pendentes — amostras enviadas.' },
    ],
    /* ── Community reports: 6-month monitoring history (Dez 2025–Mai 2026) ── */
    communityReports: [
      { date:'2025-12-15', community:'Comunidade Kibala — Bairro Norte e Sul', topic:'Arranque da obra — ruído, tráfego e emprego local', channel:'Reunião pública inaugural', feedback:'Pedido de prioridade para mão-de-obra local e cronograma de obras visível ao público.', newRisk:'Sim', evidence:'Acta SEP-KIB-2025-12 + lista presença 47 participantes', owner:'RSC', status:'Comunicado' },
      { date:'2026-01-28', community:'Bairro Norte — moradores e escola adjacente', topic:'Poeira da demolição (GRM-001)', channel:'Reunião de seguimento', feedback:'Confirmação de melhoria após instalação de humidificação. Pedido de continuidade do monitoramento.', newRisk:'Não', evidence:'Resultados PM10 + fotos humidificação + acta', owner:'Eng. Ambiente', status:'Comunicado' },
      { date:'2026-02-25', community:'Trabalhadores e sindicato SINTSAS', topic:'Condições laborais e mecanismo de reclamações', channel:'Grupo focal', feedback:'Trabalhadores conhecem o canal GRM. Pedido de divulgação visual nas casas de banho e cantina.', newRisk:'Não', evidence:'Acta TRN-GRM-KIB-2026-02 + fotos cartazes', owner:'RH', status:'Comunicado' },
      { date:'2026-03-20', community:'Associação de Doentes e Familiares', topic:'Acesso às urgências durante obras', channel:'Reunião presencial', feedback:'Entrada alternativa funcional e bem sinalizada. Pedido de actualização mensal sobre cronograma.', newRisk:'Não', evidence:'Acta ADF-KIB-2026-03 + foto entrada alternativa', owner:'RSC', status:'Comunicado' },
      { date:'2026-04-15', community:'Município do Kibala e Administração', topic:'Estado do ESAP e impactos de tráfego na Estrada Nacional', channel:'Correspondência oficial', feedback:'Pedido de actualização mensal do ESAP e mapa de rotas aprovado.', newRisk:'Sim', evidence:'Carta MUNIC-KIB-2026-04 + resposta Dir. Obra', owner:'Dir. Obra', status:'Em seguimento' },
      { date:'2026-05-08', community:'Banco Mundial — missão de supervisão', topic:'PS1–PS8 conformidade, ESAP, GRM e relatórios', channel:'Missão de supervisão BM', feedback:'GRM e PS2 bem avaliados. PS5 e PS6 identificados como áreas de atenção crítica para missão seguinte.', newRisk:'Sim', evidence:'ISR (Implementation Status Report) + acta missão BM 2026-05', owner:'Dir. Ambiente', status:'Em seguimento' },
      { date:'2026-06-05', community:'Bairro Norte — líderes comunitários', topic:'GRM-006 — muro e acesso ao cemitério', channel:'Reunião de investigação', feedback:'Comunidade aguarda resultado do levantamento topográfico. Solicitam resolução antes de Julho.', newRisk:'Não', evidence:'Acta GRM-006-FOLLOW-2026-06', owner:'Esp. Social', status:'Em seguimento' },
    ],
    /* ── Legal register ── */
    legalRegister: [
      { requirement:'Licença ambiental de construção', source:'Lei Ambiental Angola (Lei 5/98) + ESS1', authority:'MINAMB — Direcção Provincial Cuanza Sul', permit:'LA-KIB-2024-087', expiry:'2026-11-30', owner:'Dir. Ambiente', evidence:'Licença original digitalizada + renovação solicitada', status:'Conforme' },
      { requirement:'Plano de Segurança e Saúde no Trabalho', source:'DL 31/94 Angola + ESS2/PS2', authority:'MAPTSS — Delegação Cuanza Sul', permit:'HST-KIB-2025-012', expiry:'2026-09-30', owner:'HST Manager', evidence:'Plano aprovado + registos de formação', status:'Em revisão' },
      { requirement:'Autorização de gestão de resíduos perigosos / clínicos', source:'PS3 / EHS Guidelines + regulação MINSA', authority:'MINAMB + MINSA', permit:'RES-KIB-2025-003', expiry:'2026-07-15', owner:'Eng. Ambiente', evidence:'Contrato operador licenciado + manifesto mensal', status:'A vencer' },
      { requirement:'Licença de água e uso de recursos hídricos', source:'Lei de Águas Angola + PS3/PS6', authority:'MINEA — Delegação Cuanza Sul', permit:'AGUA-KIB-2025-041', expiry:'2027-01-31', owner:'Eng. Ambiente', evidence:'Licença digital + relatório consumo mensal', status:'Conforme' },
      { requirement:'Autorização de consulta comunitária / SEP', source:'PS1 + ESS10 + regulação MAPESS', authority:'Administração Municipal do Kibala', permit:'SEP-KIB-2026-001', expiry:'2026-12-31', owner:'RSC', evidence:'Actas + listas de presença + fotos', status:'Conforme' },
    ],
    physicalRiskHotspots: [
      { id:'MAP-001', label:'Andaimes / altura', type:'HSE', risk:'R-001', x:62, y:22, level:'Crítico', control:'PTW + guarda-corpos + EPI + supervisão', community:'Trabalhadores bloco cirurgia', evidence:'PTW activo + observações campo' },
      { id:'MAP-002', label:'Tráfego obra / hospital', type:'Tráfego', risk:'R-003', x:24, y:68, level:'Crítico', control:'Sinaleiro + velocidade ≤10 km/h + rotas exclusivas', community:'Pessoal médico e doentes', evidence:'Checklist condutores + fotos' },
      { id:'MAP-003', label:'Resíduos clínicos', type:'Resíduos', risk:'R-004', x:74, y:58, level:'Alto', control:'PGR + contentores segregados + manifesto MINEA', community:'Trabalhadores + comunidade adjacente', evidence:'Manifesto mensal + foto contentores' },
      { id:'MAP-004', label:'Poeira demolição', type:'Poeira', risk:'R-003', x:40, y:35, level:'Alto', control:'Humidificação + barreiras + medição PM10', community:'Escola e Bairro Norte', evidence:'Medição PM10 semanal + fotos' },
      { id:'MAP-005', label:'Combustível / gerador', type:'Químicos', risk:'R-009', x:82, y:74, level:'Moderado', control:'Bacia de retenção + kit derrame + inspecção diária', community:'Linha de água a 400m', evidence:'Inspecção semanal + foto bacia' },
      { id:'MAP-006', label:'Zona PS5 / muro', type:'Social', risk:'R-005', x:12, y:18, level:'Alto', control:'Triagem PS5 em curso + GRM-006 activo', community:'Família Bairro Norte / cemitério', evidence:'Levantamento topográfico em curso' },
    ],
    processRiskMap: [
      { process:'Demolição', step:'Demolição estruturas antigas', risks:'R-001, R-003, R-008', control:'PTW + humidificação + EPI respiratório + medição PM10', evidence:'PTW + PM10 + observação HST', owner:'Dir. Obra', status:'Em curso' },
      { process:'Escavação', step:'Fundações bloco maternidade', risks:'R-001, R-006', control:'Demarcação no-go zones + supervisão bióloga + EPI', evidence:'Mapa no-go zones + check field', owner:'Esp. Ambiental', status:'Em curso' },
      { process:'Transporte materiais', step:'Rotas em recinto hospitalar', risks:'R-002, R-003, R-010', control:'Sinaleiro + horário restrito + plano tráfego', evidence:'Registo condutores + GPS', owner:'Logística', status:'Em curso' },
      { process:'Gestão de resíduos', step:'Resíduos clínicos e obra', risks:'R-004', control:'PGR + segregação + operador licenciado', evidence:'Manifesto + foto + contrato MINEA', owner:'Eng. Ambiente', status:'Conforme' },
      { process:'Trabalho em altura', step:'Andaimes e cobertura', risks:'R-001', control:'PTW + guarda-corpos + formação + revisão EPI', evidence:'PTW + inspecção semanal', owner:'HST Manager', status:'Acção pendente' },
      { process:'Armazenamento', step:'Combustível, químicos, materiais perigosos', risks:'R-009', control:'Bacia retenção + segregação + inspecção semanal', evidence:'Ficha inspecção + fotos', owner:'Eng. Ambiente', status:'Em curso' },
      { process:'Interacção comunitária', step:'Acesso ao hospital e comunicações', risks:'R-002, R-007', control:'Entrada alternativa + comunicação mensal + GRM', evidence:'Actas SEP + fotos', owner:'RSC', status:'Conforme' },
      { process:'Emergência', step:'Derrame, incêndio, acidente grave, contaminação', risks:'R-001, R-004, R-009', control:'Plano emergência + simulacro + notificação BM 72h', evidence:'Plano aprovado + relatório simulacro', owner:'HST Manager', status:'Acção pendente' },
    ],
    sourceWatchers: [],
    kpiProtocols: [
      { kpi:'PM10 / PM2.5 — zonas de demolição e limites da comunidade', frequency:'Semanal', method:'Medição em pontos fixos e limite escola', equipment:'Medidor partículas calibrado', standard:'IFC EHS Guidelines / WHO AQG', owner:'Eng. Ambiente', record:'MON-AR-KIB-01', action:'Activar humidificação extra e comunicação imediata se exceder 150 µg/m³ (PM10 24h)' },
      { kpi:'Resíduos clínicos e perigosos gerados', frequency:'Mensal', method:'Pesagem + manifesto operador licenciado MINEA', equipment:'Balança + manifesto', standard:'PS3 + regulação MINSA + MINEA', owner:'Eng. Ambiente', record:'RES-KIB-01', action:'Suspender geração sem manifesto; abrir ESAP se trend crescente' },
      { kpi:'Taxa de acidentes com afastamento (TRIR)', frequency:'Mensal', method:'Cálculo por 200.000 h-h + investigação todos os incidentes', equipment:'Registo HST + folhas ponto', standard:'IFC PS2 / boas práticas HSE', owner:'HST Manager', record:'HSE-TRIR-KIB-01', action:'RCA 5 Porquês + toolbox meeting + revisão PTW se TRIR > meta' },
      { kpi:'Reclamações recebidas', frequency:'Mensal', method:'Reconciliação GRM: caixa + telefone + app + registo visitantes', equipment:'Registo GRM', standard:'IFC PS1 / ESS10', owner:'RSC', record:'GRM-MON-KIB-01', action:'Comunicação fora do ciclo se novo risco; escalada se prazo ultrapassado' },
      { kpi:'Consumo de água (obra + hospital)', frequency:'Mensal', method:'Leitura de contadores + reconciliação factura EPAL', equipment:'Contadores calibrados', standard:'IFC EHS Guidelines + licença MINEA', owner:'Eng. Ambiente', record:'AGUA-KIB-01', action:'Abrir ESAP se consumo exceder meta por 2 meses consecutivos' },
    ],
    lenderPackage: [
      { section:'Documentos obrigatórios ESMS', owner:'Dir. Ambiente', evidence:'Cofre de Documentos', readiness:72, status:'Em preparação', gap:'Relatório semestral H1 e SEP final em falta' },
      { section:'Evidências por requisito PS1–PS8', owner:'HST Manager / RSC', evidence:'Evidência de Implementação', readiness:78, status:'Em preparação', gap:'Aumentar validação IMP PS6 e PS7' },
      { section:'Registos de auditorias e inspecções', owner:'Compliance', evidence:'Auditoria interna + registo legal', readiness:55, status:'Acção pendente', gap:'Carregar histórico Nov 2024–Jun 2026 e relatórios MINAMB' },
      { section:'ESAP / ESCP actualizado', owner:'Dir. Ambiente', evidence:'Plano ESAP', readiness:74, status:'Em preparação', gap:'Fechar ESAP-016/017/018 e adicionar custos por acção' },
      { section:'GRM completo e toolkit preenchido', owner:'RSC / RH', evidence:'Mecanismo de Reclamações', readiness:86, status:'Pronto', gap:'Fechar GRM-006 e GRM-007 antes da missão BM' },
      { section:'Stakeholder engagement — SEP e BCS', owner:'RSC', evidence:'SEP e comunicações comunitárias', readiness:68, status:'Em preparação', gap:'SEP formal pendente; BCS não documentado para aldeias' },
      { section:'Registo legal Angola + IFC/ESS', owner:'Jurídico / Ambiente', evidence:'Registo Legal', readiness:76, status:'Em preparação', gap:'Resolver RES-KIB a vencer em Jul 2026 e HST em revisão' },
      { section:'Conformidade de terceiros (scorecard)', owner:'Compras / HST', evidence:'Scorecard Terceiros', readiness:62, status:'Acção pendente', gap:'CivilSub Cuanza: bloquear início até adenda IFC + indução' },
      { section:'Monitoramento KPIs e protocolos', owner:'Eng. Ambiente', evidence:'KPIs + protocolos de campo', readiness:80, status:'Em preparação', gap:'Anexar calibração de equipamentos e registos de campo por KPI' },
      { section:'Pacote exportável — sala de auditoria BM', owner:'Dir. Ambiente', evidence:'Sala de Auditoria BM', readiness:61, status:'Em preparação', gap:'Consolidar PDF/ZIP com índice e hiperligações a evidências chave' },
    ],
  },
};
