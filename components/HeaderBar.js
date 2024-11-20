import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HeaderBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (text) => {
    setSearchTerm(text);
    if (onSearch) {
      onSearch(text); // Pass the updated search term to the parent
    }
  };

  return (
    <View style={styles.container}>
      {/* Left Icons */}
      <View style={styles.leftIcons}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="mail-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="calendar-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          placeholderTextColor="#ccc"
          value={searchTerm}
          onChangeText={handleSearch}
        />
        {/* <TextInput
  placeholder="Search categories..."
  onChangeText={(text) => props.onSearch(text)}
  style={styles.searchInput}
/> */}
        <TouchableOpacity style={styles.searchIcon}>
          <Ionicons name="search-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Right Icons */}
      <View style={styles.rightIcons}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="camera-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="heart-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#b10000',
  },
  leftIcons: {
    flexDirection: 'row',
  },
  rightIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginHorizontal: 5,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#800000',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 10,
  },
});
