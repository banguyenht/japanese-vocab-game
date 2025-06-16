// src/components/AuthButton.jsx
import { useEffect, useState } from "react";
import { auth, provider } from "../firebaseConfig";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

export default function AuthButton() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Login error", err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  return user ? (
    <button onClick={handleLogout} className="text-sm text-red-600 hover:underline">
      Đăng xuất ({user.displayName})
    </button>
  ) : (
    <button onClick={handleLogin} className="text-sm text-indigo-600 hover:underline">
      Đăng nhập bằng Google
    </button>
  );
}
