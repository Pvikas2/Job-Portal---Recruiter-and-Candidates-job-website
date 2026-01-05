import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../features/jobs/jobSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";


const Jobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobs, isLoading } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  if (isLoading) return <Loader />;
  return (
    <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <div
          key={job._id}
          className="border rounded-lg p-5 shadow hover:shadow-lg"
        >
          <h2 className="text-xl font-semibold">{job.title}</h2>
          <p className="text-gray-600">{job.location}</p>
          <p className="text-sm mt-2">{job.jobType}</p>

          <button
            onClick={() => navigate(`/jobs/${job._id}`)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default Jobs;
