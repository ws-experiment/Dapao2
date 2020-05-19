import React from "react";
import { Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "./CustomHeaderButton";

const ToggleMenuButton = (props) => {
  return (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="menu"
        iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
        onPress={props.onPress}
      />
    </HeaderButtons>
  );
};

export default ToggleMenuButton;
