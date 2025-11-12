const today = new Date();
const todayWeekdayNumber = today.getDay();
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getEventWeekday(eventDayfromToday) {
  dayOfEvent = (todayWeekdayNumber + eventDayfromToday) % 7;
  return weekdays[dayOfEvent];
}

console.log(today);
console.log(todayWeekdayNumber);
console.log(getEventWeekday(9));
console.log(getEventWeekday(5));
console.log(getEventWeekday(3));
console.log(getEventWeekday(2));
