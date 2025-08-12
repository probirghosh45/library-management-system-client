export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-20">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-600 text-sm select-none">
        &copy; {new Date().getFullYear()} Library Management System. All rights reserved.
      </div>
    </footer>
  );
}
