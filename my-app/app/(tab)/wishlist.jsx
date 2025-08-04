import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import emptyImg from '../../assets/images/whislisterror.png';

export default function Wishlist() {
  const navigation = useNavigation();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const loadWishlist = async () => {
      setLoading(true);
      try {
        const stored = await AsyncStorage.getItem('@wishlist');
        const items = stored ? JSON.parse(stored) : [];   // ← FULL OBJECTS
        setWishlistItems(items);
      } catch (err) {
        console.error('Failed to load wishlist', err);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = navigation.addListener('focus', loadWishlist);
    return unsubscribe; // cleanup on unmount
  }, [navigation]);


  const removeFromWishlist = async (id) => {
    const stored = await AsyncStorage.getItem('@wishlist');
    const items = stored ? JSON.parse(stored) : [];
    const updated = items.filter((item) => item.id !== id);
    await AsyncStorage.setItem('@wishlist', JSON.stringify(updated));
    setWishlistItems(updated);
  };

 
  const moveToCart = async (item) => {
    const cartRaw = await AsyncStorage.getItem('@cart');
    const cart = cartRaw ? JSON.parse(cartRaw) : {};
    const updatedCart = {
      ...cart,
      [item.id]: (cart[item.id] || 0) + 1,
    };
    await AsyncStorage.setItem('@cart', JSON.stringify(updatedCart));
    await removeFromWishlist(item.id);
    Alert.alert('Success', `${item.title} moved to cart`);
  };

 
  const renderItem = ({ item }) => (
    <View className="bg-white p-4 rounded-xl mb-4 mx-4 shadow-md">
      <Image
        source={{ uri: item.thumbnail }}
        style={{ width: '100%', height: 150, resizeMode: 'contain' }}
      />

      <View className="flex-row justify-between items-center mt-2">
        <View className="flex-1 pr-3">
          <Text className="text-xl font-semibold">{item.title}</Text>
          <Text className="text-lg font-bold text-orange-500">₹ {item.price}</Text>
        </View>

        <TouchableOpacity
          onPress={() => removeFromWishlist(item.id)}
          className="p-2 rounded-full bg-red-100"
        >
          <MaterialIcons name="delete-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => moveToCart(item)}
        className="bg-yellow-300 mt-3 px-4 py-2 rounded-xl items-center"
      >
        <Text className="font-semibold text-black">Move to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="h-auto py-4 px-4 flex-row justify-between items-center  rounded-2xl drop-shadow-xl">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>

        <Text className="text-xl font-semibold text-black">Wishlist</Text>

        <View className="flex-row gap-4">
          <FontAwesome6 name="magnifying-glass" size={22} color="black" />
          <Feather
            name="shopping-bag"
            size={22}
            color="black"
            onPress={() => navigation.navigate('cart')}
          />
        </View>
      </View>

      {/* Body */}
      {loading ? (
        <ActivityIndicator size="large" color="#facc15" className="mt-20" />
      ) : wishlistItems.length ? (
        <FlatList
          data={wishlistItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: 20 }}
        />
      ) : (
        <View className="flex-1 items-center justify-center px-6">
          <Image source={emptyImg} style={{ width: 280, height: 280 }} className="mb-6" />
          <Text className="text-3xl font-bold mb-2">Your wishlist is empty</Text>
          <Text className="text-center text-lg text-gray-600 mb-6">
            Save items in your wishlist. Review and easily move {'\n'} them to your bag.
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('index')}
            className="bg-[#ffe998] py-3 px-6 rounded-xl"
          >
            <Text className="text-lg font-semibold">Shop Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
