import ollama
from fastapi import FastAPI
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI()

# Load embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")


# Request Body
class AnalyzeRequest(BaseModel):
    resumeText: str
    jobDescription: str


# Common Skills Database
COMMON_SKILLS = [
    "Java",
    "Spring Boot",
    "React",
    "Angular",
    "Next.js",
    "Node.js",
    "Express",
    "MongoDB",
    "SQL",
    "PostgreSQL",
    "MySQL",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "REST API",
    "GraphQL",
    "Microservices",
    "Git",
    "GitHub",
    "Python",
    "FastAPI",
    "Django",
    "JavaScript",
    "TypeScript",
    "HTML",
    "CSS",
    "Tailwind",
    "Redux",
    "JWT",
    "CI/CD",
    "Jenkins",
    "Kafka",
    "Redis",
    "Figma",
    "OOP",
    "Data Structures",
    "Algorithms"
]


# Generate Resume Suggestions
def generate_suggestions(resume_text, jd_text):

    prompt = f"""
    You are an ATS resume reviewer.

    Resume:
    {resume_text}

    Job Description:
    {jd_text}

    Give 3 short resume improvement suggestions.
    Keep response concise.
    """

    response = ollama.chat(
        model="mistral",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response["message"]["content"]


# Generate Professional Summary
def generate_summary(resume_text):

    prompt = f"""
    Generate a professional resume summary
    based on this resume:

    {resume_text}

    Keep it concise and professional.
    """

    response = ollama.chat(
        model="mistral",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response["message"]["content"]


@app.post("/analyze")
def analyze(data: AnalyzeRequest):

    # Generate Embeddings
    resume_embedding = model.encode([data.resumeText])

    jd_embedding = model.encode([data.jobDescription])

    # Semantic Similarity
    similarity = cosine_similarity(
        resume_embedding,
        jd_embedding
    )[0][0]

    match_score = float(round(similarity * 100, 2))

    # Lowercase Text
    resume_text = data.resumeText.lower()
    jd_text = data.jobDescription.lower()

    matched_keywords = []
    missing_keywords = []

    # Skill Matching
    for skill in COMMON_SKILLS:

        skill_lower = skill.lower()

        in_resume = skill_lower in resume_text
        in_jd = skill_lower in jd_text

        if in_resume and in_jd:
            matched_keywords.append(skill)

        elif in_jd and not in_resume:
            missing_keywords.append(skill)

    # AI Suggestions
    suggestions = generate_suggestions(
        data.resumeText,
        data.jobDescription
    )

    # AI Summary
    summary = generate_summary(
        data.resumeText
    )

    # Final Response
    return {
        "matchScore": match_score,
        "matchedKeywords": matched_keywords,
        "missingKeywords": missing_keywords,
        "suggestions": suggestions,
        "summary": summary
    }