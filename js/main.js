/* PhasmoFire Studios — main.js */

// ── Mobile Nav ──────────────────────────────────────────────
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    navLinks.classList.toggle('open', !isOpen);
  });

  // close menu when a nav link is clicked
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('open');
    });
  });
}

// ── Game Filter ──────────────────────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const gameCards  = document.querySelectorAll('.game-card[data-tags]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    gameCards.forEach(card => {
      card.hidden = filter !== 'all' && card.dataset.tags !== filter;
    });
  });
});

// ── Art Lightbox ─────────────────────────────────────────────
const lightbox = document.getElementById('lightbox');
const lbClose  = document.getElementById('lb-close');
const lbInner  = document.getElementById('lb-inner');

if (lightbox && lbClose && lbInner) {

  const openLightbox = item => {
    lbInner.innerHTML = '';

    const img  = item.querySelector('img');
    const fill = item.querySelector('.placeholder-fill');

    if (img) {
      const el = document.createElement('img');
      el.src = img.src;
      el.alt = img.alt || '';
      lbInner.appendChild(el);
    } else if (fill) {
      const el = document.createElement('div');
      // copy the gradient class(es) but show at lightbox size
      el.className = 'lightbox-placeholder ' + fill.className;
      lbInner.appendChild(el);
    }

    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.art-item').forEach(item => {
    item.addEventListener('click', () => openLightbox(item));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(item);
      }
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
}
