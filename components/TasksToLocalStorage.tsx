import { Task } from "../typescript/types";
export const persistTasksToLocalStorage = (tasks: Task[]) => {
  // Convert tasks array to JSON string
  const tasksJSON = JSON.stringify(tasks);
  // Save the JSON string to Local Storage
  localStorage.setItem("tasks", tasksJSON);
};
