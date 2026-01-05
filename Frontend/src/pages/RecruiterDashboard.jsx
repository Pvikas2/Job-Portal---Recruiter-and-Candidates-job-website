// import { useEffect, useState } from "react";
// import API from "../services/api";
// import "./Dashboard.css";

// const RecruiterDashboard = () => {
//   const [jobs, setJobs] = useState([]);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [applications, setApplications] = useState([]);

//   useEffect(() => {
//     API.get("/jobs/my-jobs").then((res) => setJobs(res.data));
//   }, []);

//   const loadApplicants = async (jobId) => {
//     setSelectedJob(jobId);
//     const res = await API.get(`/applications/job/${jobId}`);
//     setApplications(res.data);
//   };

//   return (
//      <div className="dashboard-container">
//       <h1 className="dashboard-title">Recruiter Dashboard</h1>

//       <h3>y Jobs</h3>
//       {jobs.map((job) => (
//         <div
//           className="card"
//           key={job._id}
//           onClick={() => loadApplicants(job._id)}
//         >
//           {job.title}
//         </div>
//       ))}

//       <h3 style={{ marginTop: "30px" }}>Applicants</h3>
//       {applications.map((app) => (
//         <div className="card" key={app._id}>
//           <p>{app.candidate.name}</p>
//           <a
//             href={`http://localhost:5000/${app.resume}`}
//             target="_blank"
//             rel="noreferrer"
//           >
//             View Resume
//           </a>
//           <div className={`status ${app.status.toLowerCase()}`}>
//             {app.status}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default RecruiterDashboard;

import { useEffect, useState } from "react";
import API from "../services/api";
import "./Dashboard.css";

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const [jobForm, setJobForm] = useState({
    title: "",
    description: "",
    location: "",
    jobType: "Full-time",
  });

  /* ---------------- FETCH JOBS ---------------- */
  const fetchJobs = async () => {
    const res = await API.get("/jobs/my-jobs");
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  /* ---------------- CREATE JOB ---------------- */
  const handleJobChange = (e) => {
    setJobForm({ ...jobForm, [e.target.name]: e.target.value });
  };

  const createJob = async (e) => {
    e.preventDefault();
    await API.post("/jobs", jobForm);
    setJobForm({ title: "", description: "", location: "", jobType: "Full-time" });
    fetchJobs();
  };

  /* ---------------- LOAD APPLICANTS ---------------- */
  const loadApplicants = async (job) => {
    setSelectedJob(job);
    const res = await API.get(`/applications/job/${job._id}`);
    setApplications(res.data);
  };

  /* ---------------- UPDATE STATUS ---------------- */
  const updateStatus = async (appId, status) => {
    await API.put(`/applications/${appId}/status`, { status });
    loadApplicants(selectedJob);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Recruiter Dashboard</h1>

       <div className="dashboard-grid">
        {/* -------- JOB LIST -------- */}
        <div className="panel">
          <h3>My Jobs</h3>

          {jobs.length === 0 && <p className="empty-text">No jobs posted yet</p>}

          {jobs.map((job) => (
            <div
              key={job._id}
              className={`card ${selectedJob?._id === job._id ? "active" : ""}`}
              onClick={() => loadApplicants(job)}
            >
              {job.title}
            </div>
          ))}
        </div>

        {/* -------- APPLICANTS -------- */}
        <div className="panel">
          <h3>Applicants</h3>

          {!selectedJob && <p className="empty-text">Select a job to view applicants</p>}

          {applications.length === 0 && selectedJob && <p className="empty-text">No applicants for this job</p>}

          {applications.map((app) => (
            <div className="card applicant-card" key={app._id}>
              <p className="candidate-name">{app.candidate.name}</p>

              <a
                href={`http://localhost:5000/${app.resume}`}
                target="_blank"
                rel="noreferrer"
                className="resume-btn"
              >
                View Resume
              </a>

              <div className="status-row">
                <label>Status:</label>
                <select
                  className="status-dropdown"
                  value={app.status}
                  onChange={(e) => updateStatus(app._id, e.target.value)}
                >
                  <option>Applied</option>
                  <option>Shortlisted</option>
                  <option>Rejected</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* -------- CREATE JOB -------- */}
      <div className="create-job-card">
        <h3>Create Job</h3>

        <form onSubmit={createJob}>
          <input
            name="title"
            placeholder="Job Title"
            value={jobForm.title}
            onChange={handleJobChange}
            required
          />

          <textarea
            name="description"
            placeholder="Job Description"
            value={jobForm.description}
            onChange={handleJobChange}
            required
          />

          <input
            name="location"
            placeholder="Location"
            value={jobForm.location}
            onChange={handleJobChange}
            required
          />

          <select name="jobType" value={jobForm.jobType} onChange={handleJobChange}>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Remote</option>
          </select>

          <button type="submit">Post Job</button>
        </form>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
