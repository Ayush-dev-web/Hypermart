import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import useLocation from '../../app-example/utils/useLocation';
import cerror from '../../assets/images/carterror.png';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import delivery from '../../assets/images/delivery-man.png';

export default function CartScreen() {
  const navigation = useNavigation();
  const [cart, setCart] = useState({});
  const [cartProducts, setCartProducts] = useState([]);
  const { address, coordinate } = useLocation();
  

  const tipOptions = [
    { amount: '₹20', emoji: '😄' },
    { amount: '₹30', emoji: '🤣' },
    { amount: '₹50', emoji: '😍' },
    { amount: 'Custom', emoji: '👏' },
  ];
  const fetchCart = async () => {
    try {
      const stored = await AsyncStorage.getItem('@cart');
      const obj = stored ? JSON.parse(stored) : {};
      setCart(obj);
      await fetchProductsFromAPI(obj);
    } catch (e) {
      console.error('Failed to load cart:', e);
    }
  };
  
  const addToCart = async () => {
  try {
    const existing = await AsyncStorage.getItem('@cart');
    let cart = existing ? JSON.parse(existing) : {};

    // Increment quantity or add new product
    if (cart[product.id]) {
      cart[product.id] += quantity;
    } else {
      cart[product.id] = quantity;
    }

    await AsyncStorage.setItem('@cart', JSON.stringify(cart));
    alert(`${product.title} added to cart`);
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};



  const fetchProductsFromAPI = async (cartObj) => {
    const productIds = Object.keys(cartObj);
    const fetchedProducts = [];

    for (let id of productIds) {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        fetchedProducts.push(data);
      } catch (err) {
        console.warn(`Failed to fetch product with id ${id}`, err);
      }
    }

    setCartProducts(fetchedProducts);
  };

  useFocusEffect(
    useCallback(() => {
      fetchCart();
    }, [])
  );

  const updateCart = async (id, change) => {
    const updated = { ...cart };
    updated[id] = (updated[id] || 0) + change;
    if (updated[id] <= 0) delete updated[id];
    setCart(updated);
    await AsyncStorage.setItem('@cart', JSON.stringify(updated));
    fetchProductsFromAPI(updated);
  };

  const clearCart = async () => {
    await AsyncStorage.removeItem('@cart');
    setCart({});
    setCartProducts([]);
  };

  const cartItems = cartProducts;
  const isEmpty = cartItems.length === 0;

  const itemsTotal = cartItems.reduce((sum, p) => sum + p.price * cart[p.id], 0);
  const originalTotal = cartItems.reduce((sum, p) => sum + ((p.originalPrice || (p.price + 5)) * cart[p.id]), 0);
  const savings = originalTotal - itemsTotal;
  const deliveryCharge = itemsTotal >= 499 ? 0 : 25;
  const handlingCharge = 2;
  const grandTotal = itemsTotal + handlingCharge;

  return (
    <SafeAreaView className="flex-1 bg-slate-100 px-4">

      {/* Top Header */}
      <View className="py-4 flex-row items-center justify-between ">
        <FontAwesome name="arrow-left" size={28} onPress={() => navigation.goBack()} />
        <Text className="text-2xl font-semibold">Cart</Text>
        <TouchableOpacity onPress={clearCart}>
          <Text className="text-sm text-red-500 font-bold">Remove All</Text>
        </TouchableOpacity>
      </View>

      {isEmpty ? (
        <View className="items-center mt-10">
          <Image source={cerror} style={{ width: 300, height: 300 }} />
          <Text className="text-3xl font-bold mt-6">Your Cart is empty</Text>
          <Text className="text-base font-light text-center mt-2 px-6 text-gray-500">
            You have no items in your shopping cart.
          </Text>
          <TouchableOpacity
            className="mt-6 bg-[#ffe998] px-6 py-4 rounded-xl"
            onPress={() => navigation.navigate('index')}
          >
            <Text className="font-bold text-black text-lg">Shop Now</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false} className='mb-14' >
            {cartItems.map(item => (
              <View
                key={item.id}
                className="bg-white mb-4 rounded-2xl p-4 flex-row items-center shadow-md"
                style={{ elevation: 3 }}
              >
                <Image
                  source={{ uri: item.thumbnail }}
                  style={{ width: 80, height: 80, borderRadius: 16 }}
                />
                <View className="flex-1 ml-4">
                  <Text className="font-semibold text-base">{item.title}</Text>
                  <Text className="text-sm text-gray-600">{item.category}</Text>
                  <View className="flex-row items-center gap-2 mt-1">
                    <Text className="text-lg font-bold text-black">₹{item.price}</Text>
                    <Text className="text-sm line-through text-gray-400">
                      ₹{item.originalPrice || item.price + 5}
                    </Text>
                  </View>
                </View>
                <View className="flex-row items-center bg-green-100 rounded-lg px-2 py-1">
                  <TouchableOpacity onPress={() => updateCart(item.id, -1)}>
                    <Text className="text-xl font-bold px-2 text-green-700">−</Text>
                  </TouchableOpacity>
                  <Text className="font-bold text-base px-2">{cart[item.id]}</Text>
                  <TouchableOpacity onPress={() => updateCart(item.id, 1)}>
                    <Text className="text-xl font-bold px-2 text-green-700">+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            {/* Bill Details */}
            <View className="bg-white rounded-xl p-4 shadow-sm mt-2">
              <Text className="text-lg font-bold mb-3">Bill details</Text>
              <View className="flex-row justify-between mb-1">
                <Text className="text-gray-600">Items total</Text>
                <View className="flex-row gap-2 items-center">
                  <Text className="line-through text-gray-400">₹{originalTotal}</Text>
                  <Text className="font-semibold text-black">₹{itemsTotal}</Text>
                </View>
              </View>
              <View className="flex-row justify-between mb-1">
                <Text className="text-gray-600">Delivery charge</Text>
                <Text className={deliveryCharge === 0 ? 'text-green-600' : 'text-black'}>
                  {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                </Text>
              </View>
              <View className="flex-row justify-between mb-1">
                <Text className="text-gray-600">Handling charge</Text>
                <Text>₹{handlingCharge}</Text>
              </View>
              <View className="flex-row justify-between mt-2 border-t pt-2">
                <Text className="font-bold text-lg">Grand total</Text>
                <Text className="font-bold text-lg">₹{grandTotal}</Text>
              </View>
            </View>

            <View className="bg-blue-100 px-4 py-3 rounded-xl mt-4">
              <Text className="text-blue-800 font-semibold">
                Your total savings ₹{savings}
              </Text>
            </View>
            {/* {tip section} */}
            <View className="bg-white rounded-xl px-4 mt-4">
      {/* Header Section */}
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-1 pr-2">
          <Text className="text-gray-600 font-semibold text-lg">Tip your delivery partner</Text>
          <Text className="text-gray-400 text-sm">
            Your kindness means a lot! 100% of your tip will go directly to your delivery partner.
          </Text>
        </View>
      
        <Image
          source={delivery}
          className="w-16 h-16"
          resizeMode="contain"
        />
      </View>

      {/* Tip Buttons */}
      <View className="flex-row justify-between">
        {tipOptions.map((tip, index) => (
          <TouchableOpacity
            key={index}
            className="bg-[#2c2c2e] px-4 py-2 rounded-full flex-row items-center"
          >
            <Text className="text-white text-base mr-1">{tip.emoji}</Text>
            <Text className="text-white text-base">{tip.amount}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>






{/* {cancellayion policy} */}
            <View className="bg-white px-4 py-4 rounded-xl mt-4">
              <Text className="text-base font-bold mb-1">Cancellation Policy</Text>
              <Text className="text-sm text-gray-600">
                Orders cannot be cancelled once packed for delivery. In case of unexpected delays, a refund will be provided, if applicable.
              </Text>
            </View>

            {/* Delivery Location */}
         
          </ScrollView>
        <View className="absolute bottom-20 left-5 w-full rounded-xl px-4 bg-slate-100 ">
  {/* Address Section */}
  <View className="bg-white rounded-xl px-4 py-3 items-center shadow-md flex-row justify-between ">
    <View className="flex-row items-start flex-1">
      <FontAwesome name="map-marker" size={22} color="#16a34a" className="mt-1" />
      <View className="ml-2 flex-1">
        <Text className="text-sm font-semibold text-black">Delivering to Home</Text>
        <Text className="text-xs text-gray-600" numberOfLines={1}>
          {address || 'Fetching your location...'}
        </Text>
      </View>
    </View>
    <TouchableOpacity onPress={() => navigation.navigate('locationChange')}>
      <Text className="text-green-700 font-semibold text-xs">Change</Text>
    </TouchableOpacity>
  </View>

  {/* Payment Section */}
  <View className="bg-green-600 mt-2 flex-row justify-between items-center px-4 py-3 rounded-xl">
    <Text className="text-white font-bold text-base">₹{grandTotal} TOTAL</Text>
    <TouchableOpacity
      onPress={() => navigation.navigate('payments', { totalAmount: grandTotal })}
    >
      
      <Text className="text-white font-semibold text-base">Proceed To Pay ➤</Text>
    </TouchableOpacity>
  </View>
</View>

        </>
      )}
    </SafeAreaView>
  );
}
