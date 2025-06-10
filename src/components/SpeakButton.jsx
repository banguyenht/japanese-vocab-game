import React from "react";

function speak(text, lang = "ja-JP") {
  if (!window.speechSynthesis) {
    alert("Trình duyệt không hỗ trợ phát âm!");
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  window.speechSynthesis.cancel(); // hủy âm cũ nếu có
  window.speechSynthesis.speak(utterance);
}

export default function SpeakButton({ text, lang = "ja-JP" }) {
  return (
    <button
      onClick={() => speak(text, lang)}
      className="text-indigo-600 hover:text-indigo-800 transition text-3xl p-2 rounded-full hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      aria-label="Phát âm từ vựng"
      title="Phát âm từ vựng"
      type="button"
      style={{ lineHeight: 1 }}
    >
      🔊
    </button>
  );
}
