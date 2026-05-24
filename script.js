/* ============================================================
   ADITYA PANDEY PORTFOLIO — script.js
   ============================================================ */

(function () {
  'use strict';

  /* ─── LOADER ─────────────────────────────────────────────────── */
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loader-bar');
  const loaderPercent = document.getElementById('loader-percent');

  let loadProgress = 0;
  const loadInterval = setInterval(() => {
    loadProgress += Math.random() * 18 + 4;
    if (loadProgress >= 100) {
      loadProgress = 100;
      clearInterval(loadInterval);
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
      }, 400);
    }
    loaderBar.style.width = loadProgress + '%';
    loaderPercent.textContent = Math.floor(loadProgress) + '%';
  }, 60);

  document.body.style.overflow = 'hidden';

  /* ─── CUSTOM CURSOR ─────────────────────────────────────────── */
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  // Smooth follower
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.14;
    followerY += (mouseY - followerY) * 0.14;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover effects
  const hoverTargets = document.querySelectorAll('a, button, .stat-card, .skill-tag, .tech-tag, .chip, .project-card__img-wrap');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  const textTargets = document.querySelectorAll('p, li');
  textTargets.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-text'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-text'));
  });

  /* ─── NAVIGATION ─────────────────────────────────────────────── */
  const nav = document.getElementById('nav');
  const menuBtn = document.getElementById('menu-btn');
  const navMenu = document.getElementById('nav-menu');
  let menuOpen = false;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  menuBtn.addEventListener('click', () => {
    menuOpen = !menuOpen;
    menuBtn.classList.toggle('active', menuOpen);
    navMenu.classList.toggle('open', menuOpen);
    menuBtn.setAttribute('aria-expanded', menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  });

  // Close menu on nav link click
  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      menuBtn.classList.remove('active');
      navMenu.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen) {
      menuOpen = false;
      menuBtn.classList.remove('active');
      navMenu.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    }
  });

  /* ─── HERO CANVAS — PARTICLE FIELD ───────────────────────────── */
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');

  let particles = [];
  let animFrame;

  function resizeCanvas() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.floor((canvas.width * canvas.height) / 12000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x:  Math.random() * canvas.width,
        y:  Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r:  Math.random() * 1.5 + 0.5,
        o:  Math.random() * 0.5 + 0.1,
      });
    }
  }

  let heroMx = canvas ? canvas.width / 2 : 0;
  let heroMy = canvas ? canvas.height / 2 : 0;

  document.addEventListener('mousemove', (e) => {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    heroMx = e.clientX - rect.left;
    heroMy = e.clientY - rect.top;
  });

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      // Wrap
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      // Mouse repel
      const dx = heroMx - p.x;
      const dy = heroMy - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        p.x -= dx * 0.012;
        p.y -= dy * 0.012;
      }

      // Draw
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(124, 92, 252, ${p.o})`;
      ctx.fill();

      // Lines
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx2 = p.x - q.x;
        const dy2 = p.y - q.y;
        const d2  = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        if (d2 < 100) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(124, 92, 252, ${(1 - d2 / 100) * 0.15})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    animFrame = requestAnimationFrame(drawParticles);
  }

  if (canvas) {
    resizeCanvas();
    createParticles();
    drawParticles();
    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    }, { passive: true });
  }

  /* ─── SCROLL REVEAL ───────────────────────────────────────────── */
  function addRevealClasses() {
    const sections = [
      '.about__text', '.about__lead', '.about__body', '.about__actions',
      '.stat-card', '.timeline__item', '.timeline__card',
      '.project-card--featured', '.project-card--mini',
      '.skill-group', '.contact__tagline', '.contact__email', '.contact__socials',
      '.section__header',
    ];
    sections.forEach(sel => {
      document.querySelectorAll(sel).forEach((el, i) => {
        el.classList.add('reveal');
        if (i === 1) el.classList.add('reveal-delay-1');
        if (i === 2) el.classList.add('reveal-delay-2');
        if (i === 3) el.classList.add('reveal-delay-3');
      });
    });
  }

  addRevealClasses();

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ─── SMOOTH SCROLL ───────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ─── ACTIVE NAV INDICATOR ────────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav__link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === '#' + entry.target.id
          );
        });
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px' });

  sections.forEach(s => navObserver.observe(s));

  /* ─── STAT COUNTER ANIMATION ─────────────────────────────────── */
  function animateCounter(el, target, suffix, duration) {
    const startTime = performance.now();
    const isFloat = target % 1 !== 0;

    function update(now) {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased    = 1 - Math.pow(1 - progress, 3);
      const value    = eased * parseFloat(target);
      el.textContent = (isFloat ? value.toFixed(1) : Math.floor(value)) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const numEl = entry.target.querySelector('.stat-card__num');
        if (!numEl) return;
        const text = numEl.textContent;
        // parse number and suffix
        const match = text.match(/^([0-9.]+)(.*)$/);
        if (match) {
          animateCounter(numEl, parseFloat(match[1]), match[2], 1600);
        }
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-card').forEach(el => statObserver.observe(el));

  /* ─── TILT ON CARDS ───────────────────────────────────────────── */
  function applyTilt(card) {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / rect.width;
      const dy     = (e.clientY - cy) / rect.height;
      const tiltX  = -dy * 8;
      const tiltY  =  dx * 8;
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  }

  document.querySelectorAll('.stat-card, .skill-group, .project-card--mini').forEach(applyTilt);

  /* ─── TYPING EFFECT in hero subtitle ─────────────────────────── */
  // Subtle blinking cursor on hero subtitle accent
  const accent = document.querySelector('.hero__subtitle-accent');
  if (accent) {
    accent.style.borderRight = '2px solid transparent';
    let vis = true;
    setInterval(() => {
      vis = !vis;
      accent.style.borderRightColor = vis ? 'var(--accent-cyan)' : 'transparent';
    }, 600);
  }

  /* ─── MAGNETIC BUTTONS ────────────────────────────────────────── */
  document.querySelectorAll('.btn--primary, .btn--ghost').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) * 0.25;
      const dy   = (e.clientY - cy) * 0.25;
      btn.style.transform = `translate(${dx}px, ${dy}px) translateY(-2px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  /* ─── PARALLAX HERO ──────────────────────────────────────────── */
  const heroBgImg = document.querySelector('.hero__bg-img');
  window.addEventListener('scroll', () => {
    if (!heroBgImg) return;
    const scrolled = window.scrollY;
    heroBgImg.style.transform = `translateY(${scrolled * 0.25}px)`;
  }, { passive: true });

})();
