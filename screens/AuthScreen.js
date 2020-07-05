import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { StackActions, NavigationActions } from "react-navigation";

import Card from "../components/commons/Card";
import Input from "../components/commons/Input";

import {
  formReducer,
  FORM_INPUT_UPDATE,
} from "../stores/reducers/common/FormReducer";

import ButtonClear from "../components/commons/buttons/ButtonClear";
import Colors from "../constants/Colors";
import * as authActions from "../stores/actions/AuthAction";
import TextReg from "../components/commons/TextReg";

const AuthScreen = (props) => {
  const isSignUp = props.navigation.getParam("isSignup");
  const currentUser = useSelector((state) => state.user.currentUser);
  //#region states
  //const [isSignUp, setIsSignUp] = useState(newUser ? true : false);
  const [isLoading, setIsLoading] = useState(false);
  //#endregion states

  const dispatch = useDispatch();

  //#region localReducer
  const initialFormState = {
    inputValues: {
      name: "",
      email: "",
      password: "",
    },
    inputValidities: {
      name: isSignUp ? false : true,
      email: false,
      password: isSignUp ? true : false,
    },
    formIsValid: false,
  };
  const [formState, dispatchFormState] = useReducer(
    formReducer,
    initialFormState
  );
  //#endregion localReducer

  useEffect(() => {
    //Navigate after login
    if (
      Object.entries(currentUser).length !== 0 &&
      currentUser.constructor === Object
    ) {
      //If first-time user, prompt to reset password
      if (formState.inputValues.password === "Password@321" && !isSignUp) {
        props.navigation.navigate("Settings", { firstTimeLogin: true });
      } else if (currentUser.userType === "Customer" && !isSignUp) {
        props.navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "Customer" })],
          })
        );
      } else if (!isSignUp) {
        props.navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "Owner" })],
          })
        );
      }
      setIsLoading(false);
    }
  });

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

  const authHandler = async () => {
    let action = authActions.login(
      formState.inputValues.email,
      formState.inputValues.password
    );
    setIsLoading(true);
    try {
      await dispatch(action);
    } catch (err) {
      Alert.alert(err.message);
      setIsLoading(false);
    }
  };

  const registerUserHandler = async () => {
    let action = authActions.registerNewUser(
      formState.inputValues.email,
      "Password@321",
      formState.inputValues.name
    );
    setIsLoading(true);
    try {
      await dispatch(action);
      Alert.alert("User registered successfully");
      props.navigation.navigate("UserOverview");
    } catch (err) {
      Alert.alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  //#endregion handlers

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={styles.screen}>
        <Card style={styles.authContainer}>
          {isSignUp && (
            <Input
              id="name"
              label="User Name"
              keyBoardType="default"
              required
              errorText="Please enter name"
              onInputChange={inputChangeHandler}
            />
          )}
          <Input
            id="email"
            label="E-mail"
            keyBoardType="email-address"
            required
            email
            autoCapitalize="none"
            errorText="Please enter valid email address"
            onInputChange={inputChangeHandler}
          />
          {!isSignUp && (
            <Input
              id="password"
              label="Password"
              secureTextEntry
              required
              minLength={5}
              errorText="Invalid password"
              autoCapitalize="none"
              onInputChange={inputChangeHandler}
            />
          )}
        </Card>
        {isSignUp && (
          <View style={styles.remarksContainer}>
            <TextReg style={styles.remarksText}>
              Remarks: User will be pre-loaded with RM 10
            </TextReg>
            <TextReg style={styles.remarksText}>
              Default Password: Password@321
            </TextReg>
          </View>
        )}
        <View style={styles.signUp}>
          {isLoading ? (
            <ActivityIndicator size="small" />
          ) : (
            <ButtonClear
              safe={isSignUp ? false : true}
              title={isSignUp ? "Sign up" : "Login"}
              color={Colors.primary}
              disabled={formState.formIsValid ? false : true}
              onPress={isSignUp ? registerUserHandler : authHandler}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

AuthScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("isSignup")
      ? "Register User"
      : "Login",
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
  signUp: {
    height: "10%",
    width: "90%",
  },
  remarksContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  remarksText: {
    fontSize: 18,
  },
});

export default AuthScreen;
