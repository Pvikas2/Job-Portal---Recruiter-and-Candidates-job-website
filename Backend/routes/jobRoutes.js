const express = require("express");
const {
  createJob,
  getJobs,
  getJobById,
  getMyJobs,
  deleteJob,
} = require("../controllers/jobController");

const {
  protect,
  recruiterOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, recruiterOnly, createJob).get(getJobs);

router.get("/my-jobs", protect, recruiterOnly, getMyJobs);

router.get("/:id", getJobById);

router.delete("/:id", protect, deleteJob);

module.exports = router;
