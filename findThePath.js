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

function isXPositionExceeded(xPosition) {
  return !isNumberInRange(1, mineLength, xPosition);
}

function isYPositionExceeded(yPosition) {
  return !isNumberInRange(1, mineWidth, yPosition);
}

function printMinefield(mineLength, mineWidth, xPosition, yPosition) {
  console.clear();
  console.log(xPosition, yPosition);  
  console.log(getMineField(mineLength, mineWidth, xPosition, yPosition));
}

function isLeft(direction) {
  return direction === LEFT;
}

function isRight(direction) {
  return direction === RIGHT;
}

function isUp(direction) {
  return direction === UP;
}

function isDown(direction) {
  return direction === DOWN;
}

function getXPosition(direction, xPosition) {
  if (!(isLeft(direction) || isRight(direction))) {
    return xPosition;
  }

  let offSetX = getOffSet(direction, 1);

  if (isXPositionExceeded(xPosition + offSetX)) {
    offSetX = 0;
  }

  return xPosition + offSetX;
}

function getYPosition(direction, yPosition) {
  if (!(isUp(direction) || isDown(direction))) {
    return yPosition;
  }

  let offSetY = getOffSet(direction, 3);

  if (isYPositionExceeded(yPosition + offSetY)) {
    offSetY = 0;
  }

  return yPosition + offSetY;
}

const RIGHT = 0;
const LEFT = 1;
const DOWN = 2;
const UP = 3;

const PATH = "";

function game(mineLength, mineWidth) {
  let xPosition = mineLength;
  let yPosition = mineWidth;

  while (!(xPosition === 1 && yPosition === 1)) {
    printMinefield(mineLength, mineWidth, xPosition, yPosition);
    
    const direction = +prompt("Enter the direction: ", "0");
    
    xPosition = getXPosition(direction, xPosition);
    yPosition = getYPosition(direction, yPosition);
  }
  
  console.clear();
  console.log(xPosition, yPosition);
  console.log(getMineField(mineLength, mineWidth, xPosition, yPosition));
  console.log("Congratulations! You won the game!");
}

const mineLength = 5;
const mineWidth = 6;

game(mineLength, mineWidth);
