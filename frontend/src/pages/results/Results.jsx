import { useEffect, useState } from "react";
import "./Results.css";

function Results() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const data = sessionStorage.getItem("analyzeResult");
    if (data) {
      setResult(JSON.parse(data));
    }
  }, []);

  if (!result) {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        No analysis found. Please go back and analyze first.
      </p>
    );
  }

  return (
    <div className="results-container">
      <h2>📊 Analysis Results</h2>

      <div className="result-section">
        <h3>Relevance Score</h3>
        <div className="score-bar">
          <div
            className="score-fill"
            style={{ width: `${result.relevance_score}%` }}
          >
            {result.relevance_score}%
          </div>
        </div>
      </div>

      <div className="result-section">
        <h3>Matched Keywords ✅</h3>
        <div className="keywords">
          {result.matched_keywords.map((word, i) => (
            <span className="chip" key={i}>
              {word}
            </span>
          ))}
        </div>
      </div>

      <div className="result-section">
        <h3>Missing Keywords ❌</h3>
        <div className="keywords missing">
          {result.missing_keywords.map((word, i) => (
            <span className="chip" key={i}>
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Results;
