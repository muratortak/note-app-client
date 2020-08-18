import * as actions from '../constants/action-types';

const initialState = {
  notes: [],
  maxZIndex: 0,
  loading: false,
  hasError: false,
};

export default function notesReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_NOTES:
      console.log('action payload in notes get ');
      return { ...state, loading: true };
    case actions.GET_NOTES_SUCCESS:
      console.log('action payload in notes get success', action.payload);
      return { notes: action.payload.notes, maxZIndex: action.payload.maxZIndex, loading: false, hasError: false };
    case actions.GET_NOTES_FAILURE:
      console.log('action payload in notes get failure', action.payload);
      return { ...state, loading: false, hasError: true };
    case actions.ADD_NEW_NOTE:
      return {
        ...state,
        loading: true,
        hasError: false,
      };
    case actions.ADD_NEW_NOTE_SUCCESS:
      console.log("action payload in reducers: ", action.payload)
      return {
        notes: action.payload,
        loading: false,
        hasError: false,
      };
    case actions.UPDATE_NOTE:
      return { notes: action.payload, maxZIndex: action.payload.maxZIndex, loading: false, hasError: false };
    case actions.UPDATE_ZINDEX:
    console.log('action payload in update zindex reducers: ', action.payload);
    console.log('state in update zindex reducers: ', state);
      let newNotes = state.notes.map(note => {
                    if(note._id === action.payload.id) {
                      note.zIndex = action.payload.zIndex;
                    }
                    return {
                      note
                    }
                  });
      return { notes: newNotes, maxZIndex: action.payload.maxZIndex};
    case action.UPDATE_LOCATION:
      return {...state, loading: true}
    case action.UPDATE_LOCATION_SUCCESS:
      return {notes: action.payload}
    case action.UPDATE_LOCATION_FAILURE:
      return {notes: action.payload}
    default:
      return state;
  }
}
