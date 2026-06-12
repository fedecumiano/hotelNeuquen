/**
 * Azure Sands Boutique Hotel — Site Script
 * Minimal vanilla JS: config, navigation, lazy loading, WhatsApp booking
 */

/* --------------------------------------------------------------------------
   Site configuration — replace with your real contact details
   -------------------------------------------------------------------------- */
const SITE_CONFIG = {
  whatsappNumber: '15550123456', // International format, no + or spaces
  whatsappMessage: 'Hello, I would like information about room availability.',
};

/* --------------------------------------------------------------------------
   WhatsApp booking links
   -------------------------------------------------------------------------- */
const buildWhatsAppUrl = (phone, message) => {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
};

const initWhatsAppLinks = () => {
  const url = buildWhatsAppUrl(SITE_CONFIG.whatsappNumber, SITE_CONFIG.whatsappMessage);
  document.querySelectorAll('[data-whatsapp-booking]').forEach((link) => {
    link.href = url;
    link.setAttribute('rel', 'noopener noreferrer');
    link.setAttribute('target', '_blank');
  });
};

/* --------------------------------------------------------------------------
   Mobile navigation
   -------------------------------------------------------------------------- */
const initNavigation = () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.primary-nav');
  const navLinks = document.querySelectorAll('.nav-list a');

  if (!toggle || !nav) return;

  const closeNav = () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    nav.classList.remove('is-open');
  };

  const openNav = () => {
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation menu');
    nav.classList.add('is-open');
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    isOpen ? closeNav() : openNav();
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNav();
  });
};

/* --------------------------------------------------------------------------
   Lazy loading for gallery images (Intersection Observer)
   -------------------------------------------------------------------------- */
const initLazyImages = () => {
  const images = document.querySelectorAll('.lazy-image[data-src]');
  if (!images.length) return;

  const loadImage = (img) => {
    const src = img.dataset.src;
    if (!src) return;
    img.src = src;
    img.removeAttribute('data-src');
    img.classList.add('is-loaded');
  };

  if (!('IntersectionObserver' in window)) {
    images.forEach(loadImage);
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        loadImage(entry.target);
        obs.unobserve(entry.target);
      });
    },
    { rootMargin: '200px 0px' }
  );

  images.forEach((img) => observer.observe(img));
};

/* --------------------------------------------------------------------------
   Footer year
   -------------------------------------------------------------------------- */
const initFooterYear = () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
};

/* --------------------------------------------------------------------------
   Initialize on DOM ready
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initWhatsAppLinks();
  initNavigation();
  initLazyImages();
  initFooterYear();
});
