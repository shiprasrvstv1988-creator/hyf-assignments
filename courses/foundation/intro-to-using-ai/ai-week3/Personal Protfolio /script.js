// Select the button
const button = document.getElementById("mybutton");
let isOriginal = true; // tracks which image is currently showing

button.addEventListener("click", () => {
  if (isOriginal) {
    document.body.style.backgroundImage = "url('Images/background.jpg')";
  } else {
    document.body.style.backgroundImage = "url('Images/background1.jpg')";
  }

  // flip the flag each time
  isOriginal = !isOriginal;
});
