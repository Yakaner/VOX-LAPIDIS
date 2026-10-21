import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProjectsPage from './pages/ProjectsPage';
import FinishingPage from './pages/FinishingPage';
import ContactPage from './pages/ContactPage';
import { CATEGORIES } from './data/categories';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {Object.entries(CATEGORIES).map(([key, category]) => (
            <Route key={key} path={`/${key}`} element={<CategoryPage key={key} category={category} />} />
          ))}
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/finishing" element={<FinishingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
