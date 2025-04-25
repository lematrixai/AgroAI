import Typo from "@/components/Typo";
import { colors } from "@/constants/theme";
import { moderateScale, verticalScale } from "@/utils/styling";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View } from "react-native";

export default function ChatbotLayout() {
  return <Stack >
         <Stack.Screen 
         name="index"
        options={{ 
          headerShown: true,
          
          headerTransparent: true,
          headerStyle: {
            backgroundColor: colors.neutral_800,
          },
          headerTintColor: colors.white,
          headerTitle: () => (
            <View style={styles.headerTitle}>
              <Typo style={styles.headerText}>PyCrop AI</Typo>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
              <Ionicons name="arrow-back" size={24} color={colors.white} />
            </TouchableOpacity>
          ),
         
        }} 
      />
  </Stack>
}

const styles = StyleSheet.create({
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: moderateScale(18),
    fontWeight: "600",
    color: colors.white,
  },
  headerButton: {
    padding: moderateScale(8),
  },
});