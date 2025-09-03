from flask import Flask, request, jsonify
from flask_cors import CORS
import spacy
import tempfile

app = Flask(__name__)
CORS(app)

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

@app.route("/")
def home():
    return "✅ AutoResume AI Flask backend is running!"

@app.route("/analyze", methods=["POST"])
def analyze():
    jd_text = request.form.get("job_description")
    resume_file = request.files.get("resume")

    if not jd_text or not resume_file:
        return jsonify({"error": "Missing resume or job description"}), 400

    # Extract resume text (for now, we just read text from PDF/DOC)
    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        resume_path = tmp.name
        resume_file.save(resume_path)

    # Read resume text (only text files for now)
    try:
        with open(resume_path, "r", encoding="utf-8") as f:
            resume_text = f.read()
    except:
        resume_text = resume_file.read().decode("utf-8", errors="ignore")

    # Process JD & Resume
    jd_doc = nlp(jd_text)
    resume_doc = nlp(resume_text)

    jd_keywords = {token.lemma_.lower() for token in jd_doc if token.is_alpha and not token.is_stop}
    resume_keywords = {token.lemma_.lower() for token in resume_doc if token.is_alpha and not token.is_stop}

    matched = list(jd_keywords & resume_keywords)
    missing = list(jd_keywords - resume_keywords)

    score = int((len(matched) / max(len(jd_keywords), 1)) * 100)

    result = {
        "relevance_score": score,
        "matched_keywords": matched[:10],
        "missing_keywords": missing[:10]
    }

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
