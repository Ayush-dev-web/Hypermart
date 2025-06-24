import { View, Text,ScrollView,TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import GroceryKitchen from '../../app-example/components/Allprocompo';
import Snackscompo from '../../app-example/components/Snackscompo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Storecompo2 from '../../app-example/components/Storecompo2';

export default function index() {
  return (
   <>
   <SafeAreaView className="bg-slate-100 flex-1 px-4">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        
        <View className="flex-row items-center justify-between px-2 py-4">
          <FontAwesome name="arrow-left" size={28} color="black" />
          <Text className="text-2xl font-semibold">Categories</Text>
          <FontAwesome name="search" size={22} color="black" />
        </View>

        <View className="flex-row items-center bg-slate-300 rounded-2xl px-2 py-3">
          <SimpleLineIcons name="magnifier" size={24} color="grey" />
          <TextInput
            placeholder="Search Anything..."
            placeholderTextColor="gray"
            className="flex-1 text-white ml-4"
          />
          <FontAwesome6 name="microphone" size={24} color="#4AB7B6" />
        </View>
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
        </SafeAreaView></>
  )
}