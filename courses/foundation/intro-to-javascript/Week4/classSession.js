//Simple Fibonacci Function // 0,1,1,2, 3

function fib(n) {
  let a = 0; // F(1)
  let b = 1; // F(2)

  //i = 3 because the first two Fibonacci numbers are already defined in a and b. Starting at 3 avoids unnecessary calculations.
  for (let i = 3; i <= n; i++) {
    const next = a + b;
    a = b;
    b = next;
  }

  return n === 1 ? 0 : b;
}

//console.log(fib(5)); // 3
//console.log(fib(10)); // 34

//Fizz buzz exercise
function fizzBuzz(a, b) {
  let result = [];
  for (let i = 1; i <= 100; i++) {
    if (i % a === 0 && i % b === 0) {
      result.push("FizzBuzz");
    } else if (i % a === 0) {
      result.push("Fizz");
    } else if (i % b === 0) {
      result.push("Buzz");
    } else {
      result.push(i);
    }
  }
  return result;
}

//console.log(fizzBuzz(4, 12));
//console.log(fizzBuzz(3, 5));

//Build a sentiment analyser

function getSentimentScore(string) {
  const positiveWordsList = ["happy", "awesome", "super", "great", "love"];
  const negativeWordsList = ["hate", "boring", "bad", "sad", "awful"];
  const words = string.toLowerCase().split(" ");

  const positiveWords = words.filter((word) =>
    positiveWordsList.includes(word)
  );
  const negativeWords = words.filter((word) =>
    negativeWordsList.includes(word)
  );

  const score = positiveWords.length - negativeWords.length;

  return {
    score: score,
    positiveWords: positiveWords,
    negativeWords: negativeWords,
  };
}

//console.log(getSentimentScore("I am mega super awesome happy"));

//Credit card number formatter
function formatCreditCardNumber(number) {
  if (typeof number !== "number") {
    return { error: "Argument must be a number." };
  }

  const numberString = number.toString();
  let formatted = "";

  for (let i = 0; i < numberString.length; i++) {
    formatted += numberString[i];

    if ((i + 1) % 4 === 0) {
      formatted += " ";
    }
  }

  return {
    original: number,
    formatted: formatted,
  };
}

const result1 = formatCreditCardNumber(123456789);
const result2 = formatCreditCardNumber("shipra");

//console.log(result1, result2);

//Character frequencies

function getCharacterFrequencies(str) {
  const freq = {};

  for (const char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }

  const characters = [];
  for (const char in freq) {
    characters.push({ character: char, count: freq[char] });
  }
  return characters;
}

console.log(getCharacterFrequencies("shipra"));
