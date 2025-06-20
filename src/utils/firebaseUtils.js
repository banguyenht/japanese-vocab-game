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

export const saveLessonToFirebase = async (lessonData, words) => {
  try {
    const wordCount = words.length;

    const lessonRef = await addDoc(collection(db, "lessons"), {
      ...lessonData,
      wordCount,
    });
    console.log("Sau addDoc lesson:", lessonRef.id);

    const wordPromises = words.map((word) =>
      addDoc(collection(lessonRef, "words"), {
        vocab: word.vocab,
        meaning: word.meaning,
        image: word.image,
      })
    );

    await Promise.all(wordPromises);
    console.log("saveLessonToFirebase hoàn thành");

    return lessonRef;
  } catch (error) {
    console.error("Lỗi trong saveLessonToFirebase:", error);
    throw error;
  }
};

export const updateLessonInFirebase = async (
  lessonId,
  lessonName,
  isPublic,
  words
) => {
  const lessonRef = doc(db, "lessons", lessonId);

  // Cập nhật thông tin học phần chính
  await updateDoc(lessonRef, {
    lessonName,
    isPublic,
    wordCount: words.length,
    updatedAt: new Date(),
  });

  // Xoá tất cả từ cũ
  const wordsRef = collection(lessonRef, "words");
  const existingWords = await getDocs(wordsRef);
  await Promise.all(existingWords.docs.map((doc) => deleteDoc(doc.ref)));

  // Lưu từ mới
  const savePromises = words.map((word) =>
    addDoc(wordsRef, {
      vocab: word.vocab,
      meaning: word.meaning,
      image: word.image || "",
    })
  );
  await Promise.all(savePromises);
};
