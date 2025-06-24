import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useCart } from '../../context/CartContext';
import { WebView } from 'react-native-webview';
import Storecompo from '../../app-example/components/Shopstore';
import GroceryKitchen from '../../app-example/components/Allprocompo';

import strawberry from '../../assets/images/strawberry.png';
import chips from '../../assets/images/chips.png'
import chair from '../../assets/images/chair.png';
import machine from '../../assets/images/machine.png';
import Hypermart from '../../assets/images/HyperMart.png';
import location from '../../assets/images/loc.png';
import banner from '../../assets/images/banner.png';
import banner2 from '../../assets/images/banner2.png';
import banner3 from '../../assets/images/banner3.png';
import avocado from '../../assets/images/avocado.png';
import noodles from '../../assets/images/noodles.png';
import juice1 from '../../assets/images/juice1.png';
import channel from '../../assets/images/channel.png';
import prada from '../../assets/images/prada.png';
import given from '../../assets/images/given.png';
import hollister from '../../assets/images/hollister.png';
import revion from '../../assets/images/revion.png';
import garnier from '../../assets/images/garnier.png';
import sugar from '../../assets/images/sugar.png';
import maybelline from '../../assets/images/mayblene.png';
import lakme from '../../assets/images/lakme.png';
import clinique from '../../assets/images/clinque.png';
import { useNavigation } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import {
  FontAwesome5,
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import LocationCompo from '../../app-example/components/LocationCompo';
import { Caroselcompo } from '../../app-example/components/Caroselcompo';

const { width } = Dimensions.get('window');

export default function HomeTab() {
  const [codinate, setCodinate] = useState({ lat: 0, lang: 0 });
  const [locationTogal, setLocationTogal] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const router = useRouter();
  const { cart, increment, decrement } = useCart();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState([]);

  const [toggal, settogal] = useState(false);
  const [lang, setLang] = useState('Eng');
  const languages = ['Eng', 'Hin', 'Fra', 'Jap'];

  const categories = [
    {
      name: 'Groceries',
      icon: <Entypo name="leaf" size={24} color="white" />,
      color: 'bg-teal-400',
    },
    {
      name: 'Appliances',
      icon: <MaterialIcons name="kitchen" size={24} color="white" />,
      color: 'bg-blue-400',
    },
    {
      name: 'Fashion',
      icon: <FontAwesome5 name="tshirt" size={24} color="white" />,
      color: 'bg-pink-400',
    },
    {
      name: 'Furniture',
      icon: <MaterialCommunityIcons name="sofa" size={24} color="white" />,
      color: 'bg-purple-400',
    },
  ];
  const updateCart = async (productId, type = 'add') => {
    const cartData = await AsyncStorage.getItem('@cart');
    const cart = cartData ? JSON.parse(cartData) : {};

    if (type === 'add') {
      cart[productId] = (cart[productId] || 0) + 1;
    } else if (type === 'remove') {
      if (cart[productId]) {
        cart[productId] -= 1;
        if (cart[productId] <= 0) delete cart[productId];
      }
    }

    await AsyncStorage.setItem('@cart', JSON.stringify(cart));
  };

  const products = [
    { id: '1', name: 'Strawberries', price: 10, rating: 4.8, image: strawberry },
    { id: '2', name: 'Fried Chips', price: 12, rating: 4.8, image: chips },
    { id: '3', name: 'Moder Chair', price: 3599, rating: 4.8, image: chair },
    { id: '4', name: 'Washing Machine', price: 45999, rating: 4.8, image: machine },
  ];
  useEffect(() => {
    const loadWishlist = async () => {
      const stored = await AsyncStorage.getItem('@wishlist');
      if (stored) setWishlist(JSON.parse(stored));
    };
    loadWishlist();
  }, []);

  const toggleWishlist = async (item) => {
    const exists = wishlist.some((i) => i.id === item.id);
    let updated = [];

    if (exists) {
      updated = wishlist.filter((i) => i.id !== item.id);
    } else {
      updated = [...wishlist, item];
    }

    setWishlist(updated);
    await AsyncStorage.setItem('@wishlist', JSON.stringify(updated));
  };

  const isWishlisted = (id) => wishlist.some((item) => item.id === id);

  const brands = [
    { id: 1, image: hollister },
    { id: 2, image: channel },
    { id: 3, image: prada },
    { id: 4, image: given },
  ];

  const offers = [
    { id: 1, brand: 'Revlon', discount: '10%', image: revion },
    { id: 2, brand: 'Lakmé', discount: '20%', image: lakme },
    { id: 3, brand: 'Garnier', discount: '15%', image: garnier },
    { id: 4, brand: 'Maybelline', discount: '50%', image: maybelline },
    { id: 5, brand: 'Clinique', discount: '30%', image: clinique },
    { id: 6, brand: 'Sugar', discount: '60%', image: sugar },
  ];

  useEffect(() => {
    const saveCartToStorage = async () => {
      try {
        await AsyncStorage.setItem('@cart', JSON.stringify(cart));
      } catch (error) {
        console.error('Error saving cart:', error);
      }
    };

    saveCartToStorage();
  }, [cart]);

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: locationTogal ? 400 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [locationTogal]);

  return (
    <SafeAreaView className="bg-slate-100 flex-1 py-4 px-5 pb-20">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row justify-between mx-2 items-center">
          <Image source={Hypermart} style={{ width: width * 0.2, height: width * 0.1, resizeMode: 'contain' }} />
          <View className="relative left-20">
           
          
          </View>
          <Ionicons name="notifications-circle" size={28} color="orange" />
        </View>

        {/* Location Toggle */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setLocationTogal(!locationTogal)}
          className="flex-row h-auto py-4 gap-4 justify-between items-center"
        >
          <View className="flex-row gap-2">
            <Image source={location} />
            <LocationCompo setCodinate={setCodinate} />
          </View>
          <AntDesign name={locationTogal ? 'down' : 'right'} size={24} color="black" />
        </TouchableOpacity>

        {/* Google Map Embed */}
        <Animated.View style={{ height: animatedHeight, overflow: 'hidden' }} className="bg-gray-100">
          <WebView
            source={{ uri: `https://www.google.com/maps?q=${codinate.lat},${codinate.lang}&z=15` }}
            style={{ flex: 1 }}
            javaScriptEnabled
            domStorageEnabled
          />
        </Animated.View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-slate-300 rounded-2xl px-4 py-3">
          <SimpleLineIcons name="magnifier" size={24} color="grey" />
          <TextInput
            placeholder="Search Anything..."
            placeholderTextColor="gray"
            className="flex-1 text-white ml-4"
          />
          <FontAwesome6 name="microphone" size={24} color="#4AB7B6" />
        </View>

        {/* Banner Carousel */}
        <View className="my-6 rounded-xl overflow-hidden">
          <Caroselcompo />
        </View>

        {/* Categories */}
        <TouchableOpacity className="h-auto w-auto flex-row justify-between items-center">
          <Text className="text-2xl py-2 font-bold">Categories</Text>
          <AntDesign name="right" size={25} color="black" />
        </TouchableOpacity>
        <View className="mt-4 py-1">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-4">
            {categories.map((category, index) => (
              <View
                key={index}
                className={`w-28 h-28 ${category.color} rounded-2xl justify-center items-center mx-2`}
              >
                {category.icon}
                <Text className="text-white mt-2">{category.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>


        {/* Previous Orders */}
        <View className="mt-5">
          <Text className="text-2xl py-2 font-bold">Previous Order</Text>
          <View className="bg-white rounded-xl shadow-md mx-4 my-2 p-4 relative overflow-hidden">
            <Text className="text-green-600 font-semibold">Delivered</Text>
            <Text className="text-gray-500 text-xs">On Wed, 27 Jul 2022</Text>
            <View className="flex-row items-center space-x-1 bg-gray-100 px-2 py-2 rounded-xl mt-3 w-[85%]">
              <Image source={avocado} className="w-auto h-auto rounded-full" />
              <Image source={noodles} className="w-auto h-auto rounded-full" />
              <Image source={juice1} className="w-auto h-auto rounded-full" />
              <Text className="text-gray-600 font-semibold text-sm">+5 More</Text>
            </View>
            <Text className="text-xs text-gray-500 mt-2">Order ID : #28292999</Text>
            <View className="flex-row items-center justify-between mt-2 pr-10">
              <Text className="text-xl font-bold">Final Total : ₹ 123</Text>
              <TouchableOpacity className="bg-cyan-500 px-4 py-2 rounded-xl">
                <Text className="text-white font-semibold text-sm">Order Again</Text>
              </TouchableOpacity>
            </View>
            <View style={{ transform: [{ rotate: '270deg' }] }} className="absolute top-20 px-6 -right-28 pb-5 p-2 justify-center items-center bg-[#EA7173] rounded-r-xl">
              <Text className="text-white text-sm">Order Again & Get Flat 10% OFF</Text>
            </View>
          </View>
        </View>

        {/* Product Grid */}
        <View className="mt-6">
          <Text className="text-2xl  font-bold">Best Deals</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: 10 }}>
            {products.map((item) => {
              const quantity = cart[item.id] || 0;
              const wished = isWishlisted(item.id);
              return (
                <View
                  key={item.id}
                  style={{ width: '48%', marginBottom: 20, padding: 10, borderRadius: 10, backgroundColor: '#f9f9f9', position: 'relative' }}
                >
                  {/* Wishlist Heart Icon */}
                  <TouchableOpacity
                    onPress={() => toggleWishlist(item)}
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      zIndex: 10,
                    }}
                  >
                    <AntDesign
                      name={wished ? 'heart' : 'hearto'}
                      size={20}
                      color={wished ? 'red' : 'gray'}
                    />
                  </TouchableOpacity>

                  <Image source={item.image} style={{ width: '100%', height: 100, resizeMode: 'contain' }} />
                  <Text className="text-center font-semibold mt-2">{item.name}</Text>
                  <Text className="text-center text-lg font-bold">₹ {item.price}</Text>
                  {quantity === 0 ? (
                    <TouchableOpacity onPress={() => increment(item.id)} className="mt-2 bg-orange-100 py-1 rounded">
                      <Text className="text-orange-500 text-center font-semibold">Add to cart</Text>
                    </TouchableOpacity>
                  ) : (
                    <View className="flex-row justify-center items-center mt-2 gap-4">
                      <TouchableOpacity onPress={() => decrement(item.id)} className="px-3 bg-red-100 rounded">
                        <Text className="text-red-500">–</Text>
                      </TouchableOpacity>
                      <Text className="mx-3 font-semibold">{quantity}</Text>
                      <TouchableOpacity onPress={() => increment(item.id)} className="px-3 bg-green-100 rounded">
                        <Text className="text-green-500">+</Text>
                      </TouchableOpacity>

                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>
        {/* {store section} */}
        <View className=" rounded-xl overflow-hidden">
          <Storecompo />
        </View>
        <View className=" rounded-xl overflow-hidden">
          <GroceryKitchen />
        </View>
        {/* Top Brands */}
        <TouchableOpacity className="mt-5 h-auto w-auto flex-row justify-between items-center">
          <Text className="text-2xl py-2 font-bold">Top Brands</Text>
          <AntDesign name="right" size={25} color="black" />
        </TouchableOpacity>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4 px-4">
          {brands.map((brand) => (
            <View key={brand.id} className="rounded-lg mr-3 items-center justify-center w-32 h-24">
              <Image source={brand.image} className="w-32 h-full" resizeMode="contain" />
            </View>
          ))}
        </ScrollView>
        {/* <View className=" rounded-xl overflow-hidden">
          <Allproducts/>
        </View> */}
        {/* Exclusive Brand Deals */}
        <TouchableOpacity className="mt-5 h-auto w-auto flex-row justify-between items-center">
          <Text className="text-2xl py-2 font-bold">Exclusive Brands Deals</Text>
          <AntDesign name="right" size={25} color="black" />
        </TouchableOpacity>
        <View className="flex-row flex-wrap justify-between px-4 mt-4">
          {offers.map((item) => (
            <View
              key={item.id}
              className="bg-white rounded-xl w-[30%] h-32 mb-4 p-3 items-center justify-center relative shadow-sm border border-gray-200"
            >
              <Image source={item.image} className="w-20 h-10" resizeMode="contain" />
              <View className="absolute bottom-[-12px] bg-teal-400 px-1 py-3 rounded-3xl">
                <Text className="text-white text-xs font-semibold">Upto {item.discount}</Text>
                <Text className="text-white text-xs font-semibold text-center">OFF</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
