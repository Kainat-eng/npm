import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import "./App.css";

const Alerts = () => {
    const cpuChartRef = useRef(null);

    useEffect(() => {
        // Initialize CPU Utilization Chart
        const chartInstance = new Chart(cpuChartRef.current.getContext("2d"), {
            type: "line", // You can change this type to 'bar', 'line', etc.
            data: {
                labels: ["January", "February", "March", "April"],
                datasets: [
                    {
                        label: "CPU Utilization",
                        data: [45, 55, 65, 75], // Example data points
                        borderColor: "rgba(75,192,192,1)",
                        backgroundColor: "rgba(75,192,192,0.2)",
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            },
        });

        // Cleanup chart instance on unmount or before re-render
        return () => {
            if (chartInstance) {
                chartInstance.destroy(); // Destroy the previous chart instance
            }
        };
    }, []); // Empty dependency array ensures the effect runs only once

    return (
        <div className="content">
            <div className="header">
                <h1>Demo Alerts - Dashboard01</h1>
                <div className="logo">ServerEye</div>
            </div>

            <div className="alerts">
                <h2>All Alerts</h2>
                <div className="alert">
                    <div className="info">
                        <strong>CPU Utilization Alert</strong>
                        <span>OK for hours</span>
                    </div>
                    <div className="actions">
                        <button>View</button>
                        <button>Share</button>
                        <button>Inspect</button>
                    </div>
                </div>
                <div className="alert">
                    <div className="info">
                        <strong>High CPU Utilization Alert</strong>
                        <span>OK for hours</span>
                    </div>
                    <div className="actions">
                        <button>View</button>
                        <button>Share</button>
                        <button>Inspect</button>
                    </div>
                </div>
                <div className="alert">
                    <div className="info">
                        <strong>Low Memory Alert</strong>
                        <span style={{ color: "red" }}>ALERTING for 34 minutes</span>
                    </div>
                    <div className="actions">
                        <button>View</button>
                        <button>Share</button>
                        <button>Inspect</button>
                    </div>
                </div>
            </div>

            <div className="chart">
                <h2>CPU Utilization Panel</h2>
                <canvas ref={cpuChartRef} id="cpuChart"></canvas>
            </div>
        </div>
    );
};

export default Alerts;
