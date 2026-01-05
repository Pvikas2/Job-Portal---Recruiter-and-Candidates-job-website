const express = require("express");
const {
  applyForJob,
  getApplicantsByJob,
  updateApplicationStatus,
  getMyApplications,
} = require("../controllers/applicationController");

const {
  protect,
  recruiterOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/apply/:jobId", protect, applyForJob);

router.get("/job/:jobId", protect, recruiterOnly, getApplicantsByJob);

router.put("/:id/status", protect, recruiterOnly, updateApplicationStatus);

router.get("/my-applications", protect, getMyApplications);

module.exports = router;
