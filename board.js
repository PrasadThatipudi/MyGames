// const digits = "0123456789";

function getReverse(string, index) {
  if (index === 0) {
    return string[index];
  }

  return string[index] + getReverse(string, index - 1);
}

function reverse(string) {
  if (string.length === 0) {
    return string;
  }

  return getReverse(string, string.length - 1);
}

function repeat(string, noOfRepetitions) {
  if (noOfRepetitions < 1) {
    return "";
  }

  return string + repeat(string, noOfRepetitions - 1);
}

function isNumberInRange(number, min, max) {
  return min <= number && number < max;
}

function getNumberInString(number, stringLength) {
  let stringNum = "" + number;
  const noOfZerosNeeded = stringLength - stringNum.length;

  stringNum = repeat("0", noOfZerosNeeded) + stringNum;

  return stringNum;
}

function isDivisible(dividend, divisor) {
  return dividend % divisor === 0;
}

function isEven(number) {
  return isDivisible(number, 2);
}

const digits = "0123456789";

for (let row = 9; row >= 0; row--) {
  let line = "";

  const lastDigit = isEven(row) ? 0 : 9;
  const increment = isEven(row) ? 1 : -1;

  for (let col = 9; col >= 0; col--) {
    const onesDigit = isEven(row) ? reverse(digits)[col] : col;

    const number = row * 10 + +onesDigit + 1;

    line += getNumberInString(number, 2) + " ";
  }

  console.log(line);
}
