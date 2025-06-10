import { useEffect, useState } from "react";
import { loadCSV } from "../utils/loadCSV";
import vocabCSV from "../data/lesson40.csv?url";

export default function CsvLoader() {
  const [vocab, setVocab] = useState([]);

  useEffect(() => {
    fetch(vocabCSV)
      .then((res) => res.text())
      .then((csvText) => loadCSV(csvText.replace(/^\uFEFF/, "")))
      .then((data) => {
        console.log("Parsed CSV data:", data);
        const clean = data.filter(
          (row) =>
            row.vocab?.trim() &&
            row.kanji?.trim() &&
            row.meaning?.trim()
        );
        console.log("Filtered vocabulary:", clean);
        setVocab(clean);
      })
      .catch((err) => console.error("Error loading CSV:", err));
  }, []);

  return (
    <div>
      <h2>Đã load {vocab.length} từ vựng</h2>
      <ul>
        {vocab.map((v, i) => (
          <li key={i}>
            <strong>{v.vocab}</strong> ({v.kanji}) : {v.meaning}
          </li>
        ))}
      </ul>
    </div>
  );
}
