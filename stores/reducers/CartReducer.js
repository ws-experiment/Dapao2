import { ADD_CART, REMOVE_FROM_CART } from "../actions/CartAction";
import CartItemModel from "../../models/CartItemModel";
import { ADD_ORDER } from "../actions/OrderAction";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalItems: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    //#region ADD_CART
    case ADD_CART:
      const addedMenuItem = action.menu;
      const addedMenuId = addedMenuItem.id;
      const addedPrice = addedMenuItem.price;
      const addedMenuTitle = addedMenuItem.title;

      //Menu is not exist in the cart
      if (!state.cartItems.find((x) => x.menuTitle === addedMenuTitle)) {
        const newCartItem = {
          id: addedMenuId,
          menuTitle: addedMenuTitle,
          quantity: 1,
          price: addedPrice,
          sum: addedPrice,
        };
        return {
          ...state,
          cartItems: state.cartItems.concat(newCartItem),
          totalAmount: state.totalAmount + addedPrice,
          totalItems: state.totalItems + 1,
        };
      }
      //new menu added in the cart
      else {
        const cartIndex = state.cartItems.findIndex(
          (x) => x.id === addedMenuId
        );
        const updatedCartItem = {
          id: state.cartItems[cartIndex].id,
          menuTitle: addedMenuTitle,
          quantity: state.cartItems[cartIndex].quantity + 1,
          price: state.cartItems[cartIndex].price,
          sum: state.cartItems[cartIndex].sum + addedPrice,
        };
        let updatedCartItems = [...state.cartItems];
        updatedCartItems[cartIndex] = updatedCartItem;

        return {
          ...state,
          cartItems: updatedCartItems,
          totalAmount: state.totalAmount + addedPrice,
          totalItems: state.totalItems + 1,
        };
      }
    //#endregion ADD_CART
    //#region REMOVE_FROM_CART
    case REMOVE_FROM_CART:
      const cartIndex = state.cartItems.findIndex((x) => x.id === action.pid);
      const selectedCartItem = state.cartItems[cartIndex];
      const currentQty = selectedCartItem.quantity;

      let updatedCartItems = [...state.cartItems];
      //Reduce the item qty only
      if (currentQty > 1) {
        const updatedCartItem = new CartItemModel(
          selectedCartItem.id,
          selectedCartItem.menuTitle,
          selectedCartItem.quantity - 1,
          selectedCartItem.price,
          selectedCartItem.sum - selectedCartItem.price
        );
        updatedCartItems[cartIndex] = updatedCartItem;
      } else {
        updatedCartItems = updatedCartItems.filter(
          (item) => item.id != action.pid
        );
      }
      return {
        ...state,
        cartItems: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.price,
        totalItems: state.totalItems - 1,
      };
    //#endregion REMOVE_FROM_CART
    //#region ADD_ORDER
    case ADD_ORDER:
      return initialState;
    //#endregion ADD_ORDER
    default:
      return state;
  }
};
