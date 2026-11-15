import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import logo from '../assets/Logo-white-selecto.png';

const linkClass = "text-sm text-gray-400 hover:text-white transition-colors duration-300";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto max-w-5xl px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          <div>
            <img src={logo} alt="Selecto Paints Logo" className="h-12 md:h-14 w-auto mb-3" />
            <p className="text-sm text-gray-400 mb-4 max-w-xs">
              Premium quality paints for all your needs. Transforming spaces since 1985.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://www.facebook.com/selectopaintsofficial"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Facebook size={18} />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" aria-label="YouTube" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide uppercase text-gray-200 mb-3">Products</h3>
            <ul className="space-y-1.5">
              <li><a href="#premium" className={linkClass}>Premium Series</a></li>
              <li><a href="#gold" className={linkClass}>Gold Series</a></li>
              <li><a href="#" className={linkClass}>Exterior Paints</a></li>
              <li><a href="#" className={linkClass}>Interior Paints</a></li>
              <li><a href="#" className={linkClass}>Primers & Sealers</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide uppercase text-gray-200 mb-3">Resources</h3>
            <ul className="space-y-1.5">
              <li><a href="#" className={linkClass}>Color Catalogue</a></li>
              <li><a href="#" className={linkClass}>Painting Tips</a></li>
              <li><a href="#" className={linkClass}>Product Guides</a></li>
              <li><a href="#" className={linkClass}>FAQs</a></li>
              <li><a href="#" className={linkClass}>Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide uppercase text-gray-200 mb-3">Contact</h3>
            <ul className="space-y-1.5 text-sm text-gray-400">
              <li>P#38 Factory Area, Silanwali Road</li>
              <li>Sargodha, SGD 40100</li>
              <li>info@selectopaints.com</li>
              <li>048 2150098</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-800 text-center text-xs text-gray-500">
          <p>Produced by MK Innovations &copy; {currentYear} Selecto Paints. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;