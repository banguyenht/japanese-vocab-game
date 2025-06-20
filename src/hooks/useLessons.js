import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import useAuth from "./useAuth";

const useLessons = () => {
  const user = useAuth();
  const [publicLessons, setPublicLessons] = useState([]);
  const [privateLessons, setPrivateLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      try {
        const lessonRef = collection(db, "lessons");

        // 🔹 Lấy các học phần công khai
        const publicQuery = query(lessonRef, where("isPublic", "==", true));
        const publicSnapshot = await getDocs(publicQuery);
        const publicData = publicSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPublicLessons(publicData);

        // 🔹 Lấy học phần của người dùng (nếu đã đăng nhập)
        if (user) {
          const privateQuery = query(lessonRef, where("userId", "==", user.uid));
          const privateSnapshot = await getDocs(privateQuery);
          const privateData = privateSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPrivateLessons(privateData);
        } else {
          setPrivateLessons([]);
        }
      } catch (error) {
        console.error("❌ Lỗi khi lấy học phần:", error);
      } finally {
        // ✅ Delay để tránh flash trắng (UX mượt hơn)
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    };

    fetchLessons();
  }, [user]);

  return {
    publicLessons,
    privateLessons,
    loading,
  };
};

export default useLessons;
