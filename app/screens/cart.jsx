import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ShoppingCartIcon } from "react-native-heroicons/outline";
import { StatusBar } from "expo-status-bar";

const cartItems = [
  {
    id: "1",
    name: "Nike Air Relentless 4 Mens Running Shoes",
    mainImage:
      "https://s3-eu-west-1.amazonaws.com/api.themeshplatform.com/media/7e386191b2ee40b290886a05d3e10e24_nike-air-relentless-a.jpg",
    price: {
      amount: "45.00",
      currency: "GBP",
    },
    quantity: 1,
  },
  {
    id: "2",
    name: "PUMA Future Disc Lite Op V2",
    mainImage:
      "https://s3-eu-west-1.amazonaws.com/api.themeshplatform.com/media/a752937bd1be4ca3b6ccba5f7649a21c_35685902_fr_puma_sc7.jpeg",
    price: {
      amount: "90.00",
      currency: "GBP",
    },
    quantity: 1,
  },
  // Add more items as needed
];

const Cart = () => {
  const [items, setItems] = useState(cartItems);

  const handleIncreaseQuantity = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setItems(updatedItems);
  };

  const handleDecreaseQuantity = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setItems(updatedItems);
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="auto" />
      <SafeAreaView></SafeAreaView>
      <NewNavBar></NewNavBar>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
            <Image
              className="w-20 h-20 object-cover rounded-lg"
              source={{ uri: item.mainImage }}
            />
            <View className="flex-1 ml-4">
              <Text className="text-lg font-bold">{item.name}</Text>
              <Text className="text-md">{`${item.price.currency} ${item.price.amount}`}</Text>
              <View className="flex-row items-center mt-2">
                <TouchableOpacity
                  className="p-2 bg-gray-200 rounded"
                  onPress={() => handleDecreaseQuantity(item.id)}
                >
                  <Text className="text-lg">-</Text>
                </TouchableOpacity>
                <Text className="mx-4 text-lg">{item.quantity}</Text>
                <TouchableOpacity
                  className="p-2 bg-gray-200 rounded"
                  onPress={() => handleIncreaseQuantity(item.id)}
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

const NewNavBar = () => {
  return (
    <View className="flex-row justify-between items-center px-4 py-4 bg-gray-800">
      <Text className="text-white text-xl font-bold">MyApp</Text>

      <TouchableOpacity>
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

export default Cart;
