import * as orderRepo from "../../database/orderRepo";
import moment from "moment";

export const FETCH_ORDER = "FETCH_ORDER";
export const FETCH_CUSTOMER_ORDER = "FETCH_CUSTOMER_ORDER";
export const ADD_ORDER = "ADD_ORDER";

export const fetchPastOrders = () => {
  return async (dispatch, getState) => {
    try {
      //#region Firebase
      const orders = await orderRepo.getOrderHistory(getState().auth.userId);
      let pastOrders = [];
      let newOrders = [];
      const dateToday = moment().format("MMM DD");

      for (var key in orders) {
        //const orderItem = Object.assign(orders[key], { id: key });
        const orderItem = {
          id: key,
          date: moment(orders[key].date, "x").format("MMM DD"),
          name: orders[key].name,
          totalPrice: orders[key].totalPrice,
          userId: orders[key].userId,
          cartItems: orders[key].cartItems,
        };
        const sameDate = dateToday === orderItem.date;
        sameDate ? newOrders.push(orderItem) : pastOrders.push(orderItem);
      }
      pastOrders = pastOrders.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      //#endregion Firebase

      dispatch({ type: FETCH_ORDER, orders: newOrders, pastOrders });
    } catch (err) {
      throw err;
    }
  };
};

export const fetchCustomerOrders = () => {
  return async (dispatch) => {
    try {
      //#region Firebase
      const orders = await orderRepo.getOrderOfTheDay();
      const loadedOrders = [];
      for (var key in orders) {
        // const orderItem = Object.assign(orders[key], { id: key });
        const orderItem = {
          id: key,
          date: moment(orders[key].date, "x").format("MMM DD"),
          name: orders[key].name,
          totalPrice: orders[key].totalPrice,
          userId: orders[key].userId,
          cartItems: orders[key].cartItems,
        };
        loadedOrders.push(orderItem);
      }
      //#endregion Firebase
      dispatch({ type: FETCH_CUSTOMER_ORDER, customerOrders: loadedOrders });
    } catch (err) {
      throw err;
    }
  };
};

export const addOrder = (cartItems, totalAmount, userName) => {
  return async (dispatch, getState) => {
    const currentUserId = getState().auth.userId;
    const token = getState().auth.token;
    const timestamp = moment().valueOf();

    orderRepo.postOrder(
      cartItems,
      timestamp,
      totalAmount,
      currentUserId,
      userName,
      token
    );

    dispatch({ type: ADD_ORDER });
  };
};
