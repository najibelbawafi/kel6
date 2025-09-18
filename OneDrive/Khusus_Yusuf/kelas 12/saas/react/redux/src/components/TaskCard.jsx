import { useDispatch } from 'react-redux';
import { deleteTask } from '../features/tasks/tasksSlice';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";


// Tentukan warna berdasarkan prioritas
const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High':
      return 'bg-red-200';
    case 'Medium':
      return 'bg-yellow-200';
    case 'Low':
      return 'bg-green-200';
    default:
      return 'bg-gray-100';
  }
};

const TaskCard = ({ task, onEdit, index }) => {
  const dispatch = useDispatch();
  const priorityColor = getPriorityColor(task.priority); // Dapatkan warna berdasarkan prioritas

  const handleDelete = () => {
    dispatch(deleteTask(task.id)); // Dispatch untuk menghapus task
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          className={`p-4 ${priorityColor} rounded-lg shadow-md mb-4`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h3 className="text-lg font-bold text-black">{task.title}</h3>
          <p className="text-sm text-gray-700">{task.description}</p>
          <p className="text-xs text-gray-500 mt-2">Priority: {task.priority}</p>
          <div className="mt-2 space-x-4">
            <button onClick={handleDelete} className="text-red-500 text-sm">
              Delete
            </button>
            <button onClick={() => onEdit(task)} className="text-blue-500 text-sm">
              Edit
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;