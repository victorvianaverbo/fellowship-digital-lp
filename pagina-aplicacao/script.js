/**
 * Metodo Zero v20
 */

document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  initForms();
  initPhoneInput();
  initYear();
});

/* ==========================================
   AOS
   ========================================== */

function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
      easing: 'ease-out-cubic',
      disableMutationObserver: true
    });
  }
}

/* ==========================================
   FORMULARIOS
   ========================================== */

const tempEmailDomains = [
  'tempmail', 'guerrillamail', '10minutemail', 'mailinator',
  'throwaway', 'fakeinbox', 'yopmail', 'trashmail', 'temp-mail',
  'disposable', 'sharklasers'
];

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return false;
  const domain = email.split('@')[1].toLowerCase();
  return !tempEmailDomains.some(temp => domain.includes(temp));
}

function initForms() {
  document.querySelectorAll('form[data-form]').forEach(form => {
    form.addEventListener('submit', handleFormSubmit);
  });
}

async function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const btn = form.querySelector('[type="submit"]');
  const feedback = form.querySelector('.form-feedback');

  // Validacao
  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    field.classList.remove('error');

    if (!field.value.trim()) {
      field.classList.add('error');
      valid = false;
    }

    if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
      field.classList.add('error');
      valid = false;
    }

    if (field.type === 'tel') {
      const iti = field._iti;
      if (iti && !iti.isValidNumber()) {
        field.classList.add('error');
        valid = false;
      }
    }
  });

  if (!valid) {
    showFeedback(feedback, 'error', 'Preencha todos os campos corretamente.');
    return;
  }

  // Captura nome e email ANTES do envio (form.reset limpa os campos)
  const nome = form.querySelector('[name="nome"]')?.value || '';
  const email = form.querySelector('[name="email"]')?.value || '';

  // Telefone internacional - pega instancia do input DESTE form
  const phone = form.querySelector('input[type="tel"]');
  if (phone && phone._iti) {
    phone.value = phone._iti.getNumber();
  }

  // Envio
  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Enviando...';

  try {
    const res = await fetch(form.getAttribute('action') || window.location.pathname, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    });

    if (res.ok) {
      // Meta Pixel
      if (typeof fbq === 'function') {
        fbq('track', 'Lead');
      }

      // GTM dataLayer
      if (typeof dataLayer !== 'undefined') {
        dataLayer.push({ event: 'generate_lead', form_name: form.getAttribute('name') || 'contato', method: 'netlify_form' });
      }

      // Redirect com parametros
      const action = form.getAttribute('action');
      if (action) {
        const redirectUrl = new URL(action, window.location.origin);

        // Repassa todos os parametros da URL atual (utm_source, fbclid, etc)
        new URLSearchParams(window.location.search).forEach((value, key) => {
          redirectUrl.searchParams.set(key, value);
        });

        // Passa nome e email como parametros
        if (nome) redirectUrl.searchParams.set('nome', nome);
        if (email) redirectUrl.searchParams.set('email', email);

        window.location.href = redirectUrl.toString();
        return;
      }

      // Fallback: mostrar mensagem (quando nao tem action)
      showFeedback(feedback, 'success', 'Mensagem enviada com sucesso!');
      form.reset();
      if (phone && phone._iti) phone._iti.setNumber('');
    } else {
      throw new Error('Erro');
    }
  } catch {
    showFeedback(feedback, 'error', 'Erro ao enviar. Tente novamente.');
  } finally {
    btn.disabled = false;
    btn.textContent = originalText;
  }
}

function showFeedback(el, type, msg) {
  if (!el) return;
  el.className = 'form-feedback ' + type;
  el.textContent = msg;
  setTimeout(() => {
    el.className = 'form-feedback';
    el.textContent = '';
  }, 5000);
}

/* ==========================================
   TELEFONE INTERNACIONAL
   ========================================== */

function initPhoneInput() {
  if (typeof intlTelInput === 'undefined') return;

  document.querySelectorAll('input[type="tel"]').forEach(input => {
    input._iti = intlTelInput(input, {
      initialCountry: 'br',
      preferredCountries: ['br', 'us', 'pt'],
      separateDialCode: true,
      strictMode: true,
      loadUtilsOnInit: 'https://cdn.jsdelivr.net/npm/intl-tel-input@24.6.0/build/js/utils.js'
    });
  });
}

/* ==========================================
   UTILS
   ========================================== */

function initYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ==========================================
   FELLOWSHIP DIGITAL - interacoes da pagina
   Tudo em JavaScript puro com IntersectionObserver.
   ========================================== */

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
  initDrawOnView();
  initCounters();
  initTimeline();
  initEtapas();
  initCiclos();
  initMentores();
  initFaqIndex();
  initAplicacao();
});

// Observa um conjunto de elementos e aplica uma classe quando ficam visiveis
function observeOnce(elements, threshold, onEnter) {
  if (!elements.length) return;
  if (!('IntersectionObserver' in window) || reducedMotion) {
    elements.forEach(onEnter);
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        onEnter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold });
  elements.forEach((el) => obs.observe(el));
}

/* Linhas que se desenham (ledger, filetes de prata) */
function initDrawOnView() {
  const rows = Array.from(document.querySelectorAll('.ledger__row[data-draw]'));
  rows.forEach((row, i) => { row.style.transitionDelay = (i * 120) + 'ms'; });
  observeOnce(rows, 0.3, (el) => el.classList.add('is-drawn'));

  const rules = Array.from(document.querySelectorAll('.rule[data-draw]'));
  observeOnce(rules, 0.4, (el) => el.classList.add('is-drawn'));
}

/* Contadores: de 0 ao valor em 1400ms ease-out */
function initCounters() {
  const counters = Array.from(document.querySelectorAll('[data-count]'));
  observeOnce(counters, 0.4, (el) => {
    const target = parseFloat(el.getAttribute('data-count')) || 0;
    if (reducedMotion || target === 0) { el.textContent = formatNumber(target); return; }
    const duration = el.closest('.bento') ? 1200 : 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = formatNumber(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

function formatNumber(n) {
  return new Intl.NumberFormat('pt-BR').format(n);
}

/* Timeline do ciclo: desenha a linha base e o arco de retorno em SVG */
function initTimeline() {
  const timeline = document.querySelector('[data-timeline]');
  if (!timeline) return;
  const svg = timeline.querySelector('.timeline__svg');
  const base = svg.querySelector('.timeline__base');
  const arc = svg.querySelector('.timeline__arc');
  const label = svg.querySelector('.timeline__arc-label');

  const layout = () => {
    const w = timeline.clientWidth;
    if (!w) return;
    const y = 48;
    base.setAttribute('x1', 0);
    base.setAttribute('x2', w);
    base.setAttribute('y1', y);
    base.setAttribute('y2', y);
    base.style.setProperty('--len', w);

    // arco do ponto 4 (73%) de volta ao ponto 2 (27%), 36px acima da linha
    const x4 = w * 0.73;
    const x2 = w * 0.27;
    const top = y - 36;
    const d = `M ${x4} ${y - 8} C ${x4} ${top}, ${x2} ${top}, ${x2 + 6} ${y - 9}`;
    // ponta de seta simples de 6px no destino
    const arrow = ` M ${x2 + 12} ${y - 14} L ${x2 + 6} ${y - 9} L ${x2 + 13} ${y - 8}`;
    arc.setAttribute('d', d + arrow);
    label.setAttribute('x', (x2 + x4) / 2);
    label.setAttribute('y', top - 6);
  };

  layout();
  if ('ResizeObserver' in window) new ResizeObserver(layout).observe(timeline);
  else window.addEventListener('resize', layout);

  observeOnce([timeline], 0.3, (el) => el.classList.add('is-active'));
}

/* Processo: linha vertical do primeiro ao ultimo numero */
function initEtapas() {
  const etapas = document.querySelector('[data-etapas]');
  if (!etapas) return;
  const line = etapas.querySelector('.etapas__line');
  const items = etapas.querySelectorAll('.etapa');
  if (!items.length) return;

  const layout = () => {
    const first = items[0].querySelector('.etapa__num');
    const last = items[items.length - 1].querySelector('.etapa__num');
    const box = etapas.getBoundingClientRect();
    const y1 = first.getBoundingClientRect().top - box.top + first.offsetHeight / 2;
    const y2 = last.getBoundingClientRect().top - box.top + last.offsetHeight / 2;
    line.setAttribute('x1', 20);
    line.setAttribute('x2', 20);
    line.setAttribute('y1', y1);
    line.setAttribute('y2', y2);
    line.style.setProperty('--len', Math.max(1, y2 - y1));
  };

  layout();
  if ('ResizeObserver' in window) new ResizeObserver(layout).observe(etapas);
  else window.addEventListener('resize', layout);

  observeOnce([etapas], 0.3, (el) => el.classList.add('is-active'));
}

/* Diagrama de ciclos (SVG): eixo e arcos se desenham, marcas aparecem em sequencia */
function initCiclos() {
  const ciclos = document.querySelector('[data-ciclos]');
  if (!ciclos) return;
  observeOnce([ciclos], 0.4, (el) => el.classList.add('is-active'));
}

/* Retratos do board: o veu marinho clareia quando a celula entra */
function initMentores() {
  const mentores = Array.from(document.querySelectorAll('.mentor'));
  observeOnce(mentores, 0.4, (el) => el.classList.add('is-awake'));
}

/* FAQ: marca no indice a pergunta mais proxima do topo */
function initFaqIndex() {
  const index = document.querySelector('[data-faq-index]');
  if (!index || !('IntersectionObserver' in window)) return;
  const links = Array.from(index.querySelectorAll('a'));
  const items = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if (!items.length) return;

  const setActive = (id) => {
    links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + id));
  };

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
  items.forEach((el) => obs.observe(el));
  setActive(items[0].id);
}

/* Pagina /aplicar/: uma pergunta por tela, com triagem */
function initAplicacao() {
  const form = document.querySelector('[data-aplicacao]');
  if (!form) return;

  const telas = Array.from(form.querySelectorAll('.tela'));
  const progress = document.querySelector('[data-progress]');
  const triagem = form.querySelector('input[name="triagem"]');
  const total = 11;
  let current = 0;
  let history = [];
  let animating = false;

  const byName = (name) => telas.findIndex((t) => t.getAttribute('data-tela') === name);

  const setProgress = (tela) => {
    if (!progress) return;
    const n = parseInt(tela.getAttribute('data-tela'), 10);
    const pct = isNaN(n) ? (tela.classList.contains('tela--fim') ? 100 : 0) : Math.round((n / total) * 100);
    progress.style.width = pct + '%';
  };

  const focusFirst = (tela) => {
    const field = tela.querySelector('input:not([type="hidden"]):not([type="radio"]), input[type="radio"]');
    if (field) field.focus({ preventScroll: true });
  };

  const goTo = (index) => {
    if (animating || index === current || index < 0 || index >= telas.length) return;
    const from = telas[current];
    const to = telas[index];
    animating = true;

    const show = () => {
      from.classList.remove('is-active', 'is-leaving');
      to.classList.add('is-active', 'is-entering');
      setProgress(to);
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
      const done = () => { to.classList.remove('is-entering'); animating = false; focusFirst(to); };
      if (reducedMotion) done(); else setTimeout(done, 520);
      current = index;
    };

    if (reducedMotion) { show(); return; }
    from.classList.add('is-leaving');
    setTimeout(show, 250);
  };

  const validate = (tela) => {
    const error = tela.querySelector('.tela__error');
    if (error) error.textContent = '';
    const text = tela.querySelector('.tela__input');
    if (text) {
      text.classList.remove('error');
      const value = text.value.trim();
      let ok = value.length > 0;
      if (ok && text.type === 'email') ok = isValidEmail(value);
      if (ok && text.type === 'tel' && text._iti) ok = text._iti.isValidNumber();
      if (!ok) {
        text.classList.add('error');
        if (error) error.textContent = text.type === 'email' ? 'Informe um e-mail válido.' : text.type === 'tel' ? 'Informe um WhatsApp válido, com DDD.' : 'Este campo é necessário para seguir.';
        text.focus();
        return false;
      }
      return true;
    }
    const radios = tela.querySelectorAll('input[type="radio"]');
    if (radios.length) {
      const checked = Array.from(radios).find((r) => r.checked);
      if (!checked) {
        if (error) error.textContent = 'Escolha uma opção para seguir.';
        return false;
      }
    }
    return true;
  };

  const next = () => {
    const tela = telas[current];
    if (!validate(tela)) return;
    const checked = tela.querySelector('input[type="radio"]:checked');
    const goto = checked && checked.getAttribute('data-goto');
    history.push(current);
    if (goto) {
      if (triagem) triagem.value = goto === 'encerramento-a' ? 'Não é médico' : 'Ainda não está em condição de investir';
      goTo(byName(goto));
      return;
    }
    goTo(current + 1);
  };

  const back = () => {
    if (!history.length) return;
    goTo(history.pop());
  };

  form.querySelectorAll('[data-next]').forEach((btn) => btn.addEventListener('click', next));
  form.querySelectorAll('[data-back]').forEach((btn) => btn.addEventListener('click', back));

  form.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
      const tela = telas[current];
      if (tela.querySelector('[type="submit"]')) return; // deixa o submit acontecer
      e.preventDefault();
      next();
    }
    if (e.key === 'Escape') { e.preventDefault(); back(); }
  });

  // Ao escolher uma opcao numa pergunta de radio, avanca sozinho apos um instante
  form.querySelectorAll('.opcoes input[type="radio"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      const tela = radio.closest('.tela');
      if (tela.querySelector('[type="submit"]')) return;
      setTimeout(next, 260);
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const tela = telas[current];
    if (!validate(tela)) return;
    const btn = form.querySelector('[type="submit"]');
    const feedback = form.querySelector('.form-feedback');
    const phone = form.querySelector('input[type="tel"]');
    if (phone && phone._iti) phone.value = phone._iti.getNumber();
    const nome = form.querySelector('[name="nome"]').value || '';
    const email = form.querySelector('[name="email"]').value || '';
    if (triagem && !triagem.value) {
      const disp = form.querySelector('input[name="disponibilidade"]:checked');
      triagem.value = disp && disp.value === 'Não' ? 'Sem disponibilidade quinzenal' : 'Apto';
    }

    btn.disabled = true;
    const original = btn.textContent;
    btn.textContent = 'Enviando...';
    try {
      const res = await fetch('/aplicar/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
      });
      if (!res.ok) throw new Error('Erro');
      if (typeof fbq === 'function') fbq('track', 'Lead');
      if (typeof dataLayer !== 'undefined') dataLayer.push({ event: 'generate_lead', form_name: 'aplicacao', method: 'netlify_form' });
      const redirect = new URL('/obrigado/', window.location.origin);
      new URLSearchParams(window.location.search).forEach((v, k) => redirect.searchParams.set(k, v));
      if (nome) redirect.searchParams.set('nome', nome);
      if (email) redirect.searchParams.set('email', email);
      window.location.href = redirect.toString();
    } catch {
      showFeedback(feedback, 'error', 'Não foi possível enviar. Tente de novo em instantes.');
      btn.disabled = false;
      btn.textContent = original;
    }
  });

  setProgress(telas[0]);
}
