import React, { useEffect, useState } from "react";

const TaskForm = ({ addTask, updateTask, editingTask }) => {
  const initialState = {
    title: "",
    description: "",
    dueDate: "",
    priority: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  // ================= EDIT MODE =================
  useEffect(() => {
    if (editingTask) {
      let safeTask = { ...editingTask };

      // ✅ Fix invalid date like 2025-09-31
      if (safeTask.dueDate) {
        const date = new Date(safeTask.dueDate);
        if (isNaN(date.getTime())) {
          safeTask.dueDate = "";
        }
      }

      setFormData(safeTask);
    } else {
      setFormData(initialState);
    }
  }, [editingTask]);

  // ================= INPUT CHANGE =================
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // ================= VALIDATION =================
  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    } else if (formData.title.length > 6) {
      newErrors.title = "Maximum 6 characters allowed.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (!formData.dueDate) {
      newErrors.dueDate = "Date is required.";
    } else {
      const date = new Date(formData.dueDate);
      if (isNaN(date.getTime())) {
        newErrors.dueDate = "Invalid date selected.";
      }
    }

    if (!formData.priority) {
      newErrors.priority = "Priority is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ================= SUBMIT =================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (editingTask) {
      updateTask(formData);
    } else {
      addTask(formData);
    }

    setFormData(initialState);
    setErrors({});
  };

  // ================= RESET =================
  const handleReset = () => {
    setFormData(initialState);
    setErrors({});
  };

  return (
    <div className="add-task-card">
      <h2 style={{ marginBottom: "15px" }}>
        {editingTask ? "Update Task" : "Add New Task"}
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <input
            type="text"
            placeholder="Task Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
          {errors.title && <span className="error-msg">{errors.title}</span>}
        </div>

        {/* Description */}
        <div>
          <textarea
            name="description"
            placeholder="Description"
            rows="3"
            value={formData.description}
            onChange={handleInputChange}
          />
          {errors.description && (
            <span className="error-msg">{errors.description}</span>
          )}
        </div>

        {/* Date & Priority */}
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ flex: 1 }}>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
            />
            {errors.dueDate && (
              <span className="error-msg">{errors.dueDate}</span>
            )}
          </div>

          <div style={{ flex: 1 }}>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
            >
              <option value="">Select Priority</option>
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>
            {errors.priority && (
              <span className="error-msg">{errors.priority}</span>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div
          className="form-actions"
          style={{ display: "flex", gap: "10px", marginTop: "10px" }}
        >
          <button type="submit" className="btn-primary" style={{ flex: 1 }}>
            {editingTask ? "Update" : "Add"} Task
          </button>

          <button
            type="button"
            className="btn-secondary"
            style={{ flex: 1 }}
            onClick={handleReset}
          >
            Clean
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
