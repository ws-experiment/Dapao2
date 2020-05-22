import React, { useState, useEffect, useCallback } from "react";
import { TabView } from "react-native-tab-view";
import { useSelector, useDispatch } from "react-redux";
import { Alert, StyleSheet, Dimensions } from "react-native";

import * as orderActions from "../../stores/actions/OrderAction";
import PastOrderScreen from "./PastOrderScreen";
import ToggleMenuButton from "../../components/commons/ToggleMenuButton";

const OrderTabsScreen = (props) => {
  //#region states
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: "currOrder", title: "Order Today" },
    { key: "pastOrder", title: "Past Order" },
  ]);
  //#endregion states
  const orders = useSelector((state) => state.orders.orders);
  const pastOrders = useSelector((state) => state.orders.pastOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(orderActions.fetchPastOrders())
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        Alert.alert(err.message);
      });
  }, [dispatch]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "currOrder":
        return <PastOrderScreen orders={orders} isLoading={isLoading} />;
      case "pastOrder":
        return <PastOrderScreen orders={pastOrders} isLoading={isLoading} />;
      default:
        return null;
    }
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={(index) => setIndex(index)}
      initialLayout={styles.screen}
    />
  );
};

OrderTabsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Past Order",
    headerLeft: () => (
      <ToggleMenuButton onPress={() => navData.navigation.toggleDrawer()} />
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    width: Dimensions.get("window").width,
  },
});

export default OrderTabsScreen;
