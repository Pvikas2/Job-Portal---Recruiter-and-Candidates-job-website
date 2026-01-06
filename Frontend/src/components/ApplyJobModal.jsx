import { useState } from "react";
import "./ApplyJobModal.css";
import { updateProfile } from "../features/user/profileSlice";
import { useDispatch } from "react-redux";

const ApplyJobModal = ({ onClose, onSuccess }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        experience: "",
        phone: "",
        skills: "",
    });

    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(false);;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setLoading(true);
        const saveFormData = new FormData();

        saveFormData.append("resume", resume);
        saveFormData.append("experience", formData.experience);
        saveFormData.append("phone", formData.phone);
        saveFormData.append("skills", formData.skills.split(",").map((skill) => skill.trim()));
        console.log("Form Data:", formData, saveFormData);

        dispatch(updateProfile(saveFormData), onSuccess(), onClose());
        setLoading(false);
    };

  return (
    <div className="modal-overlay">
      <div className="modal-card animate-scale">
        <div className="flex items-center justify-between align-middle mb-4">
            <h2 className="leading-none">
                Candidate Details</h2>
            <button
                className="remove-file"
                onClick={() => setResume(null)}
                aria-label="Remove file"
                >
            ✕
            </button>
        </div>


        <input
          name="experience"
          placeholder="Years of Experience"
          value={formData.experience}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />

        <input
          name="skills"
          placeholder="Skills (comma separated)"
          value={formData.skills}
          onChange={handleChange}
        />

        <div className="resume-box">
          <label className="upload-label">
            Upload / Replace Resume
            <input
              type="file"
              accept=".pdf"
              hidden
              onChange={(e) => setResume(e.target.files[0])}
            />
          </label>
        </div>
        {resume && (
            <div className="uploaded-file">
                <span className="file-name">📄 {resume.name}</span>
                <button
                className="remove-file"
                onClick={() => setResume(null)}
                aria-label="Remove file"
                >
                ✕
                </button>
            </div>
     )}


        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button
            className="save-btn"
            disabled={loading}
            onClick={handleSave}
          >
            {loading ? "Saving..." : "Save Details"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyJobModal;
