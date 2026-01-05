const mongoose = require("mongoose");

const applicationSchema = mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    resume: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Applied", "Shortlisted", "Rejected"],
      default: "Applied",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
