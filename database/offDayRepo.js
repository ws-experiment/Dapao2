export const postOwnerOffDays = async (userId, offDayItems, token) => {
  try {
    const response = await fetch(`https://dapao2.firebaseio.com/ownerOffDays.json?auth=${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ownerId: userId,
        offDayItems,
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

export const getOwnerOffDays = async (userId) => {
  try {
    const response = await fetch(
      `https://dapao2.firebaseio.com/ownerOffDays.json?orderBy="ownerId"&equalTo=\"${userId}\"`
    );
    const resData = await response.json();
    return resData;
  } catch (err) {
    throw err;
  }
};

export const updateOwnerOffDays = async (id, offDayItems, token) => {
  try {
    const response = await fetch(
      `https://dapao2.firebaseio.com/ownerOffDays/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          offDayItems,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error on Firebase operation: ${response}`);
    }
  } catch (err) {
    throw err;
  }
};

export const getOverallOffDays = async () => {
  try {
    const response = await fetch(
      `https://dapao2.firebaseio.com/ownerOffDays.json`
    );
    const resData = await response.json();
    return resData;
  } catch (err) {
    throw err;
  }
};
