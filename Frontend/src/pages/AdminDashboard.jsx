import { useEffect, useState } from "react";
import API from "../services/api";
import "./Dashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/admin/users").then((res) => setUsers(res.data));
  }, []);

  const toggleBlock = (id) => {
    API.put(`/admin/block/${id}`).then(() =>
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
          className="card"
        >
          <span>
            {user.name} ({user.role})
          </span>
          <button
            onClick={() => toggleBlock(user._id)}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            {user.isBlocked ? "Unblock" : "Block"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
