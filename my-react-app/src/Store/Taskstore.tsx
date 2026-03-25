import { create } from 'zustand';
import {Data, type Task } from '../Data/Data';

export interface TaskState {
  data: Task[];
  updateStatus: (index: number, status: Task["status"]) => void;
  updateTaskStatusById: (id: string, status: Task["status"]) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  data: Data,
  updateStatus: (index, status) =>
    set((state) => ({
      data: state.data.map((task, i) =>
        i === index ? { ...task, status } : task
      ),
    })),
  updateTaskStatusById: (id, status) =>
    set((state) => ({
      data: state.data.map((task) =>
        task.id === id ? { ...task, status } : task
      ),
    })),
}));
