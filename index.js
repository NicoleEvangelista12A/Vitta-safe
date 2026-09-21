let currentSlide = 0;

function updateThemeButton(button) {
  if (!button) {
    return;
  }

  const isLight = document.body.classList.contains('light-mode');

  button.textContent = isLight ? '🌙' : '☀️';

  button.setAttribute(
    'aria-label',
    isLight
      ? 'Ativar modo escuro'
      : 'Ativar modo claro'
  );

  button.setAttribute(
    'title',
    isLight
      ? 'Modo escuro'
      : 'Modo claro'
  );
}

function setupTheme() {
  let button = document.getElementById('botao-tema');

  if (!button) {
    button = document.createElement('button');
    button.id = 'botao-tema';
    button.type = 'button';
    document.body.appendChild(button);
  }

  const savedTheme = localStorage.getItem('tema');

  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
  } else {
    document.body.classList.remove('light-mode');
  }

  updateThemeButton(button);

  if (button.dataset.themeReady) {
    return;
  }

  button.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');

    const theme =
      document.body.classList.contains('light-mode')
        ? 'light'
        : 'dark';

    localStorage.setItem('tema', theme);

    updateThemeButton(button);
  });

  button.dataset.themeReady = 'true';
}

function setupMobileMenu() {
  const navbar = document.querySelector('.navbar');

  if (!navbar) {
    return;
  }

  const nav = navbar.querySelector('nav');
  const links = navbar.querySelector('.nav-links');

  if (!nav || !links) {
    return;
  }

  let button = navbar.querySelector(
    '.mobile-menu-button, .menu'
  );

  if (!button) {
    button = document.createElement('button');

    button.className = 'mobile-menu-button';

    button.type = 'button';

    button.innerHTML =
      '<span></span><span></span><span></span>';

    navbar.insertBefore(button, nav);
  }

  button.setAttribute(
    'aria-expanded',
    'false'
  );

  button.setAttribute(
    'aria-label',
    'Abrir menu'
  );

  if (button.dataset.menuReady) {
    return;
  }

  button.addEventListener('click', event => {
    event.stopPropagation();

    const isOpen =
      nav.classList.toggle('open');

    button.classList.toggle(
      'active',
      isOpen
    );

    button.setAttribute(
      'aria-expanded',
      String(isOpen)
    );

    button.setAttribute(
      'aria-label',
      isOpen
        ? 'Fechar menu'
        : 'Abrir menu'
    );
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');

      button.classList.remove('active');

      button.setAttribute(
        'aria-expanded',
        'false'
      );

      button.setAttribute(
        'aria-label',
        'Abrir menu'
      );
    });
  });

  document.addEventListener('click', event => {
    if (!navbar.contains(event.target)) {
      nav.classList.remove('open');

      button.classList.remove('active');

      button.setAttribute(
        'aria-expanded',
        'false'
      );

      button.setAttribute(
        'aria-label',
        'Abrir menu'
      );
    }
  });

  button.dataset.menuReady = 'true';
}

function setupCarousel() {
  const track =
    document.getElementById('carouselTrack') ||
    document.querySelector('.carousel-track');

  const slides =
    document.querySelectorAll('.carousel-slide');

  const indicators =
    document.querySelectorAll('.indicator');

  const prevButton =
    document.getElementById('prevBtn');

  const nextButton =
    document.getElementById('nextBtn');

  if (!track || slides.length === 0) {
    return;
  }

  function showSlide(index) {
    currentSlide =
      (index + slides.length) % slides.length;

    track.style.transform =
      `translateX(-${currentSlide * 100}%)`;

    indicators.forEach((indicator, i) => {
      indicator.classList.toggle(
        'active',
        i === currentSlide
      );
    });
  }

  prevButton?.addEventListener('click', () => {
    showSlide(currentSlide - 1);
  });

  nextButton?.addEventListener('click', () => {
    showSlide(currentSlide + 1);
  });

  indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
      const index =
        Number(indicator.dataset.index);

      if (!Number.isNaN(index)) {
        showSlide(index);
      }
    });
  });

  showSlide(0);
}

function setupForms() {
  const form = document.querySelector('form');

  if (!form) {
    return;
  }

  const title =
    document.querySelector('.form-header h1')
      ?.textContent
      ?.trim()
      .toUpperCase();

  const isCadastro =
    title?.includes('CRIE SUA CONTA');

  const isLogin =
    title?.includes('FAÇA SEU LOGIN');

  if (isCadastro) {
    form.addEventListener('submit', event => {
      event.preventDefault();

      const inputs =
        form.querySelectorAll('input');

      const nome =
        inputs[0]?.value.trim();

      const email =
        inputs[1]?.value
          .trim()
          .toLowerCase();

      const senha =
        inputs[2]?.value;

      const confirmar =
        inputs[3]?.value;

      if (
        !nome ||
        !email ||
        !senha ||
        !confirmar
      ) {
        alert(
          'Preencha todos os campos.'
        );

        return;
      }

      if (senha !== confirmar) {
        alert(
          'As senhas não coincidem.'
        );

        return;
      }

      localStorage.setItem(
        'vittaSafeUser',
        JSON.stringify({
          nome,
          email,
          senha
        })
      );

      alert(
        'Cadastro realizado! Agora você pode fazer login.'
      );

      window.location.href =
        'login.html';
    });
  }

  if (isLogin) {
    form.addEventListener('submit', event => {
      const user =
        JSON.parse(
          localStorage.getItem(
            'vittaSafeUser'
          ) || 'null'
        );

      if (!user) {
        event.preventDefault();

        alert(
          'Nenhuma conta cadastrada neste dispositivo. Faça seu cadastro primeiro.'
        );

        return;
      }

      const email =
        form
          .querySelector(
            'input[type="email"]'
          )
          ?.value
          .trim()
          .toLowerCase();

      const senha =
        form
          .querySelector(
            'input[type="password"]'
          )
          ?.value;

      if (
        email !== user.email ||
        senha !== user.senha
      ) {
        event.preventDefault();

        alert(
          'E-mail ou senha incorretos.'
        );
      }
    });
  }
}

document.addEventListener(
  'DOMContentLoaded',
  () => {
    setupTheme();
    setupMobileMenu();
    setupCarousel();
    setupForms();
  }
);