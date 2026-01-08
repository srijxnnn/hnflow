import { router } from "expo-router";
import { Linking } from "react-native";

export const handleLink = (href: string) => {
  if (href.startsWith("https://news.ycombinator.com/item")) {
    const id = href.match(/id?=(\d+)/)?.[1];
    if (id) {
      router.push(`/item/${id}`);
      return;
    }
  }
  Linking.openURL(href);
};
