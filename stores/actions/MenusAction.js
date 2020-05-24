import * as menusRepo from "../../database/menusRepo";
import * as offDayAction from "../../stores/actions/OffDayAction";

import * as firebaseHelper from "../../helpers/firebaseHelper";

export const SET_DAY_MENUS = "SET_DAY_MENUS";
export const SET_OWNER_MENUS = "SET_OWNER_MENUS";
export const REMOVE_OWNER_MENUS = "REMOVE_OWNER_MENUS";
export const UPDATE_OWNER_MENUS = "UPDATE_OWNER_MENUS";
export const ADD_OWNER_MENUS = "ADD_OWNER_MENUS";

export const fetchMenuOfTheDay = (weekday) => {
  return async (dispatch) => {
    try {
      let menuItemsOfTheDay = [];
      // get the menu of the day
      const menusOfTheDay = await menusRepo.getMenuOfTheDay(weekday);
      if (menusOfTheDay) {
        //get the owners that off for the days
        const offOwnerIdList = await offDayAction.fetchOverallOffDays();

        //get all menus data
        const overallMenuItems = await menusRepo.getMenuItemsData();
        Object.values(menusOfTheDay).forEach((x) => {
          if (!offOwnerIdList.includes(x.userId)) {
            const menuItem = Object.assign(overallMenuItems[x.itemId], {
              id: x.itemId,
            });
            menuItemsOfTheDay.push(menuItem);
          }
        });
      }

      dispatch({
        type: SET_DAY_MENUS,
        menusOfTheDay: menusOfTheDay,
        menuItemsOfTheDay: menuItemsOfTheDay,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const fetchOwnerMenu = (weekday) => {
  return async (dispatch, getState) => {
    try {
      //fetch overall menus
      const userId = getState().auth.userId;
      let menuItemsData = [];
      let ownerMenuData = await menusRepo.getOwnerMenusData(userId);

      if (ownerMenuData) {
        let menuOfTheDay = [];
        menuOfTheDay = Object.values(ownerMenuData).filter(
          (value) => value.weekday == weekday
        );

        if (menuOfTheDay) {
          const menuItemsList = await menusRepo.getMenuItemsData();

          menuOfTheDay.forEach((x) => {
            const menuItems = Object.assign(menuItemsList[x.itemId], {
              id: x.itemId,
            });
            menuItemsData.push(menuItems);
          });
        }
      }
      dispatch({
        type: SET_OWNER_MENUS,
        ownerMenuItems: menuItemsData,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const addMenu = (title, imageUrl, description, price, day) => {
  return async (dispatch, getState) => {
    try {
      //#region Firebase
      const userId = getState().auth.userId;
      const token = getState().auth.token;

      //add image to Firebase Storage
      const serverPath = await firebaseHelper.uploadImage(imageUrl, title);

      //push the server image path to firebase 
      const resPostMenusData = await menusRepo.postMenusItems(
        title,
        serverPath,
        description,
        price,
        token
      );
      menusRepo.postMenus(userId, day, resPostMenusData.name, token);
      //#endregion Firebase

       //push local file location to reducer
      dispatch({
        type: ADD_OWNER_MENUS,
        menuData: {
          id: resPostMenusData.name,
          title,
          imageUrl,
          description,
          price,
          userId,
        },
        weekday: day,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const updateOwnerMenu = (id, title, imageUrl, description) => {
  return async (dispatch, getState) => {
    //UPDATE TO FIREBASE
    const token = getState().auth.token;

    //Remove image from Firebase Storage
    firebaseHelper.deleteImage(title); 
    //Add new image to Firebase Storage
    const serverPath = await firebaseHelper.uploadImage(imageUrl, title);

    menusRepo.updateOverallMenuItems(id, title, serverPath, description, token);
    dispatch({
      type: UPDATE_OWNER_MENUS,
      pid: id,
      menuData: {
        title,
        imageUrl,
        description,
      },
    });
  };
};

export const removeOwnerMenu = (id, title) => {
  //UPDATE TO DATABASE
  try {
    return (dispatch, getState) => {
      const token = getState().auth.token;
      menusRepo.deleteOverallMenuItems(id, token);
      menusRepo.deleteOverallMenus(id, token);

      //delete image in Firebase Storage
      firebaseHelper.deleteImage(title);

      dispatch({
        type: REMOVE_OWNER_MENUS,
        pid: id,
      });
    };
  } catch (err) {
    throw err;
  }
};
