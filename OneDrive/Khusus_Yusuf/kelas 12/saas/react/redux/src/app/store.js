import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks/tasksSlice';

// Fungsi untuk menyimpan state ke localStorage
function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('tasksState', serializedState); // Simpan state di localStorage
  } catch (e) {
    console.error('Could not save state', e);
  }
}

// Fungsi untuk memuat state dari localStorage
function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('tasksState');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error('Could not load state', e);
    return undefined;
  }
}

// Ambil state awal dari localStorage
const persistedState = loadFromLocalStorage();

// Buat store Redux dengan state yang disimpan dari localStorage
export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  preloadedState: persistedState, // Muat state yang ada di localStorage
});

// Simpan setiap perubahan state ke localStorage
store.subscribe(() => saveToLocalStorage(store.getState()));