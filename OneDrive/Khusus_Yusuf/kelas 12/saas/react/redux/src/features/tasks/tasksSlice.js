// src/features/tasks/tasksSlice.js
import { createSlice } from '@reduxjs/toolkit';

// State awal untuk tasks
const initialState = {
  tasks: [
    { id: 1, title: 'Learn React', description: 'Study components and hooks', priority: 'High', status: 'To-Do' },
    { id: 2, title: 'Learn Redux', description: 'Understand state management with Redux', priority: 'Medium', status: 'In Progress' },
  ],
};

// Slice Redux untuk tasks
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // Tambah task baru
    addTask: (state, action) => {
      state.tasks.push(action.payload); // Tambah task ke dalam array tasks
    },
    // Edit task berdasarkan id
    editTask: (state, action) => {
      const { id, title, description, priority, status } = action.payload;
      const task = state.tasks.find(task => task.id === id); // Cari task berdasarkan id
      if (task) {
        task.title = title;
        task.description = description;
        task.priority = priority;
        task.status = status;
      }
    },
    // Hapus task berdasarkan id
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload); // Filter task yang bukan id yang diberikan
    },
  },
});

// Export action dan reducer
export const { addTask, editTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;