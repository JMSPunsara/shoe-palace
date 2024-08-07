import { StyleSheet, Text, View } from "react-native";
import { SplashScreen, Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "../redux/store";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  return (
    /* first way of renderring something incide */

    /* <Text>Header</Text>
      <Slot></Slot>
      <Text>Footer</Text> */
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack>
    </Provider>
  );
};

export default RootLayout;
