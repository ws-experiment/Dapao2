import React from "react";
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from "react-navigation-drawer";
import NavigationOptions from "../navigation/NavigationOptions";
import { Ionicons } from "@expo/vector-icons";

//Commons
import AuthScreen from "../screens/AuthScreen";
//Customers
import MenuDetailsScreen from "../screens/customers/MenuDetailsScreen";
import MenuOverviewScreen from "../screens/customers/MenuOverviewScreen";
import CartScreen from "../screens/customers/CartScreen";
import OrderHistoryScreen from "../screens/customers/OrderHistoryScreen";
//Owners
import OwnerMenuScreen from "../screens/owners/OwnerMenuScreen";
import OwnerMenuDetailsScreen from "../screens/owners/OwnerMenuDetailsScreen";
import EditMenuScreen from "../screens/owners/EditMenuScreen";
import UserOverviewScreen from "../screens/owners/UserOverviewScreen";
import AddBalanceScreen from "../screens/owners/AddBalanceScreen";
import OrdersScreen from "../screens/owners/OrdersScreen";

import Colors from "../constants/Colors";

//#region Customers
const MenuStack = createStackNavigator(
  {
    MenuOverview: MenuOverviewScreen,
    MenuDetails: MenuDetailsScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: NavigationOptions,
  }
);

const OrderStack = createStackNavigator(
  {
    OrderHistory: OrderHistoryScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-list" : "ios-list"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: NavigationOptions,
  }
);

const CustomerDrawer = createDrawerNavigator(
  {
    Menu: MenuStack,
    Order: {
      screen: OrderStack,
      navigationOptions: {
        drawerLabel: "My Past Order",
      },
    },
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
  }
);
//#endregion Customers

//#region Owners
const UsersStack = createStackNavigator(
  {
    UserOverview: UserOverviewScreen,
    AddBalance: AddBalanceScreen,
    Auth: AuthScreen 
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-contacts" : "ios-contacts"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: NavigationOptions,
  }
);

const OwnerMenuStack = createStackNavigator(
  {
    OwnerMenu: OwnerMenuScreen,
    OwnerMenuDetails: OwnerMenuDetailsScreen,
    EditMenu: EditMenuScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-list" : "ios-list"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: NavigationOptions,
  }
);

const CustomerOrderStack = createStackNavigator(
  {
    Order: OrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-basket" : "ios-basket"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: NavigationOptions,
  }
);

const OwnerDrawer = createDrawerNavigator({
  Orders: CustomerOrderStack,
  OwnerMenu: OwnerMenuStack,
  Users: UsersStack,
});
//#endregion Owners

//#region Commons
const AuthStack = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
  defaultNavigationOptions: NavigationOptions,
  }
);
//#endregion

export default createAppContainer(OwnerDrawer);
 