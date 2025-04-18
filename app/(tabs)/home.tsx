import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacingX } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
         <View style={styles.container}>
           <Stack.Screen options={{ headerShown: false }} />
           <StatusBar style="light" backgroundColor="#5D" />
          </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
      flex: 1,
      backgroundColor: colors.secondary900,
    },
    container: {
      flex: 1,
      paddingHorizontal: spacingX._20,
      backgroundColor: colors.secondary900,
    },
});