import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import useAuth from "../hooks/useAuth";
import WordInputCard from "../components/WordInputCard";

const EditLessonPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAuth();

  const [lessonName, setLessonName] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLesson = async () => {
      setLoading(true);
      try {
        const lessonRef = doc(db, "lessons", id);
        const lessonSnap = await getDoc(lessonRef);

        if (!lessonSnap.exists()) {
          alert("❌ Học phần không tồn tại");
          return navigate("/");
        }

        const lessonData = lessonSnap.data();

        if (lessonData.userId !== user?.uid) {
          alert("❌ Bạn không có quyền chỉnh sửa học phần này");
          return navigate("/");
        }

        setLessonName(lessonData.lessonName);
        setIsPublic(lessonData.isPublic);

        const wordsRef = collection(lessonRef, "words");
        const wordSnap = await getDocs(wordsRef);
        const wordList = wordSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          imageOptions: [],
          suggestions: [],
        }));
        setWords(wordList);
      } catch (err) {
        console.error("❌ Lỗi khi tải học phần:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id && user) fetchLesson();
  }, [id, user, navigate]);

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

  const handleAddWord = () => {
    setWords((prev) => [
      ...prev,
      { vocab: "", meaning: "", image: "", imageOptions: [], suggestions: [] },
    ]);
  };

  const handleDeleteWord = (indexToRemove) => {
    setWords((prevWords) =>
      prevWords.filter((_, i) => i !== indexToRemove)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const lessonRef = doc(db, "lessons", id);
      await updateDoc(lessonRef, {
        lessonName,
        isPublic,
        wordCount: words.length,
      });

      const wordsRef = collection(lessonRef, "words");
      const existingWords = await getDocs(wordsRef);
      await Promise.all(existingWords.docs.map((doc) => deleteDoc(doc.ref)));

      await Promise.all(
        words.map((word) =>
          addDoc(wordsRef, {
            vocab: word.vocab,
            meaning: word.meaning,
            image: word.image,
          })
        )
      );

      alert("✅ Cập nhật học phần thành công!");
      navigate("/");
    } catch (err) {
      console.error("❌ Lỗi khi cập nhật học phần:", err);
      alert("❌ Lỗi khi cập nhật học phần");
    }
  };

  if (loading) {
    return <div className="text-center py-20">Đang tải học phần...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-10">
        ✏️ Chỉnh sửa học phần
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
          <span className="text-sm text-gray-700">
            Công khai học phần (Public)
          </span>
        </label>

        {words.map((word, index) => (
          <WordInputCard
            key={word.id || index}
            index={index}
            word={word}
            mode="edit"
            onChange={handleUpdateWord}
            onDeleteWord={() => handleDeleteWord(index)}
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
            ✅ Cập nhật học phần
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditLessonPage;
