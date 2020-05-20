export const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
export const FORM_RESET = "FORM_RESET";

export const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE: {
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };

      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid,
      };

      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }
      return {
        formIsValid: updatedFormIsValid,
        inputValidities: updatedValidities,
        inputValues: updatedValues,
      };
    }
    case FORM_RESET: {
      const newInputValidities = {...state.inputValidities };
      Object.keys(newInputValidities).forEach((x) => {
        return (newInputValidities[x] = false);
      });

      const newInputValues = { ...state.inputValues };
      Object.keys(newInputValues).forEach((x) => {
        return (newInputValues[x] = "");
      });
      return {
        formIsValid: false,
        inputValidities: newInputValidities,
        inputValues: newInputValues,
      };
    }
  }
};
