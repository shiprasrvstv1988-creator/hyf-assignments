import { teas } from "../week1/data/teas.js";

//Exercise 2: Order System

import { Tea } from "./exercise1.js";

export class OrderItem {
  constructor(tea, grams) {
    if (grams <= 0) {
      throw new Error("Grams must be positive");
    } else {
      this.tea = tea;
      this.grams = grams;
    }
  }

  lineTotal() {
    return this.tea.pricePerGram * this.grams;
  }

  describe() {
    const price = this.lineTotal().toFixed(2);
    return `${this.grams}g ${this.tea.name} - ${price} DKK`;
  }
}

export class Order {
  constructor() {
    this.items = [];
    this.status = "pending";
  }

  addItem(orderItem) {
    if (this.status !== "pending") {
      throw new Error("item not pending");
    } else {
      this.items.push(orderItem);
    }
  }

  getTotal() {
    return this.items.reduce((total, item) => {
      return total + item.lineTotal();
    }, 0);
  }

  getSummary() {
    const firstLine = `Order (${this.status}) - ${this.items.length}`;
    const secondLine = this.items
      .map((item) => `  ${item.describe()}`)
      .join("\n");
    const lastLine = `Total: ${this.getTotal().toFixed(2)} DKK`;

    return `${firstLine}\n${secondLine}\n${lastLine}`;
  }

  confirm() {
    this.status = "confirmed";
  }
}

// Test:
const teaInstances = teas.map(Tea.fromObject);
const order = new Order();
order.addItem(new OrderItem(teaInstances[0], 200)); // Sencha
order.addItem(new OrderItem(teaInstances[7], 50)); // Matcha

console.log(order.getSummary());
//console.log("Total:", order.getTotal().toFixed(2), "DKK");
