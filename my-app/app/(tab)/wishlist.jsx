import { View, Text, Image, Dimensions, TouchableOpacity, FlatList, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import error from '../../assets/images/whislisterror.png';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { useNavigation } from '@react-navigation/native';

export default function Wishlist() {
  const { width, height } = Dimensions.get('window');
  const navigation = useNavigation();
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist on screen focus
  useEffect(() => {
    const loadWishlist = async () => {
      const stored = await AsyncStorage.getItem('@wishlist');
      if (stored) {
        setWishlist(JSON.parse(stored));
      }
    };
    const unsubscribe = navigation.addListener('focus', loadWishlist);
    return unsubscribe;
  }, [navigation]);

  // Remove item from wishlist
  const removeFromWishlist = async (id) => {
    const updated = wishlist.filter(item => item.id !== id);
    setWishlist(updated);
    await AsyncStorage.setItem('@wishlist', JSON.stringify(updated));
  };

  const renderItem = ({ item }) => (
    <View className="bg-white p-4 rounded-xl mb-4 mx-4 shadow-md">
      <Image source={item.image} style={{ width: '100%', height: 150, resizeMode: 'contain' }} />
      <View className="flex-row justify-between items-center mt-2">
        <View>
          <Text className="text-xl font-semibold">{item.name}</Text>
          <Text className="text-lg font-bold text-orange-500">₹ {item.price}</Text>
        </View>
        {/* Remove Button */}
        <TouchableOpacity
          onPress={() => removeFromWishlist(item.id)}
          className="p-2 rounded-full bg-red-100"
        >
          <MaterialIcons name="delete-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity className="bg-yellow-300 mt-3 px-4 py-2 rounded-xl items-center">
        <Text className="font-semibold text-black">Move to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-100 px-4">
      {/* Header */}
      <View className="h-auto w-full py-4  flex-row justify-between items-center bg-yellow-300 ">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-black">Wishlist</Text>
        <View className="flex-row gap-4">
          <FontAwesome6 name="magnifying-glass" size={22} color="black" />
          <Feather name="shopping-bag" size={22} color="black" onPress={() => navigation.navigate('cart')} />
        </View>
      </View>

      {/* Wishlist Items */}
      {wishlist.length > 0 ? (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: 20 }}
        />
      ) : (
        <View className="flex-1 items-center justify-center px-6">
          <Image source={error} style={{ height: 300, width: 300 }} className="mb-6" />
          <Text className="text-3xl font-bold mb-2">Your wishlist is empty</Text>
          <Text className="text-center text-lg text-gray-600 mb-6">
            Save items in your wishlist. Review and easily move {'\n'} them to your bag.
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('index')}
            className="bg-yellow-300 py-3 px-6 rounded-xl"
          >
            <Text className="text-lg font-semibold">Shop Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
