const worksSection = document.querySelector('.works');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const workCards = [...document.querySelectorAll('.works figure')];

function updatePortfolioMotion() {
  const rect = worksSection.getBoundingClientRect();
  const scrollRange = Math.max(1, rect.height - innerHeight);
  const progress = Math.max(0, Math.min(1, -rect.top / scrollRange));
  const stage = progress * Math.max(1, workCards.length - 1);
  worksSection.style.setProperty('--works-progress', progress.toFixed(4));
  workCards.forEach((card, index) => {
    const distance = index - stage;
    const visibility = Math.max(0, 1 - Math.min(1, Math.abs(distance)));
    const easedVisibility = 1 - Math.pow(1 - visibility, 2);
    const slide = Math.max(-1.25, Math.min(1.25, distance));
    card.style.setProperty('--card', easedVisibility.toFixed(4));
    card.style.setProperty('--slide', slide.toFixed(4));
    card.style.zIndex = String(10 - Math.round(Math.abs(distance) * 2));
    const isActive = index === Math.round(stage);
    card.classList.toggle('is-active', isActive);
    card.removeAttribute('aria-hidden');
  });
}

addEventListener('scroll', updatePortfolioMotion, { passive: true });
addEventListener('resize', updatePortfolioMotion);
updatePortfolioMotion();
