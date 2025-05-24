// import React from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';

// const Sidebar = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Perform any logout logic here (e.g., clearing session, token, etc.)
//     // Then navigate to the login page
//     navigate('/login');
//   };

//   return (
//     <nav className="sidebar">
//       <ul>
//         <li>
//           <NavLink 
//             to="/dashboard" 
//             className={({ isActive }) => isActive ? "sidebar-icon active" : "sidebar-icon"}
//             title="Dashboard"
//           >
//             <i className="fas fa-home" aria-hidden="true"></i>
//           </NavLink>
//         </li>
//         <li>
//           <NavLink 
//             to="/server" 
//             className={({ isActive }) => isActive ? "sidebar-icon active" : "sidebar-icon"}
//             title="Server"
//           >
//             <i className="fas fa-server" aria-hidden="true"></i>
//           </NavLink>
//         </li>
//         <li>
//           <NavLink 
//             to="/alerts" 
//             className={({ isActive }) => isActive ? "sidebar-icon active" : "sidebar-icon"}
//             title="Alerts"
//           >
//             <i className="fas fa-bell" aria-hidden="true"></i>
//           </NavLink>
//         </li>
//         <li>
//           <NavLink 
//             to="/settings" 
//             className={({ isActive }) => isActive ? "sidebar-icon active" : "sidebar-icon"}
//             title="Settings"
//           >
//             <i className="fas fa-cogs" aria-hidden="true"></i>
//           </NavLink>
//         </li>
//         <li>
//           <NavLink 
//             to="/users" 
//             className={({ isActive }) => isActive ? "sidebar-icon active" : "sidebar-icon"}
//             title="Users"
//           >
//             <i className="fas fa-user" aria-hidden="true"></i>
//           </NavLink>
//         </li>
//         <li>
//           <button 
//             onClick={handleLogout} 
//             className="sidebar-icon logout-btn"
//             title="Logout"
//           >
//             <i className="fas fa-sign-out-alt" aria-hidden="true"></i>
//           </button>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Sidebar;

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  // Get user role from localStorage
  const role = localStorage.getItem('role'); // assumes 'Admin', 'ServerAdmin', or 'User'

  const handleLogout = () => {
    localStorage.clear(); // Clear all saved tokens/roles etc.
    navigate('/login');
  };

  return (
    <nav className="sidebar">
      <ul>
        {/* Dashboard visible to all */}
        <li>
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => isActive ? "sidebar-icon active" : "sidebar-icon"}
            title="Dashboard"
          >
            <i className="fas fa-home" aria-hidden="true"></i>
          </NavLink>
        </li>

        {/* Server - only for ServerAdmin */}
        {role === 'ServerAdmin' && (
        <li>
          <NavLink 
           to="/server" 
           className={({ isActive }) => isActive ? "sidebar-icon active" : "sidebar-icon"}
           title="Server"
         >
            <i className="fas fa-server" aria-hidden="true"></i>
         </NavLink>
       </li>
      )}


        {/* Alerts - visible to all */}
        <li>
          <NavLink 
            to="/alerts" 
            className={({ isActive }) => isActive ? "sidebar-icon active" : "sidebar-icon"}
            title="Alerts"
          >
            <i className="fas fa-bell" aria-hidden="true"></i>
          </NavLink>
        </li>

        {/* Settings - visible to all */}
        <li>
          <NavLink 
            to="/settings" 
            className={({ isActive }) => isActive ? "sidebar-icon active" : "sidebar-icon"}
            title="Settings"
          >
            <i className="fas fa-cogs" aria-hidden="true"></i>
          </NavLink>
        </li>

        {/* Users - only for Admin */}
        {role === 'Admin' && (
          <li>
            <NavLink 
              to="/users" 
              className={({ isActive }) => isActive ? "sidebar-icon active" : "sidebar-icon"}
              title="Users"
            >
              <i className="fas fa-user" aria-hidden="true"></i>
            </NavLink>
          </li>
        )}

        {/* Logout - visible to all */}
        <li>
          <button 
            onClick={handleLogout} 
            className="sidebar-icon logout-btn"
            title="Logout"
          >
            <i className="fas fa-sign-out-alt" aria-hidden="true"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
