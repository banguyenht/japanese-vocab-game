import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { saveLessonToFirebase } from "../utils/firebaseUtils";
import WordInputCard from "../components/WordInputCard";

const CreateLesson = () => {
  const navigate = useNavigate();
  const user = useAuth();
  const [lessonName, setLessonName] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [words, setWords] = useState([
    { vocab: "", meaning: "", image: "", imageOptions: [], suggestions: [] },
  ]);

  const handleAddWord = () => {
    setWords([
      ...words,
      { vocab: "", meaning: "", image: "", imageOptions: [], suggestions: [] },
    ]);
  };

  const handleUpdateWord = (index, updatedWordOrCallback) => {
    setWords((prevWords) => {
      const updatedWords = [...prevWords];
      const currentWord = prevWords[index];
      updatedWords[index] =
        typeof updatedWordOrCallback === "function"
          ? updatedWordOrCallback(currentWord)
          : updatedWordOrCallback;
      return updatedWords;
    });
  };

  const handleSuggestMeaningClick = async (index) => {
    const vocab = words[index].vocab.trim();
    const currentMeaning = words[index].meaning.trim();

    if (vocab && !currentMeaning) {
      const { translateToVietnamese } = await import("../utils/translateApi");
      const meaning = await translateToVietnamese(vocab);
      handleUpdateWord(index, (prev) => ({ ...prev, meaning }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Bạn cần đăng nhập để tạo học phần!");
      return;
    }

    try {
      const lessonData = {
        userId: user.uid,
        lessonName,
        isPublic,
        createdAt: new Date(),
      };

      const cleanedWords = words.map(word => ({
        vocab: word.vocab,
        meaning: word.meaning,
        image: word.image,
      }));

      await saveLessonToFirebase(lessonData, cleanedWords);

      alert("✅ Học phần đã được lưu thành công!");
      navigate("/");
    } catch (error) {
      console.error("❌ Lỗi khi lưu học phần:", error);
      alert("❌ Đã xảy ra lỗi khi lưu học phần.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-10">
        📚 Tạo học phần mới
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Tên học phần
          </label>
          <input
            type="text"
            value={lessonName}
            onChange={(e) => setLessonName(e.target.value)}
            required
            placeholder="Nhập tên học phần..."
            className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={() => setIsPublic(!isPublic)}
            className="w-5 h-5"
          />
          <span className="text-sm text-gray-700">Công khai học phần (Public)</span>
        </label>

        {words.map((word, index) => (
          <WordInputCard
            key={index}
            index={index}
            word={word}
            mode="create"
            onChange={handleUpdateWord}
            onSuggestMeaningClick={() => handleSuggestMeaningClick(index)}
          />
        ))}

        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-8">
          <button
            type="button"
            onClick={handleAddWord}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium px-4 py-2 border border-indigo-300 rounded-md"
          >
            + Thêm từ vựng
          </button>

          <button
            type="submit"
            className="px-5 py-2 bg-indigo-600 text-white font-medium rounded-md shadow hover:bg-indigo-700 text-sm"
          >
            ✅ Tạo học phần
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateLesson;
