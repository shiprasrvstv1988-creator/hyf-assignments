import { teas } from "../data/teas.js";

//Rewrite with Array Methods

const teaCaffeineLevelOtherThanNone = teas
  .filter((tea) => tea.caffeineLevel !== "none")
  .map((tea) => tea.name.toUpperCase());

//console.log(teaCaffeineLevelOtherThanNone);
