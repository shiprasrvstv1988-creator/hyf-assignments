import { teas } from "../week1/data/teas.js";
// Exercise 1: Tea Class with Validation

const TEA_TYPES = ["green", "black", "herbal", "oolong", "white"];
export class Tea {
  constructor(name, type, origin, pricePerGram, organic) {
    if (typeof name !== "string" || name.trim() === "") {
      throw new Error("Please provide a valid tea name");
    } else if (!TEA_TYPES.includes(type)) {
      throw new Error(`Invalid type: ${type}`);
    } else if (pricePerGram < 0) {
      throw new Error("Price must be positive");
    } else {
      this.name = name;
      this.type = type;
      this.origin = origin;
      this.pricePerGram = pricePerGram;
      this.organic = organic;
    }
  }

  priceFor(grams) {
    return this.pricePerGram * grams;
  }

  describe() {
    const price = this.pricePerGram * 100;
    const organicTag = this.organic ? "[organic]" : "";

    return `${this.name} (${this.type}) from ${this.origin} - ${price} DKK/100g ${organicTag}`;
  }

  static fromObject(obj) {
    return new Tea(
      obj.name,
      obj.type,
      obj.origin,
      obj.pricePerGram,
      obj.organic
    );
  }
}

// Test validation:
try {
  new Tea("", "green", "Japan", 0.12, true);
} catch (e) {
  console.log(e.message);
} // "Name is required"

try {
  new Tea("Test", "purple", "Japan", 0.12, true);
} catch (e) {
  console.log(e.message);
} // "Invalid type: purple"

// Test factory method:
const teaInstances = teas.map(Tea.fromObject);
console.log(teaInstances.length); // 20
console.log(teaInstances[0].describe());
// "Sencha (green) from Japan - 12.00 DKK/100g [organic]"
console.log(teaInstances[1].describe());
// "Earl Grey (black) from India - 8.00 DKK/100g"
