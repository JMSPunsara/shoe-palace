import React from "react";
import { View, FlatList, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/CartReducer";
import Navbar from "./components/navbar";
import Product from "./components/product";

// calculate the width of each column using the screen dimensions
const numColumns = 2;
const screen_width = Dimensions.get("window").width;
const column_width = screen_width / numColumns;

const Home = ({ products }) => {
  // implementing the redux cart and functionalities
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const addItemToCart = (item) => {
    dispatch(addToCart(item));
  };
  const removeItemFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    <View className="flex-[1] bg-white">
      <StatusBar style="auto" />
      <SafeAreaView></SafeAreaView>
      <Navbar></Navbar>
      <FlatList
        data={products.data}
        numColumns={2}
        renderItem={(product_data) => {
          return (
            <Product
              column_width={column_width}
              product={product_data.item}
              onPress={() => {}}
              cart={cart}
              addItemToCart={addItemToCart}
              removeItemFromCart={removeItemFromCart}
            ></Product>
          );
        }}
        keyExtractor={(item) => {
          return item.id;
        }}
      ></FlatList>
    </View>
  );
};

export default Home;
