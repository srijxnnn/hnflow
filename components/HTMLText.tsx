import { handleLink } from "@/utils/link";
import React from "react";
import { useWindowDimensions } from "react-native";
import RenderHTML from "react-native-render-html";

const HTMLText = ({ html }: { html: string }) => {
  const { width } = useWindowDimensions();

  return (
    <RenderHTML
      contentWidth={width}
      source={{ html }}
      systemFonts={[
        "AlbertSans-Regular",
        "AlbertSans-Bold",
        "AlbertSans-Italic",
      ]}
      baseStyle={{
        color: "#b2b2b2",
        fontSize: 12,
        fontFamily: "AlbertSans-Regular",
      }}
      tagsStyles={{
        strong: {
          fontFamily: "AlbertSans-Bold",
        },
        b: {
          fontFamily: "AlbertSans-Bold",
        },
        em: {
          fontFamily: "AlbertSans-Italic",
        },
        i: {
          fontFamily: "AlbertSans-Italic",
        },
        a: {
          textDecorationLine: "underline",
        },
      }}
      renderersProps={{
        a: {
          onPress(event, href, htmlAttribs, target) {
            handleLink(href);
          },
        },
      }}
    />
  );
};

export default HTMLText;
