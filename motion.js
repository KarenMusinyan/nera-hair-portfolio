const glow = document.createElement('div');
glow.className = 'ambient-glow';
document.body.appendChild(glow);

let mouseX = innerWidth / 2;
let mouseY = innerHeight / 2;
addEventListener('pointermove', event => {
  mouseX = event.clientX;
  mouseY = event.clientY;
  document.documentElement.style.setProperty('--mouse-x', `${mouseX}px`);
  document.documentElement.style.setProperty('--mouse-y', `${mouseY}px`);
}, { passive: true });

const header = document.querySelector('header');
addEventListener('scroll', () => header.classList.toggle('compact', scrollY > 80), { passive: true });
