import Octicons from "@expo/vector-icons/Octicons";
import React from "react";
import { TextInput, View } from "react-native";

type SearchBarProps = {
  query: string;
  onChangeText: (query: string) => void;
};

const SearchBar = ({ query, onChangeText }: SearchBarProps) => {
  return (
    <View className="flex-row items-center bg-secondary h-12 rounded-full my-3 px-5">
      <Octicons name="search" size={18} color="#b2b2b2" />
      <TextInput
        value={query}
        onChangeText={onChangeText}
        selectionColor={"#636363"}
        placeholder="Search here"
        placeholderTextColor={"#525252"}
        className="flex-1 ml-2 text-accent font-text"
      />
    </View>
  );
};

export default SearchBar;
