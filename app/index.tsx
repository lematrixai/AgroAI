import { colors } from '@/constants/theme';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(auth)/welcome');
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('@/assets/animations/splash.json')}
        autoPlay
        loop={false} 
        style={styles.lottie}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.greenDark,
  },
  lottie: {
    height: '20%',
    aspectRatio: 1
  },
});
