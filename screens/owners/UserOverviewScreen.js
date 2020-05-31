import React, {
  useEffect,
  useCallback,
  useState,
  useLayoutEffect,
} from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Platform,
  FlatList,
  Button
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/commons/CustomHeaderButton";
import { useSelector, useDispatch } from "react-redux";
import UserItem from "../../components/UserItem";

import * as userAction from "../../stores/actions/UserAction";
import defaultStyles from "../../constants/defaultStyles";
import ToggleMenuButton from "../../components/commons/ToggleMenuButton";
import RegText from "../../components/commons/RegText";

const UserOverviewScreen = (props) => {
  //#region states
  const [isLoading, setIsLoading] = useState(false);
  const users = useSelector((state) => state.user.users);
  //#endregion
  const dispatch = useDispatch();

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    await dispatch(userAction.fetchUsers()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  //any updates in database will update the list after come back from other screens
  useLayoutEffect(() => {
    const focusSub = props.navigation.addListener("didFocus", loadUsers);
    return () => {
      focusSub.remove();
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

  if (!isLoading && users.length == 0) {
    return (
      <View style={styles.container}>
        <RegText style={styles.noMenuText}>
          No User is Found. Try to Add Some!!
        </RegText>
        <Button
          style={styles.noButton}
          title="Add New User"
          onPress={() => props.navigation.navigate("Auth", { isSignup: true })}
        />
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
      <ToggleMenuButton onPress={() => navData.navigation.toggleDrawer()} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin: 10,
  },
  noMenuText: {
    fontSize: 18,
    marginVertical: 20,
  },
  noButton: {
    margin: 5,
  },
});

export default UserOverviewScreen;
