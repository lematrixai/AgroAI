import ScreenWrapper from '@/components/ScreenWrapper';
import { colors, spacingX, spacingY } from '@/constants/theme';
import { Link, Stack } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Typo from '@/components/Typo';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function NotFoundScreen() {
  return (
    <View>
      <ScreenWrapper style={{ flex: 1, backgroundColor: 'crimson' }}>
        <Stack.Screen options={{ title: 'Oops!' }} />
        <Animated.View
          entering={FadeIn.duration(500)}
          style={styles.container}
        >
          <Typo size={24} fontWeight="700" color={colors.neutral100} style={{ marginBottom: spacingY._5 }}>
            404 - Page Not Found
          </Typo>
          <Typo size={16} color={colors.textLight} style={{ textAlign: 'center' }}>
            The screen you’re looking for doesn’t exist or may have been moved.
          </Typo>

          <Link href="/" asChild>
            <TouchableOpacity style={styles.link}>
              <Typo size={16} fontWeight="600" color={colors.neutral100}>
                ⬅ Go to Home
              </Typo>
            </TouchableOpacity>
          </Link>
        </Animated.View>
      </ScreenWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacingX._25,
    gap: spacingY._10,
  },
  link: {
    marginTop: spacingY._5,
    paddingVertical: spacingY._10,
    paddingHorizontal: spacingX._10,
    backgroundColor: colors.primary,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
});
