import MenuItemModel from "../models/MenuItemModel";
import MenuModel from "../models/MenuModel";
import CartItemModel from "../models/CartItemModel";

export const MENUITEMS = [
  new MenuItemModel(
    "m1",
    "Nasi Lemak The Best In the world",
    "https://rasamalaysia.com/wp-content/uploads/2007/01/nasi_lemak-1-480x270.jpg",
    "Best Nasi Lemak",
    3.99
  ),
  new MenuItemModel(
    "m2",
    "Chicken Rice",
    "https://media.timeout.com/images/105397127/630/472/image.jpg",
    "BRest Chicken Rice",
    4.5
  ),
  new MenuItemModel(
    "m3",
    "Pork Katsu Curry",
    "https://images.japancentre.com/recipes/pics/6/main/6-pork-katsu-curry.jpg",
    "Best Curry Rice",
    5.0
  ),
  new MenuItemModel(
    "m4",
    "Nasi Kandar",
    "https://cdn.kuali.com/wp-content/uploads/2015/05/nasi-kandar.jpg",
    "Best Nasi Kandar",
    9.9
  ),
];

export const MENUS = [
  new MenuModel("mn1", "o1", "Sunday", ["m1", "m2"]),
  new MenuModel("mn2", "o1", "Monday", ["m3", "m4"]),
];

export const CARTS = [
  new CartItemModel("Name 1", 1, 3.0, 3.0),
  new CartItemModel("Name 2", 2, 5.3, 5.3),
];
