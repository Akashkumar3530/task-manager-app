const STATUS_OPTIONS = ['All', 'Active', 'Completed'];
const PRIORITY_OPTIONS = ['All', 'High', 'Medium', 'Low'];

export default function FilterBar({
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  totalCount,
}) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        {STATUS_OPTIONS.map((status) => (
          <button
            key={status}
            type="button"
            className={`filter-btn ${statusFilter === status ? 'active' : ''}`}
            onClick={() => setStatusFilter(status)}
          >
            {status}
          </button>
        ))}

        <select
          className="task-select"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          aria-label="Filter by Priority"
        >
          {PRIORITY_OPTIONS.map((priority) => (
            <option key={priority} value={priority}>
              {priority === 'All' ? 'All Priorities' : `${priority} Priority`}
            </option>
          ))}
        </select>
      </div>

      <span className="task-count">
        {totalCount} {totalCount === 1 ? 'task' : 'tasks'} shown
      </span>
    </div>
  );
}