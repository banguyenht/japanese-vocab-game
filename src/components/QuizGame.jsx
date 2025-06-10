import { useEffect, useState } from "react";
import { loadCSV } from "../utils/loadCSV";
import vocabCSV from "../data/lession40.csv?url";

export default function QuizGame() {
  const [vocab, setVocab] = useState([]);

  useEffect(() => {
    fetch(vocabCSV)
      .then((res) => res.text())
      .then((csvText) => {
        // ⚠️ Strip BOM nếu có
        const cleanText = csvText.replace(/^\uFEFF/, "");
        console.log("📦 Cleaned CSV Text:", cleanText.slice(0, 200) + "...");

        return loadCSV(cleanText);
      })
      .then((data) => {
        // Log object đầu tiên và các key
        console.log("✅ Parsed CSV:", data);
        const firstEntry = data[0];
        console.log("🔍 First entry:", firstEntry);
        console.log("🔑 Keys:", Object.keys(firstEntry));

        // Lọc bỏ dòng thiếu dữ liệu
        const clean = data.filter(
          (row) =>
            row.japanese?.trim() &&
            row.meaning?.trim() &&
            row.reading?.trim()
        );

        setVocab(clean);
      })
      .catch((err) => {
        console.error("❌ Error loading CSV:", err);
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">📚 Vocabulary Debug</h2>
      <p className="mb-2">Tổng số từ đã load: {vocab.length}</p>
      <ul className="list-disc ml-5 space-y-1">
        {vocab.map((word, index) => (
          <li key={index}>
            <strong>{word.japanese}</strong> ({word.reading}) – {word.meaning}
          </li>
        ))}
      </ul>
    </div>
  );
}
