import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import cerror from '../../assets/images/carterror.png'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
export default function Wishlist() {
  const { width, height } = Dimensions.get('window')
  
  return (
    <SafeAreaView className="flex-1  items-center bg-slate-100">
<View className='h-auto w-full  py-4 px-5 flex-row justify-between'>
  
<FontAwesome name="arrow-left" size={30} color=" black" />
<Text className='text-2xl font-semibold left-2'>
  Cart
</Text>

<View className='flex-row gap-2'>
  <FontAwesome6 name="magnifying-glass" size={24} color="black" />


</View>

</View>

      <View className="">
        <Image 
          source={cerror} 
        className=' top-[20%] left-9' style={{height:450,width:450}}
        />
       
      </View>
      <View className='items-center gap-4'>
        <Text className='text-4xl font-bold'>
Your Cart is empty
        </Text>
        <Text className='text-lg font-light text-center '>
         You have no items in your shopping cart.
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