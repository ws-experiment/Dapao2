import * as DATA from "../../data/dummy-data.json";

export const FETCH_USER = "FETCH_USER";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const RELOAD = "RELOAD";

export const fetchUsers = () => {
  return (dispatch) => {
    try {
      const usersData = [];
      for(var key in DATA.customers){
        const item = Object.assign(DATA.customers[key], {id: key});
        usersData.push(item);
      }
      dispatch({ type: FETCH_USER, users: usersData });
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
      dispatch({ type: RELOAD, pid: id, amount: addedAmount });
    } catch (err) {
      console.log(err);
    }
  };
};
