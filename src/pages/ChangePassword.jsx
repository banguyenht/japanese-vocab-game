import { useState } from "react";
import { updatePassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");

    const user = auth.currentUser;

    if (!user) {
      setError("Bạn chưa đăng nhập.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu mới và xác nhận không khớp.");
      return;
    }

    try {
      await updatePassword(user, newPassword);
      setNotice("✅ Đổi mật khẩu thành công!");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/requires-recent-login") {
        setError("Vui lòng đăng nhập lại để đổi mật khẩu.");
        // Optional: điều hướng tới login nếu cần
        // navigate("/login");
      } else {
        setError("Đổi mật khẩu thất bại. Vui lòng thử lại.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-white to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">🔒 Đổi mật khẩu</h2>

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

        <form onSubmit={handleChangePassword} className="space-y-5">
          {/* Bạn có thể bỏ currentPassword nếu không cần xác nhận lại */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu hiện tại</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
              placeholder="••••••••"
            />
          </div> */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu mới</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
              placeholder="Mật khẩu mới"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
              placeholder="Xác nhận mật khẩu mới"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium"
          >
            Đổi mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
}
