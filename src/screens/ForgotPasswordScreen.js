// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

// export default function ForgotPasswordScreen({ navigation }) {
//   const [email, setEmail] = useState('');

//   const handlePasswordReset = () => {
//     const auth = getAuth();

//     if (!email) {
//       Alert.alert('Error', 'Please enter your email.');
//       return;
//     }

//     sendPasswordResetEmail(auth, email)
//       .then(() => {
//         Alert.alert(
//           'Success',
//           'A password reset email has been sent to your email address.',
//           [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
//         );
//       })
//       .catch((error) => {
//         Alert.alert('Error', 'Unable to send password reset email.');
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Forgot Password</Text>
//       <Text style={styles.instructions}>
//         Enter your email address below to receive a password reset link.
//       </Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />
//       <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
//         <Text style={styles.buttonText}>Send Reset Link</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.link}>
//         <Text style={styles.linkText}>Back to Login</Text>
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
//   instructions: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 20,
//     textAlign: 'center',
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

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleSendResetLink = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch('http://192.168.100.30:3000/send-reset-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', result.message);
      } else {
        Alert.alert('Error', result.message || 'Failed to send reset link.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        Enter your email address to receive a password reset link.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleSendResetLink}>
        <Text style={styles.buttonText}>Send Reset Link</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.link}>
        <Text style={styles.linkText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#007bff',
    fontSize: 14,
  },
});

// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

// export default function ForgotPasswordScreen({ navigation }) {
//   const [email, setEmail] = useState('');

//   const handlePasswordReset = async () => {
//     if (!email) {
//       Alert.alert('Error', 'Please enter your email.');
//       return;
//     }

//     try {
//       const response = await fetch('http://192.168.100.30:3000/send-reset-link', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         Alert.alert('Success', data.message, [
//           { text: 'OK', onPress: () => navigation.navigate('Login') },
//         ]);
//       } else {
//         Alert.alert('Error', data.message || 'Failed to send reset link.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       Alert.alert('Error', 'Unable to send reset link.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Forgot Password</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />
//       <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
//         <Text style={styles.buttonText}>Send Reset Link</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.link}>
//         <Text style={styles.linkText}>Back to Login</Text>
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
