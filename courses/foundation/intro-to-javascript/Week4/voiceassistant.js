let userName = "";
let toDoList = [];

function getReply(command) {
  //takes the command and replies
  if (command.includes("Hello my name is")) {
    return extractName(command);
  } else if (command == "What is my name?") {
    return getUserName();
  } else if (command.startsWith("Add ") && command.endsWith(" to my todo")) {
    return addToDo(command);
  } else if (
    command.startsWith("Remove ") &&
    command.endsWith(" from my todo")
  ) {
    return removeToDo(command);
  } else if (command == "What is on my todo") {
    return printToDoList();
  } else if (command == "What day is it today?") {
    return getToday();
  } else if (command.includes("What is")) {
    return simpleMath(command);
  } else if (command.startsWith("Set a timer for ")) {
    return setTimer(command);
  } else if (command === "Tell me your name") {
    return yourName(command);
  }
}

function extractName(str) {
  const match = str.match(/my name is ([a-z ]+)/i);
  userName = match ? match[1].trim() : null;
  return "Nice to meet you " + userName;
}

function getUserName() {
  if (userName == "") {
    return "You haven't given your name, please use the first command";
  } else {
    return `Your name is ${userName}`;
  }
}

function addToDo(command) {
  if (command.startsWith("Add ") && command.endsWith(" to my todo")) {
    const activity = command.replace("Add ", "").replace(" to my todo", "");
    toDoList.push(activity);
    return `${activity} added to your todo`;
  }
}

function removeToDo(command) {
  if (command.startsWith("Remove ") && command.endsWith(" from my todo")) {
    const activity = command
      .replace("Remove ", "")
      .replace(" from my todo", "");

    const newList = toDoList.filter((item) => item !== activity);

    if (newList.length === toDoList.length) {
      return `${activity} is not in your todo list`;
    } else {
      toDoList = newList;
      return `${activity} removed from your todo`;
    }
  }
}

function printToDoList(command) {
  return `You have ${toDoList.length} todos - ${toDoList}`;
}

function getToday() {
  const today = new Date();
  const date = today.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = monthNames[today.getMonth()];
  const year = today.getFullYear();

  return `${date}. of ${month} ${year}`;
}

function simpleMath(command) {
  const numberString = command.replace("What is ", "");
  const num = numberString.split(" ");
  const a = parseInt(num[0]);
  const b = parseInt(num[2]);
  let result;

  if (num[1] === "+") {
    result = a + b;
  } else if (num[1] === "-") {
    result = a - b;
  } else if (num[1] === "*") {
    result = a * b;
  } else if (num[1] === "/") {
    result = a / b;
  } else {
    return "Unknown Operation";
  }
  return result;
}

function setTimer(command) {
  let minutes = parseInt(
    command.replace("Set a timer for ", "").replace(" minutes", "")
  );
  setTimeout(() => console.log("Timer done"), minutes * 60 * 1000);
  return `Timer is set for ${minutes} minute${minutes !== 1 ? "s" : ""}`;
}

function yourName() {
  return "I am your voice assistant";
}

console.log(getReply("Hello my name is Benjamin"));
console.log(getReply("What is my name?"));
console.log(getReply("Add fishing to my todo"));
console.log(getReply("Add washing to my todo"));
console.log(getReply("Add playing to my todo"));
console.log(getReply("Remove cleaning from my todo"));
console.log(getReply("Remove fishing from my todo"));
console.log(getReply("Add singing in the shower to my todo"));
console.log(getReply("What day is it today?"));
console.log(getReply("What is 4 * 10"));
console.log(getReply("What is 3 + 3"));
console.log(getReply("What is 50 / 10"));
console.log(getReply("What is 27 - 10"));
console.log(getReply("Tell me your name"));
console.log(getReply("Set a timer for 1 minutes"));
