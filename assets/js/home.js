/* ═══════════════════════════════════════════
   SPAÇO GOURMET — home.js
═══════════════════════════════════════════ */

/* ─── 1. HEADER: fundo sólido ao rolar ─── */
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });


/* ─── 2. NAV MOBILE: toggle acessível ─── */
const navToggle = document.querySelector('.nav-toggle');
const navMenu   = document.getElementById('nav-menu');

if (navToggle && navMenu) {

  navToggle.addEventListener('click', () => {
    const aberto = navToggle.getAttribute('aria-expanded') === 'true';

    navToggle.setAttribute('aria-expanded', String(!aberto));
    navToggle.setAttribute('aria-label', aberto ? 'Abrir menu de navegação' : 'Fechar menu de navegação');
    navMenu.classList.toggle('open', !aberto);
  });

  // Fecha ao clicar em link interno
  navMenu.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Abrir menu de navegação');
      navMenu.classList.remove('open');
    });
  });

  // Fecha ao pressionar Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Abrir menu de navegação');
      navMenu.classList.remove('open');
      navToggle.focus();
    }
  });
}


/* ─── 3. SCROLL REVEAL ─── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // para de observar após revelar
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ─── 4. NAV: link ativo conforme seção visível ─── */
const sections  = document.querySelectorAll('main section[id]');
const navLinks  = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');

      navLinks.forEach(link => {
        const ativo = link.getAttribute('href') === `#${id}`;
        link.setAttribute('aria-current', ativo ? 'true' : 'false');
        link.classList.toggle('nav-links__link--ativo', ativo);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));
