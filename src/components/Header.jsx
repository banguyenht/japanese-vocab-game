// components/Header.jsx
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";
import { Link } from "react-router-dom";

const lessonGroups = {
  N5: Array.from({ length: 25 }, (_, i) => i + 1),
  N4: Array.from({ length: 25 }, (_, i) => i + 26),
};

const Header = () => {
  const renderDropdown = (label, lessons) => (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex justify-center w-full rounded-md bg-white px-4 py-2 text-sm font-medium text-indigo-700 shadow hover:bg-indigo-100">
        {label}
        <ChevronDownIcon className="ml-2 h-4 w-4" />
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
        <Menu.Items className="absolute z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-80 overflow-y-auto">
          <div className="p-1">
            {lessons.map((lessonId) => (
              <Menu.Item key={lessonId}>
                {({ active }) => (
                  <Link
                    to={`/lesson/${lessonId}`}
                    className={`block px-4 py-2 text-sm rounded ${
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

  return (
    <div className="bg-white shadow px-6 py-4 flex gap-4 justify-start">
      {renderDropdown("N5", lessonGroups.N5)}
      {renderDropdown("N4", lessonGroups.N4)}
      <button className="text-gray-400 cursor-not-allowed" disabled>
        N3
      </button>
      <button className="text-gray-400 cursor-not-allowed" disabled>
        N2
      </button>
      <button className="text-gray-400 cursor-not-allowed" disabled>
        N1
      </button>
    </div>
  );
};

export default Header;
