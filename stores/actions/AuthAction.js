import { AsyncStorage } from "react-native";

import * as userRepo from "../../database/userRepo";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const ADD_USER = "ADD_USER";

export const signUp = (email, password, name) => {
  return async (dispatch) => {
    //#region fetch
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAYBhW90QPHACr8lyOrZc4SsN0l_dSWwSc",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );
    //#endregion fetch
    //#region error handling
    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Invalid";
      if (errorId === "EMAIL_EXISTS") {
        message = `Email ${email} already exist`;
      }
      throw new Error(message);
    }
    //#endregion error handling
    const resData = await response.json();

    dispatch(authenticate(resData.localId, resData.idToken));
    dispatch(addNewUser(resData.localId, name));
  };
};
 
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

const addNewUser = (userId, name) => {
  userRepo.postUser(10, name, "Active", "Customer", userId);
  
  return (dispatch) => {
    dispatch({
      type: ADD_USER,
      userId: userId,
      name: name,
      balance: 10,
      status: "Active",
      userType: "Customer",
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
