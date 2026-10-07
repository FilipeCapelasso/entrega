'use strict';
/* Utilidades compartilhadas pelo site público e pelo painel. */
const $=(s,e=document)=>e.querySelector(s);
const esc=t=>String(t??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const CK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
const STAR='<svg viewBox="0 0 24 24"><path d="M12 2.6l2.9 5.88 6.49.95-4.7 4.58 1.11 6.46L12 17.42 6.2 20.47l1.11-6.46-4.7-4.58 6.49-.95z"/></svg>';
const base=()=>CFG.url.replace(/\/+$/,'');
const urlSegura=u=>{try{const x=new URL(u);return x.protocol==='https:'?x.href:''}catch(_){return ''}};
const data=d=>new Intl.DateTimeFormat('pt-BR',{day:'2-digit',month:'short',year:'numeric'}).format(new Date(d));
const estrelas=n=>{n=Math.max(0,Math.min(5,Math.round(+n)||0));
  return `<div class="s" role="img" aria-label="${n} de 5">${[1,2,3,4,5].map(i=>STAR.replace('<svg','<svg class="'+(i<=n?'on':'')+'"')).join('')}</div>`};

/* ---- API (PostgREST/RPC). Erros viram códigos curtos; nunca expõem detalhes do banco. ---- */
class ApiError extends Error{}
async function api(path,body,token){
  let r;
  try{r=await fetch(base()+'/rest/v1/'+path,{method:'POST',
    headers:{apikey:CFG.key,Authorization:'Bearer '+(token||CFG.key),'Content-Type':'application/json'},body:JSON.stringify(body||{})})}
  catch(_){throw new ApiError('rede')}
  const t=await r.text(); let j=null; try{j=t?JSON.parse(t):null}catch(_){}
  if(!r.ok){const m=(j&&j.message)||'';
    throw new ApiError(r.status===401||r.status===403?'nao_autorizado':(/^[a-z_]{3,30}$/.test(m)?m:'erro'))}
  return j;
}

/* ---- datas: soma de meses sem estourar o fim do mês (31/08 + 6 meses = 28 ou 29/02) ---- */
function lerData(s){
  const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(s||''); if(!m) return null;
  const a=+m[1],mo=+m[2],d=+m[3],t=new Date(a,mo-1,d);
  return t.getFullYear()===a&&t.getMonth()===mo-1&&t.getDate()===d?{a,m:mo,d}:null;
}
function somarMeses(a,m,d,n){
  const t=a*12+(m-1)+n, ya=Math.floor(t/12), mi=t%12;
  return new Date(ya,mi,Math.min(d,new Date(ya,mi+1,0).getDate()));
}

/* ---- vídeo: só https; YouTube/Vimeo viram embed, o resto é <video> ---- */
const embedUrl=u=>{
  let m=u.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  if(m) return 'https://www.youtube-nocookie.com/embed/'+m[1]+'?rel=0';
  m=u.match(/vimeo\.com\/(?:video\/)?(\d+)/); return m?'https://player.vimeo.com/video/'+m[1]:'';
};
const previa=u=>{const e=embedUrl(u);
  return e?`<iframe src="${esc(e)}" title="Vídeo" loading="lazy" allowfullscreen allow="encrypted-media; picture-in-picture; fullscreen"></iframe>`
          :`<video controls playsinline preload="metadata" src="${esc(u)}#t=0.1"></video>`};

if(typeof module!=='undefined') module.exports={lerData,somarMeses};
