/* =========================================================
   BOOT SEQUENCE
========================================================= */
(function bootSequence(){
  const bootScreen = document.getElementById('boot-screen');
  const bootLines  = document.getElementById('boot-lines');
  const bootBar     = document.getElementById('boot-bar-fill');

  const lines = [
    'INICIANDO TONELLO_OS v2.6 ...',
    'CARREGANDO MÓDULO: HTML5.......... OK',
    'CARREGANDO MÓDULO: CSS3............ OK',
    'CARREGANDO MÓDULO: JAVASCRIPT...... OK',
    'ESTABELECENDO CONEXÃO COM O RECRUTADOR...',
    'ACESSO CONCEDIDO.'
  ];

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced){
    bootLines.textContent = lines.join('\n');
    finishBoot();
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;
  let output = '';

  function typeNextChar(){
    if (lineIndex >= lines.length){
      finishBoot();
      return;
    }

    const currentLine = lines[lineIndex];

    if (charIndex < currentLine.length){
      output += currentLine[charIndex];
      charIndex++;
      bootLines.textContent = output;
      setTimeout(typeNextChar, 12 + Math.random() * 18);
    } else {
      output += '\n';
      lineIndex++;
      charIndex = 0;
      bootBar.style.width = ((lineIndex / lines.length) * 100) + '%';
      setTimeout(typeNextChar, 120);
    }
  }

  function finishBoot(){
    bootBar.style.width = '100%';
    setTimeout(() => {
      bootScreen.classList.add('hidden');
      document.body.style.overflow = '';
    }, 500);
  }

  document.body.style.overflow = 'hidden';
  setTimeout(typeNextChar, 300);

  // Safety net: never trap the user behind the boot screen.
  setTimeout(() => {
    bootScreen.classList.add('hidden');
    document.body.style.overflow = '';
  }, 6000);
})();

/* =========================================================
   MATRIX RAIN BACKGROUND
========================================================= */
(function matrixRain(){
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const chars = 'アカサタナハマヤラワ01アイウエオ<>{}[]/#$%*+-01';
  let fontSize = 16;
  let columns = 0;
  let drops = [];

  function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = new Array(columns).fill(0).map(() => Math.floor(Math.random() * -50));
  }

  function draw(){
    ctx.fillStyle = 'rgba(5,7,12,0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++){
      const text = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      ctx.fillStyle = Math.random() > 0.985 ? '#ff3ea5' : 'rgba(46,230,214,0.65)';
      ctx.fillText(text, x, y);

      if (y > canvas.height && Math.random() > 0.975){
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  resize();
  window.addEventListener('resize', resize);

  if (!prefersReduced){
    setInterval(draw, 55);
  } else {
    canvas.style.display = 'none';
  }
})();

/* =========================================================
   MOBILE NAV TOGGLE
========================================================= */
(function mobileNav(){
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('hud-nav');

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* =========================================================
   SKILL BARS — ANIMATE WHEN IN VIEW
========================================================= */
(function skillBars(){
  const bars = document.querySelectorAll('.skill-bar');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
})();

/* =========================================================
   PROJECT CARDS — "SAIBA MAIS" TOGGLE
========================================================= */
(function projectToggles(){
  document.querySelectorAll('.more-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.project-card');
      const isExpanded = card.classList.toggle('expanded');
      btn.innerHTML = isExpanded
        ? 'FECHAR <span>+</span>'
        : 'SAIBA MAIS <span>+</span>';
    });
  });
})();

/* =========================================================
   ACTIVE NAV LINK ON SCROLL
========================================================= */
(function activeNavOnScroll(){
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.hud-nav a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(section => observer.observe(section));
})();