import Colors from "../constants/Colors";
import { Platform } from "react-native";

export default NavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "font-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "font-regular",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};
