import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const formatPrice = (price: number) => {
  const fractionDigits = Number.isInteger(price) ? 0 : 2;
  return price.toLocaleString('en-PK', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: 2,
  });
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/70 bg-white/70 shadow-lg shadow-blue-900/5 backdrop-blur-xl">
      <div className="relative h-44 bg-gradient-to-b from-sky-50 to-white">
        <img src={product.imageUrl} alt={`${product.name} pack`} className="h-full w-full object-contain p-3" />
      </div>

      <div className="flex flex-1 flex-col px-3 pb-3 pt-2">
        <h3 className="text-sm font-semibold leading-snug text-gray-900">{product.name}</h3>
        <p className="mt-1 text-xs leading-relaxed text-gray-600">{product.description}</p>

        {product.packs && (
          <table className="mt-3 w-full border-collapse text-xs">
            <thead>
              <tr className="border-b border-blue-100 text-left text-[11px] uppercase tracking-wide text-blue-800">
                <th className="py-1 font-semibold">Pack</th>
                <th className="py-1 text-right font-semibold">PKR</th>
              </tr>
            </thead>
            <tbody>
              {product.packs.map((pack) => (
                <tr key={pack.quantity} className="border-b border-blue-50 last:border-0">
                  <td className="py-1.5 pr-2 text-gray-700">{pack.quantity}</td>
                  <td className="py-1.5 text-right font-medium tabular-nums text-gray-900">{formatPrice(pack.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
