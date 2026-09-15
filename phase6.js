(() => {
  'use strict';

  const root = document.getElementById('a-side-root');
  if (!root) return;

  const $ = selector => root.querySelector(selector);
  const $$ = selector => Array.from(root.querySelectorAll(selector));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

  /* True J/E switch for the complete A-side. */
  const content = {
    ja: {
      heroTagline: '問いから考え、課題をともに解く。',
      heroContact: 'Contact <span>＋</span>',
      serviceHeading: '本当に向き合うべき「問い」を設計します。',
      thinking: '私たちの考え方',
      flowTitles: ['複雑な課題を構造として捉える', '問いを深め、戦略を描く', '形にし、価値として広げる'],
      flowDescriptions: [
        '現象の表層ではなく、<br>背景にある構造を見抜く。',
        '問いを起点に、揺れながらも<br>本質に向かって思考を深める。',
        '本質にたどり着いた先に、<br>意味のあるアウトプットを生み出し、<br>社会へと広げていく。'
      ],
      diagramTitles: ['形になる', '戦略', '本質的な問い'],
      diagramDescriptions: [
        '戦略を形にし、<br>届くアウトプットへつなげる<br>（アウトプット）',
        '問いを起点に<br>戦略を設計する<br>（設計・構造化）',
        '課題の核となる<br>問いを見極める<br>（核・起点）'
      ],
      bridge: 'その課題の前にある問いから、戦略を設計し、叶えたいカタチへとつなげる。',
      cardTitles: ['問いを定義する', '戦略を設計する', 'カタチにする'],
      cardLists: [
        ['事実の収集と整理', '構造の把握', '課題の再定義', '問いの言語化'],
        ['仮説設計', 'ターゲット設計', 'コンセプト設計', '検証と再設計', '戦略統合'],
        ['ブランド設計', 'クリエイティブ制作', 'デジタル施策', '実行ディレクション']
      ],
      more: '詳しくはこちらへ ↗',
      name: '正木 達也',
      role: 'CEO / Creative Director / 営業',
      summary: 'パナソニック、花王の宣伝部を経て、クリエイティブギルドを創設。大企業ならではの組織課題や、ブランドの戦略的課題に対し、アウトプットまで一貫して担う。カンヌ、Clioなど国内外での受賞多数。',
      careerHeads: ['制作会社〜広告代理店', '花王', 'パナソニック'],
      careerCopy: [
        'テレビCMを中心に広告業界にて、企画・演出として活動。制作会社〜広告代理店、博報堂インプログレス出向を経て、広告業界の現場制作力を磨く。',
        'コピーライター / CMプランナー / ディレクター。マーケティングに即したコンセプトづくりから現場制作まで、一貫したクリエイティブディレクション。',
        'CD / ECD。経営理念に基づく企業ブランディングのクリエイティブを牽引。グループ全体の発信を一貫させるガイドラインによるルール作りを推進。'
      ],
      contactHeading: 'お問い合わせ',
      contactMain: 'お問い合わせフォームへ <span>↗</span>',
      access: 'ACCESS',
      address: '〒150-0012<br>東京都渋谷区広尾 3-12-24<br>広尾レジデンス 101',
      person: '担当：西園寺<br><a href="mailto:saionji@tatsumaki.uk">saionji@tatsumaki.uk</a>'
    },
    en: {
      heroTagline: 'We begin with the question and solve the challenge together.',
      heroContact: 'Contact <span>＋</span>',
      serviceHeading: 'We design the question that truly needs to be addressed.',
      thinking: 'Our Approach',
      flowTitles: ['See complexity as a structure', 'Deepen the question and shape the strategy', 'Turn it into value and expand its reach'],
      flowDescriptions: [
        'We look past surface symptoms<br>to identify the structure beneath.',
        'Starting with the question,<br>we deepen our thinking toward the essence.',
        'Once the essence is clear,<br>we create meaningful output<br>and extend it into society.'
      ],
      diagramTitles: ['Give it form', 'Strategy', 'Essential question'],
      diagramDescriptions: [
        'Turn strategy into form<br>and connect it to output<br>(Output)',
        'Design strategy<br>from the question<br>(Design / Structuring)',
        'Identify the question<br>at the core of the challenge<br>(Core / Starting point)'
      ],
      bridge: 'Starting with the question before the challenge, we design the strategy and connect it to the form you want to realize.',
      cardTitles: ['Define the question', 'Design the strategy', 'Give it form'],
      cardLists: [
        ['Collect and organize facts', 'Understand the structure', 'Redefine the challenge', 'Articulate the question'],
        ['Build hypotheses', 'Define the audience', 'Design the concept', 'Test and redesign', 'Integrate the strategy'],
        ['Brand design', 'Creative production', 'Digital initiatives', 'Execution direction']
      ],
      more: 'View details ↗',
      name: 'Tatsuya Masaki',
      role: 'CEO / Creative Director / Business Development',
      summary: 'After working in the advertising divisions of Panasonic and Kao, he founded a creative guild. He leads projects from strategy through output, addressing the organizational and brand challenges unique to large companies. His work has received numerous domestic and international awards, including Cannes Lions and Clio.',
      careerHeads: ['Production Company to Advertising Agency', 'Kao', 'Panasonic'],
      careerCopy: [
        'Worked in planning and direction across the advertising industry, mainly for television commercials. Experience at production companies, advertising agencies, and a secondment to Hakuhodo In-Progress built a strong command of on-site production.',
        'Copywriter / CM Planner / Director. Led integrated creative direction, from marketing-led concept development through on-site production.',
        'Creative Director / Executive Creative Director. Led creative work for corporate branding grounded in management philosophy, and promoted group-wide communication guidelines and standards.'
      ],
      contactHeading: 'Contact',
      contactMain: 'Go to the inquiry form <span>↗</span>',
      access: 'ACCESS',
      address: 'Hiroo Residence 101<br>3-12-24 Hiroo, Shibuya-ku<br>Tokyo 150-0012, Japan',
      person: 'Contact: Saionji<br><a href="mailto:saionji@tatsumaki.uk">saionji@tatsumaki.uk</a>'
    }
  };

  const setHTML = (selector, value) => {
    const element = $(selector);
    if (element) element.innerHTML = value;
  };

  function setList(selector, values) {
    $$(selector).forEach((element, index) => {
      if (values[index] !== undefined) element.innerHTML = values[index];
    });
  }

  function setLanguage(language) {
    const lang = language === 'en' ? 'en' : 'ja';
    const copy = content[lang];
    document.documentElement.lang = lang;
    root.dataset.language = lang;
    $$('[data-lang]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === lang)));

    $$('.concept-ja').forEach(element => { element.hidden = lang === 'en'; });
    $$('.concept-en').forEach(element => {
      element.hidden = lang !== 'en';
      element.style.display = lang === 'en' ? 'block' : 'none';
      if (lang === 'en') element.classList.add('is-char-live');
    });

    setHTML('.hero-tagline', copy.heroTagline);
    setHTML('.hero-contact', copy.heroContact);
    setHTML('.service-heading', copy.serviceHeading);
    setHTML('.flow-thinking-label', copy.thinking);
    setList('.flow-item-title', copy.flowTitles);
    setList('.flow-item-desc', copy.flowDescriptions);
    setList('.spiral-label-title', copy.diagramTitles);
    setList('.spiral-label-desc', copy.diagramDescriptions);
    setHTML('.service-bridge', copy.bridge);
    setList('.service-card-title', copy.cardTitles);
    $$('.service-card-list').forEach((list, index) => {
      const values = copy.cardLists[index] || [];
      list.innerHTML = values.map(value => `<li>${value}</li>`).join('');
    });
    $$('#works .home-works-copy a, #works .works-master-link').forEach(link => { link.textContent = copy.more; });
    setHTML('.about-v6-name', copy.name);
    setHTML('.about-v6-role', copy.role);
    setHTML('.about-v6-summary', copy.summary);
    setList('.about-v6-head h3', copy.careerHeads);
    setList('.about-v6-career article > p', copy.careerCopy);
    setHTML('#contact .contact-layout h3', copy.contactHeading);
    setHTML('#contact .contact-main', copy.contactMain);
    setHTML('#contact .contact-address h4', copy.access);
    const addressParagraphs = $$('#contact .contact-address p');
    if (addressParagraphs[0]) addressParagraphs[0].innerHTML = copy.address;
    if (addressParagraphs[1]) addressParagraphs[1].innerHTML = copy.person;
    try { window.localStorage.setItem('tatsumaki-language', lang); } catch (_) {}
  }

  $$('[data-lang]').forEach(button => {
    button.onclick = event => {
      event.preventDefault();
      setLanguage(button.dataset.lang);
    };
  });

  let initialLanguage = 'ja';
  try { initialLanguage = window.localStorage.getItem('tatsumaki-language') || 'ja'; } catch (_) {}
  setLanguage(initialLanguage);

  /* The Works door cycles imagery only: Marketing → Branding → Prize → all tatsumaki. */
  const works = $('#works');
  const gallery = window.WORK_GALLERY;
  const selectedPanel = document.getElementById('home-selected-panel');
  const studioPanel = document.getElementById('home-studio-panel');
  const selectedDoor = works?.querySelector('[data-home-collection="selected"]');
  const studioDoor = works?.querySelector('[data-home-collection="studio"]');
  const otherDoor = works?.querySelector('[data-home-collection="other"]');
  if (selectedDoor) selectedDoor.textContent = 'Selected Works';
  if (studioDoor) studioDoor.textContent = 'Tatsumaki Works';
  if (otherDoor) otherDoor.textContent = 'Other Works';

  const workCycle = [
    { mode: 'selected', category: 'Marketing Communication' },
    { mode: 'selected', category: 'Branding' },
    { mode: 'selected', category: 'Prize' },
    { mode: 'studio', category: 'All' }
  ];
  let workCycleIndex = 0;
  let worksVisible = true;

  function renderAllStudio() {
    const grid = document.getElementById('home-studio-grid');
    if (!grid || !gallery?.studio || typeof window.pptArtwork !== 'function') return;
    grid.innerHTML = gallery.studio.map(item => `<figure>${window.pptArtwork(item.design, item.title)}</figure>`).join('');
    const more = document.getElementById('home-studio-more');
    if (more) more.href = 'works.html?collection=studio&category=All';
  }

  function applyWorkCycle(step) {
    if (!works) return;
    works.classList.add('is-cycle-changing');
    window.setTimeout(() => {
      if (step.mode === 'selected') {
        selectedDoor?.click();
        works.querySelector(`[data-home-selected="${step.category}"]`)?.click();
      } else {
        studioDoor?.click();
        renderAllStudio();
      }
      const language = root.dataset.language || 'ja';
      $$('#works .home-works-copy a, #works .works-master-link').forEach(link => { link.textContent = content[language].more; });
      window.requestAnimationFrame(() => works.classList.remove('is-cycle-changing'));
    }, 230);
  }

  if (works && gallery) {
    applyWorkCycle(workCycle[0]);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        worksVisible = entries.some(entry => entry.isIntersecting);
      }, { threshold: .08 }).observe(works);
    }
    window.setInterval(() => {
      if (!worksVisible || document.hidden) return;
      workCycleIndex = (workCycleIndex + 1) % workCycle.length;
      applyWorkCycle(workCycle[workCycleIndex]);
    }, 2700);
  }

  /* Scroll-linked shapes: move often, stay behind content, then disappear. */
  const sections = $$('#concept, #service, #works, #about, #contact');
  const top = $('#top');
  let motionTicking = false;

  function renderPhase6Motion() {
    motionTicking = false;
    if (root.style.display === 'none') return;
    const viewport = window.innerHeight || 1;
    const topProgress = clamp(window.scrollY / Math.max(viewport * .82, 1));
    const bluePhase = clamp(topProgress / .58);
    const pinkPhase = clamp((topProgress - .24) / .76);
    top?.style.setProperty('--top-blue-scale', (1 + bluePhase * .78).toFixed(3));
    top?.style.setProperty('--top-blue-y', `${(bluePhase * 14).toFixed(2)}px`);
    top?.style.setProperty('--top-blue-opacity', (.64 - bluePhase * .26).toFixed(3));
    top?.style.setProperty('--top-pink-scale', (1 + pinkPhase * 1.02).toFixed(3));
    top?.style.setProperty('--top-pink-gap', `${(14 + pinkPhase * 9).toFixed(2)}px`);
    top?.style.setProperty('--top-pink-fill', `${(58 + pinkPhase * 8).toFixed(2)}%`);
    top?.style.setProperty('--top-pink-x', `${(pinkPhase * 12).toFixed(2)}px`);
    top?.style.setProperty('--top-pink-y', `${(-pinkPhase * 18).toFixed(2)}px`);
    top?.style.setProperty('--top-pink-opacity', (.58 - pinkPhase * .18).toFixed(3));

    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const entry = clamp((viewport - rect.top) / (viewport * .72));
      const opacity = Math.pow(Math.sin(Math.PI * entry), 1.35) * .9;
      const decorScale = (0.72 + entry * 0.72).toFixed(3);
      section.style.setProperty('--sweep-opacity', opacity.toFixed(3));
      section.style.setProperty('--accent-turn', `${(entry * 420 + index * 24).toFixed(2)}deg`);
      section.style.setProperty('--decor-scale', decorScale);
      section.style.setProperty('--bridge-scale', (0.92 + entry * 0.26).toFixed(3));
      section.style.setProperty('--boundary-x', `${(-108 + entry * 112).toFixed(2)}%`);
      if (section.id === 'contact') {
        section.style.setProperty('--contact-dot-scale', (0.96 + entry * 0.22).toFixed(3));
        section.style.setProperty('--contact-dot-turn', `${(entry * 18).toFixed(2)}deg`);
      }
    });
  }

  function requestMotion() {
    if (motionTicking || reduced) return;
    motionTicking = true;
    window.requestAnimationFrame(renderPhase6Motion);
  }

  window.addEventListener('scroll', requestMotion, { passive: true });
  window.addEventListener('resize', requestMotion, { passive: true });
  requestMotion();

  /* Intro uses the exact artwork definitions used on Works page 2. */
  function runPhase6Intro() {
    if (reduced || window.location.hash || window.scrollY > 4 || !gallery) {
      root.classList.add('v6-intro-settled');
      return;
    }
    const body = document.body;
    const intro = document.createElement('div');
    intro.id = 'tatsu-v6-intro';
    intro.setAttribute('aria-hidden', 'true');
    intro.innerHTML = `
      <i class="v6-intro-line"></i>
      <i class="v6-intro-shape v6-intro-shape--1"></i>
      <i class="v6-intro-shape v6-intro-shape--2"></i>
      <i class="v6-intro-shape v6-intro-shape--3"></i>
      <i class="v6-intro-shape v6-intro-shape--4"></i>
      <i class="v6-intro-shape v6-intro-shape--5"></i>
      <i class="v6-intro-shape v6-intro-shape--6"></i>
      <i class="v6-intro-dots v6-intro-dots--cyan"></i>
      <i class="v6-intro-dots v6-intro-dots--yellow"></i>
      <i class="v6-intro-dots v6-intro-dots--pink"></i>
      <i class="v6-intro-dots v6-intro-dots--cyan2"></i>
      <i class="v6-intro-dots v6-intro-dots--yellow2"></i>
      <i class="v6-intro-dots v6-intro-dots--pink2"></i>
      <figure class="v6-intro-carousel"><span class="v6-carousel-frame"></span></figure>
    `;
    const introThumbs = [
      ['Kikikoku Dictionary', 'assets/intro-thumbs/01.png'],
      ['Allan Swan', 'assets/intro-thumbs/02.png'],
      ['Panasonic Green Impact', 'assets/intro-thumbs/03.png'],
      ['Naomi Osaka', 'assets/intro-thumbs/04.png'],
      ['World Environment Impact', 'assets/intro-thumbs/05.png'],
      ['Yubidori City Box', 'assets/intro-thumbs/06.png'],
      ['Yubidori Talent', 'assets/intro-thumbs/07.jpg'],
      ['New Kaori Sensor', 'assets/intro-thumbs/08.png'],
      ['Flower Crowd', 'assets/intro-thumbs/09.png'],
      ['Home Interior Smile', 'assets/intro-thumbs/10.png'],
      ['Large Display Car', 'assets/intro-thumbs/11.png'],
      ['Beauty Gold', 'assets/intro-thumbs/12.png'],
      ['Bird Hearing Test Forest', 'assets/intro-thumbs/13.png'],
      ['Bird Hearing Test Phone', 'assets/intro-thumbs/14.png'],
      ['Quickle Doctor Door', 'assets/intro-thumbs/15.png'],
      ['Quickle Duster', 'assets/intro-thumbs/16.png'],
      ['Beauty Bottle', 'assets/intro-thumbs/17.png'],
      ['Going Beyond Barriers Stage', 'assets/intro-thumbs/18.png'],
      ['Team China Bicycle', 'assets/intro-thumbs/19.png'],
      ['Lets Note Nurse', 'assets/intro-thumbs/20.png']
    ].map(([title, thumb]) => ({ title, thumb }));
    const shuffle = list => {
      const pool = list.slice();
      for (let i = pool.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      return pool;
    };
    const exactPool = shuffle(introThumbs);
    if (!exactPool.length) {
      root.classList.add('v6-intro-settled');
      return;
    }

    const frame = intro.querySelector('.v6-carousel-frame');
    document.documentElement.classList.add('tatsu-v6-intro-lock');
    body.appendChild(intro);

    let index = 0;
    const showWork = work => {
      const title = (work.title || 'work').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
      frame.innerHTML = `<img class="v6-intro-shot" src="${work.thumb}" alt="${title}">`;
      frame.animate([
        { opacity: .52 },
        { opacity: 1 }
      ], { duration: 150, easing: 'cubic-bezier(.16,1,.3,1)' });
    };

    const firstFrameDelay = 1080;
    const intervalMs = 350;
    let timer = null;

    /* Force the geometry's initial state to paint before switching to is-live. */
    void intro.offsetWidth;
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => intro.classList.add('is-live'));
    });
    window.setTimeout(() => intro.classList.add('is-blooming'), 220);
    window.setTimeout(() => {
      intro.classList.add('is-frame-live');
      showWork(exactPool[0]);
      timer = window.setInterval(() => {
        index += 1;
        if (index >= exactPool.length) {
          window.clearInterval(timer);
          timer = null;
          return;
        }
        showWork(exactPool[index]);
      }, intervalMs);
    }, firstFrameDelay);

    const hold = firstFrameDelay + exactPool.length * intervalMs + 900;
    window.setTimeout(() => {
      if (timer) window.clearInterval(timer);
      intro.classList.add('is-leaving');
      root.classList.add('v6-intro-settled');
      window.setTimeout(() => {
        intro.remove();
        document.documentElement.classList.remove('tatsu-v6-intro-lock');
      }, 460);
    }, hold);
  }
  runPhase6Intro();
})();
