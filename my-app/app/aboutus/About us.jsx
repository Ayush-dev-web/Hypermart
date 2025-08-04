import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function page() {
  return (
    <>
    <SafeAreaView className=' px-4 '>
      <Text className='text-3xl py-1'>
About Us
      </Text>
      <Text className='text-gray-600 py-2'>
        Welcome to HyperMart, your go-to destination for quick and hassle-free grocery and essentials delivery. At HyperMart, we believe that time is precious — and shopping for everyday items shouldn’t take up your day.

We are on a mission to bring the entire supermarket to your fingertips and deliver what you need, right when you need it. Whether it’s fresh fruits and vegetables, snacks, personal care items, or household essentials, HyperMart ensures that everything you want is just a few taps away — and reaches your doorstep in minutes.
      </Text>
      <Text className='text-3xl py-1'>
        What Drives Us
      </Text>
      <Text className='text-gray-600 py-2'>
        At HyperMart, we’re driven by speed, convenience, and customer delight. With a tech-first approach and a passion for innovation, we’ve created a shopping experience that’s smart, simple, and super fast.

Our operations run with precision and care, using a network of micro-warehouses, trained delivery partners, and real-time inventory systems to fulfill orders swiftly and accurately.
      </Text>
      <Text className='text-3xl py-1'>
Why Choose HyperMart?
      </Text>
       <Text className='text-gray-600 pt-2'>
        ⏱ Fast Delivery: Get your order delivered in minutes, not hours.
        </Text>
<Text className='text-gray-600 '>
🛒 Wide Selection: Thousands of products across multiple categories.
</Text>
<Text className='text-gray-600'>
📱 Seamless Experience: Easy-to-use app with real-time tracking.
</Text>
<Text className='text-gray-600'>
🛡 Reliable Service: Safe packaging and on-time deliveries you can count on.
       </Text>
       <Text className='text-3xl py-1'>
Our Vision
       </Text>
       <Text className='text-gray-600'>
We envision a world where shopping for essentials is as simple as sending a message. HyperMart is here to make that vision a reality — one delivery at a time.
       </Text>

        
    </SafeAreaView>
    </>
  )
}