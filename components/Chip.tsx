import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, TouchableOpacity } from "react-native";

type ChipProps = {
  label: string;
  active: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
};

const Chip = ({ label, active, icon, onPress }: ChipProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center justify-center gap-x-2 px-4 mr-2 rounded-full h-8 border-[0.5px] ${
        active ? "bg-accent border-accent" : "border-neutral-600"
      }`}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={16}
          color={active ? "#000000" : "#b2b2b2"}
        ></Ionicons>
      )}
      <Text
        className={`text-sm font-text-medium ${active ? "text-black" : "text-accent"}`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Chip;
