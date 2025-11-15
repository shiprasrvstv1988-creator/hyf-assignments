function getFullName(firstName, surname, useFormalName, gender) {
  if (!firstName.trim() || !surname.trim())
    return "Please provide your name and surname";
  let fullName = firstName + " " + surname;
  if (useFormalName) {
    if (gender === "male") {
      fullName = "Lord " + fullName;
    }
    if (gender === "female") {
      fullName = "Lady " + fullName;
    }
  }

  return fullName;
}

const fullName1 = getFullName("Hrithik", "Roshan", true, "male");
const fullName2 = getFullName("Shilpa", "Shetty", true, "female");
const fullName3 = getFullName(" ", " ", true, "male");

console.log(fullName1);
console.log(fullName2);
console.log(fullName3);
