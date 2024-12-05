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
import { ThemeProvider } from './context/ThemeContext';
import NotificationsScreen from './screens/NotificationsScreen'; // Import the screen
import { Provider } from 'react-redux';
import store from './store/store';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <CartProvider> {/* CartProvider must wrap the NavigationContainer */}
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {/* Login & Register Screens */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen
  name="ResetPassword"
  component={ResetPasswordScreen}
  options={{ title: 'Reset Password' }}
/>
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
           <Stack.Screen
    name="Notifications"
    component={NotificationsScreen}
    options={{ title: 'Notifications' }}
  />
          {/* Categories and Details */}
          <Stack.Screen name="Categories" component={CategoriesScreen} />
          <Stack.Screen
  name="CategoryDetails"
  component={CategoryDetailsScreen}
  options={{ headerShown: false }}
/>

          {/* <Stack.Screen name="CategoryDetails" component={CategoryDetailsScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
      </ThemeProvider>
    </CartProvider>
    </Provider>
  );
}



// import React, { useEffect, useState } from 'react';
// import { registerForPushNotificationsAsync } from './services/notificationService';
// import * as Notifications from 'expo-notifications';
// import { View, Text } from 'react-native';

// export default function App() {
//   const [expoPushToken, setExpoPushToken] = useState('');

//   useEffect(() => {
//     registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

//     const notificationListener = Notifications.addNotificationReceivedListener((notification) => {
//       console.log('Notification received:', notification);
//     });

//     const responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
//       console.log('Notification response:', response);
//     });

//     return () => {
//       Notifications.removeNotificationSubscription(notificationListener);
//       Notifications.removeNotificationSubscription(responseListener);
//     };
//   }, []);

//   return (
//     <View>
//       <Text>Your push token: {expoPushToken}</Text>
//     </View>
//   );
// }