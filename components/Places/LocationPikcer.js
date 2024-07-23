import { Alert, Image, StyleSheet, Text, View } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import OutlineButton from "../../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import { useEffect, useState } from "react";
import { getAddress, getMapPreview } from "../../util/location";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";

function LocationPicker({ onPickLocation }) {
  const [pickdLocation, setPickedLocation] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    async function handleLocation() {
      if (pickdLocation) {
        const address = await getAddress(pickdLocation.lat, pickdLocation.lng);
        onPickLocation({ ...pickdLocation, address: address });
      }
    }

    handleLocation();
  }, [pickdLocation, onPickLocation]);

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
  async function getLocationHandler() {
    const hasPermission = await veritfyPermissions();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  function pickOnMapHandler() {
    navigation.navigate("Map");
  }
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
        <OutlineButton icon={"location"} onPress={getLocationHandler}>
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
    overflow: "hidden",
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
