'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { getAssetUrl } from '@/utils/asset';

interface HeroProps {
  onOpenModal: (productName?: string, source?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#F0F5FA] via-[#F6F9FD] to-[#FFFFFF] border-b border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-14 min-h-[560px] sm:min-h-[600px] lg:min-h-[620px] max-h-[820px] flex items-center">
        {/* Responsive Grid: Text 55% / Image 45% on desktop with min-width 0 to prevent overflow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full">
          
          {/* Left Column: Text & CTA (7 cols on lg/xl) */}
          <div className="lg:col-span-7 min-w-0 space-y-4 sm:space-y-5">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[#0062D2] text-xs font-bold uppercase tracking-wider">
              <span>Оборудование и установка во Владивостоке</span>
            </div>

            {/* H1 Headline with clamp typography to avoid awkward wrapping */}
            <h1 className="text-[28px] xs:text-[32px] sm:text-[38px] md:text-[44px] lg:text-[46px] xl:text-[52px] font-black tracking-tight leading-[1.14] text-slate-900">
              Надёжные сплит-системы{' '}
              <span className="text-[#0062D2] inline-block">
                с установкой под ключ
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-700 font-medium leading-relaxed max-w-xl">
              Сплит-системы с установкой во Владивостоке, Артёме и Уссурийске. Проверенные бренды MDV, Amston, Dahatsu и Hunberg. Гарантия до 4 лет.
            </p>

            {/* Action CTA Buttons directly after Subtitle */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => onOpenModal('Подбор кондиционера с установкой', 'Hero Главная')}
                className="px-6 sm:px-8 py-3.5 sm:py-4 bg-[#0062D2] hover:bg-[#004bb5] active:scale-[0.99] text-white font-bold rounded-xl shadow-md shadow-[#0062D2]/25 transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base min-h-[48px] sm:min-h-[52px] cursor-pointer"
              >
                <span>Подобрать кондиционер</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <Link
                href="/catalog"
                className="px-5 sm:px-7 py-3.5 sm:py-4 bg-white hover:bg-slate-50 active:scale-[0.99] text-slate-800 font-bold rounded-xl border border-slate-300 hover:border-slate-400 shadow-2xs transition flex items-center justify-center space-x-2 text-sm sm:text-base min-h-[48px] sm:min-h-[52px]"
              >
                <span>Смотреть каталог</span>
              </Link>
            </div>

            {/* Confirmed Commercial Advantages (3 Cards based strictly on SOURCE_CLAIMS_AUDIT) */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-2 max-w-lg">
              <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <div className="text-xs sm:text-sm font-black text-[#0062D2]">до 4 лет</div>
                <div className="text-[10px] sm:text-xs text-slate-500 font-semibold mt-0.5 leading-tight">
                  Гарантия
                </div>
              </div>
              <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <div className="text-xs sm:text-sm font-black text-slate-900 truncate">В день обращения</div>
                <div className="text-[10px] sm:text-xs text-slate-500 font-semibold mt-0.5 leading-tight">
                  Выезд
                </div>
              </div>
              <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <div className="text-xs sm:text-sm font-black text-emerald-600 truncate">По факту</div>
                <div className="text-[10px] sm:text-xs text-slate-500 font-semibold mt-0.5 leading-tight">
                  Оплата
                </div>
              </div>
            </div>

            {/* Quality Standards bullet line */}
            <div className="pt-1 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-600 font-semibold">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Собственный склад в наличии</span>
              </div>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0062D2] shrink-0" />
                <span>Монтаж за 2–4 часа</span>
              </div>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0062D2] shrink-0" />
                <span>Точная цена под ключ</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual with airflow on light blue background (5 cols on lg/xl, min-w-0) */}
          <div className="lg:col-span-5 min-w-0 flex items-center justify-center relative">
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/10] lg:aspect-[4/3] max-h-[380px] sm:max-h-[440px] lg:max-h-[500px] rounded-2xl overflow-hidden shadow-lg border border-slate-200/80">
              <Image
                src={getAssetUrl('/images/hero/daikin-flagship-hero.jpg')}
                alt="Настенная сплит-система с установкой"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-[center_right]"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
