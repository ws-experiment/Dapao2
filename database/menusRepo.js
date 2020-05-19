export const postMenusItems = async (title, imageUrl, description, price, token) => {
  try {
    const response = await fetch(
      `https://dapao2.firebaseio.com/overallMenuItems.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          imageUrl,
          description,
          price,
        }),
      }
    );
    const resData = await response.json();

    return resData;
  } catch (err) {
    throw err;
  }
};

export const postMenus = async (ownerId, dayOfMenu, menuItemId, token) => {
  try {
    const response = await fetch(
      `https://dapao2.firebaseio.com/overallMenus.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: ownerId,
          weekday: dayOfMenu,
          itemId: menuItemId,
        }),
      }
    );
    const resData = await response.json();
    return resData;
  } catch (err) {
    throw err;
  }
};

export const getOwnerMenusData = async (userId) => {
  try {
    const response = await fetch(
      `https://dapao2.firebaseio.com/overallMenus.json?orderBy="userId"&equalTo=\"${userId}\"`
    );
    const resData = await response.json();
    return resData;
  } catch (err) {
    throw err;
  }
};

export const getMenuOfTheDay = async (weekday) => {
  try {
    const response = await fetch(
      `https://dapao2.firebaseio.com/overallMenus.json?orderBy="weekday"&equalTo=\"${weekday}\"`
    );
    const resData = await response.json();
    return resData;
  } catch (err) {
    throw err;
  }
};

export const getMenuItemsData = async () => {
  try {
    const response = await fetch(
      `https://dapao2.firebaseio.com/overallMenuItems.json`
    );
    const resData = await response.json();
    return resData;
  } catch (err) {
    throw err;
  }
};

export const updateOverallMenuItems = async (
  id,
  title,
  imageUrl,
  description,
  token
) => {
  try {
    const response = await fetch(
      `https://dapao2.firebaseio.com/overallMenuItems/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          imageUrl,
          description,
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

export const deleteOverallMenuItems = async (id, token) => {
  try {
    const response = await fetch(
      `https://dapao2.firebaseio.com/overallMenuItems/${id}.json?auth=${token}`,
      { method: "DELETE" }
    );
    if (!response.ok) {
      console.log(response);
      throw new Error(`Error on Firebase operation `);
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteOverallMenus = async (itemId, token) => {
  try {
    const fetchResponse = await fetch(
      `https://dapao2.firebaseio.com/overallMenus.json?orderBy="itemId"&equalTo=\"${itemId}\"`
    );
    const resData = await fetchResponse.json();
    const key = Object.keys(resData)[0];

    const response = await fetch(
      `https://dapao2.firebaseio.com/overallMenus/${key}.json?auth=${token}`,
      { method: "DELETE" }
    );
    if (!response.ok) {
      console.log(response);
      throw new Error(`Error on Firebase operation`);
    }
  } catch (err) {
    throw new Error(err);
  }
};
