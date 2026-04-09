/* ============================================================
   SHAHNAZ MED — Main JavaScript
   Handles: Loader, Navbar, Animations, Form, Mobile Menu
   ============================================================ */

// === PAGE LOADER ===
window.addEventListener('load', function () {
  const loader = document.getElementById('page-loader');
  const progress = document.querySelector('.loader-progress');
  if (!loader) return;

  // Animate progress bar
  let width = 0;
  const interval = setInterval(() => {
    width += Math.random() * 18;
    if (width >= 100) {
      width = 100;
      clearInterval(interval);
      if (progress) progress.style.width = '100%';
      setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => loader.remove(), 500);
      }, 300);
    }
    if (progress) progress.style.width = width + '%';
  }, 80);
});

// === NAVBAR SCROLL EFFECT ===
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// === ACTIVE NAV LINK ===
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPath || (currentPath === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// === HAMBURGER / MOBILE MENU ===
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });

  // Close on link click
  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
    }
  });
}

// === SCROLL REVEAL ANIMATIONS ===
function initReveal() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => observer.observe(el));
}

// Run after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initCounters();
  initContactForm();
  initSmoothScroll();
  addCardHoverEffects();
});

// === ANIMATED COUNTERS ===
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        let start = 0;
        const duration = 1800;
        const step = target / (duration / 16);

        const tick = () => {
          start += step;
          if (start < target) {
            el.textContent = Math.floor(start) + suffix;
            requestAnimationFrame(tick);
          } else {
            el.textContent = target + suffix;
          }
        };
        tick();
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// === CONTACT FORM ===
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = form.querySelector('.form-submit');
    const originalText = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;

    // Simulate async send
    setTimeout(() => {
      const successMsg = document.getElementById('form-success');
      if (successMsg) {
        successMsg.classList.add('show');
      }
      form.reset();
      btn.textContent = originalText;
      btn.disabled = false;

      setTimeout(() => {
        if (successMsg) successMsg.classList.remove('show');
      }, 5000);
    }, 1200);
  });
}

// === SMOOTH SCROLL for anchor links ===
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// === CARD HOVER EFFECTS (tilt) ===
function addCardHoverEffects() {
  const cards = document.querySelectorAll('.why-card, .mvv-card, .phil-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// === NOTIFY FORM (Products Page) ===
const notifyForm = document.getElementById('notify-form');
if (notifyForm) {
  notifyForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const input = this.querySelector('input');
    const btn = this.querySelector('button');

    if (input.value) {
      btn.textContent = '✓ Subscribed!';
      btn.style.background = 'linear-gradient(135deg, #22C55E, #16A34A)';
      input.value = '';
      input.placeholder = 'We\'ll notify you when we launch!';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = 'Notify Me';
        btn.style.background = '';
        btn.disabled = false;
        input.placeholder = 'Enter your email';
      }, 4000);
    }
  });
}

// === STAGGER ANIMATION HELPER ===
// Adds delay classes to children of a container
document.querySelectorAll('[data-stagger]').forEach(container => {
  const children = container.children;
  Array.from(children).forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.1}s`;
  });
});

// === PARALLAX on Hero (subtle) ===
const hero = document.querySelector('.hero');
if (hero) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroContent = hero.querySelector('.hero-content');
    if (heroContent && scrolled < hero.offsetHeight) {
      heroContent.style.transform = `translateY(${scrolled * 0.12}px)`;
    }
  });
}
