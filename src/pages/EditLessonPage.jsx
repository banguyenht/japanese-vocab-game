import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LessonForm from "../components/LessonForm";
import { updateLessonInFirebase } from "../utils/firebaseUtils";
import useFetchLesson from "../hooks/useFetchLesson";

const EditLessonPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAuth();

  const { lesson, words, loading, error } = useFetchLesson(id);

  const handleSubmit = async ({ lessonName, isPublic, words }) => {
    try {
      await updateLessonInFirebase(id, { lessonName, isPublic }, words);
      alert("✅ Cập nhật học phần thành công!");
      navigate("/");
    } catch (err) {
      alert("❌ Lỗi khi cập nhật học phần");
      console.error(err);
    }
  };

  if (loading || !user) {
    return <div className="text-center py-20">Đang tải học phần...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">❌ {error.message}</div>;
  }

  if (lesson.userId !== user.uid) {
    return <div className="text-center py-20 text-red-600">❌ Bạn không có quyền chỉnh sửa học phần này</div>;
  }

  const preparedWords = words.map((w) => ({
    ...w,
    imageOptions: [],
    suggestions: [],
  }));

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-10">✏️ Chỉnh sửa học phần</h1>
      <LessonForm
        onSubmit={handleSubmit}
        mode="edit"
        initialLessonName={lesson.lessonName}
        initialIsPublic={lesson.isPublic}
        initialWords={preparedWords}
      />
    </div>
  );
};

export default EditLessonPage;
