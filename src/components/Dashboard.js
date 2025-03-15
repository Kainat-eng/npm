import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';

const Dashboard = () => {
  const systemLoadChartRef = useRef(null);
  const cpuUsageChartRef = useRef(null);
  const diskUsageChartRef = useRef(null);
  const memoryUsageChartRef = useRef(null); // New chart for memory usage

  const systemLoadChartInstance = useRef(null);
  const cpuUsageChartInstance = useRef(null);
  const diskUsageChartInstance = useRef(null);
  const memoryUsageChartInstance = useRef(null); // New chart instance

  const [systemMetrics, setSystemMetrics] = useState({
    cpu: {},
    currentLoad: {},
    mem: {},
    disk: [],
    network: {},
  });

  const [loading, setLoading] = useState(true);

  const fetchSystemMetrics = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
      const response = await fetch(`${apiUrl}/system-metrics`);
      const data = await response.json();
      setSystemMetrics(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching system metrics:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSystemMetrics();

    if (systemLoadChartInstance.current) systemLoadChartInstance.current.destroy();
    if (cpuUsageChartInstance.current) cpuUsageChartInstance.current.destroy();
    if (diskUsageChartInstance.current) diskUsageChartInstance.current.destroy();
    if (memoryUsageChartInstance.current) memoryUsageChartInstance.current.destroy(); // Clean up new chart instance

    if (systemLoadChartRef.current) {
      systemLoadChartInstance.current = new Chart(systemLoadChartRef.current.getContext('2d'), {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April'],
          datasets: [
            {
              label: 'System Load',
              data: loading ? [] : [systemMetrics.currentLoad.currentLoad, systemMetrics.currentLoad.currentLoad, systemMetrics.currentLoad.currentLoad, systemMetrics.currentLoad.currentLoad],
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
            },
          ],
        },
      });
    }

    if (cpuUsageChartRef.current) {
      cpuUsageChartInstance.current = new Chart(cpuUsageChartRef.current.getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April'],
          datasets: [
            {
              label: 'CPU Usage',
              data: loading ? [] : [systemMetrics.currentLoad.currentLoad, systemMetrics.currentLoad.currentLoad, systemMetrics.currentLoad.currentLoad, systemMetrics.currentLoad.currentLoad],
              borderColor: 'rgb(255, 40, 40)',
              backgroundColor: 'rgba(230, 7, 7, 0.4)',
            },
          ],
        },
      });
    }

    if (diskUsageChartRef.current) {
      diskUsageChartInstance.current = new Chart(diskUsageChartRef.current.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: ['Used Disk Space', 'Free Disk Space'],
          datasets: [
            {
              label: 'Disk Usage',
              data: loading ? [] : [systemMetrics.disk[0]?.used || 0, systemMetrics.disk[0]?.size - systemMetrics.disk[0]?.used || 0],
              backgroundColor: ['rgba(75,192,192,0.6)', 'rgba(255, 159, 64, 0.6)'],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              enabled: true,
            },
          },
          cutout: '80%',  // Smaller doughnut with a smoother appearance
        },
      });
    }

    if (memoryUsageChartRef.current) {
      memoryUsageChartInstance.current = new Chart(memoryUsageChartRef.current.getContext('2d'), { // New chart for memory usage
        type: 'bar',
        data: {
          labels: ['Used Memory', 'Free Memory'],
          datasets: [
            {
              label: 'Memory Usage',
              data: loading ? [] : [
                systemMetrics.mem?.used || 0,
                systemMetrics.mem?.total - systemMetrics.mem?.used || 0
              ],
              borderColor: 'rgba(153, 102, 255, 1)',
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
            },
          ],
        },
      });
    }

    return () => {
      if (systemLoadChartInstance.current) systemLoadChartInstance.current.destroy();
      if (cpuUsageChartInstance.current) cpuUsageChartInstance.current.destroy();
      if (diskUsageChartInstance.current) diskUsageChartInstance.current.destroy();
      if (memoryUsageChartInstance.current) memoryUsageChartInstance.current.destroy(); // Clean up new chart instance
    };
  }, [systemMetrics, loading]);

  return (
    <div className="container" id="main-container">
      <div className="content">
        <div id="dashboard-screen">
          <div className="dashboard-title">Dashboard</div>
          <div className="overview">
            <div className="card">
              System Runtime<br />
              <strong>{loading ? 'Loading...' : `${systemMetrics.cpu?.manufacturer} ${systemMetrics.cpu?.brand}`}</strong>
            </div>
            <div className="card">
              Total Memory<br />
              <strong>{loading ? 'Loading...' : `${(systemMetrics.mem?.total / 1024 / 1024 / 1024).toFixed(2)} GB`}</strong>
            </div>
            <div className="card">
              CPU Usage Rate<br />
              <strong>{loading ? 'Loading...' : `${systemMetrics.currentLoad?.currentLoad}%`}</strong>
            </div>
            <div className="card">
              Disk Usage<br />
              <strong>{loading ? 'Loading...' : `${(systemMetrics.disk[0]?.used / 1024 / 1024 / 1024).toFixed(2)} GB / ${(systemMetrics.disk[0]?.size / 1024 / 1024 / 1024).toFixed(2)} GB`}</strong>
            </div>
            <div className="card">
              Network Traffic<br />
              <strong>{loading ? 'Loading...' : `${systemMetrics.network?.in || 0} MB In / ${systemMetrics.network?.out || 0} MB Out`}</strong>
            </div>
          </div>
          <div className="chart-container">
            <div className="chart-card">
              <canvas id="systemLoadChart" ref={systemLoadChartRef}></canvas>
            </div>
            <div className="chart-card">
              <canvas id="cpuUsageChart" ref={cpuUsageChartRef}></canvas>
            </div>
            <div className="chart-card">
              <canvas id="diskUsageChart" ref={diskUsageChartRef}></canvas>
            </div>
            <div className="chart-card">
              <canvas id="memoryUsageChart" ref={memoryUsageChartRef}></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
