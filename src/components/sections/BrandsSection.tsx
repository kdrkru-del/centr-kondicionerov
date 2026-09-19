import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BRANDS } from '@/data/brands';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { getAssetUrl } from '@/utils/asset';

export const BrandsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Работаем с проверенными брендами
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            Климатическая техника с гарантией производителя до 4 лет.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BRANDS.map((brand) => (
            <Link
              key={brand.id}
              href={`/catalog/${brand.slug}`}
              className="bg-slate-50/70 hover:bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-blue-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group card-hover-elevation"
            >
              <div>
                <div className="relative h-14 w-full mb-6 flex items-center justify-center p-2 rounded-2xl bg-white border border-slate-100">
                  <Image
                    src={getAssetUrl(brand.logo)}
                    alt={brand.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>

                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition">
                    {brand.name}
                  </h3>
                  <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    Гарантия до 4 лет
                  </span>
                </div>

                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">
                  {brand.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
                <span>Смотреть модели {brand.name}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
