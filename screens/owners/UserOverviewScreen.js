import React, { useEffect, useCallback, useState } from "react";
import { View, ActivityIndicator, StyleSheet, Platform, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/commons/CustomHeaderButton";
import { useSelector, useDispatch } from "react-redux";
import UserItem from "../../components/UserItem";

import * as userAction from "../../stores/actions/UserAction";
import defaultStyles from "../../constants/defaultStyles";

const UserOverviewScreen = (props) => {
  //#region states
  const [isLoading, setIsLoading] = useState(false);
  const users = useSelector((state) => state.user.users);
  //#endregion
  const dispatch = useDispatch();

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    await dispatch(userAction.fetchUsers()).then(()=>{
      setIsLoading(false);
    });
  }, [dispatch]);

  //any updates in database will update the list after come back from other screens
  useEffect(() => {
    const willFocusSub = props.navigation.addListener("didFocus", loadUsers);
    return () => {
      willFocusSub.remove();
    };
  }, [loadUsers]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  if (isLoading) {
    return (
      <View style={defaultStyles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.userId}
      renderItem={(itemData) => (
        <UserItem
          name={itemData.item.name}
          balance={itemData.item.balance}
          status={itemData.item.status}
          onSelectItem={() => {
            props.navigation.navigate("AddBalance", {
              id: itemData.item.userId,
            });
          }}
        />
      )}
    />
  );
};

UserOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Users' List",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add"
          iconName={
            Platform.OS === "android"
              ? "md-add-circle-outline"
              : "ios-add-circle-outline"
          }
          onPress={() => {
            navData.navigation.navigate("Auth", { isSignup: true });
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default UserOverviewScreen;
