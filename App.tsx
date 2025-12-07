// App.tsx
import React, { useEffect } from "react";
import AppNavigator from "./src/navigation";
import { AuthProvider } from "./src/context/AuthContext";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

Notifications.setNotificationHandler({
  handleNotification: async () => ({ shouldShowAlert: true, shouldPlaySound: true, shouldSetBadge: false }),
});

async function registerForLocalNotifications() {
  try {
    if (!Device.isDevice) {
      console.warn("Push notifications require a physical device");
      return;
    }
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      if (newStatus !== "granted") {
        console.warn("Notification permission not granted");
      }
    }
  } catch (e) {
    console.warn("Error registering notifications", e);
  }
}

export default function App() {
  useEffect(() => {
    registerForLocalNotifications();
  }, []);

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
