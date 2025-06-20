import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  doc, getDoc, getDocs, collection
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import useAuth from "../hooks/useAuth";
import LessonForm from "../components/LessonForm";
import { updateLessonInFirebase } from "../utils/firebaseUtils";

const EditLessonPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAuth();

  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      const lessonRef = doc(db, "lessons", id);
      const lessonSnap = await getDoc(lessonRef);
      if (!lessonSnap.exists()) return alert("❌ Học phần không tồn tại");

      const lessonData = lessonSnap.data();
      if (lessonData.userId !== user?.uid) {
        alert("❌ Bạn không có quyền chỉnh sửa học phần này");
        return navigate("/");
      }

      const wordsRef = collection(lessonRef, "words");
      const wordSnap = await getDocs(wordsRef);
      const wordList = wordSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        imageOptions: [],
        suggestions: [],
      }));

      setInitialData({
        lessonName: lessonData.lessonName,
        isPublic: lessonData.isPublic,
        words: wordList,
      });
    };

    if (id && user) fetchLesson();
  }, [id, user, navigate]);

  const handleSubmit = async ({ lessonName, isPublic, words }) => {
    try {
      await updateLessonInFirebase(id, { lessonName, isPublic }, words);
      alert("✅ Cập nhật học phần thành công!");
      navigate("/");
    } catch (err) {
      alert("❌ Lỗi khi cập nhật học phần");
    }
  };

  if (!initialData) {
    return <div className="text-center py-20">Đang tải học phần...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-10">✏️ Chỉnh sửa học phần</h1>
      <LessonForm
        onSubmit={handleSubmit}
        mode="edit"
        initialLessonName={initialData.lessonName}
        initialIsPublic={initialData.isPublic}
        initialWords={initialData.words}
      />
    </div>
  );
};

export default EditLessonPage;
