import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import FilterBar from './components/FilterBar';
import TaskItem from './components/TaskItem';
import './App.css';

const STORAGE_KEY = 'practical_task_manager_v1';

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [editingTask, setEditingTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskData.id ? taskData : t))
      );
      setEditingTask(null);
    } else {
      setTasks((prev) => [taskData, ...prev]);
    }
  };

  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (editingTask?.id === id) setEditingTask(null);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Active' && !task.completed) ||
      (statusFilter === 'Completed' && task.completed);

    const matchesPriority =
      priorityFilter === 'All' || task.priority === priorityFilter;

    return matchesStatus && matchesPriority;
  });

  return (
    <main className="app-container">
      <header>
        <h1>Task Manager</h1>
        <p>Organize your daily workflow with priority tracking</p>
      </header>

      <TaskForm
        onSave={handleSaveTask}
        editingTask={editingTask}
        onCancelEdit={() => setEditingTask(null)}
      />

      <FilterBar
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        totalCount={filteredTasks.length}
      />

      <section className="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggleTask}
              onEdit={setEditingTask}
              onDelete={handleDeleteTask}
            />
          ))
        ) : (
          <div className="empty-state">
            <p>No tasks match the current view. Add a task above to get started.</p>
          </div>
        )}
      </section>
    </main>
  );
}