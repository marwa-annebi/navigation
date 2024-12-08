import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { sendPushNotification } from "../services/pushNotifService";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrderConfirmationScreen({ expoPushToken }) {
  const handleOrderConfirmation = async () => {
    try {
      await sendPushNotification(expoPushToken);
      Alert.alert("Success", "Notification sent!");
    } catch (error) {
      Alert.alert("Error", `Failed to send notification: ${error.message}`);
    }
  };

  return (
    <SafeAreaView>
      <Text>Order Confirmed!</Text>
      <TouchableOpacity onPress={handleOrderConfirmation}>
        <Text>Send Notification</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
