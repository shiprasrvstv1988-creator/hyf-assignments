//Exercise 4: Stock Check - Create a function that checks if all items in an order are in stock:

const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

export async function checkOrderStock(items) {
  try {
    const response = await fetch(`${API_BASE}/inventory`);
    const inventory = await response.json();

    const shortages = items.reduce((acc, item) => {
      const stockItem = inventory.find((tea) => tea.teaId === item.teaId);

      if (!stockItem) {
        acc.push({
          teaId: item.teaId,
          name: "Unknown tea",
          needed: item.grams,
          available: 0,
        });
      } else if (stockItem.stockCount < item.grams) {
        acc.push({
          teaId: item.teaId,
          name: stockItem.teaName,
          needed: item.grams,
          available: stockItem.stockCount,
        });
      }

      return acc;
    }, []);

    return {
      inStock: shortages.length === 0,
      shortages,
    };
  } catch (error) {
    console.error("Error checking stock:", error);
  }
}
const largeOrder = [
  { teaId: 1, grams: 100 },
  { teaId: 2, grams: 500 }, // might be out of stock
  { teaId: 3, grams: 9999 }, // definitely out of stock
  { teaId: 100, grams: 85 }, //tea id not available
];

checkOrderStock(largeOrder).then((result) => {
  if (result.inStock) {
    console.log("All items in stock!");
  } else {
    console.log("Shortages:");
    result.shortages.forEach((s) => {
      console.log(`- ${s.name}: need ${s.needed}, have ${s.available}`);
    });
  }
});
