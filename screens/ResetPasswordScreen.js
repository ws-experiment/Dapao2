import React, { useReducer, useCallback, useState } from "react";
import { StyleSheet, ScrollView, Platform } from "react-native";
import { useDispatch } from "react-redux";

import {
  formReducer,
  FORM_INPUT_UPDATE,
} from "../stores/reducers/common/FormReducer";
import { KeyboardAvoidingView } from "react-native";
import Card from "../components/commons/Card";
import Input from "../components/commons/Input";
import ToggleMenuButton from "../components/commons/ToggleMenuButton";

const ResetPasswordScreen = (props) => {
  //#region states
  const [isLoading, setIsLoading] = useState(false);
  //#endregion states
  const dispatch = useDispatch();

  //#region localReducer
  const initialFormState = {
    inputValues: {
      currPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    inputValidities: {
      currPassword: false,
      newPassword: false,
      confirmPassword: false,
    },
    formIsValid: false,
  };
  const [formState, dispatchFormState] = useReducer(
    formReducer,
    initialFormState
  );
  //#endregion localReducer

  //#region handlers
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, validity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: validity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );
  //#endregion handlers

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <Card style={styles.authContainer}>
        <ScrollView>
          <Input
            id="currPassword"
            label="Old Password"
            secureTextEntry
            required
            password
            errorText="Invalid Password"
            autoCapitalize="none"
            onInputChange={inputChangeHandler}
          />
          <Input
            id="newPassword"
            label="New Password"
            secureTextEntry
            required
            password
            errorText="Invalid Password"
            autoCapitalize="none"
            onInputChange={inputChangeHandler}
          />
          <Input
            id="confirmPassword"
            label="Confirm Password"
            secureTextEntry
            required
            password
            primaryPassword={formState.inputValues.password}
            errorText="Password does not match"
            autoCapitalize="none"
            onInputChange={inputChangeHandler}
          />
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  );
};

ResetPasswordScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Reset Password",
    headerLeft: () => (
      <ToggleMenuButton onPress={() => navData.navigation.toggleDrawer()} />
     
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
    marginTop: 30,
    alignItems: "center",
  },
  authContainer: {
    width: "95%",
    maxWidth: 400,
    maxHeight: 450,
    padding: 20,
    marginBottom: 20,
  },
});

export default ResetPasswordScreen;
