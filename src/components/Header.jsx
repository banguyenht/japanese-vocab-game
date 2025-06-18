import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MenuIcon,
  XIcon,
  HomeIcon,
  BookOpenIcon,
  BellIcon,
  LogOutIcon,
  LogInIcon,
  PlusCircleIcon,
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    setSidebarOpen(false);
    navigate("/login");
  };

  const handleLogout = () => {
    signOut(auth).catch(console.error);
    setSidebarOpen(false);
  };

  const sidebarItems = [
    { label: "Trang chủ", icon: <HomeIcon className="w-5 h-5" />, to: "/" },
    { label: "Thư viện", icon: <BookOpenIcon className="w-5 h-5" />, to: "/library" },
    { label: "Thông báo", icon: <BellIcon className="w-5 h-5" />, to: "/notifications" },
  ];

  return (
    <>
      {/* HEADER */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)}>
              <MenuIcon className="w-6 h-6 text-indigo-600" />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <div className="text-2xl font-extrabold text-indigo-600">J</div>
            </Link>

          </div>

          <div className="flex items-center gap-3">
            {user && (
              <Link
                to="create-lesson"
                className="hidden sm:flex items-center gap-1 text-sm text-green-600 hover:text-green-800"
              >
                <PlusCircleIcon className="w-4 h-4" />
                Tạo học phần
              </Link>
            )}
            {user ? (
              <img
                src={user.photoURL || ""}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover border"
              />
            ) : (
              <button onClick={handleLogin} className="text-sm text-indigo-600">
                Đăng nhập
              </button>
            )}
          </div>
        </div>
      </header>

      {/* SIDEBAR */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="fixed inset-y-0 left-0 w-72 bg-white z-50 shadow-lg flex flex-col">
            <div className="flex items-center justify-between px-4 py-4 border-b">
              <h2 className="text-lg font-semibold text-indigo-600">📖 JP Game</h2>
              <button onClick={() => setSidebarOpen(false)}>
                <XIcon className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="flex flex-col px-4 py-2 gap-2">
              {sidebarItems.map(({ label, icon, to }) => (
                <Link
                  key={label}
                  to={to}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-indigo-50 text-gray-700"
                >
                  {icon}
                  <span className="text-sm">{label}</span>
                </Link>
              ))}

              {user && (
                <>
                  <Link
                    to="/create-lesson"
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-green-50 text-green-700"
                  >
                    <PlusCircleIcon className="w-5 h-5" />
                    <span className="text-sm">Tạo học phần</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-50 text-red-600"
                  >
                    <LogOutIcon className="w-5 h-5" />
                    <span className="text-sm">Đăng xuất</span>
                  </button>
                </>
              )}

              {!user && (
                <button
                  onClick={handleLogin}
                  className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-indigo-100 text-indigo-600"
                >
                  <LogInIcon className="w-5 h-5" />
                  <span className="text-sm">Đăng nhập</span>
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
