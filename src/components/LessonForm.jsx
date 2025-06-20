import { useState } from "react";
import WordInputCard from "./WordInputCard";

const defaultWord = {
  vocab: "",
  meaning: "",
  image: "",
  imageOptions: [],
  suggestions: [],
};

const LessonForm = ({
  initialLessonName = "",
  initialIsPublic = true,
  initialWords,
  onSubmit,
  mode = "create",
}) => {
  const [lessonName, setLessonName] = useState(initialLessonName);
  const [isPublic, setIsPublic] = useState(initialIsPublic);
  const [words, setWords] = useState(
    Array.isArray(initialWords) && initialWords.length > 0
      ? initialWords
      : [defaultWord]
  );

  const handleUpdateWord = (index, updatedWordOrCallback) => {
    setWords((prev) => {
      const updated = [...prev];
      const current = prev[index];
      updated[index] =
        typeof updatedWordOrCallback === "function"
          ? updatedWordOrCallback(current)
          : updatedWordOrCallback;
      return updated;
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

  const handleAddWord = () => {
    setWords((prev) => [...prev, { ...defaultWord }]);
  };

  const handleDeleteWord = (index) => {
    setWords((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ lessonName, isPublic, words });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label className="block text-gray-700 font-medium mb-2">Tên học phần</label>
        <input
          type="text"
          value={lessonName}
          onChange={(e) => setLessonName(e.target.value)}
          required
          placeholder="Nhập tên học phần..."
          className="w-full px-4 py-3 rounded-md border border-gray-300"
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
          key={word.id || index}
          index={index}
          word={word}
          mode={mode}
          onChange={handleUpdateWord}
          onSuggestMeaningClick={() => handleSuggestMeaningClick(index)}
          onDeleteWord={() => handleDeleteWord(index)}
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
          {mode === "edit" ? "✅ Cập nhật học phần" : "✅ Tạo học phần"}
        </button>
      </div>
    </form>
  );
};

export default LessonForm;
