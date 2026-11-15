import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface ProductsSectionProps {
  id: string;
  title: string;
  subtitle: string;
  products: Product[];
  accentColor: string;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ 
  id, 
  title, 
  subtitle, 
  products, 
  accentColor 
}) => {
  return (
    <section id={id} className="relative px-4 py-12 md:px-8 md:py-14">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h2 className={`mb-3 inline-block border-b-4 pb-2 text-2xl font-bold tracking-tight md:text-3xl ${accentColor}`}>
            {title}
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-gray-600 md:text-base">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;