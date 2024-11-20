import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useCart } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { registerForPushNotificationsAsync, sendLocalNotification } from '../services/notificationService';

export default function CartScreen() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigation = useNavigation();

  // Initialiser les notifications lors du montage du composant
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const sendConfirmationEmail = async () => {
    try {
      const response = await fetch('http://192.168.1.17:3000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@user.com', // Remplacez par l'email du client
          name: 'Client Test', // Nom du client
          orderDetails: cartItems, // Détails de la commande
        }),
      });

      if (response.ok) {
        Alert.alert('Succès', 'Un email de confirmation a été envoyé.');
      } else {
        Alert.alert('Erreur', 'Erreur lors de l\'envoi de l\'email.');
      }
    } catch (error) {
      console.error('Erreur :', error);
      Alert.alert('Erreur', 'Impossible d\'envoyer l\'email.');
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Erreur', 'Votre panier est vide.');
      return;
    }

    Alert.alert(
      'Confirmation',
      'Êtes-vous sûr de vouloir passer la commande ?',
      [
        {
          text: 'Annuler',
          style: 'cancel', // Ne fait rien si annulé
        },
        {
          text: 'Confirmer',
          onPress: () => {
            sendLocalNotification(
              'Commande confirmée !',
              'Merci pour votre commande. Vous recevrez une confirmation sous peu.'
            ); // Envoyer une notification
            sendConfirmationEmail(); // Envoyer un email
            clearCart(); // Vider le panier
            navigation.navigate('OrderConfirmation'); // Naviguer vers l'écran de confirmation
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price}€</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={[styles.quantityButton, item.quantity <= 1 && styles.disabledButton]}
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => {
          removeFromCart(item.id);
          Alert.alert('Info', `${item.name} a été supprimé du panier.`);
        }}
      >
        <Ionicons name="trash-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon Panier</Text>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.cartList}
          />
          <Text style={styles.totalText}>Total : {getTotalPrice()}€</Text>
          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <Text style={styles.checkoutButtonText}>Passer la commande</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.emptyText}>Votre panier est vide.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cartList: {
    paddingBottom: 16,
  },
  cartItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: '#555',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    backgroundColor: '#e0e0e0',
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  disabledButton: {
    backgroundColor: '#f0f0f0',
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 8,
  },
  removeButton: {
    backgroundColor: '#ff4d4d',
    padding: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  checkoutButton: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    marginTop: 16,
  },
});


