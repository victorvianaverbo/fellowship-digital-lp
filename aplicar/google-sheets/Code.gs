/**
 * Fellowship Digital - recebe as aplicações do site e grava na planilha.
 *
 * Cada visita ao formulário tem um id. O site manda uma linha parcial depois
 * do e-mail e atualiza a mesma linha a cada avanço, até o status final:
 *   parcial            -> parou no meio (abandono)
 *   completa           -> enviou a aplicação
 *   não médico         -> saiu na pergunta "Você é médico?"
 *   sem condição agora -> saiu na pergunta do investimento
 *
 * Como usar (uma vez):
 * 1. Na planilha, menu Extensões > Apps Script. Apague o conteúdo e cole este arquivo.
 * 2. Implantar > Nova implantação > tipo "Aplicativo da Web":
 *    - Executar como: Eu
 *    - Quem pode acessar: Qualquer pessoa
 * 3. Copie a URL do Web App (termina em /exec) e cole em data-endpoint
 *    no <form> de /aplicar/index.html.
 */

var ABA = 'Aplicações';

// [chave enviada pelo site, título da coluna]
var COLUNAS = [
  ['enviado_em', 'Data'],
  ['atualizado_em', 'Atualizado em'],
  ['status', 'Status'],
  ['triagem', 'Triagem'],
  ['nome', 'Nome'],
  ['telefone', 'WhatsApp'],
  ['email', 'E-mail'],
  ['instagram', 'Instagram'],
  ['medico', 'Médico'],
  ['especialidade', 'Especialidade'],
  ['momento', 'Momento do negócio'],
  ['ensina', 'O que ensina'],
  ['faturamento', 'Faturamento'],
  ['desafio', 'Maior desafio'],
  ['investimento', 'Condição de investir'],
  ['origem', 'Como conheceu'],
  ['disponibilidade', 'Disponibilidade quinzenal'],
  ['utm_source', 'utm_source'],
  ['utm_medium', 'utm_medium'],
  ['utm_campaign', 'utm_campaign'],
  ['utm_content', 'utm_content'],
  ['utm_term', 'utm_term'],
  ['fbclid', 'fbclid'],
  ['gclid', 'gclid'],
  ['pagina', 'Página'],
  ['id', 'ID']
];

// Status finais nunca voltam para "parcial" (um envio parcial atrasado não desfaz o final)
var FINAIS = ['completa', 'não médico', 'sem condição agora'];

// Aviso por e-mail a cada aplicação completa. Vazio = e-mail da conta dona do script.
// Para avisar mais gente, separe por vírgula: 'a@x.com,b@y.com'
var EMAIL_AVISO = '';

function doPost(e) {
  var lock = LockService.getScriptLock();
  var avisar = null;
  try {
    lock.waitLock(20000);
    var dados = JSON.parse(e.postData.contents || '{}');
    var aba = obterAba();
    var agora = new Date();
    var colId = indice('id');
    var linhaExistente = dados.id ? procurarLinha(aba, colId, dados.id) : 0;

    if (linhaExistente) {
      var atual = aba.getRange(linhaExistente, 1, 1, COLUNAS.length).getValues()[0];
      var statusAtual = String(atual[indice('status')] || '');
      if (dados.status === 'parcial' && FINAIS.indexOf(statusAtual) !== -1) {
        return responder({ ok: true, ignorado: true });
      }
      var nova = COLUNAS.map(function (c, i) {
        if (c[0] === 'enviado_em') return atual[i]; // mantém a data da primeira gravação
        if (c[0] === 'atualizado_em') return agora;
        var v = dados[c[0]];
        if (v == null || v === '') return typeof atual[i] === 'string' ? texto(atual[i]) : atual[i];
        return texto(v);
      });
      aba.getRange(linhaExistente, 1, 1, COLUNAS.length).setValues([nova]);
      if (dados.status === 'completa' && statusAtual !== 'completa') avisar = nova;
    } else {
      var linha = COLUNAS.map(function (c) {
        if (c[0] === 'enviado_em' || c[0] === 'atualizado_em') return agora;
        var v = dados[c[0]];
        return v == null ? '' : texto(v);
      });
      aba.appendRow(linha);
      if (dados.status === 'completa') avisar = linha;
    }
  } catch (err) {
    return responder({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
  // Fora do lock: o e-mail não segura as outras gravações, e uma falha no envio não derruba a aplicação
  if (avisar) {
    try { enviarAviso(avisar); } catch (err) { console.error('Aviso por e-mail falhou: ' + err); }
  }
  return responder({ ok: true });
}

function enviarAviso(linha) {
  var v = function (chave) { return String(linha[indice(chave)] || '').replace(/^'/, ''); };
  var para = EMAIL_AVISO || Session.getEffectiveUser().getEmail();
  var zap = v('telefone').replace(/\D/g, '');
  var esc = function (s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };

  var campos = COLUNAS.filter(function (c) {
    return ['enviado_em', 'atualizado_em', 'id', 'pagina'].indexOf(c[0]) === -1 && v(c[0]);
  });
  var tabela = campos.map(function (c) {
    return '<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top;white-space:nowrap">' + esc(c[1]) +
      '</td><td style="padding:6px 0">' + esc(v(c[0])) + '</td></tr>';
  }).join('');
  var corpo = campos.map(function (c) { return c[1] + ': ' + v(c[0]); }).join('\n');

  var botoes = (zap ? '<a href="https://wa.me/' + zap + '" style="display:inline-block;background:#2A2A2A;color:#E9E2D3;padding:10px 16px;text-decoration:none;margin-right:8px">CHAMAR NO WHATSAPP</a>' : '') +
    '<a href="' + SpreadsheetApp.getActiveSpreadsheet().getUrl() + '" style="display:inline-block;border:1px solid #2A2A2A;color:#2A2A2A;padding:10px 16px;text-decoration:none">ABRIR PLANILHA</a>';

  MailApp.sendEmail({
    to: para,
    subject: 'Nova aplicação: ' + v('nome') + ' · ' + (v('especialidade') || 'sem especialidade') + ' · ' + (v('triagem') || 'sem triagem'),
    body: corpo + (zap ? '\n\nWhatsApp: https://wa.me/' + zap : ''),
    htmlBody: '<div style="font-family:Arial,sans-serif;font-size:14px;color:#2A2A2A">' +
      '<p style="font-size:18px;margin:0 0 16px">Nova aplicação para a cohort 01</p>' +
      '<table style="border-collapse:collapse;margin-bottom:20px">' + tabela + '</table>' + botoes + '</div>',
    name: 'Fellowship Digital'
  });
}

// Rode esta função uma vez pelo editor (botão Executar) para autorizar o envio e receber um e-mail de teste
function testarAviso() {
  enviarAviso(COLUNAS.map(function (c) {
    var exemplo = { nome: 'Teste', telefone: '+5511999999999', email: 'teste@exemplo.com', especialidade: 'Cardiologia', status: 'completa', triagem: 'Apto' };
    return exemplo[c[0]] || '';
  }));
}

function doGet() {
  return responder({ ok: true, servico: 'Fellowship Digital - aplicações' });
}

// Grava como texto: mantém o + do WhatsApp e impede que uma resposta vire fórmula
function texto(v) {
  var s = String(v);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function indice(chave) {
  for (var i = 0; i < COLUNAS.length; i++) if (COLUNAS[i][0] === chave) return i;
  return -1;
}

function procurarLinha(aba, colId, id) {
  var ultima = aba.getLastRow();
  if (ultima < 2) return 0;
  var achado = aba.getRange(2, colId + 1, ultima - 1, 1)
    .createTextFinder(String(id)).matchEntireCell(true).findNext();
  return achado ? achado.getRow() : 0;
}

function obterAba() {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var aba = planilha.getSheetByName(ABA) || planilha.insertSheet(ABA);
  if (aba.getLastRow() === 0) {
    aba.appendRow(COLUNAS.map(function (c) { return c[1]; }));
    aba.getRange(1, 1, 1, COLUNAS.length).setFontWeight('bold');
    aba.setFrozenRows(1);
  }
  return aba;
}

function responder(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
