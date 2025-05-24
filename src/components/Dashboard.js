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

const Dashboard = () => {
  // Chart refs
  const systemLoadChartRef = useRef(null);
  const cpuUsageChartRef = useRef(null);
  const diskUsageChartRef = useRef(null);
  const memoryUsageChartRef = useRef(null);

  // State for API data
  const [systemMetrics, setSystemMetrics] = useState({
    metrics: [],
    uptime: 0,
    downtime: 0,
    location: null
  });

  const [uptimeData, setUptimeData] = useState(null);
  const [monthlyMetrics, setMonthlyMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiErrors, setApiErrors] = useState({});

  // Dummy data for fallback
  const dummyMetrics = {
    metrics: [{
      cpu: { brand: 'Intel Xeon', manufacturer: 'Intel' },
      currentLoad: { currentLoad: 35.2 },
      mem: { used: 8589934592, total: 17179869184 }, // 8GB used of 16GB
      disk: [{ use: 65.3 }]
    }],
    uptime: 86400 * 7, // 7 days
    downtime: 3600, // 1 hour
    location: { city: 'New York', country: 'USA' }
  };

  const dummyUptimeData = {
    dailyUptime: Array(7).fill(0).map((_, i) => ({
      date: new Date(Date.now() - (6 - i) * 86400000).toLocaleDateString(),
      uptime: 90 + Math.random() * 10
    })),
    uptimePercentage: 98.7
  };

  const dummyMonthlyMetrics = Array(12).fill(0).map((_, i) => ({
    month: i,
    cpuUsage: 30 + Math.random() * 40,
    memoryUsage: 40 + Math.random() * 30
  }));

  // Helper function to fetch with error handling
  const fetchWithErrorHandling = async (url, endpointName) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`${endpointName} failed with status ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${endpointName}:`, error);
      setApiErrors(prev => ({ ...prev, [endpointName]: error.message }));
      return null;
    }
  };

  // Fetch all data
  const fetchAllData = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
      
      const metricsData = await fetchWithErrorHandling(
        `${apiUrl}/api/system-metrics`,
        'system-metrics'
      );
      
      const uptimeData = await fetchWithErrorHandling(
        `${apiUrl}/api/uptime/monthly`,
        'uptime-monthly'
      );
      
      const monthlyData = await fetchWithErrorHandling(
        `${apiUrl}/api/system-metrics/monthly`,
        'system-metrics-monthly'
      );
      
      const locationData = await fetchWithErrorHandling(
        `${apiUrl}/api/system-location`,
        'system-location'
      );

      if (metricsData) {
        setSystemMetrics(prev => ({
          ...prev,
          metrics: metricsData.metrics || [],
          uptime: metricsData.uptime || 0,
          downtime: metricsData.downtime || 0
        }));
      }

      if (uptimeData) setUptimeData(uptimeData);
      if (monthlyData) setMonthlyMetrics(Array.isArray(monthlyData) ? monthlyData : []);
      if (locationData) setSystemMetrics(prev => ({ ...prev, location: locationData }));
      
    } catch (error) {
      console.error('Error in fetchAllData:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 60000);
    return () => clearInterval(interval);
  }, []);

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

    try {
      // Use real data if available, otherwise use dummy data
      const useUptimeData = uptimeData || dummyUptimeData;
      const useMonthlyMetrics = monthlyMetrics || dummyMonthlyMetrics;
      const useCurrentMetrics = systemMetrics.metrics.length > 0 ? systemMetrics : dummyMetrics;
      const useDiskData = useCurrentMetrics.metrics[0]?.disk || dummyMetrics.metrics[0].disk;

      // System Load Chart (Uptime)
      if (systemLoadChartRef.current) {
        new Chart(systemLoadChartRef.current, {
          type: 'line',
          data: {
            labels: useUptimeData.dailyUptime.map(item => item.date),
            datasets: [{
              label: 'Daily Uptime (%)',
              data: useUptimeData.dailyUptime.map(item => parseFloat(item.uptime)),
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
      if (cpuUsageChartRef.current) {
        new Chart(cpuUsageChartRef.current, {
          type: 'bar',
          data: {
            labels: useMonthlyMetrics.map(item => `Month ${parseInt(item.month) + 1}`),
            datasets: [{
              label: 'CPU Usage (%)',
              data: useMonthlyMetrics.map(item => item.cpuUsage),
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true, max: 100 } },
            plugins: {
              title: { display: true, text: 'CPU Usage (%)' },
              tooltip: { callbacks: { label: (tooltipItem) => `${tooltipItem.raw.toFixed(1)}%` } }
            }
          }
        });
      }

      // Disk Usage Chart
      if (diskUsageChartRef.current) {
        const disk = useDiskData[0];
        new Chart(diskUsageChartRef.current, {
          type: 'doughnut',
          data: {
            labels: ['Used', 'Free'],
            datasets: [{
              data: [disk.use, 100 - disk.use],
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
      if (memoryUsageChartRef.current) {
        new Chart(memoryUsageChartRef.current, {
          type: 'bar',
          data: {
            labels: useMonthlyMetrics.map(item => `Month ${parseInt(item.month) + 1}`),
            datasets: [{
              label: 'Memory Usage (%)',
              data: useMonthlyMetrics.map(item => item.memoryUsage),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgb(75, 192, 192)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true, max: 100 } },
            plugins: {
              title: { display: true, text: 'Memory Usage (%)' },
              tooltip: { callbacks: { label: (tooltipItem) => `${tooltipItem.raw.toFixed(1)}%` } }
            }
          }
        });
      }
    } catch (chartError) {
      console.error('Error initializing charts:', chartError);
    }

    return destroyCharts;
  }, [loading, systemMetrics, uptimeData, monthlyMetrics]);

  const formatUptime = (seconds) => {
    if (typeof seconds !== 'number') return 'N/A';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;
    return `${hours}h ${minutes}m ${sec}s`;
  };

  const getCurrentMetric = () => {
    return systemMetrics.metrics.length > 0 ? systemMetrics.metrics[0] : dummyMetrics.metrics[0];
  };

  const getUptimePercentage = () => {
    return uptimeData ? uptimeData.uptimePercentage : dummyUptimeData.uptimePercentage;
  };

  return (
    <div className="zimbra-dashboard">
      <div className="dashboard-header">
        <h1>System Dashboard</h1>
        <div className="time-period">1.4 week</div>
      </div>

      <div className="metrics-table">
        <table>
          <thead>
            <tr>
              <th>Metric</th>
              <th>Recorded Megabytes</th>
              <th>Delivered Megabytes</th>
              <th>Total Alerts</th>
              <th>Resolved Alerts</th>
              <th>CPU Usage</th>
              <th>Memory Usage</th>
              <th>Disk Usage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Current</td>
              <td>1.32 MB</td>
              <td>2.57 MB</td>
              <td>8</td>
              <td>5</td>
              <td>{getCurrentMetric().currentLoad ? `${getCurrentMetric().currentLoad.currentLoad?.toFixed(1)}%` : 'N/A'}</td>
              <td>{getCurrentMetric().mem ? 
                 `${((getCurrentMetric().mem.used / getCurrentMetric().mem.total) * 100).toFixed(1)}%` : 
                 'N/A'}</td>
              <td>{getCurrentMetric().disk?.length > 0 ? 
                 `${getCurrentMetric().disk[0].use.toFixed(1)}%` : 
                 'N/A'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="cpu-usage-section">
        <h2>CPU Usage</h2>
        <div className="cpu-usage-grid">
          <div className="cpu-usage-card">
            <h3>CPU 0</h3>
            <p>{getCurrentMetric().currentLoad ? `${getCurrentMetric().currentLoad.currentLoad?.toFixed(1)}%` : 'N/A'}</p>
          </div>
          <div className="cpu-usage-card">
            <h3>CPU 25</h3>
            <p>25%</p>
          </div>
          <div className="cpu-usage-card">
            <h3>CPU 30</h3>
            <p>30%</p>
          </div>
          <div className="cpu-usage-card">
            <h3>CPU 40</h3>
            <p>40%</p>
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