import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Button,
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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const orders = useSelector((state) => state.orders.customerOrders);
  //#endregion states
  const dispatch = useDispatch();

  const loadOrders = useCallback(async () => {
    setIsRefreshing(true);
    await dispatch(orderActions.fetchCustomerOrders()).then(() => {
      setIsRefreshing(false);
    });
  }, [dispatch, setIsRefreshing]);

  useEffect(() => {
    const focusSub = props.navigation.addListener("didFocus", loadOrders);
    return () => {
      focusSub.remove();
    };
  }, [loadOrders]);

  useEffect(() => {
    setIsLoading(true);
    loadOrders()
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [dispatch, loadOrders]);

  if (isLoading) {
    return (
      <View style={defaultStyles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isLoading && orders.length === 0) {
    return (
      <View style={[styles.noOrderContainer, defaultStyles.centeredContainer]}>
        <Text>No Orders Found on Today </Text>
        <View style={styles.button}>
          <Button title="Tap to Refresh" onPress={() => loadOrders()} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.overall}>
      <FlatList
        data={orders}
        refreshing={isRefreshing}
        onRefresh={loadOrders}
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
    flex: 1,
    marginTop: 15,
  },
  noOrderContainer: {
    justifyContent: "center",
  },
  button: {
    marginTop: 10,
  },
});

export default OrdersScreen;
