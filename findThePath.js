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

const RIGHT = 0;
const LEFT = 1;
const DOWN = 2;
const UP = 3;

const PATH = ""

function game(mineLength, mineWidth) {
  let xPosition = mineLength;
  let yPosition = mineWidth;

  while (!(xPosition === 1 && yPosition === 1)) {
    console.clear();
    console.log(xPosition, yPosition);
    console.log(getMineField(mineLength, mineWidth, xPosition, yPosition));
    
    const direction = +prompt("Enter the direction: ", "0");
    
    if (direction === LEFT || direction === RIGHT) {
      let offSetX = getOffSet(direction, 1);
      
      if (isXPositionExceeded(xPosition + offSetX)) {
        offSetX = 0;
      }

      xPosition += offSetX;
    }
    
    if (direction === UP || direction === DOWN) {
      let offSetY = getOffSet(direction, 3);

      if (isYPositionExceeded(yPosition + offSetY)) {
        offSetY = 0;
      }

      yPosition += offSetY;
    }
  }
  
  console.clear();
  console.log(xPosition, yPosition);
  console.log(getMineField(mineLength, mineWidth, xPosition, yPosition));
  console.log("Congratulations! You won the game!");
}

const mineLength = 5;
const mineWidth = 5;

game(mineLength, mineWidth);
