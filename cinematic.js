const cinematicSections = [...document.querySelectorAll('main > section')].filter(section => !section.classList.contains('ticker'));
const cinematicWash = document.createElement('div');
cinematicWash.className = 'cinematic-wash';
document.body.appendChild(cinematicWash);

const chapterNav = document.createElement('nav');
chapterNav.className = 'chapter-nav';
chapterNav.setAttribute('aria-label', 'Навигация по странице');
const chapterNames = ['Начало', 'Преображение', 'Подход', 'Работы', 'Философия', 'Запись'];
cinematicSections.forEach((section, index) => {
  const flash = document.createElement('span');
  flash.className = 'section-flash';
  section.appendChild(flash);
  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('aria-label', chapterNames[index] || `Раздел ${index + 1}`);
  button.innerHTML = `<span>${String(index + 1).padStart(2, '0')} ${chapterNames[index] || ''}</span>`;
  button.addEventListener('click', () => section.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  chapterNav.appendChild(button);
});
document.body.appendChild(chapterNav);
const chapterButtons = [...chapterNav.querySelectorAll('button')];
const cinematicCards = [...document.querySelectorAll('.works figure')];
let cinematicTicking = false;

function cinematicUpdate() {
  let closestIndex = 0;
  let closestDistance = Infinity;
  cinematicSections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    const enter = Math.max(0, Math.min(1, (innerHeight - rect.top) / (innerHeight * 1.08)));
    const centerDistance = Math.abs(rect.top + rect.height / 2 - innerHeight / 2);
    const focus = Math.max(0, Math.min(1, 1 - centerDistance / Math.max(innerHeight, rect.height * .72)));
    section.style.setProperty('--enter', enter.toFixed(4));
    section.style.setProperty('--focus', focus.toFixed(4));
    if (centerDistance < closestDistance) { closestDistance = centerDistance; closestIndex = index; }
  });
  chapterButtons.forEach((button, index) => button.classList.toggle('active', index === closestIndex));
  document.documentElement.style.setProperty('--wash-y', String((scrollY * .22) % (innerHeight * 1.35)));

  const worksRect = worksSection.getBoundingClientRect();
  const worksVisible = worksRect.bottom > 0 && worksRect.top < innerHeight;
  worksSection.classList.toggle('cards-focused', worksVisible);
  cinematicTicking = false;
}

function requestCinematicUpdate() {
  if (!cinematicTicking) { cinematicTicking = true; requestAnimationFrame(cinematicUpdate); }
}

cinematicCards.forEach(card => {
  card.addEventListener('pointermove', event => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--tilt-x', (((event.clientX - rect.left) / rect.width) - .5) * 5);
    card.style.setProperty('--tilt-y', (((event.clientY - rect.top) / rect.height) - .5) * 5);
  });
  card.addEventListener('pointerleave', () => {
    card.style.setProperty('--tilt-x', 0);
    card.style.setProperty('--tilt-y', 0);
  });
});

addEventListener('scroll', requestCinematicUpdate, { passive: true });
addEventListener('resize', requestCinematicUpdate);
cinematicUpdate();
