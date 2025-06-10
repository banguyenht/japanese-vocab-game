import React from "react";

export default function QuizOptions({ options, correctAnswer, selectedAnswer, onSelect }) {
  return (
    <div className="grid gap-4 mb-6">
      {options.map((opt, i) => {
        const isCorrect = opt === correctAnswer;
        const isSelected = opt === selectedAnswer;

        let btnClass = "bg-blue-100 text-blue-900 hover:bg-blue-200";

        if (selectedAnswer) {
          if (isCorrect) {
            btnClass = "bg-green-100 text-green-800 border border-green-600";
          } else if (isSelected) {
            btnClass = "bg-red-100 text-red-800 border border-red-600";
          } else {
            btnClass = "bg-gray-100 text-gray-600";
          }
        }

        return (
          <button
            key={i}
            onClick={() => onSelect(opt)}
            disabled={!!selectedAnswer}
            className={`w-full font-semibold py-3 px-4 rounded-xl shadow-sm transition ${btnClass}`}
            type="button"
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
