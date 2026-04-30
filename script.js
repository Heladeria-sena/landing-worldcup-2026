const menuToggle = document.querySelector('#menuToggle');
const navLinks = document.querySelector('#navLinks');
const countdown = document.querySelector('#countdown');
const newsletterForm = document.querySelector('#newsletterForm');
const formMessage = document.querySelector('#formMessage');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  document.body.classList.toggle('menu-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

function updateCountdown() {
  const openingMatch = new Date('2026-06-11T00:00:00');
  const now = new Date();
  const diff = openingMatch - now;

  if (diff <= 0) {
    countdown.textContent = 'Ya empezo';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  countdown.textContent = `${days} dias`;
}

updateCountdown();
setInterval(updateCountdown, 1000 * 60 * 60);

newsletterForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.querySelector('#email').value.trim();

  formMessage.textContent = `Listo. Enviaremos novedades a ${email}.`;
  newsletterForm.reset();
});
