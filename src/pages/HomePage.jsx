import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLessons from "../hooks/useLessons";
import LessonList from "../components/LessonList";

const HomePage = () => {
  const user = useAuth();
  const { publicLessons, privateLessons, loading } = useLessons();

  const filteredPublicLessons = user
    ? publicLessons.filter((lesson) => lesson.userId !== user.uid)
    : publicLessons;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-700 mb-2">
            Chào mừng đến với Từ vựng tiếng Nhật!
          </h1>
          <p className="text-gray-600 text-lg">
            Luyện tập & khám phá kho từ vựng cực kỳ phong phú!
          </p>
        </div>

        <LessonList
          title="📘 Học phần của bạn"
          lessons={privateLessons}
          currentUserId={user?.uid}
          loading={loading}
        />

        <LessonList
          title="🌍  Các học phần công khai"
          lessons={filteredPublicLessons}
          currentUserId={user?.uid}
          loading={loading}
        />

        {user && (
          <div className="mt-14 flex justify-center">
            <Link
              to="/tao-tu-vung-tieng-nhat"
              className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full text-sm font-semibold hover:opacity-90 shadow-md"
            >
              ➕ Tạo học phần mới
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
