const names = [
  "Peter",
  "Ahmad",
  "Yana",
  "kristina",
  "Rasmus",
  "Samuel",
  "Katrine",
  "Tala",
];
const nameToRemove = "Yana";

for (let i = 0; i < names.length; i++) {
  if (names[i] === nameToRemove) {
    names.splice(i, 1);
    //Start removing at index i and remove 1 item
  }
}

console.log(names);

const travelInformation = {
  speed: 50,
  destinationDistance: 456,
};

function calculateTravelTime(info) {
  const totalHours = info.destinationDistance / info.speed;
  const hours = Math.floor(totalHours);
  const minutes = Math.round((totalHours - hours) * 60);

  return hours + " hours and " + minutes + " minutes";
}
const travelTime = calculateTravelTime(travelInformation);

console.log(travelTime);

const seriesDurations = [
  {
    title: "Friends",
    days: 3,
    hours: 11,
    minutes: 36,
  },
  {
    title: "The summer I turned pretty",
    days: 13,
    hours: 6,
    minutes: 56,
  },
  {
    title: "Young Sheldon",
    days: 1,
    hours: 23,
    minutes: 0,
  },
];

function logOutSeriesText(seriesDurations) {
  const lifeInMinutes = 80 * 365 * 24 * 60;

  let totalPercentage = 0;
  let result = "";

  for (let i = 0; i < seriesDurations.length; i++) {
    const series = seriesDurations[i];
    const seriesMinutes =
      series.days * 24 * 60 + series.hours * 60 + series.minutes;
    const percentage = (seriesMinutes / lifeInMinutes) * 100;
    totalPercentage += percentage;

    result +=
      series.title + " took " + percentage.toFixed(3) + "% of my life. \n";
  }
  result += "In total, that is " + totalPercentage.toFixed(3) + "% of my life";
  return result;
}
console.log(logOutSeriesText(seriesDurations));
