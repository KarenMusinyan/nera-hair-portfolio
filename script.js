const hero = document.querySelector('.hero-img');
const story = document.querySelector('.transformation');
const sticky = document.querySelector('.story-sticky');
const progressBar = document.createElement('div');
progressBar.className = 'page-progress';
progressBar.innerHTML = '<span></span>';
document.body.prepend(progressBar);

function clamp(value) { return Math.max(0, Math.min(1, value)); }

function animateOnScroll() {
  const maxScroll = document.documentElement.scrollHeight - innerHeight;
  document.documentElement.style.setProperty('--page-progress', (scrollY / maxScroll).toFixed(4));

  document.querySelectorAll('main > section').forEach(section => {
    const rect = section.getBoundingClientRect();
    const progress = clamp((innerHeight - rect.top) / (innerHeight + rect.height * .72));
    section.style.setProperty('--p', progress.toFixed(4));
  });

  const distance = story.offsetHeight - innerHeight;
  const storyProgress = clamp(-story.getBoundingClientRect().top / distance);
  sticky.style.setProperty('--story-progress', storyProgress.toFixed(4));
  sticky.style.setProperty('--story-enter', clamp(storyProgress * 5).toFixed(3));
  sticky.style.setProperty('--story-cut', clamp(1 - Math.abs(storyProgress - .5) * 3.5).toFixed(3));
}

addEventListener('scroll', animateOnScroll, { passive: true });
addEventListener('resize', animateOnScroll);
animateOnScroll();

document.querySelector('#booking-form').addEventListener('submit', event => {
  event.preventDefault();
  event.currentTarget.querySelector('output').textContent = 'Спасибо! Я свяжусь с вами в ближайшее время.';
  event.currentTarget.reset();
});
