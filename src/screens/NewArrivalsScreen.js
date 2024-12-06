import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/theme"; // Import theme context

export default function NewArrivalsScreen() {
  const { theme } = useTheme(); // Access the theme from context

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={[styles.text, { color: theme.text().primary }]}>
        Coming soon
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
