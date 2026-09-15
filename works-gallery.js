(() => {
  const D=window.WORK_GALLERY,q=new URLSearchParams(location.search),$=id=>document.getElementById(id),esc=window.worksEscape;
  let collection=q.get('collection')==='studio'?'studio':'selected',category=q.get('category')||'All';
  const timers=new Set();
  function items(){
    const all=D[collection];
    if(category==='All')return all;
    const byTitle=new Map(all.map(x=>[x.title,x]));
    return (D.orders[collection][category]||[]).map(t=>byTitle.get(t)).filter(Boolean);
  }
  function render(){
    timers.forEach(clearInterval);timers.clear();
    document.querySelectorAll('[data-collection]').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.collection===collection)));
    $('selected-filters').hidden=collection!=='selected';$('studio-filters').hidden=collection!=='studio';
    document.querySelectorAll('[data-gallery-category]').forEach(b=>b.setAttribute('aria-pressed',String(collection==='selected'&&b.dataset.galleryCategory===category)));
    document.querySelectorAll('[data-studio-category]').forEach(b=>b.setAttribute('aria-pressed',String(collection==='studio'&&b.dataset.studioCategory===category)));
    const works=items();
    $('gallery-count').textContent=works.length+' Works';
    $('works-gallery').classList.toggle('is-studio',collection==='studio');
    $('works-gallery').innerHTML=works.map(x=>{
      const linked=collection==='selected'&&x.detail;
      return (linked?'<a class="gallery-card is-linked" href="work.html?id='+encodeURIComponent(x.detail)+'">':'<article class="gallery-card">')+
        '<span class="gallery-media">'+window.pptArtwork(x.design,x.title)+'<img class="gallery-hover" alt="" hidden></span><span class="gallery-title">'+esc(x.title)+'</span>'+(linked?'</a>':'</article>');
    }).join('');
    [...$('works-gallery').children].forEach((card,i)=>{
      const frames=works[i].frames||[];
      if(frames.length<=1)return;
      const preview=card.querySelector('.gallery-hover');let timer=null,index=0,active=false;
      function reset(){active=false;if(timer){clearInterval(timer);timers.delete(timer);timer=null;}index=0;preview.hidden=true;card.classList.remove('is-playing');}
      preview.onload=()=>{if(active){preview.hidden=false;card.classList.add('is-playing');}};
      card.addEventListener('mouseenter',()=>{
        if(!matchMedia('(hover:hover)').matches)return;
        reset();active=true;
        timer=setInterval(()=>{preview.src=frames[index];index=(index+1)%frames.length;},650);timers.add(timer);
      });
      card.addEventListener('mouseleave',reset);
      card.addEventListener('blur',reset);
    });
  }
  document.querySelectorAll('[data-collection]').forEach(b=>b.onclick=()=>{collection=b.dataset.collection;category='All';render();});
  document.querySelectorAll('[data-gallery-category]').forEach(b=>b.onclick=()=>{collection='selected';category=b.dataset.galleryCategory;render();});
  document.querySelectorAll('[data-studio-category]').forEach(b=>b.onclick=()=>{collection='studio';category=b.dataset.studioCategory;render();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){timers.forEach(clearInterval);timers.clear();document.querySelectorAll('.gallery-card').forEach(c=>c.classList.remove('is-playing'));document.querySelectorAll('.gallery-hover').forEach(i=>i.hidden=true);}});
  render();
})();
