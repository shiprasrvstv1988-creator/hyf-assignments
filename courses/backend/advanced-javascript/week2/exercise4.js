import { teas } from "../week1/data/teas.js";
import fs from "fs";

function generateInventoryReport(callback) {
  fs.readFile("./inventory-updates.json", "utf8", (error, data) => {
    if (error) {
      callback(error, null);
      return;
    }
    //Parse updates
    const inventoryUpdates = JSON.parse(data);

    //Aggregate changes per teaId
    const changesByTea = inventoryUpdates.reduce((acc, update) => {
      const { teaId, change } = update;

      if (!acc[teaId]) {
        acc[teaId] = 0;
      }

      acc[teaId] += change;
      return acc;
    }, {});

    //Build report
    let report = "Inventory Report:\n";

    teas.forEach((tea) => {
      const change = changesByTea[tea.id] || 0;
      const newStock = tea.stockCount + change;

      report += `- ${tea.name}: was ${tea.stockCount}, change ${change}, now ${newStock}`;

      if (newStock < 0) {
        report += " (NEGATIVE!)";
      }
      report += "\n";
    });

    //Return report
    callback(null, report);
  });
}

// Run it
generateInventoryReport((error, report) => {
  if (error) {
    console.error("Failed:", error.message);
    return;
  }
  console.log(report);
});
