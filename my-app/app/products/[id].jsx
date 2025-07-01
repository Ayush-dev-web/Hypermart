import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useCart } from '../../context/CartContext';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [wishlist, setWishlist] = useState([]);
  const { cart, increment, decrement } = useCart();

  const quantity = cart[id] || 0;

  const loadWishlist = async () => {
    const stored = await AsyncStorage.getItem('@wishlist');
    if (stored) setWishlist(JSON.parse(stored));
  };

  const isWishlisted = (id) => wishlist.some((item) => item.id == id);

  const toggleWishlist = async (item) => {
    const exists = isWishlisted(item.id);
    let updated = [];

    if (exists) {
      updated = wishlist.filter((i) => i.id != item.id);
    } else {
      updated = [...wishlist, item];
    }

    setWishlist(updated);
    await AsyncStorage.setItem('@wishlist', JSON.stringify(updated));
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.warn('API failed or product not found:', err.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return <ActivityIndicator size="large" color="orange" className="mt-20" />;

  // Choose fallback product if API failed
  const fallbackProduct = {
    id,
    title: 'Avocado Hass',
    description: 'Imported fresh Avocados',
    price: 79,
    thumbnail: 'https://i.imgur.com/Vnq8uAx.png',
  };

  const displayProduct = error || !product ? fallbackProduct : product;
  const wished = isWishlisted(displayProduct.id);

  return (
    <ScrollView className="flex-1 bg-slate-100 px-4 py-5">
      <View className="bg-white p-5  gap-3 rounded-xl shadow-sm">
        {/* Wishlist icon */}
        <TouchableOpacity
          onPress={() => toggleWishlist(displayProduct)}
          className="absolute top-4 right-4 z-10"
        >
          <AntDesign
            name={wished ? 'heart' : 'hearto'}
            size={24}
            color={wished ? 'red' : 'gray'}
          />
        </TouchableOpacity>

        <Image
          source={{ uri: displayProduct.thumbnail }}
          className="w-full h-full rounded-lg mb-4"
          resizeMode="cover"
        />

        <Text className="text-black text-2xl font-bold">
          {displayProduct.title}
        </Text>
        <Text className="text-gray-600 text-sm mt-1">
          {displayProduct.description}
        </Text>

        <View className="flex-row justify-between items-center mt-4">
          <Text className="text-black text-lg font-semibold">
            ₹{displayProduct.price}
          </Text>

          {quantity === 0 ? (
            <TouchableOpacity
              onPress={() => increment(displayProduct.id)}
              className="bg-orange-400 px-4 py-2 rounded-xl"
            >
              <Text className="text-white font-bold text-sm">Add to cart</Text>
            </TouchableOpacity>
          ) : (
            <View className="flex-row items-center gap-4">
              <TouchableOpacity
                onPress={() => decrement(displayProduct.id)}
                className="px-3 py-1 bg-red-100 rounded"
              >
                <Text className="text-red-500 font-bold">–</Text>
              </TouchableOpacity>
              <Text className="font-bold">{quantity}</Text>
              <TouchableOpacity
                onPress={() => increment(displayProduct.id)}
                className="px-3 py-1 bg-green-100 rounded"
              >
                <Text className="text-green-500 font-bold">+</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {!error && (
          <Text className="text-gray-400 mt-3">
            Rating: {displayProduct.rating}
          </Text>
        )}
      </View>
    </ScrollView>
  );
}
