'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCompare } from '@/context/CompareContext';
import { useModal } from '@/components/providers/ModalProvider';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import {
  ChevronRight,
  Scale,
  Trash2,
  X,
  Wrench,
  ArrowLeft,
  Plus
} from 'lucide-react';

export const CompareClient: React.FC = () => {
  const { compareSlugs, removeFromCompare, clearCompare } = useCompare();
  const { openModal } = useModal();

  const products: Product[] = compareSlugs
    .map((slug) => PRODUCTS.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));

  const formatPrice = (val: number | null) =>
    val !== null ? `${new Intl.NumberFormat('ru-RU').format(val)} ₽` : '—';

  const handleOrder = (product: Product) => {
    openModal(
      product.name,
      `Страница сравнения — Заказ ${product.name}`,
      {
        id: product.id,
        brand: product.brand,
        model: product.model,
        name: product.name,
        price: product.price,
        priceFrom: product.priceFrom,
        priceWithInstallation: product.priceWithInstallation,
        image: product.image
      }
    );
  };

  if (products.length === 0) {
    return (
      <div className="py-16 sm:py-24 bg-white min-h-[70vh]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-6">
            <Scale className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0B1F33] mb-3">
            Список сравнения пуст
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto mb-8">
            Выберите до 3 моделей кондиционеров в каталоге, нажав иконку или кнопку «Сравнить», чтобы сопоставить их характеристики.
          </p>
          <Link
            href="/catalog"
            className="inline-flex items-center space-x-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-sm transition shadow-lg shadow-blue-500/20"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Перейти в каталог</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-xs text-slate-400 mb-6">
          <Link href="/" className="hover:text-blue-600 transition">
            Главная
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <Link href="/catalog" className="hover:text-blue-600 transition">
            Каталог
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-[#0B1F33] font-bold">Сравнение моделей</span>
        </nav>

        {/* Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-8">
          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-[#0B1F33] tracking-tight">
              Сравнение кондиционеров
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Сравнение характеристик выбранных моделей (выбрано: {products.length} из 3)
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {products.length < 3 && (
              <Link
                href="/catalog"
                className="px-3.5 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold text-xs transition flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Добавить ещё</span>
              </Link>
            )}
            <button
              type="button"
              onClick={clearCompare}
              className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-500 hover:text-red-500 hover:border-red-200 font-bold text-xs transition flex items-center space-x-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Очистить всё</span>
            </button>
          </div>
        </div>

        {/* Comparison Table / Grid */}
        <div className="overflow-x-auto pb-6">
          <div className="min-w-[640px]">
            {/* Header row: Product images and names */}
            <div className="grid grid-cols-4 gap-4 pb-6 border-b border-slate-200">
              <div className="p-4 flex flex-col justify-end">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Параметры
                </span>
              </div>

              {products.map((p) => (
                <div
                  key={p.id}
                  className="relative p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between group"
                >
                  <button
                    type="button"
                    onClick={() => removeFromCompare(p.slug)}
                    className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-white/90 hover:bg-red-50 hover:text-red-600 text-slate-400 border border-slate-200/80 flex items-center justify-center transition shadow-2xs"
                    title={`Удалить ${p.name}`}
                    aria-label={`Удалить ${p.name}`}
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="relative h-32 w-full mb-3 flex items-center justify-center">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  <div>
                    <span className="text-[11px] font-black uppercase text-blue-600">
                      {p.brand}
                    </span>
                    <Link
                      href={`/catalog/${p.slug}`}
                      className="block text-sm font-black text-[#0B1F33] hover:text-blue-600 transition leading-snug line-clamp-2 mt-0.5"
                    >
                      {p.shortName || p.name}
                    </Link>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOrder(p)}
                    className="mt-4 w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition flex items-center justify-center space-x-1 shadow-sm"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Заказать</span>
                  </button>
                </div>
              ))}

              {/* Placeholder slots if less than 3 */}
              {Array.from({ length: 3 - products.length }).map((_, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center text-slate-400"
                >
                  <Plus className="w-8 h-8 mb-2 text-slate-300" />
                  <span className="text-xs font-semibold">Слот для модели</span>
                  <Link
                    href="/catalog"
                    className="mt-3 text-xs text-blue-600 font-bold hover:underline"
                  >
                    Выбрать в каталоге
                  </Link>
                </div>
              ))}
            </div>

            {/* Spec rows */}
            <div className="divide-y divide-slate-100 text-sm">
              {/* Row: Бренд */}
              <div className="grid grid-cols-4 gap-4 py-3.5 items-center">
                <div className="text-xs font-semibold text-slate-500">Бренд</div>
                {products.map((p) => (
                  <div key={p.id} className="font-bold text-[#0B1F33]">
                    {p.brand}
                  </div>
                ))}
                {Array.from({ length: 3 - products.length }).map((_, i) => (
                  <div key={i} className="text-slate-300">—</div>
                ))}
              </div>

              {/* Row: Модель */}
              <div className="grid grid-cols-4 gap-4 py-3.5 items-center bg-slate-50/50">
                <div className="text-xs font-semibold text-slate-500">Модель / Серия</div>
                {products.map((p) => (
                  <div key={p.id} className="text-slate-700 font-medium">
                    {p.model ? `${p.series} (${p.model})` : p.series}
                  </div>
                ))}
                {Array.from({ length: 3 - products.length }).map((_, i) => (
                  <div key={i} className="text-slate-300">—</div>
                ))}
              </div>

              {/* Row: Тип компрессора */}
              <div className="grid grid-cols-4 gap-4 py-3.5 items-center">
                <div className="text-xs font-semibold text-slate-500">Тип компрессора</div>
                {products.map((p) => (
                  <div key={p.id}>
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-lg text-xs font-bold ${
                        p.compressorType === 'Inverter'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {p.compressorType === 'Inverter' ? 'Инвертор (Inverter)' : 'Классический (On-Off)'}
                    </span>
                  </div>
                ))}
                {Array.from({ length: 3 - products.length }).map((_, i) => (
                  <div key={i} className="text-slate-300">—</div>
                ))}
              </div>

              {/* Row: Площадь */}
              <div className="grid grid-cols-4 gap-4 py-3.5 items-center bg-slate-50/50">
                <div className="text-xs font-semibold text-slate-500">Площадь помещения</div>
                {products.map((p) => (
                  <div key={p.id} className="font-semibold text-slate-800">
                    {p.area ? `${p.area} м²` : p.seriesAreaRange ? p.seriesAreaRange : '—'}
                  </div>
                ))}
                {Array.from({ length: 3 - products.length }).map((_, i) => (
                  <div key={i} className="text-slate-300">—</div>
                ))}
              </div>

              {/* Row: Цена оборудования */}
              <div className="grid grid-cols-4 gap-4 py-3.5 items-center">
                <div className="text-xs font-semibold text-slate-500">Цена оборудования</div>
                {products.map((p) => (
                  <div key={p.id} className="font-black text-[#0B1F33] text-base">
                    {p.price ? (p.priceFrom ? `от ${formatPrice(p.price)}` : formatPrice(p.price)) : '—'}
                  </div>
                ))}
                {Array.from({ length: 3 - products.length }).map((_, i) => (
                  <div key={i} className="text-slate-300">—</div>
                ))}
              </div>

              {/* Row: Цена с установкой */}
              <div className="grid grid-cols-4 gap-4 py-3.5 items-center bg-blue-50/30">
                <div className="text-xs font-bold text-blue-900">Цена с установкой</div>
                {products.map((p) => (
                  <div key={p.id}>
                    {p.priceWithInstallation ? (
                      <span className="font-black text-blue-600 text-base">
                        {formatPrice(p.priceWithInstallation)}
                      </span>
                    ) : (
                      <span className="text-slate-400 text-xs">по запросу</span>
                    )}
                  </div>
                ))}
                {Array.from({ length: 3 - products.length }).map((_, i) => (
                  <div key={i} className="text-slate-300">—</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
          <Link
            href="/catalog"
            className="inline-flex items-center space-x-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Вернуться в каталог</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
