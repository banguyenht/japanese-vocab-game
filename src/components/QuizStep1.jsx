import React from "react";

export default function QuizStep1() {
  const question = {
    vocab: "かぞえます",
    kanji: "数えます",
  };

  const options = ["đếm", "đo, cân", "ăn", "ngủ"];

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center p-6">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-8">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
          🎌 Trắc nghiệm từ vựng tiếng Nhật
        </h1>

        <div className="mb-8 text-center">
          <p className="text-5xl font-bold text-indigo-600">{question.vocab}</p>
          <p className="text-2xl text-gray-600 mt-2">{question.kanji}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => alert(`Bạn chọn: ${opt}`)}
              className="py-3 px-5 bg-indigo-100 hover:bg-indigo-300 text-indigo-800 font-semibold rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-indigo-400"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
