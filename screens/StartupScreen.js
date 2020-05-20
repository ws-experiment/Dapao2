import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  AsyncStorage,
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import * as authActions from "../stores/actions/AuthAction";
import * as userActions from "../stores/actions/UserAction";

const StartupScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      const userTypeData = await AsyncStorage.getItem("userType");
      if (!userData && !userTypeData) {
        props.navigation.navigate("Auth");
        return;
      }

      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;

      const userTypeDataContent = JSON.parse(userTypeData);
      const { password, userType } = userTypeDataContent;
      const expirationDate = new Date(expiryDate);
    
      if (expirationDate <= new Date() || !token || !userId) {
        AsyncStorage.removeItem("userData");
        AsyncStorage.removeItem("userType");
        props.navigation.navigate("Auth");
        return;
      }
      const expirationTime = expirationDate.getTime() - new Date().getTime();
      dispatch(authActions.authenticate(userId, token, expirationTime));
      dispatch(userActions.setCurrentUser(userId, password));

      if (userType === "Customer") {
        props.navigation.navigate("Customer");
      } else {
        props.navigation.navigate("Owner");
      }
    };
    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartupScreen;
