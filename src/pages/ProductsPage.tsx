import React from 'react';
import ProductsSection from '../components/ProductsSection';
import { getGoldProducts, getPremiumProducts, getWoodProducts } from '../data/products';

const ProductsPage: React.FC = () => {
  const premiumProducts = getPremiumProducts();
  const woodProducts = getWoodProducts();
  const goldProducts = getGoldProducts();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-sky-100 via-white to-blue-50 pt-28">
      <div className="pointer-events-none absolute -left-16 top-16 h-72 w-72 rounded-full bg-blue-300/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 top-80 h-64 w-64 rounded-full bg-amber-200/60 blur-3xl" />
      <div className="pointer-events-none absolute bottom-24 left-1/3 h-56 w-56 rounded-full bg-teal-200/50 blur-3xl" />

      <ProductsSection
        id="premium"
        title="Selecto Premium Series"
        subtitle="Prices in PKR."
        products={premiumProducts}
        accentColor="border-blue-600"
      />

      <ProductsSection
        id="wood"
        title="Selecto Premium Wood Cover Series"
        subtitle="Prices in PKR for thinner, lacquer, and sealer."
        products={woodProducts}
        accentColor="border-amber-700"
      />

      <ProductsSection
        id="gold"
        title="Selecto Gold Series"
        subtitle="Prices in PKR."
        products={goldProducts}
        accentColor="border-yellow-600"
      />
    </div>
  );
};

export default ProductsPage;