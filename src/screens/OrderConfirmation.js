import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/theme";

export default function OrderConfirmation() {
  const navigation = useNavigation();
  const { theme } = useTheme(); // Access the theme

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background }, // Dynamic background
      ]}
    >
      <Text style={[styles.title, { color: theme.colors.primary }]}>
        Thank you for your order!
      </Text>
      <Text
        style={[
          styles.message,
          { color: theme.text().secondary }, // Dynamic text color
        ]}
      >
        Your order has been placed successfully. You will receive a confirmation
        email shortly.
      </Text>
      <TouchableOpacity
        style={[
          styles.backButton,
          { backgroundColor: theme.colors.primary }, // Dynamic button color
        ]}
        onPress={() => navigation.navigate("AppTabs", { screen: "Home" })}
      >
        <Text
          style={[
            styles.backButtonText,
            { color: theme.colors.onPrimary }, // Dynamic button text color
          ]}
        >
          Return to the store
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
  },
  backButton: {
    padding: 16,
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
