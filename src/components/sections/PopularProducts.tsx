import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { ProductCard } from '@/components/catalog/ProductCard';
import { Flame, ArrowRight } from 'lucide-react';

interface PopularProductsProps {
  products: Product[];
  onOrderInstall: (product: Product) => void;
  onCheckFit: (product: Product) => void;
}

export const PopularProducts: React.FC<PopularProductsProps> = ({
  products,
  onOrderInstall,
  onCheckFit,
}) => {
  // Only confirmed hits from DATA_AUDIT: AMSTON Reykjavik ASH-07 and DAHATSU Legend 07
  const popular = products.filter((p) => p.badge !== null);

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Популярные сплит-системы
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-2xl">
              Модели с подтверждённым статусом «Хит продаж». Полная стоимость техники и установки под ключ.
            </p>
          </div>

          <Link
            href="/catalog"
            className="inline-flex items-center space-x-2 text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline shrink-0"
          >
            <span>Смотреть весь каталог</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto gap-8">
          {popular.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOrderInstall={onOrderInstall}
              onCheckFit={onCheckFit}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
