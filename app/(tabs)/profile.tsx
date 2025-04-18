import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown } from "react-native-reanimated";
import * as Icons from "phosphor-react-native";
import { Image } from "expo-image";
import { signOut } from "firebase/auth";
import { useCallback, useState } from "react";

import { useAuth } from "@/contexts/authContext";
import { getProfileImage } from "@/services/imageService";
import { verticalScale } from "@/utils/styling";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import Typo from "@/components/Typo";
import Header from "@/components/Header";
import { auth } from "@/config/firebase";
import { accountOptionType } from "@/types";

const ProfileScreen = () => {
  const { user } = useAuth();
  const [renderKey, setRenderKey] = useState(0);

useFocusEffect(
  useCallback(() => {
    setRenderKey(prev => prev + 1); 
  }, [])
);

  const accountOptions: accountOptionType[] = [
    {
      title: "Edit Profile",
      icon: <Icons.User size={26} color={colors.white} weight="fill" />,
      routeName: "/(modals)/profileModal",
      bgColor: "#6366f1",
    },
    {
      title: "Logout",
      icon: <Icons.Power size={26} color={colors.white} weight="fill" />,
      bgColor: "#e11d48",
    },
  ];

  const handleLogout = useCallback(async () => {
    await signOut(auth);
  }, []);

  const showLogoutAlert = () => {
    Alert.alert("Confirm", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: handleLogout,
        style: "destructive",
      },
    ]);
  };

  const handlePress = (item: accountOptionType) => {
    if (item.title === "Logout") {
      showLogoutAlert();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <StatusBar style="light" backgroundColor="#5D" />

        <Header title="Profile" style={styles.header} />

        {/* Profile Info */}
        <View style={styles.userInfo}>
          <Image source={getProfileImage(user?.image)} style={styles.avatar} />
          <View style={styles.nameContainer}>
            <Typo size={24} fontWeight="800" color={colors.neutral100}>
              {user?.name}
            </Typo>
            <Typo size={15} color={colors.neutral300}>
              {user?.email}
            </Typo>
          </View>
        </View>

        {/* Options */}
        <View style={styles.accountOptions} key={renderKey}>
          {accountOptions.map((item, index) => (
            <Animated.View
              key={item.title}
              entering={FadeInDown.delay(index * 80)}
              style={styles.listItem}
            >
              <TouchableOpacity style={styles.optionRow} onPress={() => handlePress(item)}>
                <View style={[styles.iconWrapper, { backgroundColor: item.bgColor }]}>
                  {item.icon}
                </View>
                <Typo size={16} fontWeight="500" style={styles.optionTitle}>
                  {item.title}
                </Typo>
                <Icons.CaretRight
                  size={verticalScale(20)}
                  color={colors.neutral400}
                  weight="bold"
                />
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.secondary900,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
    backgroundColor: colors.secondary900,
  },
  header: {
    marginVertical: spacingY._10,
  },
  userInfo: {
    marginTop: verticalScale(30),
    alignItems: "center",
    gap: spacingY._15,
  },
  avatar: {
    backgroundColor: colors.neutral500,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
  },
  nameContainer: {
    gap: verticalScale(4),
    alignItems: "center",
  },
  accountOptions: {
    marginTop: spacingY._35,
  },
  listItem: {
    marginBottom: verticalScale(17),
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._10,
  },
  iconWrapper: {
    height: verticalScale(44),
    width: verticalScale(44),
    borderRadius: radius._15,
    borderCurve: "continuous",
    alignItems: "center",
    justifyContent: "center",
  },
  optionTitle: {
    flex: 1,
  },
});
