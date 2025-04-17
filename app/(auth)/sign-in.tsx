import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
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
  
  const SignIn = () => {
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const formRef = useRef<Animatable.View & { shake?: (duration: number) => void }>(null);
  
    const handleSubmit = async () => {
      if (!emailRef.current || !passwordRef.current) {
        formRef.current?.shake?.(800);
        Alert.alert("Sign In", "Please fill in all fields");
        return;
      }
      try {
        setIsLoading(true);
        console.log("email", emailRef.current);
        console.log("password", passwordRef.current);
        // fake delay
        setTimeout(() => {
          setIsLoading(false);
          Alert.alert("Success", "You are logged in!");
        }, 2000);
      } catch (error) {
        Alert.alert("Sign In", "Something went wrong, please try again");
        setIsLoading(false);
      }
    };
  
    return (
      <ScreenWrapper>
        <View style={styles.container}>
          <BackButton iconSize={28} />
  
          {/* Welcome Animation */}
          <Animatable.View animation="fadeInDown" duration={700}>
            <Typo size={30} fontWeight={"800"}>Hey,</Typo>
            <Typo size={30} fontWeight={"800"}>Welcome Back</Typo>
          </Animatable.View>
  
          {/* FORM */}
          <Animatable.View ref={formRef} animation="fadeInUp" style={styles.form}>
            <Typo size={16} color={colors.textLighter}>
              Your plants need you — sign in now!
            </Typo>
  
            <Animatable.View animation="fadeInUp" delay={200}>
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
  
            <Animatable.View animation="fadeInUp" delay={400}>
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
  
            {/* Animated Button */}
            <Animatable.View
              animation={isLoading ? "pulse" : undefined}
              iterationCount="infinite"
              duration={800}
              style={{ width: "100%" }}
            >
              <Button loading={isLoading} style={{ backgroundColor: colors.Yellow }} onPress={handleSubmit}>
                <Typo fontWeight={"700"} color={colors.neutral1300} size={21}>
                  {isLoading ? "Loading..." : "Sign In"}
                </Typo>
              </Button>
            </Animatable.View>
          </Animatable.View>
  
          {/* FOOTER */}
          <Animatable.View animation="fadeInUp" delay={600} style={styles.footer}>
            <Typo size={15}>Don't have an account?</Typo>
            <Pressable onPress={() => router.navigate("/sign-up")}>
              <Typo size={15} fontWeight={"700"} color={colors.Yellow}>
                Sign Up
              </Typo>
            </Pressable>
          </Animatable.View>
        </View>
      </ScreenWrapper>
    );
  };
  
  export default SignIn;
  
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
  