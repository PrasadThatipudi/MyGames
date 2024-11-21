const BOX_SYMBOL = "🟦";
const PLAYER = "🧔‍♂️";
const BOMB = "💣";

function createLineOfBoxes(length, playerPosition, isBomb) {
  if (length === 0) {
    return "";
  }

  if (length === playerPosition) {
    const symbol = isBomb ? BOMB : PLAYER;

    return symbol + createLineOfBoxes(length - 1, playerPosition, isBomb);
  }

  return BOX_SYMBOL + createLineOfBoxes(length - 1, playerPosition, isBomb);
}

function getMineField(length, width, xPosition, yPosition, isBomb) {
  if (width === 0) {
    return "";
  }

  if (width === yPosition) {
    return createLineOfBoxes(length, xPosition, isBomb) + "\n" +
      getMineField(length, width - 1, xPosition, yPosition, isBomb);
  }

  return createLineOfBoxes(length, 0, isBomb) + "\n" + 
    getMineField(length, width - 1, xPosition, yPosition, isBomb);
}

function getOffSet(direction, difference) {
  return (direction - difference) ** (direction - difference);
}

function isNumberInRange(min, max, number) {
  return min <= number && number <= max;
}

function isPositionExceeded(min, max, position) {
  return !isNumberInRange(min, max, position);
}

function delay() {
  for (let index = 0; index < 900000000; index++) {}
}

function printMinefield(mineLength, mineWidth, xPosition, yPosition, isBomb) {
  console.clear();
  console.log(xPosition, yPosition);
  console.log(getMineField(mineLength, mineWidth, xPosition, yPosition, isBomb));

  if (isBomb) {
    delay();
  }
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

function isPlayerReachedTheEnd(xPosition, yPosition) {
  return xPosition === 1 && yPosition === 1;
}

function getDirectionFromUser() {
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
  const pathNo = Math.ceil(Math.random() * 2);

  switch (pathNo) {
    case 1:
      return "55-45-44-34-33-32-22-21-11";
    case 2:
      return "55-54-53-43-33-32-31-21-11";
  }
}

function isBomb(xPosition, yPosition, stepNo, path) {
  const xIndex = stepNo * 3;
  const yIndex = stepNo * 3 + 1;

  return +path[xIndex] !== xPosition && +path[yIndex] !== yPosition;
}

function game(mineLength, mineWidth, path) {
  let xPosition = mineLength;
  let yPosition = mineWidth;
  let stepNo = 0;

  while (!isPlayerReachedTheEnd(xPosition, yPosition)) {
    printMinefield(mineLength, mineWidth, xPosition, yPosition, false);
    
    const direction = getDirectionFromUser();

    if (direction === "Invalid") {
      continue;
    }
    
    xPosition = getXPosition(direction, xPosition, mineLength);
    yPosition = getYPosition(direction, yPosition, mineWidth);
    stepNo++;

    if (isBomb(xPosition, yPosition, stepNo, path)) {
      printMinefield(mineLength, mineWidth, xPosition, yPosition, true);

      xPosition = mineLength;
      yPosition = mineWidth;
      stepNo = 0;
    }
  }

  printMinefield(mineLength, mineWidth, xPosition, yPosition, false);
  
  console.log("Congratulations! You reached the destination!");
}

const mineLength = 5;
const mineWidth = 5;

game(mineLength, mineWidth, getPath());
