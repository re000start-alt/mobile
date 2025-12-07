// src/screens/SignInScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import Constants from "expo-constants";
import { useAuth } from "../context/AuthContext";
import { StatusBar } from "expo-status-bar";

WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen() {
  const { signInWithGoogleCredential, signInWithEmail, signUpWithEmail } = useAuth();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: Constants.expoConfig?.extra?.WEB_CLIENT_ID ?? process.env.WEB_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      if (id_token) {
        (async () => {
          try {
            await signInWithGoogleCredential(id_token);
          } catch (e: any) {
            Alert.alert("Google sign-in failed", e.message || String(e));
          }
        })();
      }
    }
  }, [response]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await signInWithEmail(email, password);
    } catch (e: any) {
      Alert.alert("Sign in error", e.message || String(e));
    }
  };

  const signUp = async () => {
    try {
      await signUpWithEmail(email, password);
    } catch (e: any) {
      Alert.alert("Sign up error", e.message || String(e));
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Welcome</Text>

      <TouchableOpacity style={styles.googleBtn} onPress={() => promptAsync()}>
        <Text style={{ fontWeight: "600" }}>Continue with Google</Text>
      </TouchableOpacity>

      <Text style={{ marginTop: 20 }}>Or use Email</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

      <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
        <TouchableOpacity style={styles.btn} onPress={signIn}>
          <Text style={{ color: "#fff" }}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { backgroundColor: "#666" }]} onPress={signUp}>
          <Text style={{ color: "#fff" }}>Sign up</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ marginTop: 18, color: "#777", fontSize: 12, textAlign: "center" }}>By signing in you agree to terms</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "800", marginBottom: 20 },
  googleBtn: { width: "100%", padding: 12, borderRadius: 10, borderWidth: 1, borderColor: "#ddd", alignItems: "center", backgroundColor: "#fff" },
  input: { width: "100%", height: 44, borderRadius: 8, borderWidth: 1, borderColor: "#eee", paddingHorizontal: 12, marginTop: 10 },
  btn: { padding: 12, borderRadius: 8, backgroundColor: "#0b84ff", alignItems: "center", justifyContent: "center", width: 120 },
});
