import { useState, useEffect } from 'react';

const INITIAL_FORM = {
  title: '',
  description: '',
  priority: 'Medium',
};

export default function TaskForm({ onSave, editingTask, onCancelEdit }) {
  const [form, setForm] = useState(INITIAL_FORM);

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title,
        description: editingTask.description || '',
        priority: editingTask.priority || 'Medium',
      });
    } else {
      setForm(INITIAL_FORM);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = form.title.trim();
    if (!trimmedTitle) return;

    onSave({
      id: editingTask ? editingTask.id : crypto.randomUUID(),
      title: trimmedTitle,
      description: form.description.trim(),
      priority: form.priority,
      completed: editingTask ? editingTask.completed : false,
      createdAt: editingTask ? editingTask.createdAt : new Date().toISOString(),
    });

    if (!editingTask) {
      setForm(INITIAL_FORM);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-input"
        placeholder="What needs to be done?"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />

      <textarea
        className="task-textarea"
        rows="2"
        placeholder="Optional notes or description..."
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <div className="form-row">
        <select
          className="task-select"
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
          aria-label="Task Priority"
        >
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>

        <div className="form-actions">
          {editingTask && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            {editingTask ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </div>
    </form>
  );
}