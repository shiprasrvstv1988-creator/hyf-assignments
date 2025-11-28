const user = {
  userName: "",
  toDoList: [],
};

//Takes the command and replies
function getReply(command) {
  command = command.toLowerCase();
  // adding guard clause
  if (!command || typeof command !== "string") {
    return "Invalid command";
  }

  if (command.includes("hello my name is")) {
    return extractName(command);
  }

  if (command == "what is my name?") {
    return getUserName();
  }

  if (command.startsWith("add") && command.endsWith(" to my todo")) {
    return addToDo(command);
  }

  if (command.startsWith("remove") && command.endsWith(" from my todo")) {
    return removeToDo(command);
  }

  if (command == "what is on my todo") {
    return printToDoList();
  }

  if (command == "what day is it today?") {
    return getToday();
  }

  if (command.includes("what is")) {
    return simpleMath(command);
  }

  if (command.startsWith("set a timer for ")) {
    return setTimer(command);
  }

  if (command === "tell me your name") {
    return yourName(command);
  }

  return "Sorry, I don't understand that command.";
}

// NAME FUNCTIONS
function extractName(str) {
  // str.match() string function that applies regex
  // regex /my name is ([a-z]+ /i) - so it matches exact text for "my name is" ,
  // then matches letters from (a-z) or spaces , + takes one or more characters, () captures and separate the username,
  // /i makes it case-insensitive.
  const match = str.match(/my name is ([a-z ]+)/i);
  user.userName = match ? match[1].trim() : null;
  if (user.userName) {
    return "Nice to meet you " + user.userName;
  } else {
    return "Please enter a valid name.";
  }
}

function getUserName() {
  //const userName = "";
  if (user.userName === "") {
    return "You haven't given your name, please use the first command";
  } else {
    return `Your name is ${user.userName}`;
  }
}

// TO DO FUNCTIONS
function addToDo(command) {
  const activity = command.replace("add ", "").replace(" to my todo", "");
  user.toDoList.push(activity);
  return `${activity} added to your todo`;
}

function removeToDo(command) {
  const activity = command.replace("remove ", "").replace(" from my todo", "");

  const newList = user.toDoList.filter((item) => item !== activity);

  if (newList.length === user.toDoList.length) {
    return `${activity} is not in your todo list`;
  } else {
    user.toDoList = newList;
    return `${activity} removed from your todo`;
  }
}

function printToDoList(command) {
  return `You have ${user.toDoList.length} todos - ${user.toDoList}`;
}

// DATE FUNCTION
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

//SIMPLE MATH FUNCTIONS
function simpleMath(command) {
  const numberString = command.replace("what is ", "");
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

// TIMER FUNCTION
function setTimer(command) {
  const minutes = parseInt(
    command.replace("set a timer for ", "").replace(" minutes", "")
  );
  setTimeout(() => console.log("Timer done"), minutes * 60 * 1000);
  return `Timer is set for ${minutes} minute${minutes !== 1 ? "s" : ""}`;
}

//BOT NAME
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
console.log(getReply("Hello my name is "));
console.log(getReply("Set a timer for 1 minutes"));
