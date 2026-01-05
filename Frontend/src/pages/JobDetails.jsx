import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobById, applyJob, resetStatus } from "../features/jobs/jobSlice";
import { useParams } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { job, success, error } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchJobById(id));
    return () => dispatch(resetStatus());
  }, [dispatch, id]);

  if (!job) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 text-black">
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p className="text-gray-600">{job.location}</p>

      <p className="mt-4">{job.description}</p>

      <p className="mt-3">
        <strong>Skills:</strong> {job.skillsRequired.join(", ")}
      </p>

      {success && <p className="text-green-600 mt-3">{success}</p>}
      {error && <p className="text-red-600 mt-3">{error}</p>}

      {user?.role === "candidate" && (
        <button
          onClick={() => dispatch(applyJob(job._id))}
          className="mt-6 bg-green-600 text-white px-6 py-2 rounded"
        >
          Apply for Job
        </button>
      )}
    </div>
  );
};

export default JobDetails;


// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import API from "../services/api";

// const JobDetails = () => {
//   const { id } = useParams();
//   const { user } = useSelector((state) => state.auth);

//   const [job, setJob] = useState(null);

//   useEffect(() => {
//     API.get(`/jobs/${id}`).then((res) => setJob(res.data));
//   }, [id]);

//   const applyJob = async () => {
//     await API.post(`/applications/${id}`);
//     alert("Applied successfully");
//   };

//   if (!job) return <p className="p-6">Loading...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">{job.title}</h1>
//       <p className="my-2">{job.description}</p>
//       <p>{job.location}</p>



//       {user?.role === "candidate" && (
//         <button
//           onClick={applyJob}
//           className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
//         >
//           Apply Job
//         </button>
//       )}
//     </div>
//   );
// };

// export default JobDetails;
