/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "text-light": ["AlbertSans-Light"],
        "text-light-italic": ["AlbertSans-LightItalic"],

        text: ["AlbertSans-Regular"],
        "text-italic": ["AlbertSans-Italic"],

        "text-medium": ["AlbertSans-Medium"],
        "AlbertSans-medium-italic": ["AlbertSans-MediumItalic"],

        "text-semibold": ["AlbertSans-SemiBold"],
        "AlbertSans-semibold-italic": ["AlbertSans-SemiBoldItalic"],

        "text-bold": ["AlbertSans-Bold"],
        "text-bold-italic": ["AlbertSans-BoldItalic"],

        heading: ["AlbertSans-ExtraBold"],
      },
      colors: {
        primary: "#000000",
        secondary: "#222222",
        tertiary: "#636363",
        accent: "#B2B2B2",
      },
    },
  },
  plugins: [],
};
