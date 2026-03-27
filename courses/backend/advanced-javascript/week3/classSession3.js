const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

//Exercise 1: Fetch all teas from the API and log how many there are

fetch(`${API_BASE}/teas`)
  .then((response) => {
    return response.json();
  })
  .then((teas) => {
    //console.log(teas.length);
  });

// Exercise 2: Fetch a single tea by ID and log its name and origin

fetch(`${API_BASE}/teas/3`)
  .then((response) => {
    return response.json();
  })
  .then((teas) => {
    //console.log(teas.name, teas.origin);
  });

// Exercise 3: Try fetching a tea that doesn't exist (ID 999). Handle the error with .catch().

fetch(`${API_BASE}/teas/999`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then((tea) => {
    //console.log(tea.name);
  })
  .catch((error) => {
    //console.log(error.message);
  });

// Exercise 4 : Fetch the inventory endpoint and log which teas are low on stock (less than 50).

fetch(`${API_BASE}/inventory`)
  .then((response) => {
    return response.json();
  })
  .then((inventory) => {
    const result = inventory.filter((tea) => tea.stockCount < 50);
    result.forEach((tea) => {
      //console.log(`${tea.teaName} : ${tea.stockCount})`);
    });
  });

// Exercise 5 : Fetch a tea, then fetch its inventory status. Log both pieces of information.

fetch(`${API_BASE}/teas/1`)
  .then((response) => response.json())
  .then((tea) => {
    //console.log("Tea:", tea.name);
    // Return a new fetch to chain it
    return fetch(`${API_BASE}/inventory`)
      .then((response) => response.json())
      .then((inventory) => {
        const teaStock = inventory.find((item) => item.teaId === tea.id);
        //console.log(teaStock.stockCount);
      });
  })
  .catch((error) => console.error("Error:", error.message));

// Exercise 6: Fetch all teas, filter to only Japanese teas, then for each one log its name and price. All using .then() chains.

fetch(`${API_BASE}/teas`)
  .then((response) => response.json())
  .then((teas) => {
    const japaneseTea = teas.filter((tea) => tea.origin === "Japan");
    japaneseTea.forEach((tea) => {
      //console.log(tea.name, tea.pricePerGram);
    });
  })
  .catch((error) => console.error(error));

//Exercise 7 : Create a wait(ms) function that returns a Promise which resolves after ms milliseconds

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
// Test it:
//console.log("Starting...");
//wait(2000).then(() => console.log("2 seconds passed!"));

//Exercise 8: Create a fetchTeaWithTimeout(id, timeoutMs) function.

function fetchTeaWithTimeout(id, timeoutMs) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("Request timed out"));
    }, timeoutMs);

    fetch(`${API_BASE}/teas/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((tea) => {
        clearTimeout(timer);
        resolve(tea);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}
// Test with a generous timeout (should work)
/* fetchTeaWithTimeout(1, 5000)
  .then((tea) => console.log("Got:", tea.name))
  .catch((err) => console.log("Failed:", err.message)); */

// Test with a tiny timeout (should fail)
/* fetchTeaWithTimeout(1, 1)
  .then((tea) => console.log("Got:", tea.name))
  .catch((err) => console.log("Failed:", err.message)); */

//Exercise 9: Convert this callback-based function to return a Promise:

import fs from "fs";

// Callback version
/* function readJsonFile(path, callback) {
  fs.readFile(path, "utf8", (error, data) => {
    if (error) {
      callback(error, null);
      return;
    }
    try {
      const parsed = JSON.parse(data);
      callback(null, parsed);
    } catch (parseError) {
      callback(parseError, null);
    }
  });
} */

// Convert to Promise version
function readJsonFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (error, data) => {
      if (error) {
        reject(error);
        return;
      }
      try {
        const parsed = JSON.parse(data);
        resolve(parsed);
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
}

// Test it:
/* readJsonFilePromise("../week1/data/teas.js")
  .then((data) => console.log(data))
  .catch((error) => console.error(error.message));
 */

//Exercise 10: Rewrite Exercise 1 using async/await

async function countTeas() {
  try {
    const response = await fetch(`${API_BASE}/teas`);
    const teas = await response.json();
    //console.log("Number of teas:", teas.length);
  } catch (error) {
    console.error("Error fetching teas:", error.message);
  }
}
countTeas();

// Exercise 11 & 12

async function getTeaWithStock(id) {
  try {
    const teaResponse = await fetch(`${API_BASE}/teas/${id}`);
    const tea = await teaResponse.json();
    //console.log("Tea:", tea.name);

    const inventoryResponse = await fetch(`${API_BASE}/inventory`);
    const inventory = await inventoryResponse.json();

    const teaStock = inventory.find((item) => item.teaId === tea.id);
    return teaStock ? teaStock.stockCount : 0;
  } catch (error) {
    //console.error("Error fetching teas:", error.message);
  }
}

async function showStock() {
  const stock = await getTeaWithStock(1);
  //console.log("Stock count:", stock);
}

showStock();

//Exercise 13

async function getWellStockedOrganicTeas() {
  try {
    const allTeasResponse = await fetch(`${API_BASE}/teas`);
    const teas = await allTeasResponse.json();

    const organicTeas = teas.filter((tea) => tea.organic);

    const allInventoryResponse = await fetch(`${API_BASE}/inventory`);
    const inventory = await allInventoryResponse.json();

    const wellStockedTeas = organicTeas.filter((tea) => {
      const teaStock = inventory.find((item) => item.teaId === tea.id);
      return teaStock && teaStock.stockCount > 100;
    });
    return wellStockedTeas;
  } catch (error) {
    //console.error("Error", error.message);
  }
}

getWellStockedOrganicTeas().then((teas) => {
  //console.log("Well-stocked organic teas:", teas);
});
