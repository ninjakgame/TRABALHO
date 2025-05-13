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

// Mapeamento para a porcentagem de sono
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

const totalImagens = imagens.children.length;
let index = 0;
let allowClick = true;

function mover() {
  const largura = window.innerWidth;
  imagens.style.transition = 'transform 0.5s ease';
  imagens.style.transform = `translateX(${-index * largura}px)`;

}

function resetarPosicao() {
  const totalSlides = imagens.children.length;

  if (index >= totalSlides) index = 0;
  if (index < 0) index = totalSlides - 1;

  imagens.style.transition = 'none';
  imagens.style.transform = `translateX(${-index * window.innerWidth}px)`;
}

window.addEventListener('resize', mover);

direita.addEventListener('click', () => {
  if (!allowClick) return;
  allowClick = false;
  index = (index + 1) % totalImagens;
  mover();
  setTimeout(() => { allowClick = true; }, 500);
});

esquerda.addEventListener('click', () => {
  if (!allowClick) return;
  allowClick = false;
  index = (index - 1 + totalImagens) % totalImagens;
  mover();
  setTimeout(() => { allowClick = true; }, 500);
});

window.addEventListener('resize', mover); // Atualiza ao redimensionar
mover(); // Inicializa


let startX = 0;
let currentX = 0;
let isDragging = false;

imagens.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

imagens.addEventListener('touchmove', e => {
  if (!isDragging) return;
  currentX = e.touches[0].clientX;
});

imagens.addEventListener('touchend', () => {
  const diff = startX - currentX;

  if (Math.abs(diff) > 50) {
    if (diff > 0 && index < imagens.children.length - 1) {
      index++; // deslizou para esquerda
    } else if (diff < 0 && index > 0) {
      index--; // deslizou para direita
    }
    mover();
  }

  isDragging = false;
});




// Criação de ícones com o Lucide
lucide.createIcons();

// Alternar ícone ativo ao clicar na barra de navegação
document.querySelectorAll('.bottom-nav a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelectorAll('.bottom-nav a').forEach(el => el.classList.remove('active'));
    this.classList.add('active');
  });
});
