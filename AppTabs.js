// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Ionicons } from '@expo/vector-icons';
// import HomeScreen from './screens/HomeScreen';
// import CartScreen from './screens/CartScreen';
// import ProfileScreen from './screens/ProfileScreen';
// import CategoriesScreen from './screens/CategoriesScreen';
// import NewArrivalsScreen from './screens/NewArrivalsScreen';
// import SettingsScreen from './screens/SettingsScreen';
// import { useCart } from './context/CartContext';

// const Tab = createBottomTabNavigator();

// export default function AppTabs() {
//   const { cartItems, getTotalQuantity } = useCart(); // Access the function here

//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === 'Home') {
//             iconName = focused ? 'home' : 'home-outline';
//           } else if (route.name === 'Categories') {
//             iconName = focused ? 'search' : 'search-outline';
//           } else if (route.name === 'New Arrivals') {
//             iconName = focused ? 'pricetag' : 'pricetag-outline';
//           } else if (route.name === 'Cart') {
//             iconName = focused ? 'cart' : 'cart-outline';
//           } else if (route.name === 'Profile') {
//             iconName = focused ? 'person' : 'person-outline';
//           } else if (route.name === 'Settings') {
//             iconName = focused ? 'settings' : 'settings-outline';
//           }

//           return (
//             <View>
//               <Ionicons name={iconName} size={size} color={color} />
//               {/* Badge for Cart */}
//               {route.name === 'Cart' && getTotalQuantity() > 0 && (
//                 <View style={styles.badge}>
//                   <Text style={styles.badgeText}>{getTotalQuantity()}</Text>
//                 </View>
//               )}
//             </View>
//           );
//         },
//         tabBarActiveTintColor: '#007bff',
//         tabBarInactiveTintColor: 'gray',
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Categories" component={CategoriesScreen} />
//       <Tab.Screen name="New Arrivals" component={NewArrivalsScreen} />
//       {/* <Tab.Screen name="Cart" component={CartScreen} /> */}
    //   <Tab.Screen
    //     name="Cart"
    //     component={CartScreen}
    //     options={{
    //       tabBarBadge: cartItems.length > 0 ? cartItems.length : null, // Show badge if cart is not empty
    //     }}
    //   />
//       <Tab.Screen name="Profile" component={ProfileScreen} />
//       <Tab.Screen name="Settings" component={SettingsScreen} />
//     </Tab.Navigator>
//   );
// }

// const styles = StyleSheet.create({
//   badge: {
//     position: 'absolute',
//     right: -6,
//     top: -3,
//     backgroundColor: 'red',
//     borderRadius: 8,
//     width: 16,
//     height: 16,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   badgeText: {
//     color: 'white',
//     fontSize: 10,
//     fontWeight: 'bold',
//   },
// });

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import NewArrivalsScreen from './screens/NewArrivalsScreen';
import SettingsScreen from './screens/SettingsScreen';
import HeaderBar from './components/HeaderBar';
import { useCart } from './context/CartContext';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  const { cartItems, getTotalQuantity } = useCart();

  return (
    <View style={styles.container}>
      {/* <HeaderBar /> Keep the custom HeaderBar */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Categories') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'New Arrivals') {
              iconName = focused ? 'pricetag' : 'pricetag-outline';
            } else if (route.name === 'Cart') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return (
              <View>
                <Ionicons name={iconName} size={size} color={color} />
                {route.name === 'Cart' && getTotalQuantity() > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{getTotalQuantity()}</Text>
                  </View>
                )}
              </View>
            );
          },
          tabBarActiveTintColor: '#007bff',
          tabBarInactiveTintColor: 'gray',
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
        <Tab.Screen name="Profile" component={ProfileScreen} />
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
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
