import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from 'expo-router';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; 

import { useAuth } from '../../app-example/hooks/AuthProvider';
export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
const router = useRouter();
 const handleLogin = async () => {
  if (!email || !password) {
    return Alert.alert('Error', 'Please fill in all fields.');
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await login({ email: user.email });
    
    Alert.alert('Success', `Welcome back, ${user.email}`);
    router.replace('/'); 
  } catch (error) {
    let message = 'Login failed.';
    if (error.code === 'auth/user-not-found') message = 'User not found.';
    else if (error.code === 'auth/wrong-password') message = 'Incorrect password.';
    Alert.alert('Error', message);
  }
};


  return (
    <View className="flex-1 bg-white px-6 pt-14">
      {/* Back */}
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Title */}
      <Text className="text-2xl font-semibold mt-4">Hey,</Text>
      <Text className="text-2xl font-bold mb-2">Welcome Back</Text>
      <Text className="text-gray-500 mb-6">Please log in to continue</Text>

      {/* Email */}
      <View className="flex-row items-center border px-4 py-3 rounded-xl">
        <Ionicons name="mail-outline" size={20} color="gray" />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          className="ml-3 flex-1"
        />
      </View>

      {/* Password */}
      <View className="flex-row items-center border px-4 py-3 mt-4 rounded-xl">
        <Ionicons name="lock-closed-outline" size={20} color="gray" />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
          className="ml-3 flex-1"
        />
      </View>

      {/* Forgot Password */}
      <View className="flex-row justify-end mt-2">
        <TouchableOpacity>
          <Text className="text-yellow-500 font-semibold text-sm">Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        onPress={handleLogin}
        className="bg-yellow-400 rounded-xl py-4 mt-4"
      >
        <Text className="text-center font-bold text-white">Login</Text>
      </TouchableOpacity>

      <Text className="text-center mt-6 text-gray-600">
        Don’t have an account?
        <Text
          className="text-yellow-500 font-semibold"
          onPress={() => router.push('/(auth)/register')}
        >
          {' '}Sign Up
        </Text>
      </Text>
    </View>
  );
}
