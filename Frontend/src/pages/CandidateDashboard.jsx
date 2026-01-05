import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyApplications } from "../features/applications/applicationSlice";
import Loader from "../components/Loader";
import "./Dashboard.css";


const CandidateDashboard = () => {
  const dispatch = useDispatch();
  const { applications, isLoading } = useSelector(
    (state) => state.applications
  );

  useEffect(() => {
    dispatch(fetchMyApplications());
  }, [dispatch]);

  if (isLoading) return <Loader />;
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">My Applications</h1>

      {applications.length === 0 && <p>No applications found.</p>}

      {applications.map((app) => (
        <div className="card" key={app._id}>
          <h3>{app.job.title}</h3>
          <p>{app.job.location}</p>
          <div className={`status ${app.status.toLowerCase()}`}>
            {app.status}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CandidateDashboard;
