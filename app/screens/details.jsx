import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ShoppingCartIcon } from "react-native-heroicons/outline";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import NavBar from "./components/navbar";
import { useDispatch, useSelector } from "react-redux";

import {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../../redux/CartReducer";

const Details = () => {
  const router = useRouter();
  const product = useLocalSearchParams();

  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const addItemToCart = (item) => {
    dispatch(addToCart(item));
  };
  const removeItemFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="auto" />
      <SafeAreaView></SafeAreaView>
      <NavBar></NavBar>
      <View className="p-4">
        <Image
          className="h-60 w-full object-cover rounded-lg"
          source={{ uri: product.mainImage }}
        />
        <Text className="text-xl font-bold mt-4">{product.name}</Text>
        <Text className="text-lg mt-2">
          {`${product.currency} ${product.amount}`}
        </Text>
        <Text className="text-md mt-2">{product.description}</Text>
        <Text className="text-md mt-2">Colour: {product.colour}</Text>
        <Text className="text-md mt-2">Sizes: {product.sizes}</Text>
        <Text className="text-md mt-2">
          Stock Status: {product.stockStatus}
        </Text>

        {product.stockStatus === "IN STOCK" ? (
          cart.some((value) => value.id === product.id) ? (
            <TouchableOpacity
              className="mt-4 bg-red-500 p-3 rounded-lg"
              onPress={() => {
                // Add to cart functionality here
                removeItemFromCart(product);
              }}
            >
              <Text className="text-white text-center text-lg">Remove</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="mt-4 bg-gray-800 p-3 rounded-lg"
              onPress={() => {
                // Add to cart functionality here
                addItemToCart(product);
              }}
            >
              <Text className="text-white text-center text-lg">
                Add To Cart
              </Text>
            </TouchableOpacity>
          )
        ) : (
          <View className="mt-4 border border-[red]  p-3 rounded-lg">
            <Text className="text-black text-center text-lg">
              😔 Out of Stock
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Details;
