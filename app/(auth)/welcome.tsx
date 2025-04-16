import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import ScreenWrapper from "@/components/ScreenWrapper";
import Button from "@/components/Button";

const Welcome = () => {
  return (
    <ImageBackground
      source={require("@/assets/images/welcome.png")}
      style={styles.bgImage}
      resizeMode="cover"
    >
      <ScreenWrapper>
      <View style={styles.container}>
        {/* Top Right Login Button */}
        <TouchableOpacity style={styles.loginButton}>
          <Typo fontWeight="500">Sign In</Typo>
        </TouchableOpacity>

        {/* Footer Content */}
        <View style={styles.footer}>
          <View style={{ alignItems: "center" }}>
            <Typo size={30} fontWeight="800" color={colors.textLight}>
              Discover Your Plant’s
            </Typo>
            <Typo size={30} fontWeight="800" color={colors.textLight}>
              Disease Early
            </Typo>
          </View>
          <View style={{ alignItems: "center", gap: 2 }}>
            <Typo size={17} color={colors.textLight}>
              Get Support from an AI Assistance Bot
            </Typo>
            <Typo size={17} color={colors.textLight}>
              24/7 AI Support Assistant
            </Typo>
          </View>
        <View style={styles.buttonContainer}> 
          <Button>
            <Typo size={22} fontWeight="600" color={colors.neutral1400}>
              Get Started
            </Typo>
          </Button>
        </View>
        </View>
      </View>
      </ScreenWrapper>
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
    paddingTop: spacingY._7,
  },
  loginButton: {
    alignSelf: "flex-end",
    marginTop: spacingY._10,
    marginRight: spacingY._20,
  },
  footer: {
    backgroundColor: colors.neutral900,
    alignItems: "center",
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(45),
    gap: spacingY._20,
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: -10,
    },
    elevation: 10,
    shadowRadius: 25,
    shadowOpacity: 0.15,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: spacingX._25,
   
  },
});
