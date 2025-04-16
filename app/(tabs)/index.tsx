import { colors } from '@/constants/theme';
import { Image, StyleSheet, Text } from 'react-native';


export default function HomeScreen() {
  return (
   <view style={styles.container}>
    <Text>Hello</Text>
    </view>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.neutral900,
  }
});
