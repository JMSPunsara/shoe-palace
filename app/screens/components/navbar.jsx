import { View, Text, TouchableOpacity } from "react-native";
import { ShoppingCartIcon } from "react-native-heroicons/outline";
import { Link, router } from "expo-router";
const NavBar = () => {
  return (
    <View className="flex-row justify-between items-center px-4 py-4 bg-gray-800">
      <Text className="text-white text-xl font-bold">MyApp</Text>
      <TouchableOpacity onPress={() => router.push("./screens/cart")}>
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

export default NavBar;
