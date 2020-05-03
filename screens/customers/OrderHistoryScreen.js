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

const OrderHistoryScreen = (props) => {
  //#region states
  const [isLoading, setIsLoading] = useState(false);
  const orders = useSelector((state) => state.orders.orders);

  //#endregion states
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(orderActions.fetchOrder())
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

  if (orders.length === 0) {
    return (
      <View style={defaultStyles.centeredContainer}>
        <Text>No Orders Found! Add some orders now.</Text>
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

OrderHistoryScreen.navigationOptions = navData => {
  return {
    headerTitle: "Past Order",
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
  }
};

const styles = StyleSheet.create({
  overall: {
    marginTop: 15
  }
});

export default OrderHistoryScreen;
