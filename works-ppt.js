(() => {
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  window.pptArtwork = (design, title = '') => '<span class="ppt-artwork" role="img" aria-label="'+esc(title)+'">'+design.layers.map(p => {
    const {l=0,t=0,r=0,b=0}=p.crop||{}, w=1-l-r,h=1-t-b;
    return '<span class="ppt-picture" style="left:'+p.x+'%;top:'+p.y+'%;width:'+p.w+'%;height:'+p.h+'%"><img alt="" draggable="false" src="'+esc(p.src)+'" style="width:'+(100/w)+'%;height:'+(100/h)+'%;left:'+(-100*l/w)+'%;top:'+(-100*t/h)+'%"></span>';
  }).join('')+'</span>';
  window.worksEscape=esc;
})();
