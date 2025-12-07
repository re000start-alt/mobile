// App.tsx
import React, { useEffect } from "react";
import AppNavigator from "./src/navigation";
import { AuthProvider } from "./src/context/AuthContext";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { initializeApp } from "firebase/app";
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} from "@env";

// Notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Register for local notifications
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

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

export default function App() {
  useEffect(() => {
    // Initialize Firebase
    initializeApp(firebaseConfig);

    // Register notifications
    registerForLocalNotifications();
  }, []);

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
