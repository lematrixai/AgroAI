import { scale, verticalScale } from "@/utils/styling";

export const colors = {
  // 🌿 Primary Color Palette
  primary: "#6BA26C",       // A lighter, friendly tone of #447055
  primaryLight: "#A9D0A3",  // Gentle mint-like green
  primaryDark: "#2F4E3D",   // Deep forest green

  // ✅ Text
  text: "#ffffff",
  textLight: "#e5e5e5",
  textLighter: "#d4d4d4",

  // ✅ Base Colors
  white: "#ffffff",
  black: "#000000",

  amber: "#f59e0b", // Amber
  orange: "#f97316", // Orange
  Yellow: '#F7D300', // Yellow
  // ✅ Accent Colors
  rose: "#ef4444",
  green: "#16a34a", 
  greenDark :"#447055",

  // ✅  #447055
  neutral50: "#f5f9f6",
  neutral100: "#e6eee9",
  neutral200: "#cddfd3",
  neutral300: "#afc4b5",
  neutral350: "#9CB4A3",
  neutral400: "#7E9A84",
  neutral500: "#66826C",
  neutral600: "#556B5B",
  neutral700: "#4A5F50",
  neutral800: "#3C4C40",
  neutral900: "#75E00A",
  neutral1000: "#2F4E3D",
  neutral1100: "#2B4738",
  neutral1200: "#263D31",
  neutral1300: "#1F3225",
  neutral1400: "#1A2A20", 

    // primaryLight: "#0ea5e9",
    // primaryDark: "#0369a1",
    // text: "#fff",
    // textLight: "#e5e5e5",
    // textLighter: "#d4d4d4",
    // white: "#fff",
    // black: "#000",
    // rose: "#ef4444",
    // green: "#16a34a",
    // neutral50: "#fafafa",
    // neutral100: "#f5f5f5",
    // neutral200: "#e5e5e5",
    // neutral300: "#d4d4d4",
    // neutral350: "#CCCCCC",
    // neutral400: "#a3a3a3",
    // neutral500: "#737373",
    // neutral600: "#525252",
    // neutral700: "#404040",
    neutral_800: "#262626",
    
    secondary: "#a3e635",
    secondary900: "#171717",
   secondary2: "#27272a",
  
};


export const spacingX = {
  _3: scale(3),
  _5: scale(5),
  _7: scale(7),
  _10: scale(10),
  _12: scale(12),
  _15: scale(15),
  _20: scale(20),
  _25: scale(25),
  _30: scale(30),
  _35: scale(35),
  _40: scale(40),
};

export const spacingY = {
  _5: verticalScale(5),
  _7: verticalScale(7),
  _10: verticalScale(10),
  _12: verticalScale(12),
  _15: verticalScale(15),
  _17: verticalScale(17),
  _20: verticalScale(20),
  _25: verticalScale(25),
  _30: verticalScale(30),
  _35: verticalScale(35),
  _40: verticalScale(40),
  _50: verticalScale(50),
  _60: verticalScale(60),
};

export const radius = {
  _3: verticalScale(3),
  _6: verticalScale(6),
  _10: verticalScale(10),
  _12: verticalScale(12),
  _15: verticalScale(15),
  _17: verticalScale(17),
  _20: verticalScale(20),
  _30: verticalScale(30),
};
