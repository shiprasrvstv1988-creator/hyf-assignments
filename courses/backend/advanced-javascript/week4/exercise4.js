import { teas } from "../week1/data/teas.js";
//Exercise 4: Customer with History

import { Tea } from "./exercise1.js";
import { Order } from "./exercise2.js";
import { OrderItem } from "./exercise2.js";

export class Customer {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.orders = [];
  }

  placeOrder(order) {
    order.confirm();
    this.orders.push(order);
    return order;
  }

  totalSpent() {
    return this.orders.reduce((total, order) => {
      return total + order.getTotal();
    }, 0);
  }

  getOrderHistory() {
    const firstLine = `${this.name} (${this.email}) - ${this.orders.length} orders`;
    const secondLine = this.orders.map((order, index) => {
      return order.getSummary().replace("Order", `Order ${index + 1}`);
    });
    const lastLine = `Lifetime total: ${this.totalSpent().toFixed(2)} DKK`;
    return `${firstLine}\n\n${secondLine.join("\n\n")}\n\n${lastLine}`; // second \n is for creating a blank line
  }
}

// Test:
const teaInstances = teas.map(Tea.fromObject);
const customer = new Customer("Alex", "alex@example.com");

const order1 = new Order();
order1.addItem(new OrderItem(teaInstances[0], 100)); // Sencha
customer.placeOrder(order1);

const order2 = new Order();
order2.addItem(new OrderItem(teaInstances[7], 50)); // Matcha
customer.placeOrder(order2);

//console.log(customer.getOrderHistory());
//console.log("Total spent:", customer.totalSpent().toFixed(2), "DKK");
