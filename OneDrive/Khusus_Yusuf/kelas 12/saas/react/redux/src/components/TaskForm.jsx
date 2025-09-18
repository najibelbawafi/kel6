import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../features/tasks/tasksSlice';

const TaskForm = ({ taskToEdit, clearEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [status, setStatus] = useState('To-Do');

  const dispatch = useDispatch();

  // Jika ada task yang akan di-edit, set nilai form sesuai task yang akan diedit
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setPriority(taskToEdit.priority);
      setStatus(taskToEdit.status);
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Jika ada taskToEdit, maka edit task, jika tidak, tambahkan task baru
    if (taskToEdit) {
      dispatch(editTask({ id: taskToEdit.id, title, description, priority, status }));
      clearEdit(); // Bersihkan mode edit setelah task disimpan
    } else {
      dispatch(addTask({ id: Date.now(), title, description, priority, status }));
    }

    // Reset form setelah submit
    setTitle('');
    setDescription('');
    setPriority('Low');
    setStatus('To-Do');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg shadow-md text-black">
      <div className="mb-4">
        <label className="block text-sm font-bold">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-2 py-1 border rounded"
          placeholder="Task title"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-2 py-1 border rounded"
          placeholder="Task description"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold">Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full px-2 py-1 border rounded">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold">Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-2 py-1 border rounded">
          <option>To-Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        {taskToEdit ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;