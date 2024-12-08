import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  Pressable,
} from "react-native";
import { useTheme } from "../context/theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  getAuth,
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase-config";
initializeApp(firebaseConfig);

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const { theme, switchTheme, appearance } = useTheme();

  const handleSendResetLink = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    try {
      const auth = getAuth();
      console.log("🚀 ~ handleSendResetLink ~ auth:", auth);
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      console.log("🚀 ~ handleSendResetLink ~ signInMethods:", signInMethods);

      const res = await sendPasswordResetEmail(auth, email);
      console.log("🚀 ~ handleSendResetLink ~ res:", res);
      Alert.alert("Success", "Password reset link sent. Check your email.");
    } catch (error) {
      let errorMessage = "Failed to send reset link. Please try again.";
      if (error.code === "auth/invalid-email") {
        errorMessage = "The email address is not valid.";
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email.";
      }
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={[styles.title, { color: theme.colors.primary }]}>
        Forgot Password
      </Text>
      <Text style={[styles.subtitle, { color: theme.text().secondary }]}>
        Enter your email address to receive a password reset link.
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.onSurface,
            color: theme.text().primary,
          },
        ]}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor={theme.text().secondaryVariant}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={handleSendResetLink}
      >
        <Text style={[styles.buttonText, { color: theme.colors.onPrimary }]}>
          Send Reset Link
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.link}>
        <Text style={[styles.linkText, { color: theme.colors.primary }]}>
          Go Back
        </Text>
      </TouchableOpacity>
      <View
        style={{
          position: "absolute",
          bottom: 50,
          right: 20,
          width: 56,
          height: 56,
          borderRadius: 28,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.colors.secondary,
          elevation: 5,
        }}
      >
        <Pressable
          onPress={() => switchTheme()}
          accessibilityLabel="Toggle Theme"
          accessibilityHint="Switch between light and dark mode"
        >
          <Ionicons
            name={appearance === "light" ? "sunny" : "moon"}
            size={24}
            color="#FFF"
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    marginBottom: 15,
  },
  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    width: "90%",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    fontSize: 14,
  },
});
