export const postUser = async (balance, name, status, userType, userId) => {
  try {
    const response = await fetch(`https://dapao2.firebaseio.com/users.json`, {
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
    const resData = await response.json();

    return resData;
  } catch (err) {
    throw err;
  }
};

export const updateUserBalance = async (userId, balance) => {
  try {
    const fetchResponse = await fetch(
      `https://dapao2.firebaseio.com/users.json?orderBy="userId"&equalTo=\"${userId}\"`
    );
    const resData = await fetchResponse.json();
    const key = Object.keys(resData)[0];
    const currentBalance = resData[key].balance;

    const response = await fetch(
      `https://dapao2.firebaseio.com/users/${key}.json`,
      {
        method: "PATCH",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          balance: currentBalance + balance,
        }),
      }
    );

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
    const resData = await response.json();
    return resData;
  } catch (err) {
    throw err;
  }
};
