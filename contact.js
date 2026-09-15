(() => {
  'use strict';
  const form=document.getElementById('inquiry-form'),review=document.getElementById('inquiry-review');
  const fields=['company','name','email','message'];
  const en=window.TATSU_PAGE_LANGUAGE==='en';
  const labels=en?{company:'Company / Organization',name:'Name',email:'Email',message:'Inquiry'}:{company:'会社・団体名',name:'お名前',email:'メールアドレス',message:'お問い合わせ内容'};
  const input=key=>document.getElementById('inquiry-'+key);
  function error(key,message) {
    const el=document.getElementById('error-'+key);
    if(!el)return;
    el.textContent=message;el.hidden=!message;input(key).setAttribute('aria-invalid',String(Boolean(message)));
  }
  fields.forEach(key=>input(key).addEventListener('input',()=>error(key,'')));
  form.addEventListener('submit',e=>{
    e.preventDefault();let first=null;
    for(const key of ['name','email','message']) {
      const el=input(key),message=!el.value.trim()?(en?'Please enter '+labels[key]+'.':labels[key]+'をご入力ください。'):!el.validity.valid?(en?'Please check the email address format.':'メールアドレスの形式をご確認ください。'):'';
      error(key,message);if(message&&!first)first=el;
    }
    if(first){first.focus();return;}
    const values=Object.fromEntries(fields.map(key=>[key,input(key).value.trim()]));
    const dl=document.getElementById('review-fields');dl.replaceChildren();
    fields.forEach(key=>{
      const dt=document.createElement('dt'),dd=document.createElement('dd');
      dt.textContent=labels[key];dd.textContent=values[key]||(en?'Not entered':'未入力');dl.append(dt,dd);
    });
    const body=fields.map(key=>'【'+labels[key]+'】\n'+(values[key]||(en?'Not entered':'未入力'))).join('\n\n');
    document.getElementById('email-body').value=body;
    document.getElementById('compose-email').href='mailto:info@tatsumaki.uk?subject='+encodeURIComponent(en?'Inquiry from the website':'Webサイトからのお問い合わせ')+'&body='+encodeURIComponent(body);
    document.getElementById('compose-notice').hidden=true;
    form.hidden=true;review.hidden=false;
    document.getElementById('step-input').removeAttribute('aria-current');document.getElementById('step-review').setAttribute('aria-current','step');
    document.getElementById('review-heading').focus();
  });
  document.getElementById('edit-inquiry').onclick=()=>{
    review.hidden=true;form.hidden=false;
    document.getElementById('step-review').removeAttribute('aria-current');document.getElementById('step-input').setAttribute('aria-current','step');input('name').focus();
  };
  document.getElementById('compose-email').addEventListener('click',()=>{document.getElementById('compose-notice').hidden=false;});
})();
