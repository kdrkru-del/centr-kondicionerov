'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Zap, Award, Snowflake } from 'lucide-react';
import { COMPANY_CONFIG } from '@/config/company';
import { getAssetUrl } from '@/utils/asset';

interface HeroProps {
  onOpenModal: (productName?: string, source?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  return (
    <section className="relative min-h-[620px] sm:min-h-[680px] lg:min-h-[740px] flex items-center overflow-hidden bg-gradient-to-r from-[#F0F5FA] via-[#F6F9FD] to-[#FFFFFF] border-b border-slate-200">
      
      {/* 1. ПРАВАЯ ЧАСТЬ: ФОТОГРАФИЯ ФЛАГМАНСКОЙ ТЕХНИКИ В СТИЛЕ DAIKIN GLOBAL (БЕЗ МУТНЫХ ДИВАНОВ) */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-3/5 z-0">
        <Image
          src={getAssetUrl('/images/hero/daikin-flagship-hero.jpg')}
          alt="Профессиональные климатические системы во Владивостоке"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover object-[center_right]"
        />
        {/* Градиент перехода между левой текстовой колонкой и картинкой */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F0F5FA] via-[#F0F5FA]/80 to-transparent lg:w-1/2" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F0F5FA]/90 via-transparent to-transparent lg:hidden" />
      </div>

      {/* 2. ЛЕВАЯ ЧАСТЬ: КОРПОРАТИВНЫЙ РЕСПЕКТАБЕЛЬНЫЙ ТЕКСТ ПОСТАВЩИКА ОБОРУДОВАНИЯ */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 w-full">
        <div className="max-w-xl lg:max-w-2xl space-y-6 sm:space-y-8">
          
          {/* Корпоративный бейдж статуса */}
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-md bg-[#0062D2]/10 border border-[#0062D2]/20 text-xs sm:text-sm font-bold text-[#0062D2]">
            <Award className="w-4 h-4 text-[#0062D2] shrink-0" />
            <span>Официальный поставщик климатических систем в Приморье</span>
          </div>

          {/* Заголовок в уверенном стиле лидера рынка Daikin */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.12] text-slate-900">
              Надёжные сплит-системы <br />
              <span className="text-[#0062D2]">
                с профессиональным монтажом
              </span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-700 font-medium leading-relaxed pt-1 max-w-xl">
              Официальное климатическое оборудование с заводской гарантией до 4 лет. Доставка и аккуратная установка во Владивостоке, Артёме и Уссурийске.
            </p>
          </div>

          {/* Премиальная плашка ключевых параметров поставщика (3 колонки с разделителями) */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 py-4 px-5 sm:px-6 bg-white rounded-xl border border-slate-200 shadow-sm max-w-lg">
            <div>
              <div className="text-xl sm:text-2xl font-black text-[#0062D2]">4 года</div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-semibold mt-0.5">
                Заводская гарантия
              </div>
            </div>
            <div className="border-x border-slate-200 px-3 sm:px-4">
              <div className="text-xl sm:text-2xl font-black text-emerald-600">0 ₽</div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-semibold mt-0.5">
                Оплата по факту
              </div>
            </div>
            <div className="pl-1">
              <div className="text-xl sm:text-2xl font-black text-slate-900">1 день</div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-semibold mt-0.5">
                Срок доставки и монтажа
              </div>
            </div>
          </div>

          {/* Кнопки действия в фирменном стиле */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
            <button
              type="button"
              onClick={() => onOpenModal('Запрос каталога и расчёта', 'Hero Daikin')}
              className="px-8 py-4 bg-[#0062D2] hover:bg-[#004bb5] active:scale-[0.99] text-white font-bold rounded-lg shadow-md shadow-[#0062D2]/25 transition-all duration-200 flex items-center justify-center space-x-2 text-base min-h-[52px]"
            >
              <span>Подобрать оборудование</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            <Link
              href="/catalog"
              className="px-7 py-4 bg-white hover:bg-slate-50 active:scale-[0.99] text-slate-800 font-bold rounded-lg border border-slate-300 hover:border-slate-400 shadow-2xs transition flex items-center justify-center space-x-2 text-base min-h-[52px]"
            >
              <span>Каталог оборудования</span>
            </Link>
          </div>

          {/* Строка стандартов качества */}
          <div className="pt-3 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-600 font-semibold">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Собственный склад в наличии</span>
            </div>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#0062D2] shrink-0" />
              <span>Штатные сертифицированные инженеры</span>
            </div>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#0062D2] shrink-0" />
              <span>Договор и официальный акт</span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
