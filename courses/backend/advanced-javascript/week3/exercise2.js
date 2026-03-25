// Exercise 2: Tea Details - Create a function that gets full details for a tea, including its current stock

const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

function getTeaDetails(id) {
  const teaPromise = fetch(`${API_BASE}/teas/${id}`).then((res) => res.json());

  const inventoryPromise = fetch(`${API_BASE}/inventory`).then((res) =>
    res.json()
  );

  return Promise.all([teaPromise, inventoryPromise])
    .then(([tea, inventory]) => {
      const item = inventory.find((tea) => tea.teaId === id);
      return {
        ...tea,
        stock: item ? item.stockCount : 0,
      };
    })
    .catch((error) => {
      console.error("Failed to fetch tea details:", error);
    });
}
// Test it:
getTeaDetails(1).then((tea) => {
  console.log(`${tea.name} (${tea.origin})`);
  console.log(`Price: ${tea.pricePerGram} DKK/gram`);
  console.log(`Stock: ${tea.stock} grams`);
  console.log(`Value: ${(tea.pricePerGram * tea.stock).toFixed(2)} DKK`);
});
