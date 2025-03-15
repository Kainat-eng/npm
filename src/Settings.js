import React, { useState } from "react";
import './App.css';


const Settings = () => {
  const [activeTab, setActiveTab] = useState("dataSources");

  const renderContent = () => {
    switch (activeTab) {
      case "dataSources":
        return (
          <div className="tab-content">
            <div className="header">
              <h2>Data Sources</h2>
              <button className="add-btn">Add Data Source</button>
            </div>
            <div className="data-source">
            <i className="fas fa-database db-icon"></i> 
              <div>
                <h3>MongoDB</h3>
                <p>localhost:4000</p>
              </div>
              <span className="tag">default</span>
            </div>
          </div>
        );
      case "users":
        return (
          <div className="tab-content">
            <h2>Users</h2>
            <p>Manage your users here.</p>
          </div>
        );
      case "plugins":
        return (
          <div className="tab-content">
            <h2>Plugins</h2>
            <p>Manage your plugins here.</p>
          </div>
        );
      case "preferences":
        return (
          <div className="tab-content">
            <h2>Preferences</h2>
            <form className="preferences-form">
              <div className="form-group">
                <label htmlFor="ui-theme">UI Theme</label>
                <select id="ui-theme" defaultValue="dark">
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="home-dashboard">Home Dashboard</label>
                <select id="home-dashboard" defaultValue="default">
                  <option value="default">Default</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="timezone">Timezone</label>
                <select id="timezone" defaultValue="default">
                  <option value="default">Default</option>
                  <option value="UTC">UTC</option>
                  <option value="PST">PST</option>
                </select>
              </div>
              <button type="submit" className="save-btn">Save</button>
            </form>
          </div>
        );
      case "apiKeys":
        return (
          <div className="tab-content">
            <h2>API Keys</h2>
            <p>Manage your API keys here.</p>
          </div>
        );
      default:
        return <div className="tab-content">Select a tab to view content</div>;
    }
  };

  return (
    <div className="settings-container">
      {/* Main Heading */}
      <div className="settings-heading">
        <h1>Settings</h1>
      </div>

      {/* Navbar */}
      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === "dataSources" ? "active" : ""}`}
          onClick={() => setActiveTab("dataSources")}
        >
          Data Sources
        </button>
        <button
          className={`tab-btn ${activeTab === "users" ? "active" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
        <button
          className={`tab-btn ${activeTab === "plugins" ? "active" : ""}`}
          onClick={() => setActiveTab("plugins")}
        >
          Plugins
        </button>
        <button
          className={`tab-btn ${activeTab === "preferences" ? "active" : ""}`}
          onClick={() => setActiveTab("preferences")}
        >
          Preferences
        </button>
        <button
          className={`tab-btn ${activeTab === "apiKeys" ? "active" : ""}`}
          onClick={() => setActiveTab("apiKeys")}
        >
          API Keys
        </button>
      </div>

      {/* Tab Content */}
      <div className="settings-main">{renderContent()}</div>
    </div>
  );
};

export default Settings;
