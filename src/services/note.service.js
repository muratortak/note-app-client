import axios from 'axios';

export async function getAllNotes() {
  let notes;
  try {
    // notes = await axios.get('http://localhost:3000/notes', { withCredentials: true });
    let response = await fetch('http://localhost:3000/notes', {method: 'GET', mode: 'cors', credentials: 'include' } );
    notes = await response.text();
    notes = JSON.parse(notes);
    notes = notes.notesReturn;
    // console.log('notes in service ', notes);
  } catch (err) {
    console.log(err);
  }
  // return notes.data.notes;
  return notes;
}

export async function getNewNote() {

}

export async function updateNote(note) {
  let result;
  try {
    result = await axios.put('http://localhost:3000/note', note);
  } catch (err) {
    console.log(err);
  }

  return result;
}

export async function saveLocation(note) {
  let result;
  console.log("inside service before try: ", note);
  try {
    console.log("inside service try before axios call: ", note);
    let response = await fetch('http://localhost:3000/savelocation', 
      {
        method: 'POST', 
        mode: 'cors', 
        credentials: 'include', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(note)
      }
    );
    console.log("inside service inside try: ", result);
    result = await response.text();
    result = JSON.parse(result);
    result = result.notesReturn;
  } catch (err) {
    console.log('error in savelocation in Note Service', err)
  }

  return result;
}

export async function saveNewNote(note) {
  let result; 
  try {
    let response = await fetch('http://localhost:3000/addNote', 
      {
        method: 'POST', 
        mode: 'cors', 
        credentials: 'include', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(note)
      }
    );
    result = await response.text();
    result = JSON.parse(result);
    result = result.notesReturn;
  } catch(err) {
    console.log("Error while saving a new note: ", err);
  }
  console.log("result in note service save  new note: ", result);
  return result;
}



export async function deleteNote(noteID) {
  let result; 
  try {
    let response = await fetch('http://localhost:3000/deleteNote/' + noteID, 
      {
        method: 'GET', 
        mode: 'cors', 
        credentials: 'include', 
        headers: {'Content-Type': 'application/json'},
      }
    );
    result = await response.text();
    result = JSON.parse(result);
    result = result.notesReturn;
  } catch(err) {
    console.log("Error while saving a new note: ", err);
  }
  console.log("result in note service save  new note: ", result);
  return result;
}
