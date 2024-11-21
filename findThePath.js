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

const RIGHT = 0;
const LEFT = 1;
const DOWN = 2;
const UP = 3;

function game(mineLength, mineWidth) {
  let xPosition = mineLength;
  let yPosition = mineWidth;

  while (true) {
    console.clear();
    console.log(getMineField(mineLength, mineWidth, xPosition, yPosition));

    const direction = +prompt("Enter the direction: ", "0");

    if (direction === LEFT || direction === RIGHT) {
      xPosition = xPosition + getOffSet(direction, 1);
    }

    if (direction === UP || direction === DOWN) {
      yPosition = yPosition + getOffSet(direction, 3);
    }
  }
}

const mineLength = 5;
const mineWidth = 5;

game(mineLength);
