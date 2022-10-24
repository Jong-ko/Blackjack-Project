const dealerHand = document.getElementById("dealer-hand");
const playerHand = document.getElementById("player-hand");
const dealerCards = [];
const playerCards = [];
let dealerPoints = 0;
let playerPoints = 0;
const deck = [];
const suits = ["hearts", "spades", "clubs", "diamonds"];
const ranks = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];
const makeDeck = (rank, suit) => {
  const card = {
    rank: rank,
    suit: suit,
    pointValue: rank > 10 ? 10 : rank,
  };
  deck.push(card);
};

for (let suit of suits) {
  for (const rank of ranks) {
    makeDeck(rank, suit);
  }
}
for (let i = 0; i < deck.length; i++) {
  if (
    deck[i].pointValue == "king" ||
    deck[i].pointValue == "queen" ||
    deck[i].pointValue == "jack"
  ) {
    deck[i].pointValue = 10;
  } else if (deck[i].pointValue == "ace") {
    deck[i].pointValue = 1;
  }
}
// console.log(deck)
window.addEventListener("DOMContentLoaded", () => {
  // Execute after page load
});

function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
}

shuffleDeck();
const addDeck = document.querySelector("#add-deck");
addDeck.addEventListener("click", (e) => {
  console.log("add deck");
});

const dealButton = document.querySelector("#deal-button");
dealButton.addEventListener("click", (e) => {
  for (let i = 0; i < 4; i++) {
    if (i % 2 == 1) {
      let nextCard = deck.pop();
      dealerCards.push(nextCard);
      let img = document.createElement("img");
      img.src = "./images/" + nextCard.rank + "_of_" + nextCard.suit + ".png";
      let src = document.getElementById("dealer-hand");
      src.appendChild(img);
      dealerPoints += nextCard.pointValue;
      console.log("dealer " + dealerPoints);
      document.getElementById("dealer-points").innerHTML = dealerPoints;
      if (dealerPoints > 21) {
        document.getElementById("messages").innerHTML = "bust";
      }
    } else {
      let nextCard = deck.pop();
      playerCards.push(nextCard);
      let img = document.createElement("img");
      img.src = "./images/" + nextCard.rank + "_of_" + nextCard.suit + ".png";
      let src = document.getElementById("player-hand");
      src.appendChild(img);
      playerPoints += nextCard.pointValue;
      console.log("player " + playerPoints);
      document.getElementById("player-points").innerHTML = playerPoints;
      if (playerPoints > 21) {
        document.getElementById("messages").innerHTML = "bust";
      }
    }
  }
  document.querySelector("#deal-button").disabled = true;
});

const hitButton = document.querySelector("#hit-button");
function beenClicked() {
  let nextCard = deck.pop();
  playerCards.push(nextCard);
  let img = document.createElement("img");
  img.src = "./images/" + nextCard.rank + "_of_" + nextCard.suit + ".png";
  let src = document.getElementById("player-hand");
  src.appendChild(img);
  playerPoints += nextCard.pointValue;
  console.log("player " + playerPoints);
  document.getElementById("player-points").innerHTML = playerPoints;
  if (playerPoints > 21) {
    document.getElementById("messages").innerHTML = "bust";
  }
}

hitButton.onclick = beenClicked;

const standButton = document.querySelector("#stand-button");
standButton.addEventListener("click", (e) => {
  for (let i = dealerPoints; i < 17; i = dealerPoints) {
    let nextCard = deck.pop();
    dealerCards.push(nextCard);
    let img = document.createElement("img");
    img.src = "./images/" + nextCard.rank + "_of_" + nextCard.suit + ".png";
    let src = document.getElementById("dealer-hand");
    src.appendChild(img);
    dealerPoints += nextCard.pointValue;
    console.log("dealer " + dealerPoints);
    document.getElementById("dealer-points").innerHTML = dealerPoints;
    if (dealerPoints > 21) {
      document.getElementById("messages").innerHTML = "bust";
    }
  }
  if (dealerPoints > playerPoints && dealerPoints <= 21) {
    document.getElementById("messages").innerHTML = "dealer wins";
  } else if (dealerPoints == playerPoints) {
    document.getElementById("messages").innerHTML = "draw";
  } else {
    document.getElementById("messages").innerHTML = "player wins";
  }
  document.querySelector("#stand-button").disabled = true;
  document.querySelector("#hit-button").disabled = true;
});
