// src/Store/LiveUser.tsx
import { create } from "zustand";
import { Data, type Task, Statuses, Priorities, Users } from "../Data/Data";

interface TaskState {
  data: Task[];
  addTask: () => void;
  removeuser: () => void;
  updateStatus: (index: number, status: Task["status"]) => void;
}

const titles = [
  "Fix API",
  "Update Styles",
  "Refactor Component",
  "Write Tests",
  "Deploy App",
];

export const useliveUser = create<TaskState>((set) => ({
  data: Data,

  addTask: () => {
    const randomUser = Users[Math.floor(Math.random() * Users.length)];
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    const randomStatus = Statuses[Math.floor(Math.random() * Statuses.length)];
    const randomPriority =
      Priorities[Math.floor(Math.random() * Priorities.length)];

    // use the shared Task type from Data, including id
    const newTask: Task = {
      id: crypto.randomUUID(), // or any id generator you prefer
      user: randomUser,
      title: randomTitle,
      createdAt: new Date(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: randomStatus,
      priority: randomPriority,
    };

    set((state) => ({
      ...state,
      data: [newTask, ...state.data],
    }));
  },

  removeuser: () => {
    set((state) => ({
      ...state,
      data: state.data.slice(0, -1),
    }));
  },

  updateStatus: (index, status) => {
    set((state) => ({
      ...state,
      data: state.data.map((task, i) =>
        i === index ? { ...task, status } : task
      ),
    }));
  },
}));
