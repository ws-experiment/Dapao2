import React, { useState } from "react";
import {
  Platform,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AnimatedHeaderIcon = (props) => {
  var animatedValue = new Animated.Value(0);
  const animate = () => {
    // A loop is needed for continuous animation
    Animated.loop(
      // Animation consists of a sequence of steps
      Animated.sequence([
        // start rotation in one direction (only half the time is needed)
        Animated.timing(animatedValue, {
          toValue: 1.0,
          duration: 50,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        // rotate in other direction, to minimum value (= twice the duration of above)
        Animated.timing(animatedValue, {
          toValue: -1.0,
          duration: 150,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        // return to begin position
        Animated.timing(animatedValue, {
          toValue: 0.0,
          duration: 50,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
      { iterations: 2 }
    ).start();
  };

  if (props.badgeCount > 0 ) {
    animate();
  }

  return (
    <Animated.View
      style={{
        transform: [
          {
            rotate: animatedValue.interpolate({
              inputRange: [-1, 1],
              outputRange: ["-0.1rad", "0.1rad"],
            }),
          },
        ],
      }}
    >
      <TouchableOpacity style={styles.container} onPress={props.onPress}>
        <Ionicons
          name={props.name}
          size={26}
          color={"white"}
        />
        {props.badgeCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.text}>{props.badgeCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginRight: 20,
    marginTop: 5,
  },
  badge: {
    position: "absolute",
    right: 0,
    top: -3,
    backgroundColor: "red",
    borderRadius: 6,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default AnimatedHeaderIcon;
