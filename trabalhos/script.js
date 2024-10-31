const cardArray = [
  '🐶', '🐱', '🐭', '🐹',
  '🐰', '🦊', '🐻', '🐼',
  '🐶', '🐱', '🐭', '🐹',
  '🐰', '🦊', '🐻', '🐼'
];

const gameContainer = document.getElementById('game-container');
let cardChosen = [];
let cardChosenId = [];
let cardsWon = [];

function createBoard() {
  cardArray.sort(() => 0.5 - Math.random());
  for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');
      card.setAttribute('data-id', i);
      card.addEventListener('click', flipCard);
      gameContainer.appendChild(card);
  }
}

function flipCard() {
  const selected = this;
  const cardId = selected.getAttribute('data-id');
  selected.textContent = cardArray[cardId];
  selected.classList.add('flipped');

  cardChosen.push(cardArray[cardId]);
  cardChosenId.push(cardId);

  if (cardChosen.length === 2) {
      setTimeout(checkMatch, 500);
  }
}

function checkMatch() {
  const cards = document.querySelectorAll('.card');
  const [firstCard, secondCard] = cardChosenId;

  if (cardChosen[0] === cardChosen[1]) {
      cards[firstCard].removeEventListener('click', flipCard);
      cards[secondCard].removeEventListener('click', flipCard);
      cardsWon.push(cardChosen);
      document.getElementById('success').play();
  } else {
      cards[firstCard].textContent = '';
      cards[secondCard].textContent = '';
      cards[firstCard].classList.remove('flipped');
      cards[secondCard].classList.remove('flipped');
      document.getElementById('fail-sound').play();
  }

  cardChosen = [];
  cardChosenId = [];

  if (cardsWon.length === cardArray.length / 2) {
      alert('Você ganhou!');
  }
}

createBoard();
