import * as DATA from "../../data/dummy-data.json";
import * as orderRepo from '../../database/orderRepo';
import moment from "moment";

export const FETCH_ORDER = "FETCH_ORDER";
export const FETCH_CUSTOMER_ORDER = "FETCH_CUSTOMER_ORDER";
export const ADD_ORDER = "ADD_ORDER";

export const fetchOrder = () => {
  return async (dispatch) => {
    try {
      //#region Firebase
      const orders = await orderRepo.getOrderHistory("u1");
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
      console.log("loadedOrders ", loadedOrders);
      dispatch({type: FETCH_CUSTOMER_ORDER , customerOrders: loadedOrders});
    } catch (err) {
      throw err;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async dispatch => {
    const date = moment(new Date()).format('MMM DD HH:mm');
    
    orderRepo.postOrder(cartItems, date, totalAmount, "u1");

    const orderData = {
      userId: "u1",
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
