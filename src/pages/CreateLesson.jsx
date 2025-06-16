import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UNSPLASH_ACCESS_KEY = "wNUfExecDVj0WPMiUouZ5esV7JRAY-e3Jj7wq_GkNiU";

const CreateLesson = () => {
  const navigate = useNavigate();
  const [lessonName, setLessonName] = useState("");
  const [words, setWords] = useState([
    { vocab: "", kanji: "", meaning: "", image: "", imageOptions: [] },
  ]);

  const handleChangeWord = (index, field, value) => {
    const updated = [...words];
    updated[index][field] = value;
    setWords(updated);
  };

  const fetchImages = async (keyword) => {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
          keyword
        )}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=5`
      );
      const data = await res.json();
      return data.results.map((img) => img.urls.small);
    } catch (error) {
      console.error("Error fetching images:", error);
      return [];
    }
  };

  const handleMeaningBlur = async (index, value) => {
    handleChangeWord(index, "meaning", value);
    const images = await fetchImages(value);
    const updated = [...words];
    updated[index].imageOptions = images;
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
      { vocab: "", kanji: "", meaning: "", image: "", imageOptions: [] },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Lesson created:", { lessonName, words });
    navigate("/");
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-gray-50 min-h-screen">
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

        {words.map((word, index) => (
          <div
            key={index}
            className="space-y-4 p-6 rounded-xl bg-white shadow border border-gray-100"
          >
            <div className="text-sm font-semibold text-indigo-600">
              Từ vựng {index + 1}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Từ vựng (Kana)"
                value={word.vocab}
                onChange={(e) => handleChangeWord(index, "vocab", e.target.value)}
                className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <input
                type="text"
                placeholder="Kanji"
                value={word.kanji}
                onChange={(e) => handleChangeWord(index, "kanji", e.target.value)}
                className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>

            <input
              type="text"
              placeholder="Ý nghĩa tiếng Việt"
              value={word.meaning}
              onChange={(e) => handleChangeWord(index, "meaning", e.target.value)}
              onBlur={(e) => handleMeaningBlur(index, e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />

            {word.imageOptions.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {word.imageOptions.map((imgUrl, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={imgUrl}
                    alt="option"
                    onClick={() => handleSelectImage(index, imgUrl)}
                    className={`w-24 h-24 object-cover rounded-md border-2 cursor-pointer transition hover:scale-105 ${
                      word.image === imgUrl ? "border-indigo-500" : "border-gray-200"
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
              className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />

            {word.image && (
              <img
                src={word.image}
                alt="preview"
                className="w-32 h-32 object-cover rounded-md border border-indigo-400 mt-2"
                onError={(e) => (e.target.style.display = "none")}
              />
            )}
          </div>
        ))}

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleAddWord}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            + Thêm từ vựng
          </button>

          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700"
          >
            ✅ Tạo học phần
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateLesson;
