import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const scrollToProducts = () => {
    const element = document.getElementById('premium');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[72vh] flex items-center justify-center bg-gradient-to-r from-blue-50 to-gray-50 pt-24 pb-16"
    >
      <div 
        className="absolute inset-0 z-0 opacity-30 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/6444255/pexels-photo-6444255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
        }}
      ></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 leading-tight tracking-tight">
            Transform Your Space With <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
              Premium Quality Paints
            </span>
          </h1>
          
          <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
            Elevate your surroundings with Selecto Paints — where color meets quality, 
            durability meets design, and your vision becomes reality.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              type="button"
              onClick={() => navigate('/products')}
              className="px-6 py-2.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Explore Products
            </button>

            <button
              type="button"
              onClick={() => navigate('/story')}
              className="px-6 py-2.5 border-2 border-blue-600 text-blue-600 text-sm rounded-md hover:bg-blue-50 transition-colors duration-300"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button onClick={scrollToProducts} className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  );
};

export default Hero;