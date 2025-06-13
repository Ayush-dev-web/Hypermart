import React, { useState,useRef,useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import strawberry from '../../assets/images/strawberry.png';
import chips from '../../assets/images/chips.png';
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

import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { FontAwesome5, MaterialIcons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize'; 
import LocationCompo from '../../app-example/components/LocationCompo';
import { Caroselcompo } from '../../app-example/components/Caroselcompo';
import { Animated } from 'react-native';
import {WebView} from "react-native-webview"
const { width } = Dimensions.get('window');



export default function HomeTab() {
  const [codinate,setCodinate]=useState({lat:0,lang:0})
const [locationTogal,setLocationTogal]=useState(false)
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const banners = [{ id: 1, image: banner },
  { id: 2, image: banner2 },
  { id: 3, image: banner3 },];
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

  const products = [
    {
      id: '1',
      name: 'Strawberries',
      price: 10,
      rating: 4.8,
      image: strawberry,
    },
    {
      id: '2',
      name: 'Fried Chips',
      price: 12,
      rating: 4.8,
      image: chips,
    },
    {
      id: '3',
      name: 'Moder Chair',
      price: 3599,
      rating: 4.8,
      image: chair,
    },
    {
      id: '4',
      name: 'Washing Machine',
      price: 45999,
      rating: 4.8,
      image: machine,
    },
  ];

  const brands =[{
   id:1,
    image:hollister},
   { id:2,
     image:channel},
   { id:3, image:prada},
    { id:4, image:given}
    
  ]
  const offers = [
  { id: 1, brand: 'Revlon', discount: '10%', image: revion },
  { id: 2, brand: 'Lakmé', discount: '20%', image:lakme },
  { id: 3, brand: 'Garnier', discount: '15%', image:garnier },
  { id: 4, brand: 'Maybelline', discount: '50%', image:maybelline },
  { id: 5, brand: 'Clinique', discount: '30%', image:clinique },
  { id: 6, brand: 'Sugar', discount: '60%', image:sugar },
];


  const [cart, setCart] = useState({});
  const [toggal, settogal] = useState(false);
  const [lang, setLang] = useState('Eng');
  const languages = ['Eng', 'Hin', 'Fra', 'Jap'];

  const increment = (id) => {
    setCart({ ...cart, [id]: (cart[id] || 0) + 1 });
  };

  const decrement = (id) => {
    if (cart[id] > 1) {
      setCart({ ...cart, [id]: cart[id] - 1 });
    } else {
      const updatedCart = { ...cart };
      delete updatedCart[id];
      setCart(updatedCart);
    }
  };
  const mapUrl = "https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed";


  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: locationTogal ? 400: 0, // 192px = h-48
      duration: 300, // 🕒 transition duration 
      useNativeDriver: false,
    }).start();
  }, [locationTogal]);

  return (
    <SafeAreaView className="bg-slate-100 flex-1 py-4 px-5 pb-20">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top Bar */}
        <View className="flex-row justify-between mx-2 items-center">
          <Image source={Hypermart} style={{ width: width * 0.2, height: width * 0.1, resizeMode: 'contain' }} />
          <View className="relative left-20">
            <TouchableOpacity onPress={() => settogal(!toggal)}>
              <Text className="text-lg">{lang} ▼</Text>
            </TouchableOpacity>
            {toggal && (
              <View className="absolute top-full bg-white shadow-md rounded px-2 py-1 z-50">
                {languages.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setLang(item);
                      settogal(false);
                    }}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          <View>
          <Ionicons name="notifications-circle" size={28} color="orange" />
          </View>
        </View>

        {/* Location */}
        <TouchableOpacity activeOpacity={0.8} onPress={()=>setLocationTogal(!locationTogal)} className="flex-row h-auto py-4 gap-4 justify-between items-center">
          <View className='flex-row gap-2'>
          <Image source={location} />
          <LocationCompo  setCodinate={setCodinate} />
          </View>
          
          <AntDesign name={locationTogal?"down":"right"} size={24} color="black" className='pl-10 ' />
        </TouchableOpacity>


 <Animated.View style={{ height: animatedHeight, overflow: 'hidden' }} className="bg-gray-100">
       
<WebView
        source={{ uri: `https://www.google.com/maps?q=${codinate.lat},${codinate.lang}&z=15`}}
        style={{ flex: 1 }}
        javaScriptEnabled
        domStorageEnabled
      />


      </Animated.View>
        {/* Search */}
        <View className="flex-row items-center bg-slate-300 rounded-2xl px-4 py-3">
          <SimpleLineIcons name="magnifier" size={24} color="grey" />
          <TextInput
            placeholder="Search Anything..."
            placeholderTextColor="gray"
            className="flex-1 text-white ml-4"
          />
          
          <FontAwesome6 name="microphone" size={24} color="#4AB7B6" />
        </View>

        {/* Banners */}
<View className="my-6 rounded-xl overflow-hidden">
<Caroselcompo />
</View>

       {/* <View className="mt-6 py-3 ">
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            className="w-[100vh]"
          >
            {banners.map((item, index) => (
              <View key={index} className="w-[100vh] ">
                <Image
                  source={item.image}
                  resizeMode="cover"
                  className="w-[43%] h-[200px] rounded-2xl"
                />
              </View>
            ))}
          </ScrollView>
        </View> */}
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
  
        <View className="mt-5">
          <Text className="text-2xl py-2 font-bold">Previous Order</Text>

          <View className="bg-white rounded-xl shadow-md mx-4 my-2 p-4 relative overflow-hidden ">
           
            <Text className="text-green-600 font-semibold">Delivered</Text>
            <Text className="text-gray-500 text-xs">On Wed, 27 Jul 2022</Text>

            <View className="flex-row items-center space-x-1 bg-gray-100 px-2 py-2 rounded-xl mt-3 w-[85%]">
              <Image source={avocado} className="w-auto h-auto rounded-full" />
              <Image source={noodles} className="w-auto h-auto rounded-full" />
              <Image source={juice1} className="w-auto h-auto rounded-full" />
              <Text className="text-gray-600 font-semibold text-sm">
                +5 More
              </Text>
            </View>

            {/* Order ID */}
            <Text className="text-xs text-gray-500 mt-2">
              Order ID : #28292999
            </Text>

            {/* Total & Button */}
            <View className="flex-row items-center justify-between mt-2 pr-10">
              <Text className="text-xl font-bold">Final Total : ₹ 123</Text>
              <TouchableOpacity className="bg-cyan-500 px-4 py-2 rounded-xl">
                <Text className="text-white font-semibold text-sm">
                  Order Again
                </Text>
              </TouchableOpacity>
            </View>

            {/* Rotated Promo */}
             
            <View style={{transform:[{rotate :"270deg"}]}} className="absolute top-20 px-6  -right-28 pb-5 p-2 justify-center items-center bg-[#EA7173] rounded-r-xl">
            <Text
                className="text-white text-sm"
              >
                Order Again & Get Flat 10% OFF
              </Text>
            </View>
             
          </View>
        </View>
        {/* Products Grid */}
        <View className="mt-6 ">
          <Text className="text-2xl py-2 font-bold">Best Deals</Text>
           <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {products.map((item) => {
              const quantity = cart[item.id] || 0;
              return (
                <View
                  key={item.id}
                  style={{
                    width: width * 0.45,
                    marginBottom: 20,
                    padding: 10,
                    borderRadius: 15,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    backgroundColor: 'white',
                    elevation: 1,
                  }}
                >
  {/* Wishlist */}
   <TouchableOpacity style={{ position: 'absolute', top: 8, right: 8 }}>
                    <AntDesign name="hearto" size={20} color="gray" />
                  </TouchableOpacity>

  {/* Image */}
                  <View style={{ height: width * 0.3, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={item.image} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                  </View>

                  {/* Name */}
                  <Text className="text-base font-semibold text-center mt-2">{item.name}</Text>

                  {/* Price & Rating */}
                  <View className="flex-row justify-between mt-1">
                    <Text className="text-black font-semibold">₹ {item.price}</Text>
                    <View className="flex-row items-center">
                      <Text className="text-orange-500 text-sm">{item.rating}</Text>
                      <Entypo name="star" size={12} color="orange" />
                    </View>
                  </View>

                  {/* Add to Cart */}
                  <View className="mt-2">
                    {quantity === 0 ? (
                      <TouchableOpacity
                        className="bg-orange-100 border border-orange-400 rounded-xl py-1"
                        onPress={() => increment(item.id)}
                      >
                        <Text className="text-orange-500 font-semibold text-center text-sm">Add to cart</Text>
                      </TouchableOpacity>
                    ) : (
                      <View className="flex-row justify-center items-center gap-3 mt-2">
                        <TouchableOpacity
                          onPress={() => decrement(item.id)}
                          className="bg-red-100 rounded-full px-3 py-1"
                        >
                          <Text className="text-red-500 font-bold text-lg">-</Text>
                        </TouchableOpacity>
                        <Text className="text-lg font-semibold">{quantity}</Text>
                        <TouchableOpacity
                          onPress={() => increment(item.id)}
                          className="bg-green-100 rounded-full px-3 py-1"
                        >
                          <Text className="text-green-500 font-bold text-lg">+</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        <TouchableOpacity className=" mt-5 h-auto w-auto flex-row justify-between items-center">
          <Text className="text-2xl py-2 font-bold">Top Brands</Text>
          <AntDesign name="right" size={25} color="black" />
        </TouchableOpacity>
         <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-4 px-4"
    >
      {brands.map((brand) => (
        <View
          key={brand.id}
          className=" rounded-lg mr-3 items-center justify-center w-32 h-24  "
        >
          <Image
            source={brand.image}
            className="w-32 h-full"
            resizeMode="contain"
          />
          
        </View>
      ))}
    </ScrollView>
    <TouchableOpacity className=" mt-5 h-auto w-auto flex-row justify-between items-center">
          <Text className="text-2xl py-2 font-bold">Exclusive Brands Deals</Text>
          <AntDesign name="right" size={25} color="black" />
        </TouchableOpacity>
         <View className="flex-row flex-wrap justify-between px-4 mt-4">
      {offers.map((item) => (
        <View
          key={item.id}
          className="bg-white rounded-xl w-[30%] h-32 mb-4 p-3 items-center justify-center  relative shadow-sm border border-gray-200"
        >
          {/* Brand Logo */}
          <Image
            source={item.image}
            className="w-20 h-10"
            resizeMode="contain"
          />

          {/* Discount Badge */}
          <View className="absolute bottom-[-12px] bg-teal-400 px-1 py-3 rounded-3xl">
            <Text className="text-white text-xs font-semibold">Upto{item.discount} </Text>
            <Text className="text-white text-xs font-semibold text-center">
              OFF
            </Text>
          </View>
        </View>
      ))}
    </View>
      </ScrollView>
    </SafeAreaView>
  );
}
