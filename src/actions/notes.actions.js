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

const saveNewNote = () => ({
  type: noteConstants.SAVE_NEW_NOTE,
});

const saveNewNoteSuccess = (newNote) => ({
  type: noteConstants.SAVE_NEW_NOTE_SUCCESS,
  payload: newNote,
});

const saveNewNoteFailure = () => ({
  type: noteConstants.SAVE_NEW_NOTE_FAILURE
});

const updateNote = () => ({
  type: noteConstants.UPDATE_NOTE,
})

const updateNoteSuccess = (updatedNote) => ({
  type: noteConstants.UPDATE_NOTE_SUCCESS,
  payload: updatedNote,
})

const updateNoteFailure = () => ({
  type: noteConstants.UPDATE_NOTE_FAILURE,
})

const deleteNote = () => ({
  type: noteConstants.DELETE_NOTE,
});

const deleteNoteSuccess = (newNote) => ({
  type: noteConstants.DELETE_NOTE_SUCCESS,
  payload: newNote,
});

const deleteNoteFailure = () => ({
  type: noteConstants.DELETE_NOTE_FAILURE
});

const updateNoteZIndex = (newNote) => {
  return {
  type: noteConstants.UPDATE_ZINDEX,
  payload: newNote,
}}

const saveNoteLocation = () => {
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
      dispatch(getNotesSuccess({ notes }));
    } catch (err) {

      dispatch(getNotesFailure());
    }
  };
}

export function addNewNoteFunc() {
  return (dispatch) => {
    dispatch(addNewNote());
    dispatch(addNewNoteSuccess(EmptyNote));
  };
}

export function saveNewNoteFunc(newNote) {
  return async (dispatch) => {
    try{
      dispatch(saveNewNote());
      // Returning all the notes from the server-side.
      // TODO: Refine to only return the saved note and merge it back to the State.
      const notes = await noteService.saveNewNote(newNote);
      dispatch(saveNewNoteSuccess(notes));
    } catch(err) {
      dispatch(saveNewNoteFailure());
    }
  };
}

export function deleteNoteFunc(noteID) {
  return async (dispatch) => {
    try{
      dispatch(deleteNote());
      // Returning all the notes from the server-side.
      // TODO: Refine to only return the saved note and merge it back to the State.
      const notes = await noteService.deleteNote(noteID);
      dispatch(deleteNoteSuccess(notes));
    } catch(err) {
      dispatch(deleteNoteFailure());
    }
  };
}

export function updateNoteFunc(updatedNote) {
  return async (dispatch) => {
    try{
      dispatch(updateNote());
      // Returning all the notes from the server-side.
      // TODO: Refine to only return the saved note and merge it back to the State.
      const notes = await noteService.updateNote(updatedNote);
      dispatch(updateNoteSuccess(notes));
    } catch(err) {
      dispatch(updateNoteFailure());
    }
  };
}

export function updateNoteZIndexFunc(newNote) {
  return (dispatch) => {
    dispatch(updateNoteZIndex(newNote));
  }
}

export function saveNoteLocationFunc(note) {
  var newnote = note;
  return async (dispatch) => {

    try{
      dispatch(saveNoteLocation());
      // Returning all the notes from the server-side.
      // TODO: Refine to only return the saved note and merge it back to the State.
      const note = await noteService.saveLocation(newnote);
      dispatch(saveNoteLocationSuccess(note))
    } catch (err) {

      dispatch(saveNoteLocationFailure())
    }
  }
}


