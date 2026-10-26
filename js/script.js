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
// P3-D local experiment: change only H01's surface, never its orbital wrapper.
function prepareH01Asset() {
  const wrapper = document.querySelector('.hero-art .w1.satellite');
  if (!wrapper) return;
  const image = new Image(512, 133);
  image.className = 'h01-asset';
  image.alt = '';
  image.setAttribute('aria-hidden', 'true');
  image.decoding = 'async';
  image.fetchPriority = 'low';
  let generation = 0;
  const fallback = () => {
    ++generation;
    wrapper.classList.remove('has-h01-asset');
    image.remove();
  };
  image.addEventListener('error', fallback);
  image.addEventListener('load', async () => {
    const request = ++generation;
    try {
      await image.decode();
      if (request !== generation || !image.naturalWidth) return;
      // One atomic surface swap after decode; the CSS sweet remains the fallback.
      if (!image.isConnected) wrapper.append(image);
      wrapper.classList.add('has-h01-asset');
    } catch {
      if (request === generation) fallback();
    }
  });
  image.sizes = '(max-width: 767px) 76px, 117px';
  image.srcset = 'assets/images/candies/minhocas-azedinhas/minhoca-a-view01-v02-256.webp 256w, assets/images/candies/minhocas-azedinhas/minhoca-a-view01-v02-512.webp 512w';
  image.src = 'assets/images/candies/minhocas-azedinhas/minhoca-a-view01-v02-256.webp';
}
// Decorative texture must not delay the page's primary load event.
if (document.readyState === 'complete') prepareH01Asset();
else window.addEventListener('load', prepareH01Asset, { once: true });

const motionEase = {
  settle: 'cubic-bezier(.18,.72,.24,1)',
  travel: 'cubic-bezier(.42,0,.2,1)',
  snap: 'cubic-bezier(.16,.9,.3,1)',
  soft: 'cubic-bezier(.25,.5,.3,1)'
};
// Only live WAAPI jobs are retained. CSS returns to the approved P1 resting pose.
const motionJobs = new Map();
let lastMotionPreference = reducedMotion.matches;
function syncMotionPlayback() {
  document.documentElement.classList.toggle('motion-suspended', document.hidden);
  motionJobs.forEach(({hero}, animation) => {
    if (reducedMotion.matches) { animation.finish(); return; }
    const paused = document.hidden || (hero && (heroUserPaused || !heroVisible));
    if (paused && animation.playState === 'running') animation.pause();
    else if (!paused && animation.playState === 'paused') animation.play();
  });
}
function cancelAnimations(elements) {
  motionJobs.forEach(({element}, animation) => { if (elements.includes(element)) animation.cancel(); });
}
function play(element, keyframes, duration = 480, delay = 0, easing = motionEase.settle) {
  if (reducedMotion.matches !== lastMotionPreference) applyMotionPreference();
  const hero = Boolean(element.closest('.hero-art'));
  if (reducedMotion.matches || !element.animate || (hero && heroUserPaused)) return Promise.resolve();
  cancelAnimations([element]);
  const animation = element.animate(keyframes, {duration, delay, easing, fill:'both'});
  motionJobs.set(animation, {element, hero});
  syncMotionPlayback();
  return animation.finished.catch(() => {}).finally(() => {
    motionJobs.delete(animation);
    animation.cancel();
  });
}
function clearGhosts(container) {
  container.querySelectorAll('.motion-ghost').forEach(element => { cancelAnimations([element]); element.remove(); });
}
function productGhost(image) {
  const ghost = image.cloneNode();
  ghost.removeAttribute('id');
  ghost.alt = ''; ghost.setAttribute('aria-hidden', 'true');
  ghost.classList.add('motion-ghost');
  // One layout read per interaction, never per animation frame.
  Object.assign(ghost.style, {position:'absolute',left:`${image.offsetLeft}px`,top:`${image.offsetTop}px`,width:`${image.offsetWidth}px`,height:`${image.offsetHeight}px`,margin:'0',maxWidth:'none'});
  image.parentElement.append(ghost);
  return ghost;
}

const vibes = {
  azedo: { color: '#eee5f8', kicker: 'UM ARREPIO BOM.', name: 'Azedinho.\nAtitude de sobra.', description: 'Uma careta, um sorriso e aquela vontade de experimentar de novo. Minhocas Azedinhas: cores e sabores que surpreendem.', image: 'balafini6', alt: 'Fini Minhocas Azedinhas', sticker: 'BORA\nARREPIAR?', word: 'Aaah!' },
  doce: { color: '#f9dbe5', kicker: 'UMA PAUSA MAIS DOCE.', name: 'Docinho.\nCarinho em forma de bala.', description: 'Morango e nata em um formato que é puro afeto. Beijos Fini: um jeito gostoso de adoçar os pequenos momentos.', image: 'balafini10', alt: 'Fini Beijos, sabor morango e nata', sticker: 'DOCE\nENCONTRO', word: 'Mwah!' },
  tubes: { color: '#d9edf9', kicker: 'DIVERSÃO EM OUTRO FORMATO.', name: 'Tubes.\nUma volta no sabor.', description: 'Tubes Azedinhos Twister: cores entrelaçadas e sabor de frutas silvestres e nata. Para sair da rotina, até no formato.', image: 'caixafini7', alt: 'Display Fini Tubes Azedinhos Twister', sticker: 'VIRA\nA VIBE!', word: 'Uau!' },
  classicos: { color: '#dfedcd', kicker: 'SEMPRE UMA BOA COMPANHIA.', name: 'Clássicos.\nPequenos grandes ícones.', description: 'Ursinhos de sabores sortidos. Um formato que a gente reconhece, uma diversão que dá vontade de compartilhar.', image: 'balafini7', alt: 'Fini Ursinhos, sabores sortidos', sticker: 'OI,\nSAUDADE!', word: 'Oba!' }
};
const tabs = [...document.querySelectorAll('[data-vibe]')];
const vibePanel = document.querySelector('#vibe-panel');
const vibeArt = document.querySelector('.vibe-art');
let vibeRequest = 0, vibeShown = 'azedo';
const sensationMotion = {
  azedo: {duration:460, ease:motionEase.snap, frames:[{transform:'translateX(-8px) rotate(-4deg)'},{transform:'translateX(5px) rotate(3deg)',offset:.25},{transform:'translateX(-2px) rotate(-1deg)',offset:.55},{transform:'none'}]},
  doce: {duration:640, ease:motionEase.soft, frames:[{transform:'translateY(14px) scale(.94)'},{transform:'translateY(-3px) scale(1.025)',offset:.7},{transform:'none'}]},
  tubes: {duration:540, ease:motionEase.travel, frames:[{transform:'translateX(26px) rotateY(-16deg) rotate(-4deg)'},{transform:'translateX(-3px) rotateY(3deg) rotate(1deg)',offset:.78},{transform:'none'}]},
  classicos: {duration:420, ease:motionEase.settle, frames:[{transform:'scale(.96) rotate(3deg)'},{transform:'scale(1.015) rotate(-1deg)',offset:.7},{transform:'none'}]}
};
async function chooseVibe(tab) {
  const request = ++vibeRequest;
  const key = tab.dataset.vibe, data = vibes[key];
  // Selection feedback does not wait for image decoding or an exit animation.
  tabs.forEach(item => { const selected = item === tab; item.setAttribute('aria-selected', String(selected)); item.tabIndex = selected ? 0 : -1; });
  vibePanel.setAttribute('aria-labelledby', tab.id);
  vibePanel.setAttribute('aria-busy', 'true');
  let ready;
  try { ready = await loadProduct(data.image); } catch {
    if (request === vibeRequest) {
      tabs.forEach(item => { const selected = item.dataset.vibe === vibeShown; item.setAttribute('aria-selected', String(selected)); item.tabIndex = selected ? 0 : -1; });
      vibePanel.setAttribute('aria-labelledby', `tab-${vibeShown}`);
      vibePanel.removeAttribute('aria-busy');
    }
    return;
  }
  if (request !== vibeRequest) return;
  const image = document.querySelector('#vibe-image');
  cancelAnimations([image]); clearGhosts(vibeArt);
  const ghost = productGhost(image);
  vibePanel.dataset.motion = key;
  vibePanel.style.setProperty('--vibe-color', data.color);
  document.querySelector('#vibe-kicker').textContent = data.kicker;
  document.querySelector('#vibe-name').innerText = data.name;
  document.querySelector('#vibe-description').textContent = data.description;
  document.querySelector('#vibe-sticker').textContent = data.sticker.replace('\n', ' ');
  document.querySelector('.vibe-letter').textContent = data.word;
  image.src = ready.src; image.alt = data.alt;
  image.classList.toggle('is-display', data.image.startsWith('caixa'));
  vibeShown = key;
  vibePanel.removeAttribute('aria-busy');
  vibeArt.classList.add('is-reacting');
  const motion = sensationMotion[key];
  await Promise.all([
    play(ghost, [{transform:'none',opacity:1},{transform:'scale(.94)',opacity:0}], 170, 0, motionEase.soft).then(() => ghost.remove()),
    play(image, motion.frames, motion.duration, 0, motion.ease)
  ]);
  if (request === vibeRequest) vibeArt.classList.remove('is-reacting');
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
let classicIndex = 0, classicRequest = 0, classicShown = 0;
const classicStage = document.querySelector('.classic-stage');
const classicSelectors = [...document.querySelectorAll('[data-classic]')];
async function chooseClassic(index) {
  const previous = classicIndex;
  classicIndex = (index + classics.length) % classics.length;
  const request = ++classicRequest;
  const data = classics[classicIndex], number = String(classicIndex + 1).padStart(2, '0');
  classicSelectors.forEach((button, i) => button.setAttribute('aria-pressed', String(i === classicIndex)));
  classicStage.setAttribute('aria-busy', 'true');
  let ready;
  try { ready = await loadProduct(data.image); } catch {
    if (request === classicRequest) {
      classicIndex = classicShown;
      classicSelectors.forEach((button, i) => button.setAttribute('aria-pressed', String(i === classicShown)));
      classicStage.removeAttribute('aria-busy');
    }
    return;
  }
  if (request !== classicRequest) return;
  const direction = index < previous ? -1 : 1;
  const image = document.querySelector('#classic-image');
  const numberElement = document.querySelector('#classic-number');
  const name = document.querySelector('#classic-name');
  cancelAnimations([image, numberElement, name]);
  clearGhosts(image.parentElement);
  const ghost = productGhost(image);
  const display = data.image.startsWith('caixa');
  const distance = Math.min(170, image.parentElement.clientWidth * .45);
  document.querySelector('#classic-count').textContent = `${number} / 05`;
    document.querySelector('#classic-number').textContent = number;
    document.querySelector('#classic-name').textContent = data.name;
    document.querySelector('#classic-flavor').textContent = data.flavor;
    document.querySelector('#classic-description').textContent = data.description;
    document.querySelector('#classic-tag').textContent = data.tag;
    document.querySelector('.classic-disc').style.backgroundColor = data.color;
    image.src = ready.src; image.alt = `Fini ${data.name}`;
    image.classList.toggle('is-display', data.image.startsWith('caixa'));
    document.querySelector('.classic-disc').style.transform = `rotate(${classicIndex % 2 ? 9 : -14}deg)`;
  classicShown = classicIndex;
  classicStage.removeAttribute('aria-busy');
  // Both products occupy the same track; next and previous reverse that track.
  const amplitude = window.innerWidth < 768 ? .65 : 1;
  await Promise.all([
    play(ghost, [{transform:'rotate(-10deg)',opacity:1},{transform:`translate3d(${-direction*distance*amplitude}px,0,-90px) rotate(${display ? -12 : -10-direction*9}deg)`,opacity:0}], 400, 0, motionEase.travel).then(() => ghost.remove()),
    play(image, [{transform:`translate3d(${direction*distance*amplitude}px,${display ? 0 : 10}px,-100px) rotateY(${direction*(display?12:5)}deg) rotate(${display ? -7 : -10+direction*8}deg)`,opacity:.3},{transform:'translate3d(0,-2px,0) rotate(-11deg)',opacity:1,offset:.8},{transform:'rotate(-10deg)',opacity:1}], display ? 620 : 520, 0, motionEase.travel),
    play(numberElement, [{transform:`translateX(${direction*10}px)`},{transform:'none'}], 440, 0, motionEase.settle)
  ]);
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
let heroTarget = 0, heroPending = null;
const heroChoreography = [
  {duration:920, ease:motionEase.settle, start:'translate3d(-24px,62px,-130px) rotateY(-12deg) rotate(-14deg)', crest:'translate3d(4px,-9px,10px) rotate(3deg)'},
  {duration:820, ease:motionEase.travel, start:'translate3d(0,-36px,-90px) rotateX(12deg) rotate(9deg)', crest:'translate3d(0,7px,8px) rotate(-2deg)'},
  {duration:760, ease:motionEase.snap, start:'translate3d(-12px,34px,-70px) rotate(-6deg) scale(.95)', crest:'translate3d(0,-5px,6px) rotate(2deg)'},
  {duration:900, ease:motionEase.soft, start:'translate3d(8px,0,-160px) rotateY(7deg) scale(.88)', crest:'translate3d(0,0,12px) scale(1.015)'},
  {duration:980, ease:motionEase.travel, start:'translate3d(42px,18px,-140px) rotateY(15deg) rotate(5deg)', crest:'translate3d(-3px,0,5px) rotate(-1deg)'}
];
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
  if (heroChanging) { heroPending = index; return; }
  heroTarget = index;
  heroChanging = true; clearTimeout(heroTimer);
  const generation = ++heroGeneration;
  const data = campaign[index];
  let ready;
  try { ready = await loadProduct(data.image); } catch {
    heroChanging = false; heroTarget = heroIndex;
    const pending = heroPending; heroPending = null;
    if (pending !== null) presentHero(pending); else scheduleHero();
    return;
  }
  if (generation !== heroGeneration) return;
  const outgoing = heroProduct.querySelector('.is-current');
  const incoming = ready.cloneNode();
  incoming.className = `hero-slide${data.image.startsWith('caixa') ? ' is-display' : ''}`; incoming.alt = `Fini ${data.name}`;
  incoming.setAttribute('aria-hidden','true');
  incoming.width = 550; incoming.height = 880;
  heroProduct.append(incoming);
  heroProduct.classList.add('is-transitioning');
  heroArt.style.setProperty('--hero-accent', data.accent);
  heroArt.style.setProperty('--hero-word', data.wordColor);
  const word = document.querySelector('.hero-backword');
  word.textContent = data.word;
  play(word, [{transform:'rotate(-14deg) scale(.96)'},{transform:'rotate(-12deg) scale(1)'}], 500, 120, motionEase.soft);
  const seal = document.querySelector('.flavor-seal');
  seal.replaceChildren();
  data.seal.split('\n').forEach((line, i) => { const piece = document.createElement(i === 2 ? 'strong' : 'span'); piece.textContent = line; seal.append(piece); });
  play(seal, [{transform:'rotate(9deg) scale(.97)'},{transform:'rotate(14deg) scale(1.015)',offset:.7},{transform:'rotate(13deg) scale(1)'}], 440, 260, motionEase.settle);
  document.querySelector('#hero-caption').textContent = `${String(index + 1).padStart(2,'0')} / ${data.name.toUpperCase()}`;
  const motion = heroChoreography[index];
  const start = window.innerWidth < 768 ? motion.start.replace(/-1[346]0px/g, '-60px') : motion.start;
  // Anticipation, shared depth plane, small overshoot, then a real reading pause.
  await Promise.all([
    play(outgoing, [{transform:'none',opacity:1},{transform:'translate3d(-3px,5px,5px) rotate(-2deg)',opacity:1,offset:.18},{transform:`translate3d(${index===4?-26:30}px,-34px,-150px) rotateY(-9deg) rotate(${index===1?-8:8}deg) scale(.94)`,opacity:0}], 560, 0, motionEase.travel).then(() => outgoing.remove()),
    play(incoming, [{transform:start,opacity:0},{transform:motion.crest,opacity:1,offset:.76},{transform:'none',opacity:1}], motion.duration, 60, motion.ease)
  ]);
  outgoing.remove(); incoming.classList.add('is-current'); incoming.removeAttribute('aria-hidden');
  heroIndex = index;
  heroProduct.classList.remove('is-transitioning');
  heroChanging = false;
  const pending = heroPending; heroPending = null;
  if (pending !== null && pending !== heroIndex) presentHero(pending); else scheduleHero();
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
  updatePauseControl(); syncMotionPlayback(); scheduleHero(); requestMotion();
});
heroNext.addEventListener('click', () => {
  presentHero(((heroPending ?? heroTarget) + 1) % campaign.length);
  // A deliberate step while paused settles the current frame and displays the queued item.
  if (heroUserPaused) motionJobs.forEach(({hero}, animation) => { if (hero) animation.finish(); });
});
document.querySelector('.hero-player').addEventListener('focusin', () => { heroFocusPaused = true; scheduleHero(); });
document.querySelector('.hero-player').addEventListener('focusout', () => setTimeout(() => {
  if (!document.querySelector('.hero-player').contains(document.activeElement)) heroFocusPaused = false;
  scheduleHero();
}, 0));
if ('IntersectionObserver' in window) {
  new IntersectionObserver(entries => { heroVisible = entries[0].isIntersecting; syncMotionPlayback(); scheduleHero(); requestMotion(); }, {threshold:.1}).observe(heroArt);
}

// Orbital geometry is cached on resize. Per-frame updates touch only transforms,
// opacity and the foreground/background crossing; scroll geometry is read once.
const satellites = [...heroArt.querySelectorAll('.satellite')];
const world = document.querySelector('.world');
const depthLayers = [...world.querySelectorAll('.depth-layer')];
let frame = 0, pointerX = 0, pointerY = 0, dirty = true;
let geometry, orbitTime = 0, previousTime = 0;
let worldTarget = 0, worldOffset = 0, worldInView = false, lastRender = 0;
let pointerRenderX = 0, pointerRenderY = 0;
function measureOrbit() {
  const line = heroArt.querySelector('.orbit');
  geometry = {cx:heroProduct.offsetLeft+heroProduct.offsetWidth/2,cy:heroProduct.offsetTop+heroProduct.offsetHeight/2,rx:line.offsetWidth*.37,ry:line.offsetHeight*.41};
}
function drawOrbits() {
  const rotation = -20 * Math.PI / 180;
  satellites.forEach(element => {
    const track = Number(element.dataset.track);
    const cycle = orbitTime / Number(element.dataset.period) + Number(element.dataset.phase)/(Math.PI*2);
    const fraction = cycle - Math.floor(cycle);
    const progress = Math.min(1,fraction/.84);
    // Each sweet coasts and then rests for 16% of its own staggered period.
    const theta = (Math.floor(cycle) + progress*progress*(3-2*progress)) * Math.PI*2;
    const rx = geometry.rx + track * 14, ry = geometry.ry - track * 20;
    const x = Math.cos(theta) * rx, y = Math.sin(theta) * ry;
    const depth = (Math.sin(theta)+1)/2;
    element.style.setProperty('--orbit-x', `${geometry.cx+x*Math.cos(rotation)-y*Math.sin(rotation)}px`);
    element.style.setProperty('--orbit-y', `${geometry.cy+x*Math.sin(rotation)+y*Math.cos(rotation)}px`);
    const rocking = element.classList.contains('ring') ? theta*35 : Math.sin(theta)*28+track*17-12;
    element.style.setProperty('--orbit-rotation', `${rocking}deg`);
    element.style.setProperty('--orbit-scale', String(.68+depth*.48));
    element.style.setProperty('--orbit-opacity', String(.62+depth*.38));
    element.style.zIndex = depth > .5 ? '5' : '2';
  });
}
function renderMotion(time) {
  frame = 0;
  // Some emulated/browser preference changes update matches before delivering change.
  if (reducedMotion.matches !== lastMotionPreference) { applyMotionPreference(); return; }
  if (document.hidden) { previousTime = lastRender = 0; return; }
  const dt = Math.min(lastRender ? time-lastRender : 16.7,40);
  lastRender = time;
  const active = !reducedMotion.matches && window.innerWidth >= 768;
  const orbitActive = !reducedMotion.matches && heroVisible && !heroUserPaused && !document.hidden;
  if (orbitActive && previousTime) orbitTime += Math.min(time-previousTime, 40)/1000;
  previousTime = orbitActive ? time : 0;
  if (dirty) {
    dirty = false;
    const rect = world.getBoundingClientRect();
    worldInView = rect.bottom > 0 && rect.top < window.innerHeight;
    worldTarget = active && worldInView ? window.innerHeight/2-rect.top-rect.height/2 : 0;
    world.classList.toggle('is-in-view', active && worldInView);
    header.classList.toggle('scrolled', window.scrollY > 50);
  }
  const damping = 1-Math.exp(-dt/85);
  worldOffset = active ? worldOffset+(worldTarget-worldOffset)*damping : 0;
  const pointerActive = active && !heroUserPaused;
  if (!heroUserPaused) {
    pointerRenderX += ((pointerActive ? pointerX*.7 : 0)-pointerRenderX)*damping;
    pointerRenderY += ((pointerActive ? pointerY*.7 : 0)-pointerRenderY)*damping;
    heroProduct.style.setProperty('--px', `${pointerRenderX.toFixed(3)}px`);
    heroProduct.style.setProperty('--py', `${pointerRenderY.toFixed(3)}px`);
  }
  if (active && worldInView || !active || Math.abs(worldOffset)>.1) {
    depthLayers.forEach(element => {
      const text = element.classList.contains('world-text');
      const limit = text ? 5 : element.classList.contains('world-pack') ? 50 : 70;
      const drift = Math.max(-limit,Math.min(limit,worldOffset*Number(element.dataset.drift)*.48));
      element.style.setProperty('--drift', `${drift}px`);
      element.style.setProperty('--spin', `${active ? Math.max(-6,Math.min(6,worldOffset/1200*Number(element.dataset.spin || 0))) : 0}deg`);
      element.style.setProperty('--depth-scale', String(active && element.classList.contains('world-pack') ? 1+Math.min(.018,Math.abs(worldOffset)/24000) : 1));
    });
  }
  if (heroVisible) drawOrbits();
  const settling = active && (Math.abs(worldTarget-worldOffset)>.15 || (!heroUserPaused && (Math.abs(pointerX*.7-pointerRenderX)>.05 || Math.abs(pointerY*.7-pointerRenderY)>.05)));
  if (orbitActive || settling) frame = requestAnimationFrame(renderMotion);
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
document.addEventListener('visibilitychange', () => { previousTime = lastRender = 0; syncMotionPlayback(); scheduleHero(); requestMotion(); });
function applyMotionPreference() {
  lastMotionPreference = reducedMotion.matches;
  // Finish finite transitions, including paused ones, so reduced motion never hides content.
  document.querySelectorAll('main *').forEach(element => element.getAnimations().forEach(animation => {
    if (animation.effect.getTiming().iterations !== Infinity && animation.playState !== 'finished') animation.finish();
  }));
  syncMotionPlayback();
  if (reducedMotion.matches) { pointerX = pointerY = pointerRenderX = pointerRenderY = worldOffset = worldTarget = 0; }
  updatePauseControl(); scheduleHero(); requestMotion();
}
reducedMotion.addEventListener('change', applyMotionPreference);
classicStage.addEventListener('pointermove', event => {
  if (event.pointerType !== 'mouse' || reducedMotion.matches || window.innerWidth < 768) return;
  const rect = classicStage.getBoundingClientRect();
  document.querySelector('.classic-picture').style.setProperty('--tilt', `${((event.clientX-rect.left)/rect.width-.5)*8}deg`);
});
classicStage.addEventListener('pointerleave', () => document.querySelector('.classic-picture').style.setProperty('--tilt','0deg'));
const ticker = document.querySelector('.ticker');
const tickerPause = document.querySelector('#ticker-pause');
let tickerUserPaused = false;
function updateTickerPause() {
  ticker.classList.toggle('is-user-paused', tickerUserPaused);
  tickerPause.disabled = reducedMotion.matches;
  tickerPause.setAttribute('aria-pressed', String(tickerUserPaused || reducedMotion.matches));
  tickerPause.textContent = reducedMotion.matches ? 'Sem movimento' : tickerUserPaused ? 'Retomar faixa' : 'Pausar faixa';
  tickerPause.setAttribute('aria-label', reducedMotion.matches ? 'Faixa sem movimento: preferência por movimento reduzido ativada' : 'Pausar animação da faixa');
}
tickerPause.addEventListener('click', () => {
  tickerUserPaused = !tickerUserPaused;
  updateTickerPause();
});
reducedMotion.addEventListener('change', updateTickerPause);
tickerPause.hidden = false;
updateTickerPause();
if ('IntersectionObserver' in window) {
  new IntersectionObserver(entries => ticker.classList.toggle('motion-rest', !entries[0].isIntersecting)).observe(ticker);
}
measureOrbit(); updatePauseControl(); requestMotion(); scheduleHero();

// P4-C: describe overflow without changing navigation or animation playback.
const classicIndexList = document.querySelector('.classic-index');
const classicScrollHint = document.querySelector('#classic-scroll-hint');
function updateClassicScrollHint() {
  classicScrollHint.hidden = window.innerWidth >= 768 || classicIndexList.scrollWidth <= classicIndexList.clientWidth + 1;
}
if ('ResizeObserver' in window) new ResizeObserver(updateClassicScrollHint).observe(classicIndexList);
window.addEventListener('resize', updateClassicScrollHint, { passive: true });
document.fonts.ready.then(updateClassicScrollHint);
updateClassicScrollHint();
