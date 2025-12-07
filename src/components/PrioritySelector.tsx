// src/components/PrioritySelector.tsx
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const PRIORITIES: ("low" | "medium" | "high")[] = ["low", "medium", "high"];

export default function PrioritySelector({ value, onChange }: { value?: string; onChange?: (p: any) => void }) {
  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      {PRIORITIES.map((p) => (
        <TouchableOpacity key={p} onPress={() => onChange?.(p)} style={[styles.pill, value === p ? styles.active : {}]}>
          <Text style={{ textTransform: "capitalize" }}>{p}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  pill: { paddingHorizontal: 8, paddingVertical: 6, borderRadius: 8, backgroundColor: "#f3f3f3" },
  active: { backgroundColor: "#e6fbf4" },
});
