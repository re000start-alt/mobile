// src/screens/HomeScreen.tsx
import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, TouchableOpacity, Text } from "react-native";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import TaskCard from "../components/TaskCard";
import { subscribeToTasks, Task } from "../services/tasksService";
import { useNavigation } from "@react-navigation/native";
import * as Notifications from "expo-notifications";

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [q, setQ] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const unsub = subscribeToTasks((items) => setTasks(items));
    return () => unsub();
  }, []);

  const filtered = tasks.filter(
    (t) => t.title?.toLowerCase().includes(q.toLowerCase()) || t.description?.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header onAdd={() => navigation.navigate("AddEdit" as never)} onProfile={() => navigation.navigate("Profile" as never)} />
      <SearchBar value={q} onChange={setQ} />
      <View style={styles.filters}>
        <Text>All</Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <TouchableOpacity style={styles.modeBtn}>
            <Text>☰</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modeBtn}>
            <Text>▦</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modeBtn}>
            <Text>📅</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        contentContainerStyle={{ padding: 16 }}
        data={filtered}
        keyExtractor={(i) => i.id || ""}
        renderItem={({ item }) => <TaskCard item={item} onPress={() => navigation.navigate("Details" as never, { id: item.id } as never)} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  filters: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, marginTop: 12 },
  modeBtn: { width: 40, height: 36, borderRadius: 8, backgroundColor: "#f4f4f4", alignItems: "center", justifyContent: "center" },
});
