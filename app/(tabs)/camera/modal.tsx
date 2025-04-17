import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function CameraModal() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={{ color: 'white' }}>Camera Modal</Text>
      <Button title="Close" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000CC',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
