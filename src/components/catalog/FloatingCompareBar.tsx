'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCompare } from '@/context/CompareContext';
import { PRODUCTS } from '@/data/products';
import { Scale, X, ArrowRight, Trash2 } from 'lucide-react';
import { getAssetUrl } from '@/utils/asset';

export const FloatingCompareBar: React.FC = () => {
  const {
    compareSlugs,
    compareCount,
    removeFromCompare,
    clearCompare,
    isBarVisible,
    setIsBarVisible
  } = useCompare();

  if (compareCount === 0 || !isBarVisible) {
    return null;
  }

  const selectedProducts = compareSlugs
    .map((slug) => PRODUCTS.find((p) => p.slug === slug))
    .filter(Boolean);

  const formatPrice = (val: number) => new Intl.NumberFormat('ru-RU').format(val);

  return (
    <aside
      aria-label="Панель сравнения кондиционеров"
      className="fixed z-40 left-3 right-3 sm:left-auto sm:right-6 bottom-20 sm:bottom-6 max-w-lg w-auto bg-slate-900/95 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-slate-700/80 p-3 sm:p-4 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
    >
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center">
            <Scale className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-xs sm:text-sm font-bold">
            Сравнение моделей ({compareCount} из 3)
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={clearCompare}
            className="text-[11px] text-slate-400 hover:text-red-400 transition flex items-center space-x-1"
            title="Очистить сравнение"
          >
            <Trash2 className="w-3 h-3" />
            <span className="hidden sm:inline">Очистить</span>
          </button>
          <button
            type="button"
            onClick={() => setIsBarVisible(false)}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition"
            title="Свернуть панель"
            aria-label="Свернуть панель"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        {/* Thumbnails */}
        <div className="flex items-center space-x-2 overflow-x-auto py-1">
          {selectedProducts.map((p) => (
            <div
              key={p!.id}
              className="relative group bg-slate-800 rounded-xl p-1.5 border border-slate-700/70 flex items-center space-x-2 shrink-0 pr-6"
            >
              <div className="relative w-8 h-8 shrink-0 bg-white/10 rounded-lg overflow-hidden flex items-center justify-center">
                <Image
                  src={getAssetUrl(p!.image)}
                  alt={p!.name}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div className="text-left max-w-[90px] sm:max-w-[110px]">
                <div className="text-[11px] font-bold truncate leading-tight">
                  {p!.shortName || p!.name}
                </div>
                <div className="text-[10px] text-blue-400 font-semibold">
                  {p!.priceWithInstallation
                    ? `${formatPrice(p!.priceWithInstallation)} ₽`
                    : p!.price
                    ? `${formatPrice(p!.price)} ₽`
                    : 'по запросу'}
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFromCompare(p!.slug)}
                className="absolute right-1 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-red-400 transition rounded-full hover:bg-slate-700"
                title={`Удалить ${p!.name}`}
                aria-label={`Удалить ${p!.name} из сравнения`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* CTA to compare page */}
        <Link
          href="/compare"
          className="py-2 px-3 sm:px-4 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold rounded-xl text-xs sm:text-sm transition flex items-center space-x-1.5 shrink-0 shadow-lg shadow-blue-600/30"
        >
          <span>Сравнить</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </aside>
  );
};
