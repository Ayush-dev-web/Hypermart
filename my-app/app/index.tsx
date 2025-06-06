import { Text, TouchableOpacity, View } from "react-native";
import "../global.css"
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
export default function Index() {
  return (
    <SafeAreaView className="bg-gray-300 flex-1">
      <TouchableOpacity className=' justify-center items-center py-[100%] '
       onPress={() => router.push(`/(tab)`)}>
        
        <Text className="text-3xl bg-blue-500 ">
          Enter
        </Text>
      </TouchableOpacity>
      
    </SafeAreaView>
  );
}
