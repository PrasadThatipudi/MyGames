const BOX_SYMBOL = "🟦";

function createLineOfBoxes(length, boxSymbol) {
  if (length === 0) {
    return "";
  }

  return boxSymbol + createLineOfBoxes(length - 1, boxSymbol);
}

function createBox(length, width) {
  for (let index = 0; index < width; index++) {
    console.log(createLineOfBoxes(length, BOX_SYMBOL));
  }
}

createBox(5, 5);
