import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">
        📚 Welcome to Minimal Library
      </h1>
      <p className="text-gray-600 max-w-lg mb-8">
        Manage your library's books, borrow books, and view borrow summaries —
        all from one simple interface.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          to="/books"
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow"
        >
          View All Books
        </Link>
        <Link
          to="/create-book"
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow"
        >
          Add New Book
        </Link>
        <Link
          to="/borrow-summary"
          className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg shadow"
        >
          Borrow Summary
        </Link>
      </div>
    </div>
  );
}
