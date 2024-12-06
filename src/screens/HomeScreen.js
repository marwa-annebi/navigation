import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import HeaderBar from "../components/HeaderBar";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/theme";
import { products } from "../../assets/data/products";

const itemsPerPage = 6; // Increased number of items per page for better layout

export default function HomeScreen() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [priceRange, setPriceRange] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { addToCart } = useCart();
  const navigation = useNavigation();
  const { cartItems } = useCart();

  const handleSearch = (searchTerm) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterProducts(category, priceRange);
    setCurrentPage(1);
  };

  const handlePriceChange = (range) => {
    setPriceRange(range);
    filterProducts(selectedCategory, range);
    setCurrentPage(1);
  };

  const filterProducts = (category = selectedCategory, range = priceRange) => {
    let filtered = products;

    if (category !== "All Categories") {
      filtered = filtered.filter((product) => product.category === category);
    }

    if (range && range !== "All Prices") {
      const [min, max] = range.split("-").map(Number);
      filtered = filtered.filter(
        (product) => product.price >= min && product.price <= max
      );
    }

    setFilteredProducts(filtered);
  };

  const handleAddToCart = (item) => {
    const cartItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (cartItem) {
      Alert.alert("Already in Cart", `${item.name} is already in the cart.`);
    } else {
      addToCart(item);
      Alert.alert("Product Added", `${item.name} has been added to the cart.`);
    }
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.productCard, { backgroundColor: theme.colors.surface }]}
      onPress={() => navigation.navigate("ProductDetails", { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={[styles.productName, { color: theme.text().primary }]}>
        {item.name}
      </Text>
      <Text style={[styles.productPrice, { color: theme.colors.primary }]}>
        {item.price}€
      </Text>
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
        onPress={() => handleAddToCart(item)}
      >
        <Text style={[styles.addButtonText, { color: theme.colors.onPrimary }]}>
          Add to Cart
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <HeaderBar onSearch={handleSearch} />

      {/* Filter Section */}
      <View style={styles.filterContainer}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={handleCategoryChange}
          style={[styles.picker, { backgroundColor: theme.colors.surface }]}
        >
          <Picker.Item
            label="All Categories"
            value="All Categories"
            color={theme.text().primary}
          />
          <Picker.Item
            label="Electronics"
            value="Electronics"
            color={theme.text().primary}
          />
          <Picker.Item
            label="Beauty & Personal Care"
            value="Beauty & Personal Care"
            color={theme.text().primary}
          />
          <Picker.Item
            label="Clothing"
            value="Clothing"
            color={theme.text().primary}
          />
          <Picker.Item
            label="Home & Furniture"
            value="Home & Furniture"
            color={theme.text().primary}
          />
          <Picker.Item
            label="Sports & Outdoors"
            value="Sports & Outdoors"
            color={theme.text().primary}
          />
        </Picker>

        <Picker
          selectedValue={priceRange}
          onValueChange={handlePriceChange}
          style={[styles.picker, { backgroundColor: theme.colors.surface }]}
        >
          <Picker.Item label="All Prices" value="All Prices" />
          <Picker.Item label="0€ - 50€" value="0-50" />
          <Picker.Item label="51€ - 200€" value="51-200" />
          <Picker.Item label="201€ - 10000€" value="201-10000" />
        </Picker>
      </View>

      {/* Product List */}
      <FlatList
        data={paginatedProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2} // Display products in grid
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.productList}
      />

      {/* Pagination */}
      <View style={styles.pagination}>
        <TouchableOpacity
          onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={
              currentPage === 1 ? theme.colors.disabled : theme.colors.primary
            }
          />
        </TouchableOpacity>
        <Text style={[styles.pageText, { color: theme.text().primary }]}>
          {currentPage}
        </Text>
        <TouchableOpacity
          onPress={() =>
            setCurrentPage((prev) =>
              currentPage * itemsPerPage < filteredProducts.length
                ? prev + 1
                : prev
            )
          }
          disabled={currentPage * itemsPerPage >= filteredProducts.length}
        >
          <Ionicons
            name="arrow-forward"
            size={24}
            color={
              currentPage * itemsPerPage >= filteredProducts.length
                ? theme.colors.disabled
                : theme.colors.primary
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
    padding: 16,
    marginTop: 50,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  picker: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 8,
  },
  productList: {
    paddingBottom: 16,
  },
  row: {
    justifyContent: "space-between",
  },
  productCard: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  productImage: {
    width: 120,
    height: 120,
    marginBottom: 8,
    borderRadius: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  addButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  pageText: {
    marginHorizontal: 16,
    fontSize: 16,
  },
});
