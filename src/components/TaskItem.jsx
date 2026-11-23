import { Edit2, Trash2 } from 'lucide-react';

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-left">
        <input
          type="checkbox"
          className="task-checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={`Mark ${task.title} as ${task.completed ? 'incomplete' : 'complete'}`}
        />
        <div className="task-content">
          <span className="task-title">{task.title}</span>
          {task.description && <p className="task-desc">{task.description}</p>}
          <span className={`badge badge-${task.priority}`}>{task.priority}</span>
        </div>
      </div>

      <div className="task-actions">
        <button
          type="button"
          className="icon-btn"
          onClick={() => onEdit(task)}
          title="Edit Task"
          aria-label="Edit Task"
        >
          <Edit2 size={16} />
        </button>
        <button
          type="button"
          className="icon-btn delete"
          onClick={() => onDelete(task.id)}
          title="Delete Task"
          aria-label="Delete Task"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}