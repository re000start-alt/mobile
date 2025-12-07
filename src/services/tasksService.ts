// src/services/tasksService.ts
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase/firebase";

export type Task = {
  id?: string;
  userId?: string | null;
  title: string;
  description?: string;
  priority?: "low" | "medium" | "high";
  dueDate?: number | null;
  status?: "todo" | "inprogress" | "done";
  reminderAt?: number | null;
  createdAt?: number;
  updatedAt?: number;
};

const tasksCol = collection(db, "tasks");

export async function createTask(task: Partial<Task>) {
  const now = Date.now();
  const userId = auth.currentUser?.uid ?? null;
  const ref = await addDoc(tasksCol, { ...task, userId, createdAt: now, updatedAt: now });
  return ref.id;
}

export async function updateTask(id: string, patch: Partial<Task>) {
  const ref = doc(db, "tasks", id);
  await setDoc(ref, { ...patch, updatedAt: Date.now() }, { merge: true });
}

export async function deleteTaskById(id: string) {
  await deleteDoc(doc(db, "tasks", id));
}

export async function getTask(id: string) {
  const snap = await getDoc(doc(db, "tasks", id));
  return snap.exists() ? { id: snap.id, ...(snap.data() as Task) } : null;
}

export function subscribeToTasks(callback: (tasks: Task[]) => void) {
  const q = query(tasksCol, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    const items: Task[] = [];
    snap.forEach((d) => items.push({ id: d.id, ...(d.data() as Task) }));
    callback(items);
  });
}
