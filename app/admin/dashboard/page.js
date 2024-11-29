"use client";
import React, { useEffect, useState } from "react";
import { postData } from "../../lib/apiService";
import Multiselect from "multiselect-react-dropdown";

function Dashboard() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    id: null,
    title: "",
    description: "",
    priority: "",
    due_date: "",
    status: "",
    users: [],
  });
  const [priorityColors, setPriorityColors] = useState([]);

  useEffect(() => {
    FetchUsers();
    fetchPriorityColors();
    fetchAllTasks();
  }, []);


  const FetchUsers = async () => {
    try {
      const userData = await postData("user/get_all_user");
      if (userData.status == "200") {
        setUsers(userData.data);
      } else {
        setError("Error fetching users.");
      }
    } catch (error) {
      setError("Error fetching users.");
    }
  };


  const fetchAllTasks = async () => {
    try {
      const tasksData = await postData("task/get_all_task");
      if (tasksData.status == "200") {
        setTasks(tasksData.data);
      } else {
        setError("No Task Found");
      }
    } catch (error) {
      setError("No Task Found.");
    }
  };


  const fetchPriorityColors = async () => {
    try {
      const priorityData = await postData("task/priority_colors");
      if (priorityData.status == "200") {
        setPriorityColors(priorityData.data);
      } else {
        setError("No priority colors.");
      }
    } catch (error) {
      setError("Error fetching priority colors.");
    }
  };


  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleAddOrUpdateTask = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const endpoint = task.id ? "task/update" : "task/add";
      const response = await postData(endpoint, task);

      if (response.status == "200") {
        setSuccess(response?.data?.message || "Task saved successfully!");
        setTask({ id: null, title: "", description: "", priority: "", due_date: "", status: "", users: [] });
        fetchAllTasks();
      } else {
        setError("Error saving task.");
      }
    } catch (error) {
      setError("Error saving task.");
    }
  };


  const handleEditClick = (taskToEdit) => {
    setTask({
      id: taskToEdit.id,
      title: taskToEdit.title,
      description: taskToEdit.description,
      priority: taskToEdit.priority,
      due_date: taskToEdit.due_date
        ? new Date(taskToEdit.due_date).toISOString().split("T")[0]
        : "",
      status: taskToEdit.status,
      users: JSON.parse(taskToEdit.users),
    });
    setSuccess(null);
    setError(null);
  };



  const handleSelectChange = (selectedList) => {
    setTask((prevState) => ({
      ...prevState,
      users: selectedList.map((user) => user.id),
    }));
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'low':
        return {
          backgroundColor: '#d4edda',
          color: '#155724',
        };
      case 'medium':
        return {
          backgroundColor: '#fff3cd',
          color: '#856404',
        };
      case 'high':
        return {
          backgroundColor: '#f8d7da',
          color: '#721c24',
        };
      default:
        return {};
    }
  };

  const handleDeleteClick = async (task) => {
    if (window.confirm(`Are you sure you want to delete the task: ${task.title}?`)) {
      try {
        const response = await postData("task/delete", { id: task.id });
        if (response.status == "200") {
          setSuccess("Task deleted successfully!");
          fetchAllTasks();  // Refresh the task list
          setTasks([]);
        } else {
          setError("Error deleting task.");
        }
      } catch (error) {
        setError("Error deleting task.");
      }
    }
  };


  return (
    <div className="dashboard-page">
      <div className="main-content">
        <div className="container-fluid">
          <div className="row mt-4 mb-4">
            <div className="col-sm-5 py-2 border">
              <div className="task-section">
                <h3>{task.id ? "Edit Task" : "Create Task"}</h3>
                <form onSubmit={handleAddOrUpdateTask} className="form">
                  {/* Task Form Fields */}
                  <div className="form-group mb-3">
                    <label>Task Title</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      value={task.title}
                      onChange={handleTaskChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Task Description</label>
                    <textarea
                      name="description"
                      className="form-control"
                      value={task.description}
                      onChange={handleTaskChange}
                      required
                    ></textarea>
                  </div>
                  <div className="form-group mb-3">
                    <label>Priority</label>
                    <select
                      name="priority"
                      className="form-control"
                      value={task.priority}
                      onChange={handleTaskChange}
                      required
                    >
                      <option value="">Select Priority</option>
                      {priorityColors.map((priority) => (
                        <option
                          key={priority.id}
                          value={priority.priority}
                          style={{
                            backgroundColor: priority.background_color,
                            color: priority.text_color,
                          }}
                        >
                          {priority.priority}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group mb-3">
                    <label>Assign Users</label>
                    <Multiselect
                      options={users}
                      selectedValues={task.users.map((userId) =>
                        users.find((user) => user.id === userId)
                      )}
                      displayValue="name"
                      onSelect={handleSelectChange}
                      onRemove={handleSelectChange}
                      placeholder="Select Users"
                      isObject={true}
                      showCheckbox={true}
                      closeIcon="cancel"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Due Date</label>
                    <input
                      type="date"
                      name="due_date"
                      className="form-control"
                      value={task.due_date}
                      onChange={handleTaskChange}
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>Status</label>
                    <select
                      name="status"
                      className="form-control"
                      value={task.status}
                      onChange={handleTaskChange}
                      required
                    >
                      {/* <option value="">Select Status</option> */}
                      <option value="Pending" selected={task.status === "Pending"}>Pending</option>
                      <option value="In Progress" selected={task.status === "In Progress"}>In Progress</option>
                      <option value="Completed" selected={task.status === "Completed"}>Completed</option>
                    </select>
                  </div>


                  <button type="submit" className="btn btn-primary mt-3">
                    {task.id ? "Update Task" : "Add Task"}
                  </button>
                </form>
              </div>
            </div>

            {/* All Task Section */}
            <div className="col-sm-7 py-2 border">
              <div className="task-section">
                <h3>All Tasks</h3>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Priority</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th>Assigned Users</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks && tasks.length > 0 ? (
                      tasks.map((task, index) => (
                        <tr key={task.id}>
                          <td>{index + 1}</td>
                          <td>{task.title}</td>
                          <td>{task.description}</td>
                          <td>
                            {task.priority && (
                              <span className="badge" style={getPriorityStyle(task.priority)}>
                                {task.priority}
                              </span>
                            )}
                          </td>
                          <td>
                            {task.due_date
                              ? new Date(task.due_date).toLocaleDateString()
                              : "No Due Date"}
                          </td>
                          <td>{task.status}</td>
                          <td>
                            {task.users &&
                              JSON.parse(task.users).map((userId) => (
                                <span key={userId} className="badge bg-secondary">
                                  {users.find((user) => user.id === userId)?.name || `User ID: ${userId}`}
                                </span>
                              ))}
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() => handleEditClick(task)}
                            >
                              Edit
                            </button>
                            |
                            <button
                              className="btn btn-sm btn-danger" // Use "btn-danger" for delete button
                              onClick={() => handleDeleteClick(task)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center">
                          No Task Found
                        </td>
                      </tr>
                    )}
                  </tbody>

                </table>
              </div>
            </div>
          </div>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
          {success && <div className="alert alert-success mt-3">{success}</div>}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
