import { useState, useRef, useEffect } from "react";
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
  KeyIcon,
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const avatarMenuRef = useRef(null);
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        avatarMenuRef.current &&
        !avatarMenuRef.current.contains(event.target)
      ) {
        setAvatarMenuOpen(false);
      }
    };

    if (avatarMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [avatarMenuOpen]);

  const handleLogin = () => {
    setSidebarOpen(false);
    navigate("/login");
  };

  const handleLogout = () => {
    signOut(auth).catch(console.error);
    setAvatarMenuOpen(false);
    setSidebarOpen(false);
  };

  const menuItems = [
    { label: "Trang chủ", icon: <HomeIcon className="w-5 h-5" />, to: "/" },
    { label: "Thư viện", icon: <BookOpenIcon className="w-5 h-5" />, to: "/library" },
    { label: "Thông báo", icon: <BellIcon className="w-5 h-5" />, to: "/notifications" },
  ];

  const SearchInput = ({ className = "" }) => (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Tìm kiếm từ vựng, bài học..."
        className="w-full px-4 py-2 pr-10 border rounded-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
          />
        </svg>
      </div>
    </div>
  );

  return (
    <>
      {/* HEADER */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-4 flex-1">
            <button onClick={() => setSidebarOpen(true)} className="sm:hidden">
              <MenuIcon className="w-6 h-6 text-indigo-600" />
            </button>

            <Link to="/" className="flex items-center gap-2">
              <div className="text-2xl font-bold text-indigo-600">J</div>
              <span className="hidden sm:inline text-indigo-700 font-semibold text-sm">
                JP Game
              </span>
            </Link>

            <nav className="hidden sm:flex items-center gap-6 ml-6">
              {menuItems.map(({ label, icon, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
                >
                  {icon}
                  <span>{label}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden sm:block flex-1 max-w-sm mx-6">
            <SearchInput />
          </div>

          <div className="flex items-center gap-4 relative">
            {user && (
              <Link
                to="/tao-tu-vung-tieng-nhat"
                className="hidden sm:flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-800 transition"
              >
                <PlusCircleIcon className="w-5 h-5" />
                Tạo học phần
              </Link>
            )}

            {user ? (
              <div className="relative" ref={avatarMenuRef}>
                <img
                  src={user.photoURL || ""}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover border cursor-pointer"
                  onClick={() => setAvatarMenuOpen((prev) => !prev)}
                />
                {avatarMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white border rounded shadow-md z-50">
                    <div
                      className="px-4 py-2 text-sm text-gray-700 border-b truncate"
                      title={user.email}
                    >
                      {user.email}
                    </div>
                    <button
                      onClick={() => {
                        navigate("/change-password");
                        setAvatarMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                    >
                      <KeyIcon className="w-4 h-4" />
                      Đổi mật khẩu
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOutIcon className="w-4 h-4" />
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="text-sm font-medium text-indigo-600 hover:underline"
              >
                Đăng nhập
              </button>
            )}
          </div>
        </div>
      </header>

      {/* SIDEBAR MOBILE */}
      {sidebarOpen && (
        <div className="sm:hidden">
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

            <div className="px-4 py-3 border-b">
              <SearchInput />
            </div>

            <div className="flex flex-col px-4 py-2 gap-1">
              {menuItems.map(({ label, icon, to }) => (
                <Link
                  key={label}
                  to={to}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-indigo-50 text-gray-700 font-medium"
                >
                  {icon}
                  <span className="text-sm">{label}</span>
                </Link>
              ))}

              <hr className="my-2" />

              {user && (
                <>
                  <Link
                    to="/tao-tu-vung-tieng-nhat"
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
        </div>
      )}
    </>
  );
};

export default Header;
