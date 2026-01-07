//setting up the events

const hogwartsHouse = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];

const houseColors = {
  Gryffindor: "#7F0909",
  Hufflepuff: "#EEE117",
  Ravenclaw: "#0E1A40",
  Slytherin: "#1A472A",
};

const generateBtn = document.querySelector(".generateBtn");
const output = document.querySelector(".output");

//Choosing a house

function getRandomHouse(inputName) {
  const randomIndex = Math.floor(Math.random() * hogwartsHouse.length);
  return hogwartsHouse[randomIndex];
}

generateBtn.addEventListener("click", function () {
  const inputName = document.getElementById("name").value;
  //console.log(inputName)

  if (inputName === "") {
    output.textContent = "Please enter your name";
    output.style.color = "red";
    return;
  }

  //Sorting hat delay
  output.textContent = "The Sorting Hat is thinking...";
  output.style.color = "black";
  output.style.fontWeight = "normal";

  setTimeout(function () {
    const house = getRandomHouse();

    output.textContent = `${inputName} belongs to ${house}`;
    output.style.color = "White";
    output.style.fontWeight = "bold";

    // Change background color based on house
    document.body.style.backgroundColor = houseColors[house];
  }, 1500); // 1.5 second delay
});
