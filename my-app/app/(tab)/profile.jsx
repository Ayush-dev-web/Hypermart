import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import React, { useState,useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebase'; // adjust path if needed
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';



export default function Profile() {
 
  const navigation = useRouter();
  const [userName, setUserName] = useState('');
const [userContact, setUserContact] = useState('');

  const handleLogout = async () => {
  try {
    await signOut(auth);
    Alert.alert('Logged Out', 'You have been logged out.');
    navigation.push('/(auth)/login');
  } catch (error) {
    Alert.alert('Error', error.message);
  }
};

  const handleContact = () => {
    const phoneNumber = 'tel:9876543210'; 
    Linking.openURL(phoneNumber).catch(err =>
      Alert.alert('Error', 'Unable to open dialer')
    );
  };

  const options = [
    {
      title: 'Previous Orders',
      icon: <MaterialIcons name="shopping-bag" size={24} color="black" />,
      screen: null,
    },
    {
      title: 'Wishlist',
      icon: <AntDesign name="hearto" size={24} color="black" />,
      screen: 'wishlist',
    },
    {
      title: 'Payment Methods',
      icon: <FontAwesome name="credit-card" size={24} color="black" />,
      screen: 'payments',
    },
    {
      title: 'Settings',
      icon: <Ionicons name="settings-outline" size={24} color="black" />,
      screen: null,
    },
    {
      title: 'About Us',
      icon: <Octicons name="info" size={24} color="black" />,
      screen:'aboutus',
    },
  ];
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserContact(user.email || 'No email');
      setUserName(user.displayName || 'Anonymous User');
    } else {
      setUserContact('Not logged in');
      setUserName('');
    }
  });

  return unsubscribe;
}, []);
  return (
    <SafeAreaView className="bg-slate-100 flex-1">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 py-4">
          <FontAwesome name="arrow-left" size={28} color="black" />
          <Text className="text-2xl font-semibold">Profile</Text>
          <FontAwesome name="search" size={22} color="black" />
        </View>

        {/* Profile Box */}
        <View className="bg-gray-500 rounded-2xl flex-row items-center justify-between p-8 mx-4 my-2">
          <FontAwesome name="user-circle" size={48} color="white" />
          <View className="flex-1 ml-3">
            <TextInput
              value={userName}
              onChangeText={setUserName}
              placeholder="Enter Name"
              placeholderTextColor="#ffffffaa"
              className="text-white text-base font-semibold border-b border-white"
            />
            <TextInput
              value={userContact}
              onChangeText={setUserContact}
              placeholder="Email or Mobile No."
              placeholderTextColor="#ffffffaa"
              className="text-white text-sm mt-1 border-b border-white"
            />
          </View>
        </View>

        {/* Options List */}
        <View className="px-4 mt-4">
          {options.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (item.screen) {
                  navigation.navigate(item.screen);
                }
              }}
              className="flex-row items-center justify-between bg-white px-4 py-4 mb-3 rounded-xl shadow-sm"
            >
              <View className="flex-row items-center">
                {item.icon}
                <Text className="text-black ml-4 text-base">{item.title}</Text>
              </View>
              <AntDesign name="right" size={20} color="gray" />
            </TouchableOpacity>
          ))}

          {/* Contact Support */}
          <TouchableOpacity
            onPress={handleContact}
            className="bg-white flex-row items-center justify-between px-4 py-4 rounded-xl shadow-sm mb-3"
          >
            <View className="flex-row items-center">
              <Feather name="phone-call" size={24} color="black" />
              <Text className="ml-4 text-base">Contact Support</Text>
            </View>
            <AntDesign name="right" size={20} color="gray" />
          </TouchableOpacity>

          {/* Logout Button */}
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-500 items-center justify-center px-4 py-4 rounded-xl shadow-sm mb-10"
          >
            <Text className="text-white text-base font-semibold">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
