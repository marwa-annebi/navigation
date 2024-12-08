// import * as Notifications from "expo-notifications";
// import * as Device from "expo-device";
// import { Platform } from "react-native";

// // Initialisation des notifications
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//   }),
// });

// // Demande de permissions et obtention du token
// export async function registerForPushNotificationsAsync() {
//   let token;

//   if (Device.isDevice) {
//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;

//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }

//     if (finalStatus !== "granted") {
//       alert("Permission de notifications non accordée !");
//       return;
//     }

//     token = (await Notifications.getExpoPushTokenAsync()).data;
//   } else {
//     alert(
//       "Les notifications fonctionnent uniquement sur un appareil physique."
//     );
//   }

//   if (Platform.OS === "android") {
//     Notifications.setNotificationChannelAsync("default", {
//       name: "default",
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: "#FF231F7C",
//     });
//   }

//   return token;
// }

// // Envoi d'une notification locale
// export function sendLocalNotification(title, body) {
//   Notifications.scheduleNotificationAsync({
//     content: {
//       title: "Hello! Thank you for your order. 📬",
//       body: "Your order has been placed successfully. You will receive a confirmation email shortly.",
//       sound: true,
//     },
//     trigger: { seconds: 3 },
//   });
// }
