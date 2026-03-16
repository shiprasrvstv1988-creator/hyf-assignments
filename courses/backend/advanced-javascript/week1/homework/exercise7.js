import { teas } from "../data/teas.js";

//Count by Type

const countByType = teas.reduce((counts, tea) => {
  if (!counts[tea.type]) {
    counts[tea.type] = 0;
  }
  counts[tea.type]++;
  return counts;
}, {});

console.log(countByType);
