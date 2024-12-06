import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./src/screens/HomeScreen";
import CartScreen from "./src/screens/CartScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import CategoriesScreen from "./src/screens/CategoriesScreen";
import NewArrivalsScreen from "./src/screens/NewArrivalsScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import { useTheme } from "./src/context/theme"; // Import the theme context
import { useCart } from "./src/context/CartContext";

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  const { cartItems, getTotalQuantity } = useCart();
  const { theme } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Categories") {
              iconName = focused ? "search" : "search-outline";
            } else if (route.name === "New Arrivals") {
              iconName = focused ? "pricetag" : "pricetag-outline";
            } else if (route.name === "Cart") {
              iconName = focused ? "cart" : "cart-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "settings" : "settings-outline";
            }

            return (
              <View>
                <Ionicons name={iconName} size={size} color={color} />
                {route.name === "Cart" && getTotalQuantity() > 0 && (
                  <View
                    style={[
                      styles.badge,
                      { backgroundColor: theme.colors.error }, // Dynamic badge color
                    ]}
                  >
                    <Text
                      style={[
                        styles.badgeText,
                        { color: theme.colors.onError },
                      ]}
                    >
                      {getTotalQuantity()}
                    </Text>
                  </View>
                )}
              </View>
            );
          },
          tabBarActiveTintColor: theme.custom.bottomNavigation.activeIconText,
          tabBarInactiveTintColor:
            theme.custom.bottomNavigation.inactiveIconsText,
          tabBarStyle: {
            backgroundColor: theme.custom.bottomNavigation.container, // Dynamic background
          },
          headerShown: false, // Disable the header for all screens
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Categories" component={CategoriesScreen} />
        <Tab.Screen name="New Arrivals" component={NewArrivalsScreen} />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarBadge: cartItems.length > 0 ? cartItems.length : null, // Show badge if cart is not empty
          }}
        />
        {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  badge: {
    position: "absolute",
    right: -6,
    top: -3,
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "bold",
  },
});
