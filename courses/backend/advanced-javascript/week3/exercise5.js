//Exercise 5: Full Order Flow - Combine everything into a complete order processing flow

const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

import { checkOrderStock } from "./exercise4.js";
import { calculateOrderTotal } from "./exercise3.js";

async function processOrder(items) {
  console.log("Processing order...\n");

  // Step 1: Validate items exist
  console.log("1. Validating items...");
  const allTeasResponse = await fetch(`${API_BASE}/teas`);
  const teas = await allTeasResponse.json();

  const validTeaIds = teas.map((tea) => tea.id);

  const invalidItems = items.filter(
    (item) => !validTeaIds.includes(item.teaId)
  );

  if (invalidItems.length > 0) {
    throw new Error(`Tea with ID ${invalidItems[0].teaId} does not exist`);
  }

  // Step 2: Check stock
  console.log("2. Checking stock...");
  const stockResult = await checkOrderStock(items);
  if (!stockResult.inStock) {
    throw new Error("Items out of stock");
  }

  // Step 3: Calculate total
  console.log("3. Calculating total...");
  const total = await calculateOrderTotal(items);

  // Step 4: Create order summary
  console.log("4. Creating summary...\n");

  return {
    items: items.length,
    total,
    status: "ready",
  };
}

const myOrder = [
  { teaId: 2, grams: 10 },
  { teaId: 3, grams: 20 },
];

processOrder(myOrder)
  .then((result) => {
    console.log("Order ready!");
    console.log(`Items: ${result.items}`);
    console.log(`Total: ${result.total.toFixed(2)} DKK`);
  })
  .catch((err) => {
    console.error("Order failed:", err.message);
  });
