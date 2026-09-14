# Formulário de aplicação no Google Sheets

O formulário de `/aplicar/` envia as respostas para uma planilha do Google Sheets por meio de um Web App do Apps Script. Nada passa pela Netlify.

## Configuração (uma vez)

1. Crie uma planilha no Google Sheets e renomeie a primeira aba para `Aplicações`.
2. Abra Extensões > Apps Script, apague o conteúdo e cole o arquivo `Code.gs` desta pasta.
3. Clique em Implantar > Nova implantação, tipo "Aplicativo da Web":
   - Executar como: Eu
   - Quem pode acessar: Qualquer pessoa
4. Autorize o script quando o Google pedir.
5. Copie a URL do Web App (termina em `/exec`).
6. Em `aplicar/index.html`, cole a URL no atributo `data-endpoint` do `<form>`.
7. Faça commit e push. A Netlify publica sozinha.

## Teste

Abra `https://fellowshipdigital.com.br/aplicar/`, preencha até o fim e envie. A linha aparece na aba `Aplicações` com data, respostas, origem e UTMs.

Se a URL do Web App estiver vazia ou errada, o formulário mostra "Não foi possível enviar" e nada é gravado.

## Alterações no script

Sempre que editar o `Code.gs`, é preciso publicar uma nova versão: Implantar > Gerenciar implantações > editar > Versão: Nova versão. A URL continua a mesma.
