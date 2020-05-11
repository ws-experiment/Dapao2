import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  ActivityIndicator,
  Platform,
  Alert,
} from "react-native";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import MenuItem from "../../components/MenuItem";
import ClearButton from "../../components/commons/ClearButton";
import RegText from "../../components/commons/RegText";
import BoldText from "../../components/commons/BoldText";

import * as menuActions from "../../stores/actions/MenusAction";
import * as cartActions from "../../stores/actions/CartAction";

import CustomHeaderButton from "../../components/commons/CustomHeaderButton";
import CustomHeaderIcon from "../../components/commons/CustomHeaderIcon";
import Colors from "../../constants/Colors";
import defaultStyles from "../../constants/defaultStyles";
import BorderlessButton from "../../components/commons/BorderlessButton";

const MenuOverviewScreen = (props) => {
  //#region states
  const [weekday, setWeekday] = useState(moment(new Date()).format("dddd"));

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    await dispatch(menuActions.fetchMenuOfTheDay(weekday));
    setIsRefreshing(false);
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
    //setIsLoading(true);
    loadProducts();
    // setIsLoading(false);
  }, [dispatch, loadProducts]);

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
  }

  if (menuItemsOfTheDay.length == 0) {
    return (
      <View style={defaultStyles.centeredContainer}>
        <RegText>Sorry, Order is not available for the day.</RegText>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={menuItemsOfTheDay}
        // refreshing={isRefreshing}
        // onRefresh={loadProducts}
        renderItem={(itemData) => (
          <MenuItem
            imageSource={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onPress={() => selectHandler(itemData.item.id, itemData.item.title)}
          >
            <BorderlessButton
              title="TO CART"
              style={styles.toCartText}
              onPress={() => {
                dispatch(cartActions.addCart(itemData.item));
              }}
            />
          </MenuItem>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

MenuOverviewScreen.navigationOptions = (navData) => {
  const badgeCount = navData.navigation.getParam("badgeCount");
  return {
    headerTitle: `Menu of ${navData.navigation.getParam("weekday")}`,
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
});

export default MenuOverviewScreen;
