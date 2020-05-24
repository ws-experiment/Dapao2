import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
  FlatList,
  Alert,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import * as menusAction from "../../stores/actions/MenusAction";
import defaultStyles from "../../constants/defaultStyles";
import Colors from "../../constants/Colors";
import RegText from "../../components/commons/RegText";
import MenuItem from "../../components/MenuItem";
import BorderlessButton from "../../components/commons/BorderlessButton";
import CustomHeaderButton from "../../components/commons/CustomHeaderButton";
import ClearButton from "../../components/commons/ClearButton";

const OwnerMenuDetailsScreen = (props) => {
  //#region states
  const day = props.navigation.getParam("day");
  const overallMenus = useSelector((state) => state.menus.ownerMenuItems);
  const [isLoading, setIsLoading] = useState(false);
  //#endregion states

  const dispatch = useDispatch();

  const loadOwnerProduct = useCallback(async () => {
    setIsLoading(true);
    await dispatch(menusAction.fetchOwnerMenu(day))
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [dispatch, setIsLoading, day]);

  useEffect(() => {
    loadOwnerProduct();
  }, [loadOwnerProduct]);

  //#region handlers
  const editMenuHandler = (id) => {
    props.navigation.navigate("EditMenu", { menuId: id, day: day });
  };

  const deleteMenuHandler = (id, title) => {
    Alert.alert("Are you sure", "Do you really want to delete this item", [
      { text: "No", style: "default" },
      {
        text: "yes",
        style: "destructive",
        onPress: () => {
          dispatch(menusAction.removeOwnerMenu(id, title));
        },
      },
    ]);
  };
  //#endregion handlers

  if (isLoading) {
    return (
      <View style={defaultStyles.loading}>
        <ActivityIndicator size={26} color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && overallMenus.length == 0) {
    return (
      <View style={styles.container}>
        <RegText style={styles.noMenuText}>
          No Menu is Found. Try to Add Some!!
        </RegText>
        <Button
          style={styles.noMenuButton}
          title="Add Menu"
          onPress={() => props.navigation.navigate("EditMenu", { day: day })}
        />
      </View>
    );
  }

  return (
    <FlatList
      data={overallMenus}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <MenuItem
          imageSource={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          disabled={true}
        >
          <View style={styles.buttonContainer}>
            <ClearButton
              title="Edit"
              style={styles.editButton}
              onPress={() => {
                editMenuHandler(itemData.item.id);
              }}
            />
            <ClearButton
              title="Delete"
              danger
              style={styles.deleteButton}
              onPress={() => {
                deleteMenuHandler(itemData.item.id, itemData.item.title);
              }}
            />
          </View>
        </MenuItem>
      )}
    />
  );
};

OwnerMenuDetailsScreen.navigationOptions = (navData) => {
  const day = navData.navigation.getParam("day");
  return {
    headerTitle: `My ${day}'s Menu`,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="ADD"
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={() => {
            navData.navigation.navigate("EditMenu", { day: day });
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
  noMenuButton: {
    margin: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  editButton: {
    color: Colors.accent,
    fontSize: 18,
  },
  deleteButton: {
    color: "red",
    fontSize: 18,
  },
});

export default OwnerMenuDetailsScreen;
