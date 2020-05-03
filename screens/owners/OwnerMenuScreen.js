import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../../components/commons/CustomHeaderButton";

const OwnerMenuScreen = (props) => {
  //#region states
  const weekday = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const imageUri =
    "https://content.thriveglobal.com/wp-content/uploads/2018/10/10eHClD8GsCtUWZ0vc-GWQA.jpeg";
  //#endregion states

  const renderItems = (itemData) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("OwnerMenuDetails", {day: itemData.item})
          }}
        >
          <ImageBackground
            source={{
              uri: imageUri,
            }}
            style={styles.backgroundImage}
          >
            <View style={styles.weekdayContainer}>
              <Text style={styles.weekDayText}>{itemData.item}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={weekday}
      numColumns={2}
      renderItem={renderItems}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

OwnerMenuScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Select You Day",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 8,
    elevation: 6,
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    height: 100,
    marginHorizontal: 10,
    marginVertical: 10,
    overflow:
      Platform.OS === "android" && Platform.Version >= 21
        ? "hidden"
        : "visible",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    opacity: 0.5,
  },
  weekdayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,1)",
  },
  weekDayText: {
    color: "white",
    textAlign: "center",
    fontSize: 22,
  },
});

export default OwnerMenuScreen;
