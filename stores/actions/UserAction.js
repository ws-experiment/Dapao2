import * as DATA from "../../data/dummy-data.json";

import * as userRepo from '../../database/userRepo';

export const FETCH_USER = "FETCH_USER";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const RELOAD = "RELOAD";

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      
      // for(var key in DATA.customers){
      //   const item = Object.assign(DATA.customers[key], {id: key});
      //   usersData.push(item);
      // }
      const customers = await userRepo.getUsers();
      dispatch({ type: FETCH_USER, users: Object.values(customers)});

    } catch (err) {
      console.log(err);
    }
  };
};

export const setCurrentUser = () => {
  //Find current user from firebase
  const pid = "u1";
  const balance = 100;
  const name = "Wilson Ting";
  return dispatch => {
    try {
      dispatch({ type: SET_CURRENT_USER, pid: pid, balance: balance, name: name });
    } catch (err) {
      console.log(err);
    }
  };
};

export const reload = (id, addedAmount) => {
  return (dispatch) => {
    try {
      userRepo.updateUserBalance(id, addedAmount);
      dispatch({ type: RELOAD, pid: id, amount: addedAmount });
    } catch (err) {
      console.log(err);
    }
  };
};
