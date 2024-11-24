function getRandomNumber(min, max) {
  return min + Math.round(Math.random() * (max - min));
}

function generatePath(mineLength, mineWidth, xInitial, yInitial) {
  let distance = xInitial + yInitial;
  let prevX = xInitial;
  let prevY = yInitial;
  let path = "";

  while (distance <= mineLength + mineWidth) {
    const xPosition = getRandomNumber(prevX, mineLength);
    const yPosition = getRandomNumber(prevY, prevX + 1);

    console.log(xPosition, yPosition);


    if ((xPosition + yPosition) === distance) {
      path += "" + xPosition + yPosition + "-";
      console.log(path);

      if (yPosition === mineWidth) {
        return path;
      }

      prevX = xPosition;
      prevY = yPosition;

      distance++;
    }
  }

  return path;
}

const mineLength = 5;
const mineWidth = 5;
const xInitial = 1;
const yInitial = 1;

console.log(generatePath(mineLength, mineWidth, xInitial, yInitial));
