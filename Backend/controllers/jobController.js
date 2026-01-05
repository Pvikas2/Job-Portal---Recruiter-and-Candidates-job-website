const Job = require("../models/Job");

// @route   POST /api/jobs
// @desc    Create a new job
// @access  Recruiter
const createJob = async (req, res) => {
  const {
    title,
    description,
    skillsRequired,
    experienceRequired,
    location,
    jobType,
    salaryRange,
  } = req.body;

  const job = await Job.create({
    title,
    description,
    skillsRequired,
    experienceRequired,
    location,
    jobType,
    salaryRange,
    recruiter: req.user._id,
  });

  res.status(201).json(job);
};

// @route   GET /api/jobs
// @desc    Get all active jobs (public)
// @access  Public
const getJobs = async (req, res) => {
  const jobs = await Job.find({ isActive: true })
    .populate("recruiter", "name email")
    .sort({ createdAt: -1 });

  res.json(jobs);
};

// @route   GET /api/jobs/:id
// @desc    Get single job
// @access  Public
const getJobById = async (req, res) => {
  const job = await Job.findById(req.params.id).populate(
    "recruiter",
    "name email"
  );

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  res.json(job);
};

// @route   GET /api/jobs/my-jobs
// @desc    Get recruiter jobs
// @access  Recruiter
const getMyJobs = async (req, res) => {
  const jobs = await Job.find({ recruiter: req.user._id }).sort({
    createdAt: -1,
  });

  res.json(jobs);
};

// @route   DELETE /api/jobs/:id
// @desc    Delete job
// @access  Recruiter/Admin
const deleteJob = async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  if (
    job.recruiter.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return res.status(403).json({ message: "Not authorized" });
  }

  await job.deleteOne();
  res.json({ message: "Job deleted successfully" });
};

module.exports = {
  createJob,
  getJobs,
  getJobById,
  getMyJobs,
  deleteJob,
};
