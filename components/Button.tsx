import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { CustomButtonProps } from '@/types';
import { colors, radius } from '@/constants/theme';
import { verticalScale } from '@/utils/styling';

const Button = ({
  style,
  onPress,
  loading = false,
  children,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.85}
      style={[style, styles.touchable, loading && styles.loadingButton]}
    >
      <View style={styles.gradientWrapper}>
        <LinearGradient
          colors={['#75E00A', '#0AE0A0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <View style={styles.contentWrapper}>
            {loading && (
              <ActivityIndicator
                size="small"
                color={colors.neutral900}
                style={styles.spinner}
              />
            )}
            <Text style={styles.text}>{children}</Text>
          </View>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  touchable: {
    height: verticalScale(52),
    borderRadius: radius._17,
  },
  gradientWrapper: {
    flex: 1,
    borderRadius: radius._17,
    overflow: 'hidden', 
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingButton: {
    opacity: 0.75,
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  spinner: {
    marginRight: 8,
  },
  text: {
    color: colors.neutral900, 
    fontSize: 18,
    fontWeight: '600',
  },
});
