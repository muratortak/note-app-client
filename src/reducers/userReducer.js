import * as actions from '../constants/action-types';

const initialState = {
  user: {},
  loading: false,
  hasError: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.USER_REGISTER:
      return { ...state, loading: true };
    case actions.USER_REGISTER_SUCCESS:
      return { user: action.payload, loading: false, hasError: false };
    case actions.USER_REGISTER_FAILURE:
      return { ...state, loading: false, hasError: true };
    // App Login
    case actions.USER_LOGIN:
      return { ...state, loading: true };
    case actions.USER_LOGIN_SUCCESS:
      return { user: action.payload, loading: false, hasError: false };
    case actions.USER_LOGIN_FAILURE:
      return { ...state, loading: false, hasError: true };
    // Google Login
    case actions.USER_GOOGLE_LOGIN:
      return { ...state, loading: true };
    case actions.USER_GOOGLE_LOGIN_SUCCESS:
      return { user: action.payload, loading: false, hasError: false };
    case actions.USER_GOOGLE_LOGIN_FAILURE:
      return { ...state, loading: false, hasError: true };
    case actions.USER_LOGOUT:
      // storage.removeItem('persist:root');
      return { ...state, loading: true };
      // return { state: undefined, loading: true };
    case actions.USER_LOGOUT_SUCCESS:
      return { user: action.payload, loading: false, hasError: false };
    case actions.USER_LOGOUT_FAILURE:
      return { ...state, loading: false, hasError: true };
    case actions.USER_GET_ME:
      return { user: action.payload, loading: false, hasError: false };
    case actions.USER_UPDATE_PROFILE:
      return { ...state, loading: true };
    case actions.USER_UPDATE_PROFILE_SUCCESS:
      return { user: action.payload, loading: false, hasError: false };
    case actions.USER_UPDATE_PROFILE_FAILURE:
      return { ...state, loading: false, hasError: true };
    case actions.UNLOCK_PWD:
      return { ...state, loading: true, hasError: false};
    case actions.UNLOCK_PWD_SUCCESS:
      return { ...state, loading: false, hasError: false};
    case actions.UNLOCK_PWD_FAILURE:
      return { ...state, loading: false, hasError: true};
    default:
      return state;
  }
}
