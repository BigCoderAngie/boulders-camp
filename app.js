(() => {
  const S = window.SITE;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const starfield = () => '<div class="starfield"><div class="milky"></div></div>';
  const media = (img, alt = '') => img ? `<img src="${img}" alt="${alt}" loading="lazy">` : starfield();

  /* ---------- Intro curtain ---------- */
  addEventListener('load', () => document.body.classList.add('loaded'));
  setTimeout(() => document.body.classList.add('loaded'), 2500); // fallback if an image stalls

  /* ---------- Nav: solid after hero, hides on scroll down ---------- */
  const bar = $('#topbar');
  let lastY = 0;
  const onScroll = () => {
    const y = scrollY;
    bar.classList.toggle('solid', y > innerHeight * .6);
    bar.classList.toggle('hide', y > lastY && y > innerHeight && !document.body.classList.contains('menu-open'));
    lastY = y;
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const menuBtn = $('.menu-btn');
  const setMenu = open => {
    document.body.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  menuBtn.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  $$('#nav a').forEach(a => a.addEventListener('click', () => setMenu(false)));

  // Highlight the nav link for the section in view
  const navLinks = $$('#nav a:not(.btn)');
  const navIO = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) navLinks.forEach(a => a.classList.toggle('active', a.hash === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  navLinks.forEach(a => { const sec = $(a.hash); if (sec) navIO.observe(sec); });

  /* ---------- Hero slideshow ---------- */
  const slides = $$('.slide');
  const ctrl = $('#slide-ctrl');
  ctrl.innerHTML = slides.map((s, i) => `<button aria-label="Show ${s.dataset.name}"${i ? '' : ' class="on" aria-current="true"'}></button>`).join('') + `<span class="slide-name" id="slide-name">${slides[0].dataset.name}</span>`;
  const dots = $$('button', ctrl);
  let cur = 0, timer;
  const show = i => {
    slides[cur].classList.remove('on');
    dots[cur].classList.remove('on'); dots[cur].removeAttribute('aria-current');
    cur = (i + slides.length) % slides.length;
    slides[cur].classList.add('on');
    void dots[cur].offsetWidth; // restart progress animation
    dots[cur].classList.add('on'); dots[cur].setAttribute('aria-current', 'true');
    $('#slide-name').textContent = slides[cur].dataset.name;
    clearTimeout(timer);
    if (!reduced) timer = setTimeout(() => show(cur + 1), 7000);
  };
  dots.forEach((d, i) => d.addEventListener('click', () => show(i)));
  if (!reduced) timer = setTimeout(() => show(1), 7000);

  /* ---------- Marquee ---------- */
  const words = ['Ancient granite boulders', 'Gold-tier dark skies', 'Red dunes & fairy circles', 'Regenerative travel', 'A handful of tents', 'Book direct'];
  $('#marquee').innerHTML = [...words, ...words].map(w => `<span>${w}</span>`).join('');

  /* ---------- Experiences bento ---------- */
  const bento = $('#bento');
  bento.innerHTML = S.experiences.map(x => `
    <article class="card ${x.size || ''}" data-group="${x.group}" data-reveal>
      ${media(x.img, x.title).replace('<img ', `<img style="object-position:${x.pos || 'center'}" `)}
      <button class="plus" aria-label="More about ${x.title}" aria-expanded="false">+</button>
      <div class="card-body"><span class="tag">${x.tag}</span><h3>${x.title}</h3><p>${x.text}</p></div>
    </article>`).join('');
  $$('.card .plus', bento).forEach(b => b.addEventListener('click', () => {
    const open = b.closest('.card').classList.toggle('open');
    b.setAttribute('aria-expanded', open);
  }));
  $$('.filters [data-filter]').forEach(chip => chip.addEventListener('click', () => {
    $$('[data-filter]').forEach(c => c.setAttribute('aria-pressed', c === chip));
    const f = chip.dataset.filter, cards = $$('.card', bento);
    cards.forEach(c => c.classList.add('dim'));
    setTimeout(() => {
      cards.forEach(c => c.classList.toggle('hidden', f !== 'all' && c.dataset.group !== f));
      requestAnimationFrame(() => cards.forEach(c => c.classList.remove('dim')));
    }, reduced ? 0 : 320);
  }));

  /* ---------- A day at Boulders (scroll-driven) ---------- */
  const visual = $('#day-visual'), steps = $('#day-steps'), daySec = $('#day');
  visual.insertAdjacentHTML('beforeend', S.day.map((d, i) => `<div class="frame${i ? '' : ' on'}">${media(d.img)}</div>`).join(''));
  steps.insertAdjacentHTML('beforeend', S.day.map((d, i) => `
    <div class="step" data-i="${i}"><div class="mob-img">${media(d.img, d.title)}</div><span class="time">${d.time}</span><span class="label">${d.label}</span><h3>${d.title}</h3><p>${d.text}</p></div>`).join(''));
  const frames = $$('.frame', visual);
  const setMoment = i => {
    const d = S.day[i];
    frames.forEach((f, j) => f.classList.toggle('on', i === j));
    $$('.step', steps).forEach((s, j) => s.classList.toggle('on', i === j));
    daySec.style.setProperty('--bg', d.bg);
    daySec.style.setProperty('--fg', d.ink);
    $('#day-clock').textContent = `${d.time} · ${d.label}`;
  };
  const stepIO = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) setMoment(+e.target.dataset.i);
  }), { rootMargin: '-45% 0px -45% 0px' });
  $$('.step', steps).forEach(s => stepIO.observe(s));
  setMoment(0);

  /* ---------- Stay tabs ---------- */
  const stayCopy = [
    ['A soft place to land', 'Crisp linen, canvas walls that let the breeze in, and windows that frame the boulders outside.'],
    ['Your own front row', 'A private deck facing the plains, perfect for morning coffee, an afternoon nap or watching the stars.'],
    ['A camp in the rocks', 'A few tents and a plunge pool set among the granite, with plenty of space between neighbours.']
  ];
  const stayImgs = $$('#stay-view img'), tabs = $$('.tab');
  const setTab = i => {
    tabs.forEach((t, j) => { t.setAttribute('aria-selected', i === j); t.tabIndex = i === j ? 0 : -1; });
    stayImgs.forEach((im, j) => im.classList.toggle('on', i === j));
    const [t, p] = stayCopy[i];
    $('#stay-title').textContent = t; $('#stay-text').textContent = p;
    $('.stay-copy').classList.remove('anim-swap'); void $('.stay-copy').offsetWidth; $('.stay-copy').classList.add('anim-swap');
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => setTab(i));
    t.addEventListener('keydown', e => {
      const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (k) { const n = (i + k + tabs.length) % tabs.length; setTab(n); tabs[n].focus(); }
    });
  });

  /* ---------- Interactive map ---------- */
  const canvas = $('#map-canvas');
  canvas.insertAdjacentHTML('beforeend', S.places.map((p, i) => `
    <button class="pin${p.id === 'camp' ? ' camp' : ''}" style="left:${p.x}%;top:${p.y}%" data-i="${i}" aria-label="${p.title}"><span class="dot"></span><span class="name">${p.title}</span></button>`).join(''));
  const pins = $$('.pin', canvas);
  let place = 0;
  const setPlace = i => {
    place = (i + S.places.length) % S.places.length;
    const p = S.places[place], img = $('#place-img');
    pins.forEach((pin, j) => { pin.classList.toggle('on', j === place); pin.setAttribute('aria-pressed', j === place); });
    img.classList.add('swap');
    setTimeout(() => { img.src = p.img; img.alt = p.title; img.onload = () => img.classList.remove('swap'); if (img.complete) img.classList.remove('swap'); }, reduced ? 0 : 250);
    $('#place-kind').textContent = p.kind; $('#place-title').textContent = p.title; $('#place-text').textContent = p.text;
    const body = $('#place-body'); body.classList.remove('anim-swap'); void body.offsetWidth; body.classList.add('anim-swap');
  };
  pins.forEach((pin, i) => pin.addEventListener('click', () => setPlace(i)));
  $('#place-prev').addEventListener('click', () => setPlace(place - 1));
  $('#place-next').addEventListener('click', () => setPlace(place + 1));
  setPlace(0);

  /* ---------- Itinerary planner ---------- */
  const P = S.planner;
  const plan = { mood: 'quiet', nights: 3 };
  $('#moods').innerHTML = Object.entries(P.moods).map(([k, m]) => `<button class="chip" data-mood="${k}" aria-pressed="${k === plan.mood}">${m.label}</button>`).join('');
  const buildPlan = () => {
    const pool = P.days[plan.mood];
    const middle = Array.from({ length: plan.nights - 1 }, (_, i) => pool[i % pool.length]);
    return [P.arrive, ...middle, P.depart];
  };
  const renderPlan = () => {
    $('#nights-out').textContent = `${plan.nights} nights`;
    $('#mood-line').textContent = P.moods[plan.mood].line;
    $('#itinerary').innerHTML = buildPlan().map((d, i) => `
      <article class="it-card" style="animation-delay:${i * 70}ms">
        <div class="img">${media(d.img, d.title)}<span class="daynum">DAY ${i + 1}</span></div>
        <div class="txt"><h3>${d.title}</h3><p>${d.text}</p></div>
      </article>`).join('');
    $('#itinerary').scrollTo({ left: 0, behavior: reduced ? 'auto' : 'smooth' });
  };
  $$('[data-mood]').forEach(b => b.addEventListener('click', () => {
    plan.mood = b.dataset.mood;
    $$('[data-mood]').forEach(x => x.setAttribute('aria-pressed', x === b));
    renderPlan();
  }));
  $('#nights-minus').addEventListener('click', () => { if (plan.nights > 2) { plan.nights--; renderPlan(); } });
  $('#nights-plus').addEventListener('click', () => { if (plan.nights < 6) { plan.nights++; renderPlan(); } });
  renderPlan();

  /* ---------- Journal ---------- */
  $('#notes').innerHTML = S.journal.map((n, i) => `
    <article class="note" data-reveal style="--d:${i * .1}s">
      <figure class="ph" style="margin:0">${media(n.img)}</figure>
      <div class="note-body"><div class="note-meta"><b>${n.tag}</b>${n.date}</div><h3>${n.title}</h3><p>${n.text}</p></div>
    </article>`).join('');

  /* ---------- Enquiry modal ---------- */
  const modal = $('#modal');
  let lastFocus;
  const openModal = (summary, prefill = {}) => {
    lastFocus = document.activeElement;
    const sum = $('#plan-summary');
    sum.innerHTML = summary || '';
    sum.classList.toggle('show', !!summary);
    const f = $('#enquiry-form');
    Object.entries(prefill).forEach(([k, v]) => { if (f.elements[k]) f.elements[k].value = v; });
    $('#success').classList.remove('show');
    modal.classList.add('open');
    document.documentElement.style.overflow = 'hidden';
    setTimeout(() => f.elements.name.focus(), 350);
  };
  const closeModal = () => {
    modal.classList.remove('open');
    document.documentElement.style.overflow = '';
    lastFocus && lastFocus.focus();
  };
  $$('[data-enquire]').forEach(b => b.addEventListener('click', e => { e.preventDefault(); openModal(); }));
  $$('[data-close]', modal).forEach(b => b.addEventListener('click', closeModal));
  addEventListener('keydown', e => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'Tab') { // keep focus inside the dialog
      const f = $$('button, input, select, textarea', modal).filter(x => x.offsetParent);
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f.at(-1).focus(); }
      else if (!e.shiftKey && document.activeElement === f.at(-1)) { e.preventDefault(); f[0].focus(); }
    }
  });

  $('#booking').addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    openModal(`Checking <b>${d.get('nights').toLowerCase()}</b> for <b>${d.get('guests').toLowerCase()}</b>, ${d.get('season')}. The camp will confirm availability personally.`,
      { season: d.get('season'), guests: d.get('guests') });
  });
  $('#send-plan').addEventListener('click', () => {
    const titles = buildPlan().map((d, i) => `Day ${i + 1}: ${d.title}`);
    openModal(`Your plan: <b>${plan.nights} nights · ${P.moods[plan.mood].label}</b>. We'll attach it to your note.`,
      { message: `I'd love a stay along these lines:\n${titles.join('\n')}` });
  });
  $('#enquiry-form').addEventListener('submit', e => {
    e.preventDefault();
    const name = new FormData(e.currentTarget).get('name');
    $('#success').textContent = `Thank you, ${name}. Your enquiry is ready. In the live site it would go straight to the Wolwedans reservations team.`;
    $('#success').classList.add('show');
  });
  $('#news-form').addEventListener('submit', e => {
    e.preventDefault();
    $('#news-msg').textContent = 'Thank you, you’re on the list (prototype only, nothing was sent).';
    e.currentTarget.reset();
  });

  /* ---------- Scroll reveals, counters, parallax ---------- */
  const revealIO = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    $$('.ph', e.target).concat(e.target.classList.contains('ph') ? [e.target] : []).forEach(p => p.classList.add('in'));
    revealIO.unobserve(e.target);
  }), { rootMargin: '0px 0px -10% 0px', threshold: .05 });
  $$('[data-reveal]').forEach(el => revealIO.observe(el));

  const countIO = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, end = +el.dataset.count, t0 = performance.now(), dur = reduced ? 1 : 1800;
    const tick = t => {
      const k = Math.min(1, (t - t0) / dur), v = Math.round(end * (1 - Math.pow(1 - k, 3)));
      el.textContent = v.toLocaleString('en-US');
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    countIO.unobserve(el);
  }), { threshold: .6 });
  $$('[data-count]').forEach(el => countIO.observe(el));

  if (!reduced) {
    const bg = $('#closing-bg'), closing = $('.closing');
    let ticking = false;
    addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const r = closing.getBoundingClientRect();
        if (r.bottom > 0 && r.top < innerHeight) bg.style.transform = `translateY(${(r.top / innerHeight) * -8}%)`;
        ticking = false;
      });
    }, { passive: true });
  }
})();
