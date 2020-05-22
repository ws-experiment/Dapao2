import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";

import OrderItem from "../../components/OrderItem";
import defaultStyles from "../../constants/defaultStyles";

const PastOrderScreen = (props) => {
  if (props.isLoading) {
    return (
      <View style={defaultStyles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (props.orders.length === 0) {
    return (
      <View style={defaultStyles.centeredContainer}>
        <Text>No Orders Found! </Text>
      </View>
    );
  }

  return (
    <View style={styles.overall}>
      <FlatList
        data={props.orders}
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

const styles = StyleSheet.create({
  overall: {
    marginTop: 15,
  },
});

export default PastOrderScreen;
