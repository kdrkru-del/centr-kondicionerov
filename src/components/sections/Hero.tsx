'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, MapPin, Calculator, Award, CheckCircle2, Zap } from 'lucide-react';
import { COMPANY_CONFIG } from '@/config/company';
import { getAssetUrl } from '@/utils/asset';

interface HeroProps {
  onOpenModal: (productName?: string, source?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0B1528] via-[#0E1E38] to-slate-900 text-white pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-white/10">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-sky-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none" />

      {/* Subtle geometric grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column (Content): 7 cols */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Premium Pill Badge */}
            <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-md shadow-inner text-xs sm:text-sm font-medium">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              <span className="text-sky-300 font-semibold">{COMPANY_CONFIG.citiesListText}</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-200">Монтаж под ключ за 1 день</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-white">
                Премиальный климат <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400">
                  с чистым монтажом
                </span>{' '}
                во Владивостоке
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Подберём сплит-систему точно под площадь и дизайн квартиры. Доставим в день заказа, выполним беспыльный монтаж с алмазным бурением. {COMPANY_CONFIG.warrantyText}. {COMPANY_CONFIG.paymentTerms}.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 py-2 border-y border-white/10 max-w-xl">
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-sky-400">до 4 лет</div>
                <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Официальная гарантия</div>
              </div>
              <div className="border-x border-white/10 px-2 sm:px-4">
                <div className="text-xl sm:text-2xl font-extrabold text-emerald-400">0 ₽</div>
                <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Предоплата (по факту)</div>
              </div>
              <div className="pl-1">
                <div className="text-xl sm:text-2xl font-extrabold text-cyan-300">2.5 часа</div>
                <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Чистая установка</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                href="/selection"
                className="px-7 py-4 bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 active:scale-[0.99] text-white font-bold rounded-2xl shadow-xl shadow-blue-500/30 transition flex items-center justify-center space-x-2.5 text-base"
              >
                <Sparkles className="w-5 h-5 text-sky-100" />
                <span>Рассчитать под мою площадь</span>
              </Link>

              <Link
                href="/catalog"
                className="px-6 py-4 bg-white/10 hover:bg-white/15 active:scale-[0.99] text-white font-semibold rounded-2xl border border-white/20 backdrop-blur-sm transition flex items-center justify-center space-x-2 text-base"
              >
                <span>Каталог с ценами</span>
                <ArrowRight className="w-4 h-4 text-sky-400" />
              </Link>

              <button
                type="button"
                onClick={() => onOpenModal('Экспресс-расчёт с первого экрана', 'Hero')}
                className="px-4 py-3.5 text-slate-300 hover:text-white font-medium transition flex items-center justify-center space-x-1.5 text-sm"
              >
                <Calculator className="w-4 h-4 text-sky-400" />
                <span>Быстрый вызов мастера</span>
              </button>
            </div>
          </div>

          {/* Right Column (Hero Visual Showcase): 5 cols */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Glowing backdrop card */}
            <div className="relative w-full max-w-lg bg-gradient-to-b from-white/10 to-white/5 rounded-3xl p-4 sm:p-6 border border-white/15 backdrop-blur-xl shadow-2xl overflow-hidden group">
              
              {/* Card top badge */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 text-xs font-bold uppercase tracking-wider border border-sky-500/30">
                    Хит сезона 2026
                  </span>
                  <span className="text-xs text-slate-400">Владивосток</span>
                </div>
                <div className="text-xs font-semibold text-emerald-400 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>В наличии на складе</span>
                </div>
              </div>

              {/* Central hero device visualization */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#070D18]/60 flex items-center justify-center p-4 border border-white/10">
                <Image
                  src={getAssetUrl('/images/works/installation-1.jpg')}
                  alt="Кондиционер в интерьере Владивосток"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover opacity-90 group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528] via-transparent to-black/30" />
                
                {/* Floating overlay tag on photo */}
                <div className="absolute bottom-3 left-3 right-3 bg-[#0B1528]/90 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/15 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">Реальный объект во Владивостоке</div>
                    <div className="text-[10px] text-slate-300">Скрытая трасса, алмазное бурение без пыли</div>
                  </div>
                  <span className="text-xs font-extrabold text-sky-400">под ключ</span>
                </div>
              </div>

              {/* Bottom features bar inside card */}
              <div className="grid grid-cols-2 gap-3 mt-4 pt-1">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <div className="flex items-center space-x-1.5 text-amber-400 text-xs font-bold mb-0.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Договор и гарантия</span>
                  </div>
                  <div className="text-[11px] text-slate-300">
                    До 4 лет официальной гарантии
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <div className="flex items-center space-x-1.5 text-emerald-400 text-xs font-bold mb-0.5">
                    <Zap className="w-4 h-4" />
                    <span>Монтаж без пыли</span>
                  </div>
                  <div className="text-[11px] text-slate-300">
                    Пылесос и чистовая уборка
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
