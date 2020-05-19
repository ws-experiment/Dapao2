import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import OrderItem from "../../components/OrderItem";
import CustomHeaderButton from "../../components/commons/CustomHeaderButton";
import * as orderActions from "../../stores/actions/OrderAction";
import defaultStyles from "../../constants/defaultStyles";
import ToggleMenuButton from "../../components/commons/ToggleMenuButton";

const OrdersScreen = (props) => {
  //#region states
  const [isLoading, setIsLoading] = useState(false);
  const orders = useSelector((state) => state.orders.customerOrders);
  //#endregion states
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(orderActions.fetchCustomerOrders())
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={defaultStyles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isLoading && orders.length === 0) {
    return (
      <View style={defaultStyles.centeredContainer}>
        <Text>No Orders Found on Today </Text>
      </View>
    );
  }

  return (
    <View style={styles.overall}>
      <FlatList
        data={orders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(itemData) => (
          <OrderItem
            name={itemData.item.name}
            key={itemData.item.id}
            totalPrice={itemData.item.totalPrice}
            date={itemData.item.date}
            cartItem={itemData.item.cartItems}
          />
        )}
      />
    </View>
  );
};

OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Orders Today",
    headerLeft: () => (
      <ToggleMenuButton onPress={() => navData.navigation.toggleDrawer()} />
    ),
  };
};

const styles = StyleSheet.create({
  overall: {
    marginTop: 15,
  },
});

export default OrdersScreen;
