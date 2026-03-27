//Exercise 1: Tea Search - Create a function that searches for teas by name

const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

async function searchTeas(query) {
  // 1. Fetch all teas from the API
  try {
    const allTeasResponse = await fetch(`${API_BASE}/teas`);
    const teas = await allTeasResponse.json();

    const queryTeas = teas.filter((tea) =>
      tea.name.toLowerCase().includes(query.toLowerCase())
    );
    return queryTeas;
  } catch (error) {
    console.error("Error fetching teas:", error.message);
  }
}

// Test it:
searchTeas("pearl").then((teas) => {
  console.log("Search results for 'pearl':");
  teas.forEach((tea) => console.log(`- ${tea.name}`));
});
