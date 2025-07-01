import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import bhim from '../../assets/images/bhim.avif';
import gpay from '../../assets/images/gpay.avif';
import phonepe from '../../assets/images/phonepe.webp';
import paytm from '../../assets/images/paytm.webp';
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

export default function PaymentScreen() {
  const navigation = useNavigation();
  const [cart, setCart] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      const stored = await AsyncStorage.getItem('@cart');
      const obj = stored ? JSON.parse(stored) : {};
      setCart(obj);
    };
    fetchCart();
  }, []);

  const cartItems = products.filter(p => cart[p.id]);
  const computedTotal = cartItems.reduce(
    (sum, item) => sum + item.price * (cart[item.id] || 1),
    0
  );

  useEffect(() => {
    setTotalAmount(computedTotal);
  }, [cart]);

  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-1 justify-center items-center bg-white">
          <Text className="text-lg font-bold mb-4">Payment Summary</Text>
          <Text className="text-base">Items in Cart: {cartItems.length}</Text>
          <Text className="text-xl font-semibold mt-2">To Pay: ₹{totalAmount}</Text>
        </View>

        {/* To Pay Section */}
        <View className="bg-gray-100 p-3 rounded-xl my-2">
          <Text className="text-base text-gray-700">
            To Pay:{' '}
            <Text className="text-green-600 font-semibold">₹{totalAmount}</Text>
          </Text>
        </View>

        {/* UPI Section */}
        <Text className="text-sm font-semibold mt-4 mb-2">Pay by UPI</Text>
        <View className="bg-gray-100 rounded-xl p-4 mb-3">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-base font-medium">Pay by any UPI app</Text>
            <AntDesign name="right" size={16} color="gray" />
          </View>

          <View className="flex-row gap-3 mb-4 items-center">
            <Image
              source={gpay}
              style={{ width: 80, height: 40, borderRadius: 10 }}
            />
            <Image
              source={phonepe}
              style={{ width: 100, height: 30, borderRadius: 10 }}
            />
            <Image
              source={bhim}
              style={{ width: 80, height: 40, borderRadius: 10 }}
            />
            <Image
              source={paytm}
              style={{ width: 60, height: 40, borderRadius: 10 }}
            />
          </View>

          <TouchableOpacity className="flex-row items-center space-x-2">
            <Text className="text-pink-500 text-base font-semibold">
              + Add New UPI ID
            </Text>
          </TouchableOpacity>
        </View>



        {/* Credit & Debit Cards */}
        <View className="bg-gray-100 rounded-xl p-4 mb-3">
          <TouchableOpacity className="flex-row items-center justify-between">
            <View className='gap-2'>
              <Text className="text-pink-500 font-semibold">+ Add New Card</Text>
              <View className="flex-row space-x-2 items-center">
                <Image
                  source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png' }}
                  className="w-24 h-8"
                />
                <Image
                  source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png' }}
                  className="w-20 h-14"
                />
              </View>
            </View>

            <AntDesign name="right" size={16} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Pay Later Section */}
        <Text className="text-sm font-semibold mt-4 mb-2">Pay Later</Text>
        <View className="bg-gray-100 rounded-xl p-4 space-y-3 mb-3">
          <View className="flex-row items-center justify-between">
            <Text className="text-base text-gray-700">Simpl</Text>
            <Text className="text-gray-400 text-sm">Currently Ineligible</Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-base text-gray-700">LazyPay</Text>
            <Text className="text-gray-400 text-sm">Currently Ineligible</Text>
          </View>

          <TouchableOpacity className="flex-row items-center justify-between">
            <Text className="text-base text-gray-700">Amazon Pay Later</Text>
            <Text className="text-pink-500 font-semibold">LINK</Text>
          </TouchableOpacity>
        </View>

        {/* COD Section */}
        <Text className="text-sm font-semibold mt-4 mb-2">Cash on Delivery</Text>
        <View className="bg-gray-100 rounded-xl p-4 mb-10">
          <TouchableOpacity className="flex-row items-center justify-between">
            <Text className="text-base font-medium text-gray-800">
              Pay with Cash on Delivery
            </Text>
            <AntDesign name="right" size={16} color="gray" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
