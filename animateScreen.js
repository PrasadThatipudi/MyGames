function repeat(string, noOfRepetitions) {
  if (noOfRepetitions < 1) {
    return "";
  }

  return string + repeat(string, noOfRepetitions - 1);
}

function getScreen(length, width, char) {
  const line = repeat(char, length) + "\n";

  return repeat(line, width);
}

function getSlice(text, start, end) {
  if (start >= end + 1) {
    return "";
  }

  return text[start] + getSlice(text, start + 1, end);
}

function min(num1, num2) {
  return num1 < num2 ? num1 : num2;
}

function max(num1, num2) {
  return num1 > num2 ? num1 : num2;
}

function slice(text, start, end) {
  return getSlice(text, max(start, 0), min(end, text.length - 1));
}

function isNumberInRange(number, min, max) {
  return min <= number && number < max;
}

function put(text, otherString, index) {
  if (!isNumberInRange(index, 0, (text.length - otherString.length) + 1)) {
    return text;
  }

  const firstPart = slice(text, 0, index - 1);
  const lastPart = slice(text, index + otherString.length, text.length - 1);

  return firstPart + otherString + lastPart;
}

function isDivisible(dividend, divisor) {
  return dividend % divisor === 0;
}

function wait(delaySpeed) {
  for (let index = 0; index < delaySpeed; index++);
}

function displayScreen(screen) {
  console.clear();
  console.log(screen);

  wait(100000000);
}

function animateScreen(length, width) {
  let screen = getScreen(length, width, "-");

  for (let xCoord = 0; xCoord < width; xCoord++) {
    for (let yCoord = 0; yCoord < length; yCoord++) {
      const index = (xCoord * (length + 1)) + yCoord;

      screen = put(screen, "X", index);
      displayScreen(screen);
    }
  }
}

animateScreen(20, 10);
