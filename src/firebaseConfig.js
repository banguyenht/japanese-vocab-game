import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAdS5Be62vmzP7k7E3xGfotxyZXtV5k_N0",
  authDomain: "jp-vocab-163c2.firebaseapp.com",
  projectId: "jp-vocab-163c2",
  storageBucket: "jp-vocab-163c2.firebasestorage.app",
  messagingSenderId: "780717889410",
  appId: "1:780717889410:web:c0ddb4b0824546ee54219b",
  measurementId: "G-5B9FQDDTPJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
