//Simple Fibonacci Function // 0,1,1,2, 3

function fib(n) {
  if (n < 0) return null;
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
//console.log(fib(-1));

//Fizz buzz exercise
function fizzBuzz(a, b, length) {
  const result = [];
  if (a != 0 && b != 0) {
    for (let i = 1; i <= length; i++) {
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
  } else {
    return null;
  }
}

//console.log(fizzBuzz(4, 0, 20));
//console.log(fizzBuzz(3, 5, 30));

//Build a sentiment analyser

function getSentimentScore(string) {
  const positiveWordsList = ["happy", "awesome", "super", "great", "love"];
  const negativeWordsList = ["hate", "boring", "bad", "sad", "awful"];

  // If string is empty or only spaces
  if (!string || string.trim() === "") {
    return {
      score: 0,
      positiveWords: [],
      negativeWords: [],
    };
  }

  let clean = "";
  const words = [];

  for (let char of string) {
    // Keep only letters (A–Z, a–z)
    if ((char >= "A" && char <= "Z") || (char >= "a" && char <= "z")) {
      clean += char;
    } else {
      // When we hit a special char, push the word
      if (clean.length > 0) {
        console.log(clean);
        words.push(clean);
        clean = "";
      }
    }
  }

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
console.log(
  getSentimentScore("I am mega super awesome, super happy, and i deserve love.")
);

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
const result3 = formatCreditCardNumber(1234567890123456);

console.log(result3);

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
