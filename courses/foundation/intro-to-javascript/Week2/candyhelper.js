const boughtCandyPrices = [];
const amountToSpend = Math.random() * 100;
console.log("Your amount to spend is " + Math.floor(amountToSpend));

const prices = {
  sweet: 0.5,
  chocolate: 0.7,
  toffee: 1.1,
  chewinggum: 0.03,
};

function addCandy(candyType, weightInGrams) {
  const pricePerGram = prices[candyType];
  const candyPrice = pricePerGram * weightInGrams;
  if (pricePerGram === undefined) {
    return "Candy type not available.";
  }

  if (canBuyMoreCandy(candyPrice)) {
    console.log("You can buy more, so please do!");

    boughtCandyPrices.push(candyPrice);

    return (
      "Added " +
      candyType +
      " priced at " +
      candyPrice +
      " to boughtCandyPrices."
    );
  } else {
    return "Enough candy for you!";
  }
}

console.log(addCandy("sweet", 10));
console.log(addCandy("toffee", 5));
console.log(addCandy("chocolate", 70));
console.log(addCandy("dairymilk", 10));
console.log(addCandy("chewinggum", 100));

function canBuyMoreCandy(candyPrice) {
  let totalSpent = 0;
  for (let i = 0; i < boughtCandyPrices.length; i++) {
    totalSpent += boughtCandyPrices[i];
  }
  return totalSpent + candyPrice < amountToSpend;
}

//console.log("Bought candy prices:", boughtCandyPrices);
