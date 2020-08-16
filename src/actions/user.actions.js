import * as userConstants from '../constants/action-types';
import * as userService from '../services/user.service';
import { history } from '../helpers/history';

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

const userGetMe = (user) => ({
  type: userConstants.USER_GET_ME,
  payload: user,
});

const userUpdateProfile = () => ({
  type: userConstants.USER_UPDATE_PROFILE,
});

const userUpdateProfileSuccess = () => ({
  type: userConstants.USER_UPDATE_PROFILE_SUCCESS,
  payload: {},
});

const userUpdateProfileFailure = () => {
  return {
    type: userConstants.USER_UPDATE_PROFILE_FAILURE,
  };
};

export function loginFunc({userName, password}) {
  return async (dispatch) => {
    dispatch(userLogin());
    try {
      console.log('User actions Try:');
      const usr = await userService.login({ userName, password });
      console.log('User actions Try after userService.Login: ', usr);
      dispatch(userLoginSuccess(usr));
      console.log('User actions Try after userLoginSuccess dispatch:');
      history.push('/main');
      console.log('User actions Try after push to main:');
    } catch (err) {
      console.log('ERROR IN LOGIN FUN: ', err);
      dispatch(userLoginFailure);
    }
  };
};

// TODO: Logout

export function logout() {
  return async (dispatch) => {
    dispatch(userLogout());
    try {
      await userService.logout();
      dispatch(userLogoutSuccess());
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

// TODO: Register

// Update Profile

export function updateProfile(newUser) {
  return async (dispatch) => {
    dispatch(userUpdateProfile());
    try {
      const newUserReturn = userService.updateProfile(newUser);
      userUpdateProfileSuccess(newUserReturn);
    } catch (err) {
      console.log(err);
      dispatch(userUpdateProfileFailure());
    }
  };
}
