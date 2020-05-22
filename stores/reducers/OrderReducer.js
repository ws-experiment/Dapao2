import { FETCH_ORDER, ADD_ORDER, FETCH_CUSTOMER_ORDER } from "../actions/OrderAction";

const initialState = {
  orders: [],
  pastOrders: [],
  customerOrders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDER:
      return {
        ...state,
        orders: action.orders,
        pastOrders: action.pastOrders
      };
    case FETCH_CUSTOMER_ORDER:
      return {
        ...state,
        customerOrders: action.customerOrders,
      };
    case ADD_ORDER:
      //concat to the top of the array
      return {
        ...state,
        orders: [action.orderData].concat(state.orders),
        customerOrders: [action.orderData].concat(state.customerOrders),
      };
  }
  return state;
};
