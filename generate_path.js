
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

    path = path + xPosition + yPosition + "-";
    // console.log(path);

    if (yPosition === mineWidth) {
      return path;
    }

    prevX = xPosition;
    prevY = yPosition;
    distance++;
  }

  return path;
}
