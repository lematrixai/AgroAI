import { StyleSheet } from "react-native";
import { colors } from "@/constants/theme";

export const createGradientBackground = (opacity: number = 0.4) => {
  return StyleSheet.create({
    gradient: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: `rgba(0, 0, 0, ${opacity})`,
    },
  }).gradient;
};

export const getGradientColors = () => {
  return {
    start: colors.secondary900,
    end: colors.secondary2,
  };
}; 