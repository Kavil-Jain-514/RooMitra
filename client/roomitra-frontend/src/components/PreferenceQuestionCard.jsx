const PreferenceQuestionCard = ({
  question,
  currentAnswer,
  onAnswerSelect,
  onSkip,
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
      <div className="mt-6 flex justify-between">
        <button onClick={onSkip} className="text-gray-500 hover:text-gray-700">
          Skip this question
        </button>
      </div>
    </div>
  );
};

export default PreferenceQuestionCard;
