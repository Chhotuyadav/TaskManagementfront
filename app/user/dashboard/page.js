"use client";
import React, { useEffect, useState } from "react";
import { postData } from "../../lib/apiService";

function UserDashboard() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchUserTasks();
  }, []);

  const fetchUserTasks = async () => {
    try {
      const tasksData = await postData("task/get_task_by_user_id");
      if (tasksData.status == "200") {
        setTasks(tasksData.data);
      } else {
        setError("No tasks found.");
      }
    } catch (error) {
      setError("No tasks found.");
    }
  };

  const handleTaskStatusChange = async (taskId, newStatus) => {
    try {
      const response = await postData("task/update_status", { taskId, status: newStatus });
      if (response.status == "200") {
        setSuccess("Task status updated successfully!");
        fetchUserTasks();  // Refresh task list after updating status
      } else {
        setError("Error updating task status.");
      }
    } catch (error) {
      setError("Error updating task status.");
    }
  };

  // Function to get the color for the task based on its priority
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "low":
        return { backgroundColor: "#d4edda", color: "#155724" };
      case "medium":
        return { backgroundColor: "#fff3cd", color: "#856404" };
      case "high":
        return { backgroundColor: "#f8d7da", color: "#721c24" };
      default:
        return {};
    }
  };

  return (
    <div className="user-dashboard">
      <div className="container">
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="task-list">
          <h4>Your Tasks</h4>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task.id}>
                  <td>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>
                    {/* Applying priority color */}
                    <span
                      className="badge"
                      style={getPriorityStyle(task.priority)}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td>
                    <select
                      value={task.status}
                      onChange={(e) => handleTaskStatusChange(task.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td>{task.due_date ? new Date(task.due_date).toLocaleDateString() : "No Due Date"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
