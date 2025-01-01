const randomInt = (from, to) =>
  from + Math.floor(Math.random() * Math.abs(to - from));

const rollTheDice = () => randomInt(1, 7);

export const getNumberSymbol = (number) =>
  ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"][number];

function printDiceValue(playerNo, diceValue) {
  console.log("Player " + playerNo + " got " + getNumberSymbol(diceValue));
}

function getDiceValue(playerNo) {
  if (prompt("roll the dice-player " + playerNo + ": ", "press enter")) {
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

const snkeAndLadderPositions = {
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

function getScore(playerNo, playerPosition) {
  const dice = getDiceValue(playerNo);
  playerPosition += isScoreExeeded(playerPosition + dice) ? 0 : dice;

  return playerPosition in snkeAndLadderPositions
    ? snkeAndLadderPositions[playerPosition]
    : playerPosition;
}

function playGameWith(noOfPlayers) {
  const scoreBoard = Array.from({ length: noOfPlayers }, () => 0);
  let index = 0;

  console.log(scoreBoard);

  while (index < scoreBoard.length) {
    if (index === 0) {
      console.log("-".repeat(40));
    }

    const playerNo = index + 1;
    const prevPosition = scoreBoard[index];
    let curPosition = getScore(playerNo, prevPosition);
    printPlayerPosition(playerNo, curPosition);

    if (isPlayerWon(curPosition)) {
      return "Congratulations Player " + playerNo + " won the game";
    }

    scoreBoard[index] = curPosition;

    index = (index + 1) % scoreBoard.length;
    console.log(index, scoreBoard.length);
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

console.log(main());
