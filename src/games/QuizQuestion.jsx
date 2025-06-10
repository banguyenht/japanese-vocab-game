import React from "react";

function speak(text, lang = "ja-JP") {
  if (!window.speechSynthesis) {
    alert("Trình duyệt không hỗ trợ phát âm!");
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

export default function QuizQuestion({ question }) {
  return (
    <div className="mb-6">
      <div className="flex justify-center items-center gap-2">
        <p className="text-5xl font-bold text-indigo-600 leading-none">{question.vocab}</p>
        <button
          onClick={() => speak(question.vocab)}
          className="text-indigo-600 hover:text-indigo-800 transition text-3xl p-2 rounded-full hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          aria-label="Phát âm từ vựng"
          title="Phát âm từ vựng"
          type="button"
          style={{ lineHeight: 1 }}
        >
          🔊
        </button>
      </div>
      <p className="text-2xl text-gray-700 mt-1 text-center">{question.kanji}</p>
    </div>
  );
}
