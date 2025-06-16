import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  LogOutIcon,
  LogInIcon,
  PlusCircleIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import useAuth from "../hooks/useAuth";

const lessonGroups = {
  N5: Array.from({ length: 25 }, (_, i) => i + 1),
  N4: Array.from({ length: 25 }, (_, i) => i + 26),
};

const Header = () => {
  const user = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => navigate("/login");
  const handleLogout = () => signOut(auth).catch(console.error);

  const renderDropdown = (label, lessons) => (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex items-center gap-1 rounded-md bg-white px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-100 transition shadow-sm">
        {label}
        <ChevronDownIcon className="h-4 w-4" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-10 mt-2 w-44 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 max-h-80 overflow-y-auto">
          <div className="p-1">
            {lessons.map((lessonId) => (
              <Menu.Item key={lessonId}>
                {({ active }) => (
                  <Link
                    to={`/lesson/${lessonId}`}
                    className={`block px-4 py-2 text-sm rounded-md ${
                      active ? "bg-indigo-100 text-indigo-800" : "text-gray-800"
                    }`}
                  >
                    Bài {lessonId}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );

  const renderAvatar = () => {
    if (user?.photoURL) {
      return (
        <img
          src={user.photoURL}
          alt="avatar"
          className="w-8 h-8 rounded-full border object-cover"
        />
      );
    }

    const fallback = user?.email?.charAt(0).toUpperCase() || "?";

    return (
      <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm font-semibold">
        {fallback}
      </div>
    );
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo & dropdowns */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-xl font-bold text-indigo-600 hover:text-indigo-800 transition"
          >
            📖 Từ Vựng N5-N4
          </Link>

          <div className="flex gap-2">
            {renderDropdown("N5", lessonGroups.N5)}
            {renderDropdown("N4", lessonGroups.N4)}
            <button className="text-gray-400 cursor-not-allowed text-sm" disabled>
              N3
            </button>
            <button className="text-gray-400 cursor-not-allowed text-sm" disabled>
              N2
            </button>
            <button className="text-gray-400 cursor-not-allowed text-sm" disabled>
              N1
            </button>
          </div>
        </div>

        {/* Auth controls */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                to="/create"
                className="flex items-center gap-1 text-sm text-green-600 hover:text-green-800 transition"
              >
                <PlusCircleIcon className="w-4 h-4" />
                Tạo học phần
              </Link>

              <span className="hidden sm:inline text-sm text-gray-600">
                {user.displayName || user.email}
              </span>

              {renderAvatar()}

              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800 transition"
              >
                <LogOutIcon className="w-4 h-4" />
                Đăng xuất
              </button>
            </>
          ) : (
            <button
              onClick={handleLogin}
              className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 transition"
            >
              <LogInIcon className="w-4 h-4" />
              Đăng nhập
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
