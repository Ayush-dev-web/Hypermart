import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Tabs } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useAuth } from '../../app-example/hooks/AuthProvider';
function CustomCartIcon() {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      const cartData = await AsyncStorage.getItem('@cart');
      const cart = cartData ? JSON.parse(cartData) : {};
      const total = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
      setItemCount(total);
    };
    const interval = setInterval(fetchCartCount, 1000); // Refresh every second
    return () => clearInterval(interval);
  }, []);

  return (
    <View
      style={{
        position: 'absolute',
        top: -40,
        backgroundColor: '#f97316',
        padding: 35,
        borderRadius: 40,
        borderWidth: 4,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Feather name="shopping-cart" size={30} style={{ position: 'absolute', top: 20, left: 16 }} color={"white"} />
      {itemCount > 0 && (
        <View
          style={{
            position: 'absolute',
            top: 10,
            right: 8,
            backgroundColor: 'red',
            borderRadius: 12,
            paddingHorizontal: 6,
            paddingVertical: 2,
            zIndex: 10,
          }}
        >
          <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>{itemCount}</Text>
        </View>
      )}
    </View>
  );
}

export default function _layout() {
   const router = useRouter();
  const { user, loading } = useAuth();
   React.useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth/login');
    }
  }, [user, loading]);

  if (loading) {
    return null; // or show a splash/loading spinner
  }
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
        },
        tabBarIconStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
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
          tabBarIcon: () => <CustomCartIcon />,
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
