import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import Card from "../../components/commons/Card";
import TextReg from "../../components/commons/TextReg";
import TextBold from "../../components/commons/TextBold";
import ButtonClear from "../../components/commons/buttons/ButtonClear";

import Colors from "../../constants/Colors";
import { CURRENCY } from "../../constants/currency";

import * as userActions from "../../stores/actions/UserAction";

const AddBalanceScreen = (props) => {
  //#region states
  const selectedId = props.navigation.getParam("id");
  const user = useSelector((state) => state.user.users).find(
    (x) => x.userId === selectedId
  );

  const [amount, setAmount] = useState(0);
  //#endregion

  const dispatch = useDispatch();

  const submitHandler = () => {
    dispatch(userActions.reload(selectedId, +amount)).then(() => {
      props.navigation.navigate("UserOverview");
    });
  };

  return (
    <View style={styles.overall}>
      <View style={styles.container}>
        <Card style={styles.userBalanceContainer}>
          <TextReg style={styles.balanceText}>{user.name}'s balance</TextReg>
          <View style={styles.balanceContainer}>
            <Ionicons
              name={Platform.OS === "android" ? "md-cash" : "ios-cash"}
              color="green"
              size={26}
              style={{ marginRight: 10 }}
            />
            <TextBold style={styles.balance}>
              {user.balance.toFixed(2)}
            </TextBold>
          </View>
        </Card>
        <Card style={styles.reloadAmountContainer}>
          <View style={styles.amountContainer}>
            <TextReg style={styles.reloadAmountText}>
              Please Select Reload Amount : {CURRENCY}
            </TextReg>
            <TextBold style={styles.reloadText}>{amount.toFixed(2)}</TextBold>
          </View>
          <View style={styles.buttonsContainer}>
            <ButtonClear
              title="10"
              onPress={() => {
                setAmount(10);
              }}
            />
            <ButtonClear
              title="20"
              onPress={() => {
                setAmount(20);
              }}
            />
            <ButtonClear
              title="50"
              onPress={() => {
                setAmount(50);
              }}
            />
          </View>
        </Card>
        <ButtonClear
          safe
          title="Submit"
          color={Colors.primary}
          onPress={submitHandler}
        />
      </View>
    </View>
  );
};

AddBalanceScreen.navigationOptions = () => {
  return {
    headerTitle: "Reload",
  };
};

const styles = StyleSheet.create({
  overall: {
    flex: 1,
    margin: 15,
  },
  container: {
    height: "40%",
  },
  userBalanceContainer: {
    height: "20%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 15,
  },
  reloadAmountContainer: {
    flexDirection: "column",
    padding: 10,
    marginBottom: 25,
  },
  balanceText: {
    fontSize: 18,
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginLeft: 10,
    width: "20%",
  },
  balance: {
    fontSize: 18,
  },
  amountContainer: {
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  reloadAmountText: {
    fontSize: 18,
  },
  reloadText: {
    fontSize: 18,
  },
  buttonsContainer: {
    flexDirection: "row",
    margin: 5,
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default AddBalanceScreen;
