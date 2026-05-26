import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Home() {

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [resume, setResume] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async () => {

    if (!resume) {
      alert("Please upload resume")
      return
    }

    setLoading(true)

    const formData = new FormData()

    formData.append("name", name)
    formData.append("jobDescription", jobDescription)
    formData.append("resume", resume)

    try {

      const response = await axios.post(
        "http://localhost:8080/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      )

      navigate("/results", {
        state: response.data
      })

    } catch (error) {

      console.error(error)

      alert("Error analyzing resume")

    } finally {

      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-4xl">

        {/* Heading */}
        <h1 className="text-5xl font-bold text-center mb-10">
          Resume Analyzer
        </h1>

        {/* Name */}
        <div className="mb-6">

          <label className="block text-xl font-semibold mb-3">
            Your Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Upload */}
        <div className="mb-6">

          <label className="block text-xl font-semibold mb-3">
            Upload Resume
          </label>

          <input
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setResume(e.target.files[0])
              }
            }}
            className="w-full border border-gray-300 rounded-xl p-4 bg-white"
          />

        </div>

        {/* Job Description */}
        <div className="mb-8">

          <label className="block text-xl font-semibold mb-3">
            Job Description
          </label>

          <textarea
            rows={12}
            placeholder="Paste job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Button */}
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className={`w-full py-4 rounded-xl text-xl font-bold text-white transition
          
          ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
            }`}
        >

          {
            loading
              ? "Analyzing Resume..."
              : "Analyze Resume"
          }

        </button>

      </div>

    </div>
  )
}

export default Home