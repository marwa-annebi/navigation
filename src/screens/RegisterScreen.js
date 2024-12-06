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
  Image,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase-config";
import { useTheme } from "../context/theme";
import Ionicons from "react-native-vector-icons/Ionicons";

// Initialize Firebase
initializeApp(firebaseConfig);

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { theme, switchTheme, appearance } = useTheme();

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate("AccountCreated");
    } catch (error) {
      let errorMessage = "Registration failed! Please try again.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already in use.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password should be at least 6 characters long.";
      }
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={{ alignItems: "center" }}>
        <Image
          source={
            appearance === "dark"
              ? require("../../assets/gifs/dark-register.gif")
              : require("../../assets/gifs/register.gif")
          }
          style={{ width: 300, height: 300 }}
        />
      </View>
      <Text style={[styles.title, { color: theme.colors.primary }]}>
        Register
      </Text>

      <View
        style={[styles.inputContainer, { borderColor: theme.colors.onSurface }]}
      >
        <Ionicons
          name="mail-outline"
          size={20}
          color={theme.colors.secondary}
          style={styles.icon}
        />
        <TextInput
          style={[styles.input, { color: theme.text().primary }]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={theme.text().secondaryVariant}
        />
      </View>

      <View
        style={[styles.inputContainer, { borderColor: theme.colors.onSurface }]}
      >
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color={theme.colors.secondary}
          style={styles.icon}
        />
        <TextInput
          style={[styles.input, { color: theme.text().primary }]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor={theme.text().secondaryVariant}
        />
      </View>

      <View
        style={[styles.inputContainer, { borderColor: theme.colors.onSurface }]}
      >
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color={theme.colors.secondary}
          style={styles.icon}
        />
        <TextInput
          style={[styles.input, { color: theme.text().primary }]}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholderTextColor={theme.text().secondaryVariant}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={handleRegister}
      >
        <Text style={[styles.buttonText, { color: theme.colors.onPrimary }]}>
          Register
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={styles.link}
      >
        <Text style={[styles.linkText, { color: theme.colors.primary }]}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>

      <View
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          width: 48,
          height: 48,
          borderRadius: 24,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.secondary,
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
            color={appearance === "light" ? "#FFF" : "#FFF"}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "95%", // Adjusted width for better spacing
    height: 40, // Reduced height
    borderWidth: 1,
    borderRadius: 10, // Slightly smaller border radius
    paddingHorizontal: 8, // Reduced padding
    marginBottom: 15, // Less margin between inputs
  },
  icon: {
    marginRight: 8, // Reduced margin for compact design
  },
  input: {
    flex: 1,
    fontSize: 14, // Smaller font size
  },
  button: {
    width: "90%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14, // Reduced font size
    fontWeight: "bold",
  },
  link: {
    marginTop: 15, // Reduced top margin
  },
  linkText: {
    fontSize: 12, // Smaller font size for links
  },
  error: {
    marginTop: 8, // Slightly reduced margin
    fontSize: 12, // Smaller error text
  },
  themeSwitcher: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 48, // Reduced size for the switcher
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray", // Replace with theme colors as needed
  },
});
