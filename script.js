const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
menuButton?.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded',String(open));
  menuButton.setAttribute('aria-label',open?'Close menu':'Open menu');
});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded','false');
}));

const year=document.querySelector('#year');
if(year) year.textContent=new Date().getFullYear();

const progress=document.querySelector('.scroll-line span');
let ticking=false;
const updateProgress=()=>{
  const max=document.documentElement.scrollHeight-window.innerHeight;
  const value=max>0?(window.scrollY/max)*100:0;
  if(progress) progress.style.width=value+'%';
  ticking=false;
};
window.addEventListener('scroll',()=>{
  if(!ticking){window.requestAnimationFrame(updateProgress);ticking=true;}
},{passive:true});
updateProgress();

const revealItems=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const observer=new IntersectionObserver((entries,obs)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  },{threshold:.12,rootMargin:'0px 0px -35px 0px'});
  revealItems.forEach(item=>observer.observe(item));
}else{
  revealItems.forEach(item=>item.classList.add('is-visible'));
}

document.querySelector('#enquiry-form')?.addEventListener('submit',event=>{
  event.preventDefault();
  const data=new FormData(event.currentTarget);
  const name=(data.get('name')||'').toString().trim();
  const contact=(data.get('contact')||'').toString().trim();
  const product=(data.get('product')||'').toString();
  if(!name||!contact||!product){return;}
  const subject=encodeURIComponent('AVEN project enquiry — '+product);
  const body=encodeURIComponent(
    'Name: '+name+
    '\nEmail / Phone: '+contact+
    '\nProject: '+product+
    '\nQuantity: '+(data.get('quantity')||'Not specified')+
    '\nRequired by: '+(data.get('deadline')||'Not specified')+
    '\nDetails: '+(data.get('details')||'Not specified')
  );
  window.location.href='mailto:atharvakale.co@gmail.com?subject='+subject+'&body='+body;
});