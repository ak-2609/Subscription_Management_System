import { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Home, Package, Settings } from "lucide-react";

export default function Dashboard() {
  const [plans, setPlans] = useState([
    { id: 1, name: "Basic", speed: "100 Mbps", quota: "100 GB", price: 500 },
    { id: 2, name: "Pro", speed: "300 Mbps", quota: "300 GB", price: 900 },
    { id: 3, name: "Ultra", speed: "500 Mbps", quota: "500 GB", price: 1500 },
  ]);

  const pieData = [
    { name: "Active", value: 70 },
    { name: "Cancelled", value: 30 },
  ];

  const barData = [
    { month: "Jan", users: 200 },
    { month: "Feb", users: 300 },
    { month: "Mar", users: 250 },
    { month: "Apr", users: 400 },
  ];

  const COLORS = ["#4cafef", "#f87171"];

  return (
    <div className="dashboard">
      {/* Internal CSS */}
      <style>{`
        .dashboard {
          display: flex;
          height: 100vh;
          font-family: Arial, sans-serif;
          background: #f4f7fb;
        }

        .sidebar {
          width: 220px;
          background: #1f2937;
          color: #fff;
          padding: 20px;
        }

        .sidebar-title {
          font-size: 1.5rem;
          margin-bottom: 20px;
        }

        .sidebar ul {
          list-style: none;
          padding: 0;
        }

        .sidebar li {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 0;
          cursor: pointer;
          transition: 0.3s;
        }

        .sidebar li:hover {
          color: #60a5fa;
        }

        .main {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
        }

        .dashboard-title {
          font-size: 2rem;
          margin-bottom: 20px;
        }

        .cards {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
        }

        .card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          flex: 1;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          text-align: center;
        }

        .card h2 {
          font-size: 1.2rem;
          margin-bottom: 10px;
        }

        .card p {
          font-size: 1.5rem;
          font-weight: bold;
        }

        .charts {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
        }

        .chart {
          flex: 1;
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }

        .table-container {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }

        .plan-table {
          width: 100%;
          border-collapse: collapse;
        }

        .plan-table th,
        .plan-table td {
          padding: 12px;
          border-bottom: 1px solid #ddd;
          text-align: left;
        }
      `}</style>

      <aside className="sidebar">
        <h2 className="sidebar-title">Admin</h2>
        <ul>
          <li><Home size={20}/> Home</li>
          <li><Package size={20}/> Plans</li>
          <li><Settings size={20}/> Settings</li>
        </ul>
      </aside>

      <main className="main">
        <h1 className="dashboard-title">Dashboard</h1>

        <div className="cards">
          <motion.div className="card" whileHover={{ scale: 1.05 }}>
            <h2>Total Plans</h2>
            <p>{plans.length}</p>
          </motion.div>
          <motion.div className="card" whileHover={{ scale: 1.05 }}>
            <h2>Revenue</h2>
            <p>₹ {plans.reduce((sum, p) => sum + p.price, 0)}</p>
          </motion.div>
          <motion.div className="card" whileHover={{ scale: 1.05 }}>
            <h2>Active Users</h2>
            <p>540</p>
          </motion.div>
        </div>

        <div className="charts">
          <div className="chart">
            <h3>Subscriptions</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart">
            <h3>User Growth</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Bar dataKey="users" fill="#4cafef" />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="table-container">
          <h3>Plans</h3>
          <table className="plan-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Speed</th>
                <th>Quota</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan.id}>
                  <td>{plan.name}</td>
                  <td>{plan.speed}</td>
                  <td>{plan.quota}</td>
                  <td>₹ {plan.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}