import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, Feather, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProductDetailScreen() {
  const { id } = useRoute().params;
  const navigation = useNavigation();
const router = useRouter();
  const [product, setProduct] = useState(null);
  const [wishlist, setWishlist] = useState(false);
  const [address, setAddress] = useState('');
  const [qty, setQty] = useState(1); // ✅ quantity for Add to cart / Buy now
const [isAddedToCart, setIsAddedToCart] = useState(false);
  // 🟡 Fetch Product
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  const toggleWishlist = async () => {
  try {
    const stored = await AsyncStorage.getItem('@wishlist');
    let wishlistItems = stored ? JSON.parse(stored) : [];

    const exists = wishlistItems.some(item => item.id === product.id);

    if (exists) {
      wishlistItems = wishlistItems.filter(item => item.id !== product.id);
      setWishlist(false);
    } else {
      wishlistItems.push(product);
      setWishlist(true);
    }

    await AsyncStorage.setItem('@wishlist', JSON.stringify(wishlistItems));
  } catch (err) {
    console.error('Error toggling wishlist', err);
  }
};

useEffect(() => {
  const checkWishlist = async () => {
    const stored = await AsyncStorage.getItem('@wishlist');
    const wishlistItems = stored ? JSON.parse(stored) : [];
    const exists = wishlistItems.some(item => item.id === id);
    setWishlist(exists);
  };

  if (product) checkWishlist();
}, [product]);
  // 🟡 Get Address
  useEffect(() => {
    const fetchAddress = async () => {
      const stored = await AsyncStorage.getItem('@user_address');
      if (stored) {
        const { address } = JSON.parse(stored);
        setAddress(address);
      }
    };
    fetchAddress();
  }, []);

  // 🟢 Wishlist toggle
  // const toggleWishlist = async () => {
  //   setWishlist(!wishlist);
  //   const existing = JSON.parse(await AsyncStorage.getItem('wishlist')) || [];
  //   if (!wishlist) {
  //     await AsyncStorage.setItem('wishlist', JSON.stringify([...existing, product]));
  //   } else {
  //     await AsyncStorage.setItem('wishlist', JSON.stringify(existing.filter(p => p.id !== product.id)));
  //   }
  // };

  // 🟢 Add to cart (uses your @cart shape: { [id]: count })
  const addToCart = async () => {
    const stored = await AsyncStorage.getItem('@cart');
    const obj = stored ? JSON.parse(stored) : {};
    obj[product.id] = (obj[product.id] || 0) + qty;
    await AsyncStorage.setItem('@cart', JSON.stringify(obj));
  };

  // 🟢 Buy now → add to cart → go to payments with total
  const handleProceedToPay = async () => {
    await addToCart();
    navigation.navigate('payments', { totalAmount: grandTotal });
  };

  if (!product) return <Text className="text-center mt-10">Loading...</Text>;

  const originalPrice = product.price + 3000;
  const discount = Math.floor(((originalPrice - product.price) / originalPrice) * 100);
  const deliveryCharge = product.price * qty >= 499 ? 0 : 25;
  const handlingCharge = 2;
  const itemsTotal = product.price * qty;
  const grandTotal = itemsTotal + handlingCharge + deliveryCharge;
  const savings = (originalPrice - product.price) * qty;

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <ScrollView showsVerticalScrollIndicator={false} className="px-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
                  <FontAwesome name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
        {/* ✅ Product Image + Wishlist */}
         <View className="relative mt-4 rounded-xl  ">
          <Image source={{ uri: product.thumbnail }} className="w-full h-72 rounded-xl bg-white" resizeMode="contain" />
         <TouchableOpacity onPress={toggleWishlist} className="absolute top-2 right-2 p-2">
  <FontAwesome
    name={wishlist ? 'heart' : 'heart-o'}
    size={24}
    color={wishlist ? 'red' : 'black'}
  />
</TouchableOpacity>
        </View>

        {/* ✅ Title, Price, Offer */}
        <View className="mt-4 rounded-xl ">
          <Text className="text-black text-lg font-semibold">{product.title}</Text>
          <Text className="text-gray-400 text-sm mt-1">{product.brand}</Text>
          <View className="flex-row items-center mt-2">
            <Text className="text-black text-lg font-bold mr-2">₹{product.price}</Text>
            <Text className="text-gray-500 line-through">₹{originalPrice}</Text>
            <Text className="text-green-500 ml-2">{discount}% OFF</Text>
          </View>

          {/* ✅ Qty selector */}
          <View className="flex-row items-center mt-3">
            <Text className="text-sm text-gray-600 mr-3">Quantity</Text>
            <View className="flex-row items-center bg-green-100 rounded-lg px-2 py-1">
              <TouchableOpacity onPress={() => setQty(q => Math.max(1, q - 1))}>
                <Text className="text-xl font-bold px-2 text-green-700">−</Text>
              </TouchableOpacity>
              <Text className="font-bold text-base px-2">{qty}</Text>
              <TouchableOpacity onPress={() => setQty(q => q + 1)}>
                <Text className="text-xl font-bold px-2 text-green-700">+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ✅ Service Info */}
        <View className="flex-row justify-between bg-white p-3 rounded-2xl mt-4">
          <View className="items-center">
            <Feather name="shield" size={20} color="black" />
            <Text className="text-black text-xs mt-1">1 Year</Text>
          </View>
          <View className="items-center">
            <MaterialIcons name="autorenew" size={20} color="black" />
            <Text className="text-black text-xs mt-1">7 Days</Text>
          </View>
          <View className="items-center">
            <MaterialIcons name="support-agent" size={20} color="black" />
            <Text className="text-black text-xs mt-1">24/7</Text>
          </View>
          <View className="items-center">
            <Feather name="truck" size={20} color="black" />
            <Text className="text-black text-xs mt-1">Fast</Text>
          </View>
        </View>

        {/* ✅ Address Section (same as your cart) */}
        <View className="bg-white rounded-xl p-4 mt-4 mb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <FontAwesome name="map-marker" size={22} color="#16a34a" />
              <View className="ml-2">
                <Text className="font-semibold text-base">Delivering to Home</Text>
                <Text className="text-gray-600 text-sm">{address ? address : 'Fetching your location...'}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('LocationPickerScreen')}>
              <Text className="text-green-600 font-semibold text-sm">Change</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ✅ Info accordions */}
        <View className="mt-4 rounded-xl">
          <Pressable className="bg-white p-4 rounded-t-xl">
            <Text className="text-black text-base">Key Information</Text>
          </Pressable>
          <View className="bg-slate-200 p-3 rounded-xl">
            <Text className="text-black text-sm">{product.description}</Text>
          </View>

          <Pressable className="bg-white p-4 rounded-b-xl mt-2">
            <Text className="text-black text-base">Info</Text>
          </Pressable>
          <View className="bg-slate-300 p-3 mb-4 rounded-xl">
            <Text className="text-black text-sm">Rating: ⭐ {product.rating}</Text>
          </View>
        </View>

        {/* ✅ Billing Summary (same logic as cart) */}
        <View className="bg-white rounded-xl p-4">
          <Text className="text-lg font-bold mb-3">Bill details</Text>

          <View className="flex-row justify-between mb-1">
            <Text className="text-gray-600">Items total</Text>
            <View className="flex-row gap-2 items-center">
              <Text className="line-through text-gray-400">₹{originalPrice * qty}</Text>
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

        {/* ✅ Savings Note */}
        <View className="bg-blue-100 px-4 py-3 rounded-xl mt-4">
          <Text className="text-blue-800 font-semibold">
            You save ₹{savings} on this purchase
          </Text>
        </View>

        {/* ✅ Cancellation Info */}
        <View className="bg-white px-4 py-4 rounded-xl mt-4 mb-28">
          <Text className="text-base font-bold mb-1">Cancellation Policy</Text>
          <Text className="text-sm text-gray-600">
            Orders cannot be cancelled once packed. Refunds apply only if delays occur.
          </Text>
        </View>
      </ScrollView>

          {/* ✅ Sticky bottom bar: Add to cart → Go to Cart */}
     <View className="absolute bottom-4 left-0 right-0 flex-row items-center justify-between bg-white p-4 border-t border-gray-200">
  <View>
    <Text className="text-green-800 font-bold text-xl">₹{grandTotal}</Text>
    <Text className="text-xs text-gray-500">TOTAL</Text>
  </View>

  <View className="flex-row gap-3">
    {isAddedToCart ? (
      <TouchableOpacity
        onPress={() => router.push('/cart')}
        className="bg-green-500 px-4 py-3 rounded-xl"
      >
        <Text className="text-white font-semibold text-base">Go to Cart</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        onPress={async () => {
          await addToCart();
          setIsAddedToCart(true);
        }}
        className="bg-yellow-300 px-4 py-3 rounded-xl"
      >
        <Text className="text-black font-semibold text-base">Add to cart</Text>
      </TouchableOpacity>
    )}
  </View>
</View>


    </SafeAreaView>
  );
}
