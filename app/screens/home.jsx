import React from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Image } from "react-native";
import { ShoppingCartIcon } from "react-native-heroicons/outline";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../../redux/CartReducer";
import Navbar from "./components/navbar";

const products = [
  {
    id: "1",
    SKU: "1210",
    name: "Nike Air Relentless 4 Mens Running Shoes",
    brandName: "Nike",
    mainImage:
      "https://s3-eu-west-1.amazonaws.com/api.themeshplatform.com/media/7e386191b2ee40b290886a05d3e10e24_nike-air-relentless-a.jpg",
    price: {
      amount: "45.00",
      currency: "GBP",
    },
    sizes: ["8", "9", "10", "11"],
    stockStatus: "IN STOCK",
    colour: "blue",
    description:
      "Hit the tracks in these Nike Air Relentless 4 featuring flexible forefoot sole and Reslon midsole underfoot cushioning for superior comfort at each step. The ridged outsole ensures excellent traction while the cushioned ankle collar and the anatomically shaped insole guarantee great support for the whole foot. The mesh upper panels provide breathability and airflow within the shoe.",
  },
  {
    id: "2",
    SKU: "1219",
    name: "PUMA Future Disc Lite Op V2",
    brandName: "Puma",
    mainImage:
      "https://s3-eu-west-1.amazonaws.com/api.themeshplatform.com/media/a752937bd1be4ca3b6ccba5f7649a21c_35685902_fr_puma_sc7.jpeg",
    price: {
      amount: "90.00",
      currency: "GBP",
    },
    sizes: ["8", "9", "10", "11"],
    stockStatus: "IN STOCK",
    colour: "multicoloured",
    description:
      "A product of the 90s, the PUMA Future Disc Lite OP V2 features the PUMA disc, the fit system that offered those comfort-boosting clicks. Its modern reincarnation is more laid-back, but brings the technology of the original. Features a leather and mesh upper, EVA midsole, and rubber outsole",
  },
  {
    id: "3",
    SKU: "1243",
    name: "PUMA Soleil v2",
    brandName: null,
    mainImage:
      "https://s3-eu-west-1.amazonaws.com/api.themeshplatform.com/media/ce1fbd10feb64bd39816d03a45fa5346_35892701_fr_puma_sc7.jpeg",
    price: {
      amount: "40.00",
      currency: "GBP",
    },
    sizes: ["8", "9", "10", "11"],
    stockStatus: "IN STOCK",
    colour: "black",
    description:
      "Simple and clean, the Soleil v2 exhibits iconic PUMA heritage.Synthetic upper with french piping embellishment and bold ghilles.Rubber outsole supplies durability and traction.",
  },
  {
    id: "4",
    SKU: "1247",
    name: "PUMA Roma Basic",
    brandName: "Puma",
    mainImage:
      "https://s3-eu-west-1.amazonaws.com/api.themeshplatform.com/media/44abed599ef04cf5b728cab676d57b5d_35857601_fr_puma_sc7.jpeg",
    price: {
      amount: "50.00",
      currency: "GBP",
    },
    sizes: ["8", "9", "10", "11"],
    stockStatus: "IN STOCK",
    colour: "purple",
    description:
      "Complete that vintage 60’s look with the PUMA Roma Basic, a near carbon copy of the original.Features a leather, nubuck, or canvas upper for a range of style.EVA midsole adds cushioning.Rubber outsole supplies durable traction.",
  },
  {
    id: "5",
    SKU: "1217",
    name: "PUMA RS100 Opulence",
    brandName: "Puma",
    mainImage:
      "https://s3-eu-west-1.amazonaws.com/api.themeshplatform.com/media/86d1c3b3500645a3bb1312f945a9cf38_35686403_fr_puma_sc7.jpeg",
    price: {
      amount: "45.00",
      currency: "GBP",
    },
    sizes: ["8", "9", "10", "11"],
    stockStatus: "IN STOCK",
    colour: "black",
    description:
      "Originally the running shoe of 1986, the PUMA RS100 Opulence features a retro running look that is a blast from the past. Featuring R-System cushioning for excellent impact protection, this shoe has a leather, nubuck, and nylon upper and a polyurethane midsole. The rubber outsole increases durability. Includes reflective shoe laces.",
  },
  {
    id: "6",
    SKU: "1029",
    name: "Nike Air Max Wright",
    brandName: "Nike",
    mainImage:
      "https://s3-eu-west-1.amazonaws.com/api.themeshplatform.com/media/9bec0cf649184bc0b034ddc03c392555_69bdb99f92e04b8592b1add74c231f72_17174066_fr_nike_sc7.jpg",
    price: {
      amount: "80.00",
      currency: "GBP",
    },
    sizes: ["8", "9", "10", "11"],
    stockStatus: "IN STOCK",
    colour: "black",
    description:
      "Take it to the next level of comfort and style when you wear the Nike Air Max Wright casual shoe. This low-profile kick is perfect for your feet, creating an innovative fashion without compromising function. The upper is leather and synthetic, the heel has a visible Air-Max unit and the outsole is made of rubber for secure traction. Wt. 18.1 oz.",
  },
  {
    id: "7",
    SKU: "1004",
    name: "Nike Air Max 95",
    brandName: "Nike",
    mainImage:
      "https://s3-eu-west-1.amazonaws.com/api.themeshplatform.com/media/430ef728ff784ab9a8fd974379d343aa_12.jpg",
    price: {
      amount: "60.00",
      currency: "GBP",
    },
    sizes: ["8", "9", "10", "11"],
    stockStatus: "IN STOCK",
    colour: "black",
    description:
      "The Nike Air Max 95 boasts classic style and a comfortable step.Synthetic leather, mesh, suede, and leather upper provides a comfortable fit.Polyurethane midsole with a visible Max Air® unit offers excellent cushioning.Rubber outsole with a Waffle® pattern supplies superior traction.",
  },
  {
    id: "8",
    SKU: "1007",
    name: "Nike Free Trainer 3.0",
    brandName: "Nike",
    mainImage:
      "https://s3-eu-west-1.amazonaws.com/api.themeshplatform.com/media/206144df31d84fdbb3dccf1c6debf1ba_28.jpg",
    price: {
      amount: "70.00",
      currency: "GBP",
    },
    sizes: [],
    stockStatus: "OUT OF STOCK",
    colour: "green",
    description:
      "Supports the foot through its natural range of movement.Cage-like upper with Dynamic Fit technology that provides flexibility and a custom glove-like fit and feel.Mesh innersleeve offers a snug fit that hugs the foot.Low-profile Phylon™ midsole adds lightweight cushioning and support during side-to-side movements.Sidewall wrap-up design cradles the heel and the midfoot.Solid rubber pods in the heel and perimeter of the forefoot gives traction and durability.DiamondFlex technology in the outsole delivers enhanced multidirectional flexibility.Wt. 10.2 oz.",
  },
];

// calculate the width of each column using the screen dimensions
const numColumns = 2;
const screen_width = Dimensions.get("window").width;
const column_width = screen_width / numColumns;

const Home = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  console.log(cart);

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
        data={products}
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
    colour: product.color,
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
              <Text className="text-dark font-bold">{`${product.price.currency} ${product.price.amount}`}</Text>
              {/* adding to cart works here */}
              {cart.some((value) => value.id === product.id) ? (
                <TouchableOpacity
                  onPress={() => {
                    removeItemFromCart(selectedProduct);
                    console.log(cart);
                  }}
                >
                  <View className="border border-[red] rounded-lg p-1">
                    <ShoppingCartIcon color="red" size={25}></ShoppingCartIcon>
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
              )}
            </View>
          </View>
        </View>
      </Link>
    </TouchableOpacity>
  );
};

export default Home;
