// screens/CategoryDetailsScreen.js
import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const productsByCategory = {
  Electronics: [
    { id: '1', name: 'Smartphone', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaGKIyT4KvMOwvaNHEv9vg1qc0evcKk6I7Zg&s', price: 699 },
    { id: '2', name: 'Laptop', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdAXPtSnVqHTySoPjYWuc8BIH8UYiQxgOdPw&s', price: 1199 },
    { id: '3', name: 'Headphones', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaQ-3gTADTOvsJPCGHvDq16mHmNqJyGKBlYw&s', price: 199 },
  ],
  Clothing: [
    { id: '1', name: 'T-shirt', image: 'https://media.istockphoto.com/id/1354020635/fr/photo/maquette-de-t-shirt-blanc-%C3%A0-lavant-utilis%C3%A9e-comme-mod%C3%A8le-de-conception-tee-shirt-vierge.jpg?s=612x612&w=0&k=20&c=1gYynp16WaKxwEhbFuEaj-T4gEp2VzO5-QiekiIZsnk=', price: 25 },
    { id: '2', name: 'Jeans', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCPlmDND7bNEWoX1SZ5jgeIYhPjmygUBQXEw&s', price: 49 },
    { id: '3', name: 'Sneakers', image: 'https://img.freepik.com/photos-gratuite/chaussure-sneaker-blanche-isolee-blanc_93675-134695.jpg', price: 89 },
  ],
  'Home & Furniture': [
    { id: '1', name: 'Sofa', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs03DMTNR_wt6BGRltrEcnhkAO5fQeLgERGw&s', price: 799 },
    { id: '2', name: 'Dining Table', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRZ9wSyCZtOtbzjVnA4xAat72hTSfkQFtsfQ&s', price: 499 },
    { id: '3', name: 'Bed', image: 'https://t4.ftcdn.net/jpg/03/01/55/35/360_F_301553576_RvR2BK8yYUDhS0Kmy58N4jV1VUFK9MXQ.jpg', price: 999 },
  ],
  'Beauty & Personal Care': [
    { id: '1', name: 'Moisturizer', image: 'https://imagebeauty.ie/wp-content/uploads/2021/01/CLEAR_CELL_mattifying_moisturizer_PDP_R01a.webp', price: 20 },
    { id: '2', name: 'Perfume', image: 'https://facesbeauty.ma/media/catalog/product/cache/a82f6149949ce966d5f9b27683c1881e/1/7/17213597525_fiupcio7qtshlzcz.jpg', price: 50 },
    { id: '3', name: 'Hair Dryer', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW8FfsMR-g6mTMzuIEclXPL5p0yS-qzFpoJA&s', price: 35 },
  ],
  'Sports & Outdoors': [
    { id: '1', name: 'Bicycle', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTE9l1S9jsGvBOEBARUAm1mZbgfGgRQp4NEg&s', price: 250 },
    { id: '2', name: 'Tennis Racket', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJgOiZqVyCLsDEiAFKtKdPR0W56ZZzBAre2A&s', price: 100 },
    { id: '3', name: 'Yoga Mat', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUY64VZ2_5Z05lA6X7wyBtD1h9r0cqGZa0Ew&s', price: 30 },
  ],
};

export default function CategoryDetailsScreen({ route }) {
  const { category } = route.params;
  const products = productsByCategory[category.name] || [];

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}€</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category.name}</Text>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 16,
  },
  productCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  productImage: {
    width: 150,
    height: 110,
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#007bff',
  },
});
