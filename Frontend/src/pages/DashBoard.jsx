import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  if (user.role === "candidate") return <Navigate to="/candidate" />;
  if (user.role === "recruiter") return <Navigate to="/recruiter" />;
  if (user.role === "admin") return <Navigate to="/admin" />;

  return null;
};

export default Dashboard;
