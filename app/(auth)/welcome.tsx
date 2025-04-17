import React from "react";
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import ScreenWrapper from "@/components/ScreenWrapper";
import Button from "@/components/Button";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const Welcome = () => {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("@/assets/images/welcome.png")}
      style={styles.bgImage}
      resizeMode="cover"
    >
      {/* Gradient overlay */}
      <LinearGradient
        colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.9)"]}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={{ flex: 1 }}>
        
        <View style={styles.container}>
          {/* Top Right Login Button */}
          <TouchableOpacity
            onPress={() => router.push("/(auth)/sign-in")}
            style={styles.loginButton}
          >
            <Typo fontWeight="600" size={16} color={colors.neutral100}>
              Sign In
            </Typo>
          </TouchableOpacity>

          {/* Footer Content */}
          <View style={styles.footer}>
            <Animated.View
              entering={FadeInDown.duration(400).springify().damping(12)}
              style={styles.heading}
            >
              <Typo size={34} fontWeight="900" color={colors.neutral100}>
                Discover Your Plant’s
              </Typo>
              <Typo size={34} fontWeight="900" color={colors.primary}>
                Disease Early
              </Typo>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.duration(1600).delay(300).springify()}
              style={styles.buttonContainer}
            >
              <Button
                onPress={() => router.push("/(auth)/sign-up")}
                style={styles.glowButton}
              >
                <Typo size={20} fontWeight="700" color={colors.neutral100}>
                  Get Started
                </Typo>
              </Button>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.duration(1200).delay(100).springify()}
              style={styles.description}
            >
              <Typo size={16} color={colors.textLighter}>
                24/7 AI Support Assistant
              </Typo>
            </Animated.View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: spacingY._10,
  },
  loginButton: {
    alignSelf: "flex-end",
    marginRight: spacingX._20,
    marginTop: spacingY._5,
    // backgroundColor: "rgba(0,0,0,0.3)",
    paddingVertical: 8,
    paddingHorizontal: 18,
    // borderRadius: 15,
  },
  footer: {
    paddingBottom: verticalScale(50),
    gap: spacingY._20,
  },
  heading: {
    alignItems: "flex-start",
    paddingHorizontal: spacingX._20,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: spacingX._25,
  },
  description: {
    alignItems: "center",
    marginTop: spacingY._10,
  },
  glowButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 25,
    elevation: 8,
  },
});
