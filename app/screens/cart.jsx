import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ShoppingCartIcon } from "react-native-heroicons/outline";
import { StatusBar } from "expo-status-bar";
import NavBar from "./components/navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../../redux/CartReducer";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const increaseQuantity = (item) => {
    dispatch(incrementQuantity(item));
  };
  const decreaseQuantity = (item) => {
    if (item.quantity == 1) {
      dispatch(removeFromCart(item));
    } else {
      dispatch(decrementQuantity(item));
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="auto" />
      <SafeAreaView></SafeAreaView>
      <NavBar></NavBar>
      <FlatList
        data={cart}
        renderItem={({ item }) => (
          <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
            <Image
              className="w-20 h-20 object-cover rounded-lg"
              source={{ uri: item.mainImage }}
            />
            <View className="flex-1 ml-4">
              <Text className="text-lg font-bold">{item.name}</Text>
              <Text className="text-md">{`${item.currency} ${item.amount}`}</Text>
              <View className="flex-row items-center mt-2">
                <TouchableOpacity
                  className="p-2 bg-gray-200 rounded"
                  onPress={() => decreaseQuantity(item)}
                >
                  <Text className="text-lg">-</Text>
                </TouchableOpacity>
                <Text className="mx-4 text-lg">{item.quantity}</Text>
                <TouchableOpacity
                  className="p-2 bg-gray-200 rounded"
                  onPress={() => increaseQuantity(item)}
                >
                  <Text className="text-lg">+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Cart;
