import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import HomePage from "@/pages/HomePage";
import BooksPage from "@/pages/BooksPage";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage/>} />
          <Route path="books" element={<BooksPage/>} />
        </Route>
      </Routes>
    </Router>
  );
}
