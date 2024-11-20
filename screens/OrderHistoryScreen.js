import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const orders = [
  { id: '1', date: '2024-11-10', total: 120.0, status: 'Delivered' },
  { id: '2', date: '2024-11-15', total: 80.0, status: 'Pending' },
];

export default function OrderHistoryScreen() {
  const renderOrder = ({ item }) => (
    <View style={styles.order}>
      <Text style={styles.orderText}>Order ID: {item.id}</Text>
      <Text style={styles.orderText}>Date: {item.date}</Text>
      <Text style={styles.orderText}>Total: {item.total}€</Text>
      <Text style={styles.orderText}>Status: {item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order History</Text>
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  list: { paddingBottom: 16 },
  order: { backgroundColor: '#fff', padding: 16, marginBottom: 16, borderRadius: 8 },
  orderText: { fontSize: 16, marginBottom: 4 },
});
