# Shoe👟Pal

> React Native E-Commerce app for a 👟 store

```bash
npm i
npx expo start -c
```

---

## 😱 Features

1. Product List View
2. Product Details View
3. Add to Cart Functionality
4. Count of items present in the cart
5. Usage of REDUX REDUX-ToolKit
6. Styling with tailwindcss
7. Handling out of stock items

---

## 👉 Product List

![products](https://github.com/user-attachments/assets/61869468-1802-4eec-b733-5a0bbe340df7)

```javascript
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
```

---

## 👉 Product Details View

![ProductScreen-output](https://github.com/user-attachments/assets/0d2c4b77-ff41-41d5-b7ef-764cafb86085)

```javascript
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
```

---

## 👉 Add to Cart

![addTocartFromHome-output](https://github.com/user-attachments/assets/f2332db1-a1cb-4712-9344-e838a2599e20)

```javascript
import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item.id == action.payload.id
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const removeFromCart = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      state.cart = removeFromCart;
    },
    incrementQuantity: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item.id == action.payload.id
      );
      itemInCart.quantity++;
    },
    decrementQuantity: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item.id == action.payload.id
      );
      if (itemInCart.quantity == 1) {
        const removeFromCart = state.cart.filter(
          (item) => item.id !== action.payload.id
        );
        state.cart = removeFromCart;
      } else {
        itemInCart.quantity--;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
```

![cartFeature](https://github.com/user-attachments/assets/fffb217a-efca-4db7-b4d9-de9dae47b88c)

```javascript
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
```

---

## 👉 Out of stock items

![outstock](https://github.com/user-attachments/assets/487f539d-7b59-43fd-ad05-723d8c092fde)

```javascript
{
  product.stockStatus === "IN STOCK" ? (
    cart.some((value) => value.id === product.id) ? (
      <TouchableOpacity
        className="mt-4 bg-red-500 p-3 rounded-lg"
        onPress={() => {
          // remove cart functionality here
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
        <Text className="text-white text-center text-lg">Add To Cart</Text>
      </TouchableOpacity>
    )
  ) : (
    <View className="mt-4 border border-[red]  p-3 rounded-lg">
      <Text className="text-black text-center text-lg">😔 Out of Stock</Text>
    </View>
  );
}
```

---

# Happy Hacking 😊 !
