const hero = document.querySelector('.hero-img');
const story = document.querySelector('.transformation');
const sticky = document.querySelector('.story-sticky');
const progressBar = document.createElement('div');
progressBar.className = 'page-progress';
progressBar.innerHTML = '<span></span>';
document.body.prepend(progressBar);

function clamp(value) { return Math.max(0, Math.min(1, value)); }

function animateOnScroll() {
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - innerHeight);
  document.documentElement.style.setProperty('--page-progress', (scrollY / maxScroll).toFixed(4));

  document.querySelectorAll('main > section').forEach(section => {
    const rect = section.getBoundingClientRect();
    const progress = clamp((innerHeight - rect.top) / (innerHeight + rect.height * .72));
    section.style.setProperty('--p', progress.toFixed(4));
  });

  const distance = Math.max(1, story.offsetHeight - innerHeight);
  const storyProgress = clamp(-story.getBoundingClientRect().top / distance);
  sticky.style.setProperty('--story-progress', storyProgress.toFixed(4));
  sticky.style.setProperty('--story-enter', clamp(storyProgress * 5).toFixed(3));
  sticky.style.setProperty('--story-cut', clamp(1 - Math.abs(storyProgress - .5) * 3.5).toFixed(3));
}

let scrollScheduled = false;
addEventListener('scroll', () => {
  if (scrollScheduled) return;
  scrollScheduled = true;
  requestAnimationFrame(() => { animateOnScroll(); scrollScheduled = false; });
}, { passive: true });
addEventListener('resize', animateOnScroll);
animateOnScroll();

document.querySelector('#booking-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const fields = new FormData(form);
  const name = String(fields.get('name') || '').trim();
  const contact = String(fields.get('contact') || '').trim();
  const output = form.querySelector('output');
  if (name.length < 2 || contact.length < 5) {
    output.textContent = 'Укажите имя от 2 символов и вымышленный контакт от 5 символов.';
    output.focus();
    return;
  }
  output.textContent = name + ', форма заполнена: ' + fields.get('service') + '. Это демонстрация — заявка никуда не отправлена. Данные очищены.';
  form.reset();
  output.focus();
});
