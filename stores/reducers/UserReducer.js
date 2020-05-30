import { FETCH_USER, SET_CURRENT_USER, DEDUCT_BALANCE } from "../actions/UserAction";
import { LOGOUT } from "../actions/AuthAction";
import { ADD_USER, RELOAD } from '../actions/UserAction';

const initialState = {
  users: [],
  currentUser: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER: {
      return {
        ...state,
        users: action.users,
      };
    }
    case SET_CURRENT_USER: {
      const newCurrentUser = {
        userId: action.pid,
        balance: action.balance,
        name: action.name,
        userType: action.userType,
      };
      return {
        ...state,
        currentUser: newCurrentUser,
      };
    }
    // case RELOAD: {
    //   const index = state.users.findIndex((x) => x.userId === action.pid);
    //   let newUser = [...state.users];
    //   newUser[index].balance += action.amount;
    //   return {
    //     ...state,
    //     users: newUser,
    //   };
    // }
    // case DEDUCT_BALANCE: {
    //   const newCurrentUser = state.currentUser;
    //   newCurrentUser.balance -= action.amount;
    //   return {
    //     ...state,
    //     currentUser: newCurrentUser,
    //   };
    // }
    // case ADD_USER: {
    //   const newUser = {
    //     userId: action.userId,
    //     balance: action.balance,
    //     name: action.name,
    //     status: action.status,
    //     userType: action.userType,
    //   };
    //   return {
    //     ...state,
    //     users: state.users.concat(newUser),
    //   };
    // }
    case LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
};
