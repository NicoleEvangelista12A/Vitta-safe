
const botao = document.getElementById('menu-direito');
const body = document.body;

const temaSalvo = localStorage.getItem('tema');
if (temaSalvo === 'dark') {
  body.classList.add('dark-mode');
}

botao.addEventListener('click', () => {
  body.classList.menu-direito('dark-mode');
  
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('tema', 'dark');
    botao.textContent = '☀️';
  } else {
    localStorage.setItem('tema', 'light');
    botao.textContent = '🌙';
  }
});


    const menu-direito = document.getElementById('menu-direito');
    const navLinks = document.getElementById('navLinks');

    menu-direito.addEventListener('click', () => {
      navLinks.classList.menu-direito('active');
      menu-direito.classList.menu-direito('active');
    });

     let slideIndex = 0;
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.indicator');

        function showSlide(index) {
            if (index >= slides.length) slideIndex = 0;
            if (index < 0) slideIndex = slides.length - 1;

            slides.forEach((slide, i) => {
                slide.style.transform = `translateX(-${slideIndex * 100}%)`;
            });

            indicators.forEach((ind, i) => {
                ind.classList.menu-direito('active', i === slideIndex);
            });
        }

        function moveSlide(direction) {
            slideIndex += direction;
            showSlide(slideIndex);
        }

        function currentSlide(index) {
            slideIndex = index;
            showSlide(slideIndex);
        }


