import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Card from "../components/commons/Card";
import Input from "../components/commons/Input";

import {
  formReducer,
  FORM_INPUT_UPDATE,
} from "../stores/reducers/common/FormReducer";

import ClearButton from "../components/commons/ClearButton";
import Colors from "../constants/Colors";
import * as authActions from "../stores/actions/AuthAction";
import RegText from "../components/commons/RegText";

const AuthScreen = (props) => {
  const newUser = props.navigation.getParam("isSignup");
  const currentUser = useSelector((state) => state.user.currentUser);
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

  useEffect(() => {
    //Navigate after login
    if (
      Object.entries(currentUser).length !== 0 &&
      currentUser.constructor === Object
    ) {
      if (currentUser.userType === "Customer") {
        props.navigation.navigate("Customer");
      } else {
        props.navigation.navigate("Owner");
      }

      setIsLoading(false);
    }
  }, [currentUser]);

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
    } finally {
      setIsLoading(false);
    }
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
          <ClearButton
            title={isSignUp ? "Sign up" : "Login"}
            color={Colors.primary}
            disabled={formState.formIsValid ? false : true}
            onPress={isSignUp ? registerUserHandler : authHandler}
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
  },
  remarksText: {
    fontSize: 18,
  },
});

export default AuthScreen;
