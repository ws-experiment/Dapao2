import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import Colors from '../constants/Colors';
import Card from "./commons/Card";
import TextBold from "./commons/TextBold";
import TextReg from "./commons/TextReg";

const MenuItem = (props) => {
  const [loading, setLoading] = useState(false);
  return (
    <Card style={styles.card}>
      <TouchableOpacity
        disabled={props.disabled}
        style={styles.touchable}
        onPress={props.onPress}
      >
        <View>
          <View style={styles.imgLoadingContainer}>
          <Image
            source={{ uri: props.imageSource }}
            style={styles.image}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
          />
          {loading && <ActivityIndicator size="small" color={Colors.primary} />}
          </View>
          <View style={styles.details}>
            <View style={styles.detailTitleContainer}>
              <TextBold numberOfLines={1} style={styles.detailTitle}>
                {props.title}
              </TextBold>
            </View>
            <TextReg style={styles.detailPrice}>
              RM {props.price.toFixed(2)}
            </TextReg>
          </View>
          {props.children}
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 340,
    margin: 20,
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  imgLoadingContainer: {
    justifyContent: "center",
    width: "100%",
    height: "65%",
  },  
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  details: {
    height: "20%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
  detailTitleContainer: {
    width: "60%",
  },
  detailTitle: {
    fontSize: 20,
    marginVertical: 2,
  },
  detailPrice: {
    fontSize: 16,
    color: "#888",
  },
  buttonContainer: {
    height: "20%",
    width: "100%",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});

export default MenuItem;
