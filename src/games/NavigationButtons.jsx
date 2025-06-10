import React from "react";

export default function NavigationButtons({ onPrev, onNext }) {
  return (
    <div className="text-center flex justify-center gap-4">
      <button
        onClick={onPrev}
        className="bg-gray-500 text-white font-semibold px-6 py-2 rounded-xl shadow-md hover:bg-gray-600 transition"
        type="button"
      >
        👈 Quay lại
      </button>
      <button
        onClick={onNext}
        className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-xl shadow-md hover:bg-indigo-700 transition"
        type="button"
      >
        👉 Tiếp theo
      </button>
    </div>
  );
}
