import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import PalettesPage from './pages/PalettesPage';
import InspirationPage from './pages/InspirationPage';
import ContactSection from "./components/ContactSection";
import CalculatePaintSeparate from "./pages/CalculatePaintSeparate";
import StoryPage from "./pages/StoryPage";
import ScrollToTop from './components/ScrollToTop';
import ScrollPaint from './components/ScrollPaint';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <ScrollToTop /> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/palettes" element={<PalettesPage />} />
          <Route path="/inspiration" element={<InspirationPage />} />
          <Route path="/contact" element={<ContactSection />} />
          <Route path="/calculator" element={<CalculatePaintSeparate />} />
          <Route path="/story" element={<StoryPage />} />
        </Routes>
        <ScrollPaint />
        <Footer />
      </div>
    </Router>
  );
}

export default App;