const randomInt = (from, to) =>
  from + Math.floor(Math.random() * Math.abs(to - from));

const rollTheDice = () => randomInt(1, 7);

export const getNumberSymbol = (number) =>
  ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"][number];

function printDiceValue(playerNo, diceValue) {
  console.log(`Player ${playerNo} got ${getNumberSymbol(diceValue)}`);
}

function getDiceValue(playerNo) {
  if (prompt(`roll the dice-player ${playerNo}: `, "press enter")) {
    const dice = rollTheDice();
    printDiceValue(playerNo, dice);
    return dice;
  }
}

const TARGET = 100;

function isScoreExeeded(score) {
  return score > TARGET;
}

function isPlayerWon(score) {
  return score === TARGET;
}

function printPlayerPosition(playerNo, score) {
  console.log("Player " + playerNo + " score is: " + score);
}

const snakesAndLadders = {
  4: 56,
  29: 31,
  14: 55,
  22: 58,
  41: 79,
  54: 88,
  28: 10,
  37: 3,
  48: 16,
  75: 32,
  94: 71,
  96: 42,
};

function getScore(playerPosition, dice) {
  playerPosition += isScoreExeeded(playerPosition + dice) ? 0 : dice;

  return playerPosition in snakesAndLadders
    ? snakesAndLadders[playerPosition]
    : playerPosition;
}

const displayIfSnakeOrLadder = (dice, prevPosition, curPosition) => {
  if (prevPosition + dice < curPosition) {
    return console.log("Congrats! You got a 🪜");
  }
  if (prevPosition + dice > curPosition) {
    console.log("Congrats! You caught by 🐍");
  }
};

const getPlayerPosition = function (scoreBoard, playerNo) {
  const prevPosition = scoreBoard[playerNo];
  const dice = getDiceValue(playerNo);
  const curPosition = getScore(prevPosition, dice);
  displayIfSnakeOrLadder(dice, prevPosition, curPosition);
  printPlayerPosition(playerNo, curPosition);
  return curPosition;
};

function playGameWith(noOfPlayers) {
  const scoreBoard = Array.from({ length: noOfPlayers }, () => 0);
  let playerNo = 0;

  console.log(scoreBoard);

  while (playerNo < scoreBoard.length) {
    if (playerNo === 0) {
      console.log("-".repeat(40));
    }

    const curPosition = getPlayerPosition(scoreBoard, playerNo);

    if (isPlayerWon(curPosition)) {
      return console.log(`Congratulations Player ${playerNo} won the game`);
    }

    scoreBoard[playerNo] = curPosition;
    playerNo = (playerNo + 1) % noOfPlayers;
  }
}

function main() {
  console.log("Welcome!");

  if (confirm("Do you want to play this game?")) {
    const noOfPlayers = prompt("Enter number of players: ");
    return playGameWith(noOfPlayers);
  }

  return "Bye👋";
}

main();
