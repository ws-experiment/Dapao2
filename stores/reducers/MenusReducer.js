import {
  SET_DAY_MENUS,
  SET_OWNER_MENUS,
  REMOVE_OWNER_MENUS,
  UPDATE_OWNER_MENUS,
  ADD_OWNER_MENUS,
} from "../actions/MenusAction";
import moment from 'moment';

const initialState = {
  menusOfTheDay: [],
  menuItemsOfTheDay: [],
  ownerMenuItems: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    //#region SET_DAY_MENUS
    case SET_DAY_MENUS:
      return {
        ...state,
        menusOfTheDay: action.menusOfTheDay,
        menuItemsOfTheDay: action.menuItemsOfTheDay,
      };
    //#endregion SET_DAY_MENUS
    //#region SET_OWNER_MENUS
    case SET_OWNER_MENUS:
      return {
        ...state,
        ownerMenuItems: action.ownerMenuItems,
      };
    //#endregion SET_OWNER_MENUS
    //#region ADD_OWNER_MENUS
    case ADD_OWNER_MENUS:
      //add menuItemOfTheDay if it's on the same day
      let newItems = [...state.menuItemsOfTheDay];
      if (newItems) {
        const today = moment(new Date()).format("dddd");
        const exist = today == action.weekday ? true : false;    
        if (exist) {
          newItems.push(action.menuData);
        }
      }
      return {
        ...state,
        ownerMenuItems: state.ownerMenuItems.concat(action.menuData),
        menuItemsOfTheDay: newItems
      };
    //#endregion ADD_OWNER_MENUS
    //#region UPDATE_OWNER_MENUS
    case UPDATE_OWNER_MENUS:
      const index = state.ownerMenuItems.findIndex(
        (menu) => menu.id === action.pid
      );
      const updateMenuItem = {
        id: state.ownerMenuItems[index].id,
        title: action.menuData.title,
        imageUrl: state.ownerMenuItems[index].imageUrl,
        description: action.menuData.description,
        price: action.menuData.price,
      };
      //update owner menu items
      let updatedOwnerMenuItems = [...state.ownerMenuItems];
      updatedOwnerMenuItems[index] = updateMenuItem;

      //update menu items of the day
      let matchedItem = [];
      let newMenuItemsOfTheDay = [];
      if (state.menuItemsOfTheDay) {
        //UPDATE if updated menu item exist in menuItemsOfTheDay
        matchedItem = state.menuItemsOfTheDay.filter(
          (menuItem) => menuItem.id === action.pid
        );
        newMenuItemsOfTheDay = [...state.menuItemsOfTheDay];
        if (matchedItem) {
          const index = newMenuItemsOfTheDay.findIndex(
            (menu) => menu.id === action.pid
          );
          newMenuItemsOfTheDay[index] = updateMenuItem;
        }
      }

      return {
        ...state,
        ownerMenuItems: updatedOwnerMenuItems,
        menuItemsOfTheDay: newMenuItemsOfTheDay,
      };
    //#endregion UPDATE_OWNER_MENUS
    //#region  REMOVE_OWNER_MENUS
    case REMOVE_OWNER_MENUS:
      return {
        ...state,
        ownerMenuItems: state.ownerMenuItems.filter(
          (menuItem) => menuItem.id != action.pid
        ),
        menuItemsOfTheDay: state.ownerMenuItems.filter(
          (menuItem) => menuItem.id != action.pid
        ),
      };
    //#endregion  REMOVE_OWNER_MENUS
    default:
      return state;
  }
};
