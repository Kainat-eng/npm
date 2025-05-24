import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import "./App.css";

const Users = () => {
  const [activeTab, setActiveTab] = useState("adminpanel");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    if (activeTab === "users") {
      fetchUsers();
    }
  }, [activeTab]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/auth/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use the /register API for both create and update
      await axios.post("http://localhost:4000/register", {
        ...formData,
        _id: editUserId || undefined, // Include the ID if editing
      });
      setEditUserId(null);
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      });
      fetchUsers();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (user) => {
    setEditUserId(user._id);
    setFormData({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: "", // Blank password for security
    });
    setActiveTab("adminpanel");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "adminpanel":
        return (
          <div className="tab-content">
            <h2>Admin</h2>
            <form className="adminpanel-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  id="firstname"
                  placeholder="Enter first name"
                  value={formData.firstname}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  id="lastname"
                  placeholder="Enter last name"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <button className="save-button" type="submit">
                Create User
              </button>
            </form>
          </div>
        );
      case "users":
        return (
          <div className="tab-content">
            <h2>Users</h2>
            {users.length > 0 ? (
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.firstname} {user.lastname}</td>
                      <td>{user.email}</td>
                      <td>
                        <button
                          className="edit-button"
                          onClick={() => handleEdit(user)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(user._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No users found.</p>
            )}
          </div>
        );
      default:
        return <div className="tab-content">Select a tab to view content</div>;
    }
  };

  return (
    <div className="users-container">
      <div className="users-heading">
        <h1>Users</h1>
      </div>
      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === "adminpanel" ? "active" : ""}`}
          onClick={() => setActiveTab("adminpanel")}
        >
          Admin Panel
        </button>
        <button
          className={`tab-btn ${activeTab === "users" ? "active" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
      </div>
      <div className="users-main">{renderContent()}</div>
    </div>
  );
};

export default Users;
