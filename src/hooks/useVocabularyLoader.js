import { useEffect, useState } from "react";
import { loadCSV } from "../utils/loadCSV";

export function useVocabularyLoader(lessonId) {
  const [vocabList, setVocabList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lessonId) return;

    const csvPath = `/data/lesson${lessonId}.csv`;
    fetch(csvPath)
      .then((res) => res.text())
      .then((text) => loadCSV(text))
      .then((data) => {
        setVocabList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load CSV", err);
        setLoading(false);
      });
  }, [lessonId]);

  return { vocabList, loading };
}
