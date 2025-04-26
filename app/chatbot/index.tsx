import {
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { colors } from "@/constants/theme";
import Typo from "@/components/Typo";
import { Ionicons } from "@expo/vector-icons";
import { createGradientBackground } from "@/utils/gradient";
import React from "react";
import { moderateScale, verticalScale } from "@/utils/styling";
import { useHeaderHeight } from "@react-navigation/elements";
import { Robot } from "phosphor-react-native";
type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

const ChatbotScreen = () => {
  const headerHeight = useHeaderHeight();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInputText("");
    }
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar style="light" backgroundColor="transparent" translucent />

      <ImageBackground
        source={require("@/assets/images/onboardingbg.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={createGradientBackground(0.4)} />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <ScrollView
            style={[styles.messagesContainer, { marginTop: headerHeight }]}
            contentContainerStyle={styles.messagesContent}
          >
            {messages.map((message) =>
              message.sender === "bot" ? (
                <View key={message.id} style={styles.botMessageWrapper}>
                  <View style={styles.botIcon}>
                    <Robot
                      size={20}
                      color={colors.neutral100}
                    />
                  </View>
                  <View style={[styles.messageBubble, styles.botMessage]}>
                    <Typo style={styles.messageText}>{message.text}</Typo>
                  </View>
                </View>
              ) : (
                <View
                  key={message.id}
                  style={[styles.messageBubble, styles.userMessage]}
                >
                  <Typo style={styles.messageText}>{message.text}</Typo>
                </View>
              )
            )}
          </ScrollView>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type your message..."
              placeholderTextColor={colors.neutral400}
              multiline
            />
            {inputText.trim().length > 0 && (
              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleSend}
                disabled={!inputText.trim()}
              >
                <Ionicons name="send" size={24} color={colors.neutral100} />
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.secondary900,
  },
  background: {
    flex: 1,
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(8),
  },
  headerText: {
    fontSize: moderateScale(18),
    fontWeight: "600",
    color: colors.white,
  },
  headerButton: {
    padding: moderateScale(8),
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: moderateScale(16),
  },
  messageBubble: {
    maxWidth: "80%",
    padding: moderateScale(12),
    borderRadius: moderateScale(16),
    marginBottom: verticalScale(8),
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: colors.primary,
    borderBottomRightRadius: moderateScale(4),
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: colors.secondary900,
    borderBottomLeftRadius: moderateScale(4),
  },
  messageText: {
    color: colors.neutral100,
    fontSize: moderateScale(16),
  },
  inputContainer: {
    flexDirection: "row",
    padding: moderateScale(16),
    backgroundColor: colors.secondary900,
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: colors.secondary900,
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(12),
    marginRight: moderateScale(12),
    color: colors.neutral100,
    maxHeight: moderateScale(80),
    borderWidth: 1,
    borderColor: colors.neutral700,
  },
  sendButton: {
    padding: moderateScale(8),
    backgroundColor: colors.primary,
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  botMessageWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(8),
  },
  botIcon: {
    marginRight: moderateScale(8),
    color: colors.neutral100,
    borderWidth: 1,
    borderColor: colors.neutral900,
    padding: moderateScale(8),
    borderRadius: moderateScale(50),
  },
});

export default ChatbotScreen;
