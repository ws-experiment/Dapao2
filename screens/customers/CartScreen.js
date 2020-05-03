import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

import Card from "../../components/commons/Card";
import RegText from "../../components/commons/RegText";
import BoldText from "../../components/commons/BoldText";
import Colors from "../../constants/Colors";
import BorderlessButton from "../../components/commons/BorderlessButton";
import CartItem from "../../components/CartItem";

import * as cartActions from "../../stores/actions/CartAction";
import * as orderActions from "../../stores/actions/OrderAction";

const CartScreen = (props) => {
  //#region states
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.totalAmount);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isLoading, setIsLoading] = useState(false);
  //#endregion states

  const dispatch = useDispatch();
  // const loadCurrentUser = useCallback(async () => {
  //   await dispatch(userActions.setCurrentUser);
  // }, [dispatch]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   loadCurrentUser();
  //   setIsLoading(false);
  // }, [currentUser]);

  //#region handlers
  const sendOrderHandler = () => {
    if (currentUser.balance < totalPrice) {
      Alert.alert(
        "Invalid Order",
        "Your balance is insufficient. Please contact admin for top-up.",
        [{ text: "Okay", style: "destructive" }]
      );
      return;
    }
    dispatch(orderActions.addOrder(cartItems, totalPrice));
    props.navigation.goBack();
  };
  //#endregion handlers

  return (
    <View style={styles.screen}>
      <Card style={styles.cardContainer}>
        <RegText style={styles.total}>Total: </RegText>
        <BoldText style={styles.price}>RM {totalPrice.toFixed(2)}</BoldText>
        <BorderlessButton
          title="ORDER NOW"
          disabled={cartItems.length === 0}
          onPress={sendOrderHandler}
        />
      </Card>
      <View style={styles.flatList}>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <CartItem
              title={itemData.item.menuTitle}
              price={itemData.item.price}
              quantity={itemData.item.quantity}
              sum={itemData.item.sum}
              delete
              onRemove={() => {
                dispatch(cartActions.removeFromCart(itemData.item.id));
              }}
            />
          )}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator size="small" />
      ) : (
        <View style={styles.balanceContainer}>
          <RegText style={styles.balanceTitle}>Remaining Balance</RegText>
          <Card style={styles.cardContainer}>
            <Ionicons
              name={Platform.OS === "android" ? "md-cash" : "ios-cash"}
              color="green"
              size={26}
              style={{ marginLeft: 10 }}
            />
            <BoldText style={styles.balance}>RM {currentUser.balance.toFixed(2)}</BoldText>
          </Card>
        </View>
      )}
    </View>
  );
};

CartScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "My Cart",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "stretch",
    margin: 20,
  },

  total: {
    marginLeft: 10,
  },
  price: {
    fontSize: 20,
    color: Colors.primary,
  },
  balanceTitle: {
    padding: 10,
    margin: 5,
  },
  balance: {
    fontSize: 20,
  },
  flatList: {
    height: "70%",
  },
  balanceContainer: {
    height: "100%",
  },
  cardContainer: {
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default CartScreen;
