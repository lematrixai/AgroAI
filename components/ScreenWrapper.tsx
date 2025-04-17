import { Dimensions, Image, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScreenWrapperProps } from '@/types'
import { StatusBar } from 'expo-status-bar'
import { colors } from '@/constants/theme'

const { height } = Dimensions.get('window')
const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {

    let paddingTop = Platform.OS === 'ios' ? height * 0.06 : 50;
  return (
    <View
   
    style={[styles.container, { paddingTop }, style]}
        >
          
        <StatusBar style='light'  />
       
        {children}
    </View>
  )
}

export default ScreenWrapper

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.neutral900,
        
    },
})