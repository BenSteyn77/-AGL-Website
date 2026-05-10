/* ── Nav scroll ───────────────────────────────────────────── */
const nav = document.getElementById('mainNav');
if(nav){
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
}

/* ── Mobile menu ──────────────────────────────────────────── */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
if(burger && mobileMenu){
  burger.addEventListener('click', () => mobileMenu.classList.add('open'));
  if(mobileClose) mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));
}

/* ── Hero slideshow ───────────────────────────────────────── */
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dot');
if(slides.length > 1){
  let cur = 0, timer;
  const go = n => {
    slides[cur].classList.remove('active');
    if(dots[cur]) dots[cur].classList.remove('active');
    cur = (n + slides.length) % slides.length;
    slides[cur].classList.add('active');
    if(dots[cur]) dots[cur].classList.add('active');
  };
  const start = () => { timer = setInterval(() => go(cur + 1), 6500); };
  dots.forEach(d => d.addEventListener('click', () => { clearInterval(timer); go(+d.dataset.index); start(); }));
  start();
}

/* ── Scroll reveal ────────────────────────────────────────── */
const reveals = document.querySelectorAll('.reveal');
if(reveals.length){
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, {threshold: 0.1});
  reveals.forEach(el => obs.observe(el));
}

/* ── Smooth anchor ────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth', block:'start'}); }
  });
});

/* ── Contact form ─────────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const success = document.getElementById('formSuccess');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
      contactForm.reset();
      btn.textContent = 'Send Message';
      btn.disabled = false;
      if(success){ success.style.display = 'block'; setTimeout(() => success.style.display = 'none', 6000); }
    }, 1200);
  });
}

/* ── Active nav link ──────────────────────────────────────── */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if(a.getAttribute('href') === currentPage) a.classList.add('active');
});
