import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import * as Animatable from "react-native-animatable";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import BackButton from "@/components/BackButton";
import Typo from "@/components/Typo";
import Input from "@/components/Input";
import * as Icons from "phosphor-react-native";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/authContext";

const SignUp = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const nameRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const formRef = useRef<Animatable.View & { shake?: (duration: number) => void }>(null);
  const { register: registerUser } = useAuth();

  const handleSubmit = async () => {
    const email = emailRef.current?.trim();
    const password = passwordRef.current?.trim();
    const name = nameRef.current?.trim();

    // Input checks
    if (!email || !password || !name) {
      formRef.current?.shake?.(800);
      Alert.alert("Sign Up", "Please fill in all fields");
      return;
    }

    // Email validation
    const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
    if (!isValidEmail(email)) {
      Alert.alert("Sign Up", "Please enter a valid email address");
      return;
    }

    // Password validation (min 6 characters + 1 number or symbol)
    const isValidPassword = (password: string) =>
      password.length >= 6 && /[\d\W]/.test(password);
    if (!isValidPassword(password)) {
      Alert.alert(
        "Sign Up",
        "Password must be at least 6 characters and contain a number or special character"
      );
      return;
    }

    // All good — go ahead
    setIsLoading(true);
    const res = await registerUser(name, email, password);
    router.replace("/(tabs)/home");
    setIsLoading(false);

    if (!res.success) {
      Alert.alert("Sign Up", res.msg);
      return;
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={28} />

        {/* Welcome Animation */}
        <Animatable.View animation="fadeInDown" duration={800}>
          <Typo size={30} fontWeight={"800"}>Let's,</Typo>
          <Typo size={30} fontWeight={"800"}>Get Started</Typo>
        </Animatable.View>

        {/* FORM */}
        <Animatable.View ref={formRef} animation="fadeInUp" style={styles.form}>
          <Typo size={16} color={colors.textLighter}>
            Create an account now to rescue your plants from disease
          </Typo>

          {/* Name Field */}
          <Animatable.View animation="fadeInUp" delay={100}>
            <Input
              onChangeText={(value) => (nameRef.current = value)}
              placeholder="Enter your full name"
              icon={
                <Icons.User
                  size={verticalScale(26)}
                  color={colors.neutral300}
                  weight="fill"
                />
              }
            />
          </Animatable.View>

          {/* Email Field */}
          <Animatable.View animation="fadeInUp" delay={300}>
            <Input
              onChangeText={(value) => (emailRef.current = value)}
              placeholder="Enter your email"
              icon={
                <Icons.At
                  size={verticalScale(26)}
                  color={colors.neutral300}
                  weight="fill"
                />
              }
            />
          </Animatable.View>

          {/* Password Field */}
          <Animatable.View animation="fadeInUp" delay={500}>
            <Input
              onChangeText={(value) => (passwordRef.current = value)}
              placeholder="Enter your Password"
              icon={
                <Icons.Lock
                  size={verticalScale(26)}
                  color={colors.neutral300}
                  weight="fill"
                />
              }
              secureTextEntry={true}
            />
          </Animatable.View>

          <Typo size={14} color={colors.text} style={{ alignSelf: "flex-end" }}>
            Forgot Password?
          </Typo>

        
            <Button
              loading={isLoading}
              style={{ backgroundColor: colors.neutral900 }}
              onPress={handleSubmit}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <Typo fontWeight="700" color={colors.neutral1300} size={21}>
                  {isLoading ? "Loading..." : "Sign In"}
                </Typo>
                {isLoading && (
                  <ActivityIndicator size="small" color={colors.neutral1300} />
                )}
              </View>
            </Button>
          </Animatable.View>

        {/* FOOTER */}
        <Animatable.View animation="fadeInUp" delay={600} style={styles.footer}>
          <Typo size={15}>Already have an account?</Typo>
          <Pressable onPress={() => router.push("/sign-in")}>
            <Typo size={15} fontWeight={"700"} color={colors.neutral900}>
              Sign In
            </Typo>
          </Pressable>
        </Animatable.View>
      </View>
    </ScreenWrapper>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
  },
  form: {
    gap: spacingY._20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});
