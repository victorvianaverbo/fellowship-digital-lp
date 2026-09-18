# Formulário de aplicação no Google Sheets

O formulário de `/aplicar/` envia as respostas para uma planilha do Google Sheets por meio de um Web App do Apps Script. Nada passa pela Netlify.

## Como a gravação funciona

Cada visita ao formulário recebe um id. Depois da pergunta do e-mail, o site já cria a linha na planilha com status `parcial` e atualiza essa mesma linha a cada resposta. No fim, o status vira:

| Status | Quando |
|---|---|
| `parcial` | A pessoa parou no meio (abandono). Nome, WhatsApp e e-mail já estão lá. |
| `completa` | Enviou a aplicação. |
| `não médico` | Respondeu "Não" em "Você é médico?". |
| `sem condição agora` | Respondeu "Ainda não" na pergunta do investimento. |

A coluna Triagem continua marcando `Apto` ou `Sem disponibilidade quinzenal` nas completas. Um status final nunca volta para `parcial`.

## Aviso por e-mail

Cada aplicação `completa` dispara um e-mail com as respostas, um botão para chamar no WhatsApp e o link da planilha. Vai para a conta dona do script. Para mandar para outros e-mails, preencha `EMAIL_AVISO` no `Code.gs` (separados por vírgula). Abandonos e saídas não geram e-mail, só ficam na planilha.

## Configuração (uma vez)

1. Abra a planilha "Fellowship Digital · Aplicações".
2. Abra Extensões > Apps Script, apague o conteúdo e cole o arquivo `Code.gs` desta pasta.
3. Clique em Implantar > Nova implantação, tipo "Aplicativo da Web":
   - Executar como: Eu
   - Quem pode acessar: Qualquer pessoa
4. Autorize o script quando o Google pedir (planilha e envio de e-mail). Para testar o aviso, escolha a função `testarAviso` no editor e clique em Executar.
5. Copie a URL do Web App (termina em `/exec`).
6. Em `aplicar/index.html`, cole a URL no atributo `data-endpoint` do `<form>`.
7. Faça commit e push. A Netlify publica sozinha.

A aba `Aplicações` e o cabeçalho são criados sozinhos na primeira gravação.

## Teste

Abra `https://fellowshipdigital.com.br/aplicar/`, preencha até o e-mail e confira a linha `parcial`. Termine e confira que a mesma linha virou `completa`.

Se a URL do Web App estiver vazia ou errada, o formulário mostra "Não foi possível enviar" e nada é gravado.

## Alterações no script

Sempre que editar o `Code.gs`, é preciso publicar uma nova versão: Implantar > Gerenciar implantações > editar > Versão: Nova versão. A URL continua a mesma.

Se mudar as perguntas do formulário, mantenha o `name` de cada campo igual à chave em `COLUNAS` no `Code.gs`.
