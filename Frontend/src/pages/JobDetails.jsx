import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobById, applyJob, resetStatus } from "../features/jobs/jobSlice";
import { useParams } from "react-router-dom";
import ApplyJobModal from "../components/ApplyJobModal";
import "./JobDetails.css";
import Loader from "../components/Loader";

const JobDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { job, success, error } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);

  const [showModal, setShowModal] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(false);

  useEffect(() => {
    dispatch(fetchJobById(id));
    return () => dispatch(resetStatus());
  }, [dispatch, id]);

  // Check if profile already exists
  useEffect(() => {
    if (user?.resume && user?.phone && user?.skills?.length) {
      setProfileCompleted(true);
    }
  }, [user]);

  if (!job) return <Loader/>
  console.log(user);

  return (
    <div className="job-details-container">
      <h1>{job.title}</h1>
      <p className="location">{job.location}</p>

      <p className="desc">{job.description}</p>

      { user?.skills?.length > 0 && <p className="skills">
        <strong>Skills:</strong> {job.skillsRequired.join(", ")}
      </p>
      }
      
      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}

      {user?.role === "candidate" && (
        <div className="action-buttons">
          <button
            className="secondary-btn"
            onClick={() => setShowModal(true)}
          >
            {profileCompleted ? "Edit Details" : "Add Details"}
          </button>

          <button
            className="primary-btn"
            disabled={!profileCompleted}
            onClick={() => dispatch(applyJob(job._id))}
          >
            Apply for Job
          </button>
        </div>
      )}

      {showModal && (
        <ApplyJobModal
          onClose={() => setShowModal(false)}
          onSuccess={() => setProfileCompleted(true)}
        />
      )}
    </div>
  );
};

export default JobDetails;
