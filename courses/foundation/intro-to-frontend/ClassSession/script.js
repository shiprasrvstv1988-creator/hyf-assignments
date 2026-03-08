//Favourite dishes
const favDishes = ["Biryani", "Chocolate", "Pastries", "Cake"];

const ul = document.querySelector("#list");

for (let i = 0; i < favDishes.length; i++) {
  const li = document.createElement("li");

  li.textContent = favDishes[i];

  ul.appendChild(li);
}

//Podcast

const podcasts = [
  {
    name: "The mystery om of Johan Klausen Varbourg",
    imageUrl: "https://picsum.photos/536/354",
  },
  {
    name: "Tips about dogs with small legs",
    imageUrl: "https://picsum.photos/536/354",
  },
  {
    name: "You, me, we and us",
    imageUrl: "https://picsum.photos/536/354",
  },
  {
    name: "Breakfast news - Dinner edition",
  },
];

const ulPodcast = document.createElement("ul");

for (let i = 0; i < podcasts.length; i++) {
  const liPodcast = document.createElement("li");

  const h1 = document.createElement("h1");
  h1.innerHTML = podcasts[i].name;
  liPodcast.appendChild(h1);

  if (podcasts[i].imageUrl) {
    const img = document.createElement("img");
    img.src = podcasts[i].imageUrl;
    liPodcast.appendChild(img);
  }
  ulPodcast.appendChild(liPodcast);
}
document.body.appendChild(ulPodcast);

//Image inserter

function imageInserter(imageUrl, elementToAppendImageTo) {
  const img = document.createElement("img");
  img.src = imageUrl;

  elementToAppendImageTo.appendChild(img);
}
imageInserter("https://picsum.photos/536/354", document.querySelector("body"));

//Simple event listener

document.querySelector("button").addEventListener("click", function (event) {
  event.target.textContent = "Button clicked";
});

//Light mode dark mode
document.querySelector("button").addEventListener("click", function (event) {
  const body = document.querySelector("body");
  const button = document.querySelector("button");

  if (body.style.backgroundColor === "white") {
    body.style.backgroundColor = "red";
    body.style.color = "white";
    button.innerHTML = "Switch to light mode ";
  } else {
    body.style.backgroundColor = "white";
    body.style.color = "black";
    button.innerHTML = "Switch to dark mode ";
  }
});

//Astronauts in space
/* Create a element (div)
Add a line for the total number: There are X astronauts in space, they are:
Loop through astronautData.people
Append each astronaut’s name to the div
Append the div to the DOM */

fetch("http://api.open-notify.org/astros.json")
  .then((response) => response.json())
  .then((astronautData) => {
    const astronautNumber = document.createElement("div");
    astronautNumber.innerHTML = `There are ${astronautData.number} astronauts in space, they are :`;

    astronautData.people.forEach((person) => {
      const p = document.createElement("p");
      p.textContent = person.name;
      astronautNumber.appendChild(p);
    });
    document.body.appendChild(astronautNumber);
  });

//Dog fan website

//create an img element once
const dogRandomImage = document.createElement("img");
document.body.appendChild(dogRandomImage);

function showRandomImage() {
  fetch("https://dog.ceo/api/breeds/image/random")
    .then((response) => response.json())
    .then((dogImage) => {
      dogRandomImage.src = dogImage.message;
    });
}
showRandomImage();

// Fetch new image every 2 seconds
setInterval(showRandomImage, 2000);

//appendChild
const createBtn = document.getElementById("createBtn");
const createContainer = document.getElementById("createContainer");
createBtn.addEventListener("click", () => {
  // Create element
  const newParagraph = document.createElement("p");
  // Add text
  newParagraph.textContent = "This element was created with JavaScript";
  newParagraph.style.color = "red";
  createContainer.appendChild(newParagraph);
});

//insertBefore(check)

// Create a "li" element:
const list = document.createElement("li");
//Add a text:
list.textContent = "Water";

// Insert before existing child:
const existingList = document.getElementById("myList");
existingList.insertBefore(list, existingList.children[0]);
