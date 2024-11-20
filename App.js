import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppTabs from './AppTabs';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import OrderConfirmation from './screens/OrderConfirmation';
import { CartProvider } from './context/CartContext';
import CategoriesScreen from './screens/CategoriesScreen';
import CategoryDetailsScreen from './screens/CategoryDetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider> {/* CartProvider must wrap the NavigationContainer */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AppTabs">
          {/* Login & Register Screens */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          
          {/* App Tabs */}
          <Stack.Screen
            name="AppTabs"
            component={AppTabs}
            options={{ headerShown: false }}
          />
          
          {/* Product Details */}
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetailsScreen}
            options={{ title: 'Product Details' }}
          />

          {/* Order Confirmation */}
          <Stack.Screen 
            name="OrderConfirmation" 
            component={OrderConfirmation} 
          />
          
          {/* Categories and Details */}
          <Stack.Screen name="Categories" component={CategoriesScreen} />
          <Stack.Screen name="CategoryDetails" component={CategoryDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}



