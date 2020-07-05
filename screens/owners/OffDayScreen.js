import React, { useState, useEffect, useCallback } from "react";
import {
  ActivityIndicator,
  View,
  Platform,
  Alert,
  StyleSheet,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../../components/commons/headerButtons/CustomHeaderButton";
import DatePicker from "../../components/commons/DatePicker";
import defaultStyles from "../../constants/defaultStyles";
import * as offDayActions from "../../stores/actions/OffDayAction";
import Colors from "../../constants/Colors";
import ButtonClear from "../../components/commons/buttons/ButtonClear";
import ToggleMenuButton from "../../components/commons/headerButtons/ToggleMenuButton";

const OffDayScreen = (props) => {
  //#region states
  const dates = useSelector((state) => state.offDay.offDayItems);
  const [isLoading, setIsLoading] = useState(false);
  //#endregion states

  const dispatch = useDispatch();

  //either async await function in use effect or useCallback in another
  //function
  const loadOffDays = useCallback(async () => {
    setIsLoading(true);
    await dispatch(offDayActions.fetchOwnerOffDays()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  //#region useEffects
  useEffect(() => {
    const willFocusSub = props.navigation.addListener("didFocus", loadOffDays);
    return () => {
      willFocusSub.remove();
    };
  }, [loadOffDays]);

  useEffect(() => {
    loadOffDays();
  }, [loadOffDays]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [dispatch, submitHandler, dates]);

  //#endregion useEffects

  //#region handlers
  const submitHandler = useCallback(() => {
    dispatch(offDayActions.saveOwnerOffDays(dates));
    Alert.alert("Save successfully");
  }, [dispatch, dates]);

  const onDayPressHandler = (day) => {
    const selectedDate = day.dateString;
    dispatch(offDayActions.addOwnerOffDays(selectedDate));
  };
  //#endregion handlers
  if (isLoading) {
    return (
      <View style={defaultStyles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <DatePicker markedDates={dates} onDayPress={onDayPressHandler} />
      <View style={styles.saveContainer}>
        <ButtonClear safe title="Save" color={Colors.primary} onPress={submitHandler}/>
      </View>
    </View>
  );
};

OffDayScreen.navigationOptions = (navData) => {
  const submitBtn = navData.navigation.getParam("submit");
  return {
    headerTitle: "Restrain Order's Days",
    headerLeft: () => (
      <ToggleMenuButton onPress={() => navData.navigation.toggleDrawer()} />
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="ADD"
          iconName={Platform.OS === "android" ? "md-save" : "ios-save"}
          onPress={submitBtn}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  saveContainer: {
    width: "100%",
    padding: 10
  }
});

export default OffDayScreen;
