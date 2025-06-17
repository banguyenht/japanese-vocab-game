import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAKUjvj_3FT8sEXKicOY0dgM8LUn-rESLk",
  authDomain: "jp-vocab-game-dev.firebaseapp.com",
  projectId: "jp-vocab-game-dev",
  storageBucket: "jp-vocab-game-dev.firebasestorage.app",
  messagingSenderId: "294175413881",
  appId: "1:294175413881:web:0a3ab2d7abd8148f4026a8",
  measurementId: "G-KRG7LEVKX6"
};

// translate api key = AIzaSyAKUjvj_3FT8sEXKicOY0dgM8LUn-rESLk

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
