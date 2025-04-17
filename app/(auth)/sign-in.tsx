import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import { colors, spacingX, spacingY } from '@/constants/theme';
import { verticalScale } from '@/utils/styling';
import BackButton from '@/components/BackButton';
import { useRouter } from 'expo-router';

const SignIn = () => {

    const router = useRouter();
  return (
    <ScreenWrapper style={styles.container}>
      <BackButton />
      <TouchableOpacity onPress={() => router.replace('/(tabs)/home')}>Home</TouchableOpacity>
      {/* <Text style={styles.welcomeText}>Sign In</Text> */}
      {/* Form components go here */}
    </ScreenWrapper>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
    paddingTop: spacingY._15,
    backgroundColor: colors.neutral600,
  },
  welcomeText: {
    fontSize: verticalScale(22),
    fontWeight: '700',
    color: colors.text,
  },
  form: {
    gap: spacingY._20,
  },
  forgotPassword: {
    textAlign: 'right',
    fontWeight: '500',
    color: colors.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  footerText: {
    textAlign: 'center',
    color: colors.text,
    fontSize: verticalScale(15),
  },
});
