import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";


const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/jobs").then((res) => {
      setJobs(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader />;
  if (jobs.length === 0)
  return (
    <EmptyState
      title="No jobs available"
      subtitle="Please check back later"
    />
  );


  return (
    <div className="p-6 text-black  min-h-full">
      <h1 className="text-2xl font-bold mb-6">Available Jobs</h1>

      <div className="grid gap-4 col-span-1  md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <div key={job._id} className="border bg-gray-200 p-4 rounded">
            <h2 className="font-semibold">{job.title}</h2>
            <p>{job.location}</p>

            <Link
              to={`/jobs/${job._id}`}
              className="text-blue-600 mt-2 inline-block px-4 py-2 border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
