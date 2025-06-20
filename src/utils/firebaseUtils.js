// firebaseUtils.js
import {
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  collection,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

// Dành cho tạo học phần mới
export const saveLessonToFirebase = async (lessonData, words) => {
  try {
    const wordCount = words.length;

    const lessonRef = await addDoc(collection(db, "lessons"), {
      ...lessonData,
      wordCount,
    });

    const wordPromises = words.map((word) =>
      addDoc(collection(lessonRef, "words"), {
        vocab: word.vocab,
        meaning: word.meaning,
        image: word.image,
      })
    );

    await Promise.all(wordPromises);
    return lessonRef;
  } catch (error) {
    console.error("Lỗi trong saveLessonToFirebase:", error);
    throw error;
  }
};

// Dành cho chỉnh sửa học phần đã có
export const updateLessonInFirebase = async (lessonId, lessonData, words) => {
  try {
    const lessonRef = doc(db, "lessons", lessonId);

    await updateDoc(lessonRef, {
      lessonName: lessonData.lessonName,
      isPublic: lessonData.isPublic,
      wordCount: words.length,
    });

    const wordsRef = collection(lessonRef, "words");
    const existingWords = await getDocs(wordsRef);

    // Xoá từ cũ
    await Promise.all(existingWords.docs.map((doc) => deleteDoc(doc.ref)));

    // Thêm từ mới
    await Promise.all(
      words.map((word) =>
        addDoc(wordsRef, {
          vocab: word.vocab,
          meaning: word.meaning,
          image: word.image,
        })
      )
    );
  } catch (err) {
    console.error("Lỗi trong updateLessonInFirebase:", err);
    throw err;
  }
};
