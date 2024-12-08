import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HeaderBar from "../components/HeaderBar";
import { Picker as CategoryPicker } from "@react-native-picker/picker";
import { useTheme } from "../context/theme";
import { productsByCategory } from "../../assets/data/productCategory";
import { SafeAreaView } from "react-native-safe-area-context";

const itemsPerPage = 4;

export default function CategoryDetailsScreen({ route, navigation }) {
  const { theme } = useTheme();
  const { category } = route.params;
  const allProducts = productsByCategory[category.name] || [];

  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState("");

  const handleSearch = (searchTerm) => {
    const filtered = allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handlePriceFilter = (range) => {
    setPriceRange(range);
    let filtered = allProducts;

    if (!range || range === "All Prices") {
      setFilteredProducts(allProducts);
    } else {
      const [min, max] = range.split("-").map(Number);
      filtered = allProducts.filter(
        (product) => product.price >= min && product.price <= max
      );
      setFilteredProducts(filtered);
    }

    setCurrentPage(1);
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderProduct = ({ item }) => (
    <View
      style={[
        styles.productCard,
        {
          backgroundColor: theme.colors.surface,
          shadowColor: theme.colors.shadow,
        },
      ]}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={[styles.productName, { color: theme.text().primary }]}>
        {item.name}
      </Text>
      <Text style={[styles.productPrice, { color: theme.colors.primary }]}>
        {item.price}€
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View
        style={[styles.header, { borderBottomColor: theme.colors.onSecondary }]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text().primary }]}>
          {category.name}
        </Text>
      </View>

      <HeaderBar showNotif={false} onSearch={handleSearch} />

      {/* Price Filter */}
      <CategoryPicker
        selectedValue={priceRange}
        onValueChange={handlePriceFilter}
        style={[
          styles.picker,
          {
            backgroundColor: theme.colors.surface,
            color: theme.text().primary,
          },
        ]}
      >
        <CategoryPicker.Item
          color={theme.text().primary}
          label="All Prices"
          value="All Prices"
        />
        <CategoryPicker.Item
          color={theme.text().primary}
          label="0€ - 50€"
          value="0-50"
        />
        <CategoryPicker.Item
          color={theme.text().primary}
          label="51€ - 200€"
          value="51-200"
        />
        <CategoryPicker.Item
          color={theme.text().primary}
          label="201€ - 1000€"
          value="201-1000"
        />
      </CategoryPicker>

      {/* Product List */}
      <FlatList
        data={paginatedProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
  },
  picker: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  list: {
    paddingBottom: 16,
  },
  productCard: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    alignItems: "center",
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
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 16,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  pageText: {
    marginHorizontal: 20,
    fontSize: 18,
  },
});
