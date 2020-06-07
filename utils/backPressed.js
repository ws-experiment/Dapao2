import { Alert, BackHandler } from "react-native";

export const backPressed = () => {
  Alert.alert(
    "Exit App",
    "Do you want to exit",
    [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Yes", onPress: () => BackHandler.exitApp() },
    ],
    { cancelable: false }
  );
  return true;
};
