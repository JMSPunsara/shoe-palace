import {
  Pressable,
  Platform,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  HomeIcon,
  HeartIcon,
  ShoppingCartIcon,
  SunIcon,
  MoonIcon,
} from "react-native-heroicons/outline";

export default function Navbar() {
  return (
    <View
      style={{
        shadowOffset: { width: 10, height: 10 },
        shadowColor: "black",
        shadowOpacity: 1,
        elevation: 3,
        // background color must be set
        backgroundColor: "#0000",
      }}
      className="px-8 py-6 bg-white shadow-top dark:bg-soft-dark flex-row items-center justify-between "
    >
      <TouchableOpacity>
        <HomeIcon color="black" size={28} />
      </TouchableOpacity>
      <TouchableOpacity>
        <View>
          <View className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-sky-500 border-2 border-white rounded-full -top-3 left-2 -end-2 dark:border-gray-900">
            <Text className="text-white">20</Text>
          </View>
          <ShoppingCartIcon color="black" size={28} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
