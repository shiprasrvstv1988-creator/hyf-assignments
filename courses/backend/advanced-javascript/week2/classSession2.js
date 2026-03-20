import { teas } from "../week1/data/teas.js";

// Exercise 1

const logTea = function (tea) {
  return `${tea.name} (${tea.origin})`;
};

//console.log(logTea(teas[0]));

// Exercise 2 - Create a function called functionRunner that takes a function as a parameter and calls it.

function functionRunner(logTea) {
  logTea();
}

// Test it:
functionRunner(function () {
  //console.log(logTea(teas[0]));
});

// Also test with a function variable:
const TeaName = function () {
  //console.log("Sencha");
};
functionRunner(TeaName);

//Exercise 3 : Create an array containing three different functions. Each function should log something different. Loop through the array and call each function.

const functions = [
  function () {
    //console.log("First");
  },
  function () {
    //console.log("Second");
  },
  function () {
    //console.log("Third");
  },
];
for (let i = 0; i < functions.length; i++) {
  functions[i](); // call each function
}

//Exercise 4: Create a function createGreeter(greeting) that returns a new function. The returned function should take a name and log the greeting with the name.

const sayHello = createGreeter("Hello");
const sayHi = createGreeter("Hi");

function createGreeter(greeting) {
  return function (name) {
    //console.log(`${greeting}, ${name}!`);
  };
}

sayHello("Alice"); // "Hello, Alice!"
sayHi("Bob"); // "Hi, Bob!"

//Exercise 5: Use reduce to calculate the total stockCount across all teas.

const totalStock = teas.reduce((sum, tea) => {
  return sum + tea.stockCount;
}, 0);

//console.log(totalStock);

//Exercise 6: Calculate the total inventory value: the sum of pricePerGram * stockCount for each tea.

const inventoryValue = teas.reduce((sum, tea) => {
  return sum + tea.pricePerGram * tea.stockCount;
}, 0);
//console.log(inventoryValue);

//Exercise 7: Use reduce to count how many teas of each type exist.

const countByType = teas.reduce((counts, tea) => {
  if (!counts[tea.type]) {
    counts[tea.type] = 0;
  }
  counts[tea.type]++;
  return counts;
}, {});

//console.log(countByType);

//Exercise 8: Use reduce to group tea names by their origin country.

const TeaNameByOrigin = teas.reduce((group, tea) => {
  if (!group[tea.origin]) {
    group[tea.origin] = [];
  }
  group[tea.origin].push(tea.name);
  return group;
}, {});

//console.log(TeaNameByOrigin);

//Exercise 9 : Create your own myForEach(array, callback) function that works like the built-in forEach

function myForEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i]);
  }
}
myForEach(teas, function (tea) {
  //console.log(tea.name);
});

//Exercise 10: Create your own myMap(array, callback) function that works like the built-in map.

function myMap(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i]));
  }
  return result;
}

const names = myMap(teas, function (tea) {
  return tea.name;
});
//console.log(names);

//Exercise 11 : Create your own myFilter(array, callback) function that works like the built-in filter.

function myFilter(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i])) {
      result.push(array[i]);
    }
  }
  return result;
}
const organic = myFilter(teas, function (tea) {
  return tea.organic;
});
//console.log(organic.length);

//Exercise 12: What order will these console.logs appear? Write your prediction first, then run the code to check.

//console.log("1. Starting");

setTimeout(function () {
  //console.log("2. Timeout done");
}, 1000);

//console.log("3. Continuing");

//starting , continuing, timeout done

//Exercise 13: Create a function runAfterDelay(delay, callback) that waits delay milliseconds, then calls the callback.

function runAfterDelay(delay, callback) {
  setTimeout(callback, delay);
}

runAfterDelay(2000, function () {
  //console.log("This runs after 2 seconds");
});

runAfterDelay(1000, function () {
  //console.log("This runs after 1 second");
});

//console.log("This runs immediately");

//this runs immediately, this runs after 1 sec, this runs after 2 sec

//Exercise 14: Create a function findTeaById(id, callback) that simulates a database lookup with a 500ms delay.

function findTeaById(id, callback) {
  setTimeout(function () {
    const tea = teas.find((teas) => teas.id === id);
    callback(tea);
  }, 500);
}

//console.log("Looking up tea...");
findTeaById(7, function (tea) {
  //console.log("Found:", tea.name);
});
//console.log("Request sent, waiting...");

//Exercise 15: Call findTeaById three times in a row with different IDs. Notice that all three requests start at the same time - they don't wait for each other.

findTeaById(1, function (tea) {
  //console.log("Got:", tea.name);
});
findTeaById(5, function (tea) {
  //console.log("Got:", tea.name);
});
findTeaById(10, function (tea) {
  //console.log("Got:", tea.name);
});
//console.log("All requests sent!");

//Exercise 16
import fs from "fs";

fs.readFile("orders.json", { encoding: "utf8" }, function (error, data) {
  if (error) {
    console.error(error);
    return;
  }
  const orders = JSON.parse(data);
  //console.log("Number of orders:", orders.length);
});
