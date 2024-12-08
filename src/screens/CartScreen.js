import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useCart } from "../context/CartContext";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useTheme } from "../context/theme";
import { useSelector } from "react-redux"; // Import to access user email from Redux store
import { sendPushNotification } from "../services/pushNotifService";

export default function CartScreen() {
  const pushNotifToken = useSelector((state) => state.auth.pushNotifToken);
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigation = useNavigation();
  const { theme } = useTheme();

  // Get authenticated user's email from Redux store
  const userEmail = useSelector((state) => state.auth?.user?.email);

  // useEffect(() => {
  //   registerForPushNotificationsAsync();
  // }, []);

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const sendConfirmationEmail = async () => {
    try {
      const response = await fetch("http://192.168.1.26:3000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: userEmail, // Send email to the authenticated user
          name: "Valued Customer", // Replace with dynamic name if available
          orderDetails: cartItems,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        Alert.alert("Error", `Error sending email: ${errorText}`);
        return;
      }

      Alert.alert(
        "Success",
        "A confirmation email has been sent successfully!"
      );
    } catch (error) {
      Alert.alert("Error", `Unable to send email: ${error.message}`);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert("Error", "Your shopping cart is empty.");
      return;
    }

    Alert.alert(
      "Confirmation",
      "Are you sure you want to place the order?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: async () => {
            await sendPushNotification(pushNotifToken, {
              title: "Order Confirmation",
              body: "Your order has been placed successfully!",
            });
            sendConfirmationEmail();
            clearCart();
            // navigation.navigate("OrderConfirmation");
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.cartItem,
        {
          backgroundColor: theme.colors.surface,
          shadowColor: theme.colors.primary,
        },
      ]}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.itemDetails}>
        <Text style={[styles.itemName, { color: theme.text().primary }]}>
          {item.name}
        </Text>
        <Text style={[styles.itemPrice, { color: theme.text().secondary }]}>
          {item.price}€
        </Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={[
              styles.quantityButton,
              item.quantity <= 1 && styles.disabledButton,
              {
                backgroundColor:
                  item.quantity <= 1
                    ? theme.colors.disabled
                    : theme.colors.primaryVariant,
              },
            ]}
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <Text
              style={[
                styles.quantityButtonText,
                { color: theme.colors.onSurface },
              ]}
            >
              -
            </Text>
          </TouchableOpacity>
          <Text style={[styles.quantityValue, { color: theme.text().primary }]}>
            {item.quantity}
          </Text>
          <TouchableOpacity
            style={[
              styles.quantityButton,
              { backgroundColor: theme.colors.primaryVariant },
            ]}
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Text
              style={[
                styles.quantityButtonText,
                { color: theme.colors.onSurface },
              ]}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.removeButton, { backgroundColor: theme.colors.error }]}
        onPress={() => removeFromCart(item.id)}
      >
        <Ionicons name="trash-outline" size={24} color={theme.colors.onError} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={[styles.title, { color: theme.colors.primary }]}>
        My Cart
      </Text>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.cartList}
          />
          <Text style={[styles.totalText, { color: theme.text().primary }]}>
            Total : {getTotalPrice()}€
          </Text>
          <TouchableOpacity
            style={[
              styles.checkoutButton,
              { backgroundColor: theme.colors.primary },
            ]}
            onPress={handleCheckout}
          >
            <Text
              style={[
                styles.checkoutButtonText,
                { color: theme.colors.onPrimary },
              ]}
            >
              Checkout
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={[styles.emptyText, { color: theme.text().secondary }]}>
          Your shopping cart is empty.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  cartList: {
    paddingBottom: 16,
  },
  cartItem: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
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
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 16,
    marginVertical: 4,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  quantityButton: {
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  disabledButton: {
    backgroundColor: "#f0f0f0",
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 8,
  },
  removeButton: {
    padding: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 16,
    textAlign: "center",
  },
  checkoutButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyText: {
    fontSize: 18,
    textAlign: "center",
    margin: "auto",
    fontWeight: "bold",
  },
});
