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
import ImagePicker from "../../components/commons/ImagePicker";
import defaultStyles from "../../constants/defaultStyles";

import Colors from "../../constants/Colors";
import Input from "../../components/commons/Input";
import Card from "../../components/commons/Card";

import * as menuActions from "../../stores/actions/MenusAction";
import {
  formReducer,
  FORM_INPUT_UPDATE,
} from "../../stores/reducers/common/FormReducer";

const EditMenuScreen = (props) => {
  //#region states
  const menuId = props.navigation.getParam("menuId");
  const day = props.navigation.getParam("day");
  const editedMenu = useSelector((state) =>
    state.menus.ownerMenuItems.find((menu) => menu.id === menuId)
  );
  const [isLoading, setIsLoading] = useState(false);

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

  const imageTakenHandler = (imagePath) => {
    inputChangeHandler("imageUrl", imagePath, true);
  };

  const submitHandler = () => {
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
      } else {
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
  };
  //#endregion handlers

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
    >
      <ScrollView>
        <Card style={styles.form}>
          <ImagePicker
            onImageTaken={imageTakenHandler}
            imageUrl={editedMenu ? editedMenu.imageUrl : ""}
          />
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
          <View style={styles.button}>
            <Button title="Submit" onPress={submitHandler} />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditMenuScreen.navigationOptions = (navData) => {
  return {
    headerTitle: `Edit Menu`,
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 10,
    padding: 15,
  },
  button: {
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default EditMenuScreen;
