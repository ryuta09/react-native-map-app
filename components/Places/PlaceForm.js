import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImgePicker";
import LocationPicker from "./LocationPikcer";
import Button from "../../UI/Button";
import { Place } from "../../models/place";

function PlaceForm({ onCreatePlace }) {
  const [enterdTitle, setEnterdTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [pickedLocatoin, setPickedLocation] = useState();
  function changeTitleHandler(enterdText) {
    setEnterdTitle(enterdText);
  }

  function imageTakenHandler(imageUri) {
    setSelectedImage(imageUri);
  }

  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  function savePlaceHandler() {
    if (!pickedLocatoin || !pickedLocatoin.address) {
      // ここでエラーの原因が分かりやすくなるようにエラーメッセージを表示
      console.error('Location or location address is missing');
      return;
    }
    const placeDate = new Place(enterdTitle, selectedImage, pickedLocatoin);
    onCreatePlace(placeDate)
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enterdTitle}
        />
      </View>
      <ImagePicker onTakeImage={imageTakenHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
