const notes = [];

function saveNote(content, id) {
  notes.push({
    content,
    id,
  });
}

saveNote("Pick up groceries", 1);
saveNote("Do laundry", 2);
saveNote("Book tickets", 3);

console.log(notes);

function getNote(id) {
  for (i = 0; i < notes.length; i++)
    if (notes[i].id === id) {
      return notes[i];
    }
}

const firstNote = getNote(3);
console.log(firstNote);

function logOutNotesFormatted() {
  let allNotes = "";

  for (let i = 0; i < notes.length; i++) {
    allNotes +=
      "The note with id: " +
      notes[i].id +
      " , has the following note text:" +
      notes[i].content +
      "\n";
  }
  return allNotes;
}

console.log(logOutNotesFormatted());
