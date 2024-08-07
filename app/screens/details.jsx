import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ShoppingCartIcon } from "react-native-heroicons/outline";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
const Details = () => {
  const router = useRouter();
  const product = useLocalSearchParams();
  console.log(product);
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="auto" />
      <SafeAreaView></SafeAreaView>
      <NewNavBar></NewNavBar>
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

const NewNavBar = () => {
  return (
    <View className="flex-row justify-between items-center px-4 py-4 bg-gray-800">
      <Text className="text-white text-xl font-bold">MyApp</Text>

      <TouchableOpacity onPress={() => router.push("./cart")}>
        <View className="relative">
          <ShoppingCartIcon name="shopping-cart" color="white" size={28} />
          <View className="absolute flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2">
            <Text>20</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Details;
