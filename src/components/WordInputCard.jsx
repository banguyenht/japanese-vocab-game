import { useRef } from "react";
import { fetchJishoSuggestions } from "../utils/jishoApi";
import { fetchUnsplashImages } from "../utils/unsplashApi";
import { translateToEnglish } from "../utils/translateApi";

const WordInputCard = ({ index, word, onChange, onSuggestMeaningClick, mode = "create" }) => {
  const debounceRef = useRef();

  const handleChange = (field, value) => {
    const updatedWord = { ...word, [field]: value };
    onChange(index, updatedWord);

    if (field === "vocab") {
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(async () => {
        const suggestions = await fetchJishoSuggestions(value);
        onChange(index, (prev) => ({
          ...prev,
          suggestions,
        }));
      }, 600);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    handleChange("vocab", suggestion);
  };

  const handleFetchImages = async () => {
    if (!word.meaning.trim()) return;
    const keyword = await translateToEnglish(word.meaning);
    const images = await fetchUnsplashImages(keyword);
    onChange(index, (prev) => ({
      ...prev,
      imageOptions: images,
    }));
  };

  const handleSelectImage = (imgUrl) => {
    onChange(index, (prev) => ({
      ...prev,
      image: imgUrl,
    }));
  };

  const handleRemoveImage = () => {
    onChange(index, (prev) => ({
      ...prev,
      image: "",
    }));
  };

  return (
    <div className="space-y-4 p-6 rounded-xl bg-white shadow border border-gray-100">
      <div className="text-sm font-semibold text-indigo-600">
        Từ vựng {index + 1}
      </div>

      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Từ vựng"
          value={word.vocab}
          onChange={(e) => handleChange("vocab", e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300"
        />
        <button
          type="button"
          title="Gợi ý ý nghĩa"
          onClick={onSuggestMeaningClick}
          className="px-3 py-1 rounded-md border border-gray-300 text-sm hover:bg-gray-100"
        >
          💡
        </button>
      </div>

      {word.suggestions?.length > 0 && (
        <ul className="flex flex-wrap gap-2 text-sm text-gray-600">
          {word.suggestions.map((sug, i) => (
            <li
              key={i}
              onClick={() => handleSelectSuggestion(sug)}
              className="px-2 py-1 border border-gray-300 rounded cursor-pointer hover:bg-indigo-100"
            >
              {sug}
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <input
          type="text"
          placeholder="Ý nghĩa tiếng Việt"
          value={word.meaning}
          onChange={(e) => handleChange("meaning", e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300"
        />
        <button
          type="button"
          title="Tìm ảnh minh hoạ"
          onClick={handleFetchImages}
          className="px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-100 text-sm"
        >
          🖼️
        </button>
      </div>

      {word.imageOptions?.length > 0 && !word.image && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {word.imageOptions.map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              onClick={() => handleSelectImage(img)}
              className={`w-full h-24 object-cover rounded-md border-2 cursor-pointer hover:scale-105 transition ${
                word.image === img ? "border-indigo-500" : "border-gray-200"
              }`}
            />
          ))}
        </div>
      )}

      {word.image && (
        <div className="relative inline-block mt-2">
          <img
            src={word.image}
            alt="preview"
            className="w-20 h-20 object-cover rounded-md border border-indigo-400"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-0 right-0 bg-white bg-opacity-80 text-red-500 hover:text-red-700 rounded-full p-1 shadow"
            title="Xoá ảnh"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default WordInputCard;
