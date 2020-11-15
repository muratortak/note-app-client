const REACT_APP_AWS_URI = process.env.REACT_APP_AWS_URI;

export async function getAllNotes() {
  let notes;
  try {
    let response = await fetch(`${REACT_APP_AWS_URI}note/notes`, {method: 'GET', mode: 'cors', credentials: 'include' } );
    notes = await response.text();
    notes = JSON.parse(notes);
    notes = notes.notes;
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
    let response = await fetch(`${REACT_APP_AWS_URI}note/updateNote`, 
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
    result = result.notes;
  } catch(err) {
    console.log("Error while saving a new note: ", err);
  }
  return result;
}

export async function saveLocation(note) {
  let result;
  try {
    let response = await fetch(`${REACT_APP_AWS_URI}note/savelocation`, 
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
  } catch (err) {
    console.log('error in savelocation in Note Service', err)
  }

  return result;
}

export async function saveNewNote(note) {
  let result; 
  try {
    let response = await fetch(`${REACT_APP_AWS_URI}note/addNote`, 
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
    result = result.notes;
  } catch(err) {
    console.log("Error while saving a new note: ", err);
  }

  return result;
}



export async function deleteNote(noteID) {
  let result; 
  try {
    let response = await fetch(`${REACT_APP_AWS_URI}note/deleteNote/${noteID}`, 
      {
        method: 'GET', 
        mode: 'cors', 
        credentials: 'include', 
        headers: {'Content-Type': 'application/json'},
      }
    );
    result = await response.text();
    result = JSON.parse(result);
    result = result.notes;
  } catch(err) {
    console.log("Error while saving a new note: ", err);
  }
  
  return result;
}
