export const ADD_CART = "ADD_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export const addCart = (menuItem) => {
  return { type: ADD_CART, menu: menuItem };
};

export const removeFromCart = menuItemId => {
  return { type: REMOVE_FROM_CART, pid: menuItemId };
};