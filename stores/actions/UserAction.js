import { AsyncStorage } from "react-native";
import { Base64 } from "js-base64";

import * as userRepo from "../../database/userRepo";

export const FETCH_USER = "FETCH_USER";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const RELOAD = "RELOAD";
export const ADD_USER = "ADD_USER";
export const DEDUCT_BALANCE = "DEDUCT_BALANCE";

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      // for(var key in DATA.customers){
      //   const item = Object.assign(DATA.customers[key], {id: key});
      //   usersData.push(item);
      // }
      const customers = await userRepo.getUsers();
      const newCustomers = Object.values(customers).sort((a, b) =>
        a.name.toUpperCase() > b.name.toUpperCase()
          ? 1
          : a.name.toUpperCase() < b.name.toUpperCase()
          ? -1
          : 0
      );
      dispatch({ type: FETCH_USER, users: newCustomers });
    } catch (err) {
      console.log(err);
    }
  };
};

export const setCurrentUser = (userId, password) => {
  return async (dispatch) => {
    const userData = await userRepo.getCurrentUser(userId);
    const userType = await AsyncStorage.getItem("userType");
    if (!userType) {
      saveUserTypeToStorage(userData.userType, Base64.encode(password));
    }

    dispatch({
      type: SET_CURRENT_USER,
      pid: userData.userId,
      balance: userData.balance,
      name: userData.name,
      userType: userData.userType,
    });
  };
};

export const addNewUser = (userId, name) => {
  return (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      userRepo.postUser(10, name, "Active", "Customer", userId, token);
    } catch (err) {
      console.log(err);
    }
  };
};

export const reload = (id, addedAmount) => {
  return (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      userRepo.updateUserBalance(id, addedAmount, token);
    } catch (err) {
      console.log(err);
    }
  };
};

export const deductBalance = (deductAmount) => {
  return (dispatch, getState) => {
    try {
      const userId = getState().auth.userId;
      const token = getState().auth.token;
      userRepo.updateUserBalance(userId, deductAmount, token, false);
    } catch (err) {
      console.log(err);
    }
  };
};

//#region private functions
const saveUserTypeToStorage = (userType, password) => {
  AsyncStorage.setItem(
    "userType",
    JSON.stringify({
      userType,
      password,
    })
  );
};

export const mergeUserTypeToStorage = (password) => {
  AsyncStorage.mergeItem(
    "userType",
    JSON.stringify({
      password
    })
  );
};
//#endregion private functions
