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

function leftAlign(str, length) {
  return str + repeat(" ", length - str.length);
}

function centreAlign(str, length) {
  const noOfSpaces = length - str.length;

  return repeat(" ", noOfSpaces / 2) + str + repeat(" ", noOfSpaces / 2);
}

function rightAlign(str, length) {
  return repeat(" ", length - str.length) + str;
}

function displayHeaders(headers) {
  let index = 0;
  let tableHeaders = "";
  const headersCount = countChar(headers, "_");

  console.log(headersCount);
}

const allHeaders = "Name_Age_";
const allItems = "Prasad_18_:Bhagya_20_:";

