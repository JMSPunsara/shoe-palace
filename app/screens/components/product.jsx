import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Link, router } from "expo-router";
import { Image } from "react-native";
import { ShoppingCartIcon } from "react-native-heroicons/outline";
const Product = ({
  product,
  column_width,
  cart,
  addItemToCart,
  removeItemFromCart,
}) => {
  const selectedProduct = {
    id: product.id,
    SKU: product.SKU,
    name: product.name,
    brandName: product.brandName,
    mainImage: product.mainImage,
    amount: product.price.amount,
    currency: product.price.currency,
    sizes: product.sizes,
    stockStatus: product.stockStatus,
    colour: product.colour,
    description: product.description,
    quantity: 1,
  };

  return (
    <TouchableOpacity>
      <Link href={{ pathname: "screens/details", params: selectedProduct }}>
        <View>
          <View
            style={{ width: column_width - 10 }}
            className="justify-center p-3 border border-gray-800 rounded m-1 overflow-hidden"
          >
            <Image
              className="m-2 h-40 w-40 mx-auto object-cover bg-white rounded-lg"
              source={{ uri: product.mainImage }}
            />
            <Text className="text-dark mb-3">
              {product.name.substring(0, 10) + "..."}
            </Text>
            <View className="flex-row justify-between">
              {product.stockStatus === "OUT OF STOCK" ? (
                <Text className="text-yellow-500 font-bold">OUT OF STOCK</Text>
              ) : (
                <Text className="text-dark font-bold">{`${product.price.currency} ${product.price.amount}`}</Text>
              )}
              {/* adding to cart works here */}
              {product.stockStatus === "IN STOCK" ? (
                cart.some((value) => value.id === product.id) ? (
                  <TouchableOpacity
                    onPress={() => {
                      removeItemFromCart(selectedProduct);
                      console.log(cart);
                    }}
                  >
                    <View className="border border-[red] rounded-lg p-1">
                      <ShoppingCartIcon
                        color="red"
                        size={25}
                      ></ShoppingCartIcon>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      addItemToCart(selectedProduct);
                      console.log(cart);
                    }}
                  >
                    <View className="shadow-lg border rounded-lg p-1">
                      <ShoppingCartIcon
                        color="black"
                        size={25}
                      ></ShoppingCartIcon>
                    </View>
                  </TouchableOpacity>
                )
              ) : (
                <View className="border border-[red] rounded-lg p-1 ">
                  <ShoppingCartIcon color="red" size={25}></ShoppingCartIcon>
                </View>
              )}
            </View>
          </View>
        </View>
      </Link>
    </TouchableOpacity>
  );
};

export default Product;
