import { teas } from "../week1/data/teas.js";
//Exercise 3: Inventory Manager

import { Tea } from "./exercise1.js";

export class Inventory {
  constructor() {
    this.stock = {};
  }

  add(tea, stockCount) {
    this.stock[tea.name] = { tea, stockCount };
  }

  sell(teaName, grams) {
    const stockItem = this.stock[teaName];
    if (stockItem.stockCount < grams) {
      throw new Error("Not enough stock");
    }
    stockItem.stockCount -= grams;
  }

  restock(teaName, grams) {
    const tName = this.stock[teaName];
    tName.stockCount += grams;
  }

  getStock(teaName) {
    return this.stock[teaName].stockCount;
  }

  getLowStock(threshold) {
    const allTeas = Object.values(this.stock); // returns values as an array
    const lowStock = allTeas.filter((tea) => tea.stockCount < threshold);
    return lowStock;
  }

  getTotalValue() {
    const allTeas = Object.values(this.stock);
    return allTeas.reduce((total, item) => {
      return total + item.tea.pricePerGram * item.stockCount;
    }, 0);
  }
}

// Test:
const teaInstances = teas.map(Tea.fromObject);
const inventory = new Inventory();

teaInstances.forEach((tea) => {
  const data = teas.find((t) => t.name === tea.name);
  inventory.add(tea, data.stockCount);
});

console.log("Sencha stock:", inventory.getStock("Sencha")); // 150

inventory.sell("Sencha", 50);
console.log("After selling 50g:", inventory.getStock("Sencha")); // 100

console.log("Low stock (< 50):");
inventory.getLowStock(50).forEach((item) => {
  console.log(`- ${item.tea.name}: ${item.stockCount}g`);
});

console.log(
  "Total inventory value:",
  inventory.getTotalValue().toFixed(2),
  "DKK"
);
