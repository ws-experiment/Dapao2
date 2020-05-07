import React, { useState, useReducer, useCallback } from "react";
import {
  View,
  StyleSheet,
  Button,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";

import Card from "../components/commons/Card";
import Input from "../components/commons/Input";

import {
  formReducer,
  FORM_INPUT_UPDATE,
} from "../stores/reducers/common/FormReducer";

import Colors from "../constants/Colors";
import * as authActions from "../stores/actions/AuthAction";
import RegText from "../components/commons/RegText";

const AuthScreen = (props) => {
  const newUser = props.navigation.getParam("isSignup");
  //#region states
  const [isSignUp, setIsSignUp] = useState(newUser ? true : false);
  const [isLoading, setIsLoading] = useState(false);
  //#endregion states

  const dispatch = useDispatch();

  //#region localReducer
  const initialFormState = {
    inputValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    inputValidities: {
      name: isSignUp ? false : true,
      email: false,
      password: false,
      confirmPassword: isSignUp ? false : true,
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

  const authHandler = async () => {};

  const signUpHandler = async () => {
    let action = authActions.signUp(
      formState.inputValues.email,
      formState.inputValues.password,
      formState.inputValues.name
    );
    setIsLoading(true);
    try {
      await dispatch(action);
      Alert.alert("User registered successfully");
      props.navigation.navigate("UserOverview");
    } catch (err) {
      Alert.alert(err.message);
    }
    setIsLoading(false);
  };
  //#endregion handlers

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <Card style={styles.authContainer}>
        <ScrollView>
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
          <Input
            id="password"
            label="Password"
            secureTextEntry
            required
            minLength={5}
            authContainer="none"
            errorText="Invalid password"
            autoCapitalize="none"
            onInputChange={inputChangeHandler}
          />
          {isSignUp && (
            <Input
              id="confirmPassword"
              label="Confirm Password"
              secureTextEntry
              required
              authContainer="none"
              errorText="Password does not match"
              password
              primaryPassword={formState.inputValues.password}
              autoCapitalize="none"
              onInputChange={inputChangeHandler}
            />
          )}
        </ScrollView>
      </Card>
      {isSignUp && (
        <View style={styles.remarksContainer}>
          <RegText style={styles.remarksText}>
            Remarks: User will be pre-loaded with RM 10
          </RegText>
        </View>
      )}
      <View style={styles.signUp}>
        {isLoading ? (
          <ActivityIndicator size="small" />
        ) : (
          <Button
            title={isSignUp ? "Sign up" : "Login"}
            color={Colors.primary}
            disabled={formState.formIsValid ? false : true}
            onPress={isSignUp ? signUpHandler : authHandler}
          />
        )}
      </View>
    </KeyboardAvoidingView>
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
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
  },
  authContainer: {
    width: "95%",
    maxWidth: 400,
    maxHeight: 450,
    padding: 20,
  },
  signUp: {
    height: "10%",
    width: "90%",
  },
  remarksContainer: {
    marginTop: 10,
  },
  remarksText: {
    fontSize: 18,
  },
});

export default AuthScreen;
