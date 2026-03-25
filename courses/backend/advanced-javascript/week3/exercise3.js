//Exercise 3: Order Calculator - Create a function that calculates the total for an order

const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

export async function calculateOrderTotal(items) {
  try {
    const allTeasResponse = await fetch(`${API_BASE}/teas`);
    const teas = await allTeasResponse.json();

    const total = items.reduce((sum, item) => {
      const tea = teas.find((tea) => tea.id === item.teaId);

      return sum + tea.pricePerGram * item.grams;
    }, 0);

    return total;
  } catch (error) {
    console.error("Something went wrong:", error.message);
    throw error;
  }
}

const order = [
  { teaId: 1, grams: 100 },
  { teaId: 3, grams: 50 },
  { teaId: 8, grams: 200 },
];

calculateOrderTotal(order).then((total) =>
  console.log(`Order total: ${total.toFixed(2)} DKK`)
);
