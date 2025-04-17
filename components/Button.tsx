import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    ActivityIndicator,
  } from 'react-native';
  import React from 'react';
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
        style={[
          styles.button,
          style,
          loading && styles.loadingButton, 
        ]}
        activeOpacity={0.85}
      >
        <View style={styles.contentWrapper}>
          <Text style={styles.text}>{children}</Text>
          {loading && <ActivityIndicator size="small" color={colors.neutral900} style={styles.spinner} />}
        </View>
      </TouchableOpacity>
    );
  };
  
  export default Button;
  
  const styles = StyleSheet.create({
    button: {
      backgroundColor: colors.primary,
      borderRadius: radius._17,
      height: verticalScale(52),
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.4,
      shadowRadius: 12,
      elevation: 6,
    },
    loadingButton: {
      opacity: 0.75,
    },
    contentWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    spinner: {
      marginRight: 8,
    },
    text: {
      color: colors.neutral100,
      fontSize: 18,
      fontWeight: '600',
      paddingHorizontal: 10,
    },
  });
  