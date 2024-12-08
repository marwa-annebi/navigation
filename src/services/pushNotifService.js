import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

export const sendPushNotification = async (expoPushToken, message) => {
  console.log("🚀 ~ sendPushNotification ~ expoPushToken:", expoPushToken);
  const payload = {
    to: expoPushToken,
    sound: "default",
    title: message.title,
    body: message.body,
    data: message.data || {},
  };
  console.log("aaa: ", message);

  const response = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const responseJson = await response.json();
  console.log("🚀 Notification Response:", responseJson);
};
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
export const registerForPushNotificationsAsync = async () => {
  try {
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        throw new Error("Push notification permissions not granted!");
      }

      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;

      if (!projectId) {
        throw new Error("Expo Project ID is missing. Check your app.json.");
      }

      const pushToken = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;

      console.log("🚀 Push Token generated:", pushToken);
      return pushToken;
    } else {
      throw new Error("Push notifications require a physical device.");
    }
  } catch (error) {
    console.error("Error registering for push notifications:", error.message);
    return null;
  }
};
