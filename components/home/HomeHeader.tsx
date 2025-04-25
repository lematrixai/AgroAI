import { View, StyleSheet, Dimensions } from "react-native";
import { colors } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import Typo from "@/components/Typo";

const { width } = Dimensions.get('window');

export default function HomeHeader() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Animated.View 
        entering={FadeInDown.duration(1000).springify()}
        style={styles.titleContainer}
      >
        <Typo style={styles.welcomeText}>Welcome to</Typo>
        <Typo style={styles.appName}>PyCrop AI</Typo>
      </Animated.View>

      <Animated.View 
        entering={FadeInUp.duration(1000).springify().delay(200)}
        style={styles.subtitleContainer}
      >
        <Typo style={styles.subtitle}>
          Your Smart Maize Plant Analysis
        </Typo>
        <Typo style={styles.hint}>
          Upload a leaf image for instant health diagnosis
        </Typo>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    marginBottom: width * 0.12,
    paddingHorizontal: width * 0.05,
    width: "100%",
  },
  titleContainer: {
    alignItems: "flex-start",
    marginBottom: width * 0.04,
    width: "100%",
  },
  subtitleContainer: {
    alignItems: "flex-start",
    width: "100%",
  },
  welcomeText: {
    color: colors.neutral300,
    fontSize: width * 0.045,
    fontWeight: "500",
    textAlign: "left",
    marginBottom: width * 0.005,
    width: "100%",
  },
  appName: {
    color: colors.green, 
    fontSize: width * 0.1,
    fontWeight: "900",
    textAlign: "left",
    letterSpacing: width * 0.003,
    width: "100%",
  },
  
  subtitle: {
    color: colors.neutral300,
    fontSize: width * 0.05,
    fontWeight: "600",
    textAlign: "left",
    marginBottom: width * 0.015,
    letterSpacing: width * 0.00125,
    width: "100%",
  },
  hint: {
    color: colors.neutral400,
    fontSize: width * 0.035,
    textAlign: "left",
    lineHeight: width * 0.05,
    width: "100%",
  },
}); 