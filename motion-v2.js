(() => {
  'use strict';

  const root = document.getElementById('a-side-root');
  if (!root) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const body = document.body;
  const bSide = document.getElementById('b-side-root');
  const top = root.querySelector('#top');
  const concept = root.querySelector('#concept');

  root.classList.add('tatsu-motion-v2');
  if (!reduced) root.classList.add('tatsu-motion-boot');

  function syncBSideState() {
    body.classList.toggle('tatsu-b-visible', Boolean(bSide && bSide.classList.contains('visible')));
  }

  syncBSideState();
  if (bSide) new MutationObserver(syncBSideState).observe(bSide, { attributes: true, attributeFilter: ['class'] });

  function addBlockField(section) {
    if (!section || section.querySelector(':scope > .tatsu-block-field')) return;
    const field = document.createElement('div');
    field.className = 'tatsu-block-field';
    field.setAttribute('aria-hidden', 'true');
    field.innerHTML = '<i class="tatsu-motion-block"></i><i class="tatsu-motion-block"></i>';
    section.appendChild(field);
  }

  [top, root.querySelector('#service'), root.querySelector('#works'), root.querySelector('#about'), root.querySelector('#contact')]
    .forEach(addBlockField);

  function splitCharacters(element) {
    if (!element || element.dataset.tatsuSplit === 'true') return;
    const text = element.textContent || '';
    element.dataset.tatsuSplit = 'true';
    element.setAttribute('aria-label', text);
    element.textContent = '';
    Array.from(text).forEach((character, index) => {
      const span = document.createElement('span');
      span.className = 'tatsu-char';
      span.setAttribute('aria-hidden', 'true');
      span.style.setProperty('--char-index', String(index));
      span.textContent = character === ' ' ? '\u00a0' : character;
      element.appendChild(span);
    });
  }

  const charLines = concept
    ? Array.from(concept.querySelectorAll('.kinetic-line > span, .concept-en'))
    : [];
  charLines.forEach(splitCharacters);

  const statements = concept
    ? Array.from(concept.querySelectorAll('.concept-statement'))
    : [];

  statements.forEach((statement, index) => {
    const slab = document.createElement('i');
    slab.className = 'tatsu-concept-slab';
    slab.setAttribute('aria-hidden', 'true');
    slab.style.setProperty('--slab-top', `${23 + (index % 3) * 18}%`);
    slab.style.setProperty('--slab-width', `${48 + (index % 2) * 17}%`);
    statement.appendChild(slab);
  });

  const revealSelectors = [
    '#service .section-eyebrow',
    '#service .service-heading',
    '#service .flow-item',
    '#service .flow-right',
    '#service .service-bridge',
    '#service .service-card',
    '#works .section-eyebrow',
    '#works .home-collection-tabs',
    '#works .home-works-panel.is-active .home-subtabs',
    '#works .home-works-panel.is-active .home-works-layout',
    '#about > div',
    '#contact .section-eyebrow',
    '#contact .contact-layout'
  ];

  const revealTargets = Array.from(root.querySelectorAll(revealSelectors.join(',')));
  revealTargets.forEach((element, index) => {
    element.dataset.tatsuReveal = '';
    element.style.setProperty('--tatsu-delay', `${(index % 4) * 85}ms`);
  });

  function revealElement(element) {
    element.classList.add('is-tatsu-visible');
  }

  if ('IntersectionObserver' in window && !reduced) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        revealElement(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });

    revealTargets.forEach(element => revealObserver.observe(element));

    const charObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-char-live');
      });
    }, { threshold: 0.42, rootMargin: '0px 0px -8% 0px' });

    charLines.forEach(element => charObserver.observe(element));

    const statementObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-slab-live');
      });
    }, { threshold: 0.28 });

    statements.forEach(statement => statementObserver.observe(statement));

    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-tatsu-section-live');
      });
    }, { threshold: 0.2 });

    [root.querySelector('#service'), root.querySelector('#works'), root.querySelector('#about'), root.querySelector('#contact')]
      .filter(Boolean)
      .forEach(section => sectionObserver.observe(section));
  } else {
    revealTargets.forEach(revealElement);
    charLines.forEach(element => element.classList.add('is-char-live'));
    statements.forEach(statement => statement.classList.add('is-slab-live'));
  }

  function revealActiveWorksPanel() {
    const panel = root.querySelector('#works .home-works-panel.is-active');
    if (!panel) return;
    panel.querySelectorAll('.home-subtabs, .home-works-layout').forEach((element, index) => {
      element.dataset.tatsuReveal = '';
      element.style.setProperty('--tatsu-delay', `${index * 90}ms`);
      window.requestAnimationFrame(() => revealElement(element));
    });
  }

  root.querySelectorAll('[data-home-collection]').forEach(button => {
    button.addEventListener('click', () => window.setTimeout(revealActiveWorksPanel, 0));
  });

  root.querySelectorAll('.side-choice svg rect').forEach((pixel, index) => {
    pixel.style.setProperty('--pixel-index', String(index));
    pixel.style.setProperty('--pixel-x', `${((index % 4) - 1.5) * 18}px`);
    pixel.style.setProperty('--pixel-y', `${((index % 5) - 2) * 12}px`);
  });

  root.querySelectorAll('[data-lang]').forEach(button => {
    button.addEventListener('click', () => {
      window.setTimeout(() => {
        concept?.querySelectorAll('.concept-en').forEach(element => {
          const rect = element.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) element.classList.add('is-char-live');
        });
      }, 0);
    });
  });

  const motionSections = Array.from(root.querySelectorAll('#concept, #service, #works, #about, #contact'));
  const navSymbol = root.querySelector('.nav-symbol');
  const spiral = root.querySelector('.spiral-diagram');
  const worksVisual = root.querySelector('#works .home-static-mosaic');
  const aboutImage = root.querySelector('#about img');
  let ticking = false;

  function renderScrollMotion() {
    ticking = false;
    if (reduced || root.style.display === 'none') return;
    const viewport = window.innerHeight || 1;
    const pageProgress = clamp(window.scrollY / Math.max(document.documentElement.scrollHeight - viewport, 1), 0, 1);
    navSymbol?.style.setProperty('--nav-turn', `${(pageProgress * 110).toFixed(2)}deg`);

    motionSections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const progress = clamp((viewport - rect.top) / (viewport + rect.height), 0, 1);
      const drift = (progress - .5) * (index % 2 === 0 ? 62 : -62);
      section.style.setProperty('--tatsu-section-drift', `${drift.toFixed(2)}px`);
    });

    if (spiral) {
      const rect = spiral.getBoundingClientRect();
      const progress = clamp((viewport - rect.top) / (viewport + rect.height), 0, 1);
      spiral.style.setProperty('--spiral-turn', `${((progress - .5) * 8).toFixed(2)}deg`);
      spiral.style.setProperty('--spiral-y', `${((.5 - progress) * 34).toFixed(2)}px`);
    }

    if (worksVisual) {
      const rect = worksVisual.getBoundingClientRect();
      const progress = clamp((viewport - rect.top) / (viewport + rect.height), 0, 1);
      worksVisual.style.setProperty('--works-y', `${((.5 - progress) * 46).toFixed(2)}px`);
    }

    if (aboutImage) {
      const rect = aboutImage.getBoundingClientRect();
      const progress = clamp((viewport - rect.top) / (viewport + rect.height), 0, 1);
      aboutImage.style.setProperty('--about-y', `${((.5 - progress) * 28).toFixed(2)}px`);
      aboutImage.style.setProperty('--about-scale', (1.05 - progress * .05).toFixed(4));
    }
  }

  function requestRender() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(renderScrollMotion);
  }

  window.addEventListener('scroll', requestRender, { passive: true });
  window.addEventListener('resize', requestRender, { passive: true });
  requestRender();

  function completeTopIntro() {
    root.classList.remove('tatsu-motion-boot');
    root.classList.add('tatsu-top-live');
    top?.classList.add('is-tatsu-section-live');
    document.documentElement.classList.remove('tatsu-intro-lock');
    requestRender();
  }

  function runIntro() {
    if (window.TATSU_PHASE6_INTRO) {
      completeTopIntro();
      return;
    }
    if (reduced || window.location.hash || window.scrollY > 4) {
      completeTopIntro();
      return;
    }

    document.documentElement.classList.add('tatsu-intro-lock');
    const intro = document.createElement('div');
    intro.id = 'tatsu-motion-intro';
    intro.setAttribute('aria-hidden', 'true');
    intro.innerHTML = '<i class="intro-mass"></i><div class="intro-lockup"><img class="intro-symbol" src="assets/swirl.png" alt=""><img class="intro-word" src="assets/wordmark.png" alt=""></div>';
    body.appendChild(intro);

    const introLockup = intro.querySelector('.intro-lockup');
    const introSymbol = intro.querySelector('.intro-symbol');
    const target = root.querySelector('#top .brand-lockup');

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => intro.classList.add('is-live'));
    });

    window.setTimeout(() => {
      if (!introLockup || !target || !introLockup.animate) {
        intro.remove();
        completeTopIntro();
        return;
      }

      const targetRect = target.getBoundingClientRect();
      const targetCenterX = targetRect.left + targetRect.width / 2;
      const targetCenterY = targetRect.top + targetRect.height / 2;
      const startWidth = Math.min(1080, window.innerWidth * .84);

      const handoff = introLockup.animate([
        {
          left: '50vw',
          top: '50vh',
          width: `${startWidth}px`,
          transform: 'translate3d(-50%, -50%, 0)'
        },
        {
          left: `${targetCenterX}px`,
          top: `${targetCenterY}px`,
          width: `${targetRect.width}px`,
          transform: 'translate3d(-50%, -50%, 0)'
        }
      ], {
        duration: 1050,
        easing: 'cubic-bezier(.76, 0, .24, 1)',
        fill: 'forwards'
      });

      introSymbol?.animate([
        { transform: 'rotate(18deg)' },
        { transform: 'rotate(82deg)' },
        { transform: 'rotate(0deg)' }
      ], {
        duration: 1050,
        easing: 'cubic-bezier(.16, 1, .3, 1)',
        fill: 'forwards'
      });

      handoff.finished.then(() => {
        completeTopIntro();
        window.requestAnimationFrame(() => intro.remove());
      }).catch(() => {
        intro.remove();
        completeTopIntro();
      });
    }, 1450);
  }

  runIntro();
})();
