// Configurações
const NOME_PLANILHA = 'Respostas do Quiz Ketlle';
const CHAVE_PROPRIEDADE = 'CHAVE_PAINEL';

// doGet: Lista respostas (painel)
function doGet(e) {
  const acao = e.parameter.acao;
  const chave = e.parameter.chave;

  if (acao === 'listar') {
    return listarRespostas(chave);
  }

  return ContentService.createTextOutput(JSON.stringify({ erro: 'Ação inválida' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// doPost: Recebe e grava respostas
function doPost(e) {
  try {
    const dados = JSON.parse(e.postData.contents);
    const idSessao = dados.idSessao;
    const dataHora = dados.dataHora;
    const respostas = dados.respostas;

    // Verificar se já existe essa sessão
    const planilha = getOrCreatePlanilha();
    const ultimaLinha = planilha.getLastRow();

    if (ultimaLinha > 1) {
      const sessoes = planilha.getRange(2, 2, ultimaLinha - 1, 1).getValues();
      const jaExiste = sessoes.some((s) => s[0] === idSessao);

      if (jaExiste) {
        return ContentService.createTextOutput(JSON.stringify({ sucesso: true, duplicado: true }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }

    // Criar cabeçalho se necessário
    if (ultimaLinha === 0) {
      const cabecalho = ['Data/Hora', 'ID Sessão'];
      for (let i = 1; i <= 20; i++) {
        cabecalho.push(`Pergunta ${i}`, `Pergunta ${i} (Outra)`);
      }
      cabecalho.push('JSON Completo');
      planilha.getRange(1, 1, 1, cabecalho.length).setValues([cabecalho]);
    }

    // Preparar linha
    const linha = [dataHora, idSessao];

    // Mapear respostas por ID
    const respostasMap = {};
    respostas.forEach((r) => {
      respostasMap[r.perguntaId] = r;
    });

    // Adicionar respostas (20 perguntas)
    for (let i = 1; i <= 20; i++) {
      const resp = respostasMap[i];
      if (resp) {
        if (Array.isArray(resp.valor)) {
          linha.push(resp.valor.join(', '));
        } else {
          linha.push(resp.valor);
        }
        linha.push(resp.outro || '');
      } else {
        linha.push('', '');
      }
    }

    linha.push(JSON.stringify(dados));

    // Adicionar linha
    planilha.appendRow(linha);

    return ContentService.createTextOutput(JSON.stringify({ sucesso: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ erro: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// listarRespostas: Retorna todas as respostas se a chave estiver correta
function listarRespostas(chave) {
  const chaveCorreta = PropertiesService.getScriptProperties().getProperty(CHAVE_PROPRIEDADE);

  if (!chaveCorreta || chave !== chaveCorreta) {
    return ContentService.createTextOutput(JSON.stringify({ erro: 'Acesso negado' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const planilha = getOrCreatePlanilha();
  const ultimaLinha = planilha.getLastRow();

  if (ultimaLinha <= 1) {
    return ContentService.createTextOutput(JSON.stringify({ respostas: [] }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // Lê a coluna "JSON Completo" (última) e monta o formato que o painel espera
  const ultimaColuna = planilha.getLastColumn();
  const jsons = planilha.getRange(2, ultimaColuna, ultimaLinha - 1, 1).getValues();
  const respostas = [];
  jsons.forEach((l) => {
    try {
      const d = JSON.parse(l[0]);
      const obj = { dataHora: d.dataHora, idSessao: d.idSessao };
      (d.respostas || []).forEach((r) => {
        obj['pergunta_' + r.perguntaId] = Array.isArray(r.valor) ? r.valor.join(', ') : r.valor;
        obj['pergunta_' + r.perguntaId + '_outro'] = r.outro || '';
      });
      respostas.push(obj);
    } catch (err) {}
  });

  return ContentService.createTextOutput(JSON.stringify({ respostas }))
    .setMimeType(ContentService.MimeType.JSON);
}

// getOrCreatePlanilha: Cria ou retorna a planilha
function getOrCreatePlanilha() {
  const planilhas = SpreadsheetApp.openById(getPlanilhaId());
  const abas = planilhas.getSheets();

  if (abas.length === 0) {
    return planilhas.insertSheet('Respostas');
  }

  return abas[0];
}

// getPlanilhaId: Retorna o ID da planilha
function getPlanilhaId() {
  const id = PropertiesService.getScriptProperties().getProperty('PLANILHA_ID');
  if (id) {
    return id;
  }
  // Planilha "Respostas Ketlle"
  return '1MUDSsKC4f92F9xU_f-r4ysFzAJ1yztaF7IHXuU_TQqM';
}

// Rode esta função UMA vez (botão Executar) para autorizar o script e definir a chave do painel
function configurar() {
  PropertiesService.getScriptProperties().setProperty(CHAVE_PROPRIEDADE, 'TROQUE_PELA_SUA_CHAVE');
  getOrCreatePlanilha();
  return 'Configurado!';
}
