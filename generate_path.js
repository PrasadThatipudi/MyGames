
function getRandomNumber(min, max) {
  return min + Math.round(Math.random() * (max - min));
}

function generatePath(mineLength, mineWidth, xInitial, yInitial) {
  let distance = xInitial + yInitial + 1;
  let prevX = xInitial;
  let prevY = yInitial;
  let path = "";

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

const mineLength = 10;
const mineWidth = 10;
const xInitial = 0;
const yInitial = 0;

console.log(generatePath(mineLength, mineWidth, xInitial, yInitial));
