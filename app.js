/* ============================================
   PIXEL DETECTIVE ACADEMY — Global JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ===== 1. PROGRESS BAR SCROLL =====
  const progressBar = document.getElementById('progressBar');
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = progress + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // ===== 2. REVEAL ON SCROLL =====
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));

  // ===== 3. TOMBOL PRINT / PDF =====
  const printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
      window.print();
    });
  }
  window.addEventListener('beforeprint', () => {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  });

  // ===== 4. TOMBOL "TANDAI SELESAI" PER FASE =====
  const markDoneBtn = document.querySelector('.mark-done-btn');
  if (markDoneBtn) {
    const phase = markDoneBtn.dataset.phase;
    const storageKey = `pixel-detective-phase-${phase}-done`;

    // Cek status tersimpan
    if (localStorage.getItem(storageKey) === 'true') {
      markDoneBtn.classList.add('done');
      markDoneBtn.textContent = '✓ Fase Ini Selesai';
    }

    markDoneBtn.addEventListener('click', () => {
      const isDone = markDoneBtn.classList.toggle('done');
      if (isDone) {
        markDoneBtn.textContent = '✓ Fase Ini Selesai';
        localStorage.setItem(storageKey, 'true');
      } else {
        markDoneBtn.textContent = '✓ Tandai Fase Ini Selesai';
        localStorage.setItem(storageKey, 'false');
      }
    });
  }

  // ===== 5. CHECKLIST PERSISTENCE =====
  const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
  checkboxes.forEach(cb => {
    const key = `pixel-detective-check-${cb.dataset.check}`;
    if (localStorage.getItem(key) === 'true') {
      cb.checked = true;
    }
    cb.addEventListener('change', () => {
      localStorage.setItem(key, cb.checked ? 'true' : 'false');
    });
  });

  // ===== 6. HIGHLIGHT NAVIGASI AKTIF =====
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.toc a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) link.classList.add('active');
  });

  // ===== 7. TYPING EFFECT PADA TAGLINE HERO =====
  const heroTagline = document.querySelector('.hero .tagline');
  if (heroTagline && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const originalText = heroTagline.textContent;
    heroTagline.textContent = '';
    let i = 0;
    function typeChar() {
      if (i < originalText.length) {
        heroTagline.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeChar, 30);
      }
    }
    setTimeout(typeChar, 800);
  }

  // ===== 8. SMOOTH SCROLL UNTUK LINK INTERNAL =====
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== 9. CONSOLE EASTER EGG =====
  console.log(
    '%c🕵️ PIXEL DETECTIVE ACADEMY',
    'color: #39ff14; font-size: 20px; font-weight: bold; font-family: monospace;'
  );
  console.log(
    '%c"I don\'t hack systems. I investigate them, one pixel at a time."',
    'color: #8ba38b; font-style: italic; font-family: monospace;'
  );
  console.log(
    '%c> Zoom in. Find the flaw. Own the pixel.',
    'color: #2a8f1a; font-family: monospace;'
  );
});