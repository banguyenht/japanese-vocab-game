import React from "react";
import { useParams, Link } from "react-router-dom";
import useFetchLesson from "../hooks/useFetchLesson";
import { useJishoReading } from "../hooks/useJishoReading";

export default function LessonPage() {
  const { lessonId } = useParams();
  const { lesson, words, loading, error } = useFetchLesson(lessonId);

  // Gọi hook lấy cách đọc cho toàn bộ từ
  const readings = useJishoReading(words);
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-indigo-800 mb-6">📖 Từ vựng trong học phần</h1>

      <div className="w-full max-w-4xl bg-white rounded-lg shadow p-4 mb-10 overflow-auto">
        <table className="w-full table-auto text-left border-collapse">
          <thead>
            <tr className="bg-indigo-100 text-indigo-800">
              <th className="px-4 py-2 border-b">Từ vựng</th>
              <th className="px-4 py-2 border-b">Cách đọc</th>
              <th className="px-4 py-2 border-b">Ý nghĩa</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  Đang tải từ vựng...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="3" className="text-center py-6 text-red-500">
                  ❌ Lỗi: {error.message}
                </td>
              </tr>
            ) : words.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-400">
                  Không có từ vựng nào.
                </td>
              </tr>
            ) : (
              words.map((word, index) => (
                <tr key={word.id || index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{word.vocab}</td>
                  <td className="px-4 py-2 border-b text-gray-500 italic">{readings[word.vocab] || "-"}</td>
                  <td className="px-4 py-2 border-b">{word.meaning}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex gap-6">
        <Link
          to={`/quiz/${lessonId}`}
          className="bg-purple-500 text-white px-6 py-3 rounded-xl shadow hover:bg-purple-600 transition text-lg"
        >
          Quiz Game
        </Link>
        <Link
          to={`/typing/${lessonId}`}
          className="bg-pink-500 text-white px-6 py-3 rounded-xl shadow hover:bg-pink-600 transition text-lg"
        >
          Matching Game
        </Link>
      </div>
    </div>
  );
}
