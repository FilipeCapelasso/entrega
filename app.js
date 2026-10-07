/* Site público. Conteúdo de revisões/unidades/seguros ainda está nesta lista (TODO: tabelas editáveis — ver DEPLOY.md). */
const REV=[
 {n:'1ª revisão',t:'Primeira revisão',km:'900 a 1.100 km',p:'ou 6 meses após a retirada',g:['Mão de obra gratuita'],pg:'Cliente paga: óleo e kit revisão',d:1,ag:0},
 {n:'2ª revisão',t:'Segunda revisão',km:'6.000 km',p:'ou 12 meses após a retirada',g:['Mão de obra gratuita'],pg:'Cliente paga: óleo e kit revisão',ag:1},
 {n:'3ª a 9ª',t:'Da terceira à nona',km:'Conforme o manual',p:'seguindo km ou prazo',g:['Óleo fornecido pela Honda'],pg:'Cliente paga: mão de obra e demais itens',ag:1}];
const CUI=[['Amaciamento','Nos primeiros quilômetros, evite acelerações bruscas e rotações altas. Varie a velocidade.'],
 ['Calibragem semanal','Confira a pressão com os pneus frios, seguindo a indicação do manual.'],
 ['Corrente lubrificada','Nos modelos com corrente, mantenha lubrificação e folga em dia.'],
 ['Freios','Pastilhas e lonas precisam de alguns quilômetros para render o máximo. Antecipe as frenagens.'],
 ['Equipamento sempre','Capacete afivelado em todo trajeto. Luvas e calçado fechado fazem diferença.'],
 ['Manual sempre com você','Leve o manual em toda revisão: é nele que registramos datas, km e carimbos.']];
const TOP=['Como ligar a moto','Painel','Luzes','Indicadores','Combustível','Óleo','Calibragem dos pneus','Amaciamento','Funcionamento geral','Cuidados iniciais'];
const UO=[{c:'Rio Branco',n:'Star Motos',e:'Av. Chico Mendes'},{c:'Rio Branco',n:'Acre Motos',e:'Av. Ceará'},{c:'Cruzeiro do Sul',n:'Juruá Moto Center'}];
const UP=[{c:'Acrelândia',n:'Motobras',e:'Atendimento com Míriam'},{c:'Sena Madureira'},{c:'Xapuri'}];
const NOTAS=['','😕 Ruim','🙂 Regular','😀 Bom','🤩 Muito bom','❤️ Excelente'];

/* ---------- marca ---------- */
function marca(sel){
  const a=$(sel); a.innerHTML=`<small>${CFG.grupo}</small><b><i>${esc(CFG.star)}</i> ${esc(CFG.resto)}</b>`;
  if(!CFG.logo) return;
  const im=new Image(); im.alt=''; im.onload=()=>a.prepend(im); im.src=CFG.logo;
}
['#mk-nav','#mk-hero','#mk-foot'].forEach(marca);


/* ---------- conteúdo ---------- */
const ICAL='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>';
const IFONE='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>';
const IWA='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.500l1.700-5.400A8.500 8.500 0 1 1 21 11.500z"/></svg>';
const wa=t=>'https://wa.me/'+CFG.contatos.recepcao.tel.replace(/\D/g,'')+'?text='+encodeURIComponent(t);
const waSeg=t=>'https://wa.me/'+CFG.contatos.seguros.tel.replace(/\D/g,'')+'?text='+encodeURIComponent(t);
const btnsAg=(t)=>`<div class="ac"><a class="btn" href="tel:${CFG.contatos.recepcao.tel}">${IFONE} Ligar para a Recepção</a><a class="btn wa" href="${wa(t)}" target="_blank" rel="noopener">${IWA} WhatsApp</a></div>`;
$('#rev').innerHTML=REV.map(r=>`<article class="c rev${r.d?' p':''}"><span class="n">${r.n}</span><div class="km">${r.km}</div><p>${r.p}</p>
 <ul>${r.g.map(g=>`<li>${CK}${g}</li>`).join('')}</ul><div class="pg">${r.pg}</div>
 ${r.ag?`<span class="ag obrig">${ICAL} Agendamento obrigatório</span><p style="font-size:.85rem;margin-top:8px">Marque data e horário com a Recepção Técnica.</p><a class="btn s" href="#agendamento">Como agendar</a>`
        :`<span class="ag livre">${CK} Não precisa agendar</span><p style="font-size:.85rem;margin-top:8px">Basta comparecer à concessionária.</p>`}</article>`).join('');
$('#ag-btns').outerHTML=btnsAg('Olá! Gostaria de agendar minha revisão com a Recepção Técnica.');
$('#cui').innerHTML=CUI.map(c=>`<article class="c"><span class="ic">${CK}</span><h3>${c[0]}</h3><p>${c[1]}</p></article>`).join('');
$('#top').innerHTML=TOP.map(t=>`<li>${t}</li>`).join('');
const un=(u,ok)=>`<article class="c u"><div class="t">${u.n?esc(u.c):''}</div><h3>${esc(u.n||u.c)}</h3>${u.e?`<p>${esc(u.e)}</p>`:''}</article>`;
$('#uo').innerHTML=UO.map(un).join(''); $('#up').innerHTML=UP.map(un).join('');

/* ---------- seguro ---------- */
const ISH='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>';
const SEG=[
 {tag:'Plano 1',t:'Furto e Roubo',d:'Proteção contra furto e roubo, com assistência 24 horas.',
  i:['Furto','Roubo'],m:'Olá! Tenho interesse no seguro de Furto e Roubo com Assistência 24h (guincho). Pode me passar uma cotação?'},
 {tag:'Plano 2 · Seguro Total',top:1,t:'Seguro Total',d:'Protege a sua moto ou o seu carro contra colisão, incêndio, roubo, furto, danos a terceiros e danos morais.',
  i:['Colisão','Incêndio','Roubo','Furto','Danos a terceiros','Danos morais'],m:'Olá! Tenho interesse no Seguro Total (colisão, incêndio, roubo, furto, danos a terceiros, danos morais e guincho 24h). Pode me passar uma cotação?'}];
$('#sg').innerHTML=SEG.map(s=>`<article class="c seg${s.top?' top':''}"><span class="ic">${ISH}</span><span class="tagp">${s.tag}</span><h3>${s.t}</h3><p>${s.d}</p>
 <ul>${s.i.map(x=>`<li>${CK}${x}</li>`).join('')}<li class="as">${CK}Assistência 24h: guincho</li></ul>
 <div class="ac"><a class="btn wa" href="${waSeg(s.m)}" target="_blank" rel="noopener">${IWA} Cotar pelo WhatsApp</a><a class="btn o" href="tel:${CFG.contatos.seguros.tel}">${IFONE} Ligar</a></div></article>`).join('');


/* ---------- contatos: fonte única em config.js ---------- */
document.querySelectorAll('[data-fone]').forEach(e=>{
  const c=CFG.contatos[e.dataset.fone]; if(!c) return;
  e.textContent=c.fone; if('tel' in e.dataset) e.href='tel:'+c.tel;
});
const MSG_REC='Olá! Vim pelo site da Entrega Técnica e gostaria de falar com a Recepção Técnica.';
$('#fb-wa').href=$('#h-wa').href=wa(MSG_REC);
$('#fb-tel').href='tel:'+CFG.contatos.recepcao.tel;

/* ---------- primeira revisão = retirada + 6 meses ---------- */
const ret=$('#ret'), prazo=$('#prazo'), fmtLongo=new Intl.DateTimeFormat('pt-BR',{day:'2-digit',month:'long',year:'numeric'});
ret.min='2000-01-01';
ret.value=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Rio_Branco'}).format(new Date());
const calc=()=>{const d=lerData(ret.value); prazo.textContent=d?fmtLongo.format(somarMeses(d.a,d.m,d.d,6)):'Informe uma data válida'};
ret.oninput=ret.onchange=calc; calc();

/* ---------- vídeo ---------- */
const PLAY='<svg viewBox="0 0 24 24"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z"/></svg>';
function montarVideo(url,legenda){
  const fig=$('#vid'), tela=$('.tela',fig), lg=$('#leg');
  lg.textContent=legenda||''; lg.hidden=!legenda;
  tela.replaceChildren(); fig.hidden=true;
  url=urlSegura(url||''); if(!url) return;
  if(embedUrl(url)){tela.innerHTML=previa(url); fig.hidden=false; return}
  const v=document.createElement('video'), pl=document.createElement('div');
  v.controls=true; v.playsInline=true; v.preload='metadata'; v.setAttribute('aria-label','Vídeo da entrega técnica');
  pl.className='pl'; pl.tabIndex=0; pl.setAttribute('role','button'); pl.setAttribute('aria-label','Assistir ao vídeo'); pl.innerHTML='<span>'+PLAY+'</span>';
  tela.append(v,pl);
  v.addEventListener('loadedmetadata',()=>fig.hidden=false,{once:true});   // só aparece se o arquivo existir
  v.addEventListener('error',()=>fig.hidden=true);
  v.src=url+'#t=0.1';
  const tocar=()=>v.play().catch(()=>{});
  pl.onclick=tocar; pl.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();tocar()}};
  v.addEventListener('play',()=>pl.classList.add('fora'));
  v.addEventListener('pause',()=>{if(!v.seeking) pl.classList.remove('fora')});
  v.addEventListener('ended',()=>pl.classList.remove('fora'));
}
async function aplicarConfig(){
  let c={}; try{c=await api('rpc/config_publica')||{}}catch(_){}   // sem rede: fica o texto padrão da página
  if(c.titulo) $('#h1').textContent=c.titulo;
  if(c.subtitulo) $('#sub').textContent=c.subtitulo;
  montarVideo('video_url' in c?c.video_url:CFG.video,c.legenda);
}

/* ---------- depoimentos: só avaliações aprovadas no servidor ---------- */
async function mural(){
  const el=$('#mu'), rs=$('#resumo');
  rs.innerHTML=''; el.setAttribute('aria-busy','true'); el.innerHTML='<p class="vz">Carregando depoimentos…</p>';
  let l;
  try{l=await api('rpc/avaliacoes_aprovadas'); if(!Array.isArray(l)) throw 0}
  catch(_){
    el.innerHTML='<div class="vz"><p>Não conseguimos carregar os depoimentos agora.</p><button class="btn o s" id="tent" type="button" style="margin-top:12px">Tentar novamente</button></div>';
    $('#tent').onclick=mural; el.removeAttribute('aria-busy'); return}
  el.removeAttribute('aria-busy');
  if(!l.length){el.innerHTML='<p class="vz">Ainda não há depoimentos publicados. Que tal ser o primeiro a avaliar?</p>';return}
  const md=l.reduce((t,a)=>t+(+a.estrelas||0),0)/l.length;
  rs.innerHTML=`<p class="rs"><b>${md.toFixed(1).replace('.',',')}</b>${estrelas(Math.round(md))}<span>${l.length} ${l.length===1?'avaliação':'avaliações'} de clientes</span></p>`;
  el.innerHTML=l.map(a=>`<article class="c d${a.destacado?' h':''}">${estrelas(a.estrelas)}${a.comentario?`<p style="color:var(--ink)">${esc(a.comentario)}</p>`:''}<div class="w2"><b>${esc(a.nome)}</b><span>${esc(data(a.criado_em))}</span></div></article>`).join('');
}

/* ---------- avaliação (a validação real é no servidor; localStorage é só conveniência) ---------- */
const ERROS_AV={limite_frequencia:'Você enviou avaliações há pouco tempo. Tente novamente mais tarde.',
  nome_invalido:'Use pelo menos 2 letras no nome ou deixe em branco.',nota_invalida:'Escolha de 1 a 5 estrelas.',rede:'Sem conexão. Confira a internet e tente de novo.'};
let nota=null, enviando=false; const st=$('#st');
st.innerHTML=[1,2,3,4,5].map(n=>`<button type="button" role="radio" aria-checked="false" aria-label="${n} ${n===1?'estrela':'estrelas'}" data-n="${n}">${STAR}</button>`).join('');
const bt=[...st.children];
const pintar=v=>{bt.forEach(b=>b.classList.toggle('on',v&&+b.dataset.n<=v)); $('#rc').textContent=v?NOTAS[v]:'Toque nas estrelas'};
bt.forEach(b=>{const n=+b.dataset.n;
  b.onclick=()=>{nota=n;$('#e-nota').hidden=true;bt.forEach(x=>x.setAttribute('aria-checked',x===b));pintar(n)};
  b.onmouseenter=()=>pintar(n)});
st.onmouseleave=()=>pintar(nota);
$('#com').oninput=e=>$('#cnt').textContent=e.target.value.length;
const feito=()=>{$('#form').hidden=true;$('#feito').hidden=false};
try{if(localStorage.getItem('avaliado')==='1') feito()}catch(_){}
$('#nova').onclick=()=>{try{localStorage.removeItem('avaliado')}catch(_){}$('#feito').hidden=true;$('#form').hidden=false};
$('#form').onsubmit=async e=>{
  e.preventDefault(); if(enviando) return;
  $('#e-env').hidden=true; $('#e-nome').hidden=true;
  const nm=$('#nome').value.trim();
  if(nota===null){$('#e-nota').textContent='Escolha de 1 a 5 estrelas.';$('#e-nota').hidden=false;return}
  if(nm.length===1){$('#e-nome').textContent=ERROS_AV.nome_invalido;$('#e-nome').hidden=false;return}
  const b=$('#env'); enviando=true; b.disabled=true; b.textContent='Enviando…';
  try{
    await api('rpc/enviar_avaliacao',{p_nome:nm,p_estrelas:nota,p_comentario:$('#com').value.trim()});
    try{localStorage.setItem('avaliado','1')}catch(_){}
    e.target.reset(); nota=null; pintar(null); $('#cnt').textContent=0; feito();
  }catch(err){
    $('#e-env').textContent=ERROS_AV[err.message]||'Não foi possível enviar agora. Tente de novo em instantes.';
    $('#e-env').hidden=false;
  }finally{enviando=false;b.disabled=false;b.textContent='Enviar avaliação'}
};

/* ---------- menu: seção atual em destaque ---------- */
const lks=[...document.querySelectorAll('nav a,.mn a')];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)lks.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-40% 0px -55% 0px'});
['revisoes','agendamento','unidades','seguro','avaliar','mural'].forEach(i=>{const x=document.getElementById(i);x&&io.observe(x)});

mural(); aplicarConfig();
