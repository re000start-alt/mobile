// src/components/SearchBar.tsx
import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SearchBar({ value, onChange }: { value?: string; onChange?: (v: string) => void }) {
  return (
    <View style={styles.box}>
      <Ionicons name="search" size={20} color="#777" />
      <TextInput style={styles.input} placeholder="Search tasks..." value={value} onChangeText={onChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  box: { flexDirection: "row", alignItems: "center", marginHorizontal: 16, marginTop: 8, backgroundColor: "#f2f2f2", borderRadius: 10, padding: 8 },
  input: { marginLeft: 8, flex: 1 },
});
