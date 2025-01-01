const randomInt = (from, to) => from + Math.floor(Math.random() * to);
const rollTheDice = () => randomInt(0, 6);

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

const LADDERS_START = "004-029-014-022-041-054";
const LADDERS_TOP = "056-031-055-058-079-088";

function getLadderIndex(playerPosition) {
  return subStringIndexAt(LADDERS_START, padWithZero(playerPosition, 3));
}

const SNAKES_MOUTH = "028-037-048-075-094-096";
const SNAKES_TALE = "010-003-016-032-071-042";

function getSnakeIndex(playerPosition) {
  return subStringIndexAt(SNAKES_MOUTH, padWithZero(playerPosition, 3));
}

function getScore(playerNo, playerPosition) {
  const dice = getDiceValue(playerNo);
  playerPosition += isScoreExeeded(playerPosition + dice) ? 0 : dice;

  const ladderIndex = getLadderIndex(playerPosition);

  if (ladderIndex !== -1) {
    playerPosition = +LADDERS_TOP.slice(ladderIndex, ladderIndex + 2);

    printPlayerPosition(playerNo, playerPosition);
    console.log("\nYou got a 🪜");

    return playerPosition;
  }

  const snakeIndex = getSnakeIndex(playerPosition);

  if (snakeIndex !== -1) {
    playerPosition = +slice(SNAKES_TALE, snakeIndex, snakeIndex + 2);

    printPlayerPosition(playerNo, playerPosition);
    console.log("\nCongrats! You caught by 🐍");

    return playerPosition;
  }

  printPlayerPosition(playerNo, playerPosition);

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

    if (isPlayerWon(+curPosition)) {
      return "Congratulations Player " + playerNo + " won the game";
    }

    scoreBoard[index] = curPosition;

    index = (index + 1) % scoreBoard.length;
    console.log(index, scoreBoard.length);
  }
}

function main() {
  console.log("Welcome!");

  const isUserInGoodMood = confirm("Do you want to play this game?");

  if (isUserInGoodMood) {
    const noOfPlayers = prompt("Enter number of players: ");
    return playGameWith(noOfPlayers);
  }

  return "Bye👋";
}

console.log(main());
