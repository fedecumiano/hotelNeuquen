/**
 * Apart Hotel Añelo — Site Script
 */

const SITE_CONFIG = {
  whatsappNumber: '2996101252',
  whatsappMessage:
    'Hola, quisiera consultar disponibilidad y tarifas en Apart Hotel Añelo.',
  whatsappEnterpriseMessage:
    'Hola, solicito una cotización para empresas en Apart Hotel Añelo. ¿Podrían enviarme información y tarifas?',
};

const buildWhatsAppUrl = (phone, message) => {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
};

const WHATSAPP_ICON_SVG = `<svg class="icon-wa" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="20" height="20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;

const initWhatsAppLinks = () => {
  const bookingUrl = buildWhatsAppUrl(
    SITE_CONFIG.whatsappNumber,
    SITE_CONFIG.whatsappMessage
  );
  const enterpriseUrl = buildWhatsAppUrl(
    SITE_CONFIG.whatsappNumber,
    SITE_CONFIG.whatsappEnterpriseMessage
  );

  document.querySelectorAll('[data-whatsapp-booking]').forEach((link) => {
    link.href = bookingUrl;
    link.setAttribute('rel', 'noopener noreferrer');
    link.setAttribute('target', '_blank');
  });

  document.querySelectorAll('[data-whatsapp-enterprise]').forEach((link) => {
    link.href = enterpriseUrl;
    link.setAttribute('rel', 'noopener noreferrer');
    link.setAttribute('target', '_blank');
  });

  document.querySelectorAll('[data-whatsapp-unit]').forEach((link) => {
    const unitLabel = link.getAttribute('data-whatsapp-unit');
    const message = `Hola, quisiera consultar disponibilidad para un departamento ${unitLabel} en Apart Hotel Añelo.`;
    link.href = buildWhatsAppUrl(SITE_CONFIG.whatsappNumber, message);
    link.setAttribute('rel', 'noopener noreferrer');
    link.setAttribute('target', '_blank');
  });

  document.querySelectorAll('.book-now:not([data-wa-icon])').forEach((btn) => {
    btn.setAttribute('data-wa-icon', 'true');
    const label = btn.textContent.trim();
    btn.innerHTML = `${WHATSAPP_ICON_SVG}<span>${label}</span>`;
  });
};

const initHeaderScroll = () => {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const update = () => {
    header.classList.toggle('site-header--scrolled', window.scrollY > 24);
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
};

const initNavigation = () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.primary-nav');
  const navLinks = document.querySelectorAll('.nav-list a');

  if (!toggle || !nav) return;

  const closeNav = () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú de navegación');
    nav.classList.remove('is-open');
    document.body.classList.remove('nav-open');
  };

  const openNav = () => {
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Cerrar menú de navegación');
    nav.classList.add('is-open');
    document.body.classList.add('nav-open');
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

const initUnitSliders = () => {
  document.querySelectorAll('[data-unit-slider]').forEach((slider) => {
    const track = slider.querySelector('.unit-slider-track');
    const slides = slider.querySelectorAll('.unit-slider-slide');
    const prev = slider.querySelector('[data-slider-prev]');
    const next = slider.querySelector('[data-slider-next]');
    const dotsContainer = slider.querySelector('.unit-slider-dots');

    if (!track || slides.length < 2) return;

    let index = 0;

    const goTo = (i) => {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      if (dotsContainer) {
        dotsContainer.querySelectorAll('button').forEach((dot, di) => {
          dot.setAttribute('aria-selected', di === index ? 'true' : 'false');
        });
      }
    };

    if (dotsContainer) {
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'unit-slider-dot';
        dot.setAttribute('aria-label', `Foto ${i + 1}`);
        dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      });
    }

    prev?.addEventListener('click', () => goTo(index - 1));
    next?.addEventListener('click', () => goTo(index + 1));
  });
};

const initUnitLightbox = () => {
  const dialog = document.getElementById('unit-lightbox');
  if (!dialog) return;

  const imgEl = dialog.querySelector('img');
  const closeBtn = dialog.querySelector('[data-lightbox-close]');
  const prevBtn = dialog.querySelector('[data-lightbox-prev]');
  const nextBtn = dialog.querySelector('[data-lightbox-next]');

  if (!imgEl) return;

  let images = [];
  let index = 0;

  const show = (i) => {
    if (!images.length) return;
    index = (i + images.length) % images.length;
    const source = images[index];
    imgEl.src = source.currentSrc || source.src;
    imgEl.alt = source.alt || 'Foto del departamento';
  };

  const open = (slider, startIndex) => {
    images = Array.from(slider.querySelectorAll('.unit-slider-slide img'));
    if (!images.length) return;
    dialog.classList.toggle('unit-lightbox--single', images.length < 2);
    show(startIndex);
    dialog.showModal();
    document.body.classList.add('lightbox-open');
  };

  const close = () => {
    if (dialog.open) dialog.close();
  };

  dialog.addEventListener('close', () => {
    document.body.classList.remove('lightbox-open');
  });

  document.querySelectorAll('[data-unit-slider]').forEach((slider) => {
    slider.querySelectorAll('.unit-slider-slide img').forEach((img, i) => {
      img.setAttribute('tabindex', '0');
      img.setAttribute('role', 'button');
      img.setAttribute('aria-haspopup', 'dialog');
      img.setAttribute(
        'aria-label',
        `${img.alt || 'Foto del departamento'}. Abrir en pantalla completa`
      );

      const openThis = () => open(slider, i);
      img.addEventListener('click', openThis);
      img.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openThis();
        }
      });
    });
  });

  closeBtn?.addEventListener('click', close);
  prevBtn?.addEventListener('click', () => show(index - 1));
  nextBtn?.addEventListener('click', () => show(index + 1));

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) close();
  });

  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') show(index - 1);
    if (event.key === 'ArrowRight') show(index + 1);
    if (event.key === 'Escape') close();
  });
};

const initFooterYear = () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
};

document.addEventListener('DOMContentLoaded', () => {
  initWhatsAppLinks();
  initHeaderScroll();
  initNavigation();
  initUnitSliders();
  initUnitLightbox();
  initFooterYear();
});