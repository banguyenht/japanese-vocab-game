import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig"; // Firestore để lưu học phần
import useAuth from "../hooks/useAuth"; // Hook lấy user đăng nhập
import { fetchJishoSuggestions } from "../utils/jishoApi";
import { fetchUnsplashImages } from "../utils/unsplashApi";
import { translateToEnglish } from "../utils/translateApi";

const CreateLesson = () => {
  const navigate = useNavigate();
  const user = useAuth(); // Lấy thông tin user đăng nhập
  const [lessonName, setLessonName] = useState("");
  const [isPublic, setIsPublic] = useState(true); // Mặc định là Public
  const [words, setWords] = useState([
    { vocab: "", meaning: "", image: "", imageOptions: [], suggestions: [] },
  ]);

  const handleChangeWord = async (index, field, value) => {
    const updated = [...words];
    updated[index][field] = value;
    setWords(updated);

    if (field === "vocab") {
      const suggestions = await fetchJishoSuggestions(value);
      updated[index].suggestions = suggestions;
      setWords([...updated]);
    }
  };

  const handleFetchImages = async (index) => {
    const word = words[index];
    if (!word.meaning.trim()) return;

    const englishKeyword = await translateToEnglish(word.meaning);
    const images = await fetchUnsplashImages(englishKeyword);

    const updated = [...words];
    updated[index].imageOptions = images;
    setWords(updated);
  };

  const handleRemoveImage = (index) => {
    const updated = [...words];
    updated[index].image = "";
    setWords(updated);
  };

  const handleSelectImage = (index, imgUrl) => {
    const updated = [...words];
    updated[index].image = imgUrl;
    setWords(updated);
  };

  const handleAddWord = () => {
    setWords([
      ...words,
      { vocab: "", meaning: "", image: "", imageOptions: [], suggestions: [] },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Bạn cần đăng nhập để tạo học phần!");
      return;
    }

    try {
      await addDoc(collection(db, "lessons"), {
        userId: user.uid,
        lessonName,
        isPublic,
        words,
        createdAt: new Date(),
      });

      navigate("/");
    } catch (error) {
      console.error("Lỗi khi lưu học phần:", error);
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

        {/* Checkbox chọn Public hoặc Private */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={isPublic} onChange={() => setIsPublic(!isPublic)} className="w-5 h-5" />
          <span className="text-sm text-gray-700">Công khai học phần (Public)</span>
        </label>

        {words.map((word, index) => (
          <div key={index} className="space-y-4 p-6 rounded-xl bg-white shadow border border-gray-100">
            <div className="text-sm font-semibold text-indigo-600">
              Từ vựng {index + 1}
            </div>

            <input
              type="text"
              placeholder="Từ vựng"
              value={word.vocab}
              onChange={(e) => handleChangeWord(index, "vocab", e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />

            {word.suggestions.length > 0 && (
              <ul className="flex flex-wrap gap-2 text-sm text-gray-600">
                {word.suggestions.map((suggestion, sIndex) => (
                  <li
                    key={sIndex}
                    className="px-2 py-1 border border-gray-300 rounded cursor-pointer hover:bg-indigo-100"
                    onClick={() => handleChangeWord(index, "vocab", suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <input
                type="text"
                placeholder="Ý nghĩa tiếng Việt"
                value={word.meaning}
                onChange={(e) =>
                  handleChangeWord(index, "meaning", e.target.value)
                }
                className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <button
                type="button"
                title="Tìm ảnh minh hoạ"
                onClick={() => handleFetchImages(index)}
                className="px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition text-sm"
              >
                🖼️
              </button>
            </div>

            {word.imageOptions.length > 0 && !word.image && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {word.imageOptions.map((imgUrl, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={imgUrl}
                    alt="option"
                    onClick={() => handleSelectImage(index, imgUrl)}
                    className={`w-full h-24 object-cover rounded-md border-2 cursor-pointer transition hover:scale-105 ${
                      word.image === imgUrl
                        ? "border-indigo-500"
                        : "border-gray-200"
                    }`}
                  />
                ))}
              </div>
            )}

            <input
              type="text"
              placeholder="URL hình ảnh (tuỳ chọn)"
              value={word.image}
              onChange={(e) => handleChangeWord(index, "image", e.target.value)}
              className="hidden"
            />

            {word.image && (
              <div className="relative inline-block mt-2">
                <img
                  src={word.image}
                  alt="preview"
                  className="w-20 h-20 object-cover rounded-md border border-indigo-400"
                  onError={(e) => (e.target.style.display = "none")}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-white bg-opacity-80 text-red-500 hover:text-red-700 rounded-full p-1 shadow"
                  title="Xoá ảnh"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
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
