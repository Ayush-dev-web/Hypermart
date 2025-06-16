import { Stack } from "expo-router";
import "../global.css";
import { CartProvider } from '../context/CartContext';

export default function RootLayout() {
  return (
    <CartProvider> {/* ✅ Wrap everything inside */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tab)" />
      </Stack>
    </CartProvider>
  );
}
