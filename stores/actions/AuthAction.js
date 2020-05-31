import { AsyncStorage } from "react-native";
import { Base64 } from "js-base64";
import moment from "moment";

import * as authRepo from "../../database/authRepo";
import * as userAction from "../actions/UserAction";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const CHANGE_PW = "CHANGE_PW";
//#region public functions
export const registerNewUser = (email, password, name) => {
  return async (dispatch) => {
    const resData = await authRepo.signup(email, password);
    dispatch(authenticate(resData.localId, resData.idToken));
    dispatch(userAction.addNewUser(resData.localId, name));
  };
};

export const logout = () => {
  AsyncStorage.removeItem("userData");
  AsyncStorage.removeItem("userType");
  return { type: LOGOUT };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const resData = await authRepo.login(email, password);

    dispatch(authenticate(resData.localId, resData.idToken));
    dispatch(userAction.setCurrentUserAtStartup(resData.localId, password));
  };
};

export const authenticate = (userId, token) => {
  return async (dispatch) => {
    //Check whether the item is in AsyncStorage
    const userData = await AsyncStorage.getItem("userData");
    //Set the autologout time
    if (!userData) {
      const expirationDate = new Date(moment().add(55, "minutes"));
      saveUserIdToStorage(token, userId, expirationDate);
    }

    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      token: token,
    });
  };
};

export const changePassword = (oldPassword, newPassword) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;

      //validate the correct old password
      const userTypeData = await AsyncStorage.getItem("userType");

      const userTypeDataContent = JSON.parse(userTypeData);
      const { password } = userTypeDataContent;

      if (oldPassword !== Base64.decode(password)) {
        throw new Error("You Current Password is incorrect");
      }

      const resData = await authRepo.changePassword(token, newPassword);
      mergeTokenToStorage(resData.idToken);
      userAction.mergeUserTypeToStorage(Base64.encode(newPassword));

      dispatch({
        type: CHANGE_PW,
        token: resData.idToken,
      });
    } catch (err) {
      throw err;
    }
  };
};
//#endregion public functions

//#region private functions
const saveUserIdToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};

const mergeTokenToStorage = (token) => {
  AsyncStorage.mergeItem(
    "userData",
    JSON.stringify({
      token: token,
    })
  );
};
//#endregion private functions
