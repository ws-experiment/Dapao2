export const postUser = async (balance, name, status, userType, userId, token) => {
  try {
    const response = await fetch(`https://dapao2.firebaseio.com/users.json?auth=${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        balance,
        name,
        status,
        userType,
        userId,
      }),
    });
    if (!response.ok) {
      console.log(response);
      throw new Error(`Error on Firebase operation `);
    }
    const resData = await response.json();

    return resData;
  } catch (err) {
    throw err;
  }
};

export const updateUserBalance = async (userId, total, token, isReload = true) => {
  try {

    const fetchResponse = await fetch(
      `https://dapao2.firebaseio.com/users.json?orderBy="userId"&equalTo=\"${userId}\"`
    );
    const resData = await fetchResponse.json();
    
    const key = Object.keys(resData)[0];
    const currentBalance = resData[key].balance;
    
    const finalBalance = isReload ? currentBalance + total : currentBalance - total;
    console.log("updateUserBalance",  `https://dapao2.firebaseio.com/users/${key}.json?auth=${token}`);
    const response = await fetch(
      `https://dapao2.firebaseio.com/users/${key}.json?auth=${token}`,
      {
        method: "PATCH",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          balance: finalBalance,
        }),
      }
    );
      console.log("updateUserBalance", response);
    if (!response.ok) {
      throw new Error(`Error on Firebase operation: ${response}`);
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const getUsers = async () => {
  try {
    const response = await fetch(
      `https://dapao2.firebaseio.com/users.json?orderBy="userType"&equalTo="Customer"`
    );
    if (!response.ok) {
      console.log(response);
      throw new Error(`Error on Firebase operation `);
    }
    const resData = await response.json();
    return resData;
  } catch (err) {
    throw err;
  }
};

export const getCurrentUser = async (userId) => {
  try {
    const fetchResponse = await fetch(
      `https://dapao2.firebaseio.com/users.json?orderBy="userId"&equalTo=\"${userId}\"`
    );
    const userResData = await fetchResponse.json();
    const key = Object.keys(userResData)[0];

    const response = await fetch(
      `https://dapao2.firebaseio.com/users/${key}.json`
    );
    if (!response.ok) {
      console.log(response);
      throw new Error(`Error on Firebase operation `);
    }
    const resData = await response.json();
    return resData;

  } catch (err) {
    throw err;
  }
};
