import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const lessons = Array.from({ length: 50 }, (_, i) => i + 1); // [1..50]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-200 p-4">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">📚 Danh sách bài học</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full max-w-4xl">
        {lessons.map((lessonId) => (
          <Link
            to={`/lesson/${lessonId}`}
            key={lessonId}
            className="bg-white shadow rounded-xl p-4 text-center hover:bg-indigo-100 transition text-indigo-700 font-medium"
          >
            Bài {lessonId}
          </Link>
        ))}
      </div>
    </div>
  );
}
