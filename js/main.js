/* ============================================================
   GOLDCOIN — A Moeda da Nova Era
   JavaScript v1.0
   ============================================================ */

'use strict';

// ============================================================
// PARTICLES CANVAS
// ============================================================
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.6 + 0.1;
      this.color = Math.random() > 0.7 ? '#C9A227' : '#5C4A1E';
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Create particles
  for (let i = 0; i < 120; i++) {
    particles.push(new Particle());
  }

  // Draw connections
  function drawConnections() {
    const maxDist = 100;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          ctx.save();
          ctx.globalAlpha = (1 - dist / maxDist) * 0.08;
          ctx.strokeStyle = '#C9A227';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    animationId = requestAnimationFrame(animate);
  }
  animate();
})();

// ============================================================
// NAVBAR SCROLL
// ============================================================
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }, { passive: true });

  // Active link highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--gold-bright)';
          }
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => observer.observe(s));
})();

// ============================================================
// HAMBURGER MENU
// ============================================================
(function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Abrir menu');
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
})();

// ============================================================
// SMOOTH SCROLL
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navHeight = document.getElementById('navbar').offsetHeight;
    const targetY = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  });
});

// ============================================================
// COUNTER ANIMATION
// ============================================================
(function initCounters() {
  const counters = document.querySelectorAll('[data-target]');
  if (!counters.length) return;

  function formatNumber(num) {
    return num.toLocaleString('pt-PT');
  }

  function animateCounter(el, target, duration = 2000) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        el.textContent = formatNumber(target);
        clearInterval(timer);
      } else {
        el.textContent = formatNumber(Math.floor(start));
      }
    }, 16);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        animateCounter(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

// ============================================================
// FAQ ACCORDION
// ============================================================
(function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const btn = item.querySelector('.faq-q');
    const ans = item.querySelector('.faq-a');
    if (!btn || !ans) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      items.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-a').style.maxHeight = '0';
      });
      // Open this one if it was closed
      if (!isOpen) {
        item.classList.add('open');
        ans.style.maxHeight = ans.scrollHeight + 'px';
      }
    });
  });
})();

// ============================================================
// SCROLL REVEAL
// ============================================================
(function initScrollReveal() {
  const elements = document.querySelectorAll(
    '.stat-card, .pillar, .eco-card, .road-phase, .wp-chapter, .buy-step, .contact-card, .faq-item'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = (entry.target.dataset.delay || 0) * 100;
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
})();

// ============================================================
// NEWSLETTER
// ============================================================
function handleSubscribe(e) {
  e.preventDefault();
  const input = document.querySelector('.email-input');
  if (!input || !input.value.includes('@')) {
    input.style.borderColor = '#f44336';
    setTimeout(() => { input.style.borderColor = ''; }, 2000);
    return;
  }
  const btn = e.target;
  const original = btn.querySelector('span') ? btn.querySelector('span').textContent : btn.textContent;
  btn.innerHTML = '<span>✓ Inscrito!</span>';
  btn.style.background = 'linear-gradient(135deg, #4CAF50, #66BB6A)';
  input.value = '';
  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = '';
  }, 3000);
}

// ============================================================
// SIMULATED PRICE TICKER
// ============================================================
(function initPriceTicker() {
  const BASE_PRICE = 2208.08;
  let currentPrice = BASE_PRICE;

  function formatPrice(p) {
    return p.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '$';
  }

  function updatePrice() {
    const change = (Math.random() - 0.5) * 5;
    currentPrice = Math.max(2100, Math.min(2400, currentPrice + change));
    const ticker = document.getElementById('price-ticker');
    if (ticker) ticker.textContent = formatPrice(currentPrice);
  }

  setInterval(updatePrice, 4000);
})();

// ============================================================
// DONUT CHART ANIMATION
// ============================================================
(function initDonutAnimation() {
  const segs = document.querySelectorAll('.donut-seg');
  if (!segs.length) return;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      segs.forEach((seg, i) => {
        seg.style.transition = `stroke-dasharray 1.2s ${i * 0.2}s cubic-bezier(0.4, 0, 0.2, 1)`;
      });
      observer.disconnect();
    }
  }, { threshold: 0.3 });

  const donut = document.querySelector('.donut-wrapper');
  if (donut) observer.observe(donut);
})();

// ============================================================
// SECTION TITLE DECORATION ON SCROLL
// ============================================================
(function initSectionTitles() {
  const titles = document.querySelectorAll('.section-title');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'none';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  titles.forEach(t => {
    t.style.opacity = '0';
    t.style.transform = 'translateY(15px)';
    t.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(t);
  });
})();

console.log('%cGOLDCOIN (GLD) — A Moeda da Nova Era', 'color: #C9A227; font-family: serif; font-size: 16px; font-weight: bold;');
console.log('%c✦ Fé · Alinhamento · Abundância · Confiança ✦', 'color: #8B6914; font-size: 12px;');
