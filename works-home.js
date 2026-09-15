(() => {
  const D = window.WORK_GALLERY;
  const $ = id => document.getElementById(id);
  if (!D || !$('works')) return;

  const C = {
    'Marketing Communication': 'B2B・B2Cを横断し、調査・分析から戦略、コンセプト、クリエイティブ、実行までを統合。\n\n多様な商品・事業で一貫したコミュニケーションを設計し、新規顧客の獲得、売上・シェアの拡大に貢献。',
    'Branding': '経営課題や事業戦略を起点に、企業理念・社会課題・技術・採用までを横断。コンセプト設計からクリエイティブ、社内外の合意形成までを一貫して推進し、企業ブランドの認知・好感度と組織の一体感向上に貢献。',
    'Prize': '国内外の広告賞で幅広く受賞。CANNES LIONS、CLIO HEALTH、ADFEST、Spikes Asia、広告電通賞など、社会課題とコミュニケーションを結びつけたプロジェクトが評価されています。'
  };
  const SC = {
    'Branding': 'tatsumakiのブランド設計と、AIを活用した業務・サービスのプロトタイピング。',
    'AI Creative': 'AIを制作工程に組み込み、MV・映像・ビジュアル・アプリまで横断して検証するクリエイティブワーク。',
    'Other': ''
  };

  let col = 'selected';
  let sc = 'Marketing Communication';
  let tc = 'AI Creative';

  function selectedHref() {
    return 'works.html?collection=selected&category=' + encodeURIComponent(sc);
  }
  function studioHref() {
    return 'works.html?collection=studio&category=' + encodeURIComponent(tc);
  }
  function currentHref() {
    return col === 'selected' ? selectedHref() : studioHref();
  }

  function syncMasterLink() {
    const master = document.querySelector('#works .works-master-link');
    if (master) master.href = currentHref();
  }

  function rc() {
    document.querySelectorAll('[data-home-collection]').forEach(b => {
      b.setAttribute('aria-selected', String(b.dataset.homeCollection === col));
    });
    $('home-selected-panel').classList.toggle('is-active', col === 'selected');
    $('home-studio-panel').classList.toggle('is-active', col === 'studio');
    syncMasterLink();
  }

  function rs() {
    document.querySelectorAll('[data-home-selected]').forEach(b => {
      b.setAttribute('aria-selected', String(b.dataset.homeSelected === sc));
    });
    $('home-selected-image').innerHTML = D.home[sc].map((design, i) =>
      '<span class="home-ppt-cell">' + window.pptArtwork(design, sc + ' ' + (i + 1)) + '</span>'
    ).join('');
    $('home-selected-title').textContent = sc;
    $('home-selected-copy').textContent = C[sc];
    $('home-selected-more').href = selectedHref();
    syncMasterLink();
  }

  function rt() {
    document.querySelectorAll('[data-home-studio]').forEach(b => {
      b.setAttribute('aria-selected', String(b.dataset.homeStudio === tc));
    });
    $('home-studio-title').textContent = tc;
    $('home-studio-copy').textContent = SC[tc];
    $('home-studio-more').href = studioHref();
    const blocked = new Set(['tatsumaki Studio', 'AI employee Work', 'AI negotiator']);
    const m = new Map(D.studio.filter(x => !blocked.has(x.title)).map(x => [x.title, x]));
    const a = (D.orders.studio[tc] || []).map(x => m.get(x)).filter(Boolean);
    $('home-studio-grid').innerHTML = a.length
      ? a.map(x => '<figure>' + window.pptArtwork(x.design, x.title) + '</figure>').join('')
      : '';
    syncMasterLink();
  }

  document.querySelectorAll('[data-home-collection]').forEach(b => {
    b.onclick = () => { col = b.dataset.homeCollection; rc(); };
  });
  document.querySelectorAll('[data-home-selected]').forEach(b => {
    b.onclick = () => { sc = b.dataset.homeSelected; rs(); };
  });
  document.querySelectorAll('[data-home-studio]').forEach(b => {
    b.onclick = () => { tc = b.dataset.homeStudio; rt(); };
  });

  const selectedMosaic = document.querySelector('#works .home-static-mosaic');
  const studioMosaic = $('home-studio-grid');
  if (selectedMosaic) {
    selectedMosaic.setAttribute('role', 'link');
    selectedMosaic.setAttribute('tabindex', '0');
    selectedMosaic.onclick = () => { window.location.href = selectedHref(); };
    selectedMosaic.onkeydown = e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.location.href = selectedHref(); }
    };
  }
  if (studioMosaic) {
    studioMosaic.setAttribute('role', 'link');
    studioMosaic.setAttribute('tabindex', '0');
    studioMosaic.onclick = () => { window.location.href = studioHref(); };
    studioMosaic.onkeydown = e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.location.href = studioHref(); }
    };
  }

  rc(); rs(); rt();
})();
