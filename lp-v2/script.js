/* ==========================================
   FELLOWSHIP DIGITAL - lp-v2
   Sem dependencias. Um unico loop de rAF para
   tudo que depende de scroll; IntersectionObserver
   para os reveals. Especificacao: /lp-v2/layout.md
   ========================================== */

(function () {
  'use strict';

  var root = document.documentElement;
  var mqReduz = window.matchMedia('(prefers-reduced-motion: reduce)');
  var mqPin = window.matchMedia('(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  var mqFino = window.matchMedia('(hover: hover) and (pointer: fine)');
  var mqMobile = window.matchMedia('(max-width: 760px)');
  var temIO = 'IntersectionObserver' in window;

  /* ---------- utilidades ---------- */

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function limita(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function interpola(a, b, t) { return a + (b - a) * t; }
  function suaviza(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function reduzido() { return mqReduz.matches; }

  /* Troca o texto de um span com saida para cima e entrada por baixo */
  function trocaTexto(el, novo, duracao) {
    if (!el || el.textContent === novo) return;
    if (reduzido()) { el.textContent = novo; return; }
    el.classList.add('is-saindo');
    window.setTimeout(function () {
      el.textContent = novo;
      el.classList.remove('is-saindo');
      el.classList.add('is-entrando');
      void el.offsetWidth;
      el.classList.remove('is-entrando');
    }, duracao || 250);
  }

  /* Observa elementos e chama cb uma vez quando entram */
  function aoEntrar(els, cb, margem) {
    if (!els.length) return;
    if (!temIO || reduzido()) {
      els.forEach(function (el) { cb(el); });
      return;
    }
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        obs.unobserve(e.target);
        cb(e.target);
      });
    }, { rootMargin: margem || '0px 0px -12% 0px', threshold: 0.1 });
    els.forEach(function (el) { obs.observe(el); });
  }

  /* Loop unico de scroll */
  var tarefasScroll = [];
  var tarefasMedida = [];
  var agendado = false;

  function executa() {
    agendado = false;
    for (var i = 0; i < tarefasScroll.length; i++) tarefasScroll[i]();
  }

  function agenda() {
    if (agendado) return;
    agendado = true;
    window.requestAnimationFrame(executa);
  }

  function aoRolar(fn) { tarefasScroll.push(fn); }
  function aoMedir(fn) { tarefasMedida.push(fn); }

  window.addEventListener('scroll', agenda, { passive: true });
  window.addEventListener('resize', function () {
    tarefasMedida.forEach(function (fn) { fn(); });
    agenda();
  });

  /* ==========================================
     REVEAL E CONTADORES
     ========================================== */

  function iniciaReveal() {
    /* Atraso escalonado por grupo (irmaos do mesmo pai) */
    var passos = { formatos__lista: 90, bento: 70, perguntas__lista: 40 };
    var grupos = new Map();
    $$('.revela, .revela-clip').forEach(function (el) {
      var pai = el.parentElement;
      if (!grupos.has(pai)) grupos.set(pai, []);
      grupos.get(pai).push(el);
    });
    grupos.forEach(function (itens, pai) {
      var passo = 70;
      Object.keys(passos).forEach(function (c) { if (pai.classList.contains(c)) passo = passos[c]; });
      itens.forEach(function (el, i) {
        if (!el.style.getPropertyValue('--atraso')) {
          el.style.setProperty('--atraso', (Math.min(i, passo === 40 ? 10 : 6) * passo) + 'ms');
        }
      });
    });

    function revela(el) {
      el.classList.add('is-visivel');
      $$('[data-conta]', el).forEach(conta);
      if (el.hasAttribute('data-sessions')) preencheSessions(el);
    }

    aoEntrar($$('.revela'), revela);

    /* Elementos com clip-path total nao disparam o IntersectionObserver:
       observa-se o pai e a classe vai para os filhos recortados */
    var paisClip = [];
    $$('.revela-clip, [data-parecer]').forEach(function (el) {
      if (paisClip.indexOf(el.parentElement) === -1) paisClip.push(el.parentElement);
    });
    aoEntrar(paisClip, function (pai) {
      Array.prototype.slice.call(pai.children).forEach(function (filho) {
        if (filho.classList.contains('revela-clip') || filho.hasAttribute('data-parecer')) revela(filho);
      });
    }, '0px 0px -15% 0px');

    /* Outros blocos com classe is-visivel */
    aoEntrar($$('[data-linhas], [data-monta], [data-digitos], [data-regua]'), function (el) {
      el.classList.add('is-visivel');
    }, '0px 0px -15% 0px');
  }

  /* Contador de 0 ate o valor */
  var contados = new WeakSet();

  function preparaContadores() {
    if (reduzido()) return;
    $$('[data-conta]').forEach(function (el) { el.textContent = '0'; });
  }

  function conta(el) {
    if (contados.has(el)) return;
    contados.add(el);
    var alvo = parseInt(el.getAttribute('data-conta'), 10) || 0;
    if (reduzido()) { el.textContent = String(alvo); return; }
    var dur = parseInt(el.getAttribute('data-conta-dur'), 10) || 900;
    var inicio = null;
    function passo(t) {
      if (inicio === null) inicio = t;
      var k = limita((t - inicio) / dur, 0, 1);
      var e = 1 - Math.pow(1 - k, 3);
      el.textContent = String(Math.round(alvo * e));
      if (k < 1) window.requestAnimationFrame(passo);
    }
    window.requestAnimationFrame(passo);
  }

  /* Fechamento da secao 02: reveal por palavras */
  function iniciaPalavras() {
    var el = $('[data-palavras]');
    if (!el) return;
    var indice = 0;

    function envolve(no, extra) {
      Array.prototype.slice.call(no.childNodes).forEach(function (filho) {
        if (filho.nodeType === 3) {
          var partes = filho.textContent.split(/(\s+)/);
          var frag = document.createDocumentFragment();
          partes.forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); return; }
            var s = document.createElement('span');
            s.className = 'palavra';
            s.textContent = p;
            s.style.setProperty('--atraso', (indice * 35 + extra) + 'ms');
            indice++;
            frag.appendChild(s);
          });
          no.replaceChild(frag, filho);
        } else if (filho.nodeType === 1) {
          envolve(filho, extra + 200);
        }
      });
    }

    envolve(el, 0);
    aoEntrar([el], function () { el.classList.add('is-visivel'); }, '0px 0px -20% 0px');
  }

  /* ==========================================
     0. BARRA FIXA
     ========================================== */

  function iniciaBarra() {
    var barra = $('[data-barra]');
    var hero = $('[data-hero]');
    if (!barra || !hero) return;
    var progresso = $('.barra__progresso', barra);
    var texto = $('[data-barra-texto]', barra);
    var fixas = $$('[data-fixa-barra]');
    var temTimeline = window.CSS && CSS.supports && CSS.supports('animation-timeline', 'scroll()');
    var ultimoY = window.scrollY;
    var visivel = false;

    function naZonaFixa() {
      var meio = window.innerHeight / 2;
      return fixas.some(function (s) {
        var r = s.getBoundingClientRect();
        return r.top < meio && r.bottom > meio;
      });
    }

    aoRolar(function () {
      var y = window.scrollY;
      var r = hero.getBoundingClientRect();
      var passouHero = r.bottom < window.innerHeight * 0.3;
      var delta = y - ultimoY;
      ultimoY = y;

      /* Aparece depois do hero; some ao descer rapido; volta ao subir;
         nunca some nas secoes de aplicacao e perguntas */
      if (!passouHero) {
        visivel = false;
      } else if (naZonaFixa()) {
        visivel = true;
      } else if (delta < 0) {
        visivel = true;
      } else if (delta > 12) {
        visivel = false;
      } else if (delta === 0) {
        visivel = true;
      }
      barra.classList.toggle('is-visivel', visivel);

      if (!temTimeline) {
        var total = document.documentElement.scrollHeight - window.innerHeight;
        progresso.style.setProperty('--p', total > 0 ? (y / total).toFixed(4) : 0);
      }
    });

    /* Indicador da secao atual */
    if (temIO) {
      var obs = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (e) {
          if (e.isIntersecting) trocaTexto(texto, e.target.getAttribute('data-secao'), 250);
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      $$('[data-secao]').forEach(function (s) { obs.observe(s); });
    }
  }

  /* ==========================================
     H. HERO: montagem, rodizio e parallax
     ========================================== */

  function iniciaHero() {
    var hero = $('[data-hero]');
    var cruz = $('[data-cruz]');
    if (!hero || !cruz) return;
    var area = $('[data-legenda-area]');
    var areas = { 1: 'Produto e oferta', 2: 'Tecnologia e operação', 3: 'Tráfego e automações', 4: 'Gestão' };
    var ativo = 3;
    var pausado = false;
    var heroVisivel = true;
    var timer = null;

    function mostra() {
      window.requestAnimationFrame(function () { root.classList.add('is-pronto'); });
    }
    if (document.readyState === 'complete') mostra();
    else window.addEventListener('load', mostra);

    function avanca() {
      ativo = ativo === 4 ? 1 : ativo + 1;
      cruz.setAttribute('data-ativo', String(ativo));
      var q = $('.q--' + ativo, cruz);
      if (q && !reduzido()) {
        q.classList.remove('is-pulso');
        void q.getBoundingClientRect();
        q.classList.add('is-pulso');
      }
      trocaTexto(area, areas[ativo], 450);
    }

    function ciclo() {
      if (!pausado && heroVisivel && !document.hidden) avanca();
    }

    if (!reduzido()) {
      window.setTimeout(function () {
        timer = window.setInterval(ciclo, 3200);
      }, 3200 + 1200);
    }

    cruz.addEventListener('mouseenter', function () { pausado = true; });
    cruz.addEventListener('mouseleave', function () { pausado = false; });
    cruz.addEventListener('click', avanca);
    cruz.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); avanca(); }
    });

    if (temIO) {
      new IntersectionObserver(function (entradas) {
        heroVisivel = entradas[0].isIntersecting;
      }).observe(hero);
    }

    /* Parallax sutil do simbolo e dos eixos */
    if (mqFino.matches && !reduzido()) {
      var eixos = $$('.cruz__eixo', cruz);
      var alvo = { x: 0, y: 0 };
      var atual = { x: 0, y: 0 };
      var rodando = false;

      function anima() {
        atual.x = interpola(atual.x, alvo.x, 0.08);
        atual.y = interpola(atual.y, alvo.y, 0.08);
        cruz.style.transform = 'translate3d(' + atual.x.toFixed(2) + 'px,' + atual.y.toFixed(2) + 'px,0)';
        eixos.forEach(function (e) {
          e.style.translate = (-atual.x / 2).toFixed(2) + 'px ' + (-atual.y / 2).toFixed(2) + 'px';
        });
        if (Math.abs(atual.x - alvo.x) > 0.05 || Math.abs(atual.y - alvo.y) > 0.05) {
          window.requestAnimationFrame(anima);
        } else {
          rodando = false;
        }
      }

      hero.addEventListener('pointermove', function (e) {
        var r = hero.getBoundingClientRect();
        alvo.x = ((e.clientX - r.left) / r.width - 0.5) * 12;
        alvo.y = ((e.clientY - r.top) / r.height - 0.5) * 12;
        if (!rodando) { rodando = true; window.requestAnimationFrame(anima); }
      });
      hero.addEventListener('pointerleave', function () {
        alvo.x = 0; alvo.y = 0;
        if (!rodando) { rodando = true; window.requestAnimationFrame(anima); }
      });
    }
  }

  /* ==========================================
     02. PARA QUEM
     ========================================== */

  function iniciaParaQuem() {
    var lista = $('[data-casos]');
    if (!lista) return;
    var casos = $$('.caso', lista);
    var contadores = $$('.contador__q');
    var rotulo = $('[data-caso-rotulo]');
    var fill = $('.paraquem__trilho-fill');
    var trilho = $('.paraquem__trilho');
    var romanos = ['I', 'II', 'III'];

    function ativa(i) {
      casos.forEach(function (c, k) { c.classList.toggle('is-ativo', k === i); });
      contadores.forEach(function (c, k) { c.classList.toggle('is-on', k === i); });
      if (rotulo) {
        rotulo.style.opacity = '0';
        window.setTimeout(function () {
          rotulo.textContent = 'Caso ' + romanos[i] + ' de III';
          rotulo.style.opacity = '1';
        }, reduzido() ? 0 : 200);
      }
    }

    if (temIO) {
      var obs = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (e) {
          if (e.isIntersecting) ativa(casos.indexOf(e.target));
        });
      }, { rootMargin: '-45% 0px -45% 0px' });
      casos.forEach(function (c) { obs.observe(c); });
    }

    casos.forEach(function (c) {
      c.addEventListener('click', function () {
        if (mqMobile.matches) return;
        c.scrollIntoView({ block: 'center', behavior: reduzido() ? 'auto' : 'smooth' });
      });
    });

    aoRolar(function () {
      if (!fill || !trilho || mqMobile.matches) return;
      var r = trilho.getBoundingClientRect();
      var p = limita((window.innerHeight / 2 - r.top) / r.height, 0, 1);
      fill.style.setProperty('--p', p.toFixed(4));
    });
  }

  /* ==========================================
     03. FORMATOS: marca d'agua em parallax
     ========================================== */

  function iniciaFormatos() {
    var marca = $('[data-parallax]');
    if (!marca || reduzido()) return;
    var secao = marca.closest('section');
    var fator = parseFloat(marca.getAttribute('data-parallax')) || 0.15;
    aoRolar(function () {
      var r = secao.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      var delta = r.top - window.innerHeight / 2;
      marca.style.transform = 'translate3d(0,' + (delta * -fator).toFixed(1) + 'px,0)';
    });
  }

  /* ==========================================
     04. COMO FUNCIONA: prontuario fixado
     ========================================== */

  function iniciaCiclo() {
    var pin = $('[data-ciclo]');
    if (!pin) return;
    var stage = $('.ciclo__stage', pin);
    var linha = $('[data-prontuario-linha]', pin);
    var prontuario = $('[data-prontuario]', pin);
    var nos = $$('.pnode', pin);
    var tempos = $$('.ptempo', pin);
    var etapas = $$('.etapa', pin);
    var numero = $('[data-etapa-num]', pin);
    var quemSimbolo = $('.quem__simbolo', pin);
    var quemRects = quemSimbolo ? $$('rect', quemSimbolo) : [];
    var quemTraco = $('.quem__traco', pin);
    var quemLegenda = $('[data-quem]', pin);
    var linhaVertical = $('[data-etapas-linha]', pin);
    var xs = [7.5, 18.33, 38.33, 58.33, 78.33, 100];
    var quem = {
      1: { on: [1, 2, 3, 4], texto: 'Board inteiro' },
      2: { on: [1], texto: 'Um mentor' },
      3: { on: [1], texto: 'Um mentor', traco: true },
      4: { on: [1, 2], texto: 'Próximo mentor' },
      5: { on: [1, 2, 3, 4], texto: 'Os quatro, na sala de staff', staff: true }
    };
    var atual = 0;

    /* Linhas verticais da grade milimetrada */
    var g = $('[data-verticais]', pin);
    if (g) {
      var ns = 'http://www.w3.org/2000/svg';
      for (var x = 60; x < 1200; x += 60) {
        var l = document.createElementNS(ns, 'line');
        l.setAttribute('x1', x); l.setAttribute('x2', x);
        l.setAttribute('y1', 0); l.setAttribute('y2', 220);
        g.appendChild(l);
      }
    }

    function defineEtapa(n) {
      if (n === atual) return;
      var anterior = atual;
      atual = n;
      stage.setAttribute('data-etapa', String(n));
      nos.forEach(function (no, i) {
        no.classList.toggle('is-on', i < n);
        no.classList.toggle('is-atual', i === n - 1);
      });
      tempos.forEach(function (t, i) { t.classList.toggle('is-atual', i === n - 1); });

      etapas.forEach(function (e, i) {
        var liga = i === n - 1;
        if (!liga && e.classList.contains('is-on')) {
          e.classList.remove('is-on');
          e.classList.add('is-saindo');
          window.setTimeout(function () { e.classList.remove('is-saindo'); }, 360);
        } else if (liga) {
          e.classList.add('is-on');
        }
      });

      if (numero && anterior) {
        numero.classList.add('is-entrando');
        numero.textContent = String(n);
        void numero.offsetWidth;
        numero.classList.remove('is-entrando');
      }

      var cfg = quem[n];
      quemRects.forEach(function (r) {
        r.classList.toggle('on', cfg.on.indexOf(parseInt(r.getAttribute('data-q'), 10)) > -1);
      });
      if (quemSimbolo) quemSimbolo.classList.toggle('is-staff', !!cfg.staff);
      if (quemTraco) quemTraco.classList.toggle('is-on', !!cfg.traco);
      if (quemLegenda) {
        quemLegenda.style.opacity = '0';
        window.setTimeout(function () {
          quemLegenda.textContent = cfg.texto;
          quemLegenda.style.opacity = '1';
        }, 250);
      }
    }

    function utilPin() { return pin.offsetHeight - stage.offsetHeight; }

    /* Modo fixado so no desktop com mouse e sem movimento reduzido.
       Fora dele o prontuario mostra a linha inteira e todos os nos. */
    var secaoCiclo = pin.closest('section');
    function modo() {
      secaoCiclo.classList.toggle('ciclo--fixo', mqPin.matches);
      if (!mqPin.matches) {
        linha.style.setProperty('--clip', '0%');
        nos.forEach(function (no) { no.classList.add('is-on'); no.classList.remove('is-atual'); });
        etapas.forEach(function (e) { e.classList.add('is-on'); });
      }
    }
    modo();
    if (mqPin.addEventListener) mqPin.addEventListener('change', function () { atual = 0; modo(); agenda(); });

    aoRolar(function () {
      if (mqPin.matches) {
        var r = pin.getBoundingClientRect();
        var util = utilPin();
        if (util <= 0) return;
        var p = limita(-r.top / util, 0, 0.99999);
        var k = Math.min(5, Math.floor(p * 5) + 1);
        var frac = p * 5 - (k - 1);
        var revela = xs[k - 1] + (xs[k] - xs[k - 1]) * frac;
        linha.style.setProperty('--clip', (100 - revela).toFixed(2) + '%');
        defineEtapa(k);
      } else if (linhaVertical) {
        var rv = linhaVertical.getBoundingClientRect();
        var pv = limita((window.innerHeight * 0.6 - rv.top) / rv.height, 0, 1);
        linhaVertical.style.setProperty('--lp', (pv * 100).toFixed(2) + '%');
      }
    });

    if (mqPin.matches) defineEtapa(1);

    /* Clique e teclado nos nos */
    function irPara(n) {
      if (!mqPin.matches) return;
      var topo = pin.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: topo + ((n - 1) / 5) * utilPin() + 2, behavior: 'smooth' });
    }

    nos.forEach(function (no) {
      no.addEventListener('click', function () { irPara(parseInt(no.getAttribute('data-ir'), 10)); });
    });

    if (prontuario) {
      prontuario.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); irPara(Math.min(5, atual + 1)); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); irPara(Math.max(1, atual - 1)); }
      });
    }

    /* Parallax da faixa de foto */
    var faixa = $('[data-parallax-img]');
    if (faixa && !reduzido()) {
      aoRolar(function () {
        var r = faixa.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        var prog = (r.top + r.height / 2 - window.innerHeight / 2) / (window.innerHeight / 2 + r.height / 2);
        faixa.style.setProperty('--py', (limita(prog, -1, 1) * -40).toFixed(1) + 'px');
      });
    }
  }

  /* ==========================================
     05. ENTREGAS: grade das 24 sessions
     ========================================== */

  function montaSessions() {
    var grade = $('[data-sessions-grade]');
    if (!grade) return;
    for (var i = 0; i < 24; i++) grade.appendChild(document.createElement('i'));

    var quadrados = $$('i', grade);
    quadrados.forEach(function (q, i) {
      q.addEventListener('mouseenter', function () {
        if (!mqFino.matches) return;
        quadrados.slice(i, i + 4).forEach(function (x) {
          x.classList.add('is-hover');
          window.setTimeout(function () { x.classList.remove('is-hover'); }, 400);
        });
      });
    });

    if (reduzido()) {
      quadrados.forEach(function (q, i) { q.classList.toggle('is-on', i % 4 === 0); });
    }
  }

  function preencheSessions(cel) {
    if (reduzido()) return;
    var quadrados = $$('[data-sessions-grade] i', cel);
    quadrados.forEach(function (q, i) {
      window.setTimeout(function () { q.classList.add('is-on'); }, 300 + i * 45);
    });
    var fim = 300 + quadrados.length * 45 + 400;
    window.setTimeout(function () {
      quadrados.forEach(function (q, i) { q.classList.toggle('is-on', i % 4 === 0); });
    }, fim);
  }

  /* ==========================================
     06. EMENTA: regua acoplada aos tracks
     ========================================== */

  function iniciaEmenta() {
    var tracks = $$('[data-tracks] .track');
    var ciclos = $$('.regua__ciclo');
    if (!tracks.length) return;
    var doScroll = 0;
    var doHover = 0;

    function aplica() {
      var n = doHover || doScroll;
      tracks.forEach(function (t) { t.classList.toggle('is-ativo', +t.getAttribute('data-track') === n); });
      ciclos.forEach(function (c) { c.classList.toggle('is-ativo', +c.getAttribute('data-track') === n); });
    }

    if (temIO) {
      var obs = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (e) {
          if (e.isIntersecting) { doScroll = +e.target.getAttribute('data-track'); aplica(); }
        });
      }, { rootMargin: '-40% 0px -55% 0px' });
      tracks.forEach(function (t) { obs.observe(t); });
    }

    tracks.forEach(function (t) {
      t.addEventListener('mouseenter', function () {
        if (!mqFino.matches) return;
        doHover = +t.getAttribute('data-track'); aplica();
      });
      t.addEventListener('mouseleave', function () { doHover = 0; aplica(); });
    });

    ciclos.forEach(function (c) {
      var n = +c.getAttribute('data-track');
      c.addEventListener('mouseenter', function () { doHover = n; aplica(); });
      c.addEventListener('mouseleave', function () { doHover = 0; aplica(); });
      c.addEventListener('focus', function () { doHover = n; aplica(); });
      c.addEventListener('blur', function () { doHover = 0; aplica(); });
      c.addEventListener('click', function () {
        var alvo = tracks[n - 1];
        if (alvo) alvo.scrollIntoView({ block: 'center', behavior: reduzido() ? 'auto' : 'smooth' });
      });
    });
  }

  /* ==========================================
     07. BOARD: foco, cursor em cruz e rodizio
     ========================================== */

  function iniciaBoard() {
    var cruzBoard = $('[data-board]');
    if (!cruzBoard) return;
    var secao = cruzBoard.closest('section');
    var mentores = $$('.mentor', cruzBoard);
    var simbolo = $('[data-foco-simbolo]', cruzBoard);
    var nome = $('[data-foco-nome]', cruzBoard);
    var linhas = $$('.centro__linha', cruzBoard);
    var centro = $('.board__centro', cruzBoard);
    var quadrado = $('.centro__quadrado', cruzBoard);
    var foco = 1;
    var ultimoHover = 0;
    var visivel = false;

    function defineFoco(n) {
      foco = n;
      mentores.forEach(function (m) { m.classList.toggle('is-foco', +m.getAttribute('data-mentor') === n); });
      if (simbolo) simbolo.setAttribute('data-ativo', String(n));
      linhas.forEach(function (l) { l.classList.toggle('is-foco', +l.getAttribute('data-linha') === n); });
      var m = mentores[n - 1];
      if (nome && m) {
        nome.style.opacity = '0';
        window.setTimeout(function () {
          nome.textContent = m.getAttribute('data-nome');
          nome.style.opacity = '1';
        }, 250);
      }
    }

    /* Posicao vertical do quadrado central para as hairlines */
    function mede() {
      if (!centro || !quadrado) return;
      centro.style.setProperty('--cy', (quadrado.offsetTop + quadrado.offsetHeight / 2) + 'px');
    }
    window.requestAnimationFrame(mede);
    aoMedir(mede);
    window.addEventListener('load', function () { window.requestAnimationFrame(mede); });

    aoEntrar([cruzBoard], function () { cruzBoard.classList.add('is-visivel'); }, '0px 0px -20% 0px');

    mentores.forEach(function (m) {
      var n = +m.getAttribute('data-mentor');
      m.addEventListener('mouseenter', function () { ultimoHover = Date.now(); defineFoco(n); });
      m.addEventListener('focusin', function () { ultimoHover = Date.now(); defineFoco(n); });
    });

    if (temIO) {
      new IntersectionObserver(function (entradas) {
        visivel = entradas[0].isIntersecting;
      }).observe(cruzBoard);

      /* Mobile: o foco segue o scroll */
      var obsMob = new IntersectionObserver(function (entradas) {
        if (!mqMobile.matches) return;
        entradas.forEach(function (e) {
          if (e.isIntersecting) defineFoco(+e.target.getAttribute('data-mentor'));
        });
      }, { rootMargin: '-45% 0px -45% 0px' });
      mentores.forEach(function (m) { obsMob.observe(m); });
    }

    /* Rodizio automatico quando ninguem esta com o mouse */
    if (!reduzido()) {
      window.setInterval(function () {
        if (!visivel || mqMobile.matches || document.hidden) return;
        if (Date.now() - ultimoHover < 6000) return;
        defineFoco(foco === 4 ? 1 : foco + 1);
      }, 4000);
    }

    /* Cursor em cruz sobre os cards */
    var cursor = $('[data-cursor]');
    if (cursor && mqFino.matches && !reduzido()) {
      secao.classList.add('tem-cursor');
      var alvo = { x: 0, y: 0 };
      var pos = { x: 0, y: 0 };
      var ativo = false;

      function segue() {
        pos.x = interpola(pos.x, alvo.x, 0.2);
        pos.y = interpola(pos.y, alvo.y, 0.2);
        cursor.style.transform = 'translate3d(' + pos.x.toFixed(1) + 'px,' + pos.y.toFixed(1) + 'px,0)';
        if (ativo) window.requestAnimationFrame(segue);
      }

      mentores.forEach(function (m) {
        m.addEventListener('mouseenter', function (e) {
          alvo.x = pos.x = e.clientX;
          alvo.y = pos.y = e.clientY;
          cursor.classList.add('is-visivel');
          cursor.classList.add('is-girado');
          if (!ativo) { ativo = true; window.requestAnimationFrame(segue); }
        });
        m.addEventListener('mousemove', function (e) {
          alvo.x = e.clientX;
          alvo.y = e.clientY;
        });
        m.addEventListener('mouseleave', function () {
          cursor.classList.remove('is-visivel');
          cursor.classList.remove('is-girado');
          ativo = false;
        });
      });
    }
  }

  /* ==========================================
     09. EXPERIENCIA: lightbox das placas
     ========================================== */

  function iniciaPlacas() {
    $$('[data-placa]').forEach(function (placa) {
      var img = $('img', placa);
      if (!img) return;
      var ph = $('.placa__ph', placa);
      if (ph) ph.remove();
      placa.classList.add('placa--clicavel');
      var moldura = $('.placa__moldura', placa);
      moldura.setAttribute('role', 'button');
      moldura.setAttribute('tabindex', '0');
      moldura.setAttribute('aria-label', 'Ampliar ' + img.alt);
      function abre() { abreLightbox(img); }
      moldura.addEventListener('click', abre);
      moldura.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abre(); }
      });
    });
  }

  function abreLightbox(img) {
    var origem = document.activeElement;
    var box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', img.alt);
    var grande = document.createElement('img');
    grande.src = img.src.replace(/w=\d+/, 'w=1400');
    grande.alt = img.alt;
    var fechar = document.createElement('button');
    fechar.type = 'button';
    fechar.className = 'lightbox__fechar';
    fechar.textContent = 'Fechar';
    box.appendChild(grande);
    box.appendChild(fechar);
    document.body.appendChild(box);
    window.requestAnimationFrame(function () { box.classList.add('is-aberto'); });
    fechar.focus();

    function fecha() {
      box.classList.remove('is-aberto');
      document.removeEventListener('keydown', tecla);
      window.setTimeout(function () { box.remove(); if (origem) origem.focus(); }, 250);
    }
    function tecla(e) {
      if (e.key === 'Escape') fecha();
      if (e.key === 'Tab') { e.preventDefault(); fechar.focus(); }
    }
    box.addEventListener('click', function (e) { if (e.target !== grande) fecha(); });
    document.addEventListener('keydown', tecla);
  }

  /* ==========================================
     10. APLICACAO: trilha
     ========================================== */

  function iniciaTrilha() {
    var trilha = $('[data-trilha]');
    if (!trilha) return;
    var passos = $$('.passo', trilha);
    var nos = $$('.trilha__no', trilha);
    var botao = $('.btn--pulso', trilha);

    aoEntrar([trilha], function () {
      trilha.classList.add('is-visivel');
      passos.forEach(function (p) {
        var d = parseInt(p.style.getPropertyValue('--d'), 10) || 0;
        window.setTimeout(function () { p.classList.add('is-pronto'); }, reduzido() ? 0 : d + 900);
      });
      if (botao && !reduzido()) {
        window.setTimeout(function () {
          botao.classList.add('is-pulsando');
          window.setTimeout(function () { botao.classList.remove('is-pulsando'); }, 950);
        }, 2600);
      }
    }, '0px 0px -25% 0px');

    passos.forEach(function (p, i) {
      p.addEventListener('mouseenter', function () { if (nos[i]) nos[i].classList.add('is-hover'); });
      p.addEventListener('mouseleave', function () { if (nos[i]) nos[i].classList.remove('is-hover'); });
    });
  }

  /* ==========================================
     11. PERGUNTAS: indice com marcador
     ========================================== */

  function iniciaPerguntas() {
    var indice = $('[data-indice]');
    var lista = $('[data-perguntas]');
    if (!lista) return;
    var perguntas = $$('.pergunta', lista);
    var links = indice ? $$('a', indice) : [];
    var marca = indice ? $('.indice__marca', indice) : null;

    function ativa(id) {
      links.forEach(function (a) {
        var liga = a.getAttribute('href') === '#' + id;
        a.classList.toggle('is-ativo', liga);
        if (liga && marca) {
          var li = a.parentElement;
          marca.style.setProperty('--y', (li.offsetTop + a.offsetHeight / 2 - 4) + 'px');
        }
      });
    }

    if (temIO && links.length) {
      var obs = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (e) { if (e.isIntersecting) ativa(e.target.id); });
      }, { rootMargin: '-35% 0px -60% 0px' });
      perguntas.forEach(function (p) { obs.observe(p); });
      window.requestAnimationFrame(function () { ativa('p1'); });
    }

    function abre(id, rolar) {
      var d = document.getElementById(id);
      if (!d || !d.classList.contains('pergunta')) return;
      d.open = true;
      if (rolar) {
        d.scrollIntoView({ block: 'start', behavior: reduzido() ? 'auto' : 'smooth' });
        var s = $('summary', d);
        if (s) s.focus({ preventScroll: true });
      }
      ativa(id);
    }

    $$('a[href^="#p"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href').slice(1);
        if (!/^p\d+$/.test(id)) return;
        e.preventDefault();
        abre(id, true);
        if (window.history && history.replaceState) history.replaceState(null, '', '#' + id);
      });
    });

    if (/^#p\d+$/.test(window.location.hash)) {
      window.setTimeout(function () { abre(window.location.hash.slice(1), true); }, 300);
    }
  }

  /* ==========================================
     F. FINAL: quadrantes convergindo
     ========================================== */

  function iniciaFinal() {
    var pin = $('[data-final]');
    if (!pin) return;
    var stage = $('[data-final-stage]', pin);
    var qs = $$('.final__q', pin);
    var copy = $('[data-final-copy]', pin);
    var acao = $('[data-final-acao]', pin);
    var linha = $('[data-final-linha]', pin);
    var botao = acao ? $('.btn', acao) : null;
    var geo = null;
    var ultimoP = -1;
    var pulsou = false;
    var ardosia = 3;
    var alvoHover = null;

    function mede() {
      var W = stage.clientWidth;
      var H = stage.clientHeight;
      var mobile = mqMobile.matches;
      var s = mobile ? 36 : limita(W * 0.034, 36, 52);
      var S0 = s * 1.8;
      var u = s / 12;
      var cx = W / 2;
      var cy = H * (mobile ? 0.14 : 0.17);
      geo = {
        s: s,
        final: [
          { x: cx, y: cy - 14 * u },
          { x: cx - 14 * u, y: cy },
          { x: cx + 14 * u, y: cy },
          { x: cx, y: cy + 14 * u }
        ],
        inicio: [
          { x: W * 0.08 + S0 / 2, y: H * 0.06 + S0 / 2 },
          { x: W * 0.04 + S0 / 2, y: H * 0.70 + S0 / 2 },
          { x: W - W * 0.06 - S0 / 2, y: H * 0.12 + S0 / 2 },
          { x: W - W * 0.12 - S0 / 2, y: H - H * 0.08 - S0 / 2 }
        ],
        caixa: { x: cx - 20 * u, y: cy - 20 * u, l: 40 * u }
      };
      qs.forEach(function (q) { q.style.setProperty('--s', s + 'px'); });
      if (alvoHover) posicionaAlvo();
      ultimoP = -1;
      desenha(ultimoValor);
    }

    var ultimoValor = reduzido() ? 1 : 0;

    function desenha(p) {
      ultimoValor = p;
      if (!geo || p === ultimoP) return;
      ultimoP = p;
      var e = suaviza(p);
      qs.forEach(function (q, i) {
        var a = geo.inicio[i];
        var b = geo.final[i];
        var x = interpola(a.x, b.x, e) - geo.s / 2;
        var y = interpola(a.y, b.y, e) - geo.s / 2;
        var esc = interpola(1.8, 1, e);
        var rot = interpola(45, 0, e);
        q.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0) rotate(' + rot.toFixed(1) + 'deg) scale(' + esc.toFixed(3) + ')';
        q.classList.toggle('is-ardosia', p > 0.92 && i + 1 === ardosia);
      });

      var pc = limita((p - 0.35) / 0.25, 0, 1);
      copy.style.setProperty('--copy-o', Math.max(0.001, pc).toFixed(3));
      copy.style.setProperty('--copy-y', (24 * (1 - pc)).toFixed(1) + 'px');
      var pa = limita((p - 0.55) / 0.2, 0, 1);
      acao.style.setProperty('--acao-o', pa.toFixed(3));
      acao.style.setProperty('--acao-y', (12 * (1 - pa)).toFixed(1) + 'px');
      var pl = limita((p - 0.2) / 0.5, 0, 1);
      if (linha) linha.style.setProperty('--lp', (pl * 100).toFixed(2) + '%');

      if (p >= 0.999 && !pulsou && botao && !reduzido()) {
        pulsou = true;
        botao.classList.add('is-pulsando');
        window.setTimeout(function () { botao.classList.remove('is-pulsando'); }, 950);
      }
      if (p >= 0.999) criaAlvo();
    }

    /* Area de hover sobre o simbolo formado: rodizio uma vez */
    function posicionaAlvo() {
      var c = geo.caixa;
      alvoHover.style.left = c.x + 'px';
      alvoHover.style.top = c.y + 'px';
      alvoHover.style.width = c.l + 'px';
      alvoHover.style.height = c.l + 'px';
    }

    function criaAlvo() {
      if (alvoHover || !mqFino.matches) return;
      alvoHover = document.createElement('span');
      alvoHover.className = 'final__alvo';
      alvoHover.setAttribute('aria-hidden', 'true');
      stage.appendChild(alvoHover);
      posicionaAlvo();
      var girando = false;
      alvoHover.addEventListener('mouseenter', function () {
        if (girando || reduzido()) return;
        girando = true;
        var ordem = [1, 2, 3, 4, 3];
        ordem.forEach(function (n, k) {
          window.setTimeout(function () {
            ardosia = n;
            qs.forEach(function (q, i) { q.classList.toggle('is-ardosia', i + 1 === n); });
            if (k === ordem.length - 1) girando = false;
          }, k * 600);
        });
      });
    }

    window.requestAnimationFrame(mede);
    aoMedir(mede);
    window.addEventListener('load', function () { window.requestAnimationFrame(mede); });

    if (reduzido()) {
      desenha(1);
      return;
    }

    /* Desktop: progresso do pin. Mobile e tablet: animacao unica */
    var animouUnica = false;

    aoRolar(function () {
      if (!mqPin.matches) return;
      var r = pin.getBoundingClientRect();
      var util = pin.offsetHeight - stage.offsetHeight;
      if (util <= 0) return;
      desenha(limita(-r.top / util, 0, 1));
    });

    aoEntrar([pin], function () {
      if (mqPin.matches || animouUnica) return;
      animouUnica = true;
      var inicio = null;
      function passo(t) {
        if (inicio === null) inicio = t;
        var k = limita((t - inicio) / 1600, 0, 1);
        desenha(k);
        if (k < 1) window.requestAnimationFrame(passo);
      }
      window.requestAnimationFrame(passo);
    }, '0px 0px -30% 0px');
  }

  /* ==========================================
     R. RODAPE: easter egg do rodizio
     ========================================== */

  function iniciaRodape() {
    var ano = $('[data-ano]');
    if (ano) ano.textContent = String(new Date().getFullYear());

    var alvo = $('[data-rodape-simbolo]');
    if (!alvo) return;
    var svg = $('svg', alvo);
    var rotulo = $('[data-rodape-session]');
    var timers = [];

    function limpa() {
      timers.forEach(window.clearTimeout);
      timers = [];
    }

    function roda() {
      limpa();
      if (reduzido()) return;
      [1, 2, 3, 4].forEach(function (n, k) {
        timers.push(window.setTimeout(function () {
          svg.setAttribute('data-ativo', String(n));
          if (rotulo) {
            rotulo.textContent = 'session 0' + n;
            rotulo.classList.add('is-visivel');
          }
        }, k * 600));
      });
    }

    function para() {
      limpa();
      svg.setAttribute('data-ativo', '3');
      if (rotulo) rotulo.classList.remove('is-visivel');
    }

    alvo.addEventListener('mouseenter', roda);
    alvo.addEventListener('focus', roda);
    alvo.addEventListener('mouseleave', para);
    alvo.addEventListener('blur', para);
  }

  /* ==========================================
     INICIO
     ========================================== */

  function inicia() {
    preparaContadores();
    montaSessions();
    iniciaPalavras();
    iniciaReveal();
    iniciaBarra();
    iniciaHero();
    iniciaParaQuem();
    iniciaFormatos();
    iniciaCiclo();
    iniciaEmenta();
    iniciaBoard();
    iniciaPlacas();
    iniciaTrilha();
    iniciaPerguntas();
    iniciaFinal();
    iniciaRodape();
    agenda();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicia);
  } else {
    inicia();
  }
})();
