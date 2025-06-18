import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [createdUser, setCreatedUser] = useState(null);
  const [resendSuccess, setResendSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");
    setResendSuccess(false);

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);

      setCreatedUser(userCredential.user);
      setNotice("🎉 Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("Đăng ký thất bại. Vui lòng thử lại.");
    }
  };

  const handleResendVerification = async () => {
    setError("");
    setResendSuccess(false);

    const user = auth.currentUser;
    if (user) {
      try {
        await sendEmailVerification(user);
        setResendSuccess(true);
      } catch (error) {
        console.error(error);
        setError("Gửi lại email xác minh thất bại.");
      }
    } else {
      setError("Không tìm thấy người dùng hiện tại.");
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-white to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">📝 Đăng ký tài khoản</h2>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-3 rounded mb-4 border border-red-300">
            {error}
          </div>
        )}

        {notice && (
          <div className="bg-green-100 text-green-700 text-sm p-3 rounded mb-4 border border-green-300">
            {notice}
          </div>
        )}

        {resendSuccess && (
          <div className="bg-green-100 text-green-700 text-sm p-3 rounded mb-4 border border-green-300">
            Email xác minh đã được gửi lại. Vui lòng kiểm tra hộp thư.
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition"
          >
            Đăng ký
          </button>
        </form>

        {createdUser && (
          <div className="mt-4 text-center">
            <button
              onClick={handleResendVerification}
              className="text-sm text-indigo-600 hover:underline"
            >
              Gửi lại email xác minh
            </button>
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-500">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}
