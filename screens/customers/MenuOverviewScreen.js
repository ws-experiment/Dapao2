import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
  Text,
  BackHandler,
} from "react-native";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import MenuItem from "../../components/MenuItem";
import ButtonClear from "../../components/commons/buttons/ButtonClear";
import TextReg from "../../components/commons/TextReg";

import * as menuActions from "../../stores/actions/MenusAction";
import * as cartActions from "../../stores/actions/CartAction";

import Colors from "../../constants/Colors";
import defaultStyles from "../../constants/defaultStyles";
import ToggleMenuButton from "../../components/commons/headerButtons/ToggleMenuButton";
import AnimatedHeaderIcon from "../../components/commons/headerButtons/AnimatedHeaderIcon";
import ButtonGoToCart from "../../components/commons/buttons/ButtonGoToCart";

const MenuOverviewScreen = (props) => {
  //#region states
  const [weekday] = useState(moment().format("dddd"));
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading] = useState(false);

  const menuItemsOfTheDay = useSelector(
    (state) => state.menus.menuItemsOfTheDay
  );
  const count = useSelector((state) => state.cart.totalItems);
  const totalPrice = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  //#endregion states

  //#region callbacks
  const loadProducts = useCallback(async () => {
    setIsRefreshing(true);
    await dispatch(menuActions.fetchMenuOfTheDay(weekday)).then(() => {
      setIsRefreshing(false);
    });
  }, [dispatch, setIsRefreshing, weekday]);
  //#endregion callbacks

  useEffect(() => {
    console.log("[MenuOverviewScreen]", "navigation weekday");
    props.navigation.setParams({ weekday: weekday });
  }, [weekday]);

  //Called only after the event.
  useEffect(() => {
    console.log("[MenuOverviewScreen]", "listener");
    const willFocusSub = props.navigation.addListener("didFocus", loadProducts);
    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  // Fetch for the first time when the screen is firstly rendered
  useEffect(() => {
    console.log("[MenuOverviewScreen]", "loadProducts");
    loadProducts();
  }, [dispatch, loadProducts]);

  useEffect(() => {
    console.log("[MenuOverviewScreen]", "navigation");
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
        <TextReg>Sorry, Order is not available for the day.</TextReg>
      </View>
    );
  } else if (new Date() > moment("23:59:00", "hh:mm:ss")) {
    return (
      <View style={defaultStyles.centeredContainer}>
        <View style={{ alignItems: "center" }}>
          <TextReg>Sorry, you late for order today.</TextReg>
          <TextReg>Please order earlier before 10.00 am next time</TextReg>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.main}>
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
                <ButtonClear
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
        <ButtonGoToCart
          itemCount={count}
          totalPrice={totalPrice}
          clicked={() => props.navigation.navigate("Cart")}
        />
        {/* <View style={styles.goToCartButtonContainer}>
          <ButtonClear safe title="Go To Cart" />
        </View> */}
      </View>
    );
  }
};

MenuOverviewScreen.navigationOptions = (navData) => {
  const badgeCount = navData.navigation.getParam("badgeCount");

  const navigateCart = () => {
    navData.navigation.navigate("Cart");
  };

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
            <AnimatedHeaderIcon
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              badgeCount={badgeCount}
              onPress={navigateCart}
            />
          }
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  goToCartButtonContainer: {
    alignItems: "stretch",
    padding: 15,
    marginBottom: 15,
  },
  toCartText: {
    fontSize: 16,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    justifyContent: "center",
  },
});

export default MenuOverviewScreen;
