const BOX_SYMBOL = "🟦";
const PLAYER = "🧔";
const BOMB = "💣";
const BOMB_EXPLOSION = "💥";

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

function createLineOfBoxes(length, xPosition, box, player) {
  if (xPosition !== 0) {
    return put(repeat(box, length), player, length - xPosition);
  }

  return repeat(box, length);
}

function createMinefield(mineLength, mineWidth) {
  const line = createLineOfBoxes(mineLength, 0, BOX_SYMBOL, PLAYER) + " \n";

  const minefield = repeat(line, mineWidth - 1);
  const noMineArea = repeat("  ", mineLength);

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
  return false;
  // const xEndPosition = +path[path.length - 2];
  // const yEndPosition = +path[path.length - 1];

  // return xPosition === xEndPosition && yPosition === yEndPosition;
}

function printInstructions() {
  console.log("  w     🔼");
  console.log("a s d ◀️ 🔽▶️");
}

function readDirection() {
  // printInstructions();

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
      return readDirection();
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

function printMinefield(minefield) {
  console.log(minefield);
}

function game(mineLength, mineWidth, path, xInitial, yInitial) {
  let xPosition = xInitial;
  let yPosition = yInitial;
  let stepNo = 0;

  const minefield = createMinefield(mineLength, mineWidth);

  while (!isGameOver()) {
    const playerIndex = getPlayerIndex(mineLength, mineWidth, xPosition, yPosition);

    printMinefield(put(minefield, PLAYER, playerIndex));

    const direction = readDirection();

    if (direction === "Invalid") {
      continue;
    }

    xPosition = getXPosition(direction, xPosition, mineLength + 1);
    yPosition = getYPosition(direction, yPosition, mineWidth + 1);
    stepNo++;


    if (isBomb(xPosition, yPosition, stepNo, path)) {
      printMinefield(put(minefield, BOMB, playerIndex));

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
