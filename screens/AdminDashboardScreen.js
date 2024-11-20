import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function AdminDashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ManageProducts')}>
        <Text style={styles.buttonText}>Manage Products</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ManageOrders')}>
        <Text style={styles.buttonText}>Manage Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ManageUsers')}>
        <Text style={styles.buttonText}>Manage Users</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  button: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
