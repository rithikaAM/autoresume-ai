import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>🚀 AutoResume AI</h1>
      <p>
        Analyze your resume against any job description — get instant feedback,
        keyword match scores, and suggestions.
      </p>
      <button onClick={() => navigate("/analyze")}>Start Analysis</button>
    </div>
  );
}

export default Home;
