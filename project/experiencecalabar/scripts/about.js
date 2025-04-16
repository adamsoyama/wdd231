
const toggleButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

toggleButton.addEventListener('click', () => {
  nav.classList.toggle('active');
  toggleButton.classList.toggle('open');

  const expanded = toggleButton.getAttribute('aria-expanded') === 'true';
  toggleButton.setAttribute('aria-expanded', !expanded);
});