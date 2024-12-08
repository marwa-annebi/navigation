import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useTheme } from "../context/theme";
import { SafeAreaView } from "react-native-safe-area-context";

const orders = [
  { id: "1", date: "2024-11-10", total: 120.0, status: "Delivered" },
  { id: "2", date: "2024-11-15", total: 80.0, status: "Pending" },
];

export default function OrderHistoryScreen() {
  const { theme } = useTheme(); // Access the theme

  const renderOrder = ({ item }) => (
    <SafeAreaView
      style={[styles.order, { backgroundColor: theme.colors.surface }]}
    >
      <Text style={[styles.orderText, { color: theme.text().primary }]}>
        Order ID: {item.id}
      </Text>
      <Text style={[styles.orderText, { color: theme.text().secondary }]}>
        Date: {item.date}
      </Text>
      <Text style={[styles.orderText, { color: theme.colors.primary }]}>
        Total: {item.total}€
      </Text>
      <Text
        style={[
          styles.orderText,
          {
            color:
              item.status === "Delivered"
                ? theme.colors.success
                : theme.colors.warning,
          },
        ]}
      >
        Status: {item.status}
      </Text>
    </SafeAreaView>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={[styles.title, { color: theme.colors.primary }]}>
        Order History
      </Text>
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  list: {
    paddingBottom: 16,
  },
  order: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderText: {
    fontSize: 16,
    marginBottom: 4,
  },
});
