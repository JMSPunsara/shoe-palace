import React from "react";
import Home from "./screens/home";
import { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://s3-eu-west-1.amazonaws.com/api.themeshplatform.com/products.json"
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <Home products={products}></Home>;
};

export default App;
