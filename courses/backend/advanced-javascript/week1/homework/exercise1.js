import { teas } from "../data/teas.js";

//Rewrite with Array Methods

const caffeinatedTeas = teas
  .filter((tea) => tea.caffeineLevel !== "none")
  .map((tea) => tea.name.toUpperCase());

console.log(caffeinatedTeas);
