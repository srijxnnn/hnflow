import { getItemById } from "@/api/hn";
import CommentItem from "@/components/CommentItem";
import StoryDetailed from "@/components/StoryDetailed";
import { useFetch } from "@/hooks/useFetch";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ItemScreen = () => {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, loading, error, refetch } = useFetch(() => getItemById(id));
  return (
    <View className="bg-primary flex-1 px-8">
      <View className="flex-1 border">
        {loading ? (
          <View className="flex-1 gap-y-4 items-center justify-center">
            <ActivityIndicator color={"#b2b2b2"} />
            <Text className="text-accent font-text-semibold">
              Fetching comments...
            </Text>
          </View>
        ) : error ? (
          <View className="flex-1 gap-y-4 items-center justify-center ">
            <AntDesign
              name="reload"
              size={20}
              color="#b2b2b2"
              onPress={refetch}
            />
            <Text className="text-accent font-text-semibold">
              Error: {error.message}
            </Text>
          </View>
        ) : data?.type == "story" ||
          data?.type == "job" ||
          data?.type == "poll" ? (
          <>
            <StoryDetailed item={data} />
          </>
        ) : (
          data?.type == "comment" && (
            <ScrollView showsVerticalScrollIndicator={false}>
              <CommentItem comment={data} />
              <View style={{ paddingBottom: insets.bottom }}></View>
            </ScrollView>
          )
        )}
      </View>
    </View>
  );
};

export default ItemScreen;
