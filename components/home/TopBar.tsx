import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { colors } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useNavigation } from '@react-navigation/native';
import { Image } from "expo-image";
import { router } from "expo-router";
const { width } = Dimensions.get('window');

export default function TopBar() {
  const { user: userImage } = useAuth();
  const navigation = useNavigation();

  const handleProfilePress = () => {
    router.push("/profile");
  };

  return (
    <Animated.View 
      entering={FadeInDown.duration(800).springify()} 
      style={styles.container}
    >
      <TouchableOpacity onPress={() => router.push('/chatbot')} style={styles.iconButton}>
        <Image source={require("@/assets/images/chatbot.png")} style={styles.iconImage} />
      </TouchableOpacity>

      <TouchableOpacity 
      style={styles.profileContainer} 
      onPress={handleProfilePress}
      activeOpacity={0.7}
    >
      <Image
        source={userImage?.image || require("@/assets/images/defaultAvatar.png")}
        style={styles.profileImage}
        contentFit="cover"
      />
    </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: width * 0.05,
    paddingTop: width * 0.05,
    paddingBottom: width * 0.15, 
    zIndex: 10,
  },
  
  iconButton: {
    width: width * 0.1,
    height: width * 0.1,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.8,
 
  },
  profileContainer: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: width * 0.06,
    backgroundColor: colors.secondary900,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: width * 0.005,
    borderColor: colors.green,
    shadowColor: colors.green,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: width * 0.02,
    elevation: 5,
  },
  profileImage: {
    width: "92%",
    height: "92%",
    borderRadius: width * 0.06,
  },
  iconImage: {
    width: width * 0.1,
    height: width * 0.1,
  },
}); 