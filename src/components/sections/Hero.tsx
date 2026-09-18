'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, MapPin, Calculator } from 'lucide-react';
import { COMPANY_CONFIG } from '@/config/company';

interface HeroProps {
  onOpenModal: (productName?: string, source?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-white pt-8 pb-12 lg:pt-14 lg:pb-20">
      {/* Background soft glow */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] rounded-full bg-blue-100/40 blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 left-1/4 w-[350px] h-[350px] rounded-full bg-sky-50/50 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column (55-60%) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 order-1">
            {/* Geo and availability pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 border border-blue-200/60 text-blue-800 text-xs sm:text-sm font-medium">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{COMPANY_CONFIG.citiesListText}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 ml-1" />
              <span className="text-blue-700 font-normal">Склад и монтаж</span>
            </div>

            {/* Confirmed H1 */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
                Кондиционер под ваше помещение <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-600 to-blue-800">
                  с установкой
                </span>{' '}
                во Владивостоке
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed pt-1">
                Подберём сплит-систему под площадь помещения, оперативно доставим и аккуратно смонтируем. {COMPANY_CONFIG.warrantyText}, {COMPANY_CONFIG.paymentTerms.toLowerCase()}.
              </p>
            </div>

            {/* 3 distinct CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                href="/selection"
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/25 transition flex items-center justify-center space-x-2 text-base min-h-[48px]"
              >
                <Sparkles className="w-5 h-5 text-blue-200" />
                <span>Подобрать кондиционер</span>
              </Link>

              <Link
                href="/catalog"
                className="px-6 py-3.5 bg-white hover:bg-slate-50 active:scale-[0.99] text-slate-800 font-semibold rounded-2xl border border-slate-200 hover:border-slate-300 shadow-sm transition flex items-center justify-center space-x-2 text-base min-h-[48px]"
              >
                <span>Перейти в каталог</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <button
                type="button"
                onClick={() => onOpenModal('Запрос стоимости с главной', 'Кнопка Уточнить стоимость в Hero')}
                className="px-4 py-3.5 text-slate-600 hover:text-blue-600 font-medium transition flex items-center justify-center space-x-1.5 text-sm"
              >
                <Calculator className="w-4 h-4" />
                <span>Уточнить стоимость</span>
              </button>
            </div>
          </div>

          {/* Right Column (40-45%): Hero Image */}
          <div className="lg:col-span-5 relative flex items-center justify-center order-2">
            <div className="absolute inset-0 m-auto w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-blue-400/20 to-sky-300/20 blur-2xl -z-10" />

            <div className="relative w-full max-w-md aspect-[4/3] sm:aspect-square flex items-center justify-center">
              <Image
                src="/images/hero/air-conditioner-hero.png"
                alt="Кондиционер с установкой во Владивостоке"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 450px"
                className="object-contain drop-shadow-xl"
              />

              {/* Floating trust badge 1 */}
              <div className="absolute -bottom-2 left-2 sm:left-4 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-lg border border-slate-100 flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Оплата по факту</div>
                  <div className="text-[11px] text-slate-500">После выполнения работ</div>
                </div>
              </div>

              {/* Floating trust badge 2 */}
              <div className="absolute top-2 right-2 sm:right-4 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-lg border border-slate-100 flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">{COMPANY_CONFIG.warrantyText}</div>
                  <div className="text-[11px] text-slate-500">На технику и установку</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
