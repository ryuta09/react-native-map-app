import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import Allplaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./UI/IconoButton";
import { Colors } from "./constants/colors";
import Map from "./screens/Map";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary500
          },
          headerTintColor: Colors.gray700,
          contentStyle: {
            backgroundColor: Colors.gray700
          }
        }}>
          <Stack.Screen
            name="AllPlaces"
            component={Allplaces}
            options={({ navigation }) => ({
              title: 'Your Favorite Places',
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
            })}
          />
          <Stack.Screen name="AddPlace" component={AddPlace} options={{
            title: 'Add a New Place',
            headerBackTitle: 'back'
          }}/>
          <Stack.Screen name="Map" component={Map} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
