import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ShoppingCartIcon } from "react-native-heroicons/outline";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import NavBar from "./components/navbar";
const Details = () => {
  const router = useRouter();
  const product = useLocalSearchParams();
  console.log(product);
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="auto" />
      <SafeAreaView></SafeAreaView>
      <NavBar></NavBar>
      <View className=" p-4">
        <Image
          className="h-60 w-full object-cover rounded-lg"
          source={{ uri: product.mainImage }}
        />
        <Text className="text-xl font-bold mt-4">{product.name}</Text>
        <Text className="text-lg mt-2">
          {`${product.currency} ${product.amount}`}
        </Text>
        <Text className="text-md mt-2">{product.description}</Text>
      </View>
    </View>
  );
};

export default Details;
