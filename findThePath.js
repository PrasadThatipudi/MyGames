const BOX_SYMBOL = "🟦";
const PLAYER = "🧔‍♂️";
const BOMB = "💣";
const BOMB_EXPLOSION = "💥";

function createLineOfBoxes(length, playerPosition, isBomb, boxSymbol, bomb) {
  if (length === 0) {
    return "";
  }

  if (length === playerPosition) {
    const symbol = isBomb ? bomb : PLAYER;

    return symbol + 
      createLineOfBoxes(length - 1, playerPosition, isBomb, boxSymbol, bomb);
  }

  return boxSymbol + 
    createLineOfBoxes(length - 1, playerPosition, isBomb, boxSymbol, bomb);
}

function getMineField(length, width, xPosition, yPosition, isBomb, bomb) {
  if (width === 0) {
    return "";
  }

  if (width === 1) {
    const xPos = width === yPosition ? xPosition : 0;

    return createLineOfBoxes(length, xPos, isBomb, "  ", bomb) + "\n" +
    getMineField(length, width - 1, xPosition, yPosition, isBomb, bomb);
  }

  if (width === yPosition) {
    return createLineOfBoxes(length, xPosition, isBomb, BOX_SYMBOL, bomb)
      + "\n" + 
      getMineField(length, width - 1, xPosition, yPosition, isBomb, bomb);
  }

  return createLineOfBoxes(length, 0, isBomb, BOX_SYMBOL, bomb) + "\n" + 
    getMineField(length, width - 1, xPosition, yPosition, isBomb, bomb);
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

function delay(delaySpeed) {
  for (let index = 0; index < delaySpeed; index++) {}
}

function printMinefield(mineLength, mineWidth, xPosition, yPosition, isBomb, bomb) {
  console.clear();
  console.log(xPosition, yPosition);

  console.log(getMineField(mineLength, mineWidth, xPosition, yPosition, isBomb, bomb));
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

function isPlayerReachedTheEnd(xPosition, yPosition, path) {
  const xEndPosition = +path[path.length - 2];
  const yEndPosition = +path[path.length - 1];

  return xPosition === xEndPosition && yPosition === yEndPosition;
}

function printInstructions() {
  console.log("  w     🔼");
  console.log("a s d ◀️ 🔽▶️");
}

function getDirectionFromUser() {
  printInstructions();

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

  // console.log("x:" + xIndex + " y:" + yIndex);
  // console.log("path[xIndex]:" + +path[xIndex]);
  // console.log("path[yIndex]:" + +path[yIndex]);
  // console.log("xPosition:" + xPosition);
  // console.log("yPosition:" + yPosition);

  return !(+path[xIndex] === xPosition && +path[yIndex] === yPosition);
}

// function createMinefield(mineLength, mineWidth, xPosition, yPosition) {
//   let minefield = "";

//   for (let column = 0; column < mineWidth; column++) {
//     for (let row = 0; row < mineLength; row++) {
//       minefield += BOX_SYMBOL;
//     }
    
//     minefield += "\n";
//   }

//   return minefield;
// }

function game(mineLength, mineWidth, path, xInitial, yInitial) {
  let xPosition = xInitial;
  let yPosition = yInitial;
  let stepNo = 0;

  while (!isPlayerReachedTheEnd(xPosition, yPosition, path)) {
    printMinefield(mineLength, mineWidth, xPosition, yPosition, false);
    
    const direction = getDirectionFromUser();

    if (direction === "Invalid") {
      continue;
    }
    
    xPosition = getXPosition(direction, xPosition, mineLength);
    yPosition = getYPosition(direction, yPosition, mineWidth);

    if (yPosition !== yInitial) {
      stepNo++;
    }

    if (isBomb(xPosition, yPosition, stepNo, path)) {
      printMinefield(mineLength, mineWidth, xPosition, yPosition, true, BOMB);
      delay(900000000);
      
      printMinefield(mineLength, mineWidth, xPosition, yPosition, true,
        BOMB_EXPLOSION);
      delay(900000000);

      xPosition = xInitial;
      yPosition = yInitial;
      stepNo = 0;
    }
  }

  printMinefield(mineLength, mineWidth, xPosition, yPosition, false);
  
  console.log("Congratulations! You reached the destination!");
}

const mineLength = 5;
const mineWidth = 6;
const xInitial = 1;
const yInitial = 1;

game(mineLength, mineWidth, getPath(), xInitial, yInitial);
