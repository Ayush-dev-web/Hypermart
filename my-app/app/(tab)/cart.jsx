import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import cerror from '../../assets/images/carterror.png';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const products = [
  {
    id: '1',
    name: 'Strawberries',
    price: 10,
    originalPrice: 15,
    image: require('../../assets/images/strawberry.png'),
  },
  {
    id: '2',
    name: 'Fried Chips',
    price: 12,
    originalPrice: 18,
    image: require('../../assets/images/chips.png'),
  },
  {
    id: '3',
    name: 'Moder Chair',
    price: 3599,
    originalPrice: 3999,
    image: require('../../assets/images/chair.png'),
  },
  {
    id: '4',
    name: 'Washing Machine',
    price: 45999,
    originalPrice: 47999,
    image: require('../../assets/images/machine.png'),
  },
];

// (same import statements as before...)

export default function CartScreen() {
  const navigation = useNavigation();
  const [cart, setCart] = useState({});

  const fetchCart = async () => {
    try {
      const stored = await AsyncStorage.getItem('@cart');
      const obj = stored ? JSON.parse(stored) : {};
      setCart(obj);
    } catch (e) {
      console.error('Failed to load cart:', e);
    }
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
  };

  const clearCart = async () => {
    await AsyncStorage.removeItem('@cart');
    setCart({});
  };

  const getCartProducts = () =>
    products.filter(p => cart[p.id] && cart[p.id] > 0);

  const cartItems = getCartProducts();

  const itemsTotal = cartItems.reduce(
    (sum, p) => sum + p.price * cart[p.id],
    0
  );
  const originalTotal = cartItems.reduce(
    (sum, p) => sum + p.originalPrice * cart[p.id],
    0
  );
  const savings = originalTotal - itemsTotal;
  const deliveryCharge = itemsTotal >= 499 ? 0 : 25;
  const handlingCharge = 2;
  const grandTotal = itemsTotal + handlingCharge;

  const isEmpty = cartItems.length === 0;

  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      <View className="py-4 flex-row items-center justify-between bg-yellow-300">
        <FontAwesome name="arrow-left" size={28} onPress={() => navigation.goBack()} />
        <Text className="text-2xl font-semibold">Cart</Text>
        <FontAwesome6 name="magnifying-glass" size={22} />
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
          <ScrollView className="mb-28 pb-28">
            {cartItems.map(item => (
              <View
                key={item.id}
                className="bg-white mb-4 rounded-xl p-4 flex-row items-center justify-between"
              >
                <Image source={item.image} style={{ width: 70, height: 70 }} />
                <View className="flex-1 ml-4">
                  <Text className="font-semibold text-base">{item.name}</Text>
                  <Text className="text-sm text-gray-600">10 kg</Text>
                  <View className="flex-row gap-2 mt-1 items-center">
                    <Text className="text-lg font-bold text-black">₹{item.price}</Text>
                    <Text className="text-sm line-through text-gray-400">₹{item.originalPrice}</Text>
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
            <View className="bg-white rounded-xl p-4">
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

            {/* Savings */}
            <View className="bg-blue-100 px-4 py-3 rounded-xl mt-4">
              <Text className="text-blue-800 font-semibold">
                Your total savings ₹{savings}
              </Text>
            </View>

            {/* Cancellation Policy */}
            <View className="bg-white px-4 py-4 rounded-xl mt-4">
              <Text className="text-base font-bold mb-1">Cancellation Policy</Text>
              <Text className="text-sm text-gray-600">
                Orders cannot be cancelled once packed for delivery. In case of unexpected delays, a refund will be provided, if applicable.
              </Text>
            </View>
          </ScrollView>

          {/* ✅ Bottom Bar: Proceed to Pay */}
          <View className="absolute bottom-28 left-0 right-0 flex-row items-center justify-between bg-white p-4 border-t border-gray-200">
            <View>
              <Text className="text-green-800 font-bold text-xl">₹{grandTotal}</Text>
              <Text className="text-xs text-gray-500">TOTAL</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('payments', { totalAmount: grandTotal })}
              className="bg-green-600 px-6 py-3 rounded-xl"
            >
              <Text className="text-white font-semibold text-base">Proceed to Pay ➤</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
