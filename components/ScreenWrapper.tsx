import {
  Dimensions,
  ImageBackground,
  Keyboard,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { ScreenWrapperProps } from '@/types';
import { StatusBar } from 'expo-status-bar';
import { colors } from '@/constants/theme';
import { Asset } from 'expo-asset';

const { height } = Dimensions.get('window');

const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
  const paddingTop = Platform.OS === 'ios' ? height * 0.06 : 50;

  const [imageReady, setImageReady] = useState(false);

  // Preload Image
  useEffect(() => {
    const loadImage = async () => {
      await Asset.loadAsync(require('@/assets/images/background.png'));
      setImageReady(true);
    };
    loadImage();
  }, []);

  if (!imageReady) {
    // Display a loading spinner until the image is ready
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ImageBackground
    source={require('@/assets/images/background.png')}
    style={[styles.bg, { paddingTop }, style]}
    resizeMode="cover"
    blurRadius={0.5}
  >
    <StatusBar style="light" />
    <View style={styles.overlay} />
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.content}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  </ImageBackground>
  );
  
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  bg: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.black,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 15, 15, 0.6)', 
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.neutral800,
  },
});
