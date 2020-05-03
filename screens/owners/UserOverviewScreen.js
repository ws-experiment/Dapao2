import React, { useEffect, useCallback, useState } from "react";
import { View, Text, StyleSheet, Platform, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/commons/CustomHeaderButton";
import { useSelector, useDispatch } from "react-redux";
import UserItem from "../../components/UserItem";

import * as userAction from "../../stores/actions/UserAction";

const UserOverviewScreen = (props) => {
  //#region states
  const [isLoading, setIsLoading] = useState(false);
  const users = useSelector((state) => state.user.users);
  //#endregion
  const dispatch = useDispatch();

  const loadUsers = useCallback(async () => {
    await dispatch(userAction.fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    loadUsers().then(() => {
      setIsLoading(false);
    });
  }, [loadUsers]);

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <UserItem
          name={itemData.item.name}
          balance={itemData.item.balance}
          status={itemData.item.status}
          onSelectItem={() => {
            props.navigation.navigate("addBalance", { id: itemData.item.id });
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
  };
};

const styles = StyleSheet.create({});

export default UserOverviewScreen;
