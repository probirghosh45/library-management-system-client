import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              📚 Library
            </Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <NavLink
              to="/books"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-600 font-medium ${
                  isActive ? "border-b-2 border-blue-600" : ""
                }`
              }
            >
              All Books
            </NavLink>
            <NavLink
              to="/create-book"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-600 font-medium ${
                  isActive ? "border-b-2 border-blue-600" : ""
                }`
              }
            >
              Add Book
            </NavLink>
            <NavLink
              to="/borrow-summary"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-600 font-medium ${
                  isActive ? "border-b-2 border-blue-600" : ""
                }`
              }
            >
              Borrow Summary
            </NavLink>
          </div>
          {/* Mobile menu button */}
          {/* If you want mobile menu, can add later */}
        </div>
      </div>
    </nav>
  );
}
