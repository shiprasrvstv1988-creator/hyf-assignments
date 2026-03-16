import { teas } from "../data/teas.js";

//Inventory Report

function inventoryReport(teas) {
  let teasInStock = 0;
  let teasOutOfStock = 0;
  let totalInventoryValue = 0;
  let totalPricePerGram = 0;

  teas.forEach((tea) => {
    if (tea.inStock) {
      teasInStock++;
    } else {
      teasOutOfStock++;
    }
    totalInventoryValue += tea.pricePerGram * tea.stockCount;
    totalPricePerGram += tea.pricePerGram;
  });
  const teasAvgPricePerGram = totalPricePerGram / teas.length;

  return {
    totalTeas: teas.length,
    inStock: teasInStock,
    outOfStock: teasOutOfStock,
    totalInventoryValue: totalInventoryValue,
    averagePrice: teasAvgPricePerGram,
  };
}
console.log(inventoryReport(teas));
