import { scale, verticalScale, moderateScale } from '@/utils/styling';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import React from 'react';
import { useState, useRef } from 'react';
import * as Location from 'expo-location';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable,
  Image,
  ActivityIndicator,
  Alert,
  Text,
} from 'react-native';
import { validateLeafHealth } from '@/lib/api';

export default function CameraCapture() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [open, setOpen] = useState(false);
    const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
  
    const cameraRef = useRef<any>(null);
  
    const toggleFacing = () => {
      setFacing((prev) => (prev === 'back' ? 'front' : 'back'));
    };
  
    const requestLocationAndOpenCamera = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Location permission is required to open the camera.');
          return;
        }
  
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
  
        console.log('User location:', currentLocation);
  
        setOpen(true); // open camera only if location permission granted
      } catch (error) {
        console.error('Location error', error);
        Alert.alert('Error', 'Failed to get location.');
      }
    };
  
    const takePicture = async () => {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync({
          base64: true,
          quality: 0.7,
        });
        setCapturedPhoto(photo.uri);
      }
    };
  
    const sendPhotoToApi = async () => {
        if (!capturedPhoto) return;
      
        try {
          setLoading(true);
      
          const prediction = await validateLeafHealth(capturedPhoto);
      
          console.log('Prediction:', prediction);
      
          if (prediction) {
            Alert.alert('Prediction', `The leaf is ${prediction}.`);
          } else {
            Alert.alert('Error', 'Failed to predict leaf health.');
          }
        } catch (error) {
          console.error('Upload error', error);
          Alert.alert('Error', 'Failed to send data.');
        } finally {
          setLoading(false);
          setCapturedPhoto(null);
          setOpen(false);
        }
      };
      
  
    if (!permission) return null;
    if (!permission.granted) {
      return (
        <TouchableOpacity onPress={requestPermission}>
          <Ionicons name="camera-outline" size={scale(30)} color="#333" />
        </TouchableOpacity>
      );
    }
  return (
    <View>
      {/* Floating camera button */}
      <Pressable onPress={requestLocationAndOpenCamera} style={styles.cameraButton}>
        <Ionicons name="camera-outline" size={scale(30)} color="#fff" />
      </Pressable>

      {/* Fullscreen camera modal */}
      <Modal visible={open} animationType="slide">
        <View style={styles.container}>
          {capturedPhoto ? (
            <>
              <Image source={{ uri: capturedPhoto }} style={StyleSheet.absoluteFillObject} />
              {loading ? (
                <ActivityIndicator size="large" color="#0ABAB5" style={styles.loading} />
              ) : (
                <>
                  <TouchableOpacity onPress={sendPhotoToApi} style={styles.uploadButton}>
                    <Ionicons name="cloud-upload-outline" size={scale(35)} color="#fff" />
                    <Text style={styles.buttonText}>Upload</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => setCapturedPhoto(null)} style={styles.retryButton}>
                    <Ionicons name="refresh-outline" size={scale(35)} color="#fff" />
                    <Text style={styles.buttonText}>Retry</Text>
                  </TouchableOpacity>
                </>
              )}
            </>
          ) : (
            <>
              <CameraView style={StyleSheet.absoluteFill} facing={facing} ref={cameraRef}>
                <TouchableOpacity onPress={toggleFacing} style={styles.toggle}>
                  <Ionicons name="camera-reverse-outline" size={scale(32)} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity onPress={takePicture} style={styles.capture}>
                  <View style={styles.innerCapture} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setOpen(false)} style={styles.close}>
                  <Ionicons name="close-outline" size={scale(32)} color="#fff" />
                </TouchableOpacity>
              </CameraView>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraButton: {
  
    alignSelf: 'center',
    marginVertical: verticalScale(10),
  },
  toggle: {
    position: 'absolute',
    top: verticalScale(40),
    right: scale(20),
   
  },
  close: {
    position: 'absolute',
    top: verticalScale(40),
    left: scale(20),
 
  },
  capture: {
    position: 'absolute',
    bottom: verticalScale(40),
    alignSelf: 'center',
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(40),
    borderWidth: 5,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCapture: {
    width: moderateScale(60),
    height: moderateScale(60),
    backgroundColor: '#fff',
    borderRadius: moderateScale(30),
  },
  uploadButton: {
    position: 'absolute',
    bottom: verticalScale(40),
    left: scale(40),
   
  },
  retryButton: {
    position: 'absolute',
    bottom: verticalScale(40),
    right: scale(40),
   
  },
  buttonText: {
    color: '#fff',
    marginTop: verticalScale(5),
    fontSize: moderateScale(12),
    fontWeight: '600',
  },
  loading: {
    position: 'absolute',
    bottom: verticalScale(100),
    alignSelf: 'center',
  },
});
