import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { CaretLeft } from 'phosphor-react-native'
import { verticalScale } from '@/utils/styling'
import { BackButtonProps } from '@/types'
import { colors, radius } from '@/constants/theme'

const BackButton = ({ style, iconSize = 26 }: BackButtonProps) => {
    const router = useRouter()
  return (
   <TouchableOpacity onPress={() => router.back()}
  activeOpacity={0.7}

    style={[ styles.button, style]}
  >
    <CaretLeft
    size={verticalScale(iconSize)}
    color={colors.white}
    weight="bold"
    />
    
    </TouchableOpacity>
    )
}

export default BackButton

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.neutral400,
        borderCurve: "continuous",
        alignSelf: 'flex-start',
        borderRadius: radius._12,
        padding: 5,
    }
})