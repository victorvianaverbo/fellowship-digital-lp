# Layout - Fellowship Digital | Página de aplicação

> Atualização de 14/09/2026, segunda rodada (aprovada pelo Victor): as fotos do hero e da final saíram. Nos dois lugares entra o efeito "órbitas do board" (orbits.js, Canvas 2D): quatro anéis em perspectiva com um ponto luminoso cada (os mentores), 24 marcas no anel externo (as sessions, seis em azul para gestão) e um núcleo pulsante (o caso do fellow). Topbar integrada ao hero, sem barra própria. Paleta ganha azul elétrico #3B6FD6 (brilhos, filetes, numerais em destaque, hover) e azul gelo #DDE7F5 (fundos claros, no lugar de #E8ECF2). Fotos da apresentação, da mesa e do board dissolvidas por máscara radial, sem borda nem sombra. Board em fichas com número e filete azul. Diagrama de ciclos em SVG: linha de 12 meses, 24 marcas de session, 6 pontos de gestão, seis arcos rotulados. Formatos volta ao marinho. Grão a 3% (claro) e 5% (escuro).

> Atualização de 14/09/2026 (reforma visual, aprovada pelo Victor). O que muda em relação à especificação abaixo:
> - Hero e seção final: sai a malha em perspectiva (field.js não é mais carregado). Entra fotografia em duotone gerada no Higgsfield (Soul Location): anfiteatro no hero, biblioteca na final. Camadas: foto em grayscale com brilho 1.15, véu azul-aço multiply a 0.55, gradiente de leitura horizontal (0.9 a 0.08) e vertical. Topbar com marca maior (emblema 3rem, nome 1.75rem; 2.25rem e 1.25rem no celular). Sai a linha "Cohort 01, aplicações abertas."
> - Fotos em seção: apresentação (visita de enfermaria, Nano Banana Pro, 4:5, à esquerda em grid 5/7, sticky) e como funciona (mesa de discussão de caso, faixa de 320px entre o cabeçalho e a timeline). Tratamento `.duo`: grayscale, véu azul-aço multiply a 0.85, prata screen a 0.14.
> - Fundos: cinza-azulado #E8ECF2 em para quem, tracks, critérios e FAQ; azul-aço #2C4A6E em formatos; marinho no board. Classe `.grain` aplica grão de papel (SVG feTurbulence) a 4,5% nas seções claras e a 7% em screen nas escuras.
> - Board: retratos reais em duotone (fabrissio, gabriel, victor, vinicius em /images/board/), ordem alfabética, credenciais sem números e sem nomear a empresa. Bento: sala de staff, tracks e indicadores com span 6.
> - Texto cortado em cerca de 30% (ver copy.md de 14/09).

> Especificação para /desenvolver. Fonte de texto: copy.md (usar exatamente). Fonte de linguagem visual: index.html e style.css aprovados (hero + apresentação).
> Princípio geral: página institucional, como a de um programa de pós-graduação. Nada de rótulos em caixa alta, nada de ícones ilustrativos, nada de cards com borda colorida à esquerda, nada de emoji. A hierarquia vem da tipografia (Newsreader para títulos e números, Source Sans 3 para prosa), das linhas de prata e do contraste marinho/branco-frio. Movimento discreto: linhas que se desenham, revelações suaves ao scroll, contadores nos números. Sem parallax, sem glassmorphism, sem cursor customizado.

---

## Linguagem visual (extraída do design aprovado)

### Cores

| Token | Hex | Uso |
|---|---|---|
| --marinho | #0B1F3A | Fundo das seções escuras, títulos sobre branco, botão escuro |
| --aco | #2C4A6E | Apoio: subtítulos sobre branco, hover do botão escuro, ordinais |
| --prata | #B8C0CC | Linhas, filetes, emblema, texto de contexto sobre marinho |
| --branco | #F5F7FA | Fundo das seções claras, texto sobre marinho, botão claro |
| --grafite | #1A1D21 | Prosa sobre branco |
| Tinta sobre branco a 86% | rgba(26,29,33,0.86) | Parágrafos |
| Tinta sobre branco a 68% | rgba(26,29,33,0.68) | Texto secundário, legendas |
| Branco sobre marinho a 80% | rgba(245,247,250,0.80) | Parágrafos em seção escura |
| Branco sobre marinho a 62% | rgba(245,247,250,0.62) | Texto de apoio em seção escura |
| Linha sobre branco | rgba(11,31,58,0.12) | Divisores finos |
| Linha sobre marinho | rgba(184,192,204,0.25) | Divisores finos em seção escura |
| Tinta de apoio clara | #E8ECF2 | Fundo de bloco secundário sobre branco (única variação de fundo claro) |

### Tipografia

- Títulos: Newsreader 600. h1 clamp(2.75rem, 6.6vw, 6.25rem), line-height 0.98, letter-spacing -0.012em. h2 clamp(2rem, 3.6vw, 3.25rem), line-height 1.05. h3 clamp(1.375rem, 2vw, 1.75rem), line-height 1.15.
- Lede: Newsreader 500, 1.5rem, line-height 1.4, cor marinho.
- Prosa: Source Sans 3 400, 1.125rem, line-height 1.65. Largura máxima 40rem.
- Texto de apoio: Source Sans 3 400, 0.9375rem, line-height 1.5.
- Números grandes: Newsreader 600, tabular-nums.
- Nunca caixa alta com letter-spacing. Nunca itálico em título.

### Espaço

- Container 1280px, padding lateral clamp(1.25rem, 5vw, 4.5rem).
- Seções: padding vertical clamp(4rem, 10vw, 8rem).
- Grid editorial padrão: 4fr 8fr, gap clamp(2rem, 6vw, 6rem). Variações: 7fr 5fr no hero, 5fr 7fr em blocos invertidos.
- Breakpoints: 960px (grids viram uma coluna, sticky desliga), 640px (botões viram largura total, tipografia reduz).

### Movimento

- Hero sem animação de entrada. Apenas o filete de prata se desenha (stroke-dashoffset 220 a 0, 1300ms cubic-bezier(0.2,0.7,0.2,1), delay 250ms).
- Demais seções: AOS fade-up, duration 800, easing ease-out-cubic, once true, offset 50, disableMutationObserver true. Delays em stagger de 80ms entre irmãos, máximo 320ms.
- Linhas divisórias que se desenham: transform scaleX(0) a scaleX(1), transform-origin left, 900ms cubic-bezier(0.2,0.7,0.2,1), disparadas por IntersectionObserver a 30% de visibilidade.
- Contadores: de 0 ao valor em 1400ms ease-out, disparados uma vez a 40% de visibilidade.
- prefers-reduced-motion: tudo desligado, estado final imediato.

### Botões

- .btn: inline-flex, min-height 3.25rem, padding 0.9rem 1.75rem, Source Sans 3 600, letter-spacing 0.01em, sem border-radius, transição 200ms.
- .btn--light: fundo #F5F7FA, texto #0B1F3A, hover fundo #FFFFFF.
- .btn--dark: fundo #0B1F3A, texto #F5F7FA, hover fundo #2C4A6E.
- Focus visível: outline 2px #B8C0CC, offset 3px.
- Todo CTA "Aplicar para a cohort 01" leva a /aplicar/ (página do formulário). Até ela existir, âncora #aplicar.

---

## Seção 1: Topbar + Hero (aprovado)

### Arquétipo e Constraints
- Arquétipo: Split Assimétrico 7/5, Type Hero.
- Constraints: headline serifada grande (tipografia), malha em perspectiva com movimento ambiente (mídia), filete desenhado após carregamento (movimento).
- Justificativa: a página abre como a capa de um programa institucional. A tipografia carrega a autoridade; o fundo é uma malha de linhas finas em prata vista em perspectiva, como um campo que se estende ao horizonte, ondulando devagar. Tecnologia sem alegria: nada pisca, nada colore.

### Conteúdo
Topbar: emblema + "Fellowship Digital"; links "O programa" (#programa), "O board" (#board), "Aplicar" (/aplicar/).
Hero: "Cohort 01, aplicações abertas." / "A subespecialização em negócios digitais para médicos." / lead da copy / botão "Aplicar para a cohort 01" / "A aplicação leva três minutos e um mentor do board conversa com você antes de qualquer decisão."

### Layout
Já implementado em index.html, style.css e field.js. Manter exatamente: topbar padding 1.5rem top; hero padding-top clamp(3rem,7vw,5.5rem), grid 7fr 5fr, min-height 520px, align-items end; coluna de texto com padding-bottom clamp(3rem,7vw,6rem); coluna direita vazia (a malha ocupa o espaço).

### Fundo (malha em perspectiva)
- Camadas, de trás para frente: (1) gradiente de profundidade em CSS, linear 180deg #0B1F3A 0%, #0D2444 55%, #0B1F3A 100%, mais um radial em 85% 70% de rgba(44,74,110,0.55) a transparente em 60%; (2) canvas `.hero__field` absoluto cobrindo a seção, z-index 0; (3) véu `.hero::after` linear 90deg rgba(11,31,58,0.86) 0%, 0.42 em 46%, 0 em 100%, para garantir contraste do texto à esquerda; (4) conteúdo, z-index 2.
- Canvas (field.js): 44 colunas x 26 linhas de profundidade, plano entre z 1.15 e 16, câmera a 1.35 de altura, horizonte a 36% da altura da seção. Superfície ondulada por duas senoides de amplitude 0.42 e 0.16, tempo avançando 0.0038 por quadro. Linhas de profundidade em rgba(184,192,204, 0.07 a 0.47) conforme a distância; linhas de fuga a 0.16. Esmaecimento do horizonte com gradiente marinho de 30% a 52% da altura. DPR limitado a 2.
- Comportamento: só anima com a seção visível (IntersectionObserver a 5%) e com a aba ativa; com prefers-reduced-motion desenha um único quadro estático. Sem biblioteca; o arquivo tem cerca de 4 KB e entra com defer.
- No mobile (abaixo de 960px) o véu vira vertical (0.55 no topo a 0.85 na base) para o texto seguir legível com a malha atrás.

### Responsividade
960px: uma coluna, véu vertical sobre a malha. 640px: h1 clamp(2.5rem,12vw,3.25rem), botão largura total, links "O programa" e "O board" ocultos (só "Aplicar").

---

## Seção 2: Apresentação (aprovada)

### Arquétipo e Constraints
- Arquétipo: Editorial 4/8 com título sticky.
- Constraints: lede em serifa (tipografia), stagger fade-up (movimento).

### Conteúdo
Título: "Um programa de formação, não um curso." Três parágrafos da copy, o primeiro como lede.

### Layout
Já implementado. Grid 4fr 8fr, título sticky top 2.5rem, prosa max-width 40rem, gap 1.5rem entre parágrafos, AOS fade-up com delays 0, 80, 160.

---

## Seção 3: Para quem o programa foi desenhado

### Arquétipo e Constraints
- Arquétipo: Modular em linhas (ledger editorial). Três linhas horizontais de largura total, cada uma com ordinal à esquerda e prosa à direita.
- Constraints: numerais em Newsreader grande (tipografia), linhas divisórias que se desenham (movimento), hover que escurece o ordinal (interação).
- Justificativa: a copy descreve três momentos em sequência ("o primeiro", "o segundo", "o terceiro"), então o ordinal é informação, não decoração. Linhas em vez de cards mantêm o tom de documento.

### Conteúdo
Título: "Três momentos de carreira, uma mesma necessidade."
Introdução (acima das linhas): "O programa recebe médicos em três momentos distintos."
Linha 1, ordinal "Primeiro": "O de quem já vende um curso, uma mentoria ou um preparatório e sente que o negócio depende inteiramente da própria presença: o lançamento rende, mas cansa, e entre um ciclo e outro a agenda do consultório ocupa todo o espaço que sobrava."
Linha 2, ordinal "Segundo": "O de quem tem audiência e demanda, recebe pedidos de curso toda semana e mantém aulas gravadas numa pasta há meses, sem conseguir decidir o preço, a plataforma ou a forma de vender sem comprometer o nome que levou uma década para construir."
Linha 3, ordinal "Terceiro": "O de quem quer começar e prefere fazer isso com orientação desde o primeiro passo, em vez de gastar um ano descobrindo o que alguém experiente poderia ter indicado numa conversa."
Fechamento (abaixo das linhas, como lede): "Nos três casos, o diagnóstico é o mesmo. Sobra competência clínica e falta supervisão de negócio. E o que está em jogo não é só dinheiro, mas o tempo depois do consultório, a paciência da família na semana de lançamento e a sensação de amadorismo em algo que o médico leva a sério."

Nota: a copy original traz os três momentos num único parágrafo. Aqui ele é distribuído nas três linhas sem alterar uma palavra, apenas separando as orações "O primeiro é", "O segundo é", "O terceiro é" em ordinal + texto.

### Layout
- Fundo #F5F7FA. Padding vertical padrão.
- Cabeçalho: h2 max-width 18ch, seguido do parágrafo introdutório (Source Sans 3 1.125rem, cor 68%), margin-bottom 3.5rem.
- Ledger: largura total do container, border-top 1px #B8C0CC.
- Cada linha: grid 3fr 9fr, gap clamp(1.5rem,4vw,4rem), padding 2.25rem 0, border-bottom 1px rgba(11,31,58,0.12).
- Coluna esquerda: ordinal em Newsreader 600 clamp(1.75rem,2.6vw,2.5rem), cor #2C4A6E, line-height 1.
- Coluna direita: prosa 1.125rem/1.65, cor 86%, max-width 40rem.
- Fechamento: margin-top 3.5rem, lede Newsreader 500 1.5rem/1.4 marinho, max-width 48rem.

### Animações
- Linhas divisórias: pseudo-elemento ::after de 1px em cada linha, scaleX(0) a 1, 900ms, disparado por IntersectionObserver a 30%, stagger 120ms.
- Conteúdo: fade-up 800ms, delays 0, 100, 200.

### Interatividade
- Hover na linha: ordinal muda de #2C4A6E para #0B1F3A em 200ms. Sem elevação, sem sombra.

### Responsividade
- 960px: grid 1fr; ordinal acima do texto com margin-bottom 0.5rem, tamanho 1.5rem.

---

## Seção 4: Por que os formatos habituais não resolvem

### Arquétipo e Constraints
- Arquétipo: Layered sobre marinho. Prosa em coluna única com o emblema em marca d'água ao fundo e uma frase de fechamento em serifa grande.
- Constraints: color blocking marinho (cor), texto em serifa como elemento gráfico (tipografia), filete desenhado (movimento).
- Justificativa: a seção anterior é clara e tabular; esta muda de temperatura. O marinho concentra a leitura e a frase final ganha peso sem virar manchete.

### Conteúdo
Título: "O problema costuma ser o formato, não o médico."
Parágrafo 1: "Os cursos gravados de marketing médico foram pensados para encher a agenda de consultório e pouco dizem sobre operar um negócio de ensino. As mentorias em grupo entregam a mesma aula para turmas de centenas de pessoas, e o caso individual raramente chega a ser discutido. Agências e gestores de tráfego executam o que lhes é pedido, mas o médico, que nunca foi treinado para ler os números, não sabe o que pedir. E fazer sozinho funciona, embora devagar, porque cada decisão errada leva meses para se revelar e não há com quem discutir o caso."
Fechamento: "Nenhum desses formatos tem o que a formação médica tinha: alguém experiente olhando o caso com frequência e dizendo o que fazer nas próximas duas semanas."

### Layout
- Fundo #0B1F3A, cor de texto #F5F7FA. Padding vertical padrão. position relative, overflow hidden.
- Marca d'água: emblema SVG (o mesmo do hero) em #B8C0CC com opacity 0.08, width 640px, position absolute, right -120px, top 50%, transform translateY(-50%). Sem interação, aria-hidden.
- Conteúdo: grid 5fr 7fr, gap clamp(2rem,6vw,6rem). Coluna esquerda: h2 cor #F5F7FA, max-width 14ch. Coluna direita: parágrafo em Source Sans 3 1.125rem/1.65, cor rgba(245,247,250,0.80), max-width 40rem.
- Fechamento: abaixo do grid, margin-top 3.5rem, largura total do container. Filete de prata 220px x 1.5px acima, margin-bottom 1.5rem. Texto em Newsreader 500 clamp(1.5rem,2.6vw,2.25rem), line-height 1.3, cor #F5F7FA, max-width 34ch.

### Animações
- Filete: mesmo desenho do hero (stroke-dashoffset), disparado por IntersectionObserver a 40%.
- Título e parágrafo: fade-up, delays 0 e 100. Fechamento: fade-up delay 200.

### Interatividade
- Nenhuma.

### Responsividade
- 960px: grid 1fr; marca d'água width 420px, right -160px, bottom -80px, top auto, transform none.
- 640px: marca d'água oculta.

---

## Seção 5: Como o programa funciona

### Arquétipo e Constraints
- Arquétipo: Timeline horizontal com scroll storytelling. O ciclo anamnese, session, conduta, evolução, sala de staff desenhado como uma linha com cinco pontos.
- Constraints: Draw SVG na linha e nos pontos (movimento), estrutura especial timeline (estrutura), hover que destaca o ponto (interação).
- Justificativa: a copy descreve um ciclo com etapas nomeadas. A linha desenhada é a única ilustração da página e traduz "residência aplicada ao negócio" sem ícone.

### Conteúdo
Título: "A estrutura de uma residência aplicada ao negócio."
Parágrafo 1 (acima da linha): "A entrada no programa começa pela anamnese do negócio, um levantamento que o board inteiro lê antes da primeira session: produto, audiência, receita, o que já foi tentado e o que travou. A partir dela, as board sessions acontecem a cada quinze dias, ao vivo e individualmente, conduzidas por um dos quatro mentores em rodízio, de modo que cada mentor acompanha o fellow uma vez a cada dois meses e o vê seis vezes ao longo da cohort."
Pontos da linha, na ordem, com nome e uma linha de descrição extraída da copy:
1. Anamnese. "O board inteiro lê o caso antes da primeira session."
2. Board session. "A cada quinze dias, ao vivo e individual, com um mentor em rodízio."
3. Conduta. "Por escrito, define o que será feito nos quinze dias seguintes."
4. Evolução. "A session seguinte começa pelo que rodou, o que não rodou e o que muda."
5. Sala de staff. "Entre as sessions, um grupo com os quatro mentores."
Parágrafo 2 (abaixo da linha): "Cada session termina com uma conduta por escrito, que define o que será feito nos quinze dias seguintes, e a session seguinte começa pela evolução dessa conduta: o que rodou, o que não rodou e o que muda. Entre as sessions, o fellow tem uma sala de staff, um grupo com os quatro mentores, para que a dúvida de tráfego, de ferramenta, de oferta ou de caixa chegue a quem responde por aquela área."
Parágrafo 3: "O board tem quatro especialidades porque o negócio tem quatro sistemas que dependem uns dos outros: o tráfego não corrige um produto mal definido, um bom produto não vende sem um modelo de conversão, a conversão sem operação transforma o negócio em mais um plantão, e a operação sem gestão não se sustenta ao longo do tempo. Como ninguém domina as quatro áreas sozinho, o programa foi montado para que o fellow não precise dominá-las."

### Layout
- Fundo #F5F7FA. Padding vertical padrão.
- Cabeçalho em grid 4fr 8fr como a apresentação: h2 à esquerda (sticky desligado aqui), parágrafo 1 à direita.
- Timeline: bloco de largura total, margin 4rem 0. Altura 220px no desktop.
  - Linha base: SVG de largura 100%, altura 2px, stroke #B8C0CC 1.5px, y centralizado a 48px do topo do bloco.
  - Cinco pontos distribuídos igualmente (posições 4%, 27%, 50%, 73%, 96% da largura). Cada ponto: círculo de 12px, fill #F5F7FA, stroke #0B1F3A 1.5px. O ponto 2 (Board session) tem fill #0B1F3A, por ser o evento recorrente.
  - Abaixo de cada ponto, a partir de 72px do topo: nome em Newsreader 600 1.25rem cor #0B1F3A; descrição em Source Sans 3 0.9375rem/1.5 cor 68%, largura 10.5rem (9rem abaixo de 1200px). Alinhamento: ponto 1 alinhado à esquerda, ponto 5 alinhado à direita, os demais centralizados.
  - Entre o ponto 4 e o ponto 2, um arco de retorno: path SVG curvo acima da linha (altura 36px), stroke #B8C0CC 1px, dasharray 4 4, com uma ponta de seta simples de 6px no destino. Legenda do arco, centralizada acima dele, Source Sans 3 0.875rem cor 68%: "a cada quinze dias".
- Parágrafos 2 e 3: abaixo da timeline, em coluna deslocada (grid 4fr 8fr, coluna esquerda vazia), max-width 40rem, gap 1.5rem.

### Animações
- Linha base: stroke-dashoffset do comprimento total a 0 em 1600ms cubic-bezier(0.2,0.7,0.2,1) ao entrar a 30%.
- Pontos: scale(0) a scale(1) com transform-origin center, 400ms ease-out, delays 300, 600, 900, 1200, 1500ms (acompanham a linha).
- Nomes e descrições: fade-up 600ms com os mesmos delays + 150ms.
- Arco de retorno: desenha depois de todos os pontos, delay 1900ms, 900ms.

### Interatividade
- Hover sobre o conjunto ponto + texto: o círculo ganha fill #0B1F3A e o nome muda para #2C4A6E em 200ms. Ponto 2 no hover ganha stroke #B8C0CC.

### Responsividade
- 960px: timeline vira vertical. Linha base à esquerda (x = 6px), 2px de largura, altura automática; pontos empilhados com gap 2rem; textos à direita do ponto, padding-left 2rem; arco de retorno oculto, legenda "a cada quinze dias" vira texto abaixo do ponto 4 em 0.875rem.
- Cabeçalho e parágrafos em uma coluna.

---

## Seção 6: O que o fellow recebe

### Arquétipo e Constraints
- Arquétipo: Bento Box assimétrico. Sete células de tamanhos diferentes, a das board sessions maior.
- Constraints: numerais grandes em serifa (tipografia), fundo secundário #E8ECF2 em vez de bordas (cor), stagger reveal (movimento).
- Justificativa: a lista tem sete entregas com pesos diferentes. O bento comunica hierarquia sem ícones e quebra a sequência de seções em coluna.

### Conteúdo
Título: "Doze meses de acompanhamento."
Introdução: "Ao longo da cohort, o fellow recebe:"
Células (título em Newsreader, descrição em Source Sans 3):
1. "Anamnese do negócio" / "Na entrada, lida pelo board inteiro antes da primeira session."
2. "24 board sessions" / "Individuais e ao vivo, uma a cada quinze dias, ao longo de doze meses."
3. "Conduta escrita" / "Ao fim de cada session, com os quinze dias seguintes definidos."
4. "Sala de staff" / "Com os quatro mentores, durante toda a cohort."
5. "Seis tracks" / "Percorridos na ordem em que o negócio precisa deles."
6. "Quatro indicadores" / "A evolução acompanhada pelos mesmos números em cada session."
7. "Certificado de fellow" / "Ao concluir, com entrada no corpo de fellows do programa."
CTA abaixo do bento: botão escuro "Aplicar para a cohort 01".

Nota: os títulos das células são os nomes das entregas tal como aparecem na copy; as descrições reaproveitam as orações da lista da copy.

### Layout
- Fundo #F5F7FA. Padding vertical padrão.
- Cabeçalho: h2 + introdução (1.125rem, cor 68%), margin-bottom 3rem.
- Grid: 12 colunas, gap 1rem, grid-auto-rows minmax(180px, auto).
  - Célula 2 (sessions): grid-column span 6, grid-row span 2. Fundo #0B1F3A, texto #F5F7FA. O número "24" em Newsreader 600 clamp(4rem,8vw,7rem), line-height 0.9, cor #F5F7FA; abaixo, "board sessions" em Newsreader 500 1.5rem; descrição em rgba(245,247,250,0.72) 1rem.
  - Célula 1 (anamnese): span 3. Fundo #E8ECF2.
  - Célula 3 (conduta): span 3. Fundo #E8ECF2.
  - Célula 4 (sala de staff): span 6. Fundo #E8ECF2.
  - Célula 5 (tracks): span 6. Fundo #E8ECF2. O número "6" em Newsreader 600 3rem antes do título.
  - Célula 6 (indicadores): span 6. Fundo #E8ECF2. O número "4" em Newsreader 600 3rem.
  - Célula 7 (certificado): span 12, altura mínima 120px, fundo transparente com border-top e border-bottom 1px #B8C0CC, conteúdo em linha (título à esquerda, descrição à direita).
- Célula padrão: padding 1.75rem; título Newsreader 600 1.375rem cor #0B1F3A, margin-bottom 0.5rem; descrição Source Sans 3 1rem/1.5 cor 68%. Sem border-radius. Sem sombra.
- CTA: margin-top 3rem, alinhado à esquerda.

### Animações
- Células: fade-up 700ms, delays 0, 80, 160, 240, 320, 320, 400 na ordem visual.
- Número 24: contador de 0 a 24 em 1200ms quando a célula entra a 40%.

### Interatividade
- Hover em célula clara: fundo passa de #E8ECF2 para #DFE5EE em 200ms. Hover na célula escura: nada.

### Responsividade
- 960px: grid 6 colunas; célula 2 span 6 row 1; anamnese, conduta, tracks e indicadores span 3; sala de staff e certificado span 6.
- 640px: grid 1 coluna, todas span 1, célula 2 altura mínima 220px.

---

## Seção 7: Os seis tracks

### Arquétipo e Constraints
- Arquétipo: Tabela editorial de ementa (Modular), como o quadro de disciplinas de uma pós.
- Constraints: numerais 01 a 06 em serifa (tipografia), barra de ciclos como diagrama de linha (estrutura), hover de linha (interação).
- Justificativa: a ementa é sequencial e o texto diz que os tracks são percorridos "na ordem". A tabela é o formato natural de uma instituição de ensino.

### Conteúdo
Título: "A ementa, na ordem em que o negócio precisa dela."
Linhas (numeral, nome, descrição extraída da copy):
01. Produto e oferta. "Concepção do produto educacional, promessa, formato, precificação e a oferta que sustenta o ticket."
02. Aquisição. "Tráfego pago, criativos e a presença no Instagram, no TikTok e no YouTube, isto é, como a audiência certa chega até o produto."
03. Conversão. "Lançamento clássico, perpétuo, lançamento pago e venda ativa, e qual conduta cabe em cada produto."
04. Operação. "Inteligência artificial, automações, plataformas e delegação, para que o negócio rode sem depender da agenda do médico."
05. Gestão. "Financeiro e os indicadores que o board acompanha em cada session."
06. Liderança. "Decisão sob incerteza, delegação de funções e a transição de quem executa para quem comanda."
Parágrafo de fechamento: "A cohort percorre os tracks em seis ciclos de dois meses, e cada ciclo se encerra com gestão: caixa, margem e os quatro indicadores do negócio. O primeiro semestre constrói o negócio, e o segundo o amplia e retira o médico da operação."
Diagrama de ciclos: seis segmentos rotulados "Ciclo 1" a "Ciclo 6", com a divisão "Primeiro semestre" e "Segundo semestre" acima.

### Layout
- Fundo #F5F7FA. Padding vertical padrão.
- Grid 4fr 8fr. Esquerda: h2 sticky top 2.5rem, max-width 14ch. Direita: tabela + fechamento + diagrama.
- Tabela: largura total, border-top 2px #0B1F3A.
  - Linha: grid 4rem 1fr, gap 1.5rem, padding 1.5rem 0, border-bottom 1px rgba(11,31,58,0.12), align-items baseline.
  - Numeral: Newsreader 600 1.5rem cor #2C4A6E, tabular-nums.
  - Nome: Newsreader 600 clamp(1.375rem,2vw,1.75rem) cor #0B1F3A, margin-bottom 0.35rem.
  - Descrição: Source Sans 3 1.0625rem/1.55 cor 86%, max-width 36rem.
- Fechamento: margin-top 2.5rem, prosa 1.125rem/1.65, max-width 40rem.
- Diagrama: margin-top 2rem. Duas linhas de rótulos acima ("Primeiro semestre" ocupando 50%, "Segundo semestre" 50%, Source Sans 3 0.9375rem cor 68%, com border-bottom 1px #B8C0CC). Abaixo, seis células iguais (grid 6 colunas, gap 4px), altura 44px, fundo #E8ECF2, texto "Ciclo 1" a "Ciclo 6" centralizado em Source Sans 3 0.9375rem cor #0B1F3A. A última quinzena de cada ciclo é marcada por uma faixa de 6px à direita da célula em #0B1F3A, com legenda abaixo do diagrama: "A faixa escura marca a session de gestão que fecha cada ciclo." (0.875rem, cor 68%).

### Animações
- Linhas da tabela: fade-up 600ms, stagger 70ms.
- Células do diagrama: scaleX(0) a 1 com transform-origin left, 500ms, stagger 90ms, ao entrar a 40%.

### Interatividade
- Hover na linha da tabela: numeral passa de #2C4A6E para #0B1F3A e a linha ganha fundo #E8ECF2 com padding lateral 0.75rem (transição 200ms em background e padding). Sem elevação.

### Responsividade
- 960px: uma coluna, sticky desligado. Linha da tabela grid 3rem 1fr.
- 640px: diagrama com rótulos de semestre em duas linhas; células mostram só o número "1" a "6".

---

## Seção 8: O board

### Arquétipo e Constraints
- Arquétipo: Broken Grid 2x2 com deslocamento vertical. Retratos em duotone marinho, cada mentor numa célula grande, com a segunda coluna deslocada 4rem para baixo.
- Constraints: duotone marinho nas fotos (mídia), deslocamento assimétrico (layout), hover que remove o duotone (interação).
- Justificativa: quatro mentores pedem quatro retratos, e o grid 2x2 deslocado evita a fileira de cards. O duotone unifica fotos de origens diferentes na paleta da marca.

### Conteúdo
Título: "Quatro mentores, quatro áreas do negócio."
Introdução: "O board é formado por quatro pessoas que constroem e operam negócios de educação médica, cada uma responsável por uma parte do sistema."
Mentores, na ordem Victor, Buzzi, Fabrissio, Vinícius, com nome, área e texto exatamente como em copy.md (credenciais em placeholder até serem preenchidas).
Fechamento: "O fellow vê cada mentor a cada dois meses e fala com os quatro na sala de staff ao longo de toda a cohort."

### Layout
- Fundo #0B1F3A, texto #F5F7FA. Padding vertical padrão. id="board".
- Cabeçalho: h2 cor #F5F7FA + introdução em rgba(245,247,250,0.80) 1.125rem, max-width 40rem, margin-bottom 4rem.
- Grid: 2 colunas, column-gap clamp(2rem,5vw,5rem), row-gap 4rem. Segunda coluna com transform translateY(4rem) no desktop (aplicado no wrapper da coluna, não nas células, para o grid não saltar).
- Célula do mentor: grid interno 5fr 7fr, gap 1.5rem, align-items start.
  - Retrato: aspect-ratio 4/5, imagem via Netlify CDN (/.netlify/images?url=/images/board/[nome].jpg&w=640&q=80), width e height numéricos (640 x 800), loading lazy. Tratamento duotone: filter grayscale(1) contrast(1.05); sobre a imagem, um overlay em #0B1F3A com mix-blend-mode multiply e opacity 0.55; sobre este, um segundo overlay em #B8C0CC com mix-blend-mode screen e opacity 0.18. Enquanto não houver foto, um placeholder com fundo #10233F e o emblema em prata a 20% centralizado.
  - Texto: nome em Newsreader 600 clamp(1.5rem,2.2vw,1.875rem); área em Source Sans 3 600 1rem cor #B8C0CC, margin 0.25rem 0 1rem; texto em rgba(245,247,250,0.80) 1rem/1.6.
- Fechamento: margin-top 5rem (6rem por causa do deslocamento), filete 220px de prata acima, texto Newsreader 500 1.375rem cor #F5F7FA, max-width 40ch.

### Animações
- Células: fade-up 800ms, delays 0, 120, 240, 360.
- Retratos: o overlay marinho começa com opacity 0.85 e vai a 0.55 em 900ms quando a célula entra a 40% (a foto "acorda").

### Interatividade
- Hover no retrato: grayscale(0), overlay marinho opacity 0.25, transição 400ms. O nome não muda.

### Responsividade
- 960px: segunda coluna sem deslocamento, uma coluna, células com grid interno 5fr 7fr mantido.
- 640px: célula em coluna única, retrato com aspect-ratio 4/3 e max-width 100%.

---

## Seção 9: Critérios de entrada

### Arquétipo e Constraints
- Arquétipo: Split Vertical 50/50 com fundos diferentes.
- Constraints: color blocking em dois tons claros (cor), coluna direita com fundo #E8ECF2 (layout), sem movimento além do fade.
- Justificativa: a copy tem dois parágrafos com sentidos opostos (é para, não é para). A divisão vertical espelha isso sem ícones de certo e errado.

### Conteúdo
Título (largura total, acima das colunas): "Para quem é, e para quem não é."
Coluna esquerda, subtítulo "É para médicos que": parágrafo 1 da copy (a partir de "têm o que ensinar..." mantendo o texto integral: "O programa é para médicos que têm o que ensinar, seja uma especialidade, uma técnica, um preparatório ou uma visão de carreira, e que estejam em qualquer um dos três momentos descritos acima: já vendendo e querendo crescer sem depender da própria agenda, com audiência e sem produto, ou começando do zero com a intenção de errar menos. É preciso conseguir reservar uma session a cada quinze dias e executar a conduta entre elas.").
Coluna direita, subtítulo "Não é um programa para quem": parágrafo 2 da copy ("Não é um programa para quem procura conteúdo gravado para assistir quando der, para quem espera que alguém opere o negócio no seu lugar, nem para quem busca promessa de faturamento com prazo, porque o board não faz esse tipo de promessa.").

Nota: os subtítulos das colunas são apoio de leitura; o parágrafo abaixo de cada um é o texto integral da copy, sem cortes.

### Layout
- Fundo #F5F7FA. Padding vertical padrão.
- h2 margin-bottom 3rem.
- Grid 1fr 1fr, gap 0. Coluna esquerda: padding 2.5rem 3rem 2.5rem 0, border-right 1px #B8C0CC. Coluna direita: padding 2.5rem 3rem, fundo #E8ECF2.
- Subtítulo: Newsreader 600 1.375rem cor #0B1F3A, margin-bottom 1rem.
- Parágrafo: 1.125rem/1.65 cor 86%.

### Animações
- Colunas: fade-up 700ms, delays 0 e 120.

### Interatividade
- Nenhuma.

### Responsividade
- 960px: uma coluna; coluna esquerda sem border-right e com padding-right 0, border-bottom 1px #B8C0CC, margin-bottom 0; coluna direita padding 2rem 1.5rem.

---

## Seção 10: A experiência de quem conduz

### Arquétipo e Constraints
- Arquétipo: Type Hero de números. Quatro números grandes em serifa, alinhados numa linha com divisores.
- Constraints: numerais acima de 96px (tipografia), contadores (movimento), color blocking marinho (cor).
- Justificativa: a única prova disponível da cohort 01 é o histórico do board. Números grandes em serifa lidos como um balanço institucional.

### Conteúdo
Título: "A experiência de quem conduz."
Introdução: "Os quatro mentores operam, hoje, negócios de educação médica, e os números abaixo são deles."
Números (placeholders até preenchimento):
- "[N]" / "alunos formados em negócios educacionais médicos conduzidos pelo board"
- "R$ [X]" / "em faturamento gerado em educação médica"
- "[N]" / "lançamentos conduzidos"
- "[N]" / "anos operando educação médica"
Nota interna: enquanto os números não existirem, a seção fica oculta no build (atributo hidden no section) e a ordem das demais seções não muda. Não publicar com placeholders visíveis. Se houver [INSERIR CASO REAL], ele entra abaixo dos números como um parágrafo em Newsreader 500 1.375rem com nome e especialidade em Source Sans 3 0.9375rem cor #B8C0CC.

### Layout
- Fundo #0B1F3A, texto #F5F7FA. Padding vertical padrão.
- Cabeçalho: h2 + introdução (rgba 0.80), margin-bottom 3.5rem.
- Números: grid 4 colunas, gap 0; cada célula com padding 0 2rem 0 0 e border-left 1px rgba(184,192,204,0.25) (a primeira sem border-left, com padding-left 0; as demais padding-left 2rem).
  - Número: Newsreader 600 clamp(3.5rem,7vw,6.5rem), line-height 0.95, cor #F5F7FA, tabular-nums.
  - Legenda: Source Sans 3 1rem/1.5 cor rgba(245,247,250,0.72), margin-top 0.75rem, max-width 16rem.

### Animações
- Contadores: de 0 ao valor, 1400ms ease-out, disparados uma vez a 40%. Prefixo "R$" e sufixos ficam estáticos.
- Legendas: fade-up 600ms, delays 100, 200, 300, 400.

### Interatividade
- Nenhuma.

### Responsividade
- 960px: grid 2 colunas, row-gap 2.5rem; border-left só nas células pares.
- 640px: uma coluna, sem borders, com border-top 1px rgba(184,192,204,0.25) entre células e padding 1.5rem 0.

---

## Seção 11: Processo de aplicação

### Arquétipo e Constraints
- Arquétipo: Progressive Reveal em três etapas verticais, com uma linha que se desenha ligando os três números.
- Constraints: Draw SVG (movimento), sticky do título (layout), numerais em serifa (tipografia).
- Justificativa: a copy descreve três etapas em ordem; a linha vertical desenhada conduz o olho até o botão.

### Conteúdo
Título: "A entrada é por aplicação."
Etapas (numeral em Newsreader, nome e texto extraídos da copy):
1. "Formulário de aplicação" / "Leva cerca de três minutos e pergunta quem você é, o que ensina e onde o negócio está."
2. "Conversa com um mentor do board" / "Um mentor entra em contato pelo WhatsApp em até [X] horas para discutir o seu caso, e é nessa conversa que o investimento é apresentado."
3. "Entrada na cohort" / "Quando o board entende que o negócio evolui em doze meses, você recebe a anamnese, entra na sala de staff e marca a primeira session."
Fechamento: "Como o programa é individual e o board tem quatro pessoas, cada cohort é pequena por definição, e a aplicação existe para que o board só assuma casos em que acredita."
CTA: botão escuro "Aplicar para a cohort 01". id="aplicar" nesta seção (âncora dos CTAs até a página /aplicar/ existir).

### Layout
- Fundo #F5F7FA. Padding vertical padrão.
- Grid 4fr 8fr. Esquerda: h2 sticky top 2.5rem. Direita: etapas + fechamento + CTA.
- Etapas: lista vertical, position relative. Linha vertical: SVG absoluto à esquerda (x = 1.25rem), de cima da etapa 1 até o centro da etapa 3, stroke #B8C0CC 1.5px.
  - Etapa: grid 2.5rem 1fr, gap 2rem, padding-bottom 2.5rem.
  - Numeral: círculo 2.5rem, border 1.5px #0B1F3A, fundo #F5F7FA, Newsreader 600 1.125rem cor #0B1F3A centralizado; z-index acima da linha.
  - Nome: Newsreader 600 1.375rem cor #0B1F3A, margin-bottom 0.35rem. Texto: 1.0625rem/1.6 cor 86%, max-width 36rem.
- Fechamento: margin-top 1rem, 1.125rem/1.65, max-width 40rem.
- CTA: margin-top 2.5rem.

### Animações
- Linha vertical: stroke-dashoffset total a 0, 1400ms, ao entrar a 30%.
- Círculos: fundo passa de #F5F7FA a #0B1F3A e número a #F5F7FA conforme a linha chega (delays 200, 700, 1200ms), 300ms.
- Textos: fade-up com os mesmos delays.

### Interatividade
- Hover no botão conforme .btn--dark.

### Responsividade
- 960px: uma coluna, sticky desligado. Linha e numerais mantidos.

---

## Seção 12: Perguntas frequentes

### Arquétipo e Constraints
- Arquétipo: Índice editorial em duas colunas, todas as respostas visíveis. Sem accordion.
- Constraints: índice sticky com âncoras (interação), linhas divisórias (estrutura), densidade balanceada.
- Justificativa: uma instituição responde às perguntas na íntegra; esconder respostas atrás de cliques é comportamento de página de vendas.

### Conteúdo
Título: "Perguntas frequentes."
As dez perguntas e respostas de copy.md, na mesma ordem e com o texto integral.

### Layout
- Fundo #F5F7FA. Padding vertical padrão.
- Grid 4fr 8fr. Esquerda: h2 e, abaixo dele (margin-top 2rem), o índice: lista das dez perguntas em Source Sans 3 0.9375rem cor 68%, gap 0.5rem, cada uma link para a âncora da resposta; a pergunta ativa (mais próxima do topo da viewport) muda para cor #0B1F3A e ganha um filete de 1.5rem #B8C0CC à esquerda (transição 200ms). Bloco sticky top 2.5rem.
- Direita: lista de pares. Cada par: padding 1.75rem 0, border-bottom 1px rgba(11,31,58,0.12). Pergunta em Newsreader 600 1.375rem cor #0B1F3A, margin-bottom 0.6rem. Resposta em 1.0625rem/1.6 cor 86%, max-width 38rem. Primeiro par com border-top 2px #0B1F3A.

### Animações
- Pares: fade-up 600ms, stagger 60ms, máximo 300ms.

### Interatividade
- Índice: scroll suave até a âncora; IntersectionObserver marca a pergunta ativa (rootMargin -40% 0px -55% 0px).
- Hover no item do índice: cor #0B1F3A.

### Responsividade
- 960px: índice oculto; só a lista de pares em coluna única.

---

## Seção 13: Seção final

### Arquétipo e Constraints
- Arquétipo: Spotlight em marinho, com a mesma malha em perspectiva do hero ao fundo e o CTA à esquerda.
- Constraints: malha em perspectiva (mídia), color blocking (cor), filete desenhado (movimento).
- Justificativa: fecha a página como abriu, em marinho, sem novo argumento; só a decisão.

### Conteúdo
Título: "A cohort 01 está com aplicações abertas."
Parágrafo: "Se você tem o que ensinar e prefere construir o negócio disso com supervisão, e não por tentativa e erro, a aplicação é o primeiro passo. Um mentor do board conversa com você antes de qualquer decisão, sem checkout e sem compromisso até essa conversa. A cohort 01 começa em [data], e como as sessions são individuais, o board assume poucos casos por vez."
CTA: botão claro "Aplicar para a cohort 01".

### Layout
- Fundo #0B1F3A, texto #F5F7FA. Padding vertical clamp(5rem,12vw,9rem). Sem divisória com a seção anterior além da mudança de fundo.
- Mesmas camadas de fundo do hero: gradiente de profundidade, canvas com data-field (o field.js aceita várias seções), véu horizontal. Grid 7fr 5fr como o hero. Esquerda: h2 cor #F5F7FA max-width 16ch; filete de prata 220px margin 1.75rem 0; parágrafo rgba 0.80 1.125rem/1.6 max-width 34rem; botão margin-top 2.25rem. Direita vazia.

### Animações
- Filete: desenho ao entrar a 40%. Título e parágrafo: fade-up 0 e 100.

### Responsividade
- 960px: uma coluna, véu vertical como no hero. 640px: botão largura total.

---

## Seção 14: Rodapé

### Arquétipo e Constraints
- Arquétipo: Minimal.
- Constraints: linha de prata (estrutura).

### Conteúdo
Esquerda: emblema pequeno + "Fellowship Digital". Centro: "Subespecialização em negócios digitais para médicos." Direita: links "Instagram" ([@fellowshipdigital]) e "Aplicar". Linha inferior: "© [ano] Fellowship Digital." e "Política de privacidade" ([link]).

### Layout
- Fundo #0B1F3A, cor rgba(245,247,250,0.6), 0.875rem. Border-top 1px rgba(184,192,204,0.25). Padding 2.5rem 0 2rem.
- Linha superior: flex, space-between, wrap, gap 1.5rem. Linha inferior: margin-top 1.5rem, flex, space-between, 0.8125rem.

### Responsividade
- 640px: tudo em coluna, alinhado à esquerda, gap 0.75rem.

---

## Página /aplicar/ (formulário, uma pergunta por tela)

Página separada em /aplicar/index.html, mesma identidade. Não faz parte da rolagem da página principal.

### Arquétipo e Constraints
- Arquétipo: Single Focus. Uma pergunta por tela, centrada verticalmente, largura máxima 40rem, alinhada à esquerda.
- Constraints: transições de tela por translateY (movimento), barra de progresso fina (estrutura), navegação por teclado (interação).

### Conteúdo
Telas, opções, ramificações e encerramentos exatamente como em copy.md, seção "Formulário de aplicação".

### Layout
- Fundo #F5F7FA. Topbar reduzida: emblema + "Fellowship Digital" à esquerda, "Aplicação para a cohort 01" à direita em Source Sans 3 0.9375rem cor 68%.
- Barra de progresso: 2px, largura da tela, abaixo da topbar; trilho rgba(11,31,58,0.12), preenchimento #0B1F3A, transição width 400ms.
- Tela: min-height calc(100vh - 80px), display grid, align-content center, padding 2rem var(--container-px). Conteúdo max-width 40rem.
  - Número da pergunta: Source Sans 3 0.9375rem cor 68% ("Pergunta 3 de 11").
  - Pergunta: Newsreader 600 clamp(1.75rem,3vw,2.5rem), line-height 1.15, cor #0B1F3A, margin 0.75rem 0 1.5rem.
  - Texto de apoio: 1rem cor 68%, margin-bottom 1.25rem.
  - Campo de texto: sem borda lateral, border-bottom 1.5px #0B1F3A, fundo transparente, padding 0.75rem 0, Source Sans 3 1.25rem; focus: border-bottom 2px, sem outline extra. Telefone com intl-tel-input, mesmo estilo.
  - Opções: lista vertical, gap 0.75rem. Cada opção: border 1px rgba(11,31,58,0.24), padding 1rem 1.25rem, fundo #FFFFFF, Source Sans 3 1.0625rem, min-height 3.25rem. Hover: border #0B1F3A. Selecionada: fundo #0B1F3A, texto #F5F7FA. Foco via teclado: outline #B8C0CC.
  - Navegação: linha com botão "Continuar" (.btn--dark) à esquerda e link "Voltar" (Source Sans 3 0.9375rem cor 68%) ao lado. Enter avança; Escape volta. Na última tela o botão é "Enviar aplicação".
- Telas de encerramento A e B e página de obrigado: mesma composição, sem barra de progresso, com o texto da copy e um link "Voltar ao início" para /pagina-aplicacao/.
- Envio: Netlify Forms (form name "aplicacao", honeypot, todos os campos como inputs escondidos consolidados na última tela), redirecionamento para /obrigado/ com os parâmetros da URL preservados, conforme script.js do framework.

### Animações
- Troca de tela: a tela atual sai com opacity 1 a 0 e translateY(0) a -16px em 250ms; a próxima entra com opacity 0 a 1 e translateY(16px) a 0 em 350ms, delay 150ms. prefers-reduced-motion: troca instantânea.

### Responsividade
- 640px: pergunta clamp(1.5rem,7vw,1.875rem); botão "Continuar" largura total, "Voltar" abaixo dele.

---

## Ordem final da página principal

1. Topbar + Hero
2. Apresentação
3. Para quem o programa foi desenhado
4. Por que os formatos habituais não resolvem
5. Como o programa funciona
6. O que o fellow recebe
7. Os seis tracks
8. O board
9. Critérios de entrada
10. A experiência de quem conduz (oculta até os números existirem)
11. Processo de aplicação (id="aplicar")
12. Perguntas frequentes
13. Seção final
14. Rodapé

Alternância de fundo: marinho, branco, branco, marinho, branco, branco, branco, marinho, branco, marinho, branco, branco, marinho, marinho. Duas seções claras seguidas se diferenciam pelo arquétipo (ledger, bento, tabela) e pelo uso de #E8ECF2.

## Regras de implementação (do framework)

- Imagens sempre via /.netlify/images?url=/images/...&w=...&q=80, com width e height numéricos; hero sem imagem; demais com loading lazy.
- Caminhos absolutos começando com /.
- AOS só fora do hero, com disableMutationObserver true. Hero sem opacity 0 inicial e sem transform inicial.
- Fontes: Newsreader 500 e 600, Source Sans 3 400 e 600. Nada além disso.
- Nenhum script pesado. Contadores, linhas desenhadas e índice ativo em JavaScript puro com IntersectionObserver, dentro de script.js da página.
- Sem emoji, sem ícones ilustrativos, sem caixa alta decorativa, sem border-radius, sem sombras além do necessário em foco.
