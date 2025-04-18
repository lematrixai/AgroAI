import React, { useState } from 'react';
import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar';
import { TouchableOpacity, Animated, StyleSheet, Alert, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import * as Icons from 'phosphor-react-native';
import { CameraType, useCameraPermissions } from 'expo-camera';
import { Stack, useRouter } from 'expo-router';
import { colors } from '@/constants/theme';
import { verticalScale } from '@/utils/styling';
import { LinearGradient } from 'expo-linear-gradient';

export default function _Layout() {
  const router = useRouter();
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Please allow gallery access.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      console.log('Image selected:', uri);
    }
  };

  const renderIcon = ({ routeName, selectedTab }: { routeName: string; selectedTab: string }) => {
    const isSelected = routeName === selectedTab;
    const iconColor = isSelected ? colors.neutral900 : colors.neutral400;
    const weight = isSelected ? 'fill' : 'regular';

    switch (routeName) {
      case 'home':
        return <Icons.House size={25} color={iconColor} weight={weight} />;
      case 'profile':
        return <Icons.User size={25} color={iconColor} weight={weight} />;
      default:
        return null;
    }
  };

  const renderTabBar = ({
    routeName,
    selectedTab,
    navigate,
  }: {
    routeName: string;
    selectedTab: string;
    navigate: (routeName: string) => void;
  }) => (
    <TouchableOpacity onPress={() => navigate(routeName)} style={styles.tabbarItem}>
      {renderIcon({ routeName, selectedTab })}
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <CurvedBottomBarExpo.Navigator
        type="DOWN"
        style={styles.bottomBar}
        height={55}
        circleWidth={60}
        bgColor={colors.neutral_800}
        initialRouteName="home"
        borderTopLeftRight
        renderCircle={() => (
          <Animated.View >
             <LinearGradient
      colors={['#75E00A', '#0AE0A0']} 
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.btnCircleUp}
    >
      <TouchableOpacity onPress={pickImage}>
        <Ionicons name="camera-outline" size={28} color={colors.white} />
      </TouchableOpacity>
    </LinearGradient>
          </Animated.View>
        )}
        tabBar={renderTabBar}
      >
        <CurvedBottomBarExpo.Screen
          name="home"
          position="LEFT"
          component={() => require('@/app/(tabs)/home').default()}
        />
        <CurvedBottomBarExpo.Screen
          name="profile"
          position="RIGHT"
          component={() => require('@/app/(tabs)/profile').default()}
        />
      </CurvedBottomBarExpo.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  bottomBar: {},
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(6),
  },
  btnCircleUp: {
    width: verticalScale(60),
    height: verticalScale(60),
    borderRadius: verticalScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#cbd5e1",
    bottom: verticalScale(40),
    elevation: 5,
  },
});