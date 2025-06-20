import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { saveLessonToFirebase } from "../utils/firebaseUtils";
import LessonForm from "../components/LessonForm";

const CreateLesson = () => {
  const navigate = useNavigate();
  const user = useAuth();

  // Nếu đang load user, chưa biết có user hay không
  if (user === undefined) {
    return <div className="text-center py-20">🔄 Đang kiểm tra đăng nhập...</div>;
  }

  // Nếu user chưa đăng nhập
  if (!user) {
    return <div className="text-center py-20">❌ Bạn cần đăng nhập để tạo học phần.</div>;
  }

  const handleSubmit = async ({ lessonName, isPublic, words }) => {
    try {
      const lessonData = {
        userId: user.uid,
        lessonName,
        isPublic,
        createdAt: new Date(),
      };

      const cleanedWords = words.map(({ vocab, meaning, image }) => ({
        vocab,
        meaning,
        image,
      }));

      await saveLessonToFirebase(lessonData, cleanedWords);
      alert("✅ Học phần đã được lưu thành công!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("❌ Đã xảy ra lỗi khi lưu học phần.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-10">
        📚 Tạo học phần mới
      </h1>
      <LessonForm
        onSubmit={handleSubmit}
        mode="create"
        initialLessonName=""
        initialIsPublic={true}
        initialWords={[
          {
            vocab: "",
            meaning: "",
            image: "",
            imageOptions: [],
            suggestions: [],
          },
        ]}
      />
    </div>
  );
};

export default CreateLesson;
