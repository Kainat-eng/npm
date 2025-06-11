// import React, { useEffect, useState, useRef } from 'react';
// import { Chart } from 'chart.js/auto';

// const Dashboard = () => {
//   // Chart refs
//   const systemLoadChartRef = useRef(null);
//   const cpuUsageChartRef = useRef(null);
//   const diskUsageChartRef = useRef(null);
//   const memoryUsageChartRef = useRef(null);

//   // State for API data
//   const [systemMetrics, setSystemMetrics] = useState({
//     metrics: [],
//     uptime: 0,
//     downtime: 0,
//     location: null
//   });

//   const [uptimeData, setUptimeData] = useState(null);
//   const [monthlyMetrics, setMonthlyMetrics] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [apiErrors, setApiErrors] = useState({});

//   // Helper function to fetch with error handling
//   const fetchWithErrorHandling = async (url, endpointName) => {
//     try {
//       const response = await fetch(url);
//       if (!response.ok) throw new Error(`${endpointName} failed with status ${response.status}`);
//       return await response.json();
//     } catch (error) {
//       console.error(`Error fetching ${endpointName}:`, error);
//       setApiErrors(prev => ({ ...prev, [endpointName]: error.message }));
//       return null;
//     }
//   };

//   // Fetch all data
//   const fetchAllData = async () => {
//     try {
//       setLoading(true);
//       const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
      
//       // Fetch endpoints independently to handle partial failures
//       const metricsData = await fetchWithErrorHandling(
//         `${apiUrl}/api/system-metrics`,
//         'system-metrics'
//       );
      
//       const uptimeData = await fetchWithErrorHandling(
//         `${apiUrl}/api/uptime/monthly`,
//         'uptime-monthly'
//       );
      
//       const monthlyData = await fetchWithErrorHandling(
//         `${apiUrl}/api/system-metrics/monthly`,
//         'system-metrics-monthly'
//       );
      
//       const locationData = await fetchWithErrorHandling(
//         `${apiUrl}/api/system-location`,
//         'system-location'
//       );

//       // Update state only with successful responses
//       if (metricsData) {
//         setSystemMetrics(prev => ({
//           ...prev,
//           metrics: metricsData.metrics || [],
//           uptime: metricsData.uptime || 0,
//           downtime: metricsData.downtime || 0
//         }));
//       }

//       if (uptimeData) setUptimeData(uptimeData);
//       if (monthlyData) setMonthlyMetrics(Array.isArray(monthlyData) ? monthlyData : []);
//       if (locationData) setSystemMetrics(prev => ({ ...prev, location: locationData }));
      
//     } catch (error) {
//       console.error('Error in fetchAllData:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initialize data fetching
//   useEffect(() => {
//     fetchAllData();
//     const interval = setInterval(fetchAllData, 60000);
//     return () => clearInterval(interval);
//   }, []);

//   // Initialize charts when data is ready
//   useEffect(() => {
//     if (loading) return;

//     // Destroy existing charts
//     const destroyCharts = () => {
//       [systemLoadChartRef, cpuUsageChartRef, diskUsageChartRef, memoryUsageChartRef].forEach(ref => {
//         if (ref.current) {
//           const chartInstance = Chart.getChart(ref.current);
//           if (chartInstance) chartInstance.destroy();
//         }
//       });
//     };

//     destroyCharts();

//     // Create charts only if we have the required data
//     try {
//       // System Load Chart (Uptime)
//       if (systemLoadChartRef.current && uptimeData?.dailyUptime) {
//         new Chart(systemLoadChartRef.current, {
//           type: 'line',
//           data: {
//             labels: uptimeData.dailyUptime.map(item => item.date),
//             datasets: [{
//               label: 'Daily Uptime (%)',
//               data: uptimeData.dailyUptime.map(item => parseFloat(item.uptime)),
//               borderColor: '#4bc0c0',
//               backgroundColor: 'rgba(75, 192, 192, 0.2)',
//               tension: 0.3,
//               fill: true
//             }]
//           },
//           options: {
//             responsive: true,
//             maintainAspectRatio: false,
//             plugins: {
//               title: { display: true, text: 'System Uptime (%)' },
//               tooltip: { callbacks: { label: (tooltipItem) => `${tooltipItem.raw}%` } }
//             }
//           }
//         });
//       }

//       // CPU Usage Chart
//       if (cpuUsageChartRef.current && monthlyMetrics) {
//         new Chart(cpuUsageChartRef.current, {
//           type: 'bar',
//           data: {
//             labels: monthlyMetrics.map(item => `Month ${parseInt(item.month) + 1}`),
//             datasets: [{
//               label: 'CPU Usage (%)',
//               data: monthlyMetrics.map(item => item.cpuUsage),
//               backgroundColor: 'rgba(255, 99, 132, 0.6)',
//               borderColor: 'rgb(255, 99, 132)',
//               borderWidth: 1
//             }]
//           },
//           options: {
//             responsive: true,
//             maintainAspectRatio: false,
//             scales: { y: { beginAtZero: true, max: 100 } },
//             plugins: {
//               title: { display: true, text: 'CPU Usage (%)' },
//               tooltip: { callbacks: { label: (tooltipItem) => `${tooltipItem.raw.toFixed(1)}%` } }
//             }
//           }
//         });
//       }

//       // Disk Usage Chart
//       if (diskUsageChartRef.current && systemMetrics.metrics[0]?.disk) {
//         const disk = systemMetrics.metrics[0].disk[0];
//         new Chart(diskUsageChartRef.current, {
//           type: 'doughnut',
//           data: {
//             labels: ['Used', 'Free'],
//             datasets: [{
//               data: [disk.use, 100 - disk.use],
//               backgroundColor: ['#36a2eb', '#ffcd56'],
//               borderColor: '#fff',
//               borderWidth: 2
//             }]
//           },
//           options: {
//             responsive: true,
//             maintainAspectRatio: false,
//             plugins: {
//               title: { display: true, text: 'Disk Usage (%)' },
//               tooltip: { callbacks: { label: (tooltipItem) => `${tooltipItem.raw.toFixed(1)}%` } }
//             }
//           }
//         });
//       }

//       // Memory Usage Chart
//       if (memoryUsageChartRef.current && monthlyMetrics) {
//         new Chart(memoryUsageChartRef.current, {
//           type: 'bar',
//           data: {
//             labels: monthlyMetrics.map(item => `Month ${parseInt(item.month) + 1}`),
//             datasets: [{
//               label: 'Memory Usage (%)',
//               data: monthlyMetrics.map(item => item.memoryUsage),
//               backgroundColor: 'rgba(75, 192, 192, 0.6)',
//               borderColor: 'rgb(75, 192, 192)',
//               borderWidth: 1
//             }]
//           },
//           options: {
//             responsive: true,
//             maintainAspectRatio: false,
//             scales: { y: { beginAtZero: true, max: 100 } },
//             plugins: {
//               title: { display: true, text: 'Memory Usage (%)' },
//               tooltip: { callbacks: { label: (tooltipItem) => `${tooltipItem.raw.toFixed(1)}%` } }
//             }
//           }
//         });
//       }
//     } catch (chartError) {
//       console.error('Error initializing charts:', chartError);
//     }

//     return destroyCharts;
//   }, [loading, systemMetrics, uptimeData, monthlyMetrics]);

//   const formatUptime = (seconds) => {
//     if (typeof seconds !== 'number') return 'N/A';
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const sec = seconds % 60;
//     return `${hours}h ${minutes}m ${sec}s`;
//   };

//   const getCurrentMetric = () => systemMetrics.metrics[0] || {};

//   return (
//     <div className="container" id="main-container">
//       <div className="content">
//         <div id="dashboard-screen">
//           <div className="dashboard-title">Dashboard</div>
          
//           {/* Display API errors if any */}
//           {Object.keys(apiErrors).length > 0 && (
//             <div className="api-errors">
//               <h3>API Issues:</h3>
//               {Object.entries(apiErrors).map(([endpoint, error]) => (
//                 <p key={endpoint}><strong>{endpoint}:</strong> {error}</p>
//               ))}
//             </div>
//           )}

//           <div className="overview">
//             {/* System Status Cards */}
//             <div className="card">
//               <h3>System Uptime</h3>
//               <p>{loading ? 'Loading...' : formatUptime(systemMetrics.uptime)}</p>
//               {apiErrors['system-metrics'] && <small className="error">Could not update</small>}
//             </div>

//             <div className="card">
//               <h3>System Downtime</h3>
//               <p>{loading ? 'Loading...' : formatUptime(systemMetrics.downtime)}</p>
//               {apiErrors['system-metrics'] && <small className="error">Could not update</small>}
//             </div>

//             <div className="card">
//               <h3>Monthly Uptime</h3>
//               <p>{loading ? 'Loading...' : uptimeData ? `${uptimeData.uptimePercentage}%` : 'N/A'}</p>
//               {apiErrors['uptime-monthly'] && <small className="error">Could not update</small>}
//             </div>

//             {/* Hardware Info Cards */}
//             <div className="card">
//               <h3>CPU</h3>
//               <p>{loading ? 'Loading...' : getCurrentMetric().cpu?.brand || 'N/A'}</p>
//               <small>{getCurrentMetric().cpu?.manufacturer || ''}</small>
//               {apiErrors['system-metrics'] && <small className="error">Could not update</small>}
//             </div>

//             <div className="card">
//               <h3>CPU Usage</h3>
//               <p>{loading ? 'Loading...' : getCurrentMetric().currentLoad ? `${getCurrentMetric().currentLoad.currentLoad?.toFixed(1)}%` : 'N/A'}</p>
//               {apiErrors['system-metrics'] && <small className="error">Could not update</small>}
//             </div>

//             {/* Memory Card */}
//             <div className="card">
//               <h3>Memory Usage</h3>
//               <p>
//                 {loading ? 'Loading...' : 
//                  getCurrentMetric().mem ? 
//                  `${((getCurrentMetric().mem.used / getCurrentMetric().mem.total) * 100).toFixed(1)}%` : 
//                  'N/A'}
//               </p>
//               {apiErrors['system-metrics'] && <small className="error">Could not update</small>}
//             </div>

//             {/* Disk Card */}
//             <div className="card">
//               <h3>Disk Usage</h3>
//               <p>
//                 {loading ? 'Loading...' : 
//                  getCurrentMetric().disk?.length > 0 ? 
//                  `${getCurrentMetric().disk[0].use.toFixed(1)}%` : 
//                  'N/A'}
//               </p>
//               {apiErrors['system-metrics'] && <small className="error">Could not update</small>}
//             </div>

//             {/* Location Card */}
//             <div className="card">
//               <h3>Location</h3>
//               <p>
//                 {loading ? 'Loading...' : 
//                  systemMetrics.location ? 
//                  `${systemMetrics.location.city || ''}, ${systemMetrics.location.country || ''}` : 
//                  'N/A'}
//               </p>
//               {apiErrors['system-location'] && <small className="error">Could not update</small>}
//             </div>
//           </div>

//           {/* Charts Section */}
//           <div className="chart-container">
//             <div className="chart-wrapper">
//               {uptimeData ? (
//                 <canvas ref={systemLoadChartRef} />
//               ) : (
//                 <div className="chart-placeholder">
//                   {apiErrors['uptime-monthly'] ? 'Uptime data unavailable' : 'Loading uptime data...'}
//                 </div>
//               )}
//             </div>

//             <div className="chart-wrapper">
//               {monthlyMetrics ? (
//                 <canvas ref={cpuUsageChartRef} />
//               ) : (
//                 <div className="chart-placeholder">
//                   {apiErrors['system-metrics-monthly'] ? 'CPU data unavailable' : 'Loading CPU data...'}
//                 </div>
//               )}
//             </div>

//             <div className="chart-wrapper">
//               {systemMetrics.metrics[0]?.disk ? (
//                 <canvas ref={diskUsageChartRef} />
//               ) : (
//                 <div className="chart-placeholder">
//                   {apiErrors['system-metrics'] ? 'Disk data unavailable' : 'Loading disk data...'}
//                 </div>
//               )}
//             </div>

//             <div className="chart-wrapper">
//               {monthlyMetrics ? (
//                 <canvas ref={memoryUsageChartRef} />
//               ) : (
//                 <div className="chart-placeholder">
//                   {apiErrors['system-metrics-monthly'] ? 'Memory data unavailable' : 'Loading memory data...'}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase';

const Dashboard = () => {
  // Chart refs
  const systemLoadChartRef = useRef(null);
  const cpuUsageChartRef = useRef(null);
  const diskUsageChartRef = useRef(null);
  const memoryUsageChartRef = useRef(null);

  // State for API data
  const [serverMetrics, setServerMetrics] = useState({
    'Server-01': { metrics: [], uptime: 0, downtime: 0, location: null },
    'Server-02': { metrics: [], uptime: 0, downtime: 0, location: null }
  });
  const [uptimeData, setUptimeData] = useState({
    'Server-01': null,
    'Server-02': null
  });
  const [monthlyMetrics, setMonthlyMetrics] = useState({
    'Server-01': null,
    'Server-02': null
  });
  const [loading, setLoading] = useState(true);
  const [apiErrors, setApiErrors] = useState({});
  const [activeServer, setActiveServer] = useState('Server-01');

  // Initialize auth state listener
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchAllData();
        // Set up interval for auto-refresh every minute
        const intervalId = setInterval(fetchAllData, 60000);
        return () => clearInterval(intervalId);
      } else {
        console.log('User not authenticated');
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  // Fetch with error handling
const fetchWithErrorHandling = async (url, endpointName, serverId) => {
  try {
    const auth = getAuth(app);
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const token = await user.getIdToken();
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Add server ID header if provided
    if (serverId) {
      headers['X-Server-ID'] = serverId;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
      credentials: 'include'
    });

    if (response.status === 401) {
      await user.getIdToken(true);
      return fetchWithErrorHandling(url, endpointName, serverId);
    }

    if (!response.ok) {
      throw new Error(`${endpointName} failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpointName} for ${serverId}:`, error);
    setApiErrors(prev => ({ 
      ...prev, 
      [`${serverId}-${endpointName}`]: error.message 
    }));
    return null;
  }
};

  // Fetch all data for both servers
  const fetchAllData = async () => {
    const auth = getAuth(app);
    if (!auth.currentUser) {
      console.log('Not authenticated - skipping data fetch');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
      
      // Fetch data for both servers in parallel
      const serverIds = ['Server-01', 'Server-02'];
      const allData = await Promise.all(serverIds.map(async (serverId) => {
        const [metricsData, uptimeData] = await Promise.all([
          fetchWithErrorHandling(`${apiUrl}/api/system-metrics`, 'system-metrics', serverId),
          fetchWithErrorHandling(`${apiUrl}/api/system-metrics/monthly`, 'system-metrics-monthly', serverId)
        ]);

        return {
          serverId,
          metricsData,
          uptimeData
        };
      }));

      // Update state for each server
      allData.forEach(({ serverId, metricsData, uptimeData }) => {
        if (metricsData) {
          setServerMetrics(prev => ({
            ...prev,
            [serverId]: {
              ...prev[serverId],
              metrics: metricsData.metrics || [],
              uptime: metricsData.uptime || 0,
              downtime: metricsData.downtime || 0
            }
          }));
        }

        if (uptimeData) {
          setUptimeData(prev => ({
            ...prev,
            [serverId]: {
              dailyUptime: uptimeData.map(item => ({
                date: item.date,
                uptime: item.uptime
              })),
              uptimePercentage: uptimeData.reduce((sum, item) => sum + item.uptime, 0) / uptimeData.length
            }
          }));
        }
      });

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initialize charts for active server
  useEffect(() => {
    if (loading) return;

    const destroyCharts = () => {
      [systemLoadChartRef, cpuUsageChartRef, diskUsageChartRef, memoryUsageChartRef].forEach(ref => {
        if (ref.current) {
          const chartInstance = Chart.getChart(ref.current);
          if (chartInstance) chartInstance.destroy();
        }
      });
    };

    destroyCharts();

    const currentServerData = serverMetrics[activeServer];
    const currentUptimeData = uptimeData[activeServer];
    
    if (!currentServerData || !currentServerData.metrics.length) return;

    const currentMetric = currentServerData.metrics[0];
    const diskData = currentMetric.disk || [{ use: 0 }];

    // System Load Chart
    if (systemLoadChartRef.current && currentUptimeData) {
      new Chart(systemLoadChartRef.current, {
        type: 'line',
        data: {
          labels: currentUptimeData.dailyUptime.map(item => item.date),
          datasets: [{
            label: 'Daily Uptime (%)',
            data: currentUptimeData.dailyUptime.map(item => item.uptime),
            borderColor: '#4bc0c0',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.3,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: { display: true, text: 'System Uptime (%)' },
            tooltip: { callbacks: { label: (tooltipItem) => `${tooltipItem.raw}%` } }
          }
        }
      });
    }

    // CPU Usage Chart
    if (cpuUsageChartRef.current && currentServerData.metrics.length > 0) {
      const cpuData = currentServerData.metrics.slice(0, 10).reverse().map((metric, index) => ({
        time: index,
        load: metric.currentLoad?.currentLoad || 0
      }));

      new Chart(cpuUsageChartRef.current, {
        type: 'line',
        data: {
          labels: cpuData.map(item => `Time ${item.time}`),
          datasets: [{
            label: 'CPU Usage (%)',
            data: cpuData.map(item => item.load),
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1,
            tension: 0.1,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: { y: { beginAtZero: true, max: 100 } },
          plugins: {
            title: { display: true, text: 'Recent CPU Usage (%)' },
            tooltip: { callbacks: { label: (tooltipItem) => `${tooltipItem.raw.toFixed(1)}%` } }
          }
        }
      });
    }

    // Disk Usage Chart
    if (diskUsageChartRef.current) {
      new Chart(diskUsageChartRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Used', 'Free'],
          datasets: [{
            data: [diskData[0].use, 100 - diskData[0].use],
            backgroundColor: ['#36a2eb', '#ffcd56'],
            borderColor: '#fff',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: { display: true, text: 'Disk Usage (%)' },
            tooltip: { callbacks: { label: (tooltipItem) => `${tooltipItem.raw.toFixed(1)}%` } }
          }
        }
      });
    }

    // Memory Usage Chart
    if (memoryUsageChartRef.current && currentServerData.metrics.length > 0) {
      const memData = currentServerData.metrics.slice(0, 10).reverse().map((metric, index) => ({
        time: index,
        usage: metric.mem ? (metric.mem.used / metric.mem.total) * 100 : 0
      }));

      new Chart(memoryUsageChartRef.current, {
        type: 'line',
        data: {
          labels: memData.map(item => `Time ${item.time}`),
          datasets: [{
            label: 'Memory Usage (%)',
            data: memData.map(item => item.usage),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1,
            tension: 0.1,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: { y: { beginAtZero: true, max: 100 } },
          plugins: {
            title: { display: true, text: 'Recent Memory Usage (%)' },
            tooltip: { callbacks: { label: (tooltipItem) => `${tooltipItem.raw.toFixed(1)}%` } }
          }
        }
      });
    }

    return destroyCharts;
  }, [loading, serverMetrics, uptimeData, activeServer]);

  // Helper functions
  const formatUptime = (seconds) => {
    if (typeof seconds !== 'number') return 'N/A';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;
    return `${hours}h ${minutes}m ${sec}s`;
  };

  const getCurrentMetric = () => {
    return serverMetrics[activeServer]?.metrics?.[0] || {};
  };

  const getUptimePercentage = () => {
    return uptimeData[activeServer]?.uptimePercentage || 0;
  };

  const handleServerToggle = (serverId) => {
    setActiveServer(serverId);
  };

  const currentMetric = getCurrentMetric();
  const memoryUsage = currentMetric.mem ? 
    ((currentMetric.mem.used / currentMetric.mem.total) * 100).toFixed(1) : 
    'N/A';
  const diskUsage = currentMetric.disk?.[0]?.use?.toFixed(1) || 'N/A';
  const cpuUsage = currentMetric.currentLoad?.currentLoad?.toFixed(1) || 'N/A';

  return (
    <div className="zimbra-dashboard">
      <div className="dashboard-header">
        <h1>System Dashboard - {activeServer}</h1>
        <div className="time-period">Last Updated: {new Date().toLocaleTimeString()}</div>
      </div>

      <div className="server-toggle">
        <button 
          className={`server-btn ${activeServer === 'Server-01' ? 'active' : ''}`}
          onClick={() => handleServerToggle('Server-01')}
        >
          Server 01
        </button>
        <button 
          className={`server-btn ${activeServer === 'Server-02' ? 'active' : ''}`}
          onClick={() => handleServerToggle('Server-02')}
        >
          Server 02
        </button>
      </div>

      <div className="metrics-table">
        <table>
          <thead>
            <tr>
              <th>Metric</th>
              <th>Uptime</th>
              <th>Downtime</th>
              <th>Uptime %</th>
              <th>CPU Usage</th>
              <th>Memory Usage</th>
              <th>Disk Usage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Current</td>
              <td>{formatUptime(serverMetrics[activeServer]?.uptime)}</td>
              <td>{formatUptime(serverMetrics[activeServer]?.downtime)}</td>
              <td>{getUptimePercentage().toFixed(2)}%</td>
              <td>{cpuUsage}%</td>
              <td>{memoryUsage}%</td>
              <td>{diskUsage}%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="cpu-usage-section">
        <h2>System Overview</h2>
        <div className="cpu-usage-grid">
          <div className="cpu-usage-card">
            <h3>CPU Brand</h3>
            <p>{currentMetric.cpu?.brand || 'N/A'}</p>
          </div>
          <div className="cpu-usage-card">
            <h3>CPU Usage</h3>
            <p>{cpuUsage}%</p>
          </div>
          <div className="cpu-usage-card">
            <h3>Memory Usage</h3>
            <p>{memoryUsage}%</p>
          </div>
          <div className="cpu-usage-card">
            <h3>Disk Usage</h3>
            <p>{diskUsage}%</p>
          </div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-container">
          <h2>System Uptime</h2>
          <div className="chart-wrapper">
            <canvas ref={systemLoadChartRef} />
          </div>
        </div>

        <div className="chart-container">
          <h2>CPU Usage History</h2>
          <div className="chart-wrapper">
            <canvas ref={cpuUsageChartRef} />
          </div>
        </div>

        <div className="chart-container">
          <h2>Disk Usage</h2>
          <div className="chart-wrapper">
            <canvas ref={diskUsageChartRef} />
          </div>
        </div>

        <div className="chart-container">
          <h2>Memory Usage</h2>
          <div className="chart-wrapper">
            <canvas ref={memoryUsageChartRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;