import CommentItem from "@/components/CommentItem";
import HTMLText from "@/components/HTMLText";
import { countComments } from "@/utils/comment";
import { handleLink } from "@/utils/link";
import { formatRelativeTime } from "@/utils/time";
import { getDisplayUrl } from "@/utils/url";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React, { useMemo } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const StoryDetailed = ({ item }: { item: HNItem }) => {
  const insets = useSafeAreaInsets();
  const totalComments = useMemo(
    () => countComments(item.children),
    [item.children]
  );

  return (
    <ScrollView>
      <View className={`flex-row bg-primary gap-x-4 py-3`}>
        {item.points && (
          <View className="flex-col w-9 gap-y-0 items-center">
            <FontAwesome5 name="chevron-up" size={16} color="#b2b2b2" />
            <Text className="text-accent text-xs font-text-bold">
              {item.points}
            </Text>
          </View>
        )}
        <View className="flex-1 justify-center">
          <View className="flex-col">
            <Text
              className="text-accent font-text-bold"
              onPress={() => item.url && handleLink(item.url)}
            >
              {item.title}{" "}
              {item.url && (
                <Text className="text-xs font-text-medium">
                  ({getDisplayUrl(item.url)})
                </Text>
              )}{" "}
              {item.url && (
                <Feather name="external-link" size={10} color="#b2b2b2" />
              )}
            </Text>
            <View className="flex-row items-center gap-x-1 mt-1">
              <Text className="text-accent text-xs font-text-medium">
                {totalComments} comments
              </Text>
              <Text className="text-accent text-xs font-text-medium">·</Text>
              <Text className="text-accent text-xs font-text-medium">
                {formatRelativeTime(item.created_at_i)} by {item.author}
              </Text>
            </View>
            {item.text && (
              <View className="mt-2">
                <HTMLText html={item.text} />
              </View>
            )}
          </View>
        </View>
      </View>
      <View className="w-full h-[0.5] bg-[#525252]"></View>

      <FlatList
        data={item.children}
        renderItem={({ item }) => <CommentItem comment={item} />}
        scrollEnabled={false}
        ListFooterComponent={<View className="h-8"></View>}
      />
      <View style={{ paddingBottom: insets.bottom }}></View>
    </ScrollView>
  );
};

export default StoryDetailed;
