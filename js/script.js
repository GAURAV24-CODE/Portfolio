(function(){
  // Set your Formspree form URL (https://formspree.io) to send messages for real, e.g. "https://formspree.io/f/abcdwxyz"
  var FORM_ENDPOINT = "";
  var EMAIL = "kumbhargaurav24@gmail.com";
  var $ = function(s,r){return (r||document).querySelector(s)}, $$ = function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
  var body = document.body, store = {get:function(k){try{return localStorage.getItem(k)}catch(e){return null}},set:function(k,v){try{localStorage.setItem(k,v)}catch(e){}}};

  // sidebar collapse + mobile drawer
  if (store.get('collapsed')==='1') body.classList.add('collapsed');
  $('#collapse').addEventListener('click',function(){var c=body.classList.toggle('collapsed');store.set('collapsed',c?'1':'0')});
  var mb=$('#menuBtn'); function drawer(o){body.classList.toggle('open',o);mb.setAttribute('aria-expanded',o)}
  mb.addEventListener('click',function(){drawer(!body.classList.contains('open'))});
  $('#scrim').addEventListener('click',function(){drawer(false)});
  $$('.nav-link').forEach(function(a){a.addEventListener('click',function(){drawer(false)})});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')drawer(false)});

  // theme
  $('#theme').addEventListener('click',function(){var d=document.documentElement,t=d.dataset.theme==='dark'?'light':'dark';d.dataset.theme=t;store.set('theme',t)});

  // active section indicator
  var links=$$('.nav-link'), secs=$$('main .sec');
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(l){var on=l.getAttribute('href')==='#'+e.target.id;l.classList.toggle('active',on);if(on)l.setAttribute('aria-current','true');else l.removeAttribute('aria-current')})}})},{rootMargin:'-40% 0px -55% 0px'});
  secs.forEach(function(s){io.observe(s)});

  // reveal on scroll
  var rv=$$('.reveal');
  if('IntersectionObserver' in window){var ro=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');ro.unobserve(e.target)}})},{threshold:.12});rv.forEach(function(r){ro.observe(r)})}else rv.forEach(function(r){r.classList.add('in')});

  // viewer profile (reorders sections)
  $$('.viewer .pill').forEach(function(b){b.addEventListener('click',function(){$$('.viewer .pill').forEach(function(x){x.classList.remove('on');x.setAttribute('aria-pressed','false')});b.classList.add('on');b.setAttribute('aria-pressed','true');$('#main').dataset.profile=b.dataset.p})});

  // copy email
  $('#copyMail').addEventListener('click',function(){var b=this;(navigator.clipboard?navigator.clipboard.writeText(EMAIL):Promise.reject()).then(function(){b.setAttribute('aria-label','Copied');b.style.color='#3ddc97';setTimeout(function(){b.style.color='';b.setAttribute('aria-label','Copy email address')},1500)}).catch(function(){window.prompt('Copy email:',EMAIL)})});

  // contact form: real submission via Formspree; honest mailto fallback when no endpoint is configured
  var f=$('#contactForm'), msg=$('#formMsg'), btn=$('#sendBtn');
  function say(t,c){msg.textContent=t;msg.className='form-msg '+(c||'')}
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var d=new FormData(f); if(d.get('_gotcha'))return;
    if(!f.checkValidity()){f.reportValidity();return}
    if(!FORM_ENDPOINT){
      var u='mailto:'+EMAIL+'?subject='+encodeURIComponent(d.get('subject'))+'&body='+encodeURIComponent(d.get('message')+'\n\n— '+d.get('name')+' ('+d.get('email')+')');
      say('Opening your email app. Nothing is sent until you press Send there.');window.location.href=u;return;
    }
    btn.disabled=true;say('Sending…');
    fetch(FORM_ENDPOINT,{method:'POST',body:d,headers:{Accept:'application/json'}}).then(function(r){
      if(r.ok){say('Message sent. Thank you, I will reply soon.','ok');f.reset()}else{throw new Error('bad')}
    }).catch(function(){say('Could not send right now. Please email '+EMAIL+' directly.','err')}).finally(function(){btn.disabled=false});
  });
})();
