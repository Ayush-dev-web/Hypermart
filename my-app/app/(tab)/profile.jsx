import { View, Text, Image, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import liner from '../../assets/images/liner1.png';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';

export default function Profile() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [userName, setUserName] = useState('Divyanka Tripathi');
  const [location] = useState('Mumbai, India');

  const handleAvatarPress = () => {
    Alert.alert('Change Profile Picture', 'This would open the image picker.');
  };

  const handleEditName = () => {
    Alert.alert('Edit Name', 'This would open a name editing modal.');
  };

  const handleLogout = () => {
    Alert.alert('Logged Out', 'You have been logged out.');
  };

  const handleContact = () => {
    Alert.alert('Contact Support', 'This would open support options.');
  };

  const options = [
    { title: 'Orders', icon: <MaterialIcons name="shopping-bag" size={24} color="black" /> },
    { title: 'Wishlist', icon: <AntDesign name="hearto" size={24} color="black" /> },
    { title: 'Payment Methods', icon: <FontAwesome name="credit-card" size={24} color="black" /> },
    { title: 'Settings', icon: <Ionicons name="settings-outline" size={24} color="black" /> },
    { title: 'Help & Support', icon: <Feather name="help-circle" size={24} color="black" /> },
  ];

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

    {/* Top Image + Avatar */}
    <View className="items-center relative">
      <Image
        source={liner}
        style={{
          height: 350,
          width: '100%',
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      />
      <TouchableOpacity
        className="absolute -bottom-12 bg-white rounded-full p-1 shadow-md"
        onPress={handleAvatarPress}
      >
        <FontAwesome name="user-circle-o" size={90} color="black" />
      </TouchableOpacity>
    </View>

    {/* Name and Location */}
    <View className="items-center mt-16">
      <View className="flex-row items-center">
        <Text className="text-lg font-semibold">{userName}</Text>
        <TouchableOpacity onPress={handleEditName}>
          <Entypo name="edit" size={18} color="gray" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
      <Text className="text-gray-500">📍 {location}</Text>
    </View>

    {/* Options List */}
    <View className="px-4 mt-4">
      {options.map((item, index) => (
        <View
          key={index}
          className="flex-row items-center justify-between bg-white px-4 py-4 mb-3 rounded-xl shadow-sm"
        >
          <View className="flex-row items-center">
            {item.icon}
            <Text className="text-black ml-4 text-base">{item.title}</Text>
          </View>
          <AntDesign name="right" size={20} color="gray" />
        </View>
      ))}

      {/* Support Section */}
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

      {/* Logout */}
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
