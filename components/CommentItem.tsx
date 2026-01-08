import HTMLText from "@/components/HTMLText";
import { countComments } from "@/utils/comment";
import { formatRelativeTime } from "@/utils/time";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";

const CommentItem = ({
  comment,
  depth = 0,
}: {
  comment: HNItem;
  depth?: number;
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const maxDepth = 3;
  return (
    <View>
      <View
        className="flex-row gap-x-2 my-2"
        style={{ marginLeft: depth * 12 }}
      >
        <View className="w-3 pt-1">
          <FontAwesome5 name="chevron-up" size={12} color="#b2b2b2" />
        </View>
        <View className="flex-1">
          <Text className="text-accent text-sm font-text-medium">
            <Text>
              {comment.author} · {formatRelativeTime(comment.created_at_i)} ·
            </Text>
            <Link href={`/item/${comment.parent_id}`}> parent · </Link>
            <Text onPress={() => setCollapsed((prev) => !prev)}>
              {collapsed
                ? `[${countComments(comment.children) + 1} more]`
                : `[-]`}
            </Text>
          </Text>
          {comment.text && !collapsed && <HTMLText html={comment.text} />}
          {depth > maxDepth && comment.children.length > 0 && (
            <Link
              href={`/item/${comment.id}`}
              className="justify-center text-accent text-xs font-text-semibold mt-1"
            >
              <View className="flex-row items-center gap-x-1">
                <Text className="text-accent font-text-bold text-xs">
                  Continue this thread
                </Text>
                <Ionicons name="arrow-forward" size={8} color="#b2b2b2" />
              </View>
            </Link>
          )}
        </View>
      </View>

      {depth <= maxDepth && comment.children && !collapsed && (
        <FlatList
          data={comment.children}
          renderItem={({ item }) => (
            <CommentItem comment={item} depth={depth + 1}></CommentItem>
          )}
          keyExtractor={(item) => String(item.id)}
          scrollEnabled={false}
        />
      )}
    </View>
  );
};

export default CommentItem;
