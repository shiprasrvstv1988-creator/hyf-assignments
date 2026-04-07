// Exercise 6: Inheritance

import { teas } from "../week1/data/teas.js";
import { Tea } from "./exercise1.js";
import { Order } from "./exercise2.js";
import { OrderItem } from "./exercise2.js";

// 1. PremiumTea extends Tea
const typeofGrades = ["A", "B", "C"];
class PremiumTea extends Tea {
  constructor(name, type, origin, pricePerGram, organic, grade) {
    super(name, type, origin, pricePerGram, organic);
    if (!typeofGrades.includes(grade)) {
      throw new Error(`Invalid grade: ${grade}`);
    } else {
      this.grade = grade;
    }
  }

  priceFor(grams) {
    const basePrice = super.priceFor(grams);
    if (this.grade === "A") {
      return basePrice * 1.5;
    } else if (this.grade === "B") {
      return basePrice * 1.25;
    } else if (this.grade === "C") {
      return basePrice * 1.1;
    }
  }

  describe() {
    const price = this.priceFor(100).toFixed(2);
    const organicTag = this.organic ? "[organic]" : "";

    return `${this.name} [Grade ${this.grade}] (${this.type}) from ${this.origin} - ${price} DKK/100g ${organicTag}`;
  }

  static fromTea(tea, grade) {
    return new PremiumTea(
      tea.name,
      tea.type,
      tea.origin,
      tea.pricePerGram,
      tea.organic,
      grade
    );
  }
}

// 2. ExpressOrder extends Order
class ExpressOrder extends Order {
  constructor(expressFee = 25) {
    super();
    this.expressFee = expressFee;
  }

  getTotal() {
    return super.getTotal() + this.expressFee;
  }

  getSummary() {
    const firstLine = `Order (${this.status}) - ${this.items.length}`;
    const secondLine = this.items
      .map((item) => `  ${item.describe()}`)
      .join("\n");
    const lastLine = `Express fee: ${this.expressFee}`;
    const Total = `Total: ${this.getTotal().toFixed(2)} DKK`;
    return `${firstLine}\n${secondLine}\n${lastLine}\n${Total}`;
  }
}

// Test PremiumTea:
const gyokuro = new PremiumTea("Gyokuro", "green", "Japan", 0.56, false, "A");
console.log(gyokuro.describe());
// "Gyokuro [Grade A] (green) from Japan - 84.00 DKK/100g"
console.log(gyokuro.priceFor(100)); // 84

const upgraded = PremiumTea.fromTea(teas.map(Tea.fromObject)[0], "B");
console.log(upgraded.describe());

// Test ExpressOrder:
const express = new ExpressOrder(25);
express.addItem(new OrderItem(gyokuro, 100));
console.log(express.getSummary());
// Should show items + express fee + total
console.log(express.getTotal()); // 84 + 25 = 109
