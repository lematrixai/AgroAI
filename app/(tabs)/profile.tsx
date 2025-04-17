import Button from '@/components/Button';
import Typo from '@/components/Typo';
import { auth } from '@/config/firebase';
import { colors } from '@/constants/theme';
import { signOut } from 'firebase/auth';
import { View, Text, StyleSheet } from 'react-native';


export default function ProfileScreen() {

  const handleLogout = async () => {
    await signOut(auth);
  }
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>

      {/* // signout button */}
      <Button onPress={handleLogout}>
        <Typo color={colors.black} size={16}>
          Sign Out
        </Typo>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
