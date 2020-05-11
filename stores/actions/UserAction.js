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
      dispatch({ type: FETCH_USER, users: Object.values(customers) });
    } catch (err) {
      console.log(err);
    }
  };
};

export const setCurrentUser = (userId) => {
  return async (dispatch) => {
    const userData = await userRepo.getCurrentUser(userId);
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
  return (dispatch) => {
    try {
      console.log("addNewUser");
      userRepo.postUser(10, name, "Active", "Customer", userId);
      dispatch({
        type: ADD_USER,
        userId: userId,
        name: name,
        balance: 10,
        status: "Active",
        userType: "Customer",
      });
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

export const deductBalance = (deductAmount) => {
  return (dispatch, getState) => {
    try {
      const userId = getState().auth.userId;
      userRepo.updateUserBalance(userId, deductAmount, false);
      dispatch({ type: DEDUCT_BALANCE, pid: userId, amount: deductAmount });
    } catch (err) {
      console.log(err);
    }
  };
};
