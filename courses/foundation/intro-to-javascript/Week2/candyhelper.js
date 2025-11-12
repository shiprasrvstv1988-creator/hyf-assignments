const boughtCandyPrices = [];

const sweetPricePerGram = 0.5;
const chocolatePricePerGram = 0.7;
const toffeePricePerGram = 1.1;
const chewingGumPricePerGram = 0.03;

const prices = {
  sweet: sweetPricePerGram,
  chocolate: chocolatePricePerGram,
  toffee: toffeePricePerGram,
  chewinggum: chewingGumPricePerGram,
};

function addCandy(candyType, weightInGrams) {
  const pricePerGram = prices[candyType];

  if (pricePerGram === undefined) {
    return "Candy type not available.";
  }

  const candyPrice = pricePerGram * weightInGrams;

  boughtCandyPrices.push(candyPrice);

  return (
    "Added " + candyType + " priced at " + candyPrice + " to boughtCandyPrices."
  );
}

console.log(addCandy("sweet", 10));
console.log(addCandy("toffee", 50));
console.log(addCandy("chocolate", 70));
console.log(addCandy("dairymilk", 10));
console.log(addCandy("chewinggum", 100));

const amountToSpend = Math.random() * 100;

console.log("Your amount to spend is " + Math.floor(amountToSpend));

function canBuyMoreCandy() {
  let totalSpent = 0;
  for (let i = 0; i < boughtCandyPrices.length; i++) {
    totalSpent += boughtCandyPrices[i];
  }
  return totalSpent < amountToSpend;
}

if (canBuyMoreCandy()) {
  console.log("You can buy more, so please do!");
} else {
  console.log("Enough candy for you!");
}

console.log("Bought candy prices:", boughtCandyPrices);
