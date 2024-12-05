// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// import { initializeApp } from 'firebase/app';
// import { firebaseConfig } from '../firebase-config';

// // Initialize Firebase
// initializeApp(firebaseConfig);

// export default function LoginScreen({ navigation }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const auth = getAuth();

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Please fill in all fields.');
//       return;
//     }

//     try {
//       // Attempt login with Firebase
//       await signInWithEmailAndPassword(auth, email, password);
//       Alert.alert('Success', 'Login successful!');
//       navigation.navigate('AppTabs'); // Navigate to the main app
//     } catch (error) {
//       let errorMessage = 'Login failed! Please check your email and password.';
//       if (error.code === 'auth/user-not-found') {
//         errorMessage = 'User not found! Please register first.';
//       } else if (error.code === 'auth/wrong-password') {
//         errorMessage = 'Incorrect password! Please try again.';
//       }
//       Alert.alert('Error', errorMessage);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//         placeholderTextColor="#999"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//         placeholderTextColor="#999"
//       />
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.link}>
//         <Text style={styles.linkText}>Don't have an account? Register</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#f9f9f9',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//     backgroundColor: '#fff',
//     color: '#000',
//   },
//   button: {
//     width: '100%',
//     height: 50,
//     backgroundColor: '#007bff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   link: {
//     marginTop: 20,
//   },
//   linkText: {
//     color: '#007bff',
//     fontSize: 14,
//   },
// });
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image  } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase-config';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Initialize Firebase
initializeApp(firebaseConfig);

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const auth = getAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      // Attempt login with Firebase
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Login successful!');
      navigation.navigate('AppTabs'); // Navigate to the main app
    } catch (error) {
      let errorMessage = 'Login failed! Please check your email and password.';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'User not found! Please register first.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password! Please try again.';
      }
      Alert.alert('Error', errorMessage);
    }
  };
  const handleForgotPassword = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email to reset the password.');
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert('Success', 'Password reset email sent successfully!');
      })
      .catch((error) => {
        Alert.alert('Error', 'Unable to send password reset email.');
      });
  };
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle showPassword state
  };
//   return (
//     <View style={styles.container}>
//        {/* Add an image for the user or logo */}
//        <Image
//         source={{
//           uri: 'https://cdn-icons-png.flaticon.com/512/147/147144.png', // Replace with your image URL or local image
//         }}
//         style={styles.userImage}
//       />

//       <Text style={styles.title}>Login</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//         placeholderTextColor="#999"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//         placeholderTextColor="#999"
//       />
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.link}>
//         <Text style={styles.linkText}>Don't have an account? Register</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#f9f9f9',
//   },
//   userImage: {
//     width: 100, // Width of the image
//     height: 100, // Height of the image
//     borderRadius: 50, // Makes the image circular
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//     backgroundColor: '#fff',
//     color: '#000',
//   },
//   button: {
//     width: '100%',
//     height: 50,
//     backgroundColor: '#007bff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   link: {
//     marginTop: 20,
//   },
//   linkText: {
//     color: '#007bff',
//     fontSize: 14,
//   },
// });


return (
  <View style={styles.container}>
    <Text style={styles.title}>Login</Text>

    {/* Email Input */}
    <View style={styles.inputContainer}>
      <Ionicons name="mail-outline" size={20} color="#ccc" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#999"
      />
    </View>

    {/* Password Input */}
    <View style={styles.inputContainer}>
      <Ionicons name="lock-closed-outline" size={20} color="#ccc" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        placeholderTextColor="#999"
      />
      <TouchableOpacity onPress={handleTogglePasswordVisibility} style={styles.icon}>
        <Ionicons
          name={showPassword ? 'eye-off-outline' : 'eye-outline'}
          size={20}
          color="#ccc"
        />
      </TouchableOpacity>
    </View>

    {/* Login Button */}
    <TouchableOpacity style={styles.button} onPress={handleLogin}>
      <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>

    {/* Forgot Password Link */}
    <TouchableOpacity
      onPress={() => navigation.navigate('ForgotPassword')}
      style={styles.link}
    >
      <Text style={styles.linkText}>Forgot Password?</Text>
    </TouchableOpacity>

    {/* Register Link */}
    <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.link}>
      <Text style={styles.linkText}>Don't have an account? Register</Text>
    </TouchableOpacity>
  </View>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 16,
  backgroundColor: '#f9f9f9',
},
title: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 20,
},
inputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  height: 50,
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  paddingHorizontal: 10,
  marginBottom: 20,
  backgroundColor: '#fff',
},
icon: {
  marginLeft: 10,
},
input: {
  flex: 1,
  fontSize: 16,
  color: '#000',
},
button: {
  width: '100%',
  height: 50,
  backgroundColor: '#007bff',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
  marginTop: 10,
},
buttonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},
link: {
  marginTop: 20,
},
linkText: {
  color: '#007bff',
  fontSize: 14,
},
});


// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
// import { initializeApp } from 'firebase/app';
// import { firebaseConfig } from '../firebase-config';

// export default function LoginScreen({ navigation }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

// const handleLogin = () => {
//     if (email === 'test@example.com' && password === '123456') {
//       Alert.alert('Success', 'Login successful!');
//       navigation.navigate('AppTabs'); // Navigate to the Tab Navigator
//     } else {
//       Alert.alert('Error', 'Invalid email or password!');
//     }
//   };
  

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.link}>
//         <Text style={styles.linkText}>Don't have an account? Register</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#f9f9f9',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//     backgroundColor: '#fff',
//   },
//   button: {
//     width: '100%',
//     height: 50,
//     backgroundColor: '#007bff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   link: {
//     marginTop: 20,
//   },
//   linkText: {
//     color: '#007bff',
//     fontSize: 14,
//   },
// });
