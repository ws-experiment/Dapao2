import React, { useRef } from "react";
import { Platform, SafeAreaView, View } from "react-native";
import {
  createAppContainer,
  NavigationActions,
  StackActions,
  createSwitchNavigator,
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from "react-navigation-drawer";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import * as authActions from "../stores/actions/AuthAction";

import NavigationOptions from "../navigation/NavigationOptions";
import Colors from "../constants/Colors";
import LogoutButton from "../components/commons/LogoutButton";

//Commons
import StartupScreen from "../screens/StartupScreen";
import AuthScreen from "../screens/AuthScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
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
import OffDayScreen from "../screens/owners/OffDayScreen";

const SettingsStack = createStackNavigator(
  {
    ResetPassword: ResetPasswordScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={
            Platform.OS === "android"
              ? "md-settings"
              : "ios-settings"
          }
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: NavigationOptions,
  }
);

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
    Setting: {
      screen: SettingsStack,
      navigationOptions: {
        drawerLabel: "Settings"
      }
    }
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerNavigatorItems {...props} />
            <LogoutButton
              onPress={() => {
                dispatch(authActions.logout());
                props.navigation.dispatch(
                  StackActions.reset({
                    index: 0,
                    actions: [
                      NavigationActions.navigate({ routeName: "Auth" }),
                    ],
                  })
                );
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
);
//#endregion Customers

//#region Owners
const UsersStack = createStackNavigator(
  {
    UserOverview: UserOverviewScreen,
    AddBalance: AddBalanceScreen,
    Auth: AuthScreen,
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

const OffDayStack = createStackNavigator(
  {
    OffDay: OffDayScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={
            Platform.OS === "android"
              ? "md-remove-circle-outline"
              : "ios-remove-circle-outline"
          }
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: NavigationOptions,
  }
);

const OwnerDrawer = createDrawerNavigator(
  {
    Orders: CustomerOrderStack,
    OwnerMenu: { 
      screen: OwnerMenuStack,
      navigationOptions: {
        drawerLabel: "My Menu List"
      }
    },
    Users: {
      screen: UsersStack,
      navigationOptions: {
        drawerLabel: "Users List "
      }
    },
    OffDay: {
      screen: OffDayStack,
      navigationOptions: {
        drawerLabel: "My Off Days "
      }
    },
    Setting: SettingsStack,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerNavigatorItems {...props} />
            <LogoutButton
              onPress={() => {
                dispatch(authActions.logout());
                props.navigation.dispatch(
                  StackActions.reset({
                    index: 0,
                    actions: [
                      NavigationActions.navigate({ routeName: "Auth" }),
                    ],
                  })
                );
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
);
//#endregion Owners

//#region Commons
const AuthStack = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  { defaultNavigationOptions: NavigationOptions }
);

const MainStack = createStackNavigator({
  Startup: StartupScreen,
  Auth: {
    screen: AuthStack,
    navigationOptions: { headerShown: false, gestureEnabled: false },
  },
  Owner: {
    screen: OwnerDrawer,
    navigationOptions: { headerShown: false, gestureEnabled: false },
  },
  Customer: {
    screen: CustomerDrawer,
    navigationOptions: { headerShown: false, gestureEnabled: false },
  },
});
//#endregion

export default createAppContainer(MainStack);
