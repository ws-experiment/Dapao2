export const signup = async (email, password) => {
  //#region fetch
  const response = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAYBhW90QPHACr8lyOrZc4SsN0l_dSWwSc",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    }
  );
  //#endregion fetch
  //#region error handling
  if (!response.ok) {
    const errorResData = await response.json();
    const errorId = errorResData.error.message;
    let message = "Invalid";
    if (errorId === "EMAIL_EXISTS") {
      message = `Email ${email} already exist`;
    }
    throw new Error(message);
  }
  //#endregion error handling
  const resData = await response.json();
  return resData;
};

export const login = async (email, password) => {
  //#region fetch
  const response = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAYBhW90QPHACr8lyOrZc4SsN0l_dSWwSc",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    }
  );
  //#endregion fetch
  //#region error handling
  if (!response.ok) {
    const errorResData = await response.json();
    const errorId = errorResData.error.message;
    let message = "Invalid";
    if (errorId === "EMAIL_NOT_FOUND") {
      message = `Email ${email} cannot be found`;
    } else if (errorId === "INVALID_PASSWORD"){
      message = "Password is incorrect. Please try again"
    }
    throw new Error(message);
  }
  //#endregion error handling
  const resData = await response.json();
  return resData;
};