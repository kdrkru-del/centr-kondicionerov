'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, MapPin, Calculator, CheckCircle2, Zap } from 'lucide-react';
import { COMPANY_CONFIG } from '@/config/company';
import { getAssetUrl } from '@/utils/asset';

interface HeroProps {
  onOpenModal: (productName?: string, source?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  return (
    <section className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex items-center overflow-hidden border-b border-slate-200/80">
      {/* 1. Full-screen background photograph of luxury Scandinavian sunlit interior */}
      <div className="absolute inset-0 z-0">
        <Image
          src={getAssetUrl('/images/hero/luxury-bright-living-room.jpg')}
          alt="Премиальный кондиционер в интерьере Владивосток"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />
        {/* Soft, luminous white gradient overlays to ensure text readability while keeping the room bright & sunlit */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent lg:via-white/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-white/40" />
      </div>

      {/* 2. Content overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 w-full">
        <div className="max-w-2xl lg:max-w-3xl space-y-6 sm:space-y-8">
          
          {/* Eyebrow badge */}
          <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-white/90 border border-slate-200/80 shadow-xs backdrop-blur-md text-xs sm:text-sm font-semibold text-slate-800">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span className="text-blue-600 font-bold">{COMPANY_CONFIG.citiesListText}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-700">Монтаж под ключ за 1 день</span>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-slate-900 drop-shadow-xs">
              Кондиционеры под ваше помещение{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-600 to-blue-800">
                с чистым монтажом
              </span>{' '}
              во Владивостоке
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-700 font-medium leading-relaxed max-w-2xl">
              Подберём сплит-систему точно под дизайн и площадь комнаты. Беспыльный чистовой монтаж с пылесосом и алмазным бурением. {COMPANY_CONFIG.warrantyText}. {COMPANY_CONFIG.paymentTerms}.
            </p>
          </div>

          {/* Quick Metrics Bar on clean frosted glass */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 py-3 px-4 sm:px-6 bg-white/85 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-sm max-w-xl">
            <div>
              <div className="text-xl sm:text-2xl font-black text-blue-600">до 4 лет</div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">Официальная гарантия</div>
            </div>
            <div className="border-x border-slate-200 px-3 sm:px-4">
              <div className="text-xl sm:text-2xl font-black text-emerald-600">0 ₽</div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">Предоплата (по факту)</div>
            </div>
            <div className="pl-1">
              <div className="text-xl sm:text-2xl font-black text-slate-900">2.5 часа</div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">Чистая установка</div>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
            <Link
              href="/selection"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold rounded-2xl shadow-lg shadow-blue-500/25 transition flex items-center justify-center space-x-2.5 text-base"
            >
              <Sparkles className="w-5 h-5 text-blue-200" />
              <span>Рассчитать под мою площадь</span>
            </Link>

            <Link
              href="/catalog"
              className="px-7 py-4 bg-white/90 hover:bg-white active:scale-[0.99] text-slate-800 font-bold rounded-2xl border border-slate-300 hover:border-slate-400 shadow-sm backdrop-blur-sm transition flex items-center justify-center space-x-2 text-base"
            >
              <span>Каталог с ценами</span>
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </Link>

            <button
              type="button"
              onClick={() => onOpenModal('Экспресс-консультация с первого экрана', 'Hero')}
              className="px-4 py-3.5 text-slate-700 hover:text-blue-600 font-bold transition flex items-center justify-center space-x-1.5 text-sm"
            >
              <Calculator className="w-4 h-4 text-blue-600" />
              <span>Быстрый расчёт стоимости</span>
            </button>
          </div>

          {/* Floating Trust Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/80 border border-slate-200/80 text-xs text-slate-700 font-semibold shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Договор и акт выполненных работ</span>
            </div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/80 border border-slate-200/80 text-xs text-slate-700 font-semibold shadow-xs">
              <Zap className="w-4 h-4 text-blue-600" />
              <span>Без пыли и повреждения обоев</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
