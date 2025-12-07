// src/screens/TaskDetailsScreen.tsx
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, Button } from "react-native";
import { getTask, updateTask, deleteTask } from "../services/tasksService";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function TaskDetailsScreen() {
  const route = useRoute();
  const nav = useNavigation();
  const id = (route.params as any)?.id as string;
  const [task, setTask] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const t = await getTask(id);
      setTask(t);
    })();
  }, [id]);

  if (!task) return <SafeAreaView><Text>Loading...</Text></SafeAreaView>;

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "700" }}>{task.title}</Text>
      <Text style={{ marginTop: 8 }}>{task.description}</Text>
      <Text style={{ marginTop: 8 }}>Priority: {task.priority}</Text>
      <Text style={{ marginTop: 8 }}>Status: {task.status}</Text>
      <View style={{ marginTop: 20 }}>
        <Button title="Edit" onPress={() => nav.navigate("AddEdit" as never, { id } as never)} />
        <View style={{ height: 8 }} />
        <Button title="Mark done" onPress={async () => { await updateTask(id, { status: "done" }); nav.goBack(); }} />
        <View style={{ height: 8 }} />
        <Button title="Delete" color="#cc0000" onPress={async () => { await deleteTask(id); nav.navigate("Home" as never); }} />
      </View>
    </SafeAreaView>
  );
}
