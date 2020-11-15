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
      return { ...state, loading: true };
    case actions.GET_NOTES_SUCCESS:
      return { 
        notes: action.payload.notes, 
        maxZIndex: action.payload.maxZIndex, 
        loading: false, 
        hasError: false 
      };
    case actions.GET_NOTES_FAILURE:
      return { 
        ...state, 
        loading: false, 
        hasError: true 
      };
    case actions.ADD_NEW_NOTE:
      return {
        ...state,
        loading: true,
        hasError: false,
      };
    case actions.ADD_NEW_NOTE_SUCCESS:
      var newArrayAdded = [];
      newArrayAdded.push(action.payload);
      return {
        notes: [...state.notes, ...newArrayAdded],
        loading: false,
        hasError: false,
      };
    case actions.SAVE_NEW_NOTE:
      return {
        ...state,
        loading: true,
        hasError: false,
      };
    case actions.SAVE_NEW_NOTE_SUCCESS:
      return {
        notes: action.payload,
        loading: false,
        hasError: false,
      };
    case actions.SAVE_NEW_NOTE_FAILURE:
      return {
        ...state,
        loading: false,
        hasError: true,
      };
    case actions.DELETE_NOTE:
      return {
        ...state,
        loading: true,
        hasError: false,
      };
    case actions.DELETE_NOTE_SUCCESS:
      return {
        notes: action.payload,
        loading: false,
        hasError: false,
      };
    case actions.DELETE_NOTE_FAILURE:
      return {
        ...state,
        loading: false,
        hasError: true,
      };
    case actions.UPDATE_NOTE:
      return { 
        ...state,
        loading: true, 
        hasError: false 
      };
    case actions.UPDATE_NOTE_SUCCESS:
        return { 
          notes: action.payload,
          loading: false, 
          hasError: false 
        };  
    case actions.UPDATE_NOTE_FAILURE:
      return { 
        ...state,
        loading: false, 
        hasError: true 
      };
      case actions.UPDATE_ZINDEX:
      let newNotes = state.notes.map(note => {
                    if(note._id === action.payload.id) {
                      note.zIndex = action.payload.zIndex;
                    }
                    return {
                      note
                    }
                  });
      return { 
        notes: newNotes, 
        maxZIndex: action.payload.maxZIndex
      };
    case actions.UPDATE_LOCATION:
      return {
        ...state, 
        loading: true,
        hasError: false
      }
    case actions.UPDATE_LOCATION_SUCCESS:
      return {
        notes: action.payload,
        loading: false,
        hasError: false
      }
    case actions.UPDATE_LOCATION_FAILURE:
      return {
        ...state,
        loading: false,
        hasError: true
      }
    case actions.CLEAR_NOTE:
      return { 
        notes: [] 
      }
    default:
      return state;
  }
}
