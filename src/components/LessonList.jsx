import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import SkeletonCard from "./SkeletonLessonCard";

const LessonList = ({ title, lessons = [], currentUserId, loading = false }) => {
  if (loading) {
    return (
      <>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
          {title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </>
    );
  }

  if (!Array.isArray(lessons) || lessons.length === 0) return null;

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {lessons.map((lesson) => {
          const isOwner = currentUserId === lesson.userId;

          return (
            <div
              key={lesson.id}
              className="relative bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 hover:border-indigo-300"
            >
              <Link to={`/lesson/${lesson.id}`}>
                <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                  {lesson.lessonName}
                </h3>
                <p className="text-gray-500 text-sm">
                  {lesson.wordCount || 0} từ vựng
                </p>
              </Link>

              {isOwner && (
                <div className="absolute top-3 right-3 flex gap-3">
                  <Link
                    to={`/sua-tu-vung-tieng-nhat/${lesson.id}`}
                    title="Chỉnh sửa"
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    title="Xoá học phần"
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LessonList;
