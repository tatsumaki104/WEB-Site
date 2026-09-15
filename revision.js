(() => {
  'use strict';
  const data = window.WORKS || [], categories = ['Marketing Communication', 'Branding', 'Prize'];
  const query = new URLSearchParams(location.search), reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = id => document.getElementById(id);
  const esc = s => String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const detailURL = p => 'work.html?id=' + encodeURIComponent(p.id);
  let category = categories.includes(query.get('category')) ? query.get('category') : categories[0];
  let active, frameIndex = 0, timer;
  const descriptions = {
    'Marketing Communication': 'B2B・B2Cを横断し、調査・分析から戦略、コンセプト、クリエイティブ、実行までを統合。\n\n多様な商品・事業で一貫したコミュニケーションを設計し、新規顧客の獲得、売上・シェアの拡大に貢献してきました。',
    'Branding': '',
    'Prize': ''
  };
  // Display the source PPT viewport without rewriting or arbitrarily cropping the image.
  let artworkSerial = 0;
  function artwork(f, label) {
    const [w,h]=f.pixels,c=f.crop,x=w*c.l,y=h*c.t,cw=w*(1-c.l-c.r),ch=h*(1-c.t-c.b),id='art-clip-'+(++artworkSerial);
    return '<svg class="material-frame" role="img" aria-label="'+esc(label)+'" viewBox="'+[x,y,cw,ch].join(' ')+'" preserveAspectRatio="xMidYMid meet"><defs><clipPath id="'+id+'"><rect x="'+x+'" y="'+y+'" width="'+cw+'" height="'+ch+'" /></clipPath></defs><image href="'+esc(f.src)+'" width="'+w+'" height="'+h+'" clip-path="url(#'+id+')" /></svg>';
  }
  function stop(reset = false) { clearInterval(timer); timer = null; if (reset && active) showFrame(0); }
  function showFrame(n) {
    if (!active) return;
    frameIndex = (n + active.frames.length) % active.frames.length;
    $('selected-frame').innerHTML = artwork(active.frames[frameIndex], active.title);
    $('frame-count').textContent = String(frameIndex + 1).padStart(2, '0') + ' / ' + String(active.frames.length).padStart(2, '0');
  }
  function start() { stop(); if (!reduce && active?.frames.length > 1) timer = setInterval(() => showFrame(frameIndex + 1), 650); }
  function select(p, index, total, animate = false) {
    stop(); active = p;
    document.querySelectorAll('.select-work').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.id === p.id)));
    $('selected-artwork').href = p.detail ? detailURL(p) : '#';
    $('selected-artwork').setAttribute('aria-label', p.title + (p.detail ? 'の詳細' : 'の画像を切り替え'));
    $('selection-detail').hidden = !p.detail; $('selection-detail').href = detailURL(p);
    $('selection-title').textContent = p.title;
    $('selection-count').textContent = String(index + 1).padStart(2, '0') + ' / ' + String(total).padStart(2, '0');
    p.frames.forEach(f => { const im = new Image(); im.src = f.src; });
    showFrame(0); if (animate) start();
  }
  let mosaicCleanups = [];
  function render() {
    stop(); mosaicCleanups.forEach(fn => fn()); mosaicCleanups = [];
    document.querySelectorAll('[data-category]').forEach(b => {
      const selected=b.dataset.category===category;
      b.setAttribute('aria-pressed',String(selected));
      if(b.getAttribute('role')==='tab')b.setAttribute('aria-selected',String(selected));
    });
    const list = data.filter(p => p.category === category);
    if ($('list-left')) {
      const split = Math.ceil(list.length / 2);
      ['list-left','list-right'].forEach((id,k) => {
        $(id).innerHTML = list.slice(k ? split : 0, k ? list.length : split).map(p => '<button type="button" class="select-work" data-id="' + p.id + '">' + esc(p.title.replace(/^Kao /,'')) + '</button>').join('');
      });
      document.querySelectorAll('.select-work').forEach(b => {
        const p = list.find(p => p.id === b.dataset.id);
        b.addEventListener('mouseenter', () => select(p, list.indexOf(p), list.length, true));
        b.addEventListener('mouseleave', () => stop(true));
        b.addEventListener('focus', () => select(p, list.indexOf(p), list.length, true));
        b.addEventListener('blur', () => stop(true));
        b.addEventListener('click', () => {
          select(p, list.indexOf(p), list.length, true);
          if (matchMedia('(max-width:640px)').matches) document.querySelector('.selection-center').scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});
        });
      });
      if (list.length) { const p=list.find(p => p.id === query.get('project')) || list[0]; select(p,list.indexOf(p),list.length); }
    }
    if ($('selected-mosaic')) {
      const chosen = [...list].filter(p => p.materialCount > 0).sort((a,b) => b.materialCount-a.materialCount).slice(0,6);
      const cells = [], used = new Set();
      for (let round=0; cells.length<30 && round<100; round++) {
        for (const p of chosen) {
          const f=p.frames[round];
          if (f && !used.has(f.src)) { cells.push({p,f}); used.add(f.src); }
          if (cells.length===30) break;
        }
        if (chosen.every(p => p.frames.length<=round+1)) break;
      }
      $('selected-mosaic').innerHTML=cells.map(({p,f})=>'<a href="works.html?category='+encodeURIComponent(category)+'&project='+p.id+'" aria-label="'+esc(p.title)+'">'+artwork(f,p.title)+'</a>').join('');
      [...$('selected-mosaic').children].forEach((el,i)=>{
        const {p,f}=cells[i]; let t,n=p.frames.indexOf(f);
        const end=()=>{clearInterval(t);t=null;n=p.frames.indexOf(f);el.innerHTML=artwork(f,p.title);};
        const begin=()=>{end();if(!reduce&&p.frames.length>1)t=setInterval(()=>{n=(n+1)%p.frames.length;el.innerHTML=artwork(p.frames[n],p.title);},650);};
        el.addEventListener('mouseenter',begin);el.addEventListener('mouseleave',end);el.addEventListener('focus',begin);el.addEventListener('blur',end);mosaicCleanups.push(end);
      });
      $('selected-category').textContent=category; $('selected-description').textContent=descriptions[category];
      $('selected-description').hidden=!descriptions[category];
      $('selected-more').href='works.html?category='+encodeURIComponent(category);
    }
  }
  document.querySelectorAll('[data-category]').forEach(b=>b.addEventListener('click',()=>{category=b.dataset.category;render();}));
  render();
  if ($('selected-artwork')) {
    const art=$('selected-artwork');
    art.addEventListener('mouseenter',start);art.addEventListener('mouseleave',()=>stop(true));
    art.addEventListener('focus',start);art.addEventListener('blur',()=>stop(true));
    art.addEventListener('click',e=>{if(!active.detail){e.preventDefault();stop();showFrame(frameIndex+1);}});
    $('previous-frame').onclick=()=>{stop();showFrame(frameIndex-1);};$('next-frame').onclick=()=>{stop();showFrame(frameIndex+1);};
    document.addEventListener('visibilitychange',()=>{if(document.hidden)stop(true);});
  }
  if ($('work-detail')) {
    const p=data.find(p=>p.id===query.get('id'));
    if (!p?.detail) {$('work-detail').innerHTML='<h1>Selected Work</h1><p>作品一覧からご覧ください。</p><a href="works.html">作品一覧へ</a>';return;}
    document.title=p.title+' — tatsumaki';
    const section=(label,t)=>t?'<section><h3>'+label+'</h3><p>'+esc(t)+'</p></section>':'';
    const collage=p.supportGroups?'<div class="support-gallery">'+p.supportGroups.map(g=>'<figure class="support-group"><div class="support-images">'+g.frames.map(im=>'<div style="aspect-ratio:'+im.aspect+'">'+artwork(im,g.caption)+'</div>').join('')+'</div><figcaption>'+esc(g.caption)+'</figcaption></figure>').join('')+'</div>':'<div class="portfolio-composition" style="aspect-ratio:'+p.ratio+'">'+p.composition.map((im,i)=>'<figure style="left:'+im.x+'%;top:'+im.y+'%;width:'+im.w+'%;height:'+im.h+'%">'+artwork(im,p.title+' 制作物 '+(i+1))+'</figure>').join('')+'</div>';
    const captions=p.captions&&!p.supportGroups?'<div class="portfolio-captions">'+p.captions.map(t=>'<p>'+esc(t)+'</p>').join('')+'</div>':'';
    $('work-detail').innerHTML='<a class="back-link" href="works.html?category='+encodeURIComponent(p.category)+'&project='+p.id+'">← Selected Work</a><div class="detail-kicker">'+esc(p.category)+'</div><h1>'+esc(p.title)+'</h1><div class="portfolio-layout"><div class="portfolio-copy">'+(p.challenge?'<h2>MISSION</h2>':'')+section('課題',p.challenge)+section('工夫',p.approach)+section('結果',p.outcome)+'<p class="portfolio-narrative">'+esc(p.narrative)+'</p>'+captions+(p.keyword?'<div class="portfolio-keyword"><small>Keyword</small><p>'+esc(p.keyword)+'</p></div>':'')+'</div>'+collage+'</div><a class="detail-contact" href="contact.html">お問い合わせ ↗</a>';
  }
  if ('IntersectionObserver' in window) {
    const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target);}}),{threshold:.15});
    document.querySelectorAll('.kinetic-line').forEach(el=>observer.observe(el));
  }
  document.querySelectorAll('[data-lang]').forEach(b=>b.onclick=()=>{
    const en=b.dataset.lang==='en';document.querySelectorAll('[data-lang]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
    document.querySelectorAll('.concept-ja').forEach(x=>x.hidden=en);document.querySelectorAll('.concept-en').forEach(x=>x.style.display=en?'block':'none');
  });
})();
