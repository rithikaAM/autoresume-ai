import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeResume } from "../../lib/api/api";
import "./Analyze.css";

function Analyze() {
  const [resume, setResume] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!resume || !jobDesc.trim()) {
      alert("Please provide both resume and job description");
      return;
    }

    setLoading(true);
    try {
      const result = await analyzeResume(resume, jobDesc);
      // Save result temporarily to sessionStorage
      sessionStorage.setItem("analyzeResult", JSON.stringify(result));
      navigate("/results");
    } catch (err) {
      alert("Error analyzing resume. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analyze-container">
      <div className="analyze-left">
        <h2>Job Description</h2>
        <textarea
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          placeholder="Paste job description here..."
          rows={15}
        />
      </div>

      <div className="analyze-right">
        <h2>Upload Resume</h2>
        <input
          type="file"
          accept=".txt"
          onChange={(e) => setResume(e.target.files[0])}
        />
        <button
          className="analyze-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Now"}
        </button>
      </div>
    </div>
  );
}

export default Analyze;
