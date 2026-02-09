import React from "react";

const TaskList = ({ tasks, editingTask, deletingTask, handleCompleteTask }) => {
  return (
    <div className="task-grid">
      {tasks.length === 0 && (
        <p style={{ textAlign: "center", opacity: 0.7 }}>No tasks available</p>
      )}

      {tasks.map((task) => (
        <div
          key={task.id}
          className={`task-card ${task.completed ? "completed" : ""}`}
          style={{ position: "relative" }}
        >
          <h3>{task.title}</h3>
          <p>{task.description}</p>

          <div className="task-meta">
            <span>Due: {task.dueDate}</span>
            <span
              className={`priority-badge priority-${task.priority?.toLowerCase()}`}
            >
              {task.priority}
            </span>
          </div>

          <div className="task-actions">
            {/* Edit */}
            <button
              className="btn-icon"
              disabled={task.completed}
              style={{ background: "#00d2ff" }}
              title="Edit Task"
              onClick={() => editingTask(task)}
            >
              ✏️
            </button>

            {/* Complete / Undo */}
            <button
              className="btn-icon"
              style={{ background: "#00b894" }}
              title={task.completed ? "Undo Complete" : "Mark Complete"}
              onClick={() => handleCompleteTask(task.id)}
            >
              {task.completed ? "↩️" : "✔️"}
            </button>

            {/* Delete */}
            <button
              className="btn-icon"
              disabled={task.completed}
              style={{ background: "#ff416c" }}
              title="Delete Task"
              onClick={() => deletingTask(task.id)}
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
