import { useEffect, useState } from "react";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";

const useFetchLesson = (lessonId, options = { includeWords: true }) => {
  const [lesson, setLesson] = useState(null);
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const lessonRef = doc(db, "lessons", lessonId);
        const lessonSnap = await getDoc(lessonRef);

        if (!lessonSnap.exists()) {
          throw new Error("Học phần không tồn tại");
        }

        const lessonData = lessonSnap.data();
        setLesson({ id: lessonSnap.id, ...lessonData });

        if (options.includeWords) {
          const wordsRef = collection(lessonRef, "words");
          const wordSnap = await getDocs(wordsRef);
          const wordList = wordSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setWords(wordList);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (lessonId) fetchData();
  }, [lessonId, options.includeWords]);

  return { lesson, words, loading, error };
};

export default useFetchLesson;
