"use client";
import { useState, useEffect } from "react";
import { Task } from "../typescript/types"; // Import your Task type
import { timeAgo } from "../hooks/useTimeAgo";
import { Trash } from "@/public/Icon";
import { saveTasksToLocalStorage } from "@/hooks/useLocalStorage";

export const TodoList = () => {
  // State to manage tasks
  const [tasks, setTasks] = useState<Task[]>([]);
  // State to manage filters
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  // Use the middleware to persist tasks to Local Storage whenever tasks change
  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  // Function to add a new task
  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTasks([...tasks, newTask]);
  };

  // Function submit form
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.querySelector("input") as HTMLInputElement;
    if (input) {
      addTask(input.value);
      input.value = "";
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks?.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Clear all completed tasks
  const clearCompletedTasks = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  // Apply the filter
  const filteredTasks = tasks?.filter((task) => {
    if (filter === "all") return true;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return false;
  });

  return (
    <div>
      <h1 className=" pb-5 text-center text-2xl">Todo List</h1>
      {/* Form to add a new task */}
      <div className="rounded-lg bg-cyan-500 p-5">
        <form onSubmit={handleOnSubmit}>
          <input
            className="p-2 rounded-lg mr-3 w-96"
            type="text"
            placeholder="New task"
            required
          />
          <button
            className="bg-cyan-950 text-white p-2 rounded-lg"
            type="submit"
          >
            Add Task
          </button>
        </form>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-3 gap-4  my-4  ">
        <button
          className="bg-cyan-950 text-white p-2 rounded-lg "
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className="bg-cyan-950 text-white p-2 rounded-lg"
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className="bg-cyan-950 text-white p-2 rounded-lg"
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      {/* Task list */}
      <ul>
        {filteredTasks?.map((task) => (
          <li
            key={task.id}
            className="border-cyan-500 my-2 p-3 rounded-lg border-2 flex justify-between"
          >
            <div>
              <input
                className="border-cyan-950 border-4"
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
              />
              <span
                className="pl-3"
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.text}
              </span>
              <span>({timeAgo(new Date(task.createdAt))})</span>
            </div>

            <button onClick={() => deleteTask(task.id)}>
              <Trash color="rgb(190 18 60)" />
            </button>
          </li>
        ))}
      </ul>

      {/* Clear completed tasks */}
      {filter === "active" ? (
        <></>
      ) : (
        <div className="flex justify-end">
          <button
            className="bg-pink-800 text-white p-2 rounded-lg"
            onClick={clearCompletedTasks}
          >
            Clear Completed
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoList;
