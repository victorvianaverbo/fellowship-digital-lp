# Layout - Fellowship Digital | lp-v2

> Especificação completa para o `/desenvolver`. Fonte do texto: `lp-v2/copy.md`. Design aprovado: `lp-v2/index.html` + `style.css` (hero e seção 01), 16/09/2026.
> Pasta: `framework-v20/lp-v2/`. A página na raiz do site não é tocada.
> Nenhum texto desta especificação substitui a copy. Onde a copy e o Brand Guide divergem (ex.: "subespecialização", "residência"), vale a copy.

---

## 0. Sistema visual (vale para a página inteira)

### 0.1 Tokens (já existem em `style.css`, manter os nomes)

| Token | Valor | Uso |
|---|---|---|
| `--grafite` | `#2A2A2A` | Texto, símbolo, botão primário, fundos escuros |
| `--grafite-escuro` | `#1C1C1C` | Hover do botão primário, fundo do rodapé |
| `--osso` | `#E9E2D3` | Fundo principal (62% da página) |
| `--linho` | `#F7F3EA` | Cards e superfícies elevadas (20%) |
| `--ardosia` | `#4F6D8F` | Destaque. **Um elemento por tela.** Nunca fundo de botão |
| `--linha` | `rgba(42,42,42,0.15)` | Linhas estruturais |
| `--linha-faq` | `rgba(42,42,42,0.18)` | Hairlines da lista de perguntas |
| `--grade` | `rgba(42,42,42,0.11)` | Grade do Horizonte |
| `--texto-suave` | `rgba(42,42,42,0.68)` | Texto secundário |
| `--texto-rotulo` | `rgba(42,42,42,0.60)` | Rótulos |

Tokens novos a acrescentar:

| Token | Valor | Uso |
|---|---|---|
| `--osso-80` | `rgba(233,226,211,0.80)` | Texto sobre grafite |
| `--osso-60` | `rgba(233,226,211,0.60)` | Rótulos sobre grafite |
| `--osso-14` | `rgba(233,226,211,0.14)` | Linhas sobre grafite |
| `--osso-08` | `rgba(233,226,211,0.08)` | Grade e quadrantes vazios sobre grafite |
| `--vazio` | `rgba(42,42,42,0.08)` | Quadrante vazio sobre osso/linho |
| `--linho-hover` | `#FBF8F1` | Hover de card linho |
| `--barra-h` | `64px` | Altura da barra fixa (seção 0.6) |
| `--ease` | `cubic-bezier(0.22, 0.7, 0.2, 1)` | Easing padrão de entrada |
| `--ease-io` | `cubic-bezier(0.45, 0, 0.2, 1)` | Desenho de linhas e transições longas |

### 0.2 Tipografia (não muda em nenhuma seção)

- **Libre Caslon Text**, só 400 regular e 400 itálico. Nunca negrito. O itálico marca a segunda metade de um título ou uma palavra-chave.
- **Geologica**: 300 no corpo, 400 em interface e rótulos, 500 em botões. Nunca acima de 500.

| Estilo | Fonte | Tamanho | Line-height | Letter-spacing |
|---|---|---|---|---|
| Display (h1) | Caslon 400 | `clamp(2.75rem, 1.5rem + 3.7vw, 4.625rem)` | 1.06 | -0.012em |
| Título de seção (h2) | Caslon 400 | `clamp(2.25rem, 1.3rem + 3vw, 3.75rem)` | 1.06 | -0.01em |
| Poster (h2 especial) | Caslon 400 | `clamp(3rem, 1rem + 7vw, 7.5rem)` | 0.98 | -0.02em |
| Número gigante | Caslon 400 | `clamp(5rem, 2rem + 12vw, 13rem)` | 0.9 | -0.03em |
| Lede | Caslon 400 | `clamp(1.25rem, 1.1rem + 0.5vw, 1.4375rem)` | 1.45 | 0 |
| Título de item (h3) | Caslon 400 | `clamp(1.375rem, 1.2rem + 0.6vw, 1.75rem)` | 1.15 | 0 |
| Corpo | Geologica 300 | `clamp(1rem, 0.95rem + 0.2vw, 1.0625rem)` | 1.65 | 0 |
| Corpo pequeno | Geologica 300 | `0.9375rem` | 1.6 | 0 |
| Rótulo | Geologica 400 | `0.75rem` (0.6875rem em legendas) | 1.4 | 0.24em, caixa alta |
| Botão | Geologica 500 | `0.8125rem` | 1 | 0.06em, caixa alta |

### 0.3 Grade e espaçamento

- Container: `max-width: 1280px`, `padding-inline: clamp(1.25rem, 5vw, 4.5rem)`.
- Grade de 12 colunas, `column-gap: 1.5rem`, `grid-template-columns: repeat(12, minmax(0,1fr))`.
- Padding vertical padrão das seções: `--secao-py: clamp(5rem, 11vw, 9rem)`.
- Breakpoints: **1200px** (ajustes finos), **1024px** (tablet), **760px** (mobile), **420px** (mobile estreito).
- Cantos retos em tudo. `border-radius: 0`, exceto nos nós de 5px da linha de conduta, que são círculos. Sem `box-shadow` em nenhum elemento.

### 0.4 Cabeçalho de seção (padrão reutilizado)

Estrutura: `<div class="secao__cab"><span class="secao__num">NN</span><span class="secao__nome">Nome</span></div>`. Já existe no CSS.

- Flex, `align-items: baseline`, `gap: 1rem`, `padding-bottom: 0.9rem`, `border-bottom: 1px solid var(--grafite)`. Sobre grafite, a borda usa `var(--osso-80)`.
- `.secao__num` usa ardósia **só quando a seção não tem outro elemento em ardósia**. Se tiver, recebe a classe `.secao__num--neutro`, com cor `var(--texto-rotulo)` (ou `var(--osso-60)` sobre grafite). Cada seção abaixo diz qual variação usar.
- Numeração: 01 O programa · 02 Para quem · 03 Os formatos · 04 Como funciona · 05 O que o fellow recebe · 06 A ementa · 07 O board · 08 Critérios · 09 Experiência · 10 Aplicação · 11 Perguntas. O hero e o final não são numerados.

### 0.5 Regra da ardósia por tela

Cada seção declara seu único elemento em ardósia no item "Cores". Quando duas seções aparecem juntas no viewport, o que prevalece é a seção com mais área visível. Não precisa de lógica em JS: basta respeitar a regra por seção.

### 0.6 Barra fixa (novo)

- `<header class="barra" data-barra>`: `position: fixed; inset: 0 0 auto 0; height: var(--barra-h); z-index: 50`.
- Fundo `rgba(233,226,211,0.92)` com `backdrop-filter: saturate(1.1) blur(10px)`. Borda inferior `1px solid var(--linha)`.
- Conteúdo em container de 1280px, flex com `justify-content: space-between` e `align-items: center`.
  - **Esquerda:** assinatura pequena. Símbolo de 28px, nome em Caslon 1rem, `gap: 10px`.
  - **Centro (desktop ≥1024px):** indicador da seção atual. Rótulo Geologica 400 0.6875rem, +0.24em, caixa alta, cor `--texto-rotulo`, no formato `02 · Para quem`.
    - Troca de texto: o valor antigo sobe e some em `translateY(-8px)` + `opacity 0`, 250ms; o novo entra de `translateY(8px)`, 250ms, `--ease`.
    - A fonte é o `data-secao="02 · Para quem"` de cada `<section>`, lido por IntersectionObserver com `rootMargin: -45% 0px -50% 0px`.
  - **Direita:** botão `btn btn--primario btn--sm` "Aplicar", com `href="/aplicar/"`.
- Progresso de leitura: `<span class="barra__progresso">` absoluto em `bottom: -1px`, `height: 1px`, fundo `var(--grafite)`, `transform-origin: left`, `transform: scaleX(var(--p))`.
  - `--p` vem do scroll: `scrollY / (docHeight - innerHeight)`, atualizado em `requestAnimationFrame`.
  - Com suporte a `animation-timeline: scroll(root)`, usar CSS puro: `@keyframes progresso { from { transform: scaleX(0) } to { transform: scaleX(1) } }` com `animation-timeline: scroll(root)`. A versão em JS é o fallback.
- Visibilidade:
  - Começa com `transform: translateY(-100%)`. Ganha `is-visivel` (`translateY(0)`, 400ms `--ease`) quando o hero sai 70% do viewport.
  - Ao rolar para baixo mais de 12px de uma vez, esconde de novo. Ao rolar para cima, reaparece.
  - Nunca esconde nas seções 10 e 11 (aplicação e perguntas).
- A topbar do hero continua como está: não é fixa e rola junto com o hero.
- Mobile (<760px): altura 56px, só a assinatura e o botão. O nome some abaixo de 420px, fica só o símbolo.

### 0.7 Símbolo (componente reutilizado)

SVG `viewBox="0 0 40 40"` com quatro `<rect>` de 12x12 em (14,0) (0,14) (28,14) (14,28), sem contorno e sem raio. O quadrante em ardósia muda conforme o uso, e cada seção diz qual. Classe base `.simbolo`. Os modificadores `.simbolo--osso`, para uso sobre grafite, trocam o fill dos quadrantes grafite por `var(--osso)`.

### 0.8 Movimento

- **Reveal padrão:** classe `.revela` (já existe). `opacity 0` + `translateY(18px)` passam a `opacity 1` + `none`, 900ms `--ease`. O IntersectionObserver usa `rootMargin: 0px 0px -12% 0px` e `threshold 0.1`. O atraso escalonado vem de `--atraso` (70ms por item, até 6 itens).
- **Clip reveal:** classe nova `.revela-clip`. `clip-path: inset(0 0 100% 0)` passa a `inset(0 0 0 0)`, 1100ms `--ease-io`. Aplica em fotos e cards.
- **Draw SVG:** linhas desenhadas por `clip-path: inset(-4px 100% -4px 0)` indo a `inset(-4px 0 -4px 0)`. Não usar `stroke-dasharray` com `vector-effect: non-scaling-stroke`. Duração indicada por seção.
- **`prefers-reduced-motion: reduce`:** tudo aparece no estado final, sem transição. Seções fixadas (04 e 06) viram layout estático. O rodízio do hero para com o quadrante ardósia na direita. A grade do Horizonte fica parada.

---

## Seção 1: Hero

### Arquétipo e Constraints
- Arquétipo: **Split Assimétrico** (texto em 8 colunas, símbolo em 3).
- Constraints: Perspective Grid (Layout), Draw SVG (Movimento), Selective Color (Cor), Stagger (Movimento). **Novo:** Rodízio do símbolo (Interação, Mechanical).
- Justificativa: o título precisa de espaço para caber em duas linhas. O símbolo à direita apresenta a marca como um caso com quatro olhares. O fundo Horizonte é o fundo oficial do Brand Guide para heros.

### Conteúdo
- Rótulo: `Cohort 01 · Aplicações abertas`
- H1: `O fellowship em negócios digitais <em>para médicos.</em>`
- Subheadline: "Um programa de doze meses em que um board de quatro mentores acompanha o seu negócio educacional como a medicina forma um especialista: com supervisão, discussão de caso e conduta revisada a cada quinze dias."
- CTA: `Aplicar para a cohort 01` para `/aplicar/`.
- Apoio: "A aplicação leva três minutos e um mentor do board conversa com você antes de qualquer decisão."
- Legenda do símbolo, linha 1 (fixa): `Quatro áreas em volta de um caso`.
- Legenda do símbolo, linha 2 (nova, muda com o rodízio): `Produto e oferta` → `Tecnologia e operação` → `Tráfego e automações` → `Gestão`. São as áreas do board na ordem dos quadrantes: topo = Fabrissio, esquerda = Buzzi, direita = Victor, base = Vinícius.
- Topbar: assinatura, `O programa` (#programa), `O board` (#board), botão contorno `Aplicar`.

### Layout
**Já construído, manter.**
- `.hero`: `min-height: 100svh`, flex coluna, `overflow: hidden`, `--horizonte-h: clamp(8rem, 21vh, 12rem)`.
- `.hero__grid`: grade de 12 colunas. Padding `clamp(2.5rem, 7vh, 5rem)` em cima e `calc(var(--horizonte-h) + 1rem)` embaixo.
- `.hero__copy`: coluna 1 / span 8, `max-width` do h1 = 17ch.
- `.hero__marca`: coluna 10 / span 3, `justify-self: end`, margem superior `clamp(2.5rem, 7vh, 4.5rem)`.

**Alteração:** a legenda passa a ter duas linhas separadas por um fio de 24px.
- `<figcaption>` com `<span class="legenda__fixa">`, `<span class="legenda__fio">` e `<span class="legenda__area" aria-live="polite">`.
- `.legenda__fio`: 24px x 1px, fundo `var(--linha)`, `margin: 0.6rem auto`.
- `.legenda__area`: altura fixa de 1.4em com `overflow: hidden`, para a troca de texto não mexer no layout.

### Tipografia
Como está no CSS: rótulo 0.75rem, h1 display, lead `clamp(1.0625rem, 1rem + 0.3vw, 1.1875rem)` / 1.6, apoio 0.875rem / 1.5. A `.legenda__area` usa Caslon 400 itálico 1rem, cor `var(--grafite)`, sem caixa alta e sem espaçamento extra.

### Cores
- Fundo `#E9E2D3`, texto `#2A2A2A`, apoio `rgba(42,42,42,0.68)`.
- **Ardósia (um elemento):** o quadrante ativo do símbolo grande. A linha de conduta do Horizonte é ardósia por regra do Brand Guide, e o quadrante é o destaque, porque os dois formam um único sistema gráfico. O símbolo pequeno da topbar é parte da assinatura e não conta.
- Botão primário: `#2A2A2A` com texto `#E9E2D3`. Hover `#1C1C1C`. Focus com outline 1px `#2A2A2A` e offset 4px. Active `translateY(1px)`.
- Botão contorno: borda e texto `#2A2A2A`. Hover com fundo `#F7F3EA`.

### Elementos Visuais
- **Símbolo grande:** `.cruz` com `width: clamp(10rem, 15vw, 13.5rem)`, eixos em hairline `var(--linha)` (horizontal -24%, vertical -30%) e quatro `rect.q`.
- **Horizonte (já construído):**
  - Grade de 56px, grafite 11%, `perspective(600px) rotateX(58deg)`, máscara `linear-gradient(180deg, transparent, #000 55%)`.
  - Véu osso de 8% a 52%.
  - Linha `M0 330 L300 330 L380 250 L860 250 L940 330 L1440 330` no viewBox 1440x400 com `preserveAspectRatio="none"` e `vector-effect: non-scaling-stroke`.
  - Nós em 26.39% / 62.5% e 65.28% / 82.5%.

### Animações
1. **Já construídas:** montagem dos quadrantes, com atrasos de 0.35s, 0.5s, 0.65s e 1.15s (ardósia), 700ms de opacity e 900ms de transform. Eixos em 1.6s com 0.2s de atraso. Linha em clip de 4.2s com 0.6s de atraso. Nós em 1.9s e 3.6s. Legenda em 1s com 1.6s de atraso. Grade deslizando em 24s linear infinito.
2. **Novo, rodízio:**
   - Começa 3.2s depois do load e roda a cada 3.2s.
   - O quadrante ardósia passa para o próximo na ordem topo → esquerda → direita → base → topo. É a ordem das sessions, não o sentido horário, porque segue o rodízio do board na ordem alfabética.
   - Implementação: `data-ativo="1|2|3|4"` no `.cruz`. O CSS aplica `fill: var(--ardosia)` só no `.q--N` ativo. Os outros ficam `var(--grafite)`, com `transition: fill 600ms var(--ease-io)`.
   - O quadrante que acabou de ficar ativo pulsa uma vez: `transform: scale(1.06)` → `1`, 500ms `--ease`.
   - `.legenda__area` troca junto: o texto sai em `translateY(-100%)` e entra de `translateY(100%)`, 450ms `--ease`.
   - O rodízio pausa com a aba oculta (`document.hidden`) e quando o hero sai do viewport.
3. **Parallax sutil do símbolo (desktop, pointer fine):**
   - O mouse sobre o hero move `.cruz` em até ±6px em X e Y, calculado pelo centro do hero. Aplicado com `transform: translate3d(...)` e lerp 0.08 por frame.
   - Os eixos se movem em sentido oposto até ±3px, o que dá profundidade.

### Interatividade
- Hover no símbolo pausa o rodízio. Clique ou tecla Enter (`tabindex="0"`, `role="button"`, `aria-label="Ver as quatro áreas do board"`) avança um passo manualmente.
- Links da topbar: cor `rgba(42,42,42,0.68)`, que vai a `#2A2A2A` no hover, com sublinhado de 1px crescendo da esquerda (`scaleX 0→1`, 300ms).

### Responsividade
- **≤1024px:** copy com span 9, marca com span 3.
- **≤760px (já construído):**
  - Símbolo de 5.5rem acima do rótulo, em linha com a legenda.
  - Links de texto da topbar ocultos.
  - Botão CTA com 100% da largura.
  - `--horizonte-h: 9rem`.
- No mobile a legenda mostra só a linha 2, que muda com o rodízio. O fio e a linha 1 somem.
- Sem parallax com pointer coarse.

---

## Seção 2: Apresentação (01 · O programa)

### Arquétipo e Constraints
- Arquétipo: **Editorial**.
- Constraints: Imagem Dessaturada (Mídia), Sticky Element (Layout), Mixed Fonts (Tipografia), Clip Reveal (Movimento).
- Justificativa: é o texto que explica o conceito. Pede leitura de revista, com a foto parada ao lado enquanto o texto corre.

### Conteúdo
- Cabeçalho: `01` · `O programa`
- H2: `Um programa de formação, <em>não um curso.</em>`
- Lede: "Todo médico sabe como se aprende uma especialidade. Durante toda a formação, nenhuma decisão relevante foi tomada sozinha: havia um preceptor, uma visita, uma discussão de caso, e a conduta era revisada antes de virar prescrição."
- P1: "No digital, a lógica se inverte. O médico decide sozinho o produto, o preço, o modelo de venda e a verba de tráfego, e cada erro custa um trimestre."
- P2: "O Fellowship Digital devolve ao negócio educacional o formato que a medicina já validou: um board de quatro mentores acompanha o seu caso por doze meses, com anamnese na entrada, conduta escrita a cada session e evolução medida na seguinte."
- Ficha: `Duração` 12 meses · `Board sessions` 24, individuais · `Board` 4 mentores
- Legenda da foto: `Visita. Um caso, mais de um olhar.`

### Layout
**Já construído, manter.** Foto na coluna 1 / span 5, sticky com `top: calc(var(--barra-h) + 2rem)` (hoje é `2rem`, atualizar). Texto na coluna 7 / span 6, `max-width: 36rem`.

### Tipografia
Como está: h2 com o estilo de título de seção, lede Caslon, corpo Geologica 300, `dt` com o estilo de rótulo 0.6875rem e `dd` em Caslon `clamp(1.125rem, 1rem + 0.4vw, 1.375rem)`.

### Cores
- Fundo `#E9E2D3`. Card da foto `#F7F3EA`. Linhas da ficha em `var(--linha)`.
- **Ardósia (um elemento):** `.secao__num` "01".

### Elementos Visuais
- Foto `apresentacao-visita.jpg` servida via `/.netlify/images?...&w=900&q=80`.
- Filtro `grayscale(1) contrast(1.06) brightness(1.04)`, `mix-blend-mode: multiply`.
- Máscara `radial-gradient(ellipse 72% 74% at 50% 46%, #000 48%, rgba(0,0,0,.5) 78%, transparent 100%)`.

### Animações
- Os itens `.revela` entram em sequência, como já está.
- **Novo:** a foto usa `.revela-clip` no lugar de `.revela`, de baixo para cima, 1100ms.
- **Novo:** a imagem dentro do card faz um zoom lento no reveal, `scale(1.08)` → `scale(1)` em 1600ms `--ease`.
- **Novo:** os números da ficha (12, 24 e 4) contam de 0 até o valor em 900ms `--ease`, disparados junto com o reveal da ficha. O texto depois da vírgula ("individuais", "mentores") já aparece fixo.

### Interatividade
- Hover no card da foto (pointer fine): a imagem sai de `grayscale(1)` para `grayscale(0.85)` e `brightness(1.06)`, 600ms. É a única "cor" que a foto ganha, bem discreta.

### Responsividade
Como está (≤760px): coluna única, foto no fim e sem sticky, ficha em linhas com rótulo à esquerda e valor à direita.

---

## Seção 3: Para quem (02 · Para quem)

### Arquétipo e Constraints
- Arquétipo: **Progressive Reveal** (o foco muda conforme o scroll).
- Constraints: Sticky Element (Layout), Scroll Progress (Movimento), Selective Color (Cor), Mixed Fonts (Tipografia).
- Justificativa: são três perfis e o leitor precisa se reconhecer em um. Destacar um de cada vez, na ordem, funciona como uma triagem em que o caso ativo fica em primeiro plano.

### Conteúdo
- Cabeçalho: `02` · `Para quem`
- H2: `Três momentos de carreira, <em>uma mesma necessidade.</em>`
- Casos:
  - `Caso I` + "Quem já vende um curso, uma mentoria ou um preparatório e sente que o negócio depende inteiramente da própria presença: o lançamento rende, mas cansa, e a agenda do consultório ocupa o espaço que sobra."
  - `Caso II` + "Quem tem audiência e demanda, recebe pedidos de curso toda semana e mantém aulas gravadas numa pasta há meses, sem decidir preço, plataforma ou a forma de vender sem comprometer o nome."
  - `Caso III` + "Quem quer começar e prefere fazer isso com orientação desde o primeiro passo, em vez de gastar um ano descobrindo o que alguém experiente indicaria numa conversa."
- Rótulos curtos de cada caso, só visuais, derivados da copy da seção de critérios: Caso I `Já vendendo` · Caso II `Com audiência, sem produto` · Caso III `Começando do zero`.
- Fechamento: "Nos três casos, o diagnóstico é o mesmo: sobra competência clínica e <em>falta supervisão de negócio.</em>"

### Layout
- `section.paraquem`, fundo `#F7F3EA` (a seção inteira é uma superfície linho), `padding: var(--secao-py) 0`.
- Container com o cabeçalho de seção.
- `.paraquem__grid`: 12 colunas, `margin-top: clamp(3rem, 6vw, 5rem)`.
  - **Coluna esquerda** (`.paraquem__aside`, 1 / span 5): `position: sticky; top: calc(var(--barra-h) + 3rem); align-self: start`.
    - Contém o H2, o fio de 48px em grafite e o contador `.paraquem__contador`.
    - O contador são três quadradinhos de 10px com `gap: 6px`, fill `var(--vazio)`. O quadradinho do caso ativo fica `var(--grafite)`.
    - Abaixo do contador, o rótulo `Caso I de III`, que muda com o caso ativo.
  - **Coluna direita** (`.paraquem__casos`, 7 / span 6): uma lista `<ol>` com três `<li class="caso">`.
    - Cada caso tem `padding: clamp(2.5rem, 6vh, 4rem) 0` e `border-top: 1px solid var(--linha)`. O último também leva `border-bottom`.
    - `min-height: 42vh` em desktop, para cada caso ocupar o centro da tela sozinho.
    - Estrutura do caso:
      - Linha 1 em flex `space-between`: `span.caso__num` ("Caso I", em Caslon itálico) e `span.caso__rotulo` ("Já vendendo", no estilo de rótulo).
      - Linha 2: `p.caso__texto`.
    - A linha vertical de progresso fica à esquerda dos casos: `.paraquem__trilho`, absoluto em `left: -2rem`, `top: 0`, `bottom: 0`, 1px `var(--linha)`.
    - Dentro do trilho, `.paraquem__trilho-fill` em grafite, com `transform: scaleY(var(--p))` e origem no topo, onde `--p` é o progresso do scroll dentro da lista.
- `.paraquem__fecho`: coluna 1 / span 12, `margin-top: clamp(4rem, 8vw, 7rem)`, `padding-top: 2.5rem`, `border-top: 1px solid var(--grafite)`.
  - Texto Caslon `clamp(1.75rem, 1.1rem + 2.2vw, 3rem)` / 1.2, `max-width: 22ch`, alinhado à esquerda com recuo de 5 colunas (`margin-left: calc(5/12 * 100%)`).

### Tipografia
- `.caso__num`: Caslon 400 itálico, `clamp(1.5rem, 1.2rem + 1vw, 2rem)`.
- `.caso__rotulo`: rótulo 0.6875rem.
- `.caso__texto`: Caslon 400, `clamp(1.25rem, 1.05rem + 0.8vw, 1.625rem)` / 1.45, `max-width: 30ch`. O texto do caso vai em serif e não em sans, porque é o momento de reconhecimento e pede leitura em voz de parecer.
- Contador `Caso I de III`: rótulo 0.6875rem, `margin-top: 0.75rem`.

### Cores
- Fundo `#F7F3EA`. Texto `#2A2A2A`.
- Casos inativos: `opacity: 0.32`. Caso ativo: `opacity: 1`. Transição de 500ms `--ease`.
- **Ardósia (um elemento):** o `.caso__num` do caso ativo. Os inativos ficam em `#2A2A2A`. O `.secao__num` "02" usa `--neutro`.

### Elementos Visuais
- Contador de três quadradinhos (a linguagem dos quadrantes do símbolo).
- Trilho de progresso vertical em hairline.

### Animações
- **Caso ativo:** IntersectionObserver em cada `.caso` com `rootMargin: -45% 0px -45% 0px`. Quem cruza o centro recebe `.is-ativo`. Sem JS, todos ficam `opacity 1`.
- **Trilho:** `--p` = (centro do viewport − topo da lista) / altura da lista, limitado entre 0 e 1, atualizado em rAF. Com `animation-timeline: view()` disponível, usar CSS com `animation-range: contain 0% contain 100%`.
- **Troca do contador:** o quadradinho vai de `var(--vazio)` a `var(--grafite)` com `transition: background-color 400ms`. O rótulo troca com fade de 200ms.
- **Fechamento:** reveal por palavras. Cada palavra fica num `<span class="palavra">` com `opacity 0` + `translateY(0.4em)`, que passa a 1 / 0 em 600ms `--ease` com 35ms de stagger, disparado a 20% do viewport. A parte em itálico entra por último, com 200ms de atraso extra.

### Interatividade
- Hover num caso inativo (pointer fine): `opacity 0.6`, 300ms.
- Clique no caso rola até ele, `scrollIntoView({block:'center', behavior:'smooth'})`.

### Responsividade
- **≤1024px:** aside com span 5 e casos com span 7 (colunas 6 a 12).
- **≤760px:**
  - Sem sticky: o aside vira um bloco normal acima dos casos.
  - Os casos ficam todos com `opacity: 1`, sem o foco progressivo, porque em rolagem rápida no celular ele confunde.
  - O `.caso__num` fica grafite e a ardósia vai para o `.secao__num`.
  - Trilho oculto. Contador oculto.
  - Fechamento sem recuo, `max-width: none`.

---

## Seção 4: Os formatos (03 · Os formatos)

### Arquétipo e Constraints
- Arquétipo: **Poster** (tipografia dramática sobre fundo escuro).
- Constraints: Dark Mode (Cor), Headline >150px no desktop largo (Tipografia), Stagger (Movimento), Hover Reveal (Interação), SVG Ilustração (Mídia).
- Justificativa: é a virada da página, o diagnóstico diferencial. O grafite interrompe o osso e o título grande acusa o formato, não o médico. Cada formato mostra com o próprio símbolo quantos olhares ele oferece.

### Conteúdo
- Cabeçalho: `03` · `Os formatos`
- H2 (poster): `O problema costuma ser <em>o formato, não o médico.</em>`
- Tabela de formatos. O texto é o parágrafo da copy dividido por frase, sem alteração:

| Rótulo (visual) | Texto (copy) | Quadrantes preenchidos |
|---|---|---|
| `Curso de marketing médico` | "Os cursos de marketing médico ensinam a encher o consultório, não a operar um negócio de ensino." | 1 (topo) |
| `Mentoria em grupo` | "As mentorias em grupo entregam a mesma aula para centenas de pessoas, e o caso individual raramente é discutido." | 1 (topo), com opacidade 40% |
| `Agência` | "Agências executam o que lhes é pedido, mas o médico não foi treinado para saber o que pedir." | 1 (direita) |
| `Fazer sozinho` | "E fazer sozinho funciona, devagar, sem ninguém com quem discutir o caso." | 0 |

- Fechamento: "Nenhum desses formatos tem o que a formação médica tinha: <em>alguém experiente olhando o caso com frequência</em> e dizendo o que fazer nas próximas duas semanas."
- Símbolo final, ao lado do fechamento: os quatro quadrantes preenchidos em osso, um deles em ardósia.

### Layout
- `section.formatos`, fundo `#2A2A2A`, texto `#E9E2D3`, `padding: clamp(6rem, 13vw, 11rem) 0`, `position: relative`, `overflow: hidden`.
- Marca d'água: o símbolo em `var(--osso-08)`, com `width: 64vw`, `max-width: 900px`, absoluto em `right: -18vw`, `top: 8%`, `pointer-events: none`. Faz parallax de 0.15 no scroll (`translateY(scrollDelta * -0.15)`).
- Cabeçalho de seção com a borda em `var(--osso-80)`.
- H2 poster: `margin-top: clamp(3rem, 6vw, 5rem)`, `max-width: 14ch`, no estilo poster. A parte em itálico quebra linha (`display: block`).
- `.formatos__lista` (`<ol>`): `margin-top: clamp(4rem, 8vw, 6rem)`, `border-top: 1px solid var(--osso-14)`.
  - Cada `li.formato` é um grid de 12 colunas, `padding: 2rem 0`, `border-bottom: 1px solid var(--osso-14)`, `align-items: center`.
    - Colunas 1 / span 1: `svg.formato__simbolo` de 40px.
    - Colunas 2 / span 3: `.formato__rotulo`.
    - Colunas 6 / span 7: `.formato__texto`.
- `.formatos__fecho`: grid de 12 colunas, `margin-top: clamp(4rem, 8vw, 6rem)`.
  - Colunas 1 / span 2: símbolo completo de 72px.
  - Colunas 3 / span 9: texto.

### Tipografia
- H2: estilo poster, cor `#E9E2D3`. Em telas ≥1440px chega a 7.5rem (120px). Em 1920px, `clamp` com teto de 9.5rem (152px): usar `clamp(3rem, 1rem + 7vw, 9.5rem)`.
- `.formato__rotulo`: Caslon 400, `clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)`, cor `#E9E2D3`.
- `.formato__texto`: Geologica 300, 1.0625rem / 1.6, cor `var(--osso-80)`, `max-width: 44ch`.
- Fechamento: Caslon 400, `clamp(1.5rem, 1.1rem + 1.4vw, 2.25rem)` / 1.3, cor `#E9E2D3`. O itálico fica na mesma cor.

### Cores
- Fundo `#2A2A2A`. Linhas `var(--osso-14)`. Quadrantes vazios `var(--osso-08)`. Quadrantes preenchidos `#E9E2D3`.
- **Ardósia (um elemento):** o quadrante da direita do símbolo completo do fechamento. Sobre grafite, a ardósia `#4F6D8F` tem contraste baixo, o que é aceitável porque é decorativa: não carrega texto. O `.secao__num` usa `--neutro` (`var(--osso-60)`).
- Seleção de texto nesta seção: fundo `#E9E2D3`, texto `#2A2A2A`.

### Elementos Visuais
- Mini-símbolos por formato: SVG 40x40 com os quatro rects. Os preenchidos em `#E9E2D3`, os vazios em `var(--osso-08)`. É um diagrama, não o logotipo.
- Símbolo completo do fechamento com 72px.
- Marca d'água gigante do símbolo.

### Animações
- H2: reveal por linha com máscara. Cada linha fica num `<span class="linha"><span>…</span></span>`, a linha externa com `overflow: hidden` e a interna indo de `translateY(105%)` a `0`, 1000ms `--ease` com 120ms de stagger, disparado a 15% do viewport.
- Linhas da lista: `.revela` com stagger de 90ms. O mini-símbolo monta os quadrantes preenchidos 200ms depois da linha aparecer (`opacity 0` → `1`, `scale(0.6)` → `1`, 500ms).
- Fechamento: o símbolo completo monta como o do hero (quatro quadrantes em stagger de 150ms, o ardósia por último, com 400ms extras), disparado a 25% do viewport. O texto entra com `.revela` depois de 300ms.

### Interatividade
- Hover numa linha (pointer fine):
  - O fundo da linha vai a `rgba(233,226,211,0.04)`, 300ms.
  - Os quadrantes vazios do mini-símbolo piscam uma vez até `rgba(233,226,211,0.3)` e voltam, 700ms. É o "o que falta" daquele formato.
  - O rótulo desloca `translateX(6px)`, 300ms `--ease`.
- Cursor normal. Nada é clicável.

### Responsividade
- **≤1024px:** símbolo com span 1, rótulo com span 4, texto de 6 a 12 (span 7).
- **≤760px:**
  - Cada formato vira bloco: linha 1 com o símbolo de 32px e o rótulo lado a lado (`gap: 1rem`), linha 2 com o texto, `margin-top: 0.75rem`.
  - Marca d'água com `width: 120vw` e `right: -50vw`.
  - Fechamento com o símbolo de 48px acima do texto.
  - Sem hover.

---

## Seção 5: Como funciona (04 · Como funciona)

### Arquétipo e Constraints
- Arquétipo: **Scroll Storytelling** (seção fixada com cinco estados).
- Constraints: Sticky Element (Layout), Scroll Progress (Movimento), Draw SVG (Movimento), Imagem Dessaturada (Mídia), Clip Reveal (Movimento).
- Justificativa: o ciclo é o mecanismo do programa e precisa ser visto acontecendo. A linha de conduta da marca vira um prontuário que ganha um degrau a cada etapa.

### Conteúdo
- Cabeçalho: `04` · `Como funciona`
- H2: `A estrutura de um fellowship <em>aplicada ao negócio.</em>`
- Introdução: "Tudo começa pela anamnese do negócio, um levantamento que o board inteiro lê antes da primeira session. A partir dela, as board sessions acontecem a cada quinze dias, ao vivo e individualmente, conduzidas por um dos quatro mentores em rodízio."
- Etapas (título + texto da copy), com um marcador de tempo só visual:
  1. `Anamnese` · "O board inteiro lê o caso antes da primeira session." · marcador `Entrada`
  2. `Board session` · "A cada quinze dias, ao vivo e individual, com um mentor em rodízio." · marcador `Dia 0`
  3. `Conduta` · "Por escrito, define o que será feito nos quinze dias seguintes." · marcador `Dia 0`
  4. `Evolução` · "A session seguinte começa pelo que rodou, o que não rodou e o que muda." · marcador `Dia 15`
  5. `Sala de staff` · "Entre as sessions, um grupo com os quatro mentores." · marcador `Dias 1 a 14`
- Fechamento: "Cada session termina com uma conduta por escrito, e a seguinte começa pela evolução dessa conduta. Entre elas, a sala de staff reúne o fellow e os quatro mentores. O board tem quatro especialidades porque o negócio tem quatro sistemas que dependem uns dos outros, e ninguém domina os quatro sozinho."
- Foto: `ciclo-mesa.jpg`, alt "Mesa de discussão de caso: prontuário aberto, caneta e estetoscópio."

### Layout
- `section.ciclo`, fundo `#E9E2D3`.
- **Parte A, abertura** (não fixada), container:
  - Cabeçalho de seção.
  - Grade: H2 em 1 / span 6 e introdução em 8 / span 5 (corpo, `align-self: end`).
  - Faixa de foto: `margin-top: clamp(3rem, 6vw, 5rem)`, largura total do container, `aspect-ratio: 21 / 8`, card `#F7F3EA` com padding de 1.25rem.
    - Mesma máscara e filtro da seção 01, com a elipse mais larga: `radial-gradient(ellipse 80% 70% at 50% 50%, #000 50%, rgba(0,0,0,.5) 80%, transparent 100%)`.
    - `object-position: center 40%`.
- **Parte B, trilho fixado** (`.ciclo__pin`): `height: 500vh` no desktop (≥1024px e pointer fine), com `position: relative`.
  - Dentro, `.ciclo__stage` com `position: sticky`, `top: var(--barra-h)` e `height: calc(100svh - var(--barra-h))`, em grid de duas linhas: `auto 1fr`.
  - **Linha 1, o prontuário:** container, `padding-top: clamp(2rem, 5vh, 3.5rem)`.
    - SVG `.prontuario` com `viewBox="0 0 1200 220"`, 100% de largura e 220px de altura, `preserveAspectRatio="none"`, `vector-effect` em todos os traços.
    - **Grade de fundo:** linhas verticais a cada 60 unidades, `var(--linha)`, 1px. Linhas horizontais em y 40, 100, 160 e 220, também `var(--linha)`.
    - **Linha de conduta completa:** `M0 180 L180 180 L220 140 L420 140 L460 100 L660 100 L700 140 L900 140 L940 60 L1200 60`, em ardósia.
      - Cada degrau corresponde a uma etapa: subida em 220 (session), subida em 460 (conduta), descida em 700 (evolução) e subida em 940 (sala de staff, o negócio sobe).
      - A anamnese é o trecho plano inicial, de 0 a 180.
    - **Nós:** cinco nós HTML sobrepostos, em x 90, 220, 460, 700 e 940 e em y 180, 140, 100, 140 e 60, convertidos em %. Cada nó é um quadrado de 7px, porque vem do símbolo.
      - Inativo: fill `#E9E2D3`, borda 1px `#2A2A2A`.
      - Ativo: fill `#2A2A2A`.
      - O nó da etapa atual cresce para 11px.
    - **Rótulos de tempo:** abaixo de cada nó, na base do SVG, em HTML absoluto no estilo de rótulo 0.6875rem.
  - **Linha 2, o painel da etapa:** grade de 12 colunas, `align-items: center`.
    - Coluna 1 / span 2: número da etapa em Caslon com o estilo de número gigante, com teto menor: `clamp(4rem, 2rem + 6vw, 8rem)`. Formato `1/5`, com o "/5" em 40% do tamanho e `opacity 0.4`.
    - Colunas 4 / span 5: pilha de cinco `.etapa`, todas em `grid-area: 1 / 1`, com só a ativa visível.
      - Cada `.etapa` tem `h3.etapa__nome` e `p.etapa__texto`.
    - Colunas 10 / span 3: mini-símbolo de 96px. O quadrante do mentor em rodízio fica em grafite sólido e os outros em `var(--vazio)`.
      - Etapa 1 (anamnese): os quatro sólidos, porque o board inteiro lê.
      - Etapa 2: só o topo.
      - Etapa 3: só o topo, com um traço de conduta de 48px abaixo do símbolo.
      - Etapa 4: topo e esquerda (o próximo mentor recebe a evolução).
      - Etapa 5: os quatro, a 60% (a sala de staff).
      - Legenda abaixo, no estilo de rótulo: `Board inteiro` / `Um mentor` / `Um mentor` / `Próximo mentor` / `Os quatro, na sala de staff`.
- **Parte C, fechamento** (não fixado): container, `padding: clamp(4rem, 8vw, 6rem) 0 var(--secao-py)`.
  - Texto na coluna 4 / span 7, Geologica 300 com 1.125rem / 1.7.
  - A frase final, "ninguém domina os quatro sozinho", fica envolvida em `<em class="fecho-serif">`, em Caslon itálico 1.25em.

### Tipografia
- `.etapa__nome`: Caslon 400, `clamp(2rem, 1.2rem + 2.6vw, 3.25rem)` / 1.05.
- `.etapa__texto`: Geologica 300, `clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)` / 1.6, `max-width: 30ch`, `margin-top: 1rem`.
- Rótulos de tempo: 0.6875rem, +0.24em, caixa alta, `--texto-rotulo`. O rótulo do nó ativo fica em `#2A2A2A`.

### Cores
- Fundo `#E9E2D3`. Grade do prontuário `var(--linha)`.
- **Ardósia (um elemento):** a linha de conduta do prontuário. `.secao__num` "04" usa `--neutro`.
- Nós em grafite e osso, como descrito acima.

### Elementos Visuais
- Prontuário em SVG com grade milimetrada: é a linha de conduta do Brand Guide transformada em gráfico de evolução.
- Mini-símbolo que mostra quem conduz a etapa.
- Faixa de foto dessaturada.

### Animações
- **Progresso da parte B:** `p = (scrollY - pinTop) / (pinHeight - stageHeight)`, limitado entre 0 e 1. `etapa = min(5, floor(p * 5) + 1)`.
- **Linha de conduta:** revelada por clip até a posição do nó da etapa ativa, `clip-path: inset(-4px calc(100% - Xpct) -4px 0)`.
  - Dentro de cada etapa, a revelação avança de forma contínua até o próximo nó, proporcional a `p`. O efeito é a linha "escrevendo" enquanto se rola.
  - Transição de 120ms linear, só para suavizar.
- **Troca de etapa:** a saída vai a `opacity 0` + `translateY(-16px)` em 350ms. A entrada vem de `translateY(16px)` a `0`, com `opacity 1`, 500ms `--ease` e 150ms de atraso.
  - O número gigante troca com máscara vertical (`translateY(100%)` → `0`, 600ms `--ease`).
  - Os quadrantes do mini-símbolo mudam de fill com `transition: fill 500ms`.
- **Faixa de foto:** `.revela-clip` da esquerda para a direita, `inset(0 100% 0 0)` → `inset(0 0 0 0)`, 1300ms `--ease-io`. A imagem interna faz parallax de −40px a +40px ao atravessar o viewport (`translateY`, em rAF).

### Interatividade
- Os nós do prontuário são `<button>` com `aria-label="Etapa 2: Board session"`. O clique rola até a posição da etapa, `window.scrollTo({top: pinTop + (n-1)/5 * rolagemUtil + 2, behavior:'smooth'})`.
- Hover num nó: o rótulo de tempo vai a grafite e aparece um tooltip com o nome da etapa.
  - Tooltip: fundo `#2A2A2A`, texto `#E9E2D3`, Geologica 400 0.75rem, `padding: 6px 10px`, 8px acima do nó.
  - Entra com `opacity` e `translateY(4px)` → `0`, 200ms.
- Teclado: setas esquerda e direita com o foco no prontuário mudam de etapa.

### Responsividade
- **<1024px ou pointer coarse:** sem pin (`height: auto`, `.ciclo__stage` estático).
  - O prontuário vira vertical: SVG `viewBox="0 0 220 900"`, altura de 900px no máximo, à esquerda.
    - Linha vertical com degraus horizontais: `M40 0 L40 150 L80 190 L80 330 L120 370 L120 510 L80 550 L80 690 L160 730 L160 900`.
    - Os nós se alinham às etapas.
  - As cinco `.etapa` ficam empilhadas à direita da linha, todas visíveis, com `padding: 2rem 0`.
  - A linha se desenha com o scroll (clip de cima para baixo, `inset(0 0 calc(100% - p%) 0)`).
  - O mini-símbolo de cada etapa fica em 40px, ao lado do nome.
  - O número gigante some.
- **≤760px:**
  - Faixa de foto com `aspect-ratio: 4 / 3`.
  - H2 e introdução em coluna única.
  - Fechamento com 100% de largura.

---

## Seção 6: O que o fellow recebe (05 · Entregas)

### Arquétipo e Constraints
- Arquétipo: **Bento Box** (células linho de tamanhos diferentes).
- Constraints: Stagger (Movimento), Counter Animation (Movimento), Hover Fill (Interação), SVG Ilustração (Mídia).
- Justificativa: são sete entregas de pesos diferentes. O bento dá hierarquia: as sessions são a entrega principal e ocupam a maior célula. O card linho segue o componente "card de track" do Brand Guide.

### Conteúdo
- Cabeçalho: `05` · `Entregas`
- H2: `Doze meses <em>de acompanhamento.</em>`
- Introdução: "Ao longo da cohort, o fellow recebe:"
- Células:
  1. `24` + `board sessions` + "Individuais e ao vivo, uma a cada quinze dias, ao longo de doze meses."
  2. `Anamnese do negócio` + "Na entrada, lida pelo board inteiro antes da primeira session."
  3. `Conduta escrita` + "Ao fim de cada session, com os quinze dias seguintes definidos."
  4. `Sala de staff` + "Com os quatro mentores, durante toda a cohort."
  5. `Estrutura base` + "Produto, página, checkout e automações no ar no primeiro ciclo."
  6. `4` + `Quatro indicadores` + "A evolução acompanhada pelos mesmos números em cada session."
  7. `Certificado de fellow` + "Ao concluir, com entrada no corpo de fellows do programa."
- CTA: `Aplicar para a cohort 01`

### Layout
- `section.entregas`, fundo `#E9E2D3`, `padding: var(--secao-py) 0`.
- Cabeçalho de seção. Cabeça em grade: H2 em 1 / span 6 e introdução em 8 / span 4, alinhada à base, no estilo de rótulo.
- `.bento`: `display: grid; grid-template-columns: repeat(12, 1fr); grid-auto-rows: minmax(150px, auto); gap: 12px; margin-top: 3.5rem`.
  - C1 (sessions): `grid-column: 1 / span 7; grid-row: 1 / span 2`.
  - C2 (anamnese): `grid-column: 8 / span 5; grid-row: 1`.
  - C3 (conduta): `grid-column: 8 / span 5; grid-row: 2`.
  - C4 (sala de staff): `grid-column: 1 / span 4; grid-row: 3 / span 2`.
  - C5 (estrutura base): `grid-column: 5 / span 5; grid-row: 3 / span 2`.
  - C6 (indicadores): `grid-column: 10 / span 3; grid-row: 3`.
  - C7 (certificado): `grid-column: 10 / span 3; grid-row: 4`.
  - Mapa, com linhas em `minmax(150px, auto)`:
    ```
    L1: C1 C1 C1 C1 C1 C1 C1 | C2 C2 C2 C2 C2
    L2: C1 C1 C1 C1 C1 C1 C1 | C3 C3 C3 C3 C3
    L3: C4 C4 C4 C4 | C5 C5 C5 C5 C5 | C6 C6 C6
    L4: C4 C4 C4 C4 | C5 C5 C5 C5 C5 | C7 C7 C7
    ```
- Cada `.bento__cel`: fundo `#F7F3EA`, `padding: clamp(1.5rem, 2.4vw, 2.25rem)`, flex coluna com `justify-content: space-between` e `gap: 1rem`, `position: relative`, `overflow: hidden`.
  - Topo: `span.cel__rotulo` com o índice `E01`...`E07` no estilo de rótulo.
  - Base: `h3` + `p`.
- **C1 (sessions):**
  - Número `24` em Caslon com o estilo de número gigante, ao lado de `board sessions` em Caslon 1.5rem.
  - Abaixo, `.sessions__grade`: grid de 12 colunas x 2 linhas de quadradinhos de 14px com `gap: 8px`. São 24 quadrados, um por session, `aria-hidden`.
    - Cada quadrado tem fill `var(--vazio)`.
    - O quadrado de índice 0 mod 4 leva um traço inferior de 2px, marcando o início de cada rodada do rodízio.
  - Texto no fim.
- **C5 (estrutura base):** mini-prontuário SVG 100% x 90px com a linha `M0 70 L60 70 L90 30 L100% 30` (em HTML, via viewBox 300x90).
  - Um nó quadrado de 7px no ponto de subida, com o rótulo `Mês 2 · no ar`.
  - O resto da linha, depois do nó, fica tracejado `3 4`, representando os dez meses de ajuste.
- **C7 (certificado):** um certificado em miniatura, só visual.
  - Retângulo 4:3 de 120px de largura, fundo `#E9E2D3`, borda 1px `var(--linha)`.
  - Dentro, o símbolo de 20px no topo e duas linhas de texto falso (barras de 1px `var(--linha)` com 60% e 40% de largura).
  - Rotação `-4deg`, absoluto em `right: 1.5rem; top: 1.5rem`.
- CTA: `margin-top: 3rem`, alinhado à esquerda, `btn btn--primario`.

### Tipografia
- `h3` das células: Caslon 400, `clamp(1.375rem, 1.2rem + 0.6vw, 1.75rem)`.
- `p` das células: Geologica 300, 0.9375rem / 1.6, `max-width: 34ch`, cor `var(--texto-suave)`.
- `24`: estilo de número gigante. `4` da C6: Caslon `clamp(3rem, 2rem + 3vw, 5rem)`.

### Cores
- Células `#F7F3EA` sobre `#E9E2D3`. Quadrados vazios `var(--vazio)`. Quadrados preenchidos `#2A2A2A`.
- **Ardósia (um elemento):** o nó "Mês 2 · no ar" da C5. `.secao__num` "05" usa `--neutro`.
- Hover da célula: fundo `#FBF8F1`.

### Elementos Visuais
- Grade de 24 quadrados (as sessions), mini-prontuário, certificado em miniatura.

### Animações
- Células: `.revela` com stagger na ordem C1, C2, C3, C4, C5, C6, C7 (70ms cada).
- **C1:**
  - O `24` conta de 0 a 24 em 1200ms `--ease`.
  - Os quadrados se preenchem em sequência, de `var(--vazio)` a `#2A2A2A`, com 45ms de stagger e 250ms cada, começando 300ms depois do reveal.
  - Ao terminar, os quadrados voltam a `var(--vazio)`, menos o primeiro de cada rodada (4), que fica grafite. O resultado final mostra 6 rodadas.
- **C5:** a linha se desenha por clip em 1400ms. O nó aparece aos 900ms. O tracejado depois do nó desliza em loop, `stroke-dashoffset` de 0 a -14 em 1.2s linear infinito (é o negócio seguindo).
- **C6:** o `4` conta de 0 a 4 em 600ms.
- **C7:** o certificado entra com `rotate(-12deg)` + `translateY(20px)` e vai a `rotate(-4deg)` + `0`, 900ms `--ease`.

### Interatividade
- Hover numa célula (pointer fine): fundo `#FBF8F1` em 300ms. O `.cel__rotulo` desloca `translateX(4px)`.
  - C1: o quadrado sob o cursor mais os três seguintes, uma rodada completa, ficam grafite por 400ms.
  - C7: o certificado vai a `rotate(0deg)` + `translateY(-4px)`, 400ms `--ease`.
- CTA com os mesmos estados do hero.

### Responsividade
- **≤1024px:** grade de 6 colunas.
  - C1 com span 6.
  - C2 e C3 com span 3 cada.
  - C4 com span 3.
  - C5 com span 3 e row span 2.
  - C6 e C7 com span 3.
- **≤760px:** coluna única com todas as células em span 1, linhas automáticas e `gap: 10px`.
  - Na C1, o `24` fica em 5rem e a grade de sessions em 12x2 com quadrados de 10px e `gap: 5px`, que cabe em 350px.
  - O certificado fica menor, com 90px.

---

## Seção 7: A ementa (06 · A ementa)

### Arquétipo e Constraints
- Arquétipo: **Data Dense** (ementa em tabela acoplada a uma régua de doze meses).
- Constraints: Sticky Element (Layout), Scroll Triggered (Movimento), Hover Reveal (Interação), Color Blocking contido (Cor).
- Justificativa: a ementa é uma informação estrutural, e o médico lê ementas. Uma régua de doze meses que acende o ciclo de cada track, e mostra onde o produto vai ao ar, transforma a lista num cronograma crível.

### Conteúdo
- Cabeçalho: `06` · `A ementa`
- H2: `A ementa, <em>na ordem em que o negócio precisa dela.</em>`
- Tracks (número + nome + texto da copy):
  - `01` `Produto e oferta`: "Concepção do produto educacional, promessa, formato, precificação, a oferta que sustenta o ticket e a estrutura base para o produto ir ao ar."
  - `02` `Aquisição`: "Tráfego pago, criativos e a presença no Instagram, no TikTok e no YouTube."
  - `03` `Conversão`: "Lançamento clássico, perpétuo, lançamento pago e venda ativa, e qual conduta cabe em cada produto."
  - `04` `Operação`: "Inteligência artificial, automações, plataformas e delegação, para que o negócio rode sem depender da agenda do médico."
  - `05` `Gestão`: "Financeiro e os indicadores que o board acompanha em cada session."
  - `06` `Liderança`: "Decisão sob incerteza, delegação de funções e a transição de quem executa para quem comanda."
- Fechamento: "Seis ciclos de dois meses, cada um fechado com gestão. O primeiro ciclo termina com o produto no ar e a estrutura base do negócio montada. Os dez meses seguintes são de ajuste e crescimento com o negócio já vendendo, até retirar o médico da operação."
- Rótulos da régua: `M1` a `M12`. Rótulos dos semestres: `Primeiro semestre · constrói` e `Segundo semestre · amplia e delega`. Nó: `Produto no ar`.

### Layout
- `section.ementa`, fundo `#E9E2D3`, `padding: var(--secao-py) 0`, `border-top: 1px solid var(--linha)`.
- Cabeçalho de seção, e o H2 em 1 / span 8 com `margin-top: 3rem`.
- **Régua** (`.regua`), `margin-top: 3.5rem`:
  - Desktop ≥1024px: `position: sticky; top: var(--barra-h); z-index: 5`, fundo `rgba(233,226,211,0.94)` com `backdrop-filter: blur(8px)`, `padding: 1.25rem 0 1rem`, `border-bottom: 1px solid var(--linha)`.
  - Estrutura em grid de 12 colunas iguais (um mês por coluna), `gap: 0`:
    - **Linha 1:** rótulos `M1`..`M12`, no estilo de rótulo 0.625rem, centralizados.
    - **Linha 2:** seis blocos de ciclo (`.regua__ciclo`), cada um com span 2 colunas, 28px de altura, fundo `var(--vazio)` e `border-right: 1px solid #E9E2D3` como separador.
      - Dentro de cada ciclo, dois ticks de session por mês, ou seja, 4 ticks por ciclo: barras verticais de 1px × 10px, grafite 30%.
      - O último tick de cada ciclo (a session de gestão) é um quadradinho de 6px grafite.
      - Cada ciclo leva o número do track (`01`..`06`) centralizado em Caslon 0.875rem.
    - **Linha 3:** os semestres, cada um com span 6, no estilo de rótulo 0.625rem, com `border-top: 1px solid var(--grafite)` e `padding-top: 6px`.
    - **Nó "Produto no ar":** absoluto no fim da coluna 2 (`left: calc(2/12*100%)`), quadrado de 9px, com o rótulo acima em Caslon itálico 0.875rem.
- **Lista de tracks** (`<ol class="tracks">`), `margin-top: 2.5rem`:
  - Cada `li.track` em grid de 12 colunas, `padding: clamp(1.75rem, 3vw, 2.5rem) 0`, `border-bottom: 1px solid var(--linha)`, `cursor: default`.
    - Coluna 1 / span 1: `.track__num` em Caslon `clamp(1.5rem, 1.2rem + 1vw, 2.25rem)`, `opacity 0.35` (vai a 1 quando ativo).
    - Colunas 2 / span 4: `.track__nome` (h3).
    - Colunas 7 / span 5: `.track__texto`.
    - Coluna 12: `.track__meses`, com o rótulo `M1 a M2`...`M11 a M12` alinhado à direita.
  - Primeira linha com `border-top: 1px solid var(--grafite)`.
- Fechamento: `margin-top: 3.5rem`, colunas 7 / span 6, Geologica 300 1.125rem / 1.7. A frase "O primeiro ciclo termina com o produto no ar e a estrutura base do negócio montada." vai em Caslon 1.25em.

### Tipografia
- `.track__nome`: Caslon 400, `clamp(1.5rem, 1.2rem + 1vw, 2.125rem)` / 1.1.
- `.track__texto`: Geologica 300, 1rem / 1.6, cor `var(--texto-suave)`, que vai a grafite quando o track fica ativo.
- `.track__meses`: rótulo 0.625rem.

### Cores
- **Ardósia (um elemento):** o nó "Produto no ar" e o rótulo em itálico dele. `.secao__num` "06" usa `--neutro`.
- Ciclo inativo: `var(--vazio)`. Ciclo ativo: `#2A2A2A`, com o número em `#E9E2D3` e os ticks em osso 50%.
- Track ativo: número e texto em `#2A2A2A` e fundo `linear-gradient(90deg, #F7F3EA, rgba(247,243,234,0))`.

### Elementos Visuais
- A régua é o elemento-assinatura da seção. Os ticks e os quadradinhos de gestão repetem a linguagem do símbolo.

### Animações
- **Track ativo por scroll:** IntersectionObserver com `rootMargin: -40% 0px -55% 0px`. O track que cruza a faixa recebe `.is-ativo`, e o ciclo correspondente na régua recebe `.is-ativo`.
  - Transições de 400ms `--ease` em `background-color` e `color`.
- **Régua na entrada:** os seis ciclos preenchem da esquerda para a direita, `scaleX(0)` → `1` com origem à esquerda, 500ms e 80ms de stagger.
  - O nó "Produto no ar" aparece 600ms depois do segundo ciclo, com `scale(0)` → `1` em 400ms `--ease` e o rótulo em fade.
- **Pulso do nó:** a cada 4s, um anel quadrado de 9px cresce até 21px, com borda 1px ardósia indo de `opacity 0.6` a `0`, em 1.6s. Para no reduced-motion.

### Interatividade
- Hover num track: o track passa a ativo (sobrepõe o ativo do scroll enquanto houver hover) e o ciclo dele acende.
- Hover num ciclo da régua: ativa o track correspondente e mostra um tooltip com o nome do track (mesmo estilo do tooltip da seção 04).
- Clique num ciclo: rola até o track, com `block: 'center'`.

### Responsividade
- **<1024px:** régua sem sticky, logo abaixo do H2.
  - Os ciclos ficam com 22px de altura e sem os números.
  - Os rótulos dos meses mostram só `M1`, `M3`, `M5`, `M7`, `M9` e `M11`.
- **≤760px:**
  - A régua cabe em 100%: 12 colunas de cerca de 28px e rótulos `M2`, `M4`...`M12` a 0.5625rem.
  - A lista de tracks vira bloco:
    - Linha 1: número e nome, lado a lado (`gap: 0.75rem`).
    - Linha 2: texto.
    - Linha 3: meses.
  - Sem hover. O track ativo vem só do scroll.
  - Fechamento com 100% de largura.

---

## Seção 8: O board (07 · O board)

### Arquétipo e Constraints
- Arquétipo: **Broken Grid em cruz** (grade de 3x3 em que o board ocupa as quatro posições do símbolo).
- Constraints: Imagem Dessaturada (Mídia), Hover Reveal (Interação), Cursor Custom (Interação), Mask Reveal (Movimento).
- Justificativa: o símbolo da marca é o board em volta de um caso. Aqui ele vira o layout literal: os quatro mentores nas posições dos quadrantes e o fellow no centro vazio. É o momento mais memorável da página.

### Conteúdo
- Cabeçalho: `07` · `O board`
- H2: `Quatro mentores, <em>quatro áreas do negócio.</em>`
- Introdução: "Quatro pessoas que constroem e operam negócios de educação médica e de software, cada uma responsável por uma parte do sistema."
- Mentores, com posição e ordem alfabética igual à ordem do DOM:
  - **Topo:** Fabrissio Portelinha · `Visão médica, lançamentos e marketing digital` · "Médico, sócio-fundador da MEDsimple, empresa de educação médica onde responde por produto, lançamentos e marketing. Conduz a anamnese de entrada e decide com o fellow o produto, a oferta e o modelo de venda." · foto `/images/board/fabrissio.jpg`
  - **Esquerda:** Gabriel Buzzi · `Inteligência artificial, plataformas, tecnologia e negócio` · "Programador e fundador de empresas de software por assinatura. Analisa a empresa do fellow como um todo, da tecnologia ao processo, e desenha com ele a operação." · foto `/images/board/gabriel.jpg`
  - **Direita:** Victor Viana · `Tráfego e automações` · "Há seis anos à frente do marketing e do time de vendas da MEDsimple, empresa de educação médica. Nas sessions dele, o fellow define funil, campanhas, criativos e as automações que sustentam a venda." · foto `/images/board/victor.jpg`
  - **Base:** Vinícius Tristão · `Gestão` · "Médico, sócio-fundador da MEDsimple, empresa de educação médica onde responde pela gestão: financeiro, indicadores e time. Fecha cada ciclo de dois meses com caixa e margem, e conduz a delegação no segundo semestre." · foto `/images/board/vinicius.jpg`
- Centro (o caso): rótulo `O caso` + a frase de fechamento "O fellow vê cada mentor a cada dois meses e fala com os quatro na sala de staff ao longo de toda a cohort."

### Layout
- `section.board#board`, fundo `#E9E2D3`, `padding: var(--secao-py) 0`.
- Cabeçalho de seção.
- **Desktop ≥1024px:** `.board__cruz` em grid `grid-template-columns: 1fr 1fr 1fr; grid-template-rows: auto auto auto; gap: 12px; margin-top: 3.5rem`.
  - Célula (1,1), canto superior esquerdo: H2 + introdução. Sem fundo, com `padding-right: 2rem` e `align-self: end`.
  - Célula (1,2): mentor do topo.
  - Célula (1,3): vazia (`aria-hidden`). Contém apenas uma hairline diagonal decorativa `var(--linha)`, de canto a canto.
  - Célula (2,1): mentor da esquerda.
  - Célula (2,2): o centro. Fundo transparente e borda tracejada de 1px, com `border: 1px dashed rgba(42,42,42,0.25)`, grid centralizado e `padding: 2rem`.
    - No meio, um quadrado de 56px com borda de 1px grafite: é o lugar do fellow.
    - Abaixo, o rótulo `O caso` e o texto de fechamento.
    - Quatro hairlines de 1px `var(--linha)` saem do quadrado central até as bordas da célula, nas quatro direções. Elas se conectam visualmente aos mentores.
  - Célula (2,3): mentor da direita.
  - Célula (3,1): vazia, com a hairline diagonal espelhada.
  - Célula (3,2): mentor da base.
  - Célula (3,3): vazia. Contém o mini-símbolo de 40px com o quadrante do mentor em foco em destaque, e a legenda `Em foco: <nome>` no estilo de rótulo.
- **Card de mentor** (`article.mentor`): fundo `#F7F3EA`, flex coluna, `padding: 1.25rem`, `position: relative`.
  - `.mentor__foto`: `aspect-ratio: 4 / 5`, `overflow: hidden`, fundo `#E9E2D3`.
    - `img` com `object-fit: cover`, `object-position: center 20%`, `filter: grayscale(1) contrast(1.05)` e `mix-blend-mode: multiply`.
    - Máscara `radial-gradient(ellipse 85% 80% at 50% 38%, #000 55%, rgba(0,0,0,.4) 82%, transparent 100%)`.
  - `.mentor__quadrante`: quadrado de 12px, absoluto em `top: 1.25rem; right: 1.25rem`. A posição dentro de um mini-símbolo mostra o lugar do mentor na cruz: um SVG de 22px com os quatro rects, o dele em `#2A2A2A` e os outros em `var(--vazio)`.
  - Texto abaixo da foto, `margin-top: 1.25rem`:
    - `h3.mentor__nome`.
    - `p.mentor__area` (rótulo).
    - `p.mentor__bio`.

### Tipografia
- `.mentor__nome`: Caslon 400, `clamp(1.375rem, 1.2rem + 0.6vw, 1.75rem)`.
- `.mentor__area`: rótulo 0.6875rem, `margin-top: 0.4rem`.
- `.mentor__bio`: Geologica 300, 0.9375rem / 1.6, `margin-top: 0.9rem`, cor `var(--texto-suave)`.
- Texto do centro: Caslon 400 itálico, `clamp(1.125rem, 1rem + 0.4vw, 1.375rem)` / 1.4, centralizado, `max-width: 22ch`.

### Cores
- **Ardósia (um elemento):** o quadrante do mentor em foco, no card dele e no mini-símbolo da célula (3,3). São o mesmo elemento lógico.
  - O foco começa no Fabrissio (topo), que conduz a anamnese, e depois segue o hover.
  - `.secao__num` "07" usa `--neutro`.
- Card em foco: fundo `#FBF8F1` e bio em `#2A2A2A`.

### Elementos Visuais
- Cruz 3x3 com centro vazio, hairlines de conexão e diagonais nas células vazias.
- Retratos reais dessaturados e dissolvidos.

### Animações
- **Entrada**, disparada quando `.board__cruz` chega a 20% do viewport:
  1. Os quatro cards entram em mask reveal na direção da posição de cada um: o do topo de cima para baixo, o da esquerda da esquerda, o da direita da direita, o da base de baixo para cima.
     - `clip-path: inset(...)` do lado externo, 1000ms `--ease-io`, com stagger de 120ms na ordem topo, esquerda, direita, base.
  2. As quatro hairlines do centro crescem do quadrado central para fora (`scaleX` e `scaleY` de 0 a 1), 800ms, com 500ms de atraso.
  3. O quadrado central aparece com `scale(0.6)` → `1` e `opacity`, 600ms, com 900ms de atraso.
  4. As diagonais se desenham em 1200ms, com 700ms de atraso.
- Dentro de cada card, a foto faz zoom de `scale(1.1)` a `scale(1)` em 1600ms, junto com o reveal.

### Interatividade
- **Foco:** hover ou focus-within num card aplica `.is-foco`.
  - O fundo vai a `#FBF8F1`.
  - A foto vai a `grayscale(0.85)` e `brightness(1.05)`.
  - O quadrante do card e o da célula (3,3) ficam ardósia, com transição de 400ms.
  - A hairline que liga o centro àquele card fica grafite sólida.
  - A legenda da (3,3) troca para `Em foco: Fabrissio Portelinha` e o nome correspondente, com fade de 250ms.
- **Cursor custom** (pointer fine, só em cima dos cards):
  - O cursor nativo fica oculto (`cursor: none`) e um `.cursor-cruz` fixo, de 28px, segue o mouse com lerp 0.2.
  - O `.cursor-cruz` é o símbolo desenhado só em hairlines de 1px `#2A2A2A`: uma cruz com o centro vazio.
  - Ao entrar num card, o cursor gira 90° em 400ms.
  - Sobre os links, volta ao cursor nativo.
- Sem mouse, o foco gira sozinho a cada 4s (topo → esquerda → direita → base), só quando a seção está no viewport e não há hover recente nos últimos 6s.

### Responsividade
- **≤1024px e >760px:** grade 2x2 dos mentores. A célula do H2 fica acima, com span 2. A célula central vira uma faixa com span 2 abaixo dos cards, sem hairlines e com o texto do centro alinhado à esquerda. As células vazias somem.
- **≤760px:** coluna única com o H2, os quatro cards e a faixa do caso.
  - Cada card fica em linha: foto de 96px (`aspect-ratio: 1`) à esquerda e texto à direita.
  - O mini-quadrante continua no canto.
  - Sem cursor custom. O foco segue o scroll: o card cruzando o centro do viewport ganha `.is-foco`.

---

## Seção 9: Critérios (08 · Critérios)

### Arquétipo e Constraints
- Arquétipo: **Framed Content** (um parecer em papel, enquadrado).
- Constraints: Nested Frames (Layout), Clip Reveal (Movimento), Mixed Fonts (Tipografia), Split Vertical interno (Layout).
- Justificativa: o Brand Guide pede uma marca seletiva, que fala tanto de para quem não é quanto de para quem é. Um documento de critérios com cara de parecer clínico torna a exclusão formal e elegante.

### Conteúdo
- Cabeçalho: `08` · `Critérios`
- H2: `Para quem é, <em>e para quem não é.</em>`
- Cabeçalho do documento (visual): `Critérios de entrada` · `Cohort 01`
- Coluna 1, título `É para médicos que`: "Têm o que ensinar, seja uma especialidade, uma técnica, um preparatório ou uma visão de carreira, em qualquer um dos três momentos: já vendendo, com audiência e sem produto, ou começando do zero. É preciso reservar uma session a cada quinze dias e executar a conduta entre elas."
- Coluna 2, título `Não é um programa para quem`: "Procura conteúdo gravado para assistir quando der, espera que alguém opere o negócio no seu lugar, ou busca promessa de faturamento com prazo. O board não faz esse tipo de promessa."
- Rodapé do documento (visual): uma linha de assinatura com `O board` embaixo.

### Layout
- `section.criterios`, fundo `#E9E2D3`, `padding: var(--secao-py) 0`.
- Cabeçalho de seção, e o H2 em 1 / span 7 com `margin-top: 3rem`.
- `.parecer`: `margin-top: 3.5rem`, colunas 2 / span 10, `position: relative`.
  - **Moldura externa:** fundo `#F7F3EA`, `padding: clamp(1.5rem, 3vw, 2.5rem)`.
  - **Moldura interna:** `border: 1px solid var(--linha)`, `padding: clamp(2rem, 4vw, 3.5rem)`.
  - Por trás da moldura, uma segunda folha: um pseudo-elemento `::before` com fundo `#F1EBDF`, deslocado `translate(10px, 10px)`, `z-index: -1`. O papel empilhado não usa sombra.
  - **Topo da moldura interna:** flex `space-between`, `padding-bottom: 1.25rem`, `border-bottom: 1px solid var(--grafite)`.
    - Esquerda: símbolo de 22px com o nome `Critérios de entrada` em Caslon 1.125rem.
    - Direita: rótulo `Cohort 01`.
  - **Corpo:** grid de duas colunas iguais com `column-gap: clamp(2rem, 5vw, 4.5rem)` e `margin-top: 2rem`, separadas por uma hairline vertical `var(--linha)` no meio (pseudo-elemento absoluto).
    - Cada coluna tem um `h3` e um `p`.
    - O título da coluna 1 é precedido pelo marcador `+`, e o da coluna 2 pelo `−`. Os dois são Caslon 1.5rem e iguais ao componente de FAQ do Brand Guide.
  - **Rodapé:** `margin-top: 3rem`, alinhado à direita.
    - Linha de assinatura de 180px x 1px `#2A2A2A`.
    - Abaixo, `O board` em Caslon itálico 1rem, `margin-top: 0.5rem`.
    - O mini-símbolo de 18px fica à esquerda da linha.

### Tipografia
- `h3` das colunas: Caslon 400, `clamp(1.375rem, 1.2rem + 0.6vw, 1.75rem)`.
- `p`: Geologica 300, 1.0625rem / 1.7. Na coluna 2, cor `var(--texto-suave)`.

### Cores
- **Ardósia (um elemento):** o marcador `+` da coluna 1. O `−` fica em `#2A2A2A` com 50% de opacidade. `.secao__num` "08" usa `--neutro`.
- Folhas: `#F7F3EA` e `#F1EBDF` (um linho meio tom abaixo, derivado da paleta).

### Elementos Visuais
- Papel empilhado, moldura dupla, linha de assinatura.

### Animações
- **Parecer:** `.revela-clip` de cima para baixo (`inset(0 0 100% 0)` → `0`), 1200ms `--ease-io`, como uma folha que se desenrola.
- A folha de trás entra 200ms depois, de `translate(0,0)` a `translate(10px,10px)`, em 600ms.
- As colunas do corpo entram com `.revela` 500ms depois, com 120ms de stagger.
- A linha de assinatura se desenha por `scaleX 0→1` com origem à esquerda, em 900ms, com 1100ms de atraso. `O board` aparece em fade depois.

### Interatividade
- Hover no parecer (pointer fine): a folha de trás vai a `translate(14px,14px)` e o parecer a `translate(-2px,-2px)`, 500ms `--ease`.
- Seleção de texto: fundo `#2A2A2A` e texto `#E9E2D3`, como no global.

### Responsividade
- **≤1024px:** parecer com span 12.
- **≤760px:**
  - Corpo em coluna única. A hairline vertical vira horizontal entre as colunas, com `margin: 2rem 0`.
  - Moldura externa com 0.75rem de padding e interna com 1.5rem.
  - Folha de trás em `translate(6px, 6px)`.
  - Rodapé alinhado à esquerda.

---

## Seção 10: Experiência (09 · Experiência)

### Arquétipo e Constraints
- Arquétipo: **Isolated Element** (um número enorme sozinho, em fundo escuro).
- Constraints: Dark Mode (Cor), Headline >150px (Tipografia), Stagger (Movimento), Imagem Recortada (Mídia, para as placas).
- Justificativa: é a prova, e ela precisa de peso sem gritar. Um número gigante com oito quadradinhos, um por dígito, mostra a escala de forma reservada, como pede o Brand Guide.

### Conteúdo
- Cabeçalho: `09` · `Experiência`
- H2: `A experiência <em>de quem conduz.</em>`
- Texto: "Fabrissio, Vinícius e Victor constroem e operam a MEDsimple, empresa de educação médica com mais de oito dígitos em vendas e placas de reconhecimento da Hotmart e da Guru. O Buzzi funda e opera empresas de software por assinatura."
- Número: `8 dígitos+` com a legenda `em vendas na MEDsimple`.
- Placas: `Hotmart` e `Guru` com a legenda `placas de reconhecimento das duas plataformas`.
  - Imagens em `/images/placas/hotmart.webp` e `/images/placas/guru.webp`. **Placeholder** até as fotos chegarem.

### Layout
- `section.prova`, fundo `#2A2A2A`, texto `#E9E2D3`, `padding: clamp(6rem, 12vw, 10rem) 0`, `overflow: hidden`, `position: relative`.
- Horizonte invertido no topo: a mesma grade do hero em `var(--osso-08)`, com `rotateX(-58deg)` e `transform-origin` no topo, ocupando os 30% superiores e sumindo para baixo. Sem linha de conduta.
- Cabeçalho de seção sobre grafite.
- Grade de 12 colunas, `margin-top: 3.5rem`:
  - Colunas 1 / span 7, o número:
    - `.prova__digitos`: fileira de oito quadrados de `clamp(14px, 1.4vw, 20px)` com `gap: 8px`, fill `var(--osso-08)`.
    - Abaixo, `p.prova__numero`: `8` em Caslon, com o estilo de número gigante e teto de 16rem, seguido de `dígitos+` em Caslon itálico com 28% do tamanho do 8, alinhado à base (`vertical-align: baseline`).
    - Legenda no estilo de rótulo `var(--osso-60)`, `margin-top: 1rem`.
  - Colunas 9 / span 4:
    - H2 (cor `#E9E2D3`), texto (Geologica 300 com `var(--osso-80)`, `margin-top: 1.5rem`) e, abaixo, as placas.
    - `.placas`: grid de duas colunas com `gap: 12px` e `margin-top: 2.5rem`.
      - Cada `figure.placa` tem `aspect-ratio: 4 / 5` e fundo `rgba(233,226,211,0.06)`.
      - **Com imagem:** `img` com `object-fit: contain`, `filter: grayscale(1) brightness(1.1)`, `mix-blend-mode: screen` e máscara radial igual à das fotos.
      - **Placeholder:** o nome da plataforma no centro, em Caslon 1.5rem `#E9E2D3`, com o rótulo `Placa de reconhecimento` embaixo. Moldura interna de 1px `var(--osso-14)` com inset de 10px.
      - `figcaption` com o nome, no estilo de rótulo `var(--osso-60)`.
    - Legenda geral abaixo das placas.

### Tipografia
- `8`: Caslon 400, `clamp(8rem, 4rem + 14vw, 16rem)`, line-height 0.85.
- `dígitos+`: Caslon 400 itálico, `0.28em` do tamanho do 8.
- Texto: Geologica 300 com 1.0625rem / 1.7.

### Cores
- Fundo `#2A2A2A`. Grade e dígitos vazios em `var(--osso-08)`. Dígitos preenchidos em `#E9E2D3`.
- **Ardósia (um elemento):** o oitavo quadrado da fileira, o último a preencher, que marca o "8". `.secao__num` "09" usa `--neutro` (`var(--osso-60)`).

### Elementos Visuais
- A fileira de oito dígitos em quadrados, o Horizonte invertido e as placas em moldura.

### Animações
- A fileira preenche da esquerda para a direita a 20% do viewport: cada quadrado vai de `var(--osso-08)` a `#E9E2D3` em 250ms, com 110ms de stagger. O oitavo vai a `#4F6D8F` por último, com 200ms extras.
- O `8` entra depois do quarto quadrado com máscara vertical (`translateY(100%)` → `0`, 1000ms `--ease`). `dígitos+` entra em fade quando o oitavo quadrado acende.
- As placas usam `.revela-clip` de baixo para cima, com 150ms de stagger. O H2 e o texto usam `.revela`.
- O Horizonte invertido desliza no sentido contrário ao do hero, em 30s linear infinito.

### Interatividade
- Hover numa placa (pointer fine): a placa sobe `translateY(-4px)` em 400ms `--ease` e a moldura interna fica `var(--osso-60)`.
- Clique numa placa com imagem abre um lightbox simples:
  - Overlay `rgba(28,28,28,0.94)` com a imagem `max-height: 86vh` centralizada.
  - Fecha com Esc, com clique fora ou com o botão `Fechar` (rótulo osso) no canto superior direito.
  - O foco fica preso no lightbox. Abre e fecha com fade de 250ms.
  - Sem imagem, não há clique.

### Responsividade
- **≤1024px:** número com span 12 e bloco de texto com span 12 abaixo, com as placas lado a lado.
- **≤760px:**
  - `8` com 9rem e quadrados de 14px.
  - Placas em duas colunas, com 1.125rem no placeholder.
  - Horizonte invertido com 20% de altura.

---

## Seção 11: Aplicação (10 · Aplicação)

### Arquétipo e Constraints
- Arquétipo: **Split Horizontal** (título e fechamento em cima, trilha de três etapas embaixo).
- Constraints: Draw SVG (Movimento), Stagger (Movimento), Hover Lift discreto (Interação), Bleed Both na linha (Layout).
- Justificativa: o processo é curto e linear. A linha de conduta atravessando a tela de ponta a ponta, com um degrau em cada etapa, fecha a metáfora da página: entrar no programa é o primeiro degrau.

### Conteúdo
- Cabeçalho: `10` · `Aplicação`
- H2: `A entrada <em>é por aplicação.</em>`
- Fechamento: "Cada cohort é pequena por definição, e a aplicação existe para que o board só assuma casos em que acredita."
- Etapas:
  1. `Formulário de aplicação` · "Três minutos: quem você é, o que ensina e onde o negócio está."
  2. `Conversa com um mentor do board` · "Um mentor entra em contato pelo WhatsApp em até [X] horas para discutir o seu caso. O investimento é apresentado nessa conversa."
  3. `Entrada na cohort` · "Quando o board entende que o negócio evolui em doze meses, você recebe a anamnese, entra na sala de staff e marca a primeira session."
- CTA: `Aplicar para a cohort 01` + o apoio "A aplicação leva três minutos e um mentor do board conversa com você antes de qualquer decisão."

### Layout
- `section.aplicacao#aplicar`, fundo `#F7F3EA`, `padding: var(--secao-py) 0`.
- Cabeçalho de seção.
- Topo: grade de 12 colunas, com o H2 em 1 / span 6 e o fechamento em 8 / span 5 (Caslon 1.375rem / 1.4, `align-self: end`).
- **Trilha:** `margin-top: clamp(4rem, 8vw, 6rem)`, `position: relative`, largura total do viewport (`width: 100vw; margin-inline: calc(50% - 50vw)`).
  - SVG `.trilha__linha` em `position: absolute; inset: 0 0 auto 0; height: 120px`, `viewBox="0 0 1440 120"`, `preserveAspectRatio="none"`.
    - Path: `M0 100 L360 100 L400 70 L720 70 L760 40 L1080 40 L1120 10 L1440 10`.
  - Container por cima, com `padding-top: 140px` e grid de três colunas iguais com `gap: 1.5rem`.
    - Cada `.passo` tem `border-top: 1px solid var(--linha)`, `padding-top: 1.5rem` e `position: relative`.
    - Um nó quadrado de 9px fica posicionado no degrau correspondente da linha (x 400, 760 e 1120 convertidos para o container: `left: 0` de cada coluna, `top: -` a distância até o degrau). Implementação: cada nó absoluto em relação à trilha, com `left: 27.78%`, `52.78%` e `77.78%` e `top: 58.3%`, `33.3%` e `8.3%` dos 120px.
    - `.passo__num` em Caslon itálico 1.25rem (`1.`, `2.`, `3.`), `h3.passo__nome` e `p.passo__texto`.
- CTA: `margin-top: 4rem`, flex com `gap: 1.75rem` e `align-items: center`, o botão primário e o apoio (0.875rem, cor suave, `max-width: 22rem`).

### Tipografia
- `.passo__nome`: Caslon 400, `clamp(1.375rem, 1.2rem + 0.6vw, 1.75rem)`, `margin-top: 0.5rem`.
- `.passo__texto`: Geologica 300, 1rem / 1.65, `margin-top: 0.75rem`, `max-width: 30ch`.
- `[X]` fica visível como placeholder e é trocado antes de publicar.

### Cores
- Fundo `#F7F3EA`.
- **Ardósia (um elemento):** a linha da trilha e o nó da etapa 3, que tem fill ardósia. Os nós 1 e 2 são grafite. `.secao__num` "10" usa `--neutro`.

### Elementos Visuais
- A linha de conduta em escada ascendente, de borda a borda da tela.

### Animações
- A linha se desenha por clip da esquerda para a direita em 2600ms `--ease-io`, a 25% do viewport.
- Cada nó aparece (`scale 0→1`, 300ms) quando a linha passa por ele: aos 700ms, 1300ms e 1900ms.
- Cada `.passo` entra com `.revela` junto com o nó dele.
- O botão do CTA pulsa uma vez quando a linha termina: um contorno de 1px grafite cresce 6px e some em 900ms. Acontece uma vez só.

### Interatividade
- Hover num passo (pointer fine): `border-top-color` vai a `#2A2A2A`, o passo sobe `translateY(-3px)` e o nó dele cresce para 13px, 300ms `--ease`.
- Botão com os estados padrão.

### Responsividade
- **≤1024px:** a trilha continua horizontal, com os passos em três colunas mais estreitas e texto de 0.9375rem.
- **≤760px:** a trilha fica vertical.
  - SVG absoluto à esquerda, `width: 60px`, `viewBox="0 0 60 900"`, path `M10 0 L10 250 L30 290 L30 540 L50 580 L50 900`.
  - Os passos ficam empilhados com `padding-left: 4.5rem`, `padding-top: 0` e `border-top` só a partir do segundo.
  - Os nós acompanham o topo de cada passo.
  - A linha desenha de cima para baixo.
  - O CTA fica em coluna, com o botão em 100% da largura.

---

## Seção 12: Perguntas (11 · Perguntas)

### Arquétipo e Constraints
- Arquétipo: **Editorial com índice** (índice fixo à esquerda e respostas à direita).
- Constraints: Sticky Element (Layout), Hover Underline (Interação), Selective Color (Cor), Scroll Triggered (Movimento).
- Justificativa: onze perguntas pedem navegação, não só um acordeão. O índice mostra tudo de uma vez e marca onde o leitor está. As respostas seguem o componente de FAQ do Brand Guide, com `+` e `−` em Caslon.

### Conteúdo
- Cabeçalho: `11` · `Perguntas`
- H2: `Perguntas <em>frequentes.</em>`
- As 11 perguntas e respostas da copy, **nesta ordem**:
  1. É necessário já ter um produto para aplicar?
  2. É necessário ter audiência?
  3. Quanto tempo o programa exige? A resposta tem o placeholder `[60 a 90]`.
  4. Em quanto tempo o produto fica no ar?
  5. Quem conduz as sessions?
  6. As sessions são em grupo?
  7. As sessions são gravadas?
  8. Qual é o investimento?
  9. Há garantia?
  10. O programa aceita profissionais que não são médicos?
  11. Qual é a diferença para uma mentoria?
- Rodapé do índice (visual): `Outra dúvida? A conversa com o mentor existe para isso.` e o link `Aplicar` para `/aplicar/`.

### Layout
- `section.perguntas`, fundo `#E9E2D3`, `padding: var(--secao-py) 0`.
- Cabeçalho de seção.
- Grade de 12 colunas, `margin-top: 3.5rem`:
  - **Aside**, colunas 1 / span 4: `position: sticky; top: calc(var(--barra-h) + 2rem); align-self: start`.
    - Contém o H2 e o `nav.indice` (`<ol>`) com as 11 perguntas em links para `#p1`...`#p11`.
    - Cada link é um grid `1.75rem 1fr` com o número em Caslon itálico 0.875rem e o texto em Geologica 400 0.875rem / 1.45, cor `var(--texto-suave)`, `padding: 0.45rem 0` e `padding-left: 1.25rem`.
    - O marcador do item ativo (`.indice__marca`) é um quadrado de 8px, absoluto à esquerda, que desliza verticalmente até o item ativo (`transform: translateY(Ypx)`, 450ms `--ease`).
    - Rodapé do índice: `margin-top: 2rem`, `padding-top: 1.25rem`, `border-top: 1px solid var(--linha)`. Texto em Caslon itálico 1rem e link terciário `Aplicar` (0.75rem, caixa alta, +0.06em, sublinhado de 1px grafite).
  - **Lista**, colunas 6 / span 7: `border-top: 1px solid #2A2A2A`.
    - Cada item é um `<details class="pergunta" id="pN">` com `<summary>` e `<div class="resposta">`, e `border-bottom: 1px solid var(--linha-faq)`.
    - `summary`: grid `2.5rem 1fr 1.5rem`, `padding: 1.4rem 0`, `cursor: pointer`, `list-style: none` (esconder o marcador nativo com `::-webkit-details-marker { display:none }`).
      - Coluna 1: número em Caslon itálico 1rem com `opacity .45`.
      - Coluna 2: a pergunta.
      - Coluna 3: o sinal `+`/`−` em Caslon 1.5rem, alinhado à direita.
    - `.resposta`: `padding: 0 1.5rem 1.6rem 2.5rem`, com a resposta em Geologica 300 1.0625rem / 1.7 e `max-width: 52ch`.
    - A primeira pergunta abre por padrão (`open`).

### Tipografia
- Pergunta: Caslon 400, `clamp(1.125rem, 1rem + 0.4vw, 1.3125rem)` / 1.35.
- Resposta: Geologica 300.
- Índice: Geologica 400 0.875rem. O item ativo usa `#2A2A2A`.

### Cores
- **Ardósia (um elemento):** o marcador `.indice__marca` do índice. O sinal `−` da pergunta aberta usa ardósia **só no mobile**, onde o índice não aparece. No desktop o sinal aberto é `#2A2A2A`. `.secao__num` "11" usa `--neutro`.
- Hover na pergunta: o texto fica `#2A2A2A` e o fundo do summary vai a `rgba(247,243,234,0.6)`.

### Elementos Visuais
- O índice com marcador deslizante e os sinais em Caslon.

### Animações
- **Abertura e fechamento:** a altura anima com `interpolate-size: allow-keywords` e `details::details-content { transition: height 450ms var(--ease), content-visibility 450ms allow-discrete; height: 0; overflow: clip }` e `details[open]::details-content { height: auto }`.
  - Fallback em JS com `grid-template-rows: 0fr` → `1fr`.
  - O sinal gira `rotate(90deg)` durante a troca de `+` para `−` (os dois em spans sobrepostos com crossfade de 250ms).
- **Pergunta ativa:** IntersectionObserver com `rootMargin: -35% 0px -60% 0px` define o item ativo do índice e o marcador desliza até ele.
- Os itens da lista entram com `.revela` e 40ms de stagger.

### Interatividade
- Clique num item do índice: rola até a pergunta, com offset de `var(--barra-h) + 24px`, e a abre (`details.open = true`). O foco vai para o summary.
- Deep link: abrir a página com `#p4` já abre a pergunta 4.
- Link do índice: sublinhado cresce no hover (`scaleX 0→1`, 300ms).
- Teclado: summary com o foco visível padrão.

### Responsividade
- **≤1024px:** aside com span 4 e lista de 6 a 12.
- **≤760px:**
  - Sem aside sticky: o H2 fica em cima e o índice some.
  - Lista com 100% de largura. Summary com colunas `2rem 1fr 1.25rem`. Resposta com padding-left de 2rem.
  - O rodapé do índice aparece depois da lista.

---

## Seção 13: Final

### Arquétipo e Constraints
- Arquétipo: **Hero Dominante** (tela cheia de encerramento).
- Constraints: Scroll Progress (Movimento), Full Height (Layout), Perspective Grid (Layout), Morph Shape (Movimento).
- Justificativa: a página termina como começou, no Horizonte. Os quatro quadrantes, espalhados pelos cantos da tela, se juntam em volta do centro vazio conforme o leitor rola. É o board se reunindo em volta do caso dele no momento do convite.
- **Observação:** a copy ainda cita "órbitas do board" como fundo desta seção. Isso é da identidade antiga e fica substituído pelo Horizonte com a convergência. Atualizar a nota do `copy.md`.

### Conteúdo
- Rótulo: `Cohort 01`
- H2: `A cohort 01 está <em>com aplicações abertas.</em>`
- Texto: "Se você tem o que ensinar e prefere construir o negócio disso com supervisão, a aplicação é o primeiro passo. Um mentor do board conversa com você antes de qualquer decisão, sem compromisso até essa conversa. A cohort 01 começa em [data]."
- CTA: `Aplicar para a cohort 01`

### Layout
- `section.final`, fundo `#E9E2D3`, `position: relative`, `overflow: hidden`.
- **Desktop:** `.final__pin` com `height: 200vh`. Dentro, `.final__stage` com `position: sticky; top: 0; height: 100svh`, em grid centralizado.
- **Quatro quadrantes** (`.final__q`), absolutos, cada um com `width: clamp(3rem, 6vw, 5.5rem)` e `aspect-ratio: 1`, fill `#2A2A2A`:
  - Posição inicial (p=0): o topo em `top: 6%; left: 8%`, o da esquerda em `top: 70%; left: 4%`, o da direita em `top: 12%; right: 6%` e o da base em `bottom: 8%; right: 12%`. As coordenadas convertidas em `translate` a partir do centro ficam em variáveis `--x0`/`--y0`.
  - Posição final (p=1): os quatro formam o símbolo em volta do centro do bloco de texto.
    - Unidade `u = tamanho/12`.
    - Topo em `translate(-50%, -50%) translate(0, -14u - 50%)` e o equivalente para cada quadrante, com o afastamento de 2u do Brand Guide.
    - O símbolo final fica acima do H2, centrado horizontalmente, com `top: 18%` do stage.
  - Interpolação: `transform: translate(calc(var(--x0) * (1 - var(--p))), calc(var(--y0) * (1 - var(--p))))`, com `--p` vindo do progresso do pin, com easing aplicado em JS (`easeInOutCubic`).
  - Os quadrantes giram de 45° a 0° ao longo do trajeto.
  - O quadrante da direita troca de fill para ardósia quando p passa de 0.92, em 500ms.
- **Bloco de texto** (`.final__copy`): centralizado, `max-width: 44rem`, `text-align: center`, `margin-top: 22vh`.
  - Rótulo, H2 em Caslon com o estilo poster e teto de 5.5rem, texto de 1.125rem / 1.7 com `max-width: 36rem` e `margin: 1.5rem auto 0`, e o botão com `margin-top: 2.5rem`.
- **Horizonte na base:** o mesmo componente do hero (grade, véu, linha e nós), com `height: 34%`.
  - A linha deste Horizonte é o espelho da do hero: `M0 330 L500 330 L580 250 L1060 250 L1140 330 L1440 330`, com o degrau centrado sob o botão.
- O texto começa com `opacity 0.001` (sem sumir de verdade, por acessibilidade) e aparece quando p > 0.35.

### Tipografia
- H2: Caslon 400, `clamp(2.5rem, 1.2rem + 4.4vw, 5.5rem)` / 1.02. A parte em itálico fica em linha própria.
- Texto: Geologica 300.
- Rótulo: padrão.

### Cores
- Fundo `#E9E2D3`.
- **Ardósia (um elemento):** o quadrante da direita no fim da convergência. A linha do Horizonte deste bloco fica em **grafite 40%** (`rgba(42,42,42,0.4)`), não em ardósia, para manter a regra.

### Elementos Visuais
- Os quatro quadrantes em voo, o símbolo que se forma e o Horizonte.

### Animações
- **Progresso:** `p` vai de 0 a 1 ao longo de `pinHeight - stageHeight`, em rAF.
- **Texto:** `opacity` e `translateY` ligados a p, entre 0.35 e 0.6: de 24px para 0.
- **Botão:** aparece entre p 0.55 e 0.75. Quando p chega a 1, o botão ganha um brilho único: um contorno que cresce, como na seção 10.
- **Horizonte:** a grade desliza (24s). A linha se desenha por clip entre p 0.2 e 0.7.
- **Mobile (sem pin):** a convergência acontece uma vez, com IntersectionObserver a 30% do viewport, em 1600ms `--ease-io`. Os quadrantes saem de `translate(±40vw, ±30vh)` e chegam à posição final.

### Interatividade
- Hover no símbolo formado: o quadrante ardósia percorre as quatro posições uma vez (o rodízio), 600ms por passo.
- CTA com os estados padrão.

### Responsividade
- **<1024px ou pointer coarse:** sem pin, `min-height: 100svh`, com a animação única descrita em Animações.
- **≤760px:**
  - Quadrantes de 2.25rem. O símbolo final fica com `top: 10%`.
  - Texto com `margin-top: 16vh` e alinhado à esquerda (`text-align: left`), com o botão em 100% da largura.
  - Horizonte com 26% de altura.

---

## Seção 14: Rodapé

### Arquétipo e Constraints
- Arquétipo: **Minimal**.
- Constraints: Dark Mode (Cor), Hover Underline (Interação), Mixed Fonts (Tipografia).
- Justificativa: um fechamento discreto e institucional, com a assinatura completa.

### Conteúdo
- Assinatura em osso: símbolo + `Fellowship Digital`.
- Posicionamento: `O fellowship em negócios digitais para médicos.`
- Navegação: `O programa` (#programa) · `O board` (#board) · `Perguntas` (#p1) · `Aplicar` (/aplicar/) · `Instagram` (https://instagram.com/fellowshipdigital, `rel="noopener"`)
- Linha final: `© <ano> Fellowship Digital.` · `Política de privacidade` (/privacidade/)

### Layout
- `footer.rodape`, fundo `#1C1C1C`, texto `#E9E2D3`, `padding: clamp(3.5rem, 7vw, 5.5rem) 0 2rem`.
- Container, com a parte de cima em grade de 12 colunas:
  - Assinatura e posicionamento em 1 / span 5. O posicionamento vai em Caslon itálico 1.25rem com `var(--osso-80)` e `margin-top: 1.25rem`.
  - Navegação em 8 / span 5, com os links em coluna e `gap: 0.6rem`.
- Linha final: `margin-top: 3.5rem`, `padding-top: 1.5rem`, `border-top: 1px solid var(--osso-14)`, flex `space-between`, em Geologica 400 0.8125rem com `var(--osso-60)`.

### Tipografia
- Links: Geologica 400, 0.9375rem, `var(--osso-80)`. No hover, `#E9E2D3`.
- Nome da assinatura: Caslon 1.25rem.

### Cores
- Fundo `#1C1C1C`. O quadrante ardósia do símbolo é o único destaque (**ardósia, um elemento**), e os outros quadrantes ficam em `#E9E2D3`.

### Animações e Interatividade
- Links com sublinhado de 1px osso crescendo da esquerda, 300ms.
- **Easter egg:** passar o mouse sobre o símbolo do rodapé faz o quadrante ardósia percorrer as quatro posições (600ms por passo) e mostra, ao lado, o rótulo `session 01`, `session 02`, `session 03`, `session 04`, que troca junto com o quadrante. Ao sair, ele volta à direita.
- O ano é preenchido por JS: `new Date().getFullYear()`.

### Responsividade
- **≤760px:** coluna única com a navegação em duas colunas (`grid-template-columns: 1fr 1fr`) e a linha final em coluna com `gap: 0.5rem`.

---

## 15. Head, SEO e desempenho

- `<title>` e meta description como na copy. Na lp-v2, `<meta name="robots" content="noindex">` fica até ela substituir a raiz.
- Favicon `/lp-v2/favicon.svg` (já existe). `theme-color` `#E9E2D3`.
- Fontes: um único link do Google Fonts (Geologica 300/400/500 e Libre Caslon Text 400 e 400 itálico), com `display=swap`, mais `preconnect`.
- Imagens via `/.netlify/images?url=...&w=...&q=80`, com `width` e `height` explícitos e `loading="lazy"`, exceto nada no hero, que não tem imagem.
- Sem bibliotecas. `script.js` único com `defer`, organizado em módulos: barra, reveal, contador, rodízio do hero, para quem, ciclo, entregas, ementa, board, prova, trilha, perguntas, final e rodapé.
- Toda leitura de scroll acontece em um único `requestAnimationFrame` compartilhado. Nada de listener com trabalho pesado.
- Assets com `?v=` atualizado a cada deploy, por causa do cache imutável do `netlify.toml`.
- Acessibilidade:
  - Contraste do texto `#2A2A2A` sobre `#E9E2D3` acima de 11:1.
  - Elementos decorativos com `aria-hidden`.
  - Botões reais nos controles (nós do prontuário, símbolo do hero).
  - `details`/`summary` nativos.
  - Foco visível em tudo.
  - `prefers-reduced-motion` respeitado em todas as seções, conforme a seção 0.8.
- Meta de Lighthouse no mobile: 90 ou mais em Performance e 100 em Acessibilidade.

## 16. Resumo de arquétipos (verificação de variedade)

| # | Seção | Arquétipo | Constraints principais | Ardósia |
|---|---|---|---|---|
| — | Hero | Split Assimétrico | Perspective Grid, Draw SVG, Selective Color, Stagger, rodízio | Quadrante ativo |
| 01 | O programa | Editorial | Imagem Dessaturada, Sticky, Mixed Fonts, Clip Reveal | Número da seção |
| 02 | Para quem | Progressive Reveal | Sticky, Scroll Progress, Selective Color | Caso ativo |
| 03 | Os formatos | Poster | Dark Mode, Headline >150px, Stagger, Hover Reveal | Quadrante do fechamento |
| 04 | Como funciona | Scroll Storytelling | Sticky, Scroll Progress, Draw SVG, Clip Reveal | Linha do prontuário |
| 05 | Entregas | Bento Box | Stagger, Counter, Hover Fill, SVG | Nó "no ar" |
| 06 | A ementa | Data Dense | Sticky, Scroll Triggered, Hover Reveal | Nó "Produto no ar" |
| 07 | O board | Broken Grid em cruz | Imagem Dessaturada, Hover Reveal, Cursor Custom, Mask Reveal | Quadrante do mentor em foco |
| 08 | Critérios | Framed Content | Nested Frames, Clip Reveal, Split interno | Marcador "+" |
| 09 | Experiência | Isolated Element | Dark Mode, Headline >150px, Stagger, Imagem Recortada | Oitavo dígito |
| 10 | Aplicação | Split Horizontal | Draw SVG, Stagger, Bleed Both | Linha e nó 3 |
| 11 | Perguntas | Editorial com índice | Sticky, Hover Underline, Selective Color | Marcador do índice |
| — | Final | Hero Dominante | Scroll Progress, Full Height, Perspective Grid, Morph | Quadrante da direita |
| — | Rodapé | Minimal | Dark Mode, Hover Underline | Quadrante do símbolo |

Não há arquétipos iguais em seções consecutivas. São 14 blocos com 13 arquétipos diferentes; o Editorial aparece duas vezes, em 01 e 11, bem distantes.

## 17. Placeholders que continuam visíveis

- `[X]` horas (seção 10), `[60 a 90]` minutos (pergunta 3), `[data]` (final).
- Fotos das placas (seção 09): o placeholder tipográfico já está especificado.
- `/privacidade/` ainda não existe.
