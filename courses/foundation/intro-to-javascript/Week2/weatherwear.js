function whatToWear(temperature) {
  if (temperature < 0) {
    return "Wear heavy coat, boots, winter cap, gloves, and scarf.";
  } else if (temperature >= 0 && temperature < 10) {
    return "Wear a warm jacket and hat.";
  } else if (temperature >= 10 && temperature < 20) {
    return "Wear a sweater.";
  } else if (temperature >= 20 && temperature < 30) {
    return "Wear short sleeves and light pants.";
  } else {
    return "Wear shorts and a t-shirt.";
  }
}
console.log(whatToWear(-3));
console.log(whatToWear(0));
console.log(whatToWear(19));
console.log(whatToWear(30));
console.log(whatToWear(50));
console.log(whatToWear(24));
