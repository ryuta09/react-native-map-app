import { Alert, Button, View } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";

function ImagePicker() {
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    // 拒否
    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert("権限が不足しています。");
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true, // 写真を編集
      aspect: [16, 9], // アスペクト比を設定
      quality: 0.5, // 少し小さめの画像を取得
    });
    console.log(image);
  }
  return (
    <View>
      <View></View>
      <Button title="take Image" onPress={takeImageHandler} />
    </View>
  );
}

export default ImagePicker;
