import React from "react";
import { SafeAreaView, View, Text, Image, StyleSheet } from "react-native";
import { useTheme } from "../context/theme";

export default function ProductDetailsScreen({ route }) {
  const { theme } = useTheme();
  const { product } = route.params;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Image
        source={{ uri: product.image }}
        style={[styles.image, { borderColor: theme.colors.primary }]}
      />
      <Text style={[styles.name, { color: theme.colors.primary }]}>
        {product.name}
      </Text>
      <Text style={[styles.price, { color: theme.colors.success }]}>
        {product.price}€
      </Text>
      <Text
        style={[
          styles.description,
          {
            color: theme.text().primary,
            backgroundColor: theme.colors.surface,
          },
        ]}
      >
        Description : Ce produit est parfait pour vos besoins.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 2,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    padding: 8,
    borderRadius: 8,
  },
});
