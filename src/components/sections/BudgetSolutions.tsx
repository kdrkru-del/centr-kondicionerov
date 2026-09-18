'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { ProductCard } from '@/components/catalog/ProductCard';
import { Check, Sparkles, Layers } from 'lucide-react';

interface BudgetSolutionsProps {
  products: Product[];
  onOrderInstall: (product: Product) => void;
  onCheckFit: (product: Product) => void;
}

export const BudgetSolutions: React.FC<BudgetSolutionsProps> = ({
  products,
  onOrderInstall,
  onCheckFit
}) => {
  const [activeTier, setActiveTier] = useState<'under-35' | '35-50' | 'over-50'>('under-35');

  const tiers = [
    {
      id: 'under-35' as const,
      name: 'До 35 000 ₽',
      badge: 'Доступные решения',
      tagline: 'Надёжные сплит-системы для спален и типовых комнат',
      priceRange: 'от 18 000 ₽ (от 32 900 ₽ под ключ)',
      description: 'Доступные модели проверенных брендов. Простое управление, надежная работа на охлаждение и обогрев.',
      features: [
        'Настенный внутренний блок',
        'Быстрое охлаждение и обогрев',
        'Гарантия до 4 лет',
        'Установка за 2–4 часа'
      ]
    },
    {
      id: '35-50' as const,
      name: '35 000 – 50 000 ₽',
      badge: 'Оптимальный баланс',
      tagline: 'Сбалансированные инверторные и классические модели',
      priceRange: '35 000 – 48 000 ₽',
      description: 'Популярные сплит-системы для гостиных, квартир и офисов. Плавная регулировка и комфортный микроклимат.',
      features: [
        'Инверторные технологии Inverter',
        'Энергосбережение и комфорт',
        'Гарантия до 4 лет',
        'Чистый монтаж без пыли'
      ]
    },
    {
      id: 'over-50' as const,
      name: 'От 50 000 ₽',
      badge: 'Расширенная мощность',
      tagline: 'Модели для просторных помещений и требовательных задач',
      priceRange: 'от 58 000 ₽',
      description: 'Системы для увеличенных площадей, с расширенными функциями фильтрации и обогрева.',
      features: [
        'Инверторный компрессор Inverter',
        'Площадь серии до 70 кв.м',
        'Гарантия до 4 лет',
        'Профессиональный монтаж'
      ]
    }
  ];

  const currentProducts = products.filter((p) => {
    const price = p.priceWithInstallation ?? p.price;
    if (!price) return false;
    if (activeTier === 'under-35') return price <= 35000;
    if (activeTier === '35-50') return price > 35000 && price <= 50000;
    if (activeTier === 'over-50') return price > 50000;
    return true;
  }).slice(0, 3);

  return (
    <section className="py-16 sm:py-20 bg-slate-50/70 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Варианты по бюджету</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Подберём решение под ваш бюджет
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            Прозрачное разделение по стоимости с гарантией до 4 лет и профессиональной установкой.
          </p>
        </div>

        {/* Tier switcher cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {tiers.map((tier) => {
            const isSelected = activeTier === tier.id;
            return (
              <div
                key={tier.id}
                onClick={() => setActiveTier(tier.id)}
                className={`cursor-pointer rounded-3xl p-7 transition-all duration-300 border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-blue-500 shadow-xl shadow-blue-500/10 ring-2 ring-blue-500'
                    : 'bg-white/80 border-slate-200/80 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider bg-slate-100 text-slate-700">
                      {tier.badge}
                    </span>
                    <span className="text-xs font-semibold text-blue-600">
                      {tier.priceRange}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 mb-1">
                    {tier.name}
                  </h3>
                  <div className="text-sm font-semibold text-blue-900 mb-3">
                    {tier.tagline}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-5">
                    {tier.description}
                  </p>

                  <ul className="space-y-2 mb-6 border-t border-slate-100 pt-4">
                    {tier.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {isSelected ? 'Выбрана категория' : 'Показать модели'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Selected Tier Models Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm font-bold text-slate-800">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>
              Модели категории «{tiers.find((t) => t.id === activeTier)?.name}»:
            </span>
          </div>
          <Link href="/catalog" className="text-xs font-semibold text-blue-600 hover:underline">
            Все модели в каталоге →
          </Link>
        </div>

        {/* Selected Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
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
