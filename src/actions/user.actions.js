import * as userConstants from '../constants/action-types';
import * as userService from '../services/user.service';
import { history } from '../helpers/history';

const userRegister = () => ({
  type: userConstants.USER_REGISTER
});

const userRegisterSuccess = (user) => ({
  type: userConstants.USER_REGISTER_SUCCESS,
  payload: user
});

const userRegisterFailure = () => ({
  type: userConstants.USER_REGISTER_FAILURE
});

const userLogin = () => ({
  type: userConstants.USER_LOGIN,
});

const userLoginSuccess = (user) => ({
  type: userConstants.USER_LOGIN_SUCCESS,
  payload: user,
});

const userLoginFailure = () => ({
  type: userConstants.USER_LOGIN_FAILURE,
});


const userLogout = () => ({
  type: userConstants.USER_LOGOUT,
});

const userLogoutSuccess = () => ({
  type: userConstants.USER_LOGOUT_SUCCESS,
  payload: {},
});

const userLogoutFailure = () => ({
  type: userConstants.USER_LOGOUT_FAILURE,
});

const clearNotes = () => ({
  type: userConstants.CLEAR_NOTE
})

const userGetMe = (user) => ({
  type: userConstants.USER_GET_ME,
  payload: user,
});

const userUpdateProfile = () => ({
  type: userConstants.USER_UPDATE_PROFILE,
});

const userUpdateProfileSuccess = (newUserReturn) => 
  {
  return {
  type: userConstants.USER_UPDATE_PROFILE_SUCCESS,
  payload: newUserReturn,
  };
}

const userUpdateProfileFailure = () => {
  return {
    type: userConstants.USER_UPDATE_PROFILE_FAILURE,
  };
};

export const registerUserFunc = (registerForm) => {
  return async(dispatch) => {
    dispatch(userRegister());
    try{
      const user = await userService.registerUser(registerForm);
      dispatch(userRegisterSuccess(user));
      history.push('/main');
    } catch(err) {
      dispatch(userRegisterFailure());
    }
  }
}

export function loginFunc({userName, password}) {
  return async (dispatch) => {
    dispatch(userLogin());
    try {
      const user = await userService.login({ userName, password });
      dispatch(userLoginSuccess(user));
      history.push('/main');
    } catch (err) {
      dispatch(userLoginFailure());
    }
  };
};

export function logout() {
  return async (dispatch) => {
    dispatch(userLogout());
    try {
      await userService.logout();
      dispatch(userLogoutSuccess());
      dispatch(clearNotes());
      history.push('/');
    } catch (err) {
      console.log(err);
      dispatch(userLogoutFailure());
    }
  };
}

export function getMe() {
  return async (dispatch) => {
    try {
      const usr = await userService.getMe();
      dispatch(userGetMe(usr));
    } catch (err) {
      console.log('ERROR IN GET ME USER ACTION: ', err);
    }
  };
}

export function updateProfile(newUser) {
  return async (dispatch) => {
    dispatch(userUpdateProfile());
    try {
      const newUserReturn = await userService.updateProfile(newUser);
      dispatch(userUpdateProfileSuccess(newUserReturn));
    } catch (err) {
      dispatch(userUpdateProfileFailure());
    }
  };
}

export async function unlockPWDFunc(pwd) {
  try{
    const unlockedPWD = await userService.unlockPWD(pwd);
    return unlockedPWD;
  }catch(err){
    return false;
  }
}
