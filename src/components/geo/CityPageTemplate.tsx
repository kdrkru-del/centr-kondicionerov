'use client';

import React from 'react';
import Link from 'next/link';
import { CityData, Product } from '@/types';
import { ProductCard } from '@/components/catalog/ProductCard';
import { useModal } from '@/components/providers/ModalProvider';
import {
  MapPin,
  Phone,
  Clock,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface Props {
  city: CityData;
  products: Product[];
}

export const CityPageTemplate: React.FC<Props> = ({ city, products }) => {
  const { openModal } = useModal();

  const handleOrderInstall = (product: Product) => {
    openModal(
      `${product.name} с монтажом в г. ${city.name}`,
      `Городская страница: ${city.name}`
    );
  };

  const handleCheckFit = (product: Product) => {
    openModal(`Совместимость ${product.name} в г. ${city.name}`, `Город: ${city.name}`);
  };

  return (
    <div className="py-8 sm:py-12 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-blue-600 transition">
            Главная
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">{city.name}</span>
        </nav>

        {/* City Hero Banner */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>Установка кондиционеров в {city.namePrepositional}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Кондиционеры с установкой в {city.namePrepositional} «под ключ»
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {city.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {city.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs sm:text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() =>
                    openModal(undefined, `Главная кнопка страницы ${city.name}`)
                  }
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Подобрать сплит-систему в {city.namePrepositional}</span>
                </button>
                <a
                  href={`tel:${city.phone.replace(/[^0-9+]/g, '')}`}
                  className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-sm transition flex items-center justify-center space-x-2"
                >
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>{city.phone}</span>
                </a>
              </div>
            </div>

            {/* City Info Card */}
            <div className="lg:col-span-4 bg-slate-900 text-white rounded-3xl p-7 space-y-4">
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
                Монтажная служба в {city.namePrepositional}
              </h3>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start space-x-2.5">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>
                    <b>Обслуживание:</b> {city.address ? city.address : `выезд по г. ${city.name} и пригороду`}
                  </span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span><b>Режим:</b> {city.workHours}</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <Truck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span><b>Доставка:</b> {city.deliveryTerms}</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><b>Гарантия:</b> гарантия до 4 лет.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Models in City */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Популярные модели с монтажом в {city.namePrepositional}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Кондиционеры с возможностью профессиональной установки
              </p>
            </div>
            <Link href="/catalog" className="text-xs font-bold text-blue-600 hover:underline">
              Смотреть весь каталог →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 6).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOrderInstall={handleOrderInstall}
                onCheckFit={handleCheckFit}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
