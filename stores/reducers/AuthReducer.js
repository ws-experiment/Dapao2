import { AUTHENTICATE, LOGOUT, CHANGE_PW } from "../actions/AuthAction";

const initialState = {
  token: null,
  userId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
      };
    case CHANGE_PW:
      return {
        ...state,
        token: action.token,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
