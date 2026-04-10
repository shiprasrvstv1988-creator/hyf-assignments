//Exercise 5:  Full Tea Shop System

import { teas } from "../week1/data/teas.js";
import { Tea } from "./exercise1.js";
import { Order, OrderItem } from "./exercise2.js";
import { Inventory } from "./exercise3.js";
import { Customer } from "./exercise4.js";

class TeaShop {
  constructor(teaData) {
    this.teaCatalog = teaData.map(Tea.fromObject);
    this.inventory = new Inventory();
    this.customers = [];

    this.teaCatalog.forEach((tea) => {
      const teaDetails = teaData.find((t) => t.name === tea.name);
      this.inventory.add(tea, teaDetails.stockCount);
    });
  }

  registerCustomer(name, email) {
    const customer = new Customer(name, email);
    this.customers.push(customer);
    return customer;
  }

  createOrder(customer, items) {
    const cartItems = items.map(({ teaName, grams }) => {
      const tea = this.teaCatalog.find((t) => t.name === teaName);
      if (!tea) throw new Error(`Tea not found: ${teaName}`);
      const stock = this.inventory.getStock(teaName);
      if (stock < grams) {
        throw new Error(`Insufficient stock for: ${teaName}`);
      }
      return new OrderItem(tea, grams);
    });

    const newOrder = new Order();
    cartItems.forEach((item) => {
      newOrder.addItem(item);
    });

    items.forEach(({ teaName, grams }) => {
      this.inventory.sell(teaName, grams);
    });

    customer.placeOrder(newOrder);

    return newOrder;
  }

  getReport() {
    const totalOrders = this.customers.reduce((sum, customer) => {
      return sum + customer.orders.length;
    }, 0);

    const totalRevenue = this.customers.reduce((sum, customer) => {
      return sum + customer.totalSpent();
    }, 0);

    const lowStockItems = this.inventory.getLowStock(50).map((item) => ({
      name: item.tea.name,
      stockCount: item.stockCount,
    }));

    return {
      totalCustomers: this.customers.length,
      totalOrders,
      totalRevenue: parseFloat(totalRevenue.toFixed(2)),
      lowStockItems,
    };
  }
}

// Test:
const shop = new TeaShop(teas);

const alex = shop.registerCustomer("Alex", "alex@example.com");
const maria = shop.registerCustomer("Maria", "maria@example.com");

const order1 = shop.createOrder(alex, [
  { teaName: "Sencha", grams: 100 },
  { teaName: "Matcha", grams: 30 },
]);
console.log(order1.getSummary());

const order2 = shop.createOrder(maria, [{ teaName: "Earl Grey", grams: 200 }]);
console.log(order2.getSummary());

console.log(shop.getReport());
