import Header from "@/components/Header";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "AlbertSans-Light": require("@/assets/fonts/AlbertSans-Light.ttf"),
    "AlbertSans-LightItalic": require("@/assets/fonts/AlbertSans-LightItalic.ttf"),

    "AlbertSans-Regular": require("@/assets/fonts/AlbertSans-Regular.ttf"),
    "AlbertSans-Italic": require("@/assets/fonts/AlbertSans-Italic.ttf"),

    "AlbertSans-Medium": require("@/assets/fonts/AlbertSans-Medium.ttf"),
    "AlbertSans-MediumItalic": require("@/assets/fonts/AlbertSans-MediumItalic.ttf"),

    "AlbertSans-SemiBold": require("@/assets/fonts/AlbertSans-SemiBold.ttf"),
    "AlbertSans-SemiBoldItalic": require("@/assets/fonts/AlbertSans-SemiBoldItalic.ttf"),

    "AlbertSans-Bold": require("@/assets/fonts/AlbertSans-Bold.ttf"),
    "AlbertSans-BoldItalic": require("@/assets/fonts/AlbertSans-BoldItalic.ttf"),

    "AlbertSans-ExtraBold": require("@/assets/fonts/AlbertSans-ExtraBold.ttf"),
    "AlbertSans-ExtraBoldItalic": require("@/assets/fonts/AlbertSans-ExtraBoldItalic.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <StatusBar hidden /> */}
      <Header />
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: "#000000",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "#000000",
            },
          }}
        />
        <Stack.Screen
          name="item"
          options={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "#000000",
            },
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
