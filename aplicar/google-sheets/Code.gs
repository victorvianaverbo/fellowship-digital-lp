/**
 * Fellowship Digital - recebe as aplicações do site e grava na planilha.
 *
 * Como usar (uma vez):
 * 1. Crie uma planilha no Google Sheets. Renomeie a primeira aba para "Aplicações".
 * 2. Menu Extensões > Apps Script. Apague o conteúdo e cole este arquivo.
 * 3. Implantar > Nova implantação > tipo "Aplicativo da Web":
 *    - Executar como: Eu
 *    - Quem pode acessar: Qualquer pessoa
 * 4. Copie a URL do Web App (termina em /exec) e cole em data-endpoint
 *    no <form> de /aplicar/index.html.
 */

var ABA = 'Aplicações';

var COLUNAS = [
  ['enviado_em', 'Data'],
  ['nome', 'Nome'],
  ['email', 'E-mail'],
  ['telefone', 'WhatsApp'],
  ['medico', 'Médico'],
  ['especialidade', 'Especialidade'],
  ['ensina', 'O que ensina'],
  ['momento', 'Momento do negócio'],
  ['faturamento', 'Faturamento'],
  ['investimento', 'Condição de investir'],
  ['disponibilidade', 'Disponibilidade quinzenal'],
  ['triagem', 'Triagem'],
  ['origem', 'Como conheceu'],
  ['utm_source', 'utm_source'],
  ['utm_medium', 'utm_medium'],
  ['utm_campaign', 'utm_campaign'],
  ['utm_content', 'utm_content'],
  ['utm_term', 'utm_term'],
  ['fbclid', 'fbclid'],
  ['gclid', 'gclid'],
  ['pagina', 'Página']
];

function doPost(e) {
  try {
    var dados = JSON.parse(e.postData.contents || '{}');
    var aba = obterAba();
    var linha = COLUNAS.map(function (c) {
      var v = dados[c[0]];
      if (c[0] === 'enviado_em') return v ? new Date(v) : new Date();
      return v == null ? '' : String(v);
    });
    aba.appendRow(linha);
    return responder({ ok: true });
  } catch (err) {
    return responder({ ok: false, error: String(err) });
  }
}

function doGet() {
  return responder({ ok: true, servico: 'Fellowship Digital - aplicações' });
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
