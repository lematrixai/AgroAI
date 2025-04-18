import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
} from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image } from "expo-image";
import { colors } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import Button from "@/components/Button";
import Typo from "@/components/Typo";

export default function HomeScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // ✅ FIXED deprecation
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

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
        <View style={styles.overlay} />

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Hi, {user?.name}</Text>
          <Text style={styles.subtitle}>
            Upload maize leaf image to start analysis
          </Text>

          <TouchableOpacity onPress={handlePickImage} activeOpacity={0.8}>
            <Image
              source={image || require("@/assets/images/uploads.png")}
              style={[
                styles.uploadImage,
                image && styles.uploadImageSelected,
              ]}
              contentFit="cover"
            />
          </TouchableOpacity>

          {image && (
            <Button
              loading={isLoading}
              onPress={handleUpload}
              style={{ width: "100%"}}
            >
              <Typo style={styles.buttonText}>Continue</Typo>
            </Button>
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
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 60,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.neutral100,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: colors.neutral300,
    marginBottom: 20,
    textAlign: "center",
    maxWidth: 300,
  },
  uploadImage: {
    width: 250,
    height: 250,
    borderRadius: 16,
    marginBottom: 24,
  },
  uploadImageSelected: {
    borderWidth: 2,
    borderColor: colors.green,
  },
  button: {
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
