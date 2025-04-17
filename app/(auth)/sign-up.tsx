import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import BackButton from '@/components/BackButton'
import { Link, router } from 'expo-router'
import Typo from '@/components/Typo'

const signUp = () => {
  return (
    <ScreenWrapper >
    <View style={styles.container}>
        <BackButton />
        <Link href="/(tabs)/home" asChild>
            <TouchableOpacity >
              <Typo size={16} fontWeight="600" color={colors.neutral100}>
                ⬅ Go to Home
              </Typo>
            </TouchableOpacity>
          </Link>
    </View>
    </ScreenWrapper>
  )
}

export default signUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: spacingY._30,
        paddingHorizontal: spacingX._20,
        backgroundColor: colors.neutral600,

    },
    welcomeText: {
        fontSize: verticalScale(20),
        fontWeight: 'bold',
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
})