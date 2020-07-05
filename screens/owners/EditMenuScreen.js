import React, { useReducer, useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
  Keyboard,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ImagePicker from "../../components/commons/ImagePicker";

import Colors from "../../constants/Colors";
import Input from "../../components/commons/Input";
import Card from "../../components/commons/Card";
import ButtonClear from "../../components/commons/buttons/ButtonClear";

import * as menuActions from "../../stores/actions/MenusAction";
import {
  formReducer,
  FORM_INPUT_UPDATE,
} from "../../stores/reducers/common/FormReducer";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

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
      price: editedMenu ? editedMenu.price : "",
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
            formState.inputValues.description,
            +formState.inputValues.price
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
      Alert.alert(err.message);
    }
  };
  //#endregion handlers

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding" keyboardVerticalOffset={120}>
      <Card style={styles.form}>
        <ImagePicker
          onImageTaken={imageTakenHandler}
          imageUrl={editedMenu ? editedMenu.imageUrl : ""}
        />
        <ScrollView>
          <Input
            id="title"
            label="Title"
            errorText="Invalid field"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            onInputChange={inputChangeHandler}
            initialValue={editedMenu ? editedMenu.title : ""}
            initiallyValid={!!editedMenu}
            required
          />
          <Input
            id="price"
            label="Price"
            errorText="Invalid field"
            keyboardType="decimal-pad"
            onInputChange={inputChangeHandler}
            required
            initialValue={editedMenu ? editedMenu.price.toFixed(2) : ""}
            initiallyValid={!!editedMenu}
          />
          <Input
            id="description"
            label="Description"
            errorText="Invalid field"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            onInputChange={inputChangeHandler}
            initialValue={editedMenu ? editedMenu.description : ""}
            initiallyValid={!!editedMenu}
            required
            minLength={5}
          />
        </ScrollView>
      </Card>
      {isLoading ? (
        <ActivityIndicator size="small" color={Colors.primary} />
      ) : (
        <View style={styles.button}>
          <ButtonClear
            title="Submit"
            onPress={submitHandler}
            disabled={!formState.formIsValid}
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

EditMenuScreen.navigationOptions = (navData) => {
  const menuId = navData.navigation.getParam("menuId");
  return {
    headerTitle: menuId ? `Edit Menu` : `Add Menu`,
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
