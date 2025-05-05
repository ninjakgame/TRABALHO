const sol = document.getElementById('sol');
    const lua = document.getElementById('lua');
    const body = document.body;
    const orbitaContainer = document.getElementById('orbita-container');
    const mensagemFinal = document.getElementById('mensagem-final');
    const terraDia = document.getElementById('terra-dia');
    const terraNoite = document.getElementById('terra-noite');

    sol.classList.add('girar');

    sol.addEventListener('animationend', () => {

      body.style.backgroundColor = '#0b1a35';

      terraDia.classList.remove('visivel');
      terraNoite.classList.add('visivel');

      sol.classList.remove('girar', 'visivel');
      lua.classList.add('girar', 'visivel');
    });

    lua.addEventListener('animationend', () => {
      lua.classList.remove('girar');

      orbitaContainer.style.display = 'none';
      mensagemFinal.style.display = 'block';

      body.style.backgroundColor = '#4b0082';
    });