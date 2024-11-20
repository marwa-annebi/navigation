// import * as Notifications from 'expo-notifications';
// import * as Device from 'expo-device'; // Assurez-vous que expo-device est installé
// import { Platform } from 'react-native';

// export async function registerForPushNotificationsAsync() {
//   let token;

//   if (Device.isDevice) { // Vérifiez si c'est un appareil physique
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;

//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }

//     if (finalStatus !== 'granted') {
//       alert('Échec d\'obtention de permission pour les notifications!');
//       return;
//     }

//     token = (await Notifications.getExpoPushTokenAsync()).data;
//   } else {
//     alert('Les notifications push fonctionnent uniquement sur les appareils physiques!');
//   }

//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//     });
//   }

//   return token;
// }

// export function sendLocalNotification(title, body) {
//   Notifications.scheduleNotificationAsync({
//     content: {
//       title: title,
//       body: body,
//     },
//     trigger: null, // Immédiat
//   });
// }

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// Initialisation des notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Demande de permissions et obtention du token
export async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert("Permission de notifications non accordée !");
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Les notifications fonctionnent uniquement sur un appareil physique.");
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

// Envoi d'une notification locale
export function sendLocalNotification(title, body) {
  Notifications.scheduleNotificationAsync({
    content: {
        title: 'Salut ! Merci pour votre commande 📬',
        body: 'Votre commande a été passée avec succès. Vous recevrez bientôt une confirmation par email.',
      sound: true,
    },
    trigger: { seconds: 3 }, // Immédiate
  });
}

// import { StatusBar } from 'expo-status-bar';
// import React, { useEffect } from 'react';
// import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
// import * as Notifications from 'expo-notifications';

// // Configuration pour afficher les notifications même lorsque l'application est en premier plan
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//   }),
// });

// export default function App() {
//   useEffect(() => {
//     const requestPermissions = async () => {
//       const { status } = await Notifications.requestPermissionsAsync();
//       if (status !== 'granted') {
//         alert('Permission de notifications refusée.');
//       }
//     };

//     // Demander la permission d'envoyer des notifications
//     requestPermissions();

//     // Ajouter un écouteur pour les réponses aux notifications
//     const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
//       handleNotificationResponse(response);
//     });

//     // Nettoyer l'écouteur à la fin
//     return () => subscription.remove();
//   }, []);

//   // Fonction pour envoyer une notification locale
//   const sendNotification = async () => {
//     await Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: 'Salut ! 📬',
    //     body: 'Ceci est une notification locale.',
//         data: { customData: 'Donnée personnalisée' }, // Ajout de données personnalisées
//       },
//       trigger: { seconds: 3 }, // La notification est déclenchée après 3 secondes
//     });
//   };

//   // Fonction pour gérer la réponse de l'utilisateur à la notification
//   const handleNotificationResponse = (response) => {
//     console.log('Notification ouverte:', response);

//     // Extraire les données personnalisées de la notification
//     const customData = response.notification.request.content.data.customData;
//     Alert.alert('Notification ouverte', `Vous avez ouvert la notification avec la donnée : ${customData}`);
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.button} onPress={sendNotification}>
//         <Text style={styles.btnTxt}>Envoyer Notification</Text>
//       </TouchableOpacity>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   button: {
//     backgroundColor: '#007bff',
//     alignItems: 'center',
//     padding: 10,
//     borderRadius: 5,
//   },
//   btnTxt: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });
