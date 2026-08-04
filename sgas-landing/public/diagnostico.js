/* diagnostico.js — SGAS Pro · Diagnóstico de Pré-Avaliação IFC PS1–PS8
 * Requires: pdf-lib CDN (window.PDFLib) loaded before this file.
 * Exposes: window.diagnostico_generatePDF, window.diagnostico_handleDrop, window.diagnostico_handleFile
 */
(function () {
  'use strict';

  var FIELDS = [
    { id: 'p_empresa',     label: 'Nome da Empresa / Organização',             type: 'text', section: 0 },
    { id: 'p_projecto',    label: 'Nome do Projecto',                           type: 'text', section: 0 },
    { id: 'p_pais',        label: 'País',                                        type: 'text', section: 0 },
    { id: 'p_sector',      label: 'Sector / Actividade Principal',               type: 'text', section: 0 },
    { id: 'p_categoria',   label: 'Categoria IFC  (escrever: A  B  C  ou  FI)', type: 'text', section: 0 },
    { id: 'p_financiador', label: 'Financiador / Banco / Instituição',           type: 'text', section: 0 },
    { id: 'ps1_q1', label: '1.1 — Política E&S formal aprovada pela direcção e comunicada?',          ps: 'PS1', section: 1 },
    { id: 'ps1_q2', label: '1.2 — ESAP activo com prazos e responsáveis definidos?',                  ps: 'PS1', section: 1 },
    { id: 'ps1_q3', label: '1.3 — GRM (Mecanismo de Reclamações) operacional e acessível?',           ps: 'PS1', section: 1 },
    { id: 'ps1_q4', label: '1.4 — Plano de Engajamento com Partes Interessadas (SEP) documentado?',   ps: 'PS1', section: 1 },
    { id: 'ps1_q5', label: '1.5 — Avaliações de risco E&S regulares (mínimo anual)?',                 ps: 'PS1', section: 1 },
    { id: 'ps2_q1', label: '2.1 — Política de trabalho formal, documentada e comunicada?',            ps: 'PS2', section: 2 },
    { id: 'ps2_q2', label: '2.2 — Mecanismo de reclamações laboral acessível aos trabalhadores?',     ps: 'PS2', section: 2 },
    { id: 'ps2_q3', label: '2.3 — Plano SSO (Saúde & Segurança Ocupacional) implementado com EPI?',  ps: 'PS2', section: 2 },
    { id: 'ps2_q4', label: '2.4 — Gestão de riscos E&S de subempreiteiros e contratantes?',          ps: 'PS2', section: 2 },
    { id: 'ps3_q1', label: '3.1 — Monitoramento regular de emissões, efluentes e resíduos?',         ps: 'PS3', section: 3 },
    { id: 'ps3_q2', label: '3.2 — Plano de gestão de resíduos aprovado e implementado?',             ps: 'PS3', section: 3 },
    { id: 'ps3_q3', label: '3.3 — Uso das melhores tecnologias disponíveis (BAT)?',                  ps: 'PS3', section: 3 },
    { id: 'ps4_q1', label: '4.1 — Avaliação de riscos para saúde/segurança das comunidades?',        ps: 'PS4', section: 4 },
    { id: 'ps4_q2', label: '4.2 — Plano de preparação e resposta a emergências documentado?',        ps: 'PS4', section: 4 },
    { id: 'ps4_q3', label: '4.3 — Segurança física com código de conduta IFC/VPs?',                  ps: 'PS4', section: 4 },
    { id: 'ps5_q1', label: '5.1 [TRIAGEM] — Projecto envolve aquisição de terras/deslocamento? (S/N)', ps: 'PS5', section: 5, trigger: true },
    { id: 'ps5_q2', label: '5.2 — Declaração de não-aplicabilidade ou Plano de Reassentamento?',       ps: 'PS5', section: 5 },
    { id: 'ps5_q3', label: '5.3 — Consultas e compensações justas realizadas (se aplicável)?',          ps: 'PS5', section: 5 },
    { id: 'ps6_q1', label: '6.1 — Avaliação de impacto em biodiversidade e habitats naturais?',       ps: 'PS6', section: 6 },
    { id: 'ps6_q2', label: '6.2 — Medidas de compensação e mitigação de biodiversidade?',             ps: 'PS6', section: 6 },
    { id: 'ps7_q1', label: '7.1 [TRIAGEM] — Comunidades indígenas/tradicionais na área? (S/N)',       ps: 'PS7', section: 7, trigger: true },
    { id: 'ps7_q2', label: '7.2 — Processo CLPI/FPIC realizado (se aplicável)?',                      ps: 'PS7', section: 7 },
    { id: 'ps7_q3', label: '7.3 — Plano de engajamento culturalmente apropriado aprovado?',            ps: 'PS7', section: 7 },
    { id: 'ps8_q1', label: '8.1 — Triagem de impacto em sítios de património cultural?',              ps: 'PS8', section: 8 },
    { id: 'ps8_q2', label: '8.2 — Procedimento para descobertas fortuitas (chance finds)?',           ps: 'PS8', section: 8 },
  ];

  var PS_Q = {
    PS1: ['ps1_q1','ps1_q2','ps1_q3','ps1_q4','ps1_q5'],
    PS2: ['ps2_q1','ps2_q2','ps2_q3','ps2_q4'],
    PS3: ['ps3_q1','ps3_q2','ps3_q3'],
    PS4: ['ps4_q1','ps4_q2','ps4_q3'],
    PS5: ['ps5_q2','ps5_q3'],
    PS6: ['ps6_q1','ps6_q2'],
    PS7: ['ps7_q2','ps7_q3'],
    PS8: ['ps8_q1','ps8_q2'],
  };

  function scoreAnswer(val) {
    if (!val) return null;
    var v = val.trim().toUpperCase().replace(/\s+/g, '');
    if (v === 'S' || v === 'SIM') return 1.0;
    if (v === 'D' || v === 'EMDESENVOLVIMENTO' || v === 'PARCIAL' || v === 'P') return 0.5;
    if (v === 'N' || v === 'NAO' || v === 'NÃO') return 0.0;
    if (v === 'NA' || v === 'N/A') return null;
    return null;
  }

  function analyzeData(data) {
    var scores = {}, gaps = [];
    var psNames = { PS1:'Sistema de Gestão E&S', PS2:'Trabalho', PS3:'Prevenção de Poluição',
      PS4:'Saúde & Segurança', PS5:'Aquisição de Terras', PS6:'Biodiversidade',
      PS7:'Povos Indígenas', PS8:'Património Cultural' };

    Object.keys(PS_Q).forEach(function (ps) {
      var qIds = PS_Q[ps];
      if (ps === 'PS5' && scoreAnswer(data['ps5_q1']) === 0.0) { scores[ps] = { val:'NA', name:psNames[ps] }; return; }
      if (ps === 'PS7' && scoreAnswer(data['ps7_q1']) === 0.0) { scores[ps] = { val:'NA', name:psNames[ps] }; return; }

      var answered = [];
      qIds.forEach(function (id) {
        var s = scoreAnswer(data[id]);
        if (s !== null) {
          answered.push({ id:id, s:s });
          if (s < 1.0) {
            var f = FIELDS.find(function (f) { return f.id === id; });
            gaps.push({ ps:ps, label:f ? f.label : id, score:s });
          }
        }
      });

      if (!answered.length) { scores[ps] = { val:null, name:psNames[ps] }; return; }
      var total = answered.reduce(function (sum, q) { return sum + q.s; }, 0);
      scores[ps] = { val: Math.round((total / answered.length) * 100), name: psNames[ps] };
    });

    return { scores:scores, gaps:gaps, profile:{
      empresa:data['p_empresa']||'', projecto:data['p_projecto']||'',
      pais:data['p_pais']||'', sector:data['p_sector']||'',
      categoria:data['p_categoria']||'', financiador:data['p_financiador']||''
    }};
  }

  function renderResults(analysis) {
    var scores = analysis.scores, gaps = analysis.gaps, p = analysis.profile;

    var profEl = document.getElementById('diag-profile-card');
    if (profEl) {
      profEl.innerHTML = '<div style="padding:16px 20px;display:flex;align-items:center;gap:14px">' +
        '<div style="width:44px;height:44px;border-radius:10px;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:20px;flex-shrink:0">' +
        (p.empresa ? p.empresa[0].toUpperCase() : '?') + '</div>' +
        '<div><div style="font-weight:700;font-size:15px;color:var(--text)">' + (p.empresa||'—') + '</div>' +
        '<div style="font-size:12px;color:var(--text-2);margin-top:2px">' + (p.projecto||'—') + ' · ' + (p.pais||'—') + ' · Categoria IFC ' + (p.categoria||'—') + '</div>' +
        '<div style="font-size:12px;color:var(--text-2);margin-top:1px">Sector: ' + (p.sector||'—') + ' · Financiador: ' + (p.financiador||'—') + '</div>' +
        '</div></div>';
    }

    var scEl = document.getElementById('diag-scores');
    if (scEl) {
      scEl.innerHTML = Object.keys(scores).map(function (ps) {
        var sc = scores[ps];
        if (sc.val === null) return '<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)">' +
          '<span class="badge" style="min-width:38px;text-align:center">' + ps + '</span><span style="font-size:12px;color:var(--text-2)">Não avaliado</span></div>';
        if (sc.val === 'NA') return '<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)">' +
          '<span class="badge" style="min-width:38px;text-align:center">' + ps + '</span><span style="font-size:12px;color:#1D9E75">✓ Não aplicável</span></div>';
        var color = sc.val >= 70 ? '#1D9E75' : sc.val >= 40 ? '#F59E0B' : '#DC2626';
        return '<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)">' +
          '<span class="badge" style="min-width:38px;text-align:center">' + ps + '</span>' +
          '<div style="flex:1;height:6px;background:#E5E7EB;border-radius:3px;overflow:hidden"><div style="height:100%;width:' + sc.val + '%;background:' + color + ';border-radius:3px"></div></div>' +
          '<span style="font-weight:700;color:' + color + ';font-size:13px;min-width:38px;text-align:right">' + sc.val + '%</span></div>';
      }).join('');
    }

    var gapsEl = document.getElementById('diag-gaps');
    if (gapsEl) {
      if (!gaps.length) {
        gapsEl.innerHTML = '<div style="padding:20px 0;text-align:center;color:#1D9E75;font-size:13px">✓ Nenhum gap identificado</div>';
      } else {
        gapsEl.innerHTML = gaps.map(function (g) {
          var c = g.score === 0 ? '#DC2626' : '#F59E0B';
          var bg = g.score === 0 ? '#FEE2E2' : '#FEF3C7';
          var txt = g.score === 0 ? 'Não implementado' : 'Em desenvolvimento';
          return '<div style="padding:9px 0;border-bottom:1px solid var(--border)">' +
            '<div style="display:flex;gap:6px;margin-bottom:3px">' +
            '<span style="font-size:10px;font-weight:700;padding:2px 6px;border-radius:4px;background:' + bg + ';color:' + c + '">' + g.ps + '</span>' +
            '<span style="font-size:10px;padding:2px 6px;border-radius:4px;background:' + bg + ';color:' + c + '">' + txt + '</span></div>' +
            '<div style="font-size:12px;color:var(--text)">' + g.label + '</div></div>';
        }).join('');
      }
    }

    document.getElementById('diag-results').style.display = '';
    setTimeout(function () {
      var r = document.getElementById('diag-results');
      if (r) r.scrollIntoView({ behavior:'smooth', block:'start' });
    }, 100);
  }

  // ── PDF Generation ─────────────────────────────────────────────────────────
  window.diagnostico_generatePDF = async function () {
    var btn = document.getElementById('btn-diag-download');
    if (btn) { btn.disabled = true; btn.textContent = 'A gerar PDF…'; }
    try {
      if (!window.PDFLib) throw new Error('pdf-lib não carregado. Recarregue a página.');
      var PDFDocument = window.PDFLib.PDFDocument;
      var rgb = window.PDFLib.rgb;
      var StandardFonts = window.PDFLib.StandardFonts;

      var pdfDoc = await PDFDocument.create();
      var font     = await pdfDoc.embedFont(StandardFonts.Helvetica);
      var boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      var form = pdfDoc.getForm();

      var cGreen   = rgb(0.11, 0.62, 0.46);
      var cDark    = rgb(0.05, 0.17, 0.10);
      var cGray    = rgb(0.45, 0.45, 0.45);
      var cLightBg = rgb(0.94, 0.98, 0.96);
      var cWhite   = rgb(1, 1, 1);
      var PW = 595, PH = 842, ML = 50, CW = 495;
      var page, curY;

      function newPage(isFirst) {
        page = pdfDoc.addPage([PW, PH]);
        curY = PH - (isFirst ? 88 : 52);
      }

      function needSpace(h) {
        if (curY - h < 60) {
          newPage(false);
          page.drawText('SGAS Pro — Diagnóstico IFC PS1–PS8 (cont.)', { x:ML, y:curY, size:7.5, font:font, color:cGray });
          curY -= 18;
        }
      }

      function sectionBar(title) {
        needSpace(34);
        page.drawRectangle({ x:ML-5, y:curY-20, width:CW+10, height:26, color:cGreen });
        page.drawText(title, { x:ML+3, y:curY-13, size:10, font:boldFont, color:cWhite });
        curY -= 34;
      }

      function tfRow(id, labelText) {
        needSpace(42);
        page.drawText(labelText, { x:ML, y:curY, size:9, font:font, color:cDark });
        curY -= 15;
        var tf = form.createTextField(id);
        tf.addToPage(page, { x:ML, y:curY-17, width:CW*0.68, height:17, textColor:cDark, backgroundColor:cLightBg, borderColor:cGreen, borderWidth:0.7, font:font, fontSize:9 });
        curY -= 27;
      }

      function qRow(id, labelText) {
        needSpace(52);
        page.drawText(labelText, { x:ML, y:curY, size:9, font:font, color:cDark });
        curY -= 13;
        page.drawText('S = Sim     N = Não     D = Em Desenvolvimento     NA = Não Aplicável', { x:ML, y:curY, size:7.5, font:font, color:cGray });
        curY -= 14;
        var tf = form.createTextField(id);
        tf.addToPage(page, { x:ML, y:curY-17, width:72, height:17, textColor:cDark, backgroundColor:cLightBg, borderColor:cGreen, borderWidth:0.7, font:boldFont, fontSize:10 });
        curY -= 27;
      }

      // PAGE 1
      newPage(true);
      page.drawRectangle({ x:0, y:PH-72, width:PW, height:72, color:cDark });
      page.drawText('SGAS Pro', { x:ML, y:PH-28, size:20, font:boldFont, color:cWhite });
      page.drawText('Diagnóstico de Pré-Avaliação — Padrões de Desempenho IFC PS1–PS8', { x:ML, y:PH-46, size:10.5, font:font, color:rgb(0.6,0.88,0.75) });
      page.drawText('Versão 1.0  ·  ' + new Date().toLocaleDateString('pt-PT') + '  ·  Confidencial', { x:ML, y:PH-60, size:8, font:font, color:rgb(0.38,0.62,0.52) });

      page.drawRectangle({ x:ML, y:curY-64, width:CW, height:68, color:cLightBg });
      page.drawText('INSTRUÇÕES', { x:ML+8, y:curY-12, size:8.5, font:boldFont, color:cGreen });
      page.drawText('1. Abra este ficheiro no Adobe Acrobat Reader (gratuito).', { x:ML+8, y:curY-24, size:8, font:font, color:cDark });
      page.drawText('2. Para cada questão, escreva no campo:   S (Sim)  ·  N (Não)  ·  D (Em Desenvolvimento)  ·  NA (Não Aplicável)', { x:ML+8, y:curY-36, size:8, font:font, color:cDark });
      page.drawText('3. Guarde o PDF preenchido com o mesmo nome de ficheiro.', { x:ML+8, y:curY-48, size:8, font:font, color:cDark });
      page.drawText('4. No SGAS Pro → Diagnóstico IFC, faça upload do ficheiro para gerar o relatório de conformidade automático.', { x:ML+8, y:curY-60, size:8, font:font, color:cDark });
      curY -= 78;

      sectionBar('SECÇÃO 0 — PERFIL DO PROJECTO');
      tfRow('p_empresa',    'Nome da Empresa / Organização');
      tfRow('p_projecto',   'Nome do Projecto');
      tfRow('p_pais',       'País');
      tfRow('p_sector',     'Sector / Actividade Principal');
      tfRow('p_categoria',  'Categoria IFC  (escrever: A  B  C  ou  FI)');
      tfRow('p_financiador', 'Financiador / Banco / Instituição');
      curY -= 8;

      sectionBar('SECÇÃO 1 — PS1: Sistema de Gestão Ambiental e Social (ESMS)');
      qRow('ps1_q1', '1.1 — A empresa tem uma Política E&S formal aprovada pela direcção e comunicada?');
      qRow('ps1_q2', '1.2 — Existe um ESAP (Plano de Acção E&S) activo com prazos e responsáveis?');
      qRow('ps1_q3', '1.3 — O projecto tem um Mecanismo de Reclamações (GRM) operacional e acessível?');
      qRow('ps1_q4', '1.4 — Existe um Plano de Engajamento com Partes Interessadas (SEP) documentado?');
      qRow('ps1_q5', '1.5 — São realizadas avaliações de risco E&S regularmente (mínimo anual)?');

      // PAGE 2
      newPage(false);
      page.drawText('SGAS Pro — Diagnóstico IFC PS1–PS8', { x:ML, y:curY+5, size:7.5, font:font, color:cGray });
      curY -= 14;

      sectionBar('SECÇÃO 2 — PS2: Trabalho e Condições de Trabalho');
      qRow('ps2_q1', '2.1 — Existe uma política de trabalho formal, documentada e comunicada a todos?');
      qRow('ps2_q2', '2.2 — Os trabalhadores têm acesso a mecanismo de reclamações laboral independente?');
      qRow('ps2_q3', '2.3 — Existe Plano SSO (Saúde & Segurança Ocupacional) implementado com EPI?');
      qRow('ps2_q4', '2.4 — São avaliados e geridos riscos E&S de subempreiteiros e contratantes?');
      curY -= 8;

      sectionBar('SECÇÃO 3 — PS3: Eficiência de Recursos e Prevenção da Poluição');
      qRow('ps3_q1', '3.1 — Existe monitoramento regular de emissões, efluentes e resíduos documentado?');
      qRow('ps3_q2', '3.2 — Existe um plano de gestão de resíduos aprovado e implementado?');
      qRow('ps3_q3', '3.3 — O projecto utiliza as melhores tecnologias disponíveis (BAT)?');
      curY -= 8;

      sectionBar('SECÇÃO 4 — PS4: Saúde, Segurança e Protecção das Comunidades');
      qRow('ps4_q1', '4.1 — Foi feita avaliação de riscos para saúde/segurança das comunidades vizinhas?');
      qRow('ps4_q2', '4.2 — Existe plano de preparação e resposta a emergências documentado e testado?');
      qRow('ps4_q3', '4.3 — O pessoal de segurança física opera com código de conduta IFC/VPs?');

      // PAGE 3
      newPage(false);
      page.drawText('SGAS Pro — Diagnóstico IFC PS1–PS8', { x:ML, y:curY+5, size:7.5, font:font, color:cGray });
      curY -= 14;

      sectionBar('SECÇÃO 5 — PS5: Aquisição de Terras e Reassentamento Involuntário');
      qRow('ps5_q1', '5.1 [TRIAGEM] — Projecto envolve aquisição de terras ou deslocamento? (S ou N)');
      qRow('ps5_q2', '5.2 — Existe Declaração de Não-Aplicabilidade ou Plano de Reassentamento aprovado?');
      qRow('ps5_q3', '5.3 — Foram realizadas consultas e compensações justas (se aplicável)?');
      curY -= 8;

      sectionBar('SECÇÃO 6 — PS6: Conservação da Biodiversidade');
      qRow('ps6_q1', '6.1 — Foi realizada avaliação de impacto em biodiversidade e habitats naturais?');
      qRow('ps6_q2', '6.2 — Existem medidas de compensação e mitigação de impactos em biodiversidade?');
      curY -= 8;

      sectionBar('SECÇÃO 7 — PS7: Povos Indígenas e Comunidades Tradicionais');
      qRow('ps7_q1', '7.1 [TRIAGEM] — Existem comunidades indígenas/tradicionais na área? (S ou N)');
      qRow('ps7_q2', '7.2 — Foi realizado processo CLPI/FPIC (Consulta Livre, Prévia e Informada)?');
      qRow('ps7_q3', '7.3 — Existe plano de engajamento culturalmente apropriado aprovado?');
      curY -= 8;

      sectionBar('SECÇÃO 8 — PS8: Património Cultural');
      qRow('ps8_q1', '8.1 — Foi realizada triagem de impacto em sítios de património cultural?');
      qRow('ps8_q2', '8.2 — Existe procedimento para descobertas fortuitas (chance finds) em obra?');

      curY -= 24;
      page.drawLine({ start:{x:ML,y:curY}, end:{x:PW-ML,y:curY}, thickness:0.5, color:cGray });
      curY -= 12;
      page.drawText('SGAS Pro · Conformidade E&S IFC/Banco Mundial · hsilva.org', { x:ML, y:curY, size:7.5, font:font, color:cGray });
      page.drawText('Documento confidencial — exclusivamente para diagnóstico interno de conformidade E&S.', { x:ML, y:curY-11, size:7, font:font, color:cGray });

      var bytes = await pdfDoc.save();
      var blob = new Blob([bytes], { type:'application/pdf' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url; a.download = 'SGAS_Pro_Diagnostico_IFC_PS1-PS8.pdf';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 2000);

    } catch (err) {
      alert('Erro ao gerar PDF: ' + err.message);
      console.error('[SGAS Diagnostico]', err);
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = '⬇ Descarregar Template PDF'; }
    }
  };

  // ── PDF Parsing ─────────────────────────────────────────────────────────────
  window.diagnostico_handleDrop = function (event) {
    var file = event.dataTransfer && event.dataTransfer.files[0];
    if (file) window.diagnostico_handleFile(file);
  };

  window.diagnostico_handleFile = async function (file) {
    if (!file || !file.name.toLowerCase().endsWith('.pdf')) { alert('Seleccione um ficheiro .pdf.'); return; }

    var status = document.getElementById('diag-parse-status');
    function setStatus(text, bg, color) {
      if (!status) return;
      status.style.display = 'block';
      status.style.background = bg; status.style.color = color;
      status.textContent = text;
    }
    setStatus('⏳ A ler PDF e extrair respostas…', '#EFF6FF', '#1E40AF');

    try {
      if (!window.PDFLib) throw new Error('pdf-lib não carregado.');
      var PDFDocument = window.PDFLib.PDFDocument;
      var bytes = await file.arrayBuffer();
      var pdfDoc = await PDFDocument.load(new Uint8Array(bytes), { ignoreEncryption:true });
      var form = pdfDoc.getForm();

      var data = {};
      FIELDS.forEach(function (f) {
        try { data[f.id] = (form.getTextField(f.id).getText() || '').trim(); }
        catch (e) { data[f.id] = ''; }
      });

      var filled = FIELDS.filter(function (f) { return data[f.id]; }).length;
      var analysis = analyzeData(data);
      renderResults(analysis);
      setStatus('✓ ' + filled + ' de ' + FIELDS.length + ' campos lidos · ' + analysis.gaps.length + ' gap(s) identificado(s)', '#ECFDF5', '#065F46');

    } catch (err) {
      setStatus('✗ Erro: ' + err.message, '#FEF2F2', '#991B1B');
      console.error('[SGAS Diagnostico] Parse error:', err);
    }
  };

})();
