import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppTabs from "./AppTabs";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import ProductDetailsScreen from "./src/screens/ProductDetailsScreen";
import OrderConfirmation from "./src/screens/OrderConfirmation";
import { CartProvider } from "./src/context/CartContext";
import CategoriesScreen from "./src/screens/CategoriesScreen";
import CategoryDetailsScreen from "./src/screens/CategoryDetailsScreen";
import NotificationsScreen from "./src/screens/NotificationsScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./src/screens/ResetPasswordScreen";
import { Provider, useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAuthFromStorage } from "./src/redux/slices/authSlice";
import store from "./src/redux/store/store";
import { ThemeProvider } from "./src/context/theme";
import { darkTheme, lightTheme } from "./src/themes/theme";
import { Text } from "react-native";
import AccountCreatedScreen from "./src/screens/AccountCreatedScreen";

const Stack = createNativeStackNavigator();

// Wrapper Component to Load Auth State from Storage
const AppNavigator = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const user = await AsyncStorage.getItem("user");
        if (token && user) {
          dispatch(
            setAuthFromStorage({
              token,
              user: JSON.parse(user),
            })
          );
        }
      } catch (error) {
        console.error("Error checking auth state:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthState();
  }, [dispatch]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!isAuthenticated ? (
          <>
            {/* Public Routes */}
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPasswordScreen}
              options={{ title: "Reset Password" }}
            />
            <Stack.Screen
              name="AccountCreated"
              component={AccountCreatedScreen}
            />
          </>
        ) : (
          <>
            {/* Protected Routes */}
            <Stack.Screen
              name="AppTabs"
              component={AppTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProductDetails"
              component={ProductDetailsScreen}
              options={{ title: "Product Details" }}
            />
            <Stack.Screen
              name="OrderConfirmation"
              component={OrderConfirmation}
            />
            <Stack.Screen
              name="Notifications"
              component={NotificationsScreen}
              options={{ title: "Notifications" }}
            />
            <Stack.Screen name="Categories" component={CategoriesScreen} />
            <Stack.Screen
              name="CategoryDetails"
              component={CategoryDetailsScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Main App Component
export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme={lightTheme} darkTheme={darkTheme}>
        <CartProvider>
          <AppNavigator />
        </CartProvider>
      </ThemeProvider>
    </Provider>
  );
}
