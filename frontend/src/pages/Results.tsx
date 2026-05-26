import { useLocation, useNavigate } from "react-router-dom"

function Results() {

  const location = useLocation()

  const navigate = useNavigate()

  const result = location.state

  if (!result) {

    return (
      <div className="min-h-screen flex items-center justify-center">

        <div className="bg-white shadow-xl rounded-2xl p-10">

          <h1 className="text-3xl font-bold mb-4">
            No Results Found
          </h1>

          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Go Back
          </button>

        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-10">

        {/* Heading */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold mb-4">
            Resume Analysis Result
          </h1>

          <p className="text-gray-500 text-lg">
            AI-powered ATS resume evaluation
          </p>

        </div>

        {/* Name */}
        <div className="mb-10">

          <p className="text-2xl">
            <span className="font-bold">
              Candidate:
            </span>{" "}
            {result.name}
          </p>

        </div>

        {/* Score */}
        <div className="mb-12">

          <h2 className="text-3xl font-bold mb-5">
            Match Score
          </h2>

          <div className="w-full bg-gray-300 rounded-full h-10 overflow-hidden">

            <div
              className="bg-green-500 h-10 flex items-center justify-center text-white text-lg font-bold transition-all duration-700"
              style={{
                width: `${result.matchScore}%`
              }}
            >

              {result.matchScore.toFixed(2)}%

            </div>

          </div>

        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">

          {/* Matched Skills */}
          <div>

            <h2 className="text-3xl font-bold text-green-600 mb-5">
              Matched Skills
            </h2>

            <div className="flex flex-wrap gap-3">

              {
                result.matchedKeywords?.map((skill: string) => (

                  <span
                    key={skill}
                    className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-lg"
                  >
                    {skill}
                  </span>

                ))
              }

            </div>

          </div>

          {/* Missing Skills */}
          <div>

            <h2 className="text-3xl font-bold text-red-600 mb-5">
              Missing Skills
            </h2>

            <div className="flex flex-wrap gap-3">

              {
                result.missingKeywords?.map((skill: string) => (

                  <span
                    key={skill}
                    className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-lg"
                  >
                    {skill}
                  </span>

                ))
              }

            </div>

          </div>

        </div>

        {/* AI Suggestions */}
        <div className="mb-12">

          <h2 className="text-3xl font-bold mb-5">
            AI Suggestions
          </h2>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 whitespace-pre-line text-lg leading-relaxed">

            {result.suggestions}

          </div>

        </div>

        {/* AI Summary */}
        <div className="mb-12">

          <h2 className="text-3xl font-bold mb-5">
            AI Generated Summary
          </h2>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-lg leading-relaxed">

            {result.summary}

          </div>

        </div>

        {/* Back Button */}
        <div className="flex justify-center">

          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition"
          >
            Analyze Another Resume
          </button>

        </div>

      </div>

    </div>
  )
}

export default Results