import * as DATA from "../../data/dummy-data.json";
import * as orderRepo from '../../database/orderRepo';
import moment from "moment";

export const FETCH_ORDER = "FETCH_ORDER";
export const FETCH_CUSTOMER_ORDER = "FETCH_CUSTOMER_ORDER";
export const ADD_ORDER = "ADD_ORDER";

export const fetchPastOrders = () => {
  return async (dispatch, getState) => {
    try {
      //#region Firebase
      const orders = await orderRepo.getOrderHistory(getState().auth.userId);
      const loadedOrders = [];
      for (var key in orders) {
        const orderItem = Object.assign(orders[key], { id: key });
        loadedOrders.push(orderItem);
      }
      //#endregion Firebase

      dispatch({type: FETCH_ORDER , orders: loadedOrders});
    } catch (err) {
      throw err;
    }
  };
};

export const fetchCustomerOrders = () => {
  return async (dispatch) => {
    try {
      //#region Firebase
      const date = moment(new Date()).format('MMM DD');
      const orders = await orderRepo.getOrderOfTheDay(date);
    
      const loadedOrders = [];
      for (var key in orders) {
        const orderItem = Object.assign(orders[key], { id: key });
        loadedOrders.push(orderItem);
      }
      //#endregion Firebase
      dispatch({type: FETCH_CUSTOMER_ORDER , customerOrders: loadedOrders});
    } catch (err) {
      throw err;
    }
  };
};

export const addOrder = (cartItems, totalAmount, userName) => {
  return async (dispatch, getState) => {

    const currentUserId = getState().auth.userId;
    const date = moment(new Date()).format('MMM DD HH:mm');
    

    orderRepo.postOrder(cartItems, date, totalAmount, currentUserId, userName);

    const orderData = {
      userId: currentUserId,
      date: date,
      totalPrice: totalAmount,
      cartItems: Object.values(cartItems)
    }

    dispatch({
      type: ADD_ORDER,
      orderData: orderData
    })
  };
}
