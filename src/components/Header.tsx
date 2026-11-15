import React, { useState, useEffect } from 'react';
import { Menu, X, Droplets } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/Logo-black-selecto.png';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-1' : 'bg-transparent py-2'}`}
    >
      
      {isMenuOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="md:hidden fixed inset-0 z-40 bg-black/30"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <div className="relative z-50 container mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          {/*<Droplets className="h-8 w-8 text-blue-600" />*/}
          <img src={logo} alt="Selecto Paints Logo" className="h-[60px] md:h-[90px] lg:h-[100px] w-auto" />
          
        </Link>

        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-800 hover:text-blue-600 transition-colors duration-200">
            Home
          </Link>
          <Link to="/products" className="text-gray-800 hover:text-blue-600 transition-colors duration-200">
            Products
          </Link>
          <Link to="/about" className="text-gray-800 hover:text-blue-600 transition-colors duration-200">
            About Us
          </Link>
          <Link to="/palettes" className="text-gray-800 hover:text-blue-600 transition-colors duration-200">
            Paint Palettes
          </Link>
          <Link to="/calculator" className="text-gray-800 hover:text-blue-600 transition-colors duration-200">
            Paint Calculator
          </Link>
          <Link to="/inspiration" className="text-gray-800 hover:text-blue-600 transition-colors duration-200">
            Inspiration
          </Link>
        </nav>

        <button className="md:hidden text-gray-800 focus:outline-none" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 z-50 w-full">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link to="/" className="text-gray-800 hover:text-blue-600 transition-colors duration-200 py-2" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/products" className="text-gray-800 hover:text-blue-600 transition-colors duration-200 py-2" onClick={() => setIsMenuOpen(false)}>
              Products
            </Link>
            <Link to="/about" className="text-gray-800 hover:text-blue-600 transition-colors duration-200 py-2" onClick={() => setIsMenuOpen(false)}>
              About Us
            </Link>
            <Link to="/palettes" className="text-gray-800 hover:text-blue-600 transition-colors duration-200 py-2" onClick={() => setIsMenuOpen(false)}>
              Paint Palettes
            </Link>
            <Link to="/calculator" className="text-gray-800 hover:text-blue-600 transition-colors duration-200 py-2" onClick={() => setIsMenuOpen(false)}>
              Paint Calculator
            </Link>
            <Link to="/inspiration" className="text-gray-800 hover:text-blue-600 transition-colors duration-200 py-2" onClick={() => setIsMenuOpen(false)}>
              Inspiration
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;