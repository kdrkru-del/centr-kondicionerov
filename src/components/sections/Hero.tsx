'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  Volume2, 
  Eye, 
  Wind,
  Layers,
  Wrench
} from 'lucide-react';
import { COMPANY_CONFIG } from '@/config/company';
import { getAssetUrl } from '@/utils/asset';

interface HeroProps {
  onOpenModal: (productName?: string, source?: string) => void;
}

interface AreaTier {
  id: string;
  label: string;
  sublabel: string;
  recommendedModel: string;
  brand: string;
  tag: string;
  price: number;
  installPrice: number;
  totalPrice: number;
  image: string;
  cooling: string;
  noise: string;
  slug: string;
}

const TIERS: AreaTier[] = [
  {
    id: 'under-25',
    label: 'До 25 м²',
    sublabel: 'Спальня или студия',
    recommendedModel: 'Dahatsu Legend 07 Inverter',
    brand: 'DAHATSU',
    tag: 'Хит продаж • Инвертор',
    price: 33000,
    installPrice: 15000,
    totalPrice: 48000,
    image: '/products/dahatsu/dahatsu-legend-07.png',
    cooling: '2.1 кВт',
    noise: '22 дБ (шепот)',
    slug: 'dahatsu-legend-07'
  },
  {
    id: 'under-35',
    label: 'До 35 м²',
    sublabel: 'Гостиная или евродвушка',
    recommendedModel: 'Dahatsu Legend 12 Inverter',
    brand: 'DAHATSU',
    tag: 'Тихий японский компрессор',
    price: 42000,
    installPrice: 15000,
    totalPrice: 57000,
    image: '/products/dahatsu/dahatsu-legend-12.png',
    cooling: '3.5 кВт',
    noise: '24 дБ',
    slug: 'dahatsu-legend-12'
  },
  {
    id: 'under-50',
    label: 'До 50 м²',
    sublabel: 'Просторная гостиная/офис',
    recommendedModel: 'MDV Infini Inverter UV-Pro',
    brand: 'MDV',
    tag: 'Флагман • Стерилизация UV',
    price: 54000,
    installPrice: 17000,
    totalPrice: 71000,
    image: '/products/mdv/mdv-infini-uv-pro.png',
    cooling: '5.2 кВт',
    noise: '26 дБ',
    slug: 'mdv-infini-inverter'
  },
  {
    id: 'house',
    label: 'Загородные дома',
    sublabel: 'Коттеджи и пентхаусы',
    recommendedModel: 'MDV Nordic Heat Pump Inverter',
    brand: 'MDV',
    tag: 'Тепловой насос до -25°C',
    price: 68000,
    installPrice: 18000,
    totalPrice: 86000,
    image: '/products/mdv/mdv-nordic-heat-pump-09.png',
    cooling: '6.8 кВт',
    noise: '23 дБ',
    slug: 'mdv-infini-inverter'
  }
];

export const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  const [activeTierId, setActiveTierId] = useState<string>('under-25');
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const currentTier = TIERS.find((t) => t.id === activeTierId) || TIERS[0];
  const formatPrice = (val: number) => new Intl.NumberFormat('ru-RU').format(val);

  return (
    <section className="relative bg-[#FAFAF9] overflow-hidden border-b border-slate-200/60 pt-8 pb-16 lg:pt-14 lg:pb-20">
      {/* Деликатные световые рефлексы премиальной студии */}
      <div className="absolute top-0 right-10 w-[600px] h-[600px] rounded-full bg-blue-100/40 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] rounded-full bg-sky-50/70 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* ======================================================== */}
          {/* ЛЕВАЯ КОЛОНКА: Контент и конверсионный блок (~58%)       */}
          {/* ======================================================== */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Статусный бейдж-пилл */}
            <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-white border border-slate-200/80 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] text-xs sm:text-sm font-semibold text-slate-800">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0062D2] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0062D2]"></span>
              </span>
              <span className="text-[#0062D2] font-bold">Инженерный центр климата</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600">Владивосток и Приморский край</span>
            </div>

            {/* Главный заголовок H1 с европейским кернингом */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.12] text-slate-900">
                Климатические системы{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0062D2] via-[#0284C7] to-blue-700">
                  с чистым монтажом
                </span>{' '}
                во Владивостоке
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
                Индивидуальный подбор сплит-систем под дизайн и площадь помещения. Беспыльный чистовой монтаж с алмазным бурением. {COMPANY_CONFIG.warrantyText}. {COMPANY_CONFIG.paymentTerms}.
              </p>
            </div>

            {/* ИНТЕРАКТИВНЫЙ ПЕРЕКЛЮЧАТЕЛЬ ПЛОЩАДИ ПРЯМО В HERO */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                <span>Выберите площадь помещения:</span>
                <span className="text-[#0062D2] font-semibold lowercase hidden sm:inline">конфигурация обновляется мгновенно</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TIERS.map((tier) => {
                  const isActive = tier.id === activeTierId;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setActiveTierId(tier.id)}
                      className={`py-3 px-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between min-h-[64px] ${
                        isActive
                          ? 'bg-white border-[#0062D2] shadow-[0_4px_16px_-2px_rgba(0,98,210,0.18)] ring-2 ring-[#0062D2]/20'
                          : 'bg-white/80 border-slate-200/80 hover:border-slate-300 hover:bg-white text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className={`text-sm font-black ${isActive ? 'text-[#0062D2]' : 'text-slate-900'}`}>
                          {tier.label}
                        </span>
                        {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-[#0062D2]" />}
                      </div>
                      <span className="text-[11px] text-slate-500 truncate mt-0.5">
                        {tier.sublabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* БЛОК КЛЮЧЕВЫХ СТАНДАРТОВ ДОВЕРИЯ (3 карточки из тонкого белого фарфора) */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-1">
              <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/70 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.04)]">
                <div className="text-xl sm:text-2xl font-black text-[#0062D2]">до 4 лет</div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5 leading-snug">
                  Официальная гарантия на всё
                </div>
              </div>
              <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/70 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.04)]">
                <div className="text-xl sm:text-2xl font-black text-emerald-600">0 ₽</div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5 leading-snug">
                  Предоплата (расчёт по факту)
                </div>
              </div>
              <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/70 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.04)]">
                <div className="text-xl sm:text-2xl font-black text-slate-900">2.5 часа</div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5 leading-snug">
                  Чистый монтаж с пылесосом
                </div>
              </div>
            </div>

            {/* КНОПКИ ДЕЙСТВИЯ */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => onOpenModal(`Расчёт под ключ: ${currentTier.recommendedModel}`, 'Hero')}
                className="px-7 py-4 bg-[#0062D2] hover:bg-[#1D68BD] active:scale-[0.99] text-white font-bold rounded-[14px] shadow-lg shadow-[#0062D2]/25 transition-all duration-200 flex items-center justify-center space-x-2 text-base min-h-[50px]"
              >
                <Sparkles className="w-4 h-4 text-sky-200" />
                <span>Рассчитать стоимость под ключ</span>
              </button>

              <Link
                href="/catalog"
                className="px-6 py-4 bg-white hover:bg-slate-50 active:scale-[0.99] text-slate-800 font-bold rounded-[14px] border border-slate-300 hover:border-slate-400 shadow-xs transition flex items-center justify-center space-x-2 text-base min-h-[50px]"
              >
                <span>Смотреть каталог с ценами</span>
                <ArrowRight className="w-4 h-4 text-[#0062D2]" />
              </Link>
            </div>

          </div>

          {/* ======================================================== */}
          {/* ПРАВАЯ КОЛОНКА: Интерактивная витрина премиум-техники     */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 relative">
            
            {/* Белоснежная студийная витрина (карточка из светлого фарфора) */}
            <div className="relative bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.06)] overflow-hidden">
              
              {/* Верхняя строка статуса карточки */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-1 bg-blue-50 text-[#0062D2] text-[10px] font-black rounded-lg uppercase tracking-wider">
                    {currentTier.brand}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {currentTier.tag}
                  </span>
                </div>
                <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>В наличии во Владивостоке</span>
                </div>
              </div>

              {/* Название и рекомендуемый метраж */}
              <div className="mb-4">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {currentTier.recommendedModel}
                </h3>
                <div className="flex items-center space-x-3 text-xs text-slate-500 mt-1">
                  <span>Мощность: <strong className="text-slate-700">{currentTier.cooling}</strong></span>
                  <span>•</span>
                  <span>Шум: <strong className="text-slate-700">{currentTier.noise}</strong></span>
                </div>
              </div>

              {/* Центральная зона сплит-системы с интерактивными пульсирующими хотспотами */}
              <div className="relative h-56 sm:h-64 w-full bg-gradient-to-b from-slate-50/80 to-slate-100/50 rounded-2xl flex items-center justify-center p-6 border border-slate-100/80 mb-5 overflow-hidden">
                
                {/* Фотография рекомендованной модели */}
                <div className="relative w-full h-full">
                  <Image
                    src={getAssetUrl(currentTier.image)}
                    alt={currentTier.recommendedModel}
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, 400px"
                    className="object-contain transition-all duration-500 drop-shadow-md"
                  />
                </div>

                {/* Пульсирующий Хотспот 1: Тишина */}
                <div className="absolute top-4 left-4 z-20">
                  <button
                    type="button"
                    onClick={() => setActiveHotspot(activeHotspot === 1 ? null : 1)}
                    className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#0062D2] shadow-md border border-blue-100 hover:scale-110 transition"
                    title="Уровень шума"
                  >
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-30"></span>
                    <Volume2 className="w-4 h-4" />
                  </button>
                  {activeHotspot === 1 && (
                    <div className="absolute top-10 left-0 w-48 bg-slate-900 text-white p-2.5 rounded-xl text-[11px] shadow-xl z-30 animate-fadeIn">
                      <div className="font-bold text-sky-400">19–22 дБ</div>
                      Тише шёпота и шелеста листвы. Идеален для чуткого ночного сна.
                    </div>
                  )}
                </div>

                {/* Пульсирующий Хотспот 2: Чистый монтаж */}
                <div className="absolute bottom-4 right-4 z-20">
                  <button
                    type="button"
                    onClick={() => setActiveHotspot(activeHotspot === 2 ? null : 2)}
                    className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#0062D2] shadow-md border border-blue-100 hover:scale-110 transition"
                    title="Скрытый монтаж"
                  >
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-30"></span>
                    <Wrench className="w-4 h-4" />
                  </button>
                  {activeHotspot === 2 && (
                    <div className="absolute bottom-10 right-0 w-52 bg-slate-900 text-white p-2.5 rounded-xl text-[11px] shadow-xl z-30 animate-fadeIn">
                      <div className="font-bold text-sky-400">Скрытая трасса в стену</div>
                      Алмазное бурение с пылесосом. Никаких кабель-каналов и висящих проводов.
                    </div>
                  )}
                </div>

                {/* Пульсирующий Хотспот 3: Очистка воздуха */}
                <div className="absolute top-4 right-4 z-20">
                  <button
                    type="button"
                    onClick={() => setActiveHotspot(activeHotspot === 3 ? null : 3)}
                    className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#0062D2] shadow-md border border-blue-100 hover:scale-110 transition"
                    title="Очистка воздуха"
                  >
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-30"></span>
                    <Wind className="w-4 h-4" />
                  </button>
                  {activeHotspot === 3 && (
                    <div className="absolute top-10 right-0 w-48 bg-slate-900 text-white p-2.5 rounded-xl text-[11px] shadow-xl z-30 animate-fadeIn">
                      <div className="font-bold text-sky-400">Ионизация и фильтрация</div>
                      Многоступенчатая очистка от аллергенов, пыльцы и морской влажности.
                    </div>
                  )}
                </div>

              </div>

              {/* Расчёт стоимости под ключ */}
              <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    Комплект с установкой под ключ:
                  </div>
                  <div className="text-2xl font-black text-[#0062D2]">
                    {formatPrice(currentTier.totalPrice)} ₽
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Оборудование {formatPrice(currentTier.price)} ₽ + базовый монтаж {formatPrice(currentTier.installPrice)} ₽
                  </div>
                </div>

                <Link
                  href={`/catalog/${currentTier.slug}`}
                  className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 transition shadow-2xs flex items-center space-x-1"
                >
                  <span>О модели</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#0062D2]" />
                </Link>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
