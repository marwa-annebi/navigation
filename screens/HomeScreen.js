import React, { useState } from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import HeaderBar from '../components/HeaderBar';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
// Product Data
const products = [
  { id: '1', name: 'Produit 1', price: 20.0, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfYZDOa_VxElvv9quS78xD8KladFy6UjWdeg&s', category: 'Beauty & Personal Care' },
  { id: '2', name: 'Produit 2', price: 35.0, image: 'https://www.pngarts.com/files/3/Smartphone-Mobile-PNG-Image-Background.png', category: 'Electronics' },
  { id: '3', name: 'Produit 3', price: 15.0, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoHmIlyUs263pB7xpVsjzLL_eWbds4VZt4IA&s', category: 'Beauty & Personal Care' },
  { id: '4', name: 'Smartphone', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaGKIyT4KvMOwvaNHEv9vg1qc0evcKk6I7Zg&s', price: 699, category: 'Electronics' },
  { id: '5', name: 'Laptop', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdAXPtSnVqHTySoPjYWuc8BIH8UYiQxgOdPw&s', price: 1199, category: 'Electronics' },
  { id: '6', name: 'Headphones', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaQ-3gTADTOvsJPCGHvDq16mHmNqJyGKBlYw&s', price: 199, category: 'Electronics' },
 
  { id: '7', name: 'T-shirt', image: 'https://media.istockphoto.com/id/1354020635/fr/photo/maquette-de-t-shirt-blanc-%C3%A0-lavant-utilis%C3%A9e-comme-mod%C3%A8le-de-conception-tee-shirt-vierge.jpg?s=612x612&w=0&k=20&c=1gYynp16WaKxwEhbFuEaj-T4gEp2VzO5-QiekiIZsnk=', price: 25, category: 'Clothing' },
  { id: '8', name: 'Jeans', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCPlmDND7bNEWoX1SZ5jgeIYhPjmygUBQXEw&s', price: 49, category: 'Clothing' },
  { id: '9', name: 'Sneakers', image: 'https://img.freepik.com/photos-gratuite/chaussure-sneaker-blanche-isolee-blanc_93675-134695.jpg', price: 89, category: 'Clothing' },

  { id: '10', name: 'Sofa', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs03DMTNR_wt6BGRltrEcnhkAO5fQeLgERGw&s', price: 799, category: 'Home & Furniture' },
  { id: '11', name: 'Dining Table', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRZ9wSyCZtOtbzjVnA4xAat72hTSfkQFtsfQ&s', price: 499, category: 'Home & Furniture' },
  { id: '12', name: 'Bed', image: 'https://t4.ftcdn.net/jpg/03/01/55/35/360_F_301553576_RvR2BK8yYUDhS0Kmy58N4jV1VUFK9MXQ.jpg', price: 999, category: 'Home & Furniture' },

  { id: '13', name: 'Moisturizer', image: 'https://imagebeauty.ie/wp-content/uploads/2021/01/CLEAR_CELL_mattifying_moisturizer_PDP_R01a.webp', price: 20, category: 'Beauty & Personal Care' },
  { id: '14', name: 'Perfume', image: 'https://facesbeauty.ma/media/catalog/product/cache/a82f6149949ce966d5f9b27683c1881e/1/7/17213597525_fiupcio7qtshlzcz.jpg', price: 50, category: 'Beauty & Personal Care' },
  { id: '15', name: 'Hair Dryer', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW8FfsMR-g6mTMzuIEclXPL5p0yS-qzFpoJA&s', price: 35, category: 'Beauty & Personal Care' },

  { id: '16', name: 'Bicycle', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTE9l1S9jsGvBOEBARUAm1mZbgfGgRQp4NEg&s', price: 250, category: 'Sports & Outdoors' },
  { id: '17', name: 'Tennis Racket', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJgOiZqVyCLsDEiAFKtKdPR0W56ZZzBAre2A&s', price: 100, category: 'Sports & Outdoors' },
  { id: '18', name: 'Yoga Mat', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUY64VZ2_5Z05lA6X7wyBtD1h9r0cqGZa0Ew&s', price: 30, category: 'Sports & Outdoors' },
];

const itemsPerPage = 3; // Number of items to display per page

export default function HomeScreen() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [priceRange, setPriceRange] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { addToCart } = useCart();
  const { theme, toggleTheme, useSystemTheme } = useTheme();
    const navigation = useNavigation(); // Navigation hook
    const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const handleSearch = (searchTerm) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterProducts(category, priceRange);
    setCurrentPage(1); // Reset to first page on category change
  };

  const handlePriceChange = (range) => {
    setPriceRange(range);
    filterProducts(selectedCategory, range);
    setCurrentPage(1); // Reset to first page on price range change
  };

  const filterProducts = (category = selectedCategory, range = priceRange) => {
    let filtered = products;

    // Filter by category
    if (category !== 'All Categories') {
      filtered = filtered.filter((product) => product.category === category);
    }

    // Filter by price range
    if (range && range !== 'All Prices') {
      const [min, max] = range.split('-').map(Number);
      filtered = filtered.filter((product) => product.price >= min && product.price <= max);
    }

    setFilteredProducts(filtered);
  };


  const handleAddToCart = (item) => {
    // Check if the product already exists in the cart
    const cartItem = cartItems.find((cartItem) => cartItem.id === item.id);
    
    if (cartItem) {
      Alert.alert('Already in Cart', `${item.name} is already in the cart.`);
    } else {
      addToCart(item);
      Alert.alert('Product Added', `${item.name} has been added to the cart.`);
    }
  };
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  const renderItem = ({ item }) => (
    <View style={styles.productCard}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetails', { product: item })}
      >
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}€</Text>
      </TouchableOpacity>
 <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item)}>
    <Text style={styles.addButtonText}>Add To Cart</Text>
  </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      {/* HeaderBar with search */}
      <HeaderBar onSearch={handleSearch} />

      {/* Category Picker */}
      <Picker
        selectedValue={selectedCategory}
        onValueChange={handleCategoryChange}
        style={styles.picker}
      >
          <Picker.Item label="All Categories" value="All Categories" />
        <Picker.Item label="Electronics" value="Electronics" />
        <Picker.Item label="Beauty & Personal Care" value="Beauty & Personal Care" />
        <Picker.Item label="Clothing" value="Clothing" />
        <Picker.Item label="Home & Furniture" value="Home & Furniture" />
        <Picker.Item label="Sports & Outdoors" value="Sports & Outdoors" />
      </Picker>
      {/* Price Range Picker */}
      <Picker
        selectedValue={priceRange}
        onValueChange={handlePriceChange}
        style={styles.picker}
      >
        <Picker.Item label="All Prices" value="All Prices" />
        <Picker.Item label="0€ - 50€" value="0-50" />
        <Picker.Item label="51€ - 200€" value="51-200" />
        <Picker.Item label="201€ - 10000€" value="201-10000" />
      </Picker>

      {/* Product List */}
      <FlatList
        data={paginatedProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
      />

      {/* Pagination */}
      <View style={styles.pagination}>
        <TouchableOpacity
          onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <Ionicons name="arrow-back" size={24} color={currentPage === 1 ? '#ccc' : '#007bff'} />
        </TouchableOpacity>
        <Text style={styles.pageText}>{currentPage}</Text>
        <TouchableOpacity
          onPress={() =>
            setCurrentPage((prev) =>
              currentPage * itemsPerPage < filteredProducts.length ? prev + 1 : prev
            )
          }
          disabled={currentPage * itemsPerPage >= filteredProducts.length}
        >
          <Ionicons
            name="arrow-forward"
            size={24}
            color={
              currentPage * itemsPerPage >= filteredProducts.length ? '#ccc' : '#007bff'
            }
          />
        </TouchableOpacity>
      </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    marginTop: 50,
  },
  picker: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  productImage: {
    width: 200,
    height: 150,
    marginBottom: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#007bff',
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  pageText: {
    marginHorizontal: 20,
    fontSize: 18,
  },
  light: {
    backgroundColor: '#fff',
  },
  dark: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#007bff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  infoText: {
    marginTop: 20,
    fontSize: 16,
    color: '#007bff',
  },
});
