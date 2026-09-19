'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Zap, MapPin } from 'lucide-react';
import { COMPANY_CONFIG } from '@/config/company';
import { getAssetUrl } from '@/utils/asset';

interface HeroProps {
  onOpenModal: (productName?: string, source?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  return (
    <section className="relative min-h-[640px] sm:min-h-[720px] lg:min-h-[780px] flex items-center overflow-hidden border-b border-slate-200/60">
      
      {/* 1. ПОЛНОЭКРАННАЯ ВЕЛИКОЛЕПНАЯ СВЕТЛАЯ ФОТОГРАФИЯ ИНТЕРЬЕРА ПЕНТХАУСА С ДИЗАЙНЕРСКИМ КОНДИЦИОНЕРОМ */}
      <div className="absolute inset-0 z-0">
        <Image
          src={getAssetUrl('/images/hero/luxury-bright-living-room.jpg')}
          alt="Премиальная сплит-система в светлом интерьере пентхауса во Владивостоке"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
        {/* Мягкий рассеянный градиент слева, чтобы текст читался идеально, но комната оставалась залита дневным светом */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent lg:via-white/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-white/30" />
      </div>

      {/* 2. ЧИСТЫЙ, СПОКОЙНЫЙ И ДОРОГОЙ КОНТЕНТ (НИКАКОГО ВИЗУАЛЬНОГО ШУМА) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 w-full">
        <div className="max-w-xl lg:max-w-2xl space-y-6 sm:space-y-8">
          
          {/* Аккуратная плашка геолокации */}
          <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-white/95 border border-slate-200/80 shadow-[0_2px_12px_-3px_rgba(0,0,0,0.06)] backdrop-blur-md text-xs sm:text-sm font-semibold text-slate-800">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0062D2] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0062D2]"></span>
            </span>
            <span className="text-[#0062D2] font-bold">{COMPANY_CONFIG.citiesListText}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-700">Монтаж под ключ за 1 день</span>
          </div>

          {/* Сильный, лаконичный заголовок */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-black tracking-tight leading-[1.12] text-slate-900">
              Идеальный климат <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0062D2] via-[#0284C7] to-blue-800">
                для вашего дома
              </span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-700 leading-relaxed font-normal pt-1">
              Продажа и беспыльный монтаж японских и премиальных сплит-систем во Владивостоке. Гарантия до 4 лет. Оплата только после завершения работ.
            </p>
          </div>

          {/* Всего 2 главные понятные кнопки */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
            <button
              type="button"
              onClick={() => onOpenModal('Подбор кондиционера с первого экрана', 'Hero')}
              className="px-8 py-4 bg-[#0062D2] hover:bg-[#1D68BD] active:scale-[0.99] text-white font-bold rounded-[14px] shadow-lg shadow-[#0062D2]/25 transition-all duration-200 flex items-center justify-center space-x-2 text-base min-h-[52px]"
            >
              <Sparkles className="w-4 h-4 text-sky-200" />
              <span>Подобрать кондиционер</span>
            </button>

            <Link
              href="/catalog"
              className="px-7 py-4 bg-white/95 hover:bg-white active:scale-[0.99] text-slate-900 font-bold rounded-[14px] border border-slate-300 hover:border-slate-400 shadow-xs backdrop-blur-sm transition flex items-center justify-center space-x-2 text-base min-h-[52px]"
            >
              <span>Каталог систем</span>
              <ArrowRight className="w-4 h-4 text-[#0062D2]" />
            </Link>
          </div>

          {/* Элегантная лаконичная полоса стандартов в одну строку */}
          <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-700 font-semibold border-t border-slate-200/60">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#0062D2] shrink-0" />
              <span>Гарантия до 4 лет</span>
            </div>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-[#0062D2] shrink-0" />
              <span>Чистый монтаж без пыли</span>
            </div>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>0 ₽ предоплата</span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
