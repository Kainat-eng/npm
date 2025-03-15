import React, { useState } from "react";

function Server() {
  const [activeTab, setActiveTab] = useState("GeneralSetup");

  const renderTabContent = () => {
    switch (activeTab) {
      case "GeneralSetup":
        return <GeneralSetup />;
      case "AccessControl":
        return <AccessControl />;
      case "Services":
        return <Services />;
      case "Logs":
        return <Logs />;
      default:
        return <GeneralSetup />;
    }
  };

  return (
    <div className="settings-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="settings-main">
        {/* Tabs */}
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Tab Content */}
        <div className="tab-content">{renderTabContent()}</div>
      </div>
    </div>
  );
}

const Sidebar = () => {
  return (
    <div className="server-sidebar">
      <h1>Server</h1>
    </div>
  );
};

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = ["GeneralSetup", "AccessControl", "Services", "Logs"];

  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tab-btn ${activeTab === tab ? "active" : ""}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab.replace(/([A-Z])/g, " $1").trim()}
        </button>
      ))}
    </div>
  );
};

const GeneralSetup = () => {
  return (
    <div className="server-general-setup">
      <h2>General Setup</h2>
      <form>
        <div className="form-group">
          <label>Name</label>
          <input type="text" defaultValue="localhost" />
        </div>
        <div className="form-group">
          <label>Hostname</label>
          <input type="text" defaultValue="localhost" />
        </div>
        <div className="form-group">
          <label>Server Status</label>
          <input type="text" defaultValue="Online" disabled />
        </div>
        <div className="form-group">
          <label>Server ID</label>
          <input
            type="text"
            defaultValue="820d7095-aac5-4e17-ad80-476fa947bc1d"
            disabled
          />
        </div>
        <div className="form-group">
          <label>Server Version</label>
          <input type="text" defaultValue="3.38" />
        </div>
        <button type="submit" className="save-btn">Save</button>
      </form>
    </div>
  );
};

const AccessControl = () => {
  return (
    <div className="server-access-control">
      <h2>Access Control</h2>
      <table>
        <thead>
          <tr>
            <th>Provider Name</th>
            <th>User/Group</th>
            <th>Role Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Local provider for EOP</td>
            <td>admin</td>
            <td>Administrators</td>
          </tr>
          <tr>
            <td>Cloud provider</td>
            <td>user</td>
            <td>Users</td>
          </tr>
        </tbody>
      </table>
      <button className="add-btn">Add</button>
    </div>
  );
};

const Services = () => {
  return (
    <div className="server-services">
      <h2>Services</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Path</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Authentication Service</td>
            <td>Root Account</td>
            <td>Authentication</td>
            <td>
              <button className="edit-btn">Edit</button>
              <button className="delete-btn">Delete</button>
            </td>
          </tr>
          <tr>
            <td>Database Service</td>
            <td>/db</td>
            <td>Storage</td>
            <td>
              <button className="edit-btn">Edit</button>
              <button className="delete-btn">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button className="add-btn">Add</button>
      <button className="add-multiple-btn">Add Multiple</button>
    </div>
  );
};

const Logs = () => {
  const logData = [
    {
      id: 1,
      date: "2025-01-21",
      time: "10:30 AM",
      description: "Server started successfully.",
      status: "Success",
    },
    {
      id: 2,
      date: "2025-01-21",
      time: "11:15 AM",
      description: "New user created: admin@example.com.",
      status: "Success",
    },
    {
      id: 3,
      date: "2025-01-21",
      time: "12:45 PM",
      description: "Failed login attempt from IP: 192.168.1.100.",
      status: "Warning",
    },
  ];

  return (
    <div className="server-logs">
      <h2>Logs</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {logData.map((log) => (
            <tr key={log.id}>
              <td>{log.date}</td>
              <td>{log.time}</td>
              <td>{log.description}</td>
              <td>{log.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Server;
