import { SET_OFF_DAY, ADD_OFF_DAY } from "../actions/OffDayAction";

const initialState = {
  offDayItems: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_OFF_DAY: {
      return {
        ...state,
        offDayItems: action.offDayItems,
      };
    }
    case ADD_OFF_DAY: {
      let newDates = [];
      if (state.offDayItems.includes(action.addedDay)) {
        newDates = state.offDayItems.filter((x) => x !== action.addedDay);
      } else {
        newDates = [...state.offDayItems];
        newDates.push(action.addedDay);
        newDates.sort();
      }
      return {
        ...state,
        offDayItems: newDates,
      };
    }
    default:
      return state;
  }
};
