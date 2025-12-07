// src/screens/ProfileScreen.tsx
import React from "react";
import { SafeAreaView, Text, Button } from "react-native";
import { useAuth } from "../context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function ProfileScreen() {
  const { user } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "700" }}>Profile</Text>
      <Text style={{ marginTop: 8 }}>Email: {user?.email}</Text>
      <View style={{ marginTop: 12 }}>
        <Button title="Sign out" onPress={() => signOut(auth)} />
      </View>
    </SafeAreaView>
  );
}
