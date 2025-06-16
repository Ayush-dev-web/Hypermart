import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import cerror from '../../assets/images/carterror.png';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const products = [
  { id: '1', name: 'Strawberries', price: 10, image: require('../../assets/images/strawberry.png') },
  { id: '2', name: 'Fried Chips', price: 12, image: require('../../assets/images/chips.png') },
  { id: '3', name: 'Moder Chair', price: 3599, image: require('../../assets/images/chair.png') },
  { id: '4', name: 'Washing Machine', price: 45999, image: require('../../assets/images/machine.png') },
];

export default function CartScreen() {
  const navigation = useNavigation();
  const [cart, setCart] = useState({});
  const [total, setTotal] = useState(0);

  // Fetch cart from AsyncStorage
  const fetchCart = async () => {
    try {
      const stored = await AsyncStorage.getItem('@cart');
      const obj = stored ? JSON.parse(stored) : {};
      setCart(obj);
    } catch (e) {
      console.error('Failed to load cart:', e);
    }
  };

  // Refresh cart when screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchCart();
    }, [])
  );

  // Calculate total whenever cart changes
  useEffect(() => {
    const sum = Object.entries(cart).reduce((acc, [id, qty]) => {
      const product = products.find(p => p.id === id);
      return acc + (product ? product.price * qty : 0);
    }, 0);
    setTotal(sum);
  }, [cart]);

  const clearCart = async () => {
    await AsyncStorage.removeItem('@cart');
    setCart({});
  };

  const renderItem = ({ item }) => {
    const qty = cart[item.id] || 0;
    if (qty <= 0) return null;

    return (
      <View className="flex-row items-center justify-between bg-slate-100 p-3 mb-3 rounded-xl">
        <Image source={item.image} style={{ width: 60, height: 60 }} />
        <View className="flex-1 ml-4">
          <Text className="font-semibold text-base">{item.name}</Text>
          <Text className="text-gray-500 text-sm">
            ₹ {item.price} × {qty} = ₹ {item.price * qty}
          </Text>
        </View>
      </View>
    );
  };

  const isEmpty =
    Object.keys(cart).length === 0 || Object.values(cart).every(qty => qty <= 0);

  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      {/* Top Header */}
      <View className="py-4 flex-row items-center justify-between">
        <FontAwesome name="arrow-left" size={28} onPress={() => navigation.goBack()} />
        <Text className="text-2xl font-semibold">Cart</Text>
        <FontAwesome6 name="magnifying-glass" size={22} />
      </View>

      {/* If cart is empty */}
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
          {/* List of Items */}
          <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />

          {/* Total and Clear Button */}
          <View className="border-t  pb-20 mt-2">
            <Text className="text-xl font-bold mb-2">Total: ₹ {total}</Text>
            <TouchableOpacity
              className="bg-red-500 py-3 rounded-xl"
              onPress={clearCart}
            >
              <Text className="text-white text-center font-semibold text-lg">
                Clear Cart
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
