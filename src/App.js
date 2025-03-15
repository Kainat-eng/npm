import './App.css';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Server from './components/Server';
import Users from './Users';
import Settings from './Settings';
import Alerts from './Alerts';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Form from './components/Form';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for the form page */}
        <Route path="/form" element={<Form />} />

        {/* Route for the login page */}
        <Route path="/login" element={<Login />} />

        {/* Route for the dashboard with Sidebar */}
        <Route path="/dashboard" element={<><Sidebar /><Dashboard /></>} />

        <Route path="/server" element={<><Sidebar /><Server /></>} />

        {/* Route for the alerts page with Sidebar */}
        <Route path="/alerts" element={<><Sidebar /><Alerts /></>} />

        {/* Route for the settings page with Sidebar */}
        <Route path="/settings" element={<><Sidebar /><Settings /></>} />

        {/* Route for the users page with Sidebar */}
        <Route path="/users" element={<><Sidebar /><Users /></>} />

        {/* Redirect unknown routes to the login page */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
