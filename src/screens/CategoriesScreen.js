import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HeaderBar from "../components/HeaderBar";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/theme";

const categories = [
  { id: "1", name: "Electronics", icon: "tv-outline" },
  { id: "2", name: "Clothing", icon: "shirt-outline" },
  { id: "3", name: "Home & Furniture", icon: "bed-outline" },
  { id: "4", name: "Beauty & Personal Care", icon: "heart-outline" },
  { id: "5", name: "Sports & Outdoors", icon: "bicycle-outline" },
];

export default function CategoriesScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme(); // Access theme
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category.id); // Highlight selected category
    navigation.navigate("CategoryDetails", { category }); // Navigate to details
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        {
          backgroundColor:
            item.id === selectedCategory
              ? theme.colors.primary
              : theme.colors.surface,
        },
        item.id === selectedCategory && styles.selectedCategoryCard,
      ]}
      onPress={() => handleSelectCategory(item)}
    >
      <Ionicons
        name={item.icon}
        size={30}
        color={
          item.id === selectedCategory
            ? theme.colors.onPrimary
            : theme.colors.primary
        }
      />
      <Text
        style={[
          styles.categoryName,
          {
            color:
              item.id === selectedCategory
                ? theme.colors.onPrimary
                : theme.text().primary,
          },
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <HeaderBar onSearch={handleSearch} />
      <Text style={[styles.title, { color: theme.colors.primary }]}>
        Categories
      </Text>

      <FlatList
        data={filteredCategories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  list: {
    paddingBottom: 16,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  categoryCard: {
    borderRadius: 12,
    padding: 20,
    flex: 1,
    marginHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  selectedCategoryCard: {
    shadowColor: "#007bff",
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  categoryName: {
    fontSize: 16,
    marginTop: 8,
    textAlign: "center",
  },
});
