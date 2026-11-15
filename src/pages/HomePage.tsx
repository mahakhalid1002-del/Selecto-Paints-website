import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import HomeSlider from '../components/HomeSlider';
import ContactSection from "../components/ContactSection";
import { Shield, DollarSign, Timer, Leaf, Home, Brush, Wrench } from 'lucide-react';

const WhyChooseUs = () => {
  return (
    <section className="py-12 md:py-14 bg-gray-50">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center tracking-tight mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4">
            <Shield className="w-10 h-10 mx-auto text-blue-600 mb-3" />
            <h3 className="text-lg font-semibold mb-1">High Quality</h3>
            <p className="text-sm text-gray-600">Premium materials and superior formulations for exceptional results</p>
          </div>
          <div className="text-center p-4">
            <DollarSign className="w-10 h-10 mx-auto text-blue-600 mb-3" />
            <h3 className="text-lg font-semibold mb-1">Competitive Prices</h3>
            <p className="text-sm text-gray-600">Best value for your investment without compromising quality</p>
          </div>
          <div className="text-center p-4">
            <Timer className="w-10 h-10 mx-auto text-blue-600 mb-3" />
            <h3 className="text-lg font-semibold mb-1">Durability</h3>
            <p className="text-sm text-gray-600">Long-lasting protection and color retention</p>
          </div>
          <div className="text-center p-4">
            <Leaf className="w-10 h-10 mx-auto text-blue-600 mb-3" />
            <h3 className="text-lg font-semibold mb-1">Eco-friendly</h3>
            <p className="text-sm text-gray-600">Environmentally conscious formulations</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProductCategories = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-12 md:py-14">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center tracking-tight mb-8">Our Product Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            onClick={() => navigate('/products')}
            className="cursor-pointer group bg-white rounded-xl shadow-md overflow-hidden hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="p-6 text-center">
              <Home className="w-12 h-12 mx-auto text-blue-600 mb-3" />
              <h3 className="text-lg font-semibold mb-1">Interior Paints</h3>
              <p className="text-sm text-gray-600">Transform your indoor spaces</p>
            </div>
          </div>
          <div 
            onClick={() => navigate('/products')}
            className="cursor-pointer group bg-white rounded-xl shadow-md overflow-hidden hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="p-6 text-center">
              <Brush className="w-12 h-12 mx-auto text-blue-600 mb-3" />
              <h3 className="text-lg font-semibold mb-1">Exterior Paints</h3>
              <p className="text-sm text-gray-600">Protect and beautify your exterior</p>
            </div>
          </div>
          <div 
            onClick={() => navigate('/products')}
            className="cursor-pointer group bg-white rounded-xl shadow-md overflow-hidden hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="p-6 text-center">
              <Wrench className="w-12 h-12 mx-auto text-blue-600 mb-3" />
              <h3 className="text-lg font-semibold mb-1">Wood & Metal</h3>
              <p className="text-sm text-gray-600">Specialized coatings for durability</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HomePage = () => {
  return (
    <div>
      <Hero />
      <HomeSlider />
      <WhyChooseUs />
      <ProductCategories />
      <ContactSection />
    </div>
  );
};

export default HomePage;
