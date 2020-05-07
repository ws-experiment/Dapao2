import { FETCH_USER, RELOAD, SET_CURRENT_USER } from "../actions/UserAction";
import { ADD_USER } from "../actions/AuthAction";

const initialState = {
  users: [],
  currentUser: {
    balance: 100,
    name: "John Alexa Bin Mohammad",
    status: "Active",
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        users: action.users,
      };
    case SET_CURRENT_USER:
      const newCurrentUser = {
        id: action.pid,
        balance: action.balance,
        name: action.name,
      };
      return {
        ...state,
        currentUser: newCurrentUser,
      };
    case RELOAD: {
      const index = state.users.findIndex((x) => x.userId === action.pid);
      let newUser = [...state.users];
      newUser[index].balance += action.amount;
      return {
        ...state,
        users: newUser,
      };
    }
    case ADD_USER:
      const newUser = {
        userId: action.userId,
        balance: action.balance,
        name: action.name,
        status: action.status,
        userType: "Customer"
      };
      return {
        ...state,
        users: state.users.concat(newUser),
      };
    default:
      return state;
  }
};
