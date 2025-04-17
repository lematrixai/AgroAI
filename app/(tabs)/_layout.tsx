import React, { useState } from 'react';
import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar';
import { TouchableOpacity, Animated, StyleSheet, Alert, View } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

export default function TabsLayout() {
  const router = useRouter();
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }


  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Please allow gallery access.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      console.log('Image selected:', uri);
      // You can route, upload, preview, etc. with this image URI.
    }
  };

  const _renderIcon = ({ routeName, selectedTab }: any) => {
    let icon = '';
    if (routeName === 'home') icon = 'home-outline';
    if (routeName === 'profile') icon = 'person-outline';

    return (
      <Ionicons
        name={icon as any}
        size={25}
        color={routeName === selectedTab ? 'black' : 'gray'}
      />
    );
  };

  const renderTabBar = ({ routeName, selectedTab, navigate }: any) => (
    <TouchableOpacity onPress={() => navigate(routeName)} style={styles.tabbarItem}>
      {_renderIcon({ routeName, selectedTab })}
    </TouchableOpacity>
  );

  return (
    <CurvedBottomBarExpo.Navigator
      type="DOWN"
      style={styles.bottomBar}
      height={55}
      circleWidth={60}
      bgColor="white"
      initialRouteName="home"
      borderTopLeftRight
      renderCircle={() => (
        <Animated.View style={styles.btnCircleUp}>
          <TouchableOpacity onPress={pickImage}>
            <Ionicons name="camera-outline" size={28} color="gray" />
          </TouchableOpacity>
        </Animated.View>
      )}
      tabBar={renderTabBar}
    >
      <CurvedBottomBarExpo.Screen
        name="home"
        position="LEFT"
        component={() => require('./home').default()}
      />
      <CurvedBottomBarExpo.Screen
        name="profile"
        position="RIGHT"
        component={() => require('./profile').default()}
      />
    </CurvedBottomBarExpo.Navigator>
  );
}

const styles = StyleSheet.create({
  bottomBar: {},
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
    bottom: 30,
    elevation: 5,
  },
});
