function findIndex(items, char, start) {
  for (let index = start; index < items.length; index++) {
    if (items[index] === char) {
      return index;
    }
  }

  return -1;
}

function slice(str, start, end) {
  let sliceOfStr = "";

  for (let index = Math.max(0, start); index <= Math.min(end, str.length - 1); index++) {
    sliceOfStr += str[index];
  }

  return sliceOfStr;
}

function getNthItem(allItems, n, separator) {
  let index = 0;

  for (let count = 0; count < n; count++) {
    index = findIndex(allItems, separator, index) + 1;
  }

  const endIndex = findIndex(allItems, separator, index + 1) - 1;

  return slice(allItems, index, endIndex);
}

function age(intern) {
  return getNthItem(intern, 1, "_");
}

function name(intern) {
  return getNthItem(intern, 0, "_");
}

function countChar(str, char) {
  let charCount = 0;

  for (let index = 0; index < str.length; index++) {
    if (str[index] === char) {
      charCount++;
    }
  }

  return charCount;
}


function header(n) {
  const allHeaders = "Name_Age_";

  return getNthItem(allHeaders, n, ":");
}

function interns(n) {
  const allItems = "Prasad_18_:Bhagya_20_:";

  return getNthItem(allItems, n, ":");
}

function repeat(str, noOfRepetitions) {
  let repeatedStr = "";

  for (let index = 0; index < noOfRepetitions; index++) {
    repeatedStr += str;
  }

  return repeatedStr;
}

function leftAlign(str, padLength) {
  const rightPadding = repeat(" ", padLength - str.length);

  return str + rightPadding;
}

function centreAlign(str, padLength) {
  const noOfSpaces = padLength - str.length;
  const leftPadding = repeat(" ", Math.floor(noOfSpaces / 2));
  const rightPadding = repeat(" ", Math.ceil(noOfSpaces / 2));

  return leftPadding + str + rightPadding;

}

function rightAlign(str, padLength) {
  const leftPadding = repeat(" ", padLength - str.length);

  return leftPadding + str;
}

function getRow(rowData, cellCount, columnsLength) {
  let row = "┃";

  for (let index = 0; index < cellCount; index++) {
    const element = getNthItem(rowData, index, "_");
    const length = getNthItem(columnsLength, index, "_");

    row += centreAlign(element, length) + "┃";
  }

  return row + "\n";
}

function isNumberInRange(number, min, max) {
  return min <= number && number <= max;
}

function replace(text, index, replacement) {
  if (!isNumberInRange(index, 0, text.length - 1)) {
    return text;
  }

  const firstPart = slice(text, 0, index - 1);
  const lastPart = slice(text, index + 1, text.length - 1);

  return firstPart + replacement + lastPart;
}

function getBorder(cellCount, columnsLength, left, right, middle, connect) {
  let border = left;

  for (let index = 0; index < cellCount; index++) {
    const length = getNthItem(columnsLength, index, "_");

    border += repeat(middle, length) + connect;
  }

  border = replace(border, border.length - 1, right);

  return border + "\n";
}


// ┏ ┳ ┓ ┣ ━ ┫ ┗ ┻ ┛ ╋

function topBorder(cellCount, columnsLength) {
  return getBorder(cellCount, columnsLength, "┏", "┓", "━", "┳");
  // return getBorder(cellCount, columnsLength, "+", "+", "-", "+");
}

function bottomBorder(cellCount, columnsLength) {
  return getBorder(cellCount, columnsLength, "┗", "┛", "━", "┻");
  // return getBorder(cellCount, columnsLength, "+", "+", "-", "+");
}

function middleBorder(cellCount, columnsLength) {
  return getBorder(cellCount, columnsLength, "┣", "┫", "━", "╋")
  // return getBorder(cellCount, columnsLength, "+", "+", "-", "+");
}

function getTableBody(items, columnsCount, rowsCount, columnsLength) {
  const top = topBorder(columnsCount, columnsLength);
  // console.log(top);
  const middle = middleBorder(columnsCount, columnsLength);
  // console.log(middle);
  const bottom = bottomBorder(columnsCount, columnsLength);
  // console.log(bottom);

  let table = top;

  for (let itemIndex = 0; itemIndex < rowsCount; itemIndex++) {
    const item = getNthItem(items, itemIndex, ":");

    table += getRow(item, columnsCount, columnsLength);
    table += itemIndex === rowsCount - 1 ? bottom : middle;
  }

  return table;
}

function readInput(message, inputType) {
  const input = prompt(message + ": ");

  if (!input) {
    return readInput(message);
  }

  return inputType === "number" ? +input : input;
}

function readItem(cellCount) {
  let item = "";

  for (let cell = 1; cell <= cellCount; cell++) {
    const element = readInput("Enter cell " + cell + " value");

    item += element + "_";
  }

  return item;
}

function readItems(columnsCount, rowsCount) {
  let items = "";

  for (let row = 1; row <= rowsCount; row++) {
    console.log("Row " + row);

    const item = readItem(columnsCount);
    items += item + ":";
  }

  return items;
}

function getColumnsLength(items, columnsCount, rowsCount) {
  let columnsLength = "";

  for (let column = 0; column < columnsCount; column++) {
    let row = column;
    let max = getNthItem(items, row, "_").length;

    row += columnsCount;

    while (row < columnsCount * rowsCount) {
      const element = getNthItem(items, row, "_")

      max = Math.max(max, element.length);
      row += columnsCount;
    }

    columnsLength = columnsLength + max + "_";
  }

  return columnsLength;
}

function table(rowsCount, columnsCount) {
  const items = readItems(columnsCount, rowsCount);
  const columnsLength = getColumnsLength(items, columnsCount, rowsCount);

  // console.log(columnsLength);

  return getTableBody(items, columnsCount, rowsCount, columnsLength);
  // return items;
}

// Data set 1
// const columnsLength = "15_5_20_";
const allHeaders = "Name_Age_Village_";
const allItems = "Prasad_18_Vizag_:Praneeth_19_Vizianagaram_:Krishna_21_Trivandrum_:";

// console.log(table(allHeaders, allItems, columnsLength));

const rowsCount = +readInput("Enter number of rows");
const columnsCount = +readInput("Enter number of columns");

console.log(table(rowsCount, columnsCount));

// console.log(rowsCount, columnsCount);

// Table
// Rows, Columns
// 1st row - headers
// rest - body
// Headers - header count - no of columns
// Items 
// separators
// Cell Alignment
