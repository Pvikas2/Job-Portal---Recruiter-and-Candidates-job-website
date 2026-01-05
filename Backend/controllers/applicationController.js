const Application = require("../models/Application");
const Job = require("../models/Job");

// @route   POST /api/applications/apply/:jobId
// @desc    Apply for a job
// @access  Candidate
const applyForJob = async (req, res) => {
  const job = await Job.findById(req.params.jobId);

  if (!job || !job.isActive) {
    return res.status(404).json({ message: "Job not found" });
  }

  if (!req.user.profile.resume) {
    return res
      .status(400)
      .json({ message: "Upload resume before applying" });
  }

  const alreadyApplied = await Application.findOne({
    job: job._id,
    candidate: req.user._id,
  });

  if (alreadyApplied) {
    return res.status(400).json({ message: "Already applied for this job" });
  }

  const application = await Application.create({
    job: job._id,
    candidate: req.user._id,
    resume: req.user.profile.resume,
  });

  res.status(201).json({
    message: "Applied successfully",
    application,
  });
};

// @route   GET /api/applications/job/:jobId
// @desc    Get applicants for a job
// @access  Recruiter
const getApplicantsByJob = async (req, res) => {
  const job = await Job.findById(req.params.jobId);

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  if (job.recruiter.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  const applications = await Application.find({ job: job._id })
    .populate("candidate", "name email profile")
    .sort({ createdAt: -1 });

  res.json(applications);
};

// @route   PUT /api/applications/:id/status
// @desc    Update application status
// @access  Recruiter
const updateApplicationStatus = async (req, res) => {
  const { status } = req.body;

  const application = await Application.findById(req.params.id).populate(
    "job"
  );

  if (!application) {
    return res.status(404).json({ message: "Application not found" });
  }

  if (
    application.job.recruiter.toString() !== req.user._id.toString()
  ) {
    return res.status(403).json({ message: "Not authorized" });
  }

  application.status = status;
  await application.save();

  res.json({
    message: "Application status updated",
    application,
  });
};

// @route   GET /api/applications/my-applications
// @desc    Get candidate applications
// @access  Candidate
const getMyApplications = async (req, res) => {
  const applications = await Application.find({
    candidate: req.user._id,
  })
    .populate("job", "title location jobType")
    .sort({ createdAt: -1 });

  res.json(applications);
};

module.exports = {
  applyForJob,
  getApplicantsByJob,
  updateApplicationStatus,
  getMyApplications,
};
