import * as offDayRepo from "../../database/offDayRepo";
import moment from "moment";

export const ADD_OFF_DAY = "ADD_OFF_DAY";
export const SET_OFF_DAY = "SET_OFF_DAY";

export const saveOwnerOffDays = (offDayItems) => {
  return async (dispatch, getState) => {
    try {
      const userId = getState().auth.userId;
      const token = getState().auth.token;
      const resData = await offDayRepo.getOwnerOffDays(userId);
      if (Object.keys(resData).length != 0) {
        const id = Object.keys(resData)[0];
        await offDayRepo.updateOwnerOffDays(id, offDayItems, token);
      } else {
        await offDayRepo.postOwnerOffDays(userId, offDayItems, token);
      }
    } catch (err) {
      throw err;
    }
  };
};

export const addOwnerOffDays = (newDay) => {
  return (dispatch) => {
    dispatch({ type: ADD_OFF_DAY, addedDay: newDay });
  };
};

export const fetchOwnerOffDays = () => {
  return async (dispatch, getState) => {
    try {
      let filteredDate = [];
      const userId = getState().auth.userId;
      const resData = await offDayRepo.getOwnerOffDays(userId);
      const key = Object.keys(resData)[0];

      //if owner have ownerId
      if (resData[key] && resData[key].offDayItems) {
        filteredDate = resData[key].offDayItems.filter(
          (x) => moment(x) > new Date()
        );
      }

      dispatch({
        type: SET_OFF_DAY,
        offDayItems: filteredDate,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

//fetch off days from customers to determine can order or not
export const fetchOverallOffDays = async () => {
  let ownerIdList = [];
  const today = moment(new Date()).format("YYYY-MM-DD");
  const offDayResData = await offDayRepo.getOverallOffDays();

  Object.values(offDayResData).forEach((x) => {
    if (x.offDayItems) {
      if (x.offDayItems.includes(today)) {
        ownerIdList.push(x.ownerId);
      }
    }
  });
  return ownerIdList;
};
