// src/components/TaskCard.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Task } from "../services/tasksService";

export default function TaskCard({ item, onPress }: { item: Task; onPress?: () => void }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.leftCircle} />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.description}</Text>

        <View style={styles.row}>
          <View style={styles.pill}>
            <Text style={{ color: "#0b7a5a", fontWeight: "600" }}>{item.priority || "low"}</Text>
          </View>

          <View style={{ flexDirection: "row", marginLeft: 12 }}>
            <Text style={styles.icon}>📅 {item.dueDate ? new Date(item.dueDate).toLocaleDateString() : "Add date"}</Text>
            <Text style={[styles.icon, { marginLeft: 12 }]}>🔔 {item.reminderAt ? new Date(item.reminderAt).toLocaleString() : "Add reminder"}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  leftCircle: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: "#f39c12", marginRight: 12 },
  title: { fontSize: 16, fontWeight: "700", color: "#1a1a1a" },
  desc: { fontSize: 14, color: "#6b6b6b", marginTop: 6 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12 },
  pill: { backgroundColor: "#e6fbf4", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  icon: { color: "#7a7a7a", fontSize: 13 },
});
