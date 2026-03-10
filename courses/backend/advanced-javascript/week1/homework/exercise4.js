import { teas } from "../data/teas.js";

//Teas by Origin
function teasByOrigin(teas) {
  const result = {};

  teas.forEach((tea) => {
    (result[tea.origin] = result[tea.origin] || []).push(tea.name);
  });
  return result;
}
console.log(teasByOrigin(teas));
