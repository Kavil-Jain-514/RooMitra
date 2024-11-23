const PreferenceQuestionCard = ({
  question,
  currentAnswer,
  onAnswerSelect,
  onSkip,
  onBack,
  isFirstQuestion,
}) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">{question.question}</h2>
      <div className="space-y-4">
        {question.possibleAnswers.map((answer) => (
          <button
            key={answer}
            onClick={() => onAnswerSelect(answer)}
            className={`w-full p-4 text-left rounded-lg border transition-colors ${
              currentAnswer === answer
                ? "bg-blue-50 border-blue-500"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            {answer}
          </button>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center">
        {!isFirstQuestion && (
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-700 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Previous Question
          </button>
        )}
        <button
          onClick={onSkip}
          className="text-gray-500 hover:text-gray-700 ml-auto"
        >
          Skip this question
        </button>
      </div>
    </div>
  );
};

export default PreferenceQuestionCard;
