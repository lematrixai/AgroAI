import {
    ActivityIndicator,
    Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { scale, verticalScale } from "@/utils/styling";
import ModalWrapper from "@/components/ModalWrapper";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import { getProfileImage } from "@/services/imageService";
import { Image } from "expo-image";
import * as Icons from "phosphor-react-native";
import Typo from "@/components/Typo";
import Input from "@/components/Input";
import { UserDataType } from "@/types";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/authContext";
import { updateUser } from "@/services/userService";
import { useRouter } from "expo-router";
import * as ImagePiker from "expo-image-picker"
const profileModal = () => {

  const { user, updateUserData } = useAuth();
    const router = useRouter()
  const [userData, setUserData] = useState<UserDataType>({
    name: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUserData({
        name: user?.name || "",
        image: user?.image || null,
    });
  }, [user]);

  const  onPickImage = async () => {
    let result = await ImagePiker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        aspect: [4,3],
        quality: 0.5,
        
    })


    if(!result.canceled) {
        setUserData({...userData, image: result.assets[0] });
    }
  }

  const onSubmit = async () => {
    let {name, image } = userData
    if (!name.trim()) {
        Alert.alert("User", "please fill all the fields");
        return;
    }
    setLoading(true);
    const res = await updateUser(user?.uid as string, userData);
    setLoading(false);
    if(res.success) {
            updateUserData(user?.uid as string)
            router.back();
    }else {
        Alert.alert("User", res.msg)
    }
  }
  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          title="Update Profile"
          leftIcon={<BackButton />}
          style={{ marginBottom: spacingY._10 }}
        />

        {/* form */}
        <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={getProfileImage(userData.image)}
              contentFit="cover"
              transition={100}
            />
            <TouchableOpacity onPress={onPickImage} style={styles.editIcon}>
              <Icons.Pencil
                size={verticalScale(20)}
                color={colors.neutral800}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Name</Typo>
            <Input
              placeholder="Name"
              value={userData.name}
              onChangeText={(value) => setUserData({...userData, name: value})}
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <Button onPress={onSubmit} loading={loading} style={{flex: 1, }}>
            <Typo color={colors.black} style={{ gap: 2 }} fontWeight="700"> 

                  {loading ? "" : "Update"}
                </Typo>
                {loading && (
                  <ActivityIndicator size="large" color={colors.neutral1300} />
                )}
        </Button>
      </View>
    </ModalWrapper>
  );
};

export default profileModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacingY._20,
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: spacingX._20,
    gap: scale(12),
    paddingTop: spacingY._15,
    borderTopColor: colors.neutral500,
    marginBottom: spacingY._5,
    borderTopWidth: 1,
  },
  form: {
    gap: spacingY._30,
    marginTop: spacingY._15,
  },
  avatarContainer: {
    position: "relative",
    alignSelf: "center",
  },
  avatar: {
    alignSelf: "center",
    backgroundColor: colors.neutral400,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
    borderColor: colors.neutral1000,
  },
  editIcon: {
    position: "absolute",
    bottom: spacingY._5,
    right: spacingY._7,
    borderRadius: 100,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding: spacingY._7,
  },
  inputContainer: {
    gap: spacingY._10,
  },
});
