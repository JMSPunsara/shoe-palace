// _layout.jsx
import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="screens/home" options={{ headerShown: false }} />
      <Stack.Screen name="screens/cart" options={{ headerShown: false }} />
      <Stack.Screen name="screens/details" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
