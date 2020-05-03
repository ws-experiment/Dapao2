import React, { useReducer, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import defaultStyles from "../../constants/defaultStyles";

import Colors from "../../constants/Colors";
import Input from "../../components/commons/Input";
import Card from "../../components/commons/Card";

import * as menuActions from "../../stores/actions/MenusAction";
import { formReducer } from "../../stores/reducers/common/FormReducer";
import { FORM_INPUT_UPDATE } from "../../stores/reducers/common/FormReducer";

const EditMenuScreen = (props) => {
  //#region states
  const menuId = props.navigation.getParam("menuId");
  const day = props.navigation.getParam("day");
  const editedMenu = useSelector((state) =>
    state.menus.ownerMenuItems.find((menu) => menu.id === menuId)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  //#endregion states
  const dispatch = useDispatch();

  //#region localReducer
  const initialFormState = {
    inputValues: {
      title: editedMenu ? editedMenu.title : "",
      imageUrl: editedMenu ? editedMenu.imageUrl : "",
      description: editedMenu ? editedMenu.description : "",
      price: "",
    },
    inputValidities: {
      title: editedMenu ? true : false,
      imageUrl: editedMenu ? true : false,
      description: editedMenu ? true : false,
      price: editedMenu ? true : false,
    },
    formIsValid: editedMenu ? true : false,
  };
  const [formState, dispatchFormState] = useReducer(
    formReducer,
    initialFormState
  );
  //#endregion localReducer

  //#region handlers
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  const submitHandler = () => {
    if (!formState.formIsValid) {
      Alert.alert("Please check the errors in the form", [{ text: "Okay" }]);
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      if (editedMenu) {
        dispatch(
          menuActions.updateOwnerMenu(
            menuId,
            formState.inputValues.title,
            formState.inputValues.imageUrl,
            formState.inputValues.description
          )
        );
      }
      else{
        dispatch(
          menuActions.addMenu(
            formState.inputValues.title,
            formState.inputValues.imageUrl,
            formState.inputValues.description,
            +formState.inputValues.price,
            day
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      console.log(err.message);
    }
    setIsLoading(false);
  };

  //#endregion handlers

  return (
    <KeyboardAvoidingView behavior="padding">
      <ScrollView>
        <Card style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Invalid field"
            keyBoardType="default"
            autoCapitalize="sentences"
            autoCorrect
            onInputChange={inputChangeHandler}
            initialValue={editedMenu ? editedMenu.title : ""}
            initiallyValid={!!editedMenu}
            required
          />
          <Input
            id="imageUrl"
            label="Image Url"
            errorText="Invalid field"
            keyBoardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLine={3}
            onInputChange={inputChangeHandler}
            initialValue={editedMenu ? editedMenu.imageUrl : ""}
            initiallyValid={!!editedMenu}
            required
          />
          {!editedMenu && (
            <Input
              id="price"
              label="Price"
              errorText="Invalid field"
              keyBoardType="decimal-pad"
              onInputChange={inputChangeHandler}
              required
              min={1}
            />
          )}
          <Input
            id="description"
            label="Description"
            errorText="Invalid field"
            keyBoardType="default"
            autoCapitalize="sentences"
            autoCorrect
            onInputChange={inputChangeHandler}
            initialValue={editedMenu ? editedMenu.description : ""}
            initiallyValid={!!editedMenu}
            required
            minLength={5}
          />
        </Card>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <Button title="Submit" onPress={submitHandler} />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 10,
    padding: 15,
  },
});

export default EditMenuScreen;
