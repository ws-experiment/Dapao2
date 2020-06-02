import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
  Text,
} from "react-native";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import MenuItem from "../../components/MenuItem";
import ClearButton from "../../components/commons/ClearButton";
import RegText from "../../components/commons/RegText";

import * as menuActions from "../../stores/actions/MenusAction";
import * as cartActions from "../../stores/actions/CartAction";

import CustomHeaderIcon from "../../components/commons/CustomHeaderIcon";
import Colors from "../../constants/Colors";
import defaultStyles from "../../constants/defaultStyles";
import ToggleMenuButton from "../../components/commons/ToggleMenuButton";

const MenuOverviewScreen = (props) => {
  //#region states
  const [weekday] = useState(moment().format("dddd"));
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading] = useState(false);

  const menuItemsOfTheDay = useSelector(
    (state) => state.menus.menuItemsOfTheDay
  );
  const count = useSelector((state) => state.cart.totalItems);

  //#endregion states

  useEffect(() => {
    props.navigation.setParams({ weekday: weekday });
  }, [weekday]);

  const dispatch = useDispatch();
  //#region callbacks

  const loadProducts = useCallback(async () => {
    setIsRefreshing(true);
    await dispatch(menuActions.fetchMenuOfTheDay(weekday)).then(() => {
      setIsRefreshing(false);
    });
  }, [dispatch, setIsRefreshing, weekday]);
  //#endregion callbacks

  //Called only after the event.
  useEffect(() => {
    const willFocusSub = props.navigation.addListener("didFocus", loadProducts);
    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  // Fetch for the first time when the screen is firstly rendered
  useEffect(() => {
    loadProducts();
  }, [dispatch, loadProducts, weekday]);

  useEffect(() => {
    props.navigation.setParams({ badgeCount: count });
  }, [count]);

  //#region handlers
  const selectHandler = (id, title) => {
    props.navigation.navigate("MenuDetails", { menuId: id, menuTitle: title });
  };
  //#endregion handlers

  if (isLoading) {
    return (
      <View style={defaultStyles.loading}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  } else if (menuItemsOfTheDay.length == 0) {
    return (
      <View style={defaultStyles.centeredContainer}>
        <RegText>Sorry, Order is not available for the day.</RegText>
      </View>
    );
  } else if (new Date() > moment("10:00:00", "hh:mm:ss")) {
    return (
      <View style={defaultStyles.centeredContainer}>
        <View style={{ alignItems: 'center'}}>
          <RegText>Sorry, you late for order today.</RegText>
          <RegText>Please order earlier before 10.00 am next time</RegText>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <FlatList
          data={menuItemsOfTheDay}
          renderItem={(itemData) => (
            <MenuItem
              imageSource={itemData.item.imageUrl}
              title={itemData.item.title}
              price={itemData.item.price}
              onPress={() =>
                selectHandler(itemData.item.id, itemData.item.title)
              }
            >
              <View style={styles.buttonContainer}>
                <ClearButton
                  title="TO CART"
                  style={styles.toCartText}
                  onPress={() => {
                    dispatch(cartActions.addCart(itemData.item));
                  }}
                />
              </View>
            </MenuItem>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
};

MenuOverviewScreen.navigationOptions = (navData) => {
  const badgeCount = navData.navigation.getParam("badgeCount");
  return {
    headerTitle: `Menu of ${navData.navigation.getParam("weekday")}`,
    headerLeft: () => (
      <ToggleMenuButton onPress={() => navData.navigation.toggleDrawer()} />
    ),
    headerRight: () => (
      <HeaderButtons>
        <Item
          title="Cart"
          ButtonElement={
            <CustomHeaderIcon
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              badgeCount={badgeCount}
            />
          }
          onPress={() => navData.navigation.navigate("Cart")}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  toCartText: {
    fontSize: 16,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    justifyContent: "center",
  },
});

export default MenuOverviewScreen;
