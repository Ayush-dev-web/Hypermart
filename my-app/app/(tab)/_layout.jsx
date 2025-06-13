import React from 'react';
import { View } from 'react-native';
import { Tabs } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function _layout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'white',
          position: 'absolute',
          height: 70,
          borderTopWidth: 0,
          
            tabBarIconStyle: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  }
        
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={30} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="categories"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <Feather name="grid" size={30} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: '',
          screenOptions:{headerShown:true,tabBarShowLabel:true},
          
          tabBarIcon: ({ color }) => (
            <View
              style={{
                position: 'absolute',
                top: -40,
                backgroundColor: '#f97316', // orange-400
                padding: 35,
                borderRadius: 40,
                borderWidth: 4,
                borderColor: '#fff',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <Feather name="shopping-cart" size={30} style={{position:"absolute", top:20,left:16}} color={"white"} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="wishlist"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart-outline" size={30} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={30} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
