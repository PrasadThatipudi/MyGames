function repeat(string, noOfRepetitions) {
  if (noOfRepetitions < 1) {
    return "";
  }

  return string + repeat(string, noOfRepetitions - 1);
}

function isNumberInRange(number, min, max) {
  return min <= number && number < max;
}

function getSlice(text, start, end) {
  if (start >= end + 1) {
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

function put(text, otherString, index) {
  if (!isNumberInRange(index, 0, (text.length - otherString.length) + 1)) {
    return text;
  }

  const firstPart = slice(text, 0, index - 1);
  const lastPart = slice(text, index + otherString.length, text.length - 1);

  return firstPart + otherString + lastPart;
}

const SPACE = " ";

function createMinefield(mineLength, mineWidth, box) {
  const line = repeat(box, mineLength) + SPACE + "\n";

  const minefield = repeat(line, mineWidth - 1);
  const noMineArea = repeat(SPACE + SPACE, mineLength);

  return minefield + noMineArea;
}

function getOffSet(direction, difference) {
  return (direction - difference) ** (direction - difference);
}

function isPositionExceeded(min, max, position) {
  return !isNumberInRange(position, min, max);
}

function wait(delaySpeed) {
  for (let index = 0; index < delaySpeed; index++) { }
}

const RIGHT = 0;
const LEFT = 1;
const DOWN = 2;
const UP = 3;

function isRight(direction) {
  return direction === RIGHT;
}

function isLeft(direction) {
  return direction === LEFT;
}

function isDown(direction) {
  return direction === DOWN;
}

function isUp(direction) {
  return direction === UP;
}

function getDesiredPosition(direction, position, maxOfPosition, difference) {
  let offSet = getOffSet(direction, difference);

  if (isPositionExceeded(1, maxOfPosition, position + offSet)) {
    offSet = 0;
  }

  return position + offSet;
}

function getXPosition(direction, xPosition, maxOfX) {
  if (isLeft(direction) === isRight(direction)) {
    return xPosition;
  }

  return getDesiredPosition(direction, xPosition, maxOfX, 1);
}

function getYPosition(direction, yPosition, maxOfY) {
  if (isUp(direction) === isDown(direction)) {
    return yPosition;
  }

  return getDesiredPosition(direction, yPosition, maxOfY, 3);
}

function isGameOver(xPosition, yPosition, path) {
  const xEndPosition = +path[path.length - 2];
  const yEndPosition = +path[path.length - 1];

  return xPosition === xEndPosition && yPosition === yEndPosition;
}

function printInstructions() {
  console.log("  w     🔼");
  console.log("a s d ◀️ 🔽▶️");
}

function readDirection() {
  const direction = prompt("Enter the direction: ");

  switch (direction) {
    case "a":
      return LEFT;
    case "d":
      return RIGHT;
    case "w":
      return UP;
    case "s":
      return DOWN;
    default:
      return "Invalid";
  }
}

function getPath() {
  const pathNo = Math.ceil(Math.random() * 3);

  switch (pathNo) {
    case 1:
      return "11-12-22-23-24-34-44-45-55-56";
    // return "55-45-44-34-33-32-22-21-11";
    case 2:
      return "11-12-22-32-33-34-44-54-55-56";
    // return "55-54-53-43-33-32-31-21-11";
    case 3:
      return "11-12-13-14-24-34-44-43-42-52-53-54-55-56";
    // return "55-54-53-52-51-41-42-43-33-23-13-12-11";
  }
}

function isBomb(xPosition, yPosition, stepNo, path) {
  if (yPosition === 1) {
    return false;
  }

  const xIndex = stepNo * 3;
  const yIndex = stepNo * 3 + 1;

  return !(+path[xIndex] === xPosition && +path[yIndex] === yPosition);
}

function getPlayerIndex(length, width, xPosition, yPosition) {
  return (((length + 1) * (width - yPosition)) + (length - xPosition)) * 2;
}

function printMinefield(minefield, symbol, index) {
  console.clear();
  console.log(put(minefield, symbol, index));
  printInstructions();
}

function game(mineLength, mineWidth, path, xInitial, yInitial) {
  const BOX = "🟦";
  const PLAYER = "🧔";
  const BOMB = "💣";
  const BOMB_EXPLOSION = "💥";

  let xPosition = xInitial;
  let yPosition = yInitial;
  let stepNo = 0;

  const minefield = createMinefield(mineLength, mineWidth, BOX);
  console.log(minefield);

  while (!isGameOver(xPosition, yPosition, path)) {
    const playerIndex = getPlayerIndex(mineLength, mineWidth, xPosition, yPosition);
    // console.log(playerIndex);
    printMinefield(minefield, PLAYER, playerIndex);

    const direction = readDirection();

    if (direction === "Invalid") {
      continue;
    }

    xPosition = getXPosition(direction, xPosition, mineLength + 1);
    yPosition = getYPosition(direction, yPosition, mineWidth + 1);

    if (yPosition !== yInitial) {
      stepNo++;
    }


    if (isBomb(xPosition, yPosition, stepNo, path)) {
      const bombIndex = getPlayerIndex(mineLength, mineWidth, xPosition, yPosition);
      printMinefield(minefield, BOMB, bombIndex);
      wait(900000000);

      printMinefield(minefield, BOMB_EXPLOSION, bombIndex);
      wait(900000000);

      xPosition = xInitial;
      yPosition = yInitial;
      stepNo = 0;
    }
  }
}

const mineLength = 5;
const mineWidth = 6;
const xInitial = 1;
const yInitial = 1;

game(mineLength, mineWidth, getPath(), xInitial, yInitial);
