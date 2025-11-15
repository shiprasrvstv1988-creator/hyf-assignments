const class07Students = [];
function addStudentToClass(studentName) {
  if (!studentName.trim()) {
    return "Cannot add an empty name";
  }
  if (class07Students.length >= 6 && studentName !== "Queen") {
    return "Cannot add more students to class 07";
  }
  for (let i = 0; i < class07Students.length; i++) {
    if (class07Students[i] === studentName) {
      return "Student " + studentName + " is already in the class.";
    }
  }
  class07Students.push(studentName);
  return studentName + " added to class 07";
}

function getNumberOfStudents() {
  return class07Students.length;
}

console.log(addStudentToClass("        "));
console.log(addStudentToClass("krish"));
console.log(addStudentToClass("Vivaan"));
console.log(addStudentToClass("Aditiya"));
console.log(addStudentToClass("krish"));
console.log(addStudentToClass("Mary"));
console.log(addStudentToClass("Anna"));
console.log(addStudentToClass("Emma"));
console.log(addStudentToClass("Abhinav"));
console.log(addStudentToClass("Queen"));
console.log(addStudentToClass("Queen"));
