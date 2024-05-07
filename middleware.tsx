import { Task } from "./typescript/types";

export const loadTasksFromLocalStorage = (
  setTasks: (tasks: Task[]) => void
) => {
  // Load tasks from Local Storage
  const savedTasksJSON = localStorage.getItem("tasks");
  if (savedTasksJSON) {
    // Parse the JSON string to an array of tasks
    const savedTasks: Task[] = JSON.parse(savedTasksJSON);
    // Set the tasks state with the loaded tasks
    setTasks(savedTasks);
  }
};

// Middleware function to persist tasks to Local Storage
export const saveTasksToLocalStorage = (tasks: Task[]) => {
  // Convert tasks array to JSON string
  const tasksJSON = JSON.stringify(tasks);
  // Store the JSON string in Local Storage
  localStorage.setItem("tasks", tasksJSON);
};
