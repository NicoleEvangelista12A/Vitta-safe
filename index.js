let currentSlide = 0;

  function updateCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!track || slides.length === 0) return;

    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    indicators.forEach((ind, index) => {
      if (index === currentSlide) {
        ind.classList.add('active');
      } else {
        ind.classList.remove('active');
      }
    });
  }

  function moveSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    currentSlide += direction;

    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    } else if (currentSlide >= slides.length) {
      currentSlide = 0;
    }

    updateCarousel();
  }

  function currentSlideTo(index) {
    currentSlide = index;
    updateCarousel();
  }

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

document.addEventListener("DOMContentLoaded", function() {
            let slideIndex = 0;
            const track = document.getElementById('carouselTrack');
            const slides = document.querySelectorAll('.carousel-slide');
            const indicators = document.querySelectorAll('.indicator');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');

            function showSlide(index) {
                if (!track || slides.length === 0) return;

                if (index >= slides.length) {
                    slideIndex = 0;
                } else if (index < 0) {
                    slideIndex = slides.length - 1;
                } else {
                    slideIndex = index;
                }

                track.style.transform = `translateX(-${slideIndex * 100}%)`;

                indicators.forEach((ind, i) => {
                    if (i === slideIndex) {
                        ind.classList.add('active');
                    } else {
                        ind.classList.remove('active');
                    }
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', () => showSlide(slideIndex + 1));
            }

            if (prevBtn) {
                prevBtn.addEventListener('click', () => showSlide(slideIndex - 1));
            }

            indicators.forEach((ind) => {
                ind.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    showSlide(index);
                });
            });
        });