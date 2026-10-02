// ClearQuote — interactions
document.addEventListener('DOMContentLoaded', () => {
  // force hero video playback (some browsers block autoplay)
  const v = document.querySelector('.hero-video');
  if (v && v.play) { v.muted = true; const p = v.play(); if (p) p.catch(() => {}); }
  // mobile nav
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.topnav');
  if (burger && nav) burger.addEventListener('click', () => nav.classList.toggle('open'));

  // scroll reveals: text rises, cards alternate left/right
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
  const slide = (el, cls, delay) => {
    el.classList.remove('rv'); el.classList.add(cls);
    if (delay) el.style.transitionDelay = delay + 's';
    io.observe(el);
  };
  document.querySelectorAll('.cards, .steps, .quotes').forEach(g => {
    [...g.children].forEach((c, i) => slide(c, i % 2 ? 'rv-r' : 'rv-l', (i * 0.12).toFixed(2)));
  });
  document.querySelectorAll('.mini-cards').forEach(g => {
    [...g.children].forEach((c, i) => slide(c, i % 2 ? 'rv-r' : 'rv-l', (i * 0.08).toFixed(2)));
  });
  document.querySelectorAll('.faq-item').forEach((c, i) =>
    slide(c, i % 2 ? 'rv-r' : 'rv-l', Math.min(i * 0.06, 0.3).toFixed(2)));
  document.querySelectorAll('.rv').forEach(el => io.observe(el));

  // animated counters in the trust band
  const cio = new IntersectionObserver((es) => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      cio.unobserve(e.target);
      const el = e.target, target = +el.dataset.count, t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / 1200, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => cio.observe(el));

  // faq accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q'), a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o => {
        o.classList.remove('open'); o.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!open) { item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });

  // quote widget — demo preview with sample rates
  const form = document.getElementById('quote');
  const box = document.getElementById('quote-result');
  if (form && box) form.addEventListener('submit', (e) => {
    e.preventDefault();
    const type = document.getElementById('q-type').value;
    const zip = (document.getElementById('q-zip').value || '—').trim() || '—';
    const samples = [
      ['Harborline Insurance', '$118', '/mo · $500 deductible'],
      ['BluePeak Mutual', '$132', '/mo · $500 deductible'],
      ['Northgate Assurance', '$141', '/mo · $1,000 deductible'],
    ];
    box.innerHTML =
      '<span class="demo-tag">Demo preview — sample rates</span>' +
      `<h3>3 quotes for ${type} near ${zip}</h3>` +
      samples.map(([n, p, d]) =>
        `<div class="qrow"><div><b>${n}</b><small>Identical coverage compared</small></div><span class="p">${p}<small>${d}</small></span></div>`
      ).join('');
    box.hidden = false;
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });


  // coverage nav: scroll to the matching card and highlight it
  const coverMap = { auto: 0, home: 1, business: 2 };
  const miniMap = { renters: 0, life: 1 };
  document.querySelectorAll('.topnav a[data-goto]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const key = a.dataset.goto;
      const sec = document.getElementById('coverage');
      let target = null;
      if (key in coverMap) target = document.querySelectorAll('.cards .card')[coverMap[key]];
      else if (key in miniMap) target = document.querySelectorAll('.mini-cards a')[miniMap[key]];
      if (sec) sec.scrollIntoView({ behavior: 'smooth' });
      document.querySelectorAll('.card.flash,.mini-cards a.flash').forEach(x => x.classList.remove('flash'));
      if (target) setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target.classList.add('flash');
        setTimeout(() => target.classList.remove('flash'), 2200);
      }, 450);
    });
  });

  // footer year
  const y = document.getElementById('yr');
  if (y) y.textContent = new Date().getFullYear();
});
