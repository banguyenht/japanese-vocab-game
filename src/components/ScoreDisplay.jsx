import React from "react";

export default function ScoreDisplay({ score }) {
  return (
    <div className="mt-6 text-center text-gray-600">
      Điểm: <span className="font-bold text-indigo-600">{score}</span>
    </div>
  );
}
