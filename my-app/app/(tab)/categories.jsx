import { View, Text,ScrollView,TextInput,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import GroceryKitchen from '../../app-example/components/Allprocompo';
import Snackscompo from '../../app-example/components/Snackscompo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import Storecompo2 from '../../app-example/components/Storecompo2';
import { useNavigation } from '@react-navigation/native';
import { useState,useRef,useEffect } from 'react';
import { router } from 'expo-router';



export default function index() {
  function debounce(func, delay) {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }
 const [searchQuery, setSearchQuery] = useState('');
 const [searchResults, setSearchResults] = useState([]);
const fetchSuggestions = async (query) => {
  if (!query.trim()) return setSearchResults([]);
  try {
    const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
    const data = await response.json();
    setSearchResults(data.products || []);
  } catch (error) {
    console.error('Search Error:', error);
  }
};
 
 const debouncedSearch = useRef(debounce(fetchSuggestions, 200)).current;

  useEffect(() => {
     if (searchQuery.trim() === '') {
       setSearchResults([]);
     }
   }, [searchQuery]);
const navigation = useNavigation();
  return (
   
   <SafeAreaView className="bg-slate-100 flex-1 px-4">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        
        <View className="flex-row items-center justify-between px-2 py-4">
          <FontAwesome name="arrow-left" size={28} color="black" />
          <Text className="text-2xl font-semibold">Categories</Text>
           <FontAwesome name="user-circle" size={28} color="black"  onPress={() => navigation.navigate('profile')} />
        </View>

        <View className="flex-row items-center bg-slate-300  rounded-3xl px-4 py-3">
          <SimpleLineIcons name="magnifier" size={24} color="grey" />
          <TextInput
            placeholder="Search Anything..."
            placeholderTextColor="gray"
            className="flex-1 text-black ml-4"
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              debouncedSearch(text);

            }}
          />{searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} >
              <AntDesign name="closecircle" size={20} color="gray" />
            </TouchableOpacity>
          )}
          <FontAwesome6 name="microphone" size={24} color="#4AB7B6" />
        </View>
        {searchResults.length > 0 && (
          <View className="mt-6">
            <Text className="text-xl font-semibold mb-4">Search Results</Text>
            {searchResults.map((item) => (
              <TouchableOpacity
  key={item.id}
  onPress={() => router.push(`/products/${item.id}`)}
  className="flex-row items-center mb-4 bg-white rounded-lg p-3 shadow-sm space-x-3"
  style={{ borderColor: '#ddd', borderWidth: 1 }}
>
                <Image
                  source={{ uri: item.thumbnail }}
                  style={{ width: 50, height: 50, borderRadius: 8 }}
                />
                <View className="flex-1">
                  <Text className="font-bold text-[16px]">{item.title}</Text>
                  <Text className="text-gray-500 text-[14px] capitalize">
                    {item.description?.split(' ').slice(0, 5).join(' ')}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
            <Text className="text-center text-gray-500 mt-4">
              Showing results for "<Text className="font-semibold text-black">{searchQuery}</Text>"
            </Text>
          </View>
        )}
        <View className=" rounded-xl overflow-hidden">
                  <GroceryKitchen />
                </View>
                 <View className=" rounded-xl overflow-hidden">
                  <Snackscompo />
                </View>
                <View className=" rounded-xl overflow-hidden">
                  <Storecompo2 />
                </View>

        </ScrollView>
        </SafeAreaView>
  )
}