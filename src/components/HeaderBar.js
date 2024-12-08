import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Animated,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useColorScheme } from "react-native";
import { useTheme } from "../context/theme";

export default function HeaderBar({ onSearch }) {
  const { theme } = useTheme(); // Access theme from context
  const colorScheme = useColorScheme(); // Detect the current theme
  const iconColor = colorScheme === "dark" ? "#fff" : "#000";
  const backgroundColor = colorScheme === "dark" ? "#333" : "#f9f9f9";

  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showSystemNotification, setShowSystemNotification] = useState(false);
  const notificationOpacity = useState(new Animated.Value(0))[0];

  // Add system theme change as a notification
  useEffect(() => {
    if (colorScheme) {
      const message = `System theme changed to ${
        colorScheme === "dark" ? "Dark" : "Light"
      } mode.`;
      setNotifications((prev) => [
        ...prev,
        { id: Date.now().toString(), message },
      ]);
      setNotificationCount((prev) => prev + 1);

      // Animate system notification
      setShowSystemNotification(true);
      Animated.timing(notificationOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(notificationOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start(() => setShowSystemNotification(false));
        }, 3000);
      });
    }
  }, [colorScheme]);

  // Open notification modal
  const handleNotificationClick = () => {
    setShowNotificationModal(true);
    setNotificationCount(0); // Reset notification count
  };

  // Close notification modal
  const closeNotificationModal = () => {
    setShowNotificationModal(false);
  };

  // Render individual notification
  const renderNotification = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationText}>{item.message}</Text>
    </View>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Left Icon */}
      {/* <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="mail-outline" size={24} color={theme.colors.primary} />
      </TouchableOpacity> */}

      {/* Search Bar */}
      <View
        style={[styles.searchBar, { backgroundColor: theme.colors.background }]}
      >
        <TextInput
          style={[styles.searchInput, { color: theme.colors.primary }]}
          placeholder="Search products..."
          placeholderTextColor={theme.colors.primaryVariant}
          onChangeText={onSearch}
        />
        <TouchableOpacity style={styles.searchIcon}>
          <Ionicons
            name="search-outline"
            size={20}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={handleNotificationClick}
      >
        <Ionicons
          name="notifications-outline"
          size={24}
          color={theme.colors.primary}
        />
        {notificationCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{notificationCount}</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Notification Modal */}
      <Modal
        visible={showNotificationModal}
        animationType="slide"
        transparent={true}
        onRequestClose={closeNotificationModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Notifications</Text>
            <FlatList
              data={notifications}
              renderItem={renderNotification}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.notificationList}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeNotificationModal}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  iconButton: {
    marginHorizontal: 8,
    position: "relative",
  },
  badge: {
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "red",
    borderRadius: 10,
    width: 12,
    height: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 7,
    fontWeight: "bold",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  notificationList: {
    width: "100%",
  },
  notificationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  notificationText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  systemNotification: {
    position: "absolute",
    top: 60,
    left: "10%",
    right: "10%",
    backgroundColor: "#007bff",
    padding: 8,
    borderRadius: 8,
  },
});
