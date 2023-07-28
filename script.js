const cardsContainer = document.getElementById("cards");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;
document.getElementById("score").textContent = score;
fetch("./data/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    shufflecards();
    generatecards();
    console.log(cards);
  });

function shufflecards() {
  let currentindex = cards.length;
  let randomindex;
  let tempvalue;
  while (currentindex !== 0) {
    randomindex = Math.floor(Math.random() * currentindex);
    currentindex--;
    tempvalue = cards[currentindex];
    cards[currentindex] = cards[randomindex];
    cards[randomindex] = tempvalue;
  }
}
function generatecards() {
  for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `<div class="front">
        <img class="front-image"src=${card.image}>
    </div>
    <div class="back"></div>`;
    cardElement.addEventListener("click", flipcard);
    cardElement.addEventListener("touch", flipcard);
    cardsContainer.appendChild(cardElement);
  }
}

function flipcard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }
  secondCard = this;
  lockBoard = true;

  checkForMatch();
}
function checkForMatch() {
  let ismatch = firstCard.dataset.name === secondCard.dataset.name;
  if (ismatch)
    // true or false
    disablecards(); // true
  else unflipcards(); // false
}
function disablecards() {
  firstCard.removeEventListener("click", flipcard);
  secondCard.removeEventListener("click", flipcard);
  firstCard.removeEventListener("touch", flipcard);
  secondCard.removeEventListener("touch", flipcard);
  score++;
  document.getElementById("score").textContent = score;
  unlockBoard();
}
function unflipcards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    unlockBoard();
  }, 1000);
}
function unlockBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}
function restart() {
  cardsContainer.innerHTML = "";
  shufflecards();
  generatecards();
  score = 0;
  document.getElementById("score").textContent = score;
  lockBoard = false;
}
