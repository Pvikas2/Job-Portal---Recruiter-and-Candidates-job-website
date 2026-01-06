import { useEffect, useState } from "react";
import API from "../services/api";
import "./Dashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/admin/users").then((res) => setUsers(res.data));
  }, []);

  const toggleBlock = (id) => {
    API.put(`/admin/users/${id}/${users.find(u => u._id === id)?.isBlocked ? "unblock" : "block"}`).then(() =>
      setUsers((prev) =>
        prev.map((u) =>
          u._id === id ? { ...u, isBlocked: !u.isBlocked } : u
        )
      )
    );
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Panel</h1>

      {users.map((user) => (
        <div
          key={user._id}
          className="bg-blue-300 flex justify-between items-center mb-4 p-4 border rounded"
        >
          <span>
            {user.name} ({user.role}) - <span className={` ${user.isBlocked ? "bg-red-500" : "bg-green-500" } text-xs font-light rounded-lg px-2 py-1`}>{user.isBlocked ? "Blocked" : "Active"}</span>
          </span>
          <button
            onClick={() => toggleBlock(user._id)}
            className={`text-white px-3 py-1 rounded ${user.isBlocked ? "bg-green-500" : "bg-red-500"}`}
          >
            {user.isBlocked ? "Unblock" : "Block"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
