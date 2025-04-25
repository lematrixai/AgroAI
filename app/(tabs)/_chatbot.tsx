import { StyleSheet, View, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';
import React, { useState } from 'react';
import { colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import Typo from '@/components/Typo';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageBackground } from 'expo-image';
import { Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: false 
        }} 
      />
      <ImageBackground
        source={require("@/assets/images/onboardingbg.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.9)"]}
          style={StyleSheet.absoluteFill}
        />
        <SafeAreaView style={styles.safeArea} edges={['bottom']}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoidingView}
          >
            <ScrollView
              style={styles.messagesContainer}
              contentContainerStyle={styles.messagesContent}
            >
              {messages.map((message) => (
                <View
                  key={message.id}
                  style={[
                    styles.messageBubble,
                    message.sender === 'user' ? styles.userMessage : styles.botMessage,
                  ]}
                >
                  <Typo style={styles.messageText}>{message.text}</Typo>
                </View>
              ))}
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
              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleSend}
                disabled={!inputText.trim()}
              >
                <Ionicons
                  name="send"
                  size={24}
                  color={inputText.trim() ? colors.primary : colors.neutral400}
                />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary900,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: colors.secondary900,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    color: colors.neutral100,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.secondary900,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: colors.secondary900,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    color: colors.neutral100,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: colors.neutral700,
  },
  sendButton: {
    padding: 8,
  },
});

export default Chatbot; 