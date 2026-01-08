import { Stack } from "expo-router";

export default function ItemLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: "#000000",
        },
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#000000",
          },
        }}
      />
    </Stack>
  );
}
