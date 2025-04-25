import { View, StyleSheet, ImageBackground } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { colors } from "@/constants/theme";
import Button from "@/components/Button";
import Typo from "@/components/Typo";
import HomeHeader from "@/components/home/HomeHeader";
import ImageUploader from "@/components/home/ImageUploader";
import TopBar from "@/components/home/TopBar";
import Animated, { FadeInUp } from "react-native-reanimated";
import { createGradientBackground } from "@/utils/gradient";



export default function HomeScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = () => {
    // Upload logic goes here
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" backgroundColor="transparent" translucent />

      <ImageBackground
        source={require("@/assets/images/onboardingbg.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={createGradientBackground(0.4)} />

        <TopBar />

        <View>
          <HomeHeader />
          
          <ImageUploader 
            image={image}
            onImageSelected={setImage}
          />

          {image && (
            <Animated.View
              entering={FadeInUp.duration(1000).springify().delay(600)}
              style={styles.buttonContainer}
            >
              <Button
                loading={isLoading}
                onPress={handleUpload}
                style={styles.button}
              >
                <Typo style={styles.buttonText}>Continue</Typo>
              </Button>
            </Animated.View>
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.secondary900,
  },
  background: {
    flex: 1,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    width: "70%",
    alignSelf: "center",
  },
  buttonText: {
    color: colors.neutral100,
    fontSize: 16,
    fontWeight: "600",
  },
});
