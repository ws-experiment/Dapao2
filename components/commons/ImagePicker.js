import React, { useState } from "react";
import { View, Text, Image, Button, Alert, StyleSheet } from "react-native";

import ButtonClear from "../commons/buttons/ButtonClear";

import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import Colors from "../../constants/Colors";

const ImgPicker = (props) => {
  const [pickedImage, setPickedImage] = useState(props.imageUrl);

  const verifyPermission = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA
    );
    if (result.status != "granted") {
      Alert.alert("Access DENIED");
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    console.log("takeImageHandler");
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (image.cancelled) {
      return;
    }

    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
  };

  const galleryHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (image.cancelled) {
      return;
    }
    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
  };

  let buttons = null;
  if (!props.imageUrl) {
    buttons = (
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <ButtonClear safe title="New" onPress={takeImageHandler} />
        </View>
        <View style={styles.button}>
          <ButtonClear danger title="Gallery" onPress={galleryHandler} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No image picked yet</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      {!props.imageUrl ? (
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <ButtonClear safe title="New" onPress={takeImageHandler} />
          </View>
          <View style={styles.button}>
            <ButtonClear danger title="Gallery" onPress={galleryHandler} />
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 15,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  button: {
    width: 150,
  },
});

export default ImgPicker;
