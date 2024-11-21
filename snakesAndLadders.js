function repeat(string, noOfRepetitions) {
if (noOfRepetitions < 1) {
  return "";
}

return string + repeat(string, noOfRepetitions - 1);
}

function getSlice(text, start, end) {
if (start === end + 1) {
  return "";
}

return text[start] + getSlice(text, start + 1, end);
}

function min(num1, num2) {
return num1 < num2 ? num1 : num2;
}

function max(num1, num2) {
return num1 > num2 ? num1 : num2;
}

function slice(text, start, end) {
return getSlice(text, max(start, 0), min(end, text.length - 1));
}

function rollTheDice() {
return Math.ceil(Math.random() * 6);
}

function getNumberSymbol(number) {
const numberSymbols = "0️⃣1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣9️⃣";
const start = number * 3;

return slice(numberSymbols, start, start + 2);
}

function getNumberInString(number, stringLength) {
let stringNum = "" + number;
const noOfZerosNeeded = stringLength - stringNum.length;

stringNum = repeat("0", noOfZerosNeeded) + stringNum;

return stringNum;
}

function _updateString(string, updateWith, from, index, charIndex) {
if (index === string.length) {
  return "";
}

if (index === from && charIndex !== updateWith.length) {
  return updateWith[charIndex] + 
  _updateString(string, updateWith, from + 1, index + 1, charIndex + 1);
}

return string[index] + 
_updateString(string, updateWith, from, index + 1,charIndex);
}

function updateString(string, updateWith, from) {
return _updateString(string, updateWith, from, 0, 0);
}

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
  return false;
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
const LADDERS_END = "056-031-055-058-079-088";

function getLadderIndex(playerPosition) {
  return subStringIndexAt(LADDERS_START, getNumberInString(playerPosition, 3));
}

const SNAKES_START = "028-037-048-075-094-096";
const SNAKES_END = "010-003-016-032-071-042";

function getSnakeIndex(playerPosition) {
  return subStringIndexAt(SNAKES_START, getNumberInString(playerPosition, 3));
}

function getScore(playerNo, playerPosition) {
  const dice = getDiceValue(playerNo);
  playerPosition += isScoreExeeded(playerPosition + dice) ? 0 : dice;

  const ladderIndex = getLadderIndex(playerPosition);
    
  if (ladderIndex !== -1) {
    playerPosition = +slice(LADDERS_END, ladderIndex, ladderIndex + 2);

    printPlayerPosition(playerNo, playerPosition);
    console.log("\nYou got a 🪜");

    return playerPosition;
  }
   
  const snakeIndex = getSnakeIndex(playerPosition);

  if (snakeIndex !== -1) {
    playerPosition = +slice(SNAKES_END, snakeIndex, snakeIndex + 2);

    printPlayerPosition(playerNo, playerPosition);
    console.log("\nCongrats! You caught by 🐍");

    return playerPosition;
  }

  printPlayerPosition(playerNo, playerPosition);

  return playerPosition;
}

function playGameWith(noOfPlayers) {
  let scoreBoard = repeat("000", noOfPlayers);
  let index = 0;

  while (index < scoreBoard.length) {
    if (index === 0) {
      console.log(repeat("-", 40));
    }

    const playerNo = (index / 3) + 1;
    const prevPosition = +slice(scoreBoard, index, index + 2);
    let curPosition = getNumberInString(getScore(playerNo, prevPosition), 3);
   
    if (isPlayerWon(+curPosition)) {
      return "Congratulations Player " + playerNo + " won the game";
    }

    scoreBoard = updateString(scoreBoard, curPosition, index);
    
    index = (index + 3) % scoreBoard.length;
    console.log();
  }    
}

function home() {
  console.log("Welcome!");

  const isUserInGoodMood = confirm("Do you want to play this game?");

  if (isUserInGoodMood) {
    const noOfPlayers = prompt("Enter number of players: ");
    return playGameWith(noOfPlayers);
  }

  return "Bye👋";
}

console.log(home());
