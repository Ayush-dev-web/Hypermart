


import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase'; 
import FontAwesome from '@expo/vector-icons/FontAwesome';
import google from '../../assets/images/google.png';
import React, { useState } from 'react';
import { useAuth } from '../../app-example/hooks/AuthProvider';
import { useRouter } from 'expo-router';
export default function Register() {
const [name, setName] = useState('');
const { login } = useAuth();
const [phone, setPhone] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const router = useRouter();


const handleSignUp = async () => {
  if (!name || !email || !password) {
    return Alert.alert('Error', 'Please fill all the required fields');
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(userCredential.user, {
      displayName: name,
    });

    await login({ email: userCredential.user.email }); 
    Alert.alert('Success', 'Account created successfully!');
    router.replace('/');
  } catch (error) {
    console.log(error);
    Alert.alert('Registration Failed', error.message);
  }
};

  return (
    <View className="flex-1 bg-white justify-center px-6 pt-14">
 
     

      {/* Heading */}
      <Text className="text-3xl text-yellow-500 text-center font-semibold mt-4">Let&apos;s,</Text>
      <Text className="text-3xl text-yellow-500 text-center font-bold mb-2">Get Started</Text>
      <Text className="text-gray-500 text-center mb-6">Please fill in the details to create an account.</Text>

      {/* Inputs */}
      <View className="space-y-4 ">
        <View className="flex-row items-center border px-4 py-3 rounded-xl">
          <Ionicons name="person-outline" size={20} color="gray" />
          <TextInput
  placeholder="Enter your name"
  className="ml-3 flex-1"
  value={name}
  onChangeText={setName}
/>
        </View>
        <View className="flex-row items-center border px-4 py-3 rounded-xl">
          <FontAwesome name="phone" size={20} color="gray" />
         <TextInput
  placeholder="Enter your phone number"
  className="ml-3 flex-1"
  keyboardType="phone-pad"
  value={phone}
  onChangeText={setPhone}
/>
        </View>
        <View className="flex-row items-center border px-4 py-3 rounded-xl">
          <Ionicons name="mail-outline" size={20} color="gray" />
          <TextInput
  placeholder="Enter your email"
  className="ml-3 flex-1"
  keyboardType="email-address"
  value={email}
  onChangeText={setEmail}
/>
        </View>
        <View className="flex-row items-center border px-4 py-3 rounded-xl">
          <Ionicons name="lock-closed-outline" size={20} color="gray" />
          <TextInput
  placeholder="Enter your password"
  secureTextEntry
  className="ml-3 flex-1"
  value={password}
  onChangeText={setPassword}
/>
        </View>
      </View>

      {/* Sign Up Button */}
     <TouchableOpacity
  className="bg-yellow-500 rounded-xl py-4 mt-6"
  onPress={handleSignUp}
>
  <Text className="text-center font-bold text-white">Sign Up</Text>
</TouchableOpacity>

 

      {/* Login Link */}
      <Text className="text-center mt-6 text-gray-600">
        Already have an account?
        <Text className="text-yellow-500 font-semibold" onPress={() => router.push('/(auth)/login')}> Login</Text>
      </Text>
    </View>
  );
}
