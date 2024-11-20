import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function OrderConfirmation() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Merci pour votre commande !</Text>
      <Text style={styles.message}>
        Votre commande a été passée avec succès. Vous recevrez bientôt une confirmation par email.
      </Text>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('AppTabs', { screen: 'Home' })}
      >
        <Text style={styles.backButtonText}>Retour à la boutique</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
