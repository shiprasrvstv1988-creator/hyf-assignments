// Peter's house details
const peterWidth = 8;
const peterHeight = 10;
const peterDepth = 10;
const peterGardenSizeInM2 = 100;
const peterHouseActualCost = 2500000;

const peterVolumeInMeters = peterWidth * peterHeight * peterDepth;

const peterEstimatedHouseCost =
  peterVolumeInMeters * 2.5 * 1000 + peterGardenSizeInM2 * 300;

const peterDifferenceInCost = peterHouseActualCost - peterEstimatedHouseCost;

// to figure out if Peter is paying too much or too little
if (peterDifferenceInCost > 0) {
  console.log(
    "Peter is paying too much by " + peterDifferenceInCost + " kroner."
  );
} else if (peterDifferenceInCost < 0) {
  console.log(
    "Peter is paying too little by " + -peterDifferenceInCost + " kroner."
  );
}

console.log(peterDifferenceInCost);

// Julia's house details
const juliaWidth = 5;
const juliaHeight = 8;
const juliaDepth = 11;
const juliaGardenSizeInM2 = 70;
const juliaHouseActualCost = 1000000;

const juliaVolumeInMeters = juliaWidth * juliaHeight * juliaDepth;

const juliaEstimatedHouseCost =
  juliaVolumeInMeters * 2.5 * 1000 + juliaGardenSizeInM2 * 300;

const juliaDifferenceInCost = juliaHouseActualCost - juliaEstimatedHouseCost;

// to figure out if Julia is paying too much or too little
if (juliaDifferenceInCost > 0) {
  console.log(
    "Julia is paying too much by " + juliaDifferenceInCost + " kroner."
  );
} else if (juliaDifferenceInCost < 0) {
  console.log(
    "Julia is paying too little by " + -juliaDifferenceInCost + " kroner."
  );
}

console.log(juliaDifferenceInCost);
