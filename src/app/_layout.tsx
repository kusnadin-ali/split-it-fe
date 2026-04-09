import {
  Fraunces_600SemiBold,
  Fraunces_600SemiBold_Italic,
  useFonts,
} from '@expo-google-fonts/fraunces';
import {
  InstrumentSans_400Regular,
  InstrumentSans_500Medium,
  InstrumentSans_600SemiBold,
  InstrumentSans_700Bold,
} from '@expo-google-fonts/instrument-sans';
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import '../../global.css';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Fraunces_600SemiBold,
    Fraunces_600SemiBold_Italic,
    InstrumentSans_400Regular,
    InstrumentSans_500Medium,
    InstrumentSans_600SemiBold,
    InstrumentSans_700Bold,
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  // Render nothing while fonts are loading
  if (!loaded) return null;

  return <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="(auth)" />
  </Stack>;
}
