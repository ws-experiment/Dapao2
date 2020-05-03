class CartItemModel {
    constructor(id, menuTitle, quantity, price, sum){
        this.id = id;
        this.menuTitle = menuTitle;
        this.quantity = quantity;
        this.price = price;
        this.sum = sum;
    }
}

export default CartItemModel;