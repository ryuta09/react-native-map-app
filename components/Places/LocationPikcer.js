import { Alert, Image, StyleSheet, Text, View } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import OutlineButton from "../../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import { useState } from "react";
import { getMapPreview } from "../../util/location";

function LocationPicker() {
  const [pickdLocation, setPickedLocation] = useState(null);
  console.log("pickdLocationの中身は ", JSON.stringify(pickdLocation, null, 2)); // オブジェクト全体を表示
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();
  async function veritfyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    // 拒否
    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert("権限が不足しています。");
      return false;
    }

    return true;
  }
  async function getLocatoinHandler() {
    const hasPermission = await veritfyPermissions();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    console.log("locationの中身は " + location);
    console.log("location.coords.latitudeの中身は " + location.coords.latitude);
    console.log("location.coords.longitudeの中身は " + location.coords.longitude);
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  function pickOnMapHandler() {}
  let locationPreview = <Text>No location</Text>;
  if (pickdLocation) {
    locationPreview = (
      <Image
        source={{ uri: getMapPreview(pickdLocation.lat, pickdLocation.lng) }}
        style={styles.image}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlineButton icon={"location"} onPress={getLocatoinHandler}>
          Locate User
        </OutlineButton>
        <OutlineButton icon={"map"} onPress={pickOnMapHandler}>
          Pick on Map
        </OutlineButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden'
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});
