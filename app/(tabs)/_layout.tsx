import React, { useState } from 'react';
import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar';
import { TouchableOpacity, Animated, StyleSheet, Alert, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Icons from 'phosphor-react-native';
import { Stack } from 'expo-router';
import { colors } from '@/constants/theme';
import { verticalScale } from '@/utils/styling';
import { LinearGradient } from 'expo-linear-gradient';
import CameraCapture from '@/components/home/floatButton/Camera';

export default function _Layout() {


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

      <CameraCapture />
     
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