'use strict';
document.documentElement.classList.add('js');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const header = document.querySelector('.header');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu(returnFocus = false) {
  navigation.classList.remove('open');
  document.body.classList.remove('menu-open');
  document.querySelector('main').inert = false;
  document.querySelector('footer').inert = false;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  if (returnFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
  document.querySelector('main').inert = open;
  document.querySelector('footer').inert = open;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('open')) closeMenu(true); });
header.addEventListener('keydown', event => {
  if (event.key !== 'Tab' || !navigation.classList.contains('open')) return;
  const focusable = [document.querySelector('.logo'), ...navigation.querySelectorAll('a'), menuButton];
  const current = focusable.indexOf(document.activeElement);
  if (event.shiftKey && current === 0) { event.preventDefault(); menuButton.focus(); }
  if (!event.shiftKey && current === focusable.length - 1) { event.preventDefault(); focusable[0].focus(); }
});
document.addEventListener('click', event => { if (!header.contains(event.target)) closeMenu(); });
window.matchMedia('(min-width: 768px)').addEventListener('change', () => closeMenu());
const reveals = document.querySelectorAll('.reveal, .final-section');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
  }, { threshold: 0.12 });
  reveals.forEach(element => observer.observe(element));
} else reveals.forEach(element => element.classList.add('visible'));

// Decode before presenting: file existence alone does not guarantee a valid asset.
const imageCache = new Map();
function loadProduct(name) {
  if (!imageCache.has(name)) {
    const image = new Image();
    image.src = `assets/images/${name}.webp`;
    const loading = image.decode().then(() => image).catch(error => { imageCache.delete(name); throw error; });
    imageCache.set(name, loading);
  }
  return imageCache.get(name);
}
const organicEase = 'cubic-bezier(.19,.85,.25,1)';
function play(element, keyframes, duration = 620, delay = 0) {
  if (reducedMotion.matches || !element.animate) return Promise.resolve();
  element.getAnimations().forEach(animation => animation.cancel());
  const animation = element.animate(keyframes, {duration, delay, easing: organicEase, fill:'forwards'});
  return animation.finished.catch(() => {});
}
function cancelAnimations(elements) { elements.forEach(element => element.getAnimations().forEach(animation => animation.cancel())); }

const vibes = {
  azedo: { color: '#eee5f8', kicker: 'UM ARREPIO BOM.', name: 'Azedinho.\nAtitude de sobra.', description: 'Uma careta, um sorriso e aquela vontade de experimentar de novo. Minhocas Azedinhas: cores e sabores que surpreendem.', image: 'balafini6', alt: 'Fini Minhocas Azedinhas', sticker: 'BORA\nARREPIAR?', word: 'Aaah!' },
  doce: { color: '#f9dbe5', kicker: 'UMA PAUSA MAIS DOCE.', name: 'Docinho.\nCarinho em forma de bala.', description: 'Morango e nata em um formato que é puro afeto. Beijos Fini: um jeito gostoso de adoçar os pequenos momentos.', image: 'balafini10', alt: 'Fini Beijos, sabor morango e nata', sticker: 'DOCE\nENCONTRO', word: 'Mwah!' },
  tubes: { color: '#d9edf9', kicker: 'DIVERSÃO EM OUTRO FORMATO.', name: 'Tubes.\nUma volta no sabor.', description: 'Tubes Azedinhos Twister: cores entrelaçadas e sabor de frutas silvestres e nata. Para sair da rotina, até no formato.', image: 'caixafini7', alt: 'Display Fini Tubes Azedinhos Twister', sticker: 'VIRA\nA VIBE!', word: 'Uau!' },
  classicos: { color: '#dfedcd', kicker: 'SEMPRE UMA BOA COMPANHIA.', name: 'Clássicos.\nPequenos grandes ícones.', description: 'Ursinhos de sabores sortidos. Um formato que a gente reconhece, uma diversão que dá vontade de compartilhar.', image: 'balafini7', alt: 'Fini Ursinhos, sabores sortidos', sticker: 'OI,\nSAUDADE!', word: 'Oba!' }
};
const tabs = [...document.querySelectorAll('[data-vibe]')];
const vibePanel = document.querySelector('#vibe-panel');
const vibeArt = document.querySelector('.vibe-art');
let vibeRequest = 0;
async function chooseVibe(tab) {
  const request = ++vibeRequest;
  const data = vibes[tab.dataset.vibe];
  let ready;
  try { ready = await loadProduct(data.image); } catch { return; }
  if (request !== vibeRequest) return;
  tabs.forEach(item => { const selected = item === tab; item.setAttribute('aria-selected', String(selected)); item.tabIndex = selected ? 0 : -1; });
  vibePanel.setAttribute('aria-labelledby', tab.id);
  const image = document.querySelector('#vibe-image');
  const content = document.querySelector('.vibe-content');
  cancelAnimations([image, content]);
  vibePanel.style.setProperty('--wipe-color', data.color);
  vibePanel.classList.remove('sweeping');
  await play(image, [{transform:'rotate(10deg)',opacity:1},{transform:'translate3d(100px,0,0) rotate(22deg) scale(.94)',opacity:0}], 230);
  if (request !== vibeRequest) return;
  vibePanel.style.backgroundColor = data.color;
  vibePanel.classList.add('sweeping');
    document.querySelector('#vibe-kicker').textContent = data.kicker;
    document.querySelector('#vibe-name').innerText = data.name;
    document.querySelector('#vibe-description').textContent = data.description;
    document.querySelector('#vibe-sticker').innerText = data.sticker;
    document.querySelector('.vibe-letter').textContent = data.word;
    image.src = ready.src; image.alt = data.alt;
    image.classList.toggle('is-display', data.image.startsWith('caixa'));
  play(image, [{transform:'translate3d(-100px,20px,0) rotate(-8deg) scale(.86)',opacity:0},{transform:'translate3d(5px,-4px,0) rotate(12deg) scale(1.015)',opacity:1,offset:.75},{transform:'rotate(10deg)',opacity:1}], 740);
  play(content, [{clipPath:'inset(0 100% 0 0)',transform:'translateX(-10px)'},{clipPath:'inset(0)',transform:'translateX(0)'}], 600);
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => chooseVibe(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); tabs[next].focus(); chooseVibe(tabs[next]); }
  });
});

const classics = [
  { name: 'Dentaduras', image: 'balafini5', flavor: 'MORANGO E FRAMBOESA', description: 'O sorriso mais gostoso da turma. Um formato inconfundível que dispensa apresentações.', tag: 'SORRISO GARANTIDO :)', color: '#c9efef' },
  { name: 'Minhocas', image: 'caixafini2', flavor: 'SABORES SORTIDOS', description: 'Coloridas, divertidas e cheias de personalidade. Um clássico que dá uma voltinha na sua rotina.', tag: 'DIVERSÃO QUE SE ESTICA', color: '#f4eb92' },
  { name: 'Ursinhos', image: 'balafini7', flavor: 'SABORES SORTIDOS', description: 'Pequenos no tamanho, grandes na memória. Uma turma de cores e sabores para compartilhar.', tag: 'UMA TURMA DE SABORES', color: '#d6e8c1' },
  { name: 'Amoras', image: 'balafini1', flavor: 'SABOR AMORA', description: 'Textura marcante e um formato que você reconhece de olhos fechados. Um pequeno ícone cheio de sabor.', tag: 'TEXTURA QUE MARCA', color: '#f4cdd9' },
  { name: 'Tubes', image: 'caixafini5', flavor: 'SABOR MAÇÃ DO AMOR', description: 'O regaliz em uma versão cheia de personalidade. Maçã do amor para dar um novo sabor à sua pausa.', tag: 'UM FORMATO, MUITAS HISTÓRIAS', color: '#eccfea' }
];
let classicIndex = 0, classicRequest = 0;
const classicStage = document.querySelector('.classic-stage');
const classicSelectors = [...document.querySelectorAll('[data-classic]')];
async function chooseClassic(index) {
  const previous = classicIndex;
  classicIndex = (index + classics.length) % classics.length;
  const request = ++classicRequest;
  const data = classics[classicIndex], number = String(classicIndex + 1).padStart(2, '0');
  let ready;
  try { ready = await loadProduct(data.image); } catch { classicIndex = previous; return; }
  if (request !== classicRequest) return;
  const direction = index < previous ? -1 : 1;
  const image = document.querySelector('#classic-image');
  const numberElement = document.querySelector('#classic-number');
  const name = document.querySelector('#classic-name');
  cancelAnimations([image, numberElement, name]);
  classicSelectors.forEach((button, i) => button.setAttribute('aria-pressed', String(i === classicIndex)));
  document.querySelector('#classic-count').textContent = `${number} / 05`;
  await Promise.all([
    play(image, [{transform:'rotate(-10deg)',opacity:1},{transform:`translate3d(${direction*120}px,-12px,0) rotate(${direction*15}deg) scale(.9)`,opacity:0}], 260),
    play(numberElement, [{transform:'translateX(0)',opacity:1},{transform:`translateX(${-direction*35}px)`,opacity:.2}], 260),
    play(name, [{clipPath:'inset(0)'},{clipPath:'inset(0 0 100% 0)'}], 210)
  ]);
  if (request !== classicRequest) return;
    document.querySelector('#classic-number').textContent = number;
    document.querySelector('#classic-name').textContent = data.name;
    document.querySelector('#classic-flavor').textContent = data.flavor;
    document.querySelector('#classic-description').textContent = data.description;
    document.querySelector('#classic-tag').textContent = data.tag;
    document.querySelector('.classic-disc').style.backgroundColor = data.color;
    image.src = ready.src; image.alt = `Fini ${data.name}`;
    image.classList.toggle('is-display', data.image.startsWith('caixa'));
    document.querySelector('.classic-disc').style.transform = `rotate(${classicIndex % 2 ? 9 : -14}deg)`;
  play(image, [{transform:`translate3d(${-direction*120}px,15px,0) rotate(${-direction*23}deg) scale(.9)`,opacity:0},{transform:'translate3d(5px,-4px,0) rotate(-8deg) scale(1.02)',opacity:1,offset:.78},{transform:'rotate(-10deg)',opacity:1}], 760);
  play(numberElement, [{transform:`translateX(${direction*45}px)`,opacity:.1},{transform:'translateX(0)',opacity:1}], 750);
  play(name, [{clipPath:'inset(100% 0 0 0)',transform:'translateY(15px)'},{clipPath:'inset(0)',transform:'translateY(0)'}], 650, 90);
}
document.querySelector('#classic-prev').addEventListener('click', () => chooseClassic(classicIndex - 1));
document.querySelector('#classic-next').addEventListener('click', () => chooseClassic(classicIndex + 1));
classicSelectors.forEach(button => button.addEventListener('click', () => chooseClassic(Number(button.dataset.classic))));
classicStage.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); chooseClassic(classicIndex + (event.key === 'ArrowRight' ? 1 : -1)); }
});
let touchStart = null;
classicStage.addEventListener('touchstart', event => { touchStart = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }, { passive: true });
classicStage.addEventListener('touchend', event => {
  if (!touchStart) return;
  const dx = event.changedTouches[0].clientX - touchStart.x, dy = event.changedTouches[0].clientY - touchStart.y;
  if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) chooseClassic(classicIndex + (dx < 0 ? 1 : -1));
  touchStart = null;
}, { passive: true });

// Hero campaign: two independent image layers share one fixed presentation area.
const heroArt = document.querySelector('.hero-art');
const heroProduct = document.querySelector('.hero-product');
const campaign = [
  { image:'balafini6', name:'Minhocas Azedinhas', word:'nham!', seal:'AZEDINHO\nQUE DÁ\nUM UAU!', accent:'#eb3477', wordColor:'#f8ed45' },
  { image:'balafini5', name:'Dentaduras', word:'sorria!', seal:'UM SORRISO\nCHEIO DE\nSABOR', accent:'#24a5c8', wordColor:'#b9e5ea' },
  { image:'balafini7', name:'Ursinhos', word:'oba!', seal:'PEQUENOS\nGRANDES\nÍCONES', accent:'#32985c', wordColor:'#d6e59c' },
  { image:'balafini1', name:'Amoras', word:'hmmm!', seal:'TEXTURA\nQUE DÁ\nVONTADE', accent:'#db3151', wordColor:'#f7b5c7' },
  { image:'caixafini5', name:'Tubes', word:'uau!', seal:'UMA VOLTA\nNO SEU\nSABOR', accent:'#c13a84', wordColor:'#eed0ed' }
];
let heroIndex = 0, heroTimer = 0, heroChanging = false, heroVisible = true, heroUserPaused = false, heroFocusPaused = false;
let heroGeneration = 0;
const heroPause = document.querySelector('#hero-pause');
const heroNext = document.querySelector('#hero-next');
function canRotateHero() { return heroVisible && !document.hidden && !heroUserPaused && !reducedMotion.matches && !heroFocusPaused; }
function scheduleHero() {
  clearTimeout(heroTimer);
  if (!canRotateHero() || heroChanging) return;
  // Fetch just the next product, not the complete campaign at page load.
  loadProduct(campaign[(heroIndex + 1) % campaign.length].image).catch(() => {});
  heroTimer = setTimeout(() => presentHero((heroIndex + 1) % campaign.length), 4200);
}
async function presentHero(index) {
  if (heroChanging) return;
  heroChanging = true; clearTimeout(heroTimer);
  const generation = ++heroGeneration;
  const data = campaign[index];
  let ready;
  try { ready = await loadProduct(data.image); } catch { heroChanging = false; scheduleHero(); return; }
  if (generation !== heroGeneration) return;
  const outgoing = heroProduct.querySelector('.is-current');
  const incoming = ready.cloneNode();
  incoming.className = `hero-slide${data.image.startsWith('caixa') ? ' is-display' : ''}`; incoming.alt = `Fini ${data.name}`;
  incoming.setAttribute('aria-hidden','true');
  incoming.width = 550; incoming.height = 880;
  heroProduct.append(incoming);
  heroArt.style.setProperty('--hero-accent', data.accent);
  heroArt.style.setProperty('--hero-word', data.wordColor);
  const word = document.querySelector('.hero-backword');
  word.textContent = data.word;
  play(word, [{transform:'rotate(-18deg) scale(.86)',opacity:.35},{transform:'rotate(-12deg) scale(1)',opacity:1}], 850);
  const seal = document.querySelector('.flavor-seal');
  seal.replaceChildren();
  data.seal.split('\n').forEach((line, i) => { const piece = document.createElement(i === 2 ? 'strong' : 'span'); piece.textContent = line; seal.append(piece); });
  play(seal, [{transform:'rotate(13deg) scale(1)'},{transform:'rotate(-6deg) scale(.88)',offset:.3},{transform:'rotate(13deg) scale(1)'}], 700);
  // Incoming enters before outgoing has completely left; there is never an empty frame.
  await Promise.all([
    play(outgoing, [{transform:'translate3d(0,0,0) rotate(0deg) scale(1)',opacity:1},{transform:'translate3d(32px,-85px,0) rotate(13deg) scale(.88)',opacity:0}], 620),
    play(incoming, [{transform:'translate3d(-35px,120px,0) rotate(-18deg) scale(.76)',opacity:0},{transform:'translate3d(5px,-8px,0) rotate(3deg) scale(1.025)',opacity:1,offset:.78},{transform:'translate3d(0,0,0) rotate(0deg) scale(1)',opacity:1}], 880, 100)
  ]);
  outgoing.remove(); incoming.classList.add('is-current'); incoming.removeAttribute('aria-hidden');
  heroIndex = index;
  document.querySelector('#hero-caption').textContent = `${String(index + 1).padStart(2,'0')} / ${data.name.toUpperCase()}`;
  heroChanging = false; scheduleHero();
}
function updatePauseControl() {
  heroPause.setAttribute('aria-pressed', String(heroUserPaused));
  heroPause.setAttribute('aria-label', heroUserPaused ? 'Retomar animações da hero' : 'Pausar animações da hero');
  heroPause.innerHTML = heroUserPaused ? '<span aria-hidden="true">▶</span> Retomar' : '<span aria-hidden="true">Ⅱ</span> Pausar';
  heroPause.disabled = reducedMotion.matches;
  if (reducedMotion.matches) { heroPause.textContent = 'Sem movimento'; heroPause.setAttribute('aria-label','Movimento reduzido ativado'); }
}
heroPause.addEventListener('click', () => {
  heroUserPaused = !heroUserPaused;
  if (!heroUserPaused) heroFocusPaused = false;
  updatePauseControl(); scheduleHero(); requestMotion();
});
heroNext.addEventListener('click', () => presentHero((heroIndex + 1) % campaign.length));
document.querySelector('.hero-player').addEventListener('focusin', () => { heroFocusPaused = true; scheduleHero(); });
document.querySelector('.hero-player').addEventListener('focusout', () => setTimeout(() => {
  if (!document.querySelector('.hero-player').contains(document.activeElement)) heroFocusPaused = false;
  scheduleHero();
}, 0));
if ('IntersectionObserver' in window) {
  new IntersectionObserver(entries => { heroVisible = entries[0].isIntersecting; scheduleHero(); requestMotion(); }, {threshold:.1}).observe(heroArt);
}

// Orbital geometry is cached on resize. Per-frame updates touch only transforms,
// opacity and the foreground/background crossing; scroll geometry is read once.
const satellites = [...heroArt.querySelectorAll('.satellite')];
const world = document.querySelector('.world');
const depthLayers = [...world.querySelectorAll('.depth-layer')];
let frame = 0, pointerX = 0, pointerY = 0, dirty = true;
let geometry, orbitTime = 0, previousTime = 0;
function measureOrbit() {
  const line = heroArt.querySelector('.orbit');
  geometry = {cx:line.offsetLeft+line.offsetWidth/2,cy:line.offsetTop+line.offsetHeight/2,rx:line.offsetWidth/2,ry:line.offsetHeight/2};
}
function drawOrbits() {
  const rotation = -20 * Math.PI / 180;
  satellites.forEach(element => {
    const track = Number(element.dataset.track);
    const theta = orbitTime * Math.PI * 2 / Number(element.dataset.period) + Number(element.dataset.phase);
    const rx = geometry.rx + track * 20, ry = geometry.ry - track * 30;
    const x = Math.cos(theta) * rx, y = Math.sin(theta) * ry;
    const depth = (Math.sin(theta)+1)/2;
    element.style.setProperty('--orbit-x', `${geometry.cx+x*Math.cos(rotation)-y*Math.sin(rotation)}px`);
    element.style.setProperty('--orbit-y', `${geometry.cy+x*Math.sin(rotation)+y*Math.cos(rotation)}px`);
    element.style.setProperty('--orbit-rotation', `${theta*180/Math.PI+track*35}deg`);
    element.style.setProperty('--orbit-scale', String(.76+depth*.3));
    element.style.setProperty('--orbit-opacity', String(.67+depth*.33));
    element.style.zIndex = depth > .5 ? '5' : '2';
  });
}
function renderMotion(time) {
  frame = 0;
  const active = !reducedMotion.matches && window.innerWidth >= 768;
  const orbitActive = !reducedMotion.matches && heroVisible && !heroUserPaused && !document.hidden;
  if (orbitActive && previousTime) orbitTime += Math.min(time-previousTime, 40)/1000;
  previousTime = orbitActive ? time : 0;
  if (dirty) {
    dirty = false;
    const rect = world.getBoundingClientRect();
    const offset = active && rect.bottom > 0 && rect.top < window.innerHeight ? window.innerHeight/2-rect.top-rect.height/2 : 0;
    header.classList.toggle('scrolled', window.scrollY > 50);
    heroProduct.style.setProperty('--px', `${active ? pointerX*.7 : 0}px`);
    heroProduct.style.setProperty('--py', `${active ? pointerY*.7 : 0}px`);
    depthLayers.forEach(element => {
      const drift = Math.max(-150,Math.min(150,offset*Number(element.dataset.drift)));
      element.style.setProperty('--drift', `${drift}px`);
      element.style.setProperty('--spin', `${active ? offset/600*Number(element.dataset.spin || 0) : 0}deg`);
      element.style.setProperty('--depth-scale', String(active && element.classList.contains('world-pack') ? 1+Math.min(.035,Math.abs(offset)/16000) : 1));
    });
  }
  if (heroVisible) drawOrbits();
  if (orbitActive) frame = requestAnimationFrame(renderMotion);
}
function requestMotion() { dirty = true; if (!frame) frame = requestAnimationFrame(renderMotion); }
heroArt.addEventListener('pointermove', event => {
  if (event.pointerType !== 'mouse') return;
  const rect = heroArt.getBoundingClientRect();
  pointerX = ((event.clientX - rect.left) / rect.width - .5) * 24;
  pointerY = ((event.clientY - rect.top) / rect.height - .5) * 20;
  requestMotion();
});
heroArt.addEventListener('pointerleave', () => { pointerX = pointerY = 0; requestMotion(); });
window.addEventListener('scroll', requestMotion, { passive: true });
window.addEventListener('resize', () => { measureOrbit(); requestMotion(); }, { passive: true });
document.addEventListener('visibilitychange', () => { scheduleHero(); requestMotion(); });
reducedMotion.addEventListener('change', () => {
  document.querySelectorAll('main *').forEach(element => element.getAnimations().forEach(animation => {
    if (animation.effect.getTiming().iterations !== Infinity && animation.playState !== 'finished') animation.finish();
  }));
  updatePauseControl(); scheduleHero(); requestMotion();
});
classicStage.addEventListener('pointermove', event => {
  if (event.pointerType !== 'mouse' || reducedMotion.matches || window.innerWidth < 768) return;
  const rect = classicStage.getBoundingClientRect();
  document.querySelector('.classic-picture').style.setProperty('--tilt', `${((event.clientX-rect.left)/rect.width-.5)*8}deg`);
});
classicStage.addEventListener('pointerleave', () => document.querySelector('.classic-picture').style.setProperty('--tilt','0deg'));
measureOrbit(); updatePauseControl(); requestMotion(); scheduleHero();
