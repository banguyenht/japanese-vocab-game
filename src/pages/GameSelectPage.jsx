import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function GameSelectPage() {
  const { lessonId } = useParams()
    console.log("lessionId:", lessonId);
  const navigate = useNavigate();

  const handleGameSelect = (gameType) => {
    // Điều hướng tới trang game tương ứng (route sẽ thêm sau)
    navigate(`/lesson/${lessonId}/${gameType}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">
        🧠 Chọn trò chơi cho Bài {lessonId}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <button
          onClick={() => handleGameSelect("quiz")}
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-4 px-6 rounded-2xl shadow-xl text-xl transition"
        >
          ❓ Quiz Game
        </button>

        <button
          onClick={() => handleGameSelect("match")}
          className="bg-pink-400 hover:bg-pink-500 text-white font-semibold py-4 px-6 rounded-2xl shadow-xl text-xl transition"
        >
          🔤 Matching Game
        </button>
      </div>
    </div>
  );
}
