const randomInt = (from, to) => from + Math.floor(Math.random() * to);
const rollTheDice = () => randomInt(1, 7);

export const getNumberSymbol = (number) =>
  ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"][number];

export const padWithZero = (number, padLength) =>
  number.toString().padStart(padLength, "0");

export const put = (string, replaceWith, from) =>
  string.slice(0, from) + replaceWith + string.slice(replaceWith.length + from);

function isStringPresentAt(string, otherString, stringStart) {
  for (let index = 0; index < otherString.length; index++) {
    const stringIndex = stringStart + index;

    if (string[stringIndex] !== otherString[index]) {
      return false;
    }
  }

  return true;
}

function getSubStringIndexAt(string, otherString, stringIndex) {
  if (stringIndex > string.length - 1) {
    return -1;
  }

  if (isStringPresentAt(string, otherString, stringIndex)) {
    return stringIndex;
  }

  return getSubStringIndexAt(string, otherString, stringIndex + 1);
}

function subStringIndexAt(string, otherString) {
  if (otherString.length === 0) {
    return -1;
  }

  return getSubStringIndexAt(string, otherString, 0);
}

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

const ladders = { 4: 56, 29: 31, 14: 55, 22: 58, 41: 79, 54: 88 };
const snakes = { 28: 10, 37: 3, 48: 16, 75: 32, 94: 71, 96: 42 };

function getScore(playerNo, playerPosition) {
  const dice = getDiceValue(playerNo);
  playerPosition += isScoreExeeded(playerPosition + dice) ? 0 : dice;

  if (playerPosition in ladders) {
    console.log("\nYou got a 🪜");
    return ladders[playerPosition];
  }

  if (playerPosition in snakes) {
    console.log("\nCongrats! You caught by 🐍");
    return snakes[playerPosition];
  }

  return playerPosition;
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
