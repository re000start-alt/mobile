// src/components/Header.tsx
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Header({ onAdd, onProfile }: { onAdd?: () => void; onProfile?: () => void }) {
  return (
    <View style={styles.row}>
      <View style={styles.logo} />
      <View style={styles.actions}>
        <TouchableOpacity style={styles.btn} onPress={onAdd}>
          <Text style={{ fontSize: 18 }}>＋</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={onProfile}>
          <Text style={{ fontSize: 18 }}>👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", padding: 16, alignItems: "center", justifyContent: "space-between" },
  logo: { width: 40, height: 40, borderRadius: 10, backgroundColor: "#bfa9a3" },
  actions: { flexDirection: "row", gap: 10 },
  btn: { width: 40, height: 40, borderRadius: 10, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" },
});
