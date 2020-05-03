import moment from 'moment';

class Order {
    constructor(id, userId, date, totalPrice, cartItems) {
        this.id = id;
        this.userId = userId;
        this.date = date;
        this.totalPrice = totalPrice;
        this.cartItems = cartItems;
    }

    get readableDate() {
        return moment(this.date).format('MMMM Do YYYY, hh mm');
    }
}

export default Order;