import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import BackButton from '@/components/BackButton'

const signUp = () => {
  return (
    <ScreenWrapper >
    <View style={styles.container}>
        <BackButton />

      <Text>signIn</Text>
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