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

function displayHeaders(headers) {
  let tableHeaders = "";
  const headersCount = countChar(headers, "_");

  for (let index = 0; index < headersCount; index++) {
    const header = getNth(headers, index, "_");

    tableHeaders += rightAlign(header, 10);
  }

  return tableHeaders;
}

function displayTableData(headers, data) {
  const headersCount = countChar(headers, "_");
  const itemsCount = countChar(data, ":");
  let tableData = "";

  for (let index = 0; index < itemsCount; index++) {
    const item = getNth(data, index, ":");

    for (let eleIndex = 0; eleIndex < headersCount; eleIndex++) {
      tableData += rightAlign(getNth(item, eleIndex, "_"), 10);
    }

    tableData += "\n";
  }

  return tableData;
}

function table(headers, data) {
  return displayHeaders(headers) + "\n" + displayTableData(headers, data);
}

const allHeaders = "Name_Age_";
const allItems = "Prasad_18_:Bhagya_20_:Praneeth_33_:Sudheer_45_:";

console.log(table(allHeaders, allItems));
