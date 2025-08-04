import { Redirect, Stack, useRouter } from "expo-router";
import "../global.css";
import { CartProvider } from '../context/CartContext';
import { AuthProvider, useAuth } from '../app-example/hooks/AuthProvider';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {auth} from '../firebase'

// ✅ This component checks auth and conditionally redirects
function AuthGuard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("(auth)/login");
    }
  }, [loading, user]);


  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return null; // Let the layout continue rendering
}

export default function RootLayout() {
    const [user,setuser]= useState();

  useEffect
  (() => {
   onAuthStateChanged(auth, (user1) => {
    
    if (user1) {
      setuser("authcheck")
    } else {
      setuser("authnotcheck")
    }
  });

 
}, []);

console.log(user,"asdnasda")
  return (<>
    <AuthProvider>
      <CartProvider>
        <AuthGuard /> {/* 🔐 Runs auth redirect logic early */}
        <Stack screenOptions={{ headerShown: false }} />
      </CartProvider>
    </AuthProvider>
   
   {user=="authcheck" &&<Redirect href="(tab)" /> }
   {user=="authnotcheck" &&
    <Redirect href="(auth)/login" /> }
   </>
  );
}
