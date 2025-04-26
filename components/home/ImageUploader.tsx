import {
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { colors } from "@/constants/theme";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import Typo from "@/components/Typo";
import * as Location from "expo-location";
import { useState } from "react";

const { width } = Dimensions.get("window");

interface ImageUploaderProps {
  image: string | null;
  onImageSelected: (uri: string) => void;
}

export default function ImageUploader({
  image,
  onImageSelected,
}: ImageUploaderProps) {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [open, setOpen] = useState(false);

  const requestLocationAndHandPickImage = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to open the camera."
        );
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      console.log("User location:", currentLocation);

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"],
          allowsEditing: true,
          quality: 1,
        });

        if (!result.canceled && result.assets?.length > 0) {
          onImageSelected(result.assets[0].uri);
        }
     

     
    } catch (error) {
      console.error("Location error", error);
      Alert.alert("Error", "Failed to get location or open camera.");
    }
  };

  return (
    <Animated.View
      entering={FadeInUp.duration(1000).springify().delay(400)}
      style={styles.container}
    >
      <TouchableOpacity
        onPress={requestLocationAndHandPickImage}
        activeOpacity={0.8}
        style={styles.uploadContainer}
      >
        {!image ? (
          <View style={styles.uploadContent}>
            <Ionicons
              name="cloud-upload-outline"
              size={width * 0.12}
              color={colors.neutral300}
            />
            <Typo style={styles.uploadText}>Tap to upload image</Typo>
            <Typo style={styles.uploadHint}>Supported formats: JPG, PNG</Typo>
          </View>
        ) : (
          <Image source={image} style={styles.uploadImage} contentFit="cover" />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    marginBottom: width * 0.05,
  },
  uploadContainer: {
    width: "90%",
    height: width * 0.625,
    borderRadius: width * 0.04,
    backgroundColor: colors.secondary900,
    borderWidth: width * 0.005,
    borderColor: colors.neutral700,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  uploadContent: {
    alignItems: "center",
    padding: width * 0.05,
  },
  uploadImage: {
    width: "100%",
    height: "100%",
    borderRadius: width * 0.04,
  },

  uploadText: {
    color: colors.neutral300,
    marginTop: width * 0.04,
    marginBottom: width * 0.02,
    fontSize: width * 0.045,
  },
  uploadHint: {
    color: colors.neutral400,
    fontSize: width * 0.035,
  },
});
