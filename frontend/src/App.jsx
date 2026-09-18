import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ContestPage from "./pages/ContestPage";
import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import SearchResultsPage from "./pages/SearchResultsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/recipes/:id" element={<RecipePage />} />
          <Route path="/contest" element={<ContestPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
