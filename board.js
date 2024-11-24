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

function getNumberInString(number, stringLength, char) {
  let stringNum = "" + number;
  const noOfCharsNeeded = stringLength - stringNum.length;

  stringNum = repeat(char, noOfCharsNeeded) + stringNum;

  return stringNum;
}

function isDivisible(dividend, divisor) {
  return dividend % divisor === 0;
}

function isEven(number) {
  return isDivisible(number, 2);
}

for (let row = 9; row >= 0; row--) {
  let line = "";

  let lastDigit = isEven(row) ? 0 : 9;
  const increment = isEven(row) ? 1 : -1;

  while (isNumberInRange(lastDigit, 0, 10)) {
    const number = (row * 10) + lastDigit + 1;

    line += getNumberInString(number, 3, " ") + " ";

    lastDigit += increment;
  }

  console.log(line);
}
