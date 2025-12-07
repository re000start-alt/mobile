// src/screens/AddEditTaskScreen.tsx
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import PrioritySelector from "../components/PrioritySelector";
import { createTask, updateTask, getTask, Task } from "../services/tasksService";
import * as Notifications from "expo-notifications";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function AddEditTaskScreen() {
  const nav = useNavigation();
  const route = useRoute();
  const id = (route.params as any)?.id as string | undefined;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("low");
  const [dueDate, setDueDate] = useState<Date | undefined>();
  const [showPicker, setShowPicker] = useState(false);
  const [reminderAt, setReminderAt] = useState<Date | null>(null);

  useEffect(() => {
    (async () => {
      if (id) {
        const t = await getTask(id);
        if (t) {
          setTitle(t.title);
          setDescription(t.description || "");
          setPriority(t.priority || "low");
          setDueDate(t.dueDate ? new Date(t.dueDate) : undefined);
          setReminderAt(t.reminderAt ? new Date(t.reminderAt) : null);
        }
      }

      // Ask for notification permissions
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        console.warn("Notifications permission not granted");
      }
    })();
  }, [id]);

  const save = async () => {
    const payload: Partial<Task> = {
      title,
      description,
      priority,
      dueDate: dueDate ? dueDate.getTime() : undefined,
      reminderAt: reminderAt ? reminderAt.getTime() : null,
      status: "todo",
    };

    if (id) {
      await updateTask(id, payload);
    } else {
      const newId = await createTask(payload as Task);

      if (reminderAt) {
        await scheduleNotification(newId, title, reminderAt);
      }
    }
    nav.goBack();
  };

  const scheduleNotification = async (taskId: string, title: string, when: Date) => {
    try {
      const seconds = Math.max(1, Math.floor((when.getTime() - Date.now()) / 1000));

      await Notifications.scheduleNotificationAsync({
        content: {
          title: `Reminder: ${title}`,
          body: "Tap to view",
          data: { taskId },
        },
        trigger: { seconds },
      });
    } catch (e) {
      console.error("Scheduling error", e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "700" }}>
        {id ? "Edit Task" : "Add Task"}
      </Text>

      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Task title"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Task description"
        multiline
      />

      <Text style={styles.label}>Priority</Text>
      <PrioritySelector value={priority} onChange={(p) => setPriority(p)} />

      <Text style={styles.label}>Due date</Text>
      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.btn}>
          <Text>{dueDate ? dueDate.toLocaleDateString() : "Set due date"}</Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={dueDate || new Date()}
            mode="date"
            display="default"
            onChange={(e, d) => {
              setShowPicker(false);
              if (d) setDueDate(d);
            }}
          />
        )}
      </View>

      <Text style={styles.label}>Reminder</Text>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <TouchableOpacity
          onPress={() => setReminderAt(new Date(Date.now() + 60 * 60 * 1000))}
          style={styles.btn}
        >
          <Text>Remind in 1 hour</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setReminderAt(null)} style={styles.btn}>
          <Text>Clear</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 24 }}>
        <Button title="Save task" onPress={save} />
        <View style={{ height: 12 }} />
        <Button title="Cancel" color="#999" onPress={() => (nav as any).goBack()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  label: { marginTop: 12, fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    padding: 10,
    marginTop: 6,
  },
  btn: { backgroundColor: "#f2f2f2", padding: 10, borderRadius: 8 },
});
