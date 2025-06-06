import { View, Text, TextInput, TouchableOpacity, Image, ScrollView,Dimensions } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import banner from '../../assets/images/banner.png';



export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="px-4">

        {/* Header */}
        <View className="flex-row justify-between items-center mt-2 mb-4">
          <Text className="text-xl font-bold text-orange-500">Hyper<Text className="text-sky-600">Mart</Text></Text>
          <TouchableOpacity className="bg-gray-100 p-2 rounded-full">
            <Ionicons name="notifications-outline" size={20} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Location */}
        <View className="flex-row items-center space-x-2 mb-4">
          <Ionicons name="location-outline" size={20} color="gray" />
          <View>
            <Text className="text-xs text-gray-400">Bengaluru</Text>
            <Text className="text-sm font-semibold text-gray-700">BTM Layout, 500628</Text>
          </View>
        </View>

        {/* Search */}
        <View className="flex-row items-center bg-gray-100 rounded-xl p-2 mb-4">
          <Feather name="search" size={20} color="gray" />
          <TextInput
            className="flex-1 ml-2 text-sm"
            placeholder="Search Anything..."
          />
          <Ionicons name="mic-outline" size={20} color="gray" />
        </View>
{/* 
         <View className="mt-4">
     <Carousel
  loop
  width={width}
  height={180}
  autoPlay
  data={banners}
  scrollAnimationDuration={1000}
  renderItem={({ item }) => (
    <View className="rounded-xl overflow-hidden mx-2">
      <Image
        source={item}
        className="w-full h-44 rounded-xl"
        resizeMode="cover"
      />
    </View>
  )}
/>

    </View> */}
        {/* Categories */}
        <View className="mb-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-base font-semibold text-gray-700">Categories</Text>
            <Text className="text-blue-600 text-sm">View All</Text>
          </View>
          <View className="flex-row flex-wrap gap-3">
            {[
              { label: 'Groceries', color: 'bg-green-100', icon: 'leaf' },
              { label: 'Appliances', color: 'bg-blue-100', icon: 'tv' },
              { label: 'Fashion', color: 'bg-pink-100', icon: 'shirt' },
              { label: 'Furniture', color: 'bg-purple-100', icon: 'bed' }
            ].map((cat, index) => (
              <TouchableOpacity key={index} className={`w-[70px] h-[70px] rounded-xl justify-center items-center ${cat.color}`}>
                <Ionicons name={cat.icon} size={24} color="black" />
                <Text className="text-xs mt-1">{cat.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Previous Order */}
        <View className="mb-20">
          <Text className="text-base font-semibold text-gray-700 mb-2">Previous Order</Text>
          <View className="bg-white shadow p-4 rounded-xl border border-gray-100">
            <Text className="text-xs text-green-500 mb-1">Delivered</Text>
            <Text className="text-xs text-gray-500 mb-2">On Wed, 27 Jul 2022</Text>
            <View className="flex-row items-center">
              {/* <Image
                source={require('../assets/fruits.png')} // your product image
                className="w-10 h-10 rounded-full"
              /> */}
              <Text className="ml-2 text-sm">+5 More</Text>
            </View>
          </View>
        </View>
      </ScrollView>


    </SafeAreaView>
  );
}
