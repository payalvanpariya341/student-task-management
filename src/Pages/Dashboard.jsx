import React, { useEffect, useState } from "react";
import NavBar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import TaskList from "../Components/TaskList";
import TaskForm from "../Components/TaskForm";

const Dashboard = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // ================= FETCH TASKS =================
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/tasks");
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("loginData");
    localStorage.removeItem("authData");
    navigate("/login");
  };

  // ================= ADD TASK =================
  const handleAddTask = async (newTask) => {
    const taskToAdd = { ...newTask, completed: false };

    try {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskToAdd),
      });

      const data = await response.json();
      setTasks([...tasks, data]);
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  // ================= UPDATE TASK =================
  const handleUpdateTask = async (updatedTask) => {
    try {
      await fetch(`http://localhost:3000/tasks/${updatedTask.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });

      setTasks(
        tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );

      setEditTask(null);
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  // ================= DELETE TASK =================
  const handleDeleteTask = async (id) => {
    try {
      await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
      });

      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // ================= TOGGLE COMPLETE =================
  const handleCompleteTask = async (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const updatedTask = { ...task, completed: !task.completed };

    try {
      await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });

      setTasks(
        tasks.map((t) => (t.id === id ? updatedTask : t))
      );
    } catch (error) {
      console.error(error);
    }
  };

  // ================= EDIT TASK =================
  const editingTask = (task) => {
    setEditTask(task);
    setShowForm(true);
  };

  return (
    <div>
      <NavBar
        title="Task Management"
        isFormOpen={showForm}
        onAddTaskBtnClick={() => setShowForm(!showForm)}
        onLogout={handleLogout}
      />

      {showForm && (
        <TaskForm
          addTask={handleAddTask}
          updateTask={handleUpdateTask}
          editingTask={editTask}
        />
      )}

      <h1>MY TASKS</h1>

      <TaskList
        tasks={tasks}
        editingTask={editingTask}
        deletingTask={handleDeleteTask}
        handleCompleteTask={handleCompleteTask}
      />
    </div>
  );
};

export default Dashboard;
