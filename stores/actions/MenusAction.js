import * as menusRepo from "../../database/menusRepo";

export const SET_DAY_MENUS = "SET_DAY_MENUS";
export const SET_OWNER_MENUS = "SET_OWNER_MENUS";
export const REMOVE_OWNER_MENUS = "REMOVE_OWNER_MENUS";
export const UPDATE_OWNER_MENUS = "UPDATE_OWNER_MENUS";
export const ADD_OWNER_MENUS = "ADD_OWNER_MENUS";

export const fetchMenuOfTheDay = (weekday) => {
  return async (dispatch) => {
    try {
      let menuItemsOfTheDay = [];
      const menusOfTheDay = await menusRepo.getMenuOfTheDay(weekday);
      if (menusOfTheDay) {
        //fetch overall menus
        const overallMenuItems = await menusRepo.getMenuItemsData();
        Object.values(menusOfTheDay).forEach((x) => {
          const menuItem = Object.assign(overallMenuItems[x.itemId], {
            id: x.itemId,
          });
          menuItemsOfTheDay.push(menuItem);
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
  return async (dispatch) => {
    try {
      //fetch overall menus
      let menuItemsData = [];
      let ownerMenuData = await menusRepo.getOwnerMenusData("u1");

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
  return async (dispatch) => {
    //PUSH TO FIREBASE
    //#region Firebase
    const resPostMenusData = await menusRepo.postMenusItems(
      title,
      imageUrl,
      description,
      price
    );
    menusRepo.postMenus("u1", day, resPostMenusData.name);
    //#endregion Firebase

    dispatch({
      type: ADD_OWNER_MENUS,
      menuData: {
        id: resPostMenusData.name,
        title,
        imageUrl,
        description,
        price,
        userId: "u1",
      },
      weekday: day,
    });
  };
};

export const updateOwnerMenu = (id, title, imageUrl, description) => {
  //UPDATE TO FIREBASE
  menusRepo.updateOverallMenuItems(id, title, imageUrl, description);
  return (dispatch) => {
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

export const removeOwnerMenu = (id) => {
  //UPDATE TO DATABASE
  try {
    menusRepo.deleteOverallMenuItems(id);
    menusRepo.deleteOverallMenus(id);
    return (dispatch) => {
      dispatch({
        type: REMOVE_OWNER_MENUS,
        pid: id,
      });
    };
  } catch (err) {
    throw err;
  }
};
