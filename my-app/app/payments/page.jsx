import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert

} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import bhim from '../../assets/images/bhim.avif';
import gpay from '../../assets/images/gpay.avif';
import phonepe from '../../assets/images/phonepe.webp';
import paytm from '../../assets/images/paytm.webp';
import cashondelivery from '../../assets/images/cash-on-delivery.png'


export default function PaymentScreen() {
  const navigation = useNavigation();
  const [cart, setCart] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [cartCount, setCartCount] = useState(0); // To display count

   useEffect(() => {
    const fetchCartAndData = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('@cart');
        const parsedCart = storedCart ? JSON.parse(storedCart) : {};
        setCart(parsedCart);

        const keys = Object.keys(parsedCart).filter(k => !isNaN(k)); // Only numeric keys
        setCartCount(keys.length);

        let total = 0;
        for (const key of keys) {
          const quantity = parsedCart[key];
          const res = await fetch(`https://dummyjson.com/products/${key}`);
          const data = await res.json();
          total += data.price * quantity;
        }

        setTotalAmount(total);
      } catch (err) {
        console.error('Error loading payment data:', err);
      }
    };

    fetchCartAndData();
  }, []);
  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-1 justify-center items-center bg-white">
          <Text className="text-lg font-bold mb-4">Payment Summary</Text>
         <Text className="text-base">Items in Cart: {cartCount}</Text>
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
            <View className="gap-2">
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
            <View className='right-4'> 
            <Image source={cashondelivery} style={{ width: 80, height: 40, borderRadius: 10, resizeMode:'contain' }} />
           </View>
            <Text className="text-base font-medium text-gray-800 ">
              Pay with Cash on Delivery
            </Text>
            <AntDesign name="right" size={16} color="gray" />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
  <TouchableOpacity
    onPress={() => {
      Alert.alert(
        "Order Placed",
        "🎉 Yay! Your order is placed successfully",
        [{ text: "OK" }]
      );
    }}
    className="bg-green-600 p-4 rounded-xl items-center"
  >
    <Text className="text-white font-bold text-lg">Checkout</Text>
  </TouchableOpacity>
</View>

    </SafeAreaView>
  );
}
