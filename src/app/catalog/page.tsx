import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { CatalogClient } from './CatalogClient';

export const metadata: Metadata = {
  title: 'Кондиционеры с установкой во Владивостоке — каталог сплит-систем | Центр Кондиционеров',
  description:
    'Каталог кондиционеров с установкой во Владивостоке, Артёме и Уссурийске. Подбор сплит-систем MDV, Amston, Dahatsu, Hunberg по площади, бюджету и типу компрессора. Гарантия до 4 лет, чистый монтаж.',
  alternates: {
    canonical: '/catalog'
  },
  openGraph: {
    title: 'Каталог кондиционеров с установкой во Владивостоке | Центр Кондиционеров',
    description:
      'Подберите сплит-систему с профессиональным монтажом. Честные цены, проверенные бренды MDV, Amston, Dahatsu, Hunberg.',
    url: 'https://xn----dtbfccranzcdhectkw3ek.xn--p1ai/catalog',
    type: 'website'
  }
};

function CatalogLoading() {
  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1F33] tracking-tight leading-[1.1] mb-4">
          Кондиционеры с установкой во Владивостоке
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mb-8">
          Подберите кондиционер по площади, типу компрессора и бюджету.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="bg-slate-50 rounded-3xl p-6 border border-slate-100 h-96 animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<CatalogLoading />}>
      <CatalogClient />
    </Suspense>
  );
}
