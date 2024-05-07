import { Task } from "@/typescript/types";

// Middleware function to persist tasks to Local Storage
export const saveTasksToLocalStorage = (tasks: Task[]) => {
  // Convert tasks array to JSON string
  const tasksJSON = JSON.stringify(tasks);
  // Store the JSON string in Local Storage
  localStorage.setItem("tasks", tasksJSON);
};
