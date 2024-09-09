
const QuestionForm = ({ question, setQuestion, categoryPoints }) => {

  const points = [100, 200, 300, 400, 500 ].filter(point => !categoryPoints.includes(point) )

  const handleChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value })
  }

  return (
    <div className="gap-4 lg:grid-cols-2 flex-1 grid">
      <label className="text-black-500 font-normal flex flex-col space-y-2" htmlFor="question">
        Question
        <input
          type="text"
          name="question"
          id="question"
          className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2.5 font-normal shadow-card"
          placeholder="Eg. Who Walked on water?"
          required
          value={question.question}
          onChange={handleChange}
        />
      </label>
      <label className="text-black-500 font-normal flex flex-col space-y-2" htmlFor="answer">
        Answer
        <input
          type="text"
          name="answer"
          id="answer"
          className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2.5 font-normal shadow-card"
          placeholder="Eg. Jesus"
          required
          value={question.answer}
          onChange={handleChange}
        />
      </label>
      <label className="text-black-500 font-normal flex flex-col space-y-2" htmlFor="points">
        Points
        <select
          type="text"
          name="points"
          id="points"
          className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2.5 font-normal shadow-card"
          placeholder="Eg. Jesus"
          required
          value={question.points}
          onChange={handleChange}
        >
          {
            points.map((point, index) => (
              <option key={index} value={point}>{point} points</option>
            ))
          }

          </select>
      </label>
    </div>
   );
}

export default QuestionForm;
