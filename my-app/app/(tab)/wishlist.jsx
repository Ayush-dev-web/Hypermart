import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import error from '../../assets/images/whislisterror.png'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
export default function Wishlist() {
  const { width, height } = Dimensions.get('window')
  
  return (
    <SafeAreaView className="flex-1  items-center bg-slate-100">
<View className='h-auto w-full  py-4 px-2 flex-row justify-between'>
  
<FontAwesome name="arrow-left" size={30} color=" white" />
<Text className='text-2xl font-semibold left-2'>
  Wishlist
</Text>

<View className='flex-row gap-2'>
  <FontAwesome6 name="magnifying-glass" size={24} color="black" />
  <Feather name="shopping-bag" size={24} color="black" />

</View>

</View>

      <View className="">
        <Image 
          source={error} 
        className=' top-[20%] left-9' style={{height:450,width:450}}
        />
       
      </View>
      <View className='items-center gap-4'>
        <Text className='text-4xl font-bold'>
Your wishlist is empty
        </Text>
        <Text className='text-lg font-light text-center '>
          Save items in your wishlist. Review  and easily move {'\n'} them to your bag.
        </Text>
      </View>
      <View className='py-10'>
      <TouchableOpacity className='h-auto w-auto bg-[#ffe998] rounded-xl py-5 px-4'>
<Text>
  Shop Now
</Text>

      </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}