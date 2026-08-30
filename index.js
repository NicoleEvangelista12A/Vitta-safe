const botaoTema = document.getElementById('botao-tema');
const body = document.body;

const temaSalvo = localStorage.getItem('tema');
if (temaSalvo === 'light') {
  body.classList.add('light-mode');
  if (botaoTema) botaoTema.textContent = '☀️'; 
} else {
  body.classList.remove('light-mode');
  if (botaoTema) botaoTema.textContent = '🌙'; 
}

if (botaoTema) {
  botaoTema.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
      localStorage.setItem('tema', 'light');
      botaoTema.textContent = '☀️'; 
    } else {
      localStorage.setItem('tema', 'dark');
      botaoTema.textContent = '🌙'; 
    }
  });
}

//Responsivo
const menuToggle = document.getElementById('menu-direito') || document.querySelector('.menu');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });
}