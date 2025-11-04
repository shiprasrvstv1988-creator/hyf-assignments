console.log("I love pizza");

const myFavoritePizza = "Margherita";

const pizzaPrice = 90;

console.log(
  "New pizza order",
  myFavoritePizza,
  "and the price of the pizza is:",
  pizzaPrice,
  "kroner."
);

let amountOfPizzaToOrder = 5;
let orderTakeaway = "yes";
let totalPrice = pizzaPrice * amountOfPizzaToOrder;

console.log(
  "New pizza order (takeaway:",
  orderTakeaway + "):",
  amountOfPizzaToOrder,
  myFavoritePizza + ". Total cost for the order is:",
  totalPrice,
  "kroner."
);
