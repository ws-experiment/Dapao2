import { AsyncStorage } from "react-native";

import * as authRepo from "../../database/authRepo";
import * as userAction from '../actions/UserAction';

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";


//#region public functions
export const registerNewUser = (email, password, name) => {
  return async (dispatch) => {
    const resData = await authRepo.signup(email, password);
    dispatch(authenticate(resData.localId, resData.idToken));
    dispatch(userAction.addNewUser(resData.localId, name));
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const resData = await authRepo.login(email, password);
    dispatch(authenticate(resData.localId, resData.idToken));
    dispatch(userAction.setCurrentUser(resData.localId));

    //saveUserIdToStorage(resData.idToken, resData.localId);
  };
};

export const logout = () => {
  return { type: LOGOUT };
};
//#region public functions

//#region private functions
const authenticate = (userId, token) => {
  return (dispatch) => {
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      token: token,
    });
  };
};

const saveUserIdToStorage = (token, userId) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
    })
  );
};
//#endregion private functions
