// firebaseUtils.js
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const saveLessonToFirebase = async (lessonData, words) => {
  try {
    console.log("Trước addDoc lesson");

    // Thêm lesson
    const lessonRef = await addDoc(collection(db, "lessons"), lessonData);
    console.log("Sau addDoc lesson:", lessonRef.id);

    // Thêm từng word vào subcollection "words" trong lesson
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