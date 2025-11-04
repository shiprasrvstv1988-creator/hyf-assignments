const firstWords = [
  "Easy",
  "Quick",
  "Smart",
  "Bright",
  "Fast",
  "Sharp",
  "Clever",
  "Wise",
  "Brave",
  "Bold",
];
const secondWords = [
  "Creations",
  "Plans",
  "Projects",
  "Ideas",
  "Developments",
  "Strategies",
  "Innovations",
  "Concepts",
  "Solutions",
  "Designs",
];

const randomNumber = Math.floor(Math.random() * 10);

const startupName = firstWords[randomNumber] + " " + secondWords[randomNumber];

console.log(startupName);

const characterNumber = startupName.length;

console.log(
  "The startup name is " +
    startupName +
    " and it contains " +
    characterNumber +
    " characters."
);
