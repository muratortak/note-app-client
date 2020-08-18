import * as noteConstants from '../constants/action-types';
import * as noteService from '../services/note.service';
import EmptyNote from '../helpers/EmptyNote';

const getNotes = () => ({
  type: noteConstants.GET_NOTES,
});

const getNotesSuccess = (notes) => ({
  type: noteConstants.GET_NOTES_SUCCESS,
  payload: notes,
});

const getNotesFailure = () => ({
  type: noteConstants.GET_NOTES_FAILURE,
});

const addNewNote = () => ({
  type: noteConstants.ADD_NEW_NOTE,
});

const addNewNoteSuccess = (newNote) => ({
  type: noteConstants.ADD_NEW_NOTE_SUCCESS,
  payload: newNote,
});

const updateNoteZIndex = (newNote) => {
  console.log('zIndex in action up: ', newNote)
  return {
  type: noteConstants.UPDATE_ZINDEX,
  payload: newNote,
}}

const saveNoteLocation = (note) => {
  console.log('note in save note location, ', note);
  return {
    type: noteConstants.UPDATE_LOCATION
  }
}

const saveNoteLocationSuccess = (note) => {
  return {
    type: noteConstants.UPDATE_LOCATION_SUCCESS,
    payload: note,
  }
}
const saveNoteLocationFailure = (note) => {
  return {
    type: noteConstants.UPDATE_LOCATION_FAILURE
  }
}
// TODO: Get Notes

export function getAllNotes() {
  return async (dispatch) => {
    dispatch(getNotes());
    try {
      const notes = await noteService.getAllNotes();
      console.log('notes in actions: ', notes);
      dispatch(getNotesSuccess({ notes, maxZIndex: notes[0].maxZIndex }));
    } catch (err) {
      console.log('get all notes error: ', err);
      dispatch(getNotesFailure());
    }
  };
}

export function addNewNoteFunc(notes) {
  const newNotes = notes.map((arr) => arr);
  newNotes.unshift(EmptyNote);
  console.log("New notes in: ", newNotes);
  return (dispatch) => {
    dispatch(addNewNote());
    dispatch(addNewNoteSuccess(newNotes));
    console.log("new notes after add new note success: ", newNotes);
  };
}

export function updateNote(note) {

}

export function updateNoteZIndexFunc(newNote) {
  return (dispatch) => {
    console.log('zindex actions: ', newNote);

    dispatch(updateNoteZIndex(newNote));
  }
}

export function saveNoteLocationFunc(note) {
  var newnote = note;
  return async (dispatch) => {
    dispatch(saveNoteLocation());
    console.log("After dispatch in note actions")
    try{
      console.log("inside try in notes.action, ", newnote);
      const note = await noteService.saveLocation(newnote);
      // dispatch(saveNoteLocationSuccess({note}))
    } catch (err) {
      console.log("err in catch in note.action")
      dispatch(saveNoteLocationFailure())
    }
  }
}


