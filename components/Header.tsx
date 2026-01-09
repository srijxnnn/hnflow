import { icons } from "@/assets/icons";
import Entypo from "@expo/vector-icons/Entypo";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Header = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View className="bg-primary" style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center justify-center py-3 gap-x-3 bg-primary">
        <Link href={"/"} className="absolute left-8">
          <Entypo name="home" size={22} color="#b2b2b2" />
        </Link>
        <Image source={icons.logo} className="h-8 w-8"></Image>
        <Text className="text-accent text-3xl font-heading">HNFlow</Text>
      </View>
    </View>
  );
};

export default Header;
