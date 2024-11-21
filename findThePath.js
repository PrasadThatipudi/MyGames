const BOX_SYMBOL = "🟦";
const PLAYER = "🧔‍♂️";

function createLineOfBoxes(length, playerPosition) {
  if (length === 0) {
    return "";
  }

  if (length === playerPosition) {
    return PLAYER + createLineOfBoxes(length - 1, playerPosition);
  }

  return BOX_SYMBOL + createLineOfBoxes(length - 1, playerPosition);
}

function getMineField(length, width, xPosition, yPosition) {
  if (width === 0) {
    return "";
  }

  if (width === yPosition) {
    return createLineOfBoxes(length, xPosition) + "\n" +
      getMineField(length, width - 1, xPosition, yPosition);
  }

  return createLineOfBoxes(length, 0) + "\n" + 
    getMineField(length, width - 1, xPosition, yPosition);
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

function printMinefield(mineLength, mineWidth, xPosition, yPosition) {
  console.clear();
  console.log(xPosition, yPosition);  
  console.log(getMineField(mineLength, mineWidth, xPosition, yPosition));
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
  }
}

const PATH = "55-45-44-34-33-32-22-21-11";

function game(mineLength, mineWidth) {
  let xPosition = mineLength;
  let yPosition = mineWidth;

  while (!isPlayerReachedTheEnd(xPosition, yPosition)) {
    printMinefield(mineLength, mineWidth, xPosition, yPosition);
    
    const direction = getDirectionFromUser();
    
    xPosition = getXPosition(direction, xPosition, mineLength);
    yPosition = getYPosition(direction, yPosition, mineWidth);
  }

  printMinefield(mineLength, mineWidth, xPosition, yPosition);
  
  console.log("Congratulations! You reached the destination!");
}

const mineLength = 5;
const mineWidth = 6;

game(mineLength, mineWidth);
