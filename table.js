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

function getNth(allItems, n, separator) {
  let index = 0;
  let count = 0;

  while (count < n) {
    index = findIndex(allItems, separator, index) + 1;
    count++;
  }

  return slice(allItems, index, findIndex(allItems, separator, index + 1) - 1);
}

function age(intern) {
  return getNth(intern, 1, "_");
}

function name(intern) {
  return getNth(intern, 0, "_");
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

  return getNth(allHeaders, n, ":");
}

function interns(n) {
  const allItems = "Prasad_18_:Bhagya_20_:";

  return getNth(allItems, n, ":");
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

function getRow(rowData, headersCount, columnsLength) {
  let row = "┃";

  for (let index = 0; index < headersCount; index++) {
    const element = getNth(rowData, index, "_");
    const maxLength = getNth(columnsLength, index, "_");

    row += rightAlign(element, maxLength) + "┃";
  }

  return row + "\n";
}
/*
┓
┛
┏
┣
┫
┗
━
*/

function remove(string, index) {
  const firstPart = slice(string, 0, index - 1);
  const lastPart = slice(string, index + 1, string.length - 1);

  return firstPart + lastPart;
}

function getBorder(headersCount, columnsLength, left, right, middle, connect) {
  let border = left;

  for (let index = 0; index < headersCount; index++) {
    const maxLength = getNth(columnsLength, index, "_");

    border += repeat(middle, maxLength) + connect;
  }

  border = remove(border, border.length - 1) + right;

  return border + "\n";
}

function topBorder(headersCount, columnsLength) {
  return getBorder(headersCount, columnsLength, "┏", "┓", "━", "┳");
}

// function bottomBorder(headersCount, columnsLength) {
//   return getBorder(headersCount, columnsLength, "┗", "┛")
// }

// function getBorder(headersCount, columnsLength) {
//   let border = "+";

//   for (let index = 0; index < headersCount; index++) {
//     const maxLength = getNth(columnsLength, index, "_");

//     border += repeat("-", maxLength) + "+";
//   }

//   return border + "\n";
// }

function getHeaders(headers, columnsLength) {
  const headersCount = countChar(headers, "_");
  const top = topBorder(headersCount, columnsLength);
  // const border = getBorder(headersCount, columnsLength);

  return top + getRow(headers, headersCount, columnsLength);
}

function getTableBody(headers, items, columnsLength) {
  const headersCount = countChar(headers, "_");
  const itemsCount = countChar(items, ":");
  // const border = getBorder(headersCount, columnsLength);

  let tableData = "";

  for (let itemIndex = 0; itemIndex < itemsCount; itemIndex++) {
    const item = getNth(items, itemIndex, ":");

    tableData += getRow(item, headersCount, columnsLength);
  }

  return tableData;
}

function table(headers, data, columnsLength) {
  return getHeaders(headers, columnsLength) +
    getTableBody(headers, data, columnsLength);
}

const columnsLength = "15_5_20_";
const allHeaders = "Name_Age_Village_";
const allItems = "Prasad_18_Vizag_:Praneeth_19_Vizianagaram_:";

console.log(table(allHeaders, allItems, columnsLength));
