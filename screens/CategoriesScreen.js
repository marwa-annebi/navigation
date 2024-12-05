import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HeaderBar from '../components/HeaderBar';
import { useNavigation } from '@react-navigation/native';

const categories = [
  { id: '1', name: 'Electronics', icon: 'tv-outline' },
  { id: '2', name: 'Clothing', icon: 'shirt-outline' },
  { id: '3', name: 'Home & Furniture', icon: 'bed-outline' },
  { id: '4', name: 'Beauty & Personal Care', icon: 'heart-outline' },
  { id: '5', name: 'Sports & Outdoors', icon: 'bicycle-outline' },
];

export default function CategoriesScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Function to handle search input
  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category.id); // Highlight the selected category
    navigation.navigate('CategoryDetails', { category }); // Navigate to details
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        item.id === selectedCategory ? styles.selectedCategoryCard : null,
      ]}
      onPress={() => handleSelectCategory(item)}
    >
      <Ionicons name={item.icon} size={30} color={item.id === selectedCategory ? '#fff' : '#007bff'} />
      <Text
        style={[
          styles.categoryName,
          item.id === selectedCategory ? styles.selectedCategoryName : null,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* HeaderBar with search functionality */}
      <HeaderBar onSearch={handleSearch} />

      {/* Selected Category Display */}
      {/* {selectedCategory && (
        <Text style={styles.selectedCategoryText}>
          Selected: {categories.find((cat) => cat.id === selectedCategory)?.name}
        </Text>
      )} */}

      <Text style={styles.title}>Catégories</Text>

      {/* Display filtered categories */}
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
    backgroundColor: '#f9f9f9',
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  selectedCategoryText: {
    fontSize: 18,
    color: '#007bff',
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    flex: 1,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  selectedCategoryCard: {
    backgroundColor: '#007bff',
  },
  categoryName: {
    fontSize: 16,
    color: '#555',
    marginTop: 8,
    textAlign: 'center',
  },
  selectedCategoryName: {
    color: '#fff',
  },
});


// import React, { useState } from 'react';
// import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import HeaderBar from '../components/HeaderBar';
// import { useNavigation } from '@react-navigation/native';

// const categories = [
//   { id: '1', name: 'Electronics', icon: 'tv-outline' },
//   { id: '2', name: 'Clothing', icon: 'shirt-outline' },
//   { id: '3', name: 'Home & Furniture', icon: 'bed-outline' },
//   { id: '4', name: 'Beauty & Personal Care', icon: 'heart-outline' },
//   { id: '5', name: 'Sports & Outdoors', icon: 'bicycle-outline' },
// ];

// export default function CategoriesScreen() {
//   const navigation = useNavigation();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredCategories, setFilteredCategories] = useState(categories);

//   // Function to handle search input
//   const handleSearch = (searchTerm) => {
//     setSearchQuery(searchTerm);
//     const filtered = categories.filter((category) =>
//       category.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredCategories(filtered);
//   };

//   const renderCategory = ({ item }) => (
//     <TouchableOpacity
//       style={styles.categoryCard}
//       onPress={() => navigation.navigate('CategoryDetails', { category: item })}
//     >
//       <Ionicons name={item.icon} size={30} color="#007bff" />
//       <Text style={styles.categoryName}>{item.name}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       {/* Search bar component */}
//       <HeaderBar onSearch={handleSearch} />
      
//       <Text style={styles.title}>Catégories</Text>
      
//       {/* Display filtered categories */}
//       <FlatList
//         data={filteredCategories}
//         renderItem={renderCategory}
//         keyExtractor={(item) => item.id}
//         numColumns={2}
//         columnWrapperStyle={styles.row}
//         contentContainerStyle={styles.list}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9f9f9',
//     marginTop: 50,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   list: {
//     paddingBottom: 16,
//   },
//   row: {
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   categoryCard: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 16,
//     flex: 1,
//     marginHorizontal: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//   },
//   categoryName: {
//     fontSize: 16,
//     color: '#555',
//     marginTop: 8,
//     textAlign: 'center',
//   },
// });
