'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { ProductCard } from '@/components/catalog/ProductCard';
import { Maximize2, Sparkles, ArrowRight } from 'lucide-react';
import { AREA_OPTIONS, filterProductsByArea } from '@/utils/areaFilter';

interface AreaSelectorProps {
  products: Product[];
  onOrderInstall: (product: Product) => void;
  onCheckFit: (product: Product) => void;
}

export const AreaSelector: React.FC<AreaSelectorProps> = ({
  products,
  onOrderInstall,
  onCheckFit,
}) => {
  const [selectedKey, setSelectedKey] = useState<string>(AREA_OPTIONS[0].key);

  const activeOption = useMemo(() => {
    return AREA_OPTIONS.find((opt) => opt.key === selectedKey) || AREA_OPTIONS[0];
  }, [selectedKey]);

  const matchedProducts = useMemo(() => {
    const list = filterProductsByArea(products, selectedKey);
    return list.slice(0, 3);
  }, [products, selectedKey]);

  return (
    <section id="area-selection" className="py-16 sm:py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Выберите площадь помещения
          </h2>
          <p className="text-base text-slate-500 mt-2">
            Показываем проверенные модели с подтверждёнными характеристиками и точным расчётом стоимости.
          </p>
        </div>

        {/* 6 area buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 mb-8">
          {AREA_OPTIONS.map((opt) => {
            const isSelected = opt.key === selectedKey;
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => setSelectedKey(opt.key)}
                className={`py-3.5 px-3 rounded-2xl text-center transition-all duration-200 min-h-[48px] flex flex-col items-center justify-center border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 scale-[1.02]'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50/30'
                }`}
              >
                <span className="text-sm sm:text-base font-bold">
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Area Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 mb-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <div className="flex items-center space-x-2 text-slate-700">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              Подходящие модели на площадь <b>{activeOption.label}</b>
            </span>
          </div>
          <Link
            href={`/catalog?area=${selectedKey}`}
            className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center space-x-1 shrink-0"
          >
            <span>Смотреть все для {activeOption.label} в каталоге</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Products Grid */}
        {matchedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onOrderInstall={onOrderInstall}
                onCheckFit={onCheckFit}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-600 mb-4">
              В данной категории представлены серии с вариативной мощностью или заказные модели.
            </p>
            <Link
              href={`/catalog?area=${selectedKey}`}
              className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition"
            >
              Перейти в каталог
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
