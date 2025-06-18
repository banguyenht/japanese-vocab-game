import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Thêm Firestore vào cấu hình Firebase

const APP_APIKEY = import.meta.env.VITE_APP_APIKEY
const firebaseConfig = {
  apiKey: APP_APIKEY,
  authDomain: "jp-vocab-game-dev.firebaseapp.com",
  projectId: "jp-vocab-game-dev",
  storageBucket: "jp-vocab-game-dev.appspot.com", // Sửa lại đúng định dạng storageBucket
  messagingSenderId: "294175413881",
  appId: "1:294175413881:web:0a3ab2d7abd8148f4026a8",
  measurementId: "G-KRG7LEVKX6"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Firebase Auth
const auth = getAuth(app);

// Khởi tạo Firestore Database
const db = getFirestore(app); // Firestore để lưu dữ liệu học phần

// Google Provider
const provider = new GoogleAuthProvider();

export {
  auth,
  db, // Xuất db để sử dụng lưu học phần
  provider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
};
