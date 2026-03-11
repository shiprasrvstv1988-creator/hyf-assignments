import { teas } from "./data/teas.js";

//console.log(teas);

// Exercise 1: Log each tea's name to the console
teas.forEach(function (teas) {
  //console.log(teas.name);
});

//Exercise 2: Log each tea in the format: "Sencha (Japan)"

teas.forEach(function (teasDetails) {
  //console.log(`${teasDetails.name} (${teasDetails.origin})`);
});

// Exercise 3: Log the total count of organic teas

let organicTeaCount = 0;

teas.forEach(function (tea) {
  if (tea.organic) {
    organicTeaCount++;
  }
});
//console.log(organicTeaCount);

let organicTeaCount2 = 0;

const organicTeas = teas.filter(function (tea) {
  return tea.organic;
});

organicTeas.forEach(function () {
  organicTeaCount2++;
});
//console.log(organicTeaCount2);

// Exercise 4: Create an array containing just the tea names.

const names = teas.map(function (tea) {
  return tea.name;
});
//console.log(names);

// Exercise 5: Create an array of prices in DKK for 100 grams (multiply pricePerGram by 100).
const prices = teas.map(function (tea) {
  return tea.pricePerGram * 100;
});
//console.log(prices);

//Exercise 6: Create an array of display strings in the format: "Sencha - 12 DKK/100g"
const teaPricePerGram = teas.map(function (tea) {
  const prices = tea.pricePerGram * 100;
  return `${tea.name} - ${prices} DKK/100g`;
});
//console.log(teaPricePerGram);

//Exercise 7: Get all organic teas.
const organic = teas.filter(function (tea) {
  return tea.organic;
});
//console.log(organic);

// Exercise 8: Get all teas from Japan.
const teasFromJapan = teas.filter(function (tea) {
  return tea.origin === "Japan";
});
//console.log(teasFromJapan);

//Exercise 9: Get all teas with caffeineLevel equal to "high".
const caffeineLevel = teas.filter(function (tea) {
  return tea.caffeineLevel === "high";
});
//console.log(caffeineLevel);

//Exercise 10: Get all teas that are both in stock AND organic.
const teaInstockAndOrganic = teas.filter(function (tea) {
  return tea.organic && tea.inStock > 0;
});
//console.log(teaInstockAndOrganic);

//Exercise 11 : Get the names of all green teas.
const typeGreen = teas
  .filter(function (tea) {
    return tea.type === "green";
  })
  .map(function (typeGreen) {
    return typeGreen.name;
  });
//console.log(typeGreen);

// Exercise 12: Get display prices (format: "Sencha - 12 DKK/100g") for organic teas only.

const displayOrganicTeas = teas
  .filter(function (tea) {
    return tea.organic;
  })
  .map(function (tea) {
    const price = Math.round(tea.pricePerGram * 100);
    return `${tea.name} -${price} DKK/100g`;
  });
//console.log(displayOrganicTeas);

// Exercise 13 : Get Japanese teas sorted by price (lowest first).

const priceSortedByJapaneseTeas = teas
  .filter(function (tea) {
    return tea.origin === "Japan";
  })
  .sort((a, b) => a.pricePerGram - b.pricePerGram);
//console.log(priceSortedByJapaneseTeas);

//Exercise 14: Rewrite exercises 1-3 using arrow functions.

teas.forEach((tea) => tea.name);

teas.forEach((tea) => `${tea.name} (${tea.origin})`);

let organicTeaCount3 = 0;

teas.forEach((tea) => {
  if (tea.organic) {
    organicTeaCount3++;
  }
});

//Exercise 15 : Rewrite exercises 4-6 using arrow functions with implicit return

const names1 = teas.map((tea) => tea.name);

const prices1 = teas.map((tea) => tea.pricePerGram * 100);

const teaPricePerGram1 = teas.map(
  (tea) => `${tea.name} - ${tea.pricePerGram * 100} DKK/100g`
);

// Exercise 6 with explicit return (curly braces and return keyword)
const teaPricePerGram2 = teas.map((tea) => {
  const prices = tea.pricePerGram * 100;
  return `${tea.name} - ${prices} DKK/100g`;
});

//Exercise 17 Build a filterTeas(teas, criteria) function that accepts a filter object:

function filterTeas(teas, criteria) {
  return teas.filter((tea) => {
    return Object.keys(criteria).every((key) => tea[key] === criteria[key]);
  });
}
filterTeas(teas, { organic: true });
// Returns all organic teas

filterTeas(teas, { origin: "Japan" });
// Returns all Japanese teas

filterTeas(teas, { organic: true, origin: "Japan" });
// Returns organic Japanese teas

filterTeas(teas, { type: "green", inStock: true });
// Returns green teas that are in stock
