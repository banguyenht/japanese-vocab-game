import React from "react";
import { useParams, Link } from "react-router-dom";

export default function LessonPage() {
  const { lessonId } = useParams();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-blue-200 p-4">
      <h1 className="text-3xl font-bold text-indigo-800 mb-6">🎮 Chọn trò chơi - Bài {lessonId}</h1>

      <div className="flex gap-6">
        <Link
          to={`/quiz/${lessonId}`}
          className="bg-purple-500 text-white px-6 py-3 rounded-xl shadow hover:bg-purple-600 transition text-lg"
        >
          Quiz Game
        </Link>
        <Link
          to={`/match/${lessonId}`}
          className="bg-pink-500 text-white px-6 py-3 rounded-xl shadow hover:bg-pink-600 transition text-lg"
        >
          Matching Game
        </Link>
      </div>
    </div>
  );
}
