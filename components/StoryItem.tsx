import { formatRelativeTime } from "@/utils/time";
import { getDisplayUrl } from "@/utils/url";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const StoryItem = ({ story }: { story: HNHit }) => {
  return (
    <Link
      href={{ pathname: "/item/[id]", params: { id: story.objectID } }}
      asChild
    >
      <TouchableOpacity>
        <View className={`flex-row bg-primary gap-x-4 py-3`}>
          {story.points && (
            <View className="flex-col w-9 gap-y-0 justify-center items-center">
              <FontAwesome5 name="chevron-up" size={16} color="#b2b2b2" />
              <Text className="text-accent text-xs font-text-bold">
                {story.points}
              </Text>
            </View>
          )}
          <View className="flex-1 justify-center">
            <View className="flex-col">
              <Text className="text-accent font-text-bold">
                {story.title}{" "}
                {story.url && (
                  <Text className="text-xs font-text-medium">
                    ({getDisplayUrl(story.url)})
                  </Text>
                )}
              </Text>
              <View className="mt-1">
                <Text className="text-accent text-xs font-text-medium">
                  {story.num_comments >= 0 && (
                    <Text>{story.num_comments} comments · </Text>
                  )}
                  <Text>
                    {formatRelativeTime(story.created_at_i)} by {story.author}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default StoryItem;
