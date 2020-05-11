
export const postOrder = async (cartItems, date, totalAmount, userId, userName) => {
  try {
    const response = await fetch(
        `https://dapao2.firebaseio.com/orders.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartItems,
            date,
            totalPrice: totalAmount,
            userId,
            name: userName
          }),
        }
      );
      const resData = await response.json();
  
      return resData;
  } catch (err) {
    throw err;
  }
};

export const getOrderHistory = async (userId) => {
  try {
    const response = await fetch(
      `https://dapao2.firebaseio.com/orders.json?orderBy="userId"&equalTo="${userId}"`
    );
    const resData = await response.json();
    return resData;
  } catch(err){
    throw err;
  }
};

export const getOrderOfTheDay = async (dateOfToday) => {
  try {
    const response = await fetch(
      `https://dapao2.firebaseio.com/orders.json?orderBy="date"&startAt="${dateOfToday} 00:00"&endAt="${dateOfToday} 23.59"`
    );
    const resData = await response.json();
    return resData;
  } catch(err){
    throw err;
  }
};
