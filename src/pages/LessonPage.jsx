import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, getDocs, doc } from "firebase/firestore";

export default function LessonPage() {
  const { lessonId } = useParams();
  const [words, setWords] = useState([]);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const lessonRef = doc(db, "lessons", lessonId);
        const wordsRef = collection(lessonRef, "words");
        const wordSnap = await getDocs(wordsRef);

        const wordList = wordSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setWords(wordList);
      } catch (error) {
        console.error("Lỗi khi lấy từ vựng:", error);
      }
    };

    if (lessonId) fetchWords();
  }, [lessonId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-indigo-800 mb-6">📖 Từ vựng trong học phần</h1>

      {/* Bảng từ vựng */}
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
            {words.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  Không có từ vựng nào trong học phần này.
                </td>
              </tr>
            ) : (
              words.map((word, index) => (
                <tr key={word.id || index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{word.vocab}</td>
                  <td className="px-4 py-2 border-b text-gray-500 italic">-</td>
                  <td className="px-4 py-2 border-b">{word.meaning}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Menu trò chơi */}
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">🎮 Chọn trò chơi</h2>
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
