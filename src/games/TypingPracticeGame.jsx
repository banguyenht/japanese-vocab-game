import React, { useEffect, useState } from "react";
import { loadCSV } from "../utils/loadCSV";
import vocabCSV from "../data/lesson40.csv?url";
import SpeakButton from "../components/SpeakButton";
import { useParams } from "react-router-dom";

export default function TypingPracticeGame() {
  const { lessonId } = useParams();
  const [vocabList, setVocabList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showNext, setShowNext] = useState(false);

  useEffect(() => {
    if (!lessonId) return;

    const csvPath = `/src/data/lesson${lessonId}.csv`;
    fetch(csvPath)
      .then((res) => res.text())
      .then((text) => loadCSV(text))
      .then((data) => {
        setVocabList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load CSV", err);
        setLoading(false);
      });
  }, []);

  const currentWord = vocabList[currentIndex];

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const answer = userInput.trim().toLowerCase();
    const correctVocab = currentWord.vocab?.toLowerCase();
    const correctKanji = currentWord.kanji?.toLowerCase();

    if (answer === correctVocab || answer === correctKanji) {
      setScore((prev) => prev + 1);
      setIsCorrect(true);
      setShowNext(false);
      setTimeout(() => {
        handleNext();
      }, 500);
    } else {
      setIsCorrect(false);
      setShowNext(true);
    }
  };

  const handleNext = () => {
    setUserInput("");
    setIsCorrect(null);
    setShowNext(false);
    setCurrentIndex((prev) => (prev + 1) % vocabList.length);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-xl">Đang tải từ vựng...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-300 flex flex-col justify-center items-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-xl w-full transition duration-300 ease-in-out">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-4">
          🎯 Gõ đúng từ tiếng Nhật
        </h1>

        <div className="text-center mb-6">
          <p className="text-lg text-gray-600">Nghĩa:</p>
          <p className="text-2xl font-semibold text-gray-800">{currentWord.meaning}</p>

          <div className="mt-3 flex justify-center">
            <SpeakButton text={currentWord.vocab} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            className="border border-gray-300 p-3 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Nhập từ vựng tiếng Nhật (ひらがな hoặc 漢字)"
            value={userInput}
            onChange={handleInputChange}
            autoFocus
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:bg-indigo-700 transition"
          >
            Kiểm tra
          </button>
        </form>

        {isCorrect !== null && (
          <div
            className={`mt-4 text-center text-lg font-semibold ${
              isCorrect ? "text-green-600" : "text-red-600"
            }`}
          >
            {isCorrect
              ? "✅ Chính xác!"
              : `❌ Sai! Đáp án đúng: ${currentWord.vocab} / ${currentWord.kanji}`}
          </div>
        )}

        {showNext && (
          <div className="mt-4 text-center">
            <button
              onClick={handleNext}
              className="mt-2 bg-indigo-500 text-white px-4 py-2 rounded-xl hover:bg-indigo-600 transition"
            >
              👉 Câu tiếp theo
            </button>
          </div>
        )}

        <div className="mt-6 text-center text-gray-600">
          Điểm: <span className="font-bold text-indigo-600">{score}</span>
        </div>
      </div>
    </div>
  );
}
