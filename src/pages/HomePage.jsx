import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const HomePage = () => {
  const user = useAuth(); // Lấy thông tin người dùng

  // Tạm thời tạo danh sách học phần mẫu
  const userLessons = [
    { id: 1, title: "Từ vựng gia đình", wordCount: 20 },
    { id: 2, title: "Động từ N5", wordCount: 30 },
    { id: 3, title: "Từ trái nghĩa", wordCount: 15 },
    { id: 4, title: "Mẫu câu hay gặp", wordCount: 10 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          📚 Các học phần của bạn
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {userLessons.map((lesson) => (
            <Link
              key={lesson.id}
              to={`/lesson/${lesson.id}`}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 hover:border-indigo-300"
            >
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                {lesson.title}
              </h3>
              <p className="text-gray-500 text-sm">{lesson.wordCount} từ vựng</p>
            </Link>
          ))}
        </div>

        {user && ( // Kiểm tra nếu user đã đăng nhập thì hiển thị nút tạo học phần mới
          <div className="mt-10 flex justify-center">
            <Link
              to="/tao-tu-vung-tieng-nhat"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-indigo-700 transition"
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
