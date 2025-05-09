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

    const element = document.getElementById("sleepPercentage");
    const opcoes = document.querySelectorAll(".opcao");

    const mapeamento = {
      excelente: 95,
      bom: 80,
      medio: 65,
      ruim: 45,
      horrivel: 20
    };

    function animarPorcentagem(target, duration = 1500) {
      let start = null;

      function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(Math.round((progress / duration) * target), target);
        element.textContent = `${percentage}%`;
        if (percentage < target) {
          requestAnimationFrame(animate);
        }
      }

      requestAnimationFrame(animate);
    }

    opcoes.forEach(opcao => {
      opcao.addEventListener("click", () => {
        opcoes.forEach(o => o.classList.remove("selecionado"));
        opcao.classList.add("selecionado");

        const qualidade = opcao.getAttribute("data-valor");
        const valor = mapeamento[qualidade];

        if (valor !== undefined) {
          animarPorcentagem(valor);
        }
      });
    });

    const imagens = document.getElementById('imagens');
    const esquerda = document.querySelector('.seta.esquerda');
    const direita = document.querySelector('.seta.direita');
    const largura = 800;

    let index = 0;
    let allowClick = true;

    function mover() {
      imagens.style.transition = 'transform 0.5s ease';
      imagens.style.transform = `translateX(${-index * largura}px)`;
    }

    function resetarPosicao() {
      if (index === 3) {
        // Se chegar na última imagem, volta para a primeira
        index = 0;
        imagens.style.transition = 'none'; // Sem transição
        imagens.style.transform = `translateX(${-index * largura}px)`;
      } else if (index < 0) {
        // Se tentar ir antes da primeira, vai para a última
        index = 2;
        imagens.style.transition = 'none'; // Sem transição
        imagens.style.transform = `translateX(${-index * largura}px)`;
      }
    }

    direita.addEventListener('click', () => {
      if (!allowClick) return;
      allowClick = false;
      index++;
      mover();
      setTimeout(() => { allowClick = true; }, 500); // Libera clique após animação
    });

    esquerda.addEventListener('click', () => {
      if (!allowClick) return;
      allowClick = false;
      index--;
      mover();
      setTimeout(() => { allowClick = true; }, 500); // Libera clique após animação
    });

    imagens.addEventListener('transitionend', resetarPosicao);

    // Inicializa na primeira imagem
    mover();