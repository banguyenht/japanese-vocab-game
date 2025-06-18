import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton = ({ onSuccess }) => {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user.photoURL)
      if (onSuccess) onSuccess(user);
      console.log("Đăng nhập thành công:", user);
    } catch (error) {
      console.error("Đăng nhập bằng Google thất bại:", error);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition"
    >
      <FcGoogle className="w-5 h-5" />
      <span>Đăng nhập với Google</span>
    </button>
  );
};

export default GoogleLoginButton;
