import { Dimensions, Image, Platform, StyleSheet, View } from 'react-native';
import React from 'react';
import { ScreenWrapperProps } from '@/types';
import { colors } from '@/constants/theme';
import { StatusBar } from 'expo-status-bar';

const { height } = Dimensions.get('window');

const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
  let paddingTop = Platform.OS === 'ios' ? height * 0.06 : 50;

  return (
    <View style={[styles.container, { paddingTop }, style]}>
      <StatusBar style="inverted" />
      <Image
        source={require('@/assets/images/auth-bg.png')}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        {children}
      </View>
    </View>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  overlay: {
    flex: 1,
  },
});
