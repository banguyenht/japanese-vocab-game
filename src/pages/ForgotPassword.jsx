import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");

    try {
      await sendPasswordResetEmail(auth, email);
      setNotice("📩 Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư.");
      setEmail("");
    } catch (err) {
      setError("Không thể gửi email khôi phục. Vui lòng kiểm tra địa chỉ email.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-white to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">🔐 Quên mật khẩu</h2>

        {notice && (
          <div className="bg-green-100 text-green-700 text-sm p-3 rounded mb-4 border border-green-300">
            {notice}
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-3 rounded mb-4 border border-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleReset} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition"
          >
            Gửi email khôi phục
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <Link to="/login" className="text-indigo-600 hover:underline">
            Quay lại đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}
