import { View, Text, TouchableOpacity } from "react-native";
import { ShoppingCartIcon } from "react-native-heroicons/outline";
import { Link, router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";

const NavBar = () => {
  const cart = useSelector((state) => state.cart.cart);

  const getTotalQuantity = (products) => {
    return products.reduce((total, product) => {
      return total + product.quantity;
    }, 0);
  };

  const totalQuantity = getTotalQuantity(cart);

  return (
    <View className="flex-row justify-between items-center px-4 py-4 bg-gray-800">
      <Text className="text-white text-xl font-bold">Shoe👟Pal</Text>
      <Link href={{ pathname: "screens/cart" }}>
        <View className="relative">
          <ShoppingCartIcon name="shopping-cart" color="white" size={28} />
          <View className="absolute flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2">
            <Text className="text-white text-xs">{totalQuantity}</Text>
          </View>
        </View>
      </Link>
    </View>
  );
};

export default NavBar;
