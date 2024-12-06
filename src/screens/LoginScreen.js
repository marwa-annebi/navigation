import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  Pressable,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../redux/slices/authSlice";
import { firebaseConfig } from "../../firebase-config";
import { useTheme } from "../context/theme";

// Initialize Firebase
initializeApp(firebaseConfig);

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { theme, switchTheme, appearance } = useTheme();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    dispatch(loginStart());

    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      await AsyncStorage.setItem("authToken", token);
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        })
      );
      dispatch(
        loginSuccess({
          user: {
            email: userCredential.user.email,
            uid: userCredential.user.uid,
          },
          token,
        })
      );
      navigation.navigate("AppTabs");
    } catch (err) {
      dispatch(loginFailure(err.message));
      Alert.alert("Error", err.message);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={{ alignItems: "center" }}>
        <Image
          source={
            appearance === "dark"
              ? require("../../assets/gifs/dark-login.gif")
              : require("../../assets/gifs/login.gif")
          }
          style={{ width: 300, height: 300 }}
        />
      </View>
      <Text style={[styles.title, { color: theme.colors.primary }]}>Login</Text>
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
          secureTextEntry={!showPassword}
          placeholderTextColor={theme.text().secondaryVariant}
        />
        <TouchableOpacity
          onPress={handleTogglePasswordVisibility}
          style={styles.icon}
        >
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={20}
            color={theme.colors.secondary}
          />
        </TouchableOpacity>
      </View>
      {error && (
        <Text style={[styles.error, { color: theme.colors.error }]}>
          {error}
        </Text>
      )}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={theme.colors.onPrimary} />
        ) : (
          <Text style={[styles.buttonText, { color: theme.colors.onPrimary }]}>
            Login
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("ForgotPassword")}
        style={styles.link}
      >
        <Text style={[styles.linkText, { color: theme.colors.primary }]}>
          Forgot Password?
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        style={styles.link}
      >
        <Text style={[styles.linkText, { color: theme.colors.primary }]}>
          Don't have an account? Register
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
