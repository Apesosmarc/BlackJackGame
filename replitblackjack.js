// https://replit.com/@Apesosmarc/bjgame#index.js

// THIS CODE RUNS BEST IN BROWSER ON REPLIT COPY AND PASTE ABOVE LINK

let value = [
  [2, 2, 2, 2],
  [3, 3, 3, 3],
  [4, 4, 4, 4],
  [5, 5, 5, 5],
  [6, 6, 6, 6],
  [7, 7, 7, 7],
  [8, 8, 8, 8],
  [9, 9, 9, 9],
  [10, 10, 10, 10],
  ["J", "J", "J", "J"],
  ["Q", "Q", "Q", "Q"],
  ["K", "K", "K", "K"],
  ["A", "A", "A", "A"],
];

let suit = [
  [
    "clubs",
    "clubs",
    "clubs",
    "clubs",
    "clubs",
    "clubs",
    "clubs",
    "clubs",
    "clubs",
    "clubs",
    "clubs",
    "clubs",
    "clubs",
  ],
  [
    "spades",
    "spades",
    "spades",
    "spades",
    "spades",
    "spades",
    "spades",
    "spades",
    "spades",
    "spades",
    "spades",
    "spades",
    "spades",
  ],
  [
    "hearts",
    "hearts",
    "hearts",
    "hearts",
    "hearts",
    "hearts",
    "hearts",
    "hearts",
    "hearts",
    "hearts",
    "hearts",
    "hearts",
    "hearts",
  ],
  [
    "diamonds",
    "diamonds",
    "diamonds",
    "diamonds",
    "diamonds",
    "diamonds",
    "diamonds",
    "diamonds",
    "diamonds",
    "diamonds",
    "diamonds",
    "diamonds",
    "diamonds",
  ],
];
function welcome() {
  console.log("Welcome to the table!");

  deal();
}

welcome();

function playAgain() {
  let userPrompt = prompt("Play again? Y/N").toLowerCase();
  console.log(userPrompt);
  if (userPrompt === "y") {
    deal();
  } else {
    process.exit();
  }
}
function pick(arr) {
  let idx = Math.floor(Math.random() * arr.length);
  const cardIdx = Math.floor(Math.random() * arr[idx].length);
  let counter = 0;
  while (arr[idx][cardIdx] === undefined) {
    idx = Math.floor(Math.random() * arr.length);
    counter++;
    if (counter === 52) {
      alert("You're out of cards m8");
      break;
    }
  }
  const card = arr[idx][cardIdx];
  let removedCards = arr[idx].shift();
  return card;
}

function firstHand() {
  let pickValue = pick(value);
  let suitValue = pick(suit);
  let bjValue = 0;
  if (pickValue === "A") {
    bjValue += 11;
  } else if (pickValue === "J" || pickValue === "K" || pickValue === "Q") {
    bjValue += 10;
  } else {
    bjValue += pickValue;
  }
  console.log(`${pickValue} of ${suitValue} value of ${bjValue}`);
}

function deal() {
  let dealerTally = 0;
  let playerTally = 0;

  function dCardPick() {
    let pickValue = pick(value);
    let suitValue = pick(suit);
    let bjValue = 0;

    if (pickValue === "A") {
      bjValue += 11;
    } else if (pickValue === "J" || pickValue === "K" || pickValue === "Q") {
      bjValue += 10;
    } else {
      bjValue += pickValue;
    }
    console.log(`${pickValue} of ${suitValue}`);

    dealerTally += bjValue;
    if (dealerTally >= 22) {
      console.log(`Dealer total ${dealerTally}. Dealer busts you win!`);
      playAgain();
    } else if (dealerTally === 21 && playerTally != 0) {
      console.log("Dealer blackjack you lose!");
      playAgain();
    }
  }

  function pCardPick() {
    let pickValue = pick(value);
    let suitValue = pick(suit);
    let bjValue = 0;

    if (pickValue === "A") {
      bjValue += 11;
    } else if (pickValue === "J" || pickValue === "K" || pickValue === "Q") {
      bjValue += 10;
    } else {
      bjValue += pickValue;
    }
    playerTally += bjValue;
    console.log(`${pickValue} of ${suitValue}`);

    if (playerTally >= 22) {
      alert(`Your total is ${playerTally} you lose!`);
      playAgain();
    } else if (playerTally === 21) {
      alert("BlackJack You Win!");
      playAgain();
    }
  }

  function userPrompt() {
    if (playerTally <= 21 && dealerTally < 21) {
      let userPrompt = prompt(
        `Your total is ${playerTally}. Would you like to hit or stay?`
      ).toLowerCase();
      if (userPrompt === "hit") {
        return pCardPick();
      } else {
        console.log("dealer hits...");
        console.log(dCardPick());
        console.log(`Dealer total is ${dealerTally}`);
        if (dealerTally === playerTally) {
          console.log("it's a draw!");
          playAgain();
        } else if (dealerTally > playerTally) {
          console.log("better luck next time!");
          playAgain();
        } else if (dealerTally < playerTally) {
          console.log("dealer hits...");
          console.log(dCardPick());
          console.log(`Dealer total is ${dealerTally}`);
        }
      }
    }
  }

  console.log(`DEALER'S HAND:`);
  dCardPick();
  dCardPick();
  console.log(`Dealer total: ${dealerTally}`);
  pCardPick();
  pCardPick();
  console.log(`Player total: ${playerTally}`);
  while (playerTally < 21) {
    userPrompt();
  }
}