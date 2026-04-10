import { teas } from "../week1/data/teas.js";

//Exercise 1

/* class Tea {
  constructor(name, type, origin) {
    this.name = name;
    this.type = type;
    this.origin = origin;
  }
}

const sencha = new Tea("Sencha", "green", "Japan");
const earlGrey = new Tea("Earl Grey", "black", "India");

console.log(sencha.name); // "Sencha"
console.log(sencha.type); // "green"
console.log(earlGrey.origin); // "India" */

//Exercise 2
/* const typeofTeas = ["green", "black", "herbal", "oolong", "white"];
class newTea extends Tea {
  constructor(name, type, origin, pricePerGram, organic) {
    if (!name) {
      throw new Error("name is missing");
    } else if (!typeofTeas.includes(type)) {
      throw new Error("Type is missing");
    } else if (!origin) {
      throw new Error("Origin is not defined");
    } else if (pricePerGram < 0) {
      throw new Error("Price must be positive");
    } else if (!organic) {
      throw new Error("Organic data is not provided");
    } else {
      super(name, type, origin);
      this.pricePerGram = pricePerGram;
      this.organic = organic;
    }
  }
  priceFor(grams) {
    return this.pricePerGram * grams;
  }
}

const firstTea = teas[0];
const tea = new newTea(
  firstTea.name,
  firstTea.type,
  firstTea.origin,
  firstTea.pricePerGram,
  firstTea.organic
);
//console.log(Tea);

//Exercise 3

const teaInstances = teas.map(
  (t) => new Tea(t.name, t.type, t.origin, t.pricePerGram, t.organic)
);
//console.log(teaInstances.length); // 20
//console.log(teaInstances[0].name); // "Sencha"

//Exercise 4

const valid = new newTea("Sencha", "green", "Japan", 0.12, true);

//console.log(valid);

const noName = new newTea("", "green", "Japan", 0.12, true);
//console.log(noName);

const badPrice = new newTea("Sencha", "green", "Japan", -1, true);
// Error: "Price must be positive"

//console.log(badPrice);
 */
//Exercise 5
/* 
class Tea {
  constructor(name, type, origin, pricePerGram, organic) {
    this.name = name;
    this.type = type;
    this.origin = origin;
    this.pricePerGram = pricePerGram;
    this.organic = organic;
  }

  priceFor(grams) {
    return this.pricePerGram * grams;
  }
}

const sencha = new Tea("Sencha", "green", "Japan", 0.12, true);
console.log(sencha.priceFor(100)); // 12
console.log(sencha.priceFor(50)); // 6 */

//Exercise 6

/* class Tea {
  constructor(name, type, origin, pricePerGram, organic) {
    this.name = name;
    this.type = type;
    this.origin = origin;
    this.pricePerGram = pricePerGram;
    this.organic = organic;
  }
  describe() {
    return `${this.name} ${this.type} from ${this.origin} - ${this.pricePerGram} DKK/100g`;
  }
}

const sencha = new Tea("Sencha", "green", "Japan", 0.12, true);
console.log(sencha.describe());
// "Sencha (green) from Japan - 12.00 DKK/100g"
 */

//Exercise 7

class Tea {
  constructor(name, type, origin, pricePerGram, organic) {
    this.name = name;
    this.type = type;
    this.origin = origin;
    this.pricePerGram = pricePerGram;
    this.organic = organic;
  }
}
class OrderItem {
  constructor(tea, grams) {
    this.tea = tea;
    this.grams = grams;
  }

  lineTotal() {
    return this.tea.pricePerGram * this.grams;
  }
}

const sencha = new Tea("Sencha", "green", "Japan", 0.12, true);
const item = new OrderItem(sencha, 200);

console.log(item.tea.name); // "Sencha"
console.log(item.grams); // 200
console.log(item.lineTotal()); // 24
