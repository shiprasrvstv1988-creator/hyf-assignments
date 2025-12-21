import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello from exercise 1!");
});

app.get("/currentYear", (req, res) => {
  // TODO: Implement this function to return a JSON object containing the current year
  const currentYear = new Date().getFullYear();

  res.send("The current year is: " + currentYear);
});

app.listen(port, () => {
  console.log(`> Ready on http://localhost:3000`);
});
