function createLineOfBoxes(length) {
  let line = "";

  for (let index = 0; index < length; index++) {
    line += "🟦";
  }

  return line;
}

function createBox(length, width) {
  for (let index = 0; index < width; index++) {
    console.log(createLineOfBoxes(length));
  }
}

createBox(5, 5);
