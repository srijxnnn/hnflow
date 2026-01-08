import { formatRelativeTime } from "@/utils/time";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import HTMLText from "./HTMLText";
import StoryItem from "./StoryItem";

const SearchItem = ({ item }: { item: HNHit }) => {
  return (
    <View>
      {item.title ? (
        <StoryItem story={item}></StoryItem>
      ) : (
        <View className="flex-row gap-x-2 my-2">
          <View className="w-3 pt-1">
            <FontAwesome5 name="chevron-up" size={12} color="#b2b2b2" />
          </View>
          <View className="flex-1">
            <Text className="text-accent text-sm font-text-medium">
              <Text>
                {item.author} · {formatRelativeTime(item.created_at_i)} ·
              </Text>{" "}
              <Link href={`/item/${item.parent_id}`}>parent ·</Link>
              {" on: "}
              <Link href={`/item/${item.story_id}`} className="underline">
                {item.story_title}
              </Link>
            </Text>
            {item.comment_text && <HTMLText html={item.comment_text} />}
          </View>
        </View>
      )}
    </View>
  );
};

export default SearchItem;
