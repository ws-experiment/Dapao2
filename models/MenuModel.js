class MenuModel {
    constructor(id, ownerId, dayOfMenu, menuItemIds){
        this.id = id;
        this.ownerId = ownerId;
        this.dayOfMenu = dayOfMenu;
        this.menuItemIds = menuItemIds;
    }
};

export default MenuModel;