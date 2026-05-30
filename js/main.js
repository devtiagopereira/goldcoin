'use strict';

(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!canvas || reduceMotion) return;

  const context = canvas.getContext('2d');
  const particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.radius = Math.random() * 1.25 + 0.2;
      this.velocityX = (Math.random() - 0.5) * 0.22;
      this.velocityY = (Math.random() - 0.5) * 0.22;
      this.opacity = Math.random() * 0.55 + 0.1;
    }

    update() {
      this.x += this.velocityX;
      this.y += this.velocityY;

      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }

    draw() {
      context.beginPath();
      context.fillStyle = `rgba(216, 165, 45, ${this.opacity})`;
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.fill();
    }
  }

  function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });
    requestAnimationFrame(animate);
  }

  resize();
  window.addEventListener('resize', resize);
  for (let index = 0; index < 95; index += 1) particles.push(new Particle());
  animate();
})();

(function initNavigation() {
  const header = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');

  if (!header || !hamburger || !links) return;

  function closeMenu() {
    links.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Abrir menu');
  }

  hamburger.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });

  links.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 24);
  }, { passive: true });
})();

(function initCounters() {
  const counters = document.querySelectorAll('[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      const target = Number(element.dataset.target);
      const startedAt = performance.now();
      const duration = 1500;

      function update(now) {
        const progress = Math.min((now - startedAt) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        element.textContent = Math.floor(target * easedProgress).toLocaleString('pt-PT');
        if (progress < 1) requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
      observer.unobserve(element);
    });
  }, { threshold: 0.5 });

  counters.forEach((counter) => observer.observe(counter));
})();

(function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  elements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index * 70, 350)}ms`;
    observer.observe(element);
  });
})();
