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
  // console.clear();
  console.log(put(minefield, symbol, index));
  printInstructions();
}

function getMinefieldWithPath(path, minefield, mineLength, mineWidth, box,
  player) {

  let minefieldWithPath = minefield;
  let index = 0;

  while (index < path.length - 3) {
    const xPos = +path[index];
    const yPos = +path[index + 1];

    index += 3;
    const stepIndex = getPlayerIndex(mineLength, mineWidth, xPos, yPos);

    minefieldWithPath = put(minefieldWithPath, box, stepIndex);
  }

  const xPos = +path[index];
  const yPos = +path[index + 1];

  const stepIndex = getPlayerIndex(mineLength, mineWidth, xPos, yPos);

  return put(minefieldWithPath, player, stepIndex);
}


function wait(delaySpeed) {
  for (let index = 0; index < delaySpeed; index++) { }
}

function printYouWon(path, minefield, mineLength, mineWidth, box, player) {
  // console.clear();
  console.log(getMinefieldWithPath(path, minefield, mineLength, mineWidth, box, player));

  console.log("Congratulations! You reached the destination!");
}

function game(mineLength, mineWidth, path, xInitial, yInitial) {
  const BOX = "🟦";
  const PLAYER = "🧔";
  const BOMB = "💣";
  const BOMB_EXPLOSION = "💥";

  let xPosition = xInitial;
  let yPosition = yInitial;
  let stepNo = 0;
  let isPlayerEnteredIntoMine = false;

  const minefield = createMinefield(mineLength, mineWidth, BOX);

  // console.log(minefield);
  while (!isGameOver(xPosition, yPosition, path)) {
    const playerIndex = getPlayerIndex(mineLength, mineWidth, xPosition,
      yPosition);

    console.log(path);
    printMinefield(minefield, PLAYER, playerIndex);

    const direction = readDirection();

    if (direction === "Invalid") {
      continue;
    }

    const prevYPosition = yPosition;

    xPosition = getXPosition(direction, xPosition, mineLength + 1);
    yPosition = getYPosition(direction, yPosition, mineWidth + 1);

    if (!isPlayerEnteredIntoMine && yPosition > 1) {
      isPlayerEnteredIntoMine = true;
    }

    if (isPlayerEnteredIntoMine && yPosition === yInitial) {
      yPosition = prevYPosition;
      continue;
    }

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
      isPlayerEnteredIntoMine = false;
    }
  }

  printYouWon(path, minefield, mineLength, mineWidth, "🟩", PLAYER);
}


function getRandomNumber(min, max) {
  return min + Math.round(Math.random() * (max - min));
}

function generatePath(mineLength, mineWidth, xInitial, yInitial) {
  let distance = xInitial + yInitial + 1;
  let prevX = xInitial;
  let prevY = yInitial;
  let path = "" + xInitial + yInitial + "-";

  while (distance <= mineLength + mineWidth) {
    const xPosition = getRandomNumber(prevX, mineLength);
    const yPosition = getRandomNumber(prevY, mineWidth);

    if ((xPosition + yPosition) !== distance) {
      continue;
    }

    path = path + xPosition + yPosition;

    if (yPosition !== mineWidth) {
      path += "-";
    } else {
      return path;
    }

    prevX = xPosition;
    prevY = yPosition;
    distance++;
  }

  return path;
}

const mineLength = 5;
const mineWidth = 6;
const xInitial = 1;
const yInitial = 1;
const path = generatePath(mineLength, mineWidth, xInitial, yInitial + 1);

console.log(path);
game(mineLength, mineWidth, path, xInitial, yInitial);
