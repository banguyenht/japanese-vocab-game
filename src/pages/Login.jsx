import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebaseConfig";
import GoogleLoginButton from "../components/auth/GoogleLoginButton"; // 👈 Thêm dòng này

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [unverifiedUser, setUnverifiedUser] = useState(null);
  const [resendSuccess, setResendSuccess] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setUnverifiedUser(null);
    setResendSuccess(false);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        setUnverifiedUser(user);
        setError("Tài khoản chưa xác minh email. Vui lòng kiểm tra hộp thư.");
        return;
      }

      navigate("/");
    } catch (err) {
      setError("Email hoặc mật khẩu không chính xác.");
    }
  };

  const handleResendVerification = async () => {
    if (unverifiedUser) {
      try {
        await sendEmailVerification(unverifiedUser);
        setResendSuccess(true);
      } catch (error) {
        setError("Gửi email xác minh thất bại. Vui lòng thử lại.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-white to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">🎓 Đăng nhập</h2>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-3 rounded mb-4 border border-red-300">
            {error}
          </div>
        )}

        {resendSuccess && (
          <div className="bg-green-100 text-green-700 text-sm p-3 rounded mb-4 border border-green-300">
            Email xác minh đã được gửi lại. Vui lòng kiểm tra hộp thư.
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
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
            <div className="text-right text-sm mt-1">
              <Link to="/forgot-password" className="text-indigo-600 hover:underline">
                Quên mật khẩu?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition"
          >
            Đăng nhập
          </button>
        </form>

        {unverifiedUser && (
          <div className="mt-4 text-center">
            <button
              onClick={handleResendVerification}
              className="text-sm text-indigo-600 hover:underline"
            >
              Gửi lại email xác minh
            </button>
          </div>
        )}

        <div className="my-6">
          <div className="relative text-center text-sm text-gray-500">
            <div className="absolute left-0 top-2 w-full border-t border-gray-200" />
            <span className="bg-white px-2 relative z-10">Hoặc</span>
          </div>
        </div>

        <GoogleLoginButton onSuccess={() => navigate("/")} />

        <div className="mt-6 text-center text-sm text-gray-500">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Đăng ký
          </Link>
        </div>
      </div>
    </div>
  );
}
