/**
 * Fellowship Digital - orbitas do board
 * Canvas 2D, sem biblioteca. Quatro aneis em perspectiva, um ponto luminoso por anel
 * (os quatro mentores) girando devagar em volta de um nucleo (o caso do fellow).
 * O anel externo tem 24 marcas (as sessions), seis delas em azul (as sessions de gestao).
 * Anima so com a secao visivel e a aba ativa; um unico quadro com movimento reduzido.
 */

(function () {
  'use strict';

  var canvases = document.querySelectorAll('[data-orbits]');
  if (!canvases.length) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PRATA = '184, 192, 204';
  var ELETRICO = '59, 111, 214';
  var BRANCO = '245, 247, 250';
  var ASPECT = 0.42;
  var TILT = 18 * Math.PI / 180;

  canvases.forEach(function (canvas) {
    var ctx = canvas.getContext('2d');
    var section = canvas.parentElement;
    var running = false;
    var raf = null;
    var last = 0;
    var t = Math.random() * 100;
    var width = 0, height = 0, dpr = 1;
    var cx = 0, cy = 0, base = 1;
    var centered = canvas.getAttribute('data-orbits') === 'center';
    var strength = parseFloat(canvas.getAttribute('data-strength') || '1');

    var rings = [
      { r: 120, period: 38, phase: 0.6 },
      { r: 190, period: 52, phase: 2.4 },
      { r: 260, period: 67, phase: 4.1 },
      { r: 330, period: 81, phase: 5.5 }
    ];
    var flashes = []; // linhas de conexao: {ring, start}
    var lastAngle = [0, 0, 0, 0];

    function resize() {
      var rect = section.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var mobile = width < 960;
      cx = (mobile || centered) ? width * 0.5 : width * 0.72;
      cy = (mobile || centered) ? height * 0.5 : height * 0.55;
      base = Math.min(height / 560, width / 1100) * (mobile ? 0.7 : 1);
      draw(0);
    }

    // ponto de um anel: angulo no plano do anel -> tela (elipse inclinada)
    function point(r, a) {
      var x = r * Math.cos(a);
      var z = r * Math.sin(a);
      var sx = x * Math.cos(TILT) - z * ASPECT * Math.sin(TILT);
      var sy = x * Math.sin(TILT) + z * ASPECT * Math.cos(TILT);
      return { x: cx + sx * base, y: cy + sy * base, depth: (Math.sin(a) + 1) / 2 };
    }

    function ring(r, alpha, widthPx) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(TILT);
      ctx.beginPath();
      ctx.ellipse(0, 0, r * base, r * base * ASPECT, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(' + PRATA + ', ' + alpha + ')';
      ctx.lineWidth = widthPx;
      ctx.stroke();
      ctx.restore();
    }

    function glow(x, y, radius, rgb, alpha) {
      var g = ctx.createRadialGradient(x, y, 0, x, y, radius);
      g.addColorStop(0, 'rgba(' + rgb + ', ' + alpha + ')');
      g.addColorStop(1, 'rgba(' + rgb + ', 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    function draw(dt) {
      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = 'round';
      var s = strength;
      var i, j;

      // aneis
      for (i = 0; i < rings.length; i++) {
        ring(rings[i].r, (0.14 + i * 0.03) * s, 1);
      }

      // marcas do anel externo: 24 sessions, 6 de gestao
      var outer = rings[3].r;
      var spin = t * 0.04;
      for (i = 0; i < 24; i++) {
        var a = spin + (i / 24) * Math.PI * 2;
        var gest = (i + 1) % 4 === 0;
        var p1 = point(outer, a);
        var p2 = point(outer + (gest ? 16 : 7), a);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = gest
          ? 'rgba(' + ELETRICO + ', ' + (0.55 + 0.35 * p1.depth) * s + ')'
          : 'rgba(' + PRATA + ', ' + (0.18 + 0.22 * p1.depth) * s + ')';
        ctx.lineWidth = gest ? 1.5 : 1;
        ctx.stroke();
      }

      // nucleo
      var pulse = 1 + 0.12 * (0.5 + 0.5 * Math.sin(t * 2 * Math.PI / 9));
      glow(cx, cy, 60 * base, ELETRICO, 0.25 * s);
      ctx.beginPath();
      ctx.arc(cx, cy, 5 * base, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + BRANCO + ', ' + 0.95 * s + ')';
      ctx.fill();
      for (j = 0; j < 2; j++) {
        ctx.beginPath();
        ctx.arc(cx, cy, (14 + j * 8) * base * pulse, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(' + ELETRICO + ', ' + (0.35 - j * 0.15) * s + ')';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // pontos luminosos com rastro
      for (i = 0; i < rings.length; i++) {
        var rg = rings[i];
        var ang = rg.phase + (t / rg.period) * Math.PI * 2;
        var norm = ((ang % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        if (lastAngle[i] > norm && dt > 0) flashes.push({ ring: i, start: t });
        lastAngle[i] = norm;

        // rastro de 40 graus
        var steps = 14;
        for (j = 0; j < steps; j++) {
          var a0 = ang - (j / steps) * (40 * Math.PI / 180);
          var a1 = ang - ((j + 1) / steps) * (40 * Math.PI / 180);
          var q0 = point(rg.r, a0);
          var q1 = point(rg.r, a1);
          ctx.beginPath();
          ctx.moveTo(q0.x, q0.y);
          ctx.lineTo(q1.x, q1.y);
          ctx.strokeStyle = 'rgba(' + ELETRICO + ', ' + ((1 - j / steps) * 0.5 * s) + ')';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        var p = point(rg.r, ang);
        var depthScale = 0.7 + 0.5 * p.depth;
        glow(p.x, p.y, 24 * base * depthScale, ELETRICO, 0.35 * s);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3 * base * depthScale, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + BRANCO + ', ' + (0.7 + 0.3 * p.depth) * s + ')';
        ctx.fill();
      }

      // linhas de conexao (a session): do ponto ao nucleo, somem em 1.5 s
      for (i = flashes.length - 1; i >= 0; i--) {
        var f = flashes[i];
        var age = t - f.start;
        if (age > 1.5) { flashes.splice(i, 1); continue; }
        var rr = rings[f.ring];
        var fa = rr.phase + (t / rr.period) * Math.PI * 2;
        var fp = point(rr.r, fa);
        ctx.beginPath();
        ctx.moveTo(fp.x, fp.y);
        ctx.lineTo(cx, cy);
        ctx.strokeStyle = 'rgba(' + ELETRICO + ', ' + ((1 - age / 1.5) * 0.6 * s) + ')';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    function loop(now) {
      if (!running) return;
      var dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      t += dt;
      draw(dt);
      raf = requestAnimationFrame(loop);
    }

    function start() {
      if (reduced || running) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = null;
    }

    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(section);
    else window.addEventListener('resize', resize);
    resize();

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) start(); else stop(); });
      }, { threshold: 0.05 }).observe(section);
    } else {
      start();
    }

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else start();
    });
  });
})();
