import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useCart } from '../context/CartContext';

export default function WishlistScreen() {
  const { wishlistItems, addToCart, removeFromWishlist } = useCart();

  const handleAddToCart = (item) => {
    addToCart(item);
    Alert.alert('Added to Cart', `${item.name} has been added to your cart.`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}€</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => handleAddToCart(item)} style={styles.button}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removeFromWishlist(item.id)} style={styles.removeButton}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Wishlist</Text>
      <FlatList
        data={wishlistItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  list: { paddingBottom: 16 },
  item: { flexDirection: 'row', backgroundColor: '#fff', marginBottom: 16, padding: 16, borderRadius: 8 },
  image: { width: 80, height: 80, borderRadius: 8, marginRight: 16 },
  details: { flex: 1 },
  name: { fontSize: 18, fontWeight: 'bold' },
  price: { fontSize: 16, color: '#007bff', marginVertical: 8 },
  actions: { flexDirection: 'row', justifyContent: 'space-between' },
  button: { backgroundColor: '#28a745', padding: 8, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  removeButton: { backgroundColor: '#ff4d4d', padding: 8, borderRadius: 8 },
  removeButtonText: { color: '#fff', fontWeight: 'bold' },
});
