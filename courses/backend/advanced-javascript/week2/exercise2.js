import { teas } from "../week1/data/teas.js";

//Order Processing System

const order = {
  id: 1001,
  customerId: 42,
  items: [
    { teaId: 1, grams: 100 },
    { teaId: 8, grams: 50 },
    { teaId: 3, grams: 200 },
  ],
};

//1. validateOrder(order, callback) - 200ms delay
export function validateOrder(order, callback) {
  setTimeout(() => {
    const validTeaIds = teas.map((tea) => tea.id);

    const errors = order.items.reduce((acc, item, index) => {
      if (!validTeaIds.includes(item.teaId)) {
        acc.push(`Item ${index}: Tea ID ${item.teaId} does not exist`);
      }

      if (item.grams <= 0) {
        acc.push(`Item ${index}: Invalid grams (${item.grams})`);
      }

      return acc;
    }, []);

    callback({
      valid: errors.length === 0,
      errors,
    });
  }, 200);
}
validateOrder(order, (validation) => {
  console.log("Validation Result:", validation);
});

//2. calculateTotal(order, callback) - 300ms delay
export function calculateTotal(order, callback) {
  setTimeout(() => {
    const totalValue = order.items.reduce((sum, item) => {
      const tea = teas.find((tea) => tea.id === item.teaId);
      if (!tea) return sum;
      return sum + tea.pricePerGram * item.grams;
    }, 0);

    callback({
      orderId: order.id,
      total: totalValue,
    });
  }, 300);
}
calculateTotal(order, (orderTotal) => {
  console.log("Order total:", orderTotal);
});

//3. checkStock(order, callback) - 400ms delay
export function checkStock(order, callback) {
  setTimeout(() => {
    const shortages = order.items.reduce((acc, item, index) => {
      const tea = teas.find((tea) => tea.id === item.teaId);

      if (!tea) {
        acc.push(`Item ${index}: Tea ID ${item.teaId} does not exist`);
        return acc;
      }
      if (item.grams <= 0) {
        acc.push(`Item ${index}: Invalid grams (${item.grams})`);
      }
      if (item.grams > tea.stockCount) {
        acc.push(
          `Item ${index}: Not enough stock (requested ${item.grams}, available ${tea.stockCount})`
        );
      }
      return acc;
    }, []);

    callback({
      orderId: order.id,
      inStock: shortages.length === 0,
      shortages: shortages,
    });
  }, 400);
}
checkStock(order, (stockReport) => {
  console.log("Stock report:", stockReport);
});
