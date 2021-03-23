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
      alert("You're out of cards m8 refresh to continue");
      throw new Error("");
    }
  }
  const card = arr[idx][cardIdx];
  let removedCards = arr[idx].shift();
  return card;
}

function deal() {
  let playerHand = [];
  let dealerHand = [];
  let dealerTally = 0;
  let playerTally = 0;

  function tallyHand(hand) {
    let sum = 0;
    let hasAce = false;

    for (let card of hand) {
      if (card === "A") {
        hasAce = true;
        sum += 11;
      } else if (card === "J" || card === "K" || card === "Q") {
        sum += 10;
      } else {
        sum += card;
      }
    }
    for (let card of hand) {
      if (card === "A" && sum > 21) {
        sum -= 10;
      }
    }
    return sum;
  }

  function dCardPick() {
    let card = pick(value);
    let suitValue = pick(suit);
    dealerHand.push(card);
    console.log(`${card} of ${suitValue}`);
    let currTally = tallyHand(dealerHand);

    if (dealerHand.length > 1) {
      console.log(`Dealer Total: ${currTally}`);
    }
    if (currTally >= 22) {
      console.log(`Dealer total ${currTally}. Dealer busts you win!`);
      playAgain();
    } else if (currTally === 21 && playerHand.length === 0) {
      console.log("Dealer blackjack you lose!");
      playAgain();
    }
    return currTally;
  }

  function pCardPick() {
    let card = pick(value);
    let suitValue = pick(suit);

    playerHand.push(card);
    console.log(`${card} of ${suitValue}`);
    let currTally = tallyHand(playerHand);

    if (playerHand.length > 1) {
      console.log(`Player Total: ${currTally}`);
    }

    if (currTally >= 22) {
      console.log(`Your total is ${currTally} you lose!`);
      playAgain();
    } else if (currTally === 21) {
      console.log("BlackJack You Win!");
      playAgain();
    }
    return currTally;
  }

  function userPrompt() {
    if (playerTally <= 21 && dealerTally < 21) {
      let userPrompt = prompt(`Would you like to hit or stay?`).toLowerCase();
      if (userPrompt === "stay" && playerTally < dealerTally) {
        console.log("Dealer wins!");
        playAgain();
      }
      if (userPrompt === "hit") {
        playerTally = pCardPick();
      } else {
        while (dealerTally < 21) {
          console.log("dealer hits...");
          dealerTally = dCardPick();

          if (dealerTally === playerTally && dealerTally === 21) {
            console.log("it's a draw!");
            playAgain();
          } else if (dealerTally > playerTally) {
            console.log("better luck next time!");
            playAgain();
          } else if (dealerTally < playerTally) {
            console.log("dealer hits...");
            console.log(dCardPick());
          } else if (dealerTally > playerTally) {
            console.log("better luck next time!");
            playAgain();
          }
        }
      }
    }
  }

  console.log(`DEALER'S HAND:`);
  dCardPick();
  dealerTally += dCardPick();
  pCardPick();
  playerTally += pCardPick();

  while (playerHand.length >= 2 && playerHand.length < 6) {
    userPrompt();
  }
}
