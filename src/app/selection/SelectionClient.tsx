'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/catalog/ProductCard';
import { useModal } from '@/components/providers/ModalProvider';
import { Product } from '@/types';
import {
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  ShieldCheck,
  Building,
  Home,
  Briefcase,
  Store,
  Layers,
  Wrench
} from 'lucide-react';

export const SelectionClient: React.FC = () => {
  const { openModal } = useModal();

  const [step, setStep] = useState<number>(1);
  const [selectedArea, setSelectedArea] = useState<string>('20-25');
  const [selectedRoom, setSelectedRoom] = useState<string>('apartment');
  const [selectedPriority, setSelectedPriority] = useState<string>('optimal');

  // Step 1: Area
  const areaOptions = [
    { id: 'under-20', label: 'до 20 м²', desc: 'Спальня, детская, небольшая кухня' },
    { id: '20-25', label: '20–25 м²', desc: 'Стандартная жилая комната' },
    { id: '25-35', label: '25–35 м²', desc: 'Гостиная, просторная спальня или студия' },
    { id: '35-50', label: '35–50 м²', desc: 'Большая кухня-гостиная, зал в доме' },
    { id: '50-70', label: '50–70 м²', desc: 'Квартира целиком, просторный офис' },
    { id: 'over-70', label: '70+ м²', desc: 'Коттеджи, коммерческие помещения' }
  ];

  // Step 2: Room type
  const roomOptions = [
    { id: 'apartment', label: 'Квартира', icon: Building, desc: 'Типовой многоквартирный дом' },
    { id: 'house', label: 'Дом / Коттедж', icon: Home, desc: 'Частный дом с автономным отоплением' },
    { id: 'office', label: 'Офис', icon: Briefcase, desc: 'Рабочее пространство с компьютерами' },
    { id: 'commercial', label: 'Коммерческое помещение', icon: Store, desc: 'Магазин, салон, кафе' }
  ];

  // Step 3: Priority
  const priorityOptions = [
    {
      id: 'price',
      label: 'Минимальная цена',
      desc: 'Доступные классические On/Off модели без переплат за лишние опции'
    },
    {
      id: 'inverter',
      label: 'Инвертор',
      desc: 'Экономия электроэнергии до 40%, плавная регулировка и тихий ночной режим'
    },
    {
      id: 'optimal',
      label: 'Оптимальный вариант',
      desc: 'Идеальный баланс цены, надёжности и комфортного микроклимата'
    },
    {
      id: 'premium',
      label: 'Премиальный вариант',
      desc: 'Максимальный комфорт, УФ-очистка воздуха, работа на обогрев до -25°C'
    }
  ];

  // Helper function to match area
  const checkAreaOverlap = (p: Product, range: string): boolean => {
    const exact = p.area;
    const min = p.areaMin ?? exact;
    const max = p.areaMax ?? exact;

    const overlap = (rMin: number, rMax: number) => {
      if (exact !== null) return exact >= rMin && exact <= rMax;
      if (min !== null && max !== null) return Math.max(min, rMin) <= Math.min(max, rMax);
      if (min !== null) return min <= rMax;
      if (max !== null) return max >= rMin;
      if (p.seriesAreaRange) return rMin <= 70 && rMax >= 20;
      return true;
    };

    if (range === 'under-20') return overlap(0, 20);
    if (range === '20-25') return overlap(20, 25);
    if (range === '25-35') return overlap(25, 35);
    if (range === '35-50') return overlap(35, 50);
    if (range === '50-70') return overlap(50, 70);
    if (range === 'over-70') return overlap(70, 300);
    return true;
  };

  // Dynamic recommendations based solely on authentic PRODUCTS
  const matchedProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // Priority filter / sorting
    if (selectedPriority === 'price') {
      list.sort((a, b) => {
        const pA = a.priceWithInstallation ?? a.price ?? 999999;
        const pB = b.priceWithInstallation ?? b.price ?? 999999;
        return pA - pB;
      });
    } else if (selectedPriority === 'inverter') {
      list = list.filter((p) => p.compressorType === 'Inverter');
      if (list.length === 0) list = PRODUCTS;
    } else if (selectedPriority === 'premium') {
      const prem = list.filter((p) => p.category === 'premium');
      if (prem.length > 0) list = prem;
    } else {
      // optimal: prefer Inverters & hits
      list.sort((a, b) => (b.isHit ? 1 : 0) - (a.isHit ? 1 : 0));
    }

    // Area filter
    const areaFiltered = list.filter((p) => checkAreaOverlap(p, selectedArea));
    if (areaFiltered.length > 0) {
      list = areaFiltered;
    }

    // Return 2 to 4 products
    return list.slice(0, 3);
  }, [selectedArea, selectedRoom, selectedPriority]);

  const handleReset = () => {
    setStep(1);
    setSelectedArea('20-25');
    setSelectedRoom('apartment');
    setSelectedPriority('optimal');
  };

  const handleOrderInstall = (product: Product) => {
    openModal(
      `${product.name}`,
      `Интерактивный подборщик (Площадь: ${selectedArea}, Помещение: ${selectedRoom}, Приоритет: ${selectedPriority})`,
      {
        id: product.id,
        brand: product.brand,
        model: product.model,
        name: product.name,
        price: product.price,
        priceFrom: product.priceFrom,
        priceWithInstallation: product.priceWithInstallation,
        image: product.image
      }
    );
  };

  const handleExpertConsultation = () => {
    openModal(
      `Точный подбор специалистом (Площадь: ${selectedArea}, Помещение: ${selectedRoom}, Приоритет: ${selectedPriority})`,
      'Интерактивный подборщик — Получить точный подбор специалиста'
    );
  };

  return (
    <div className="bg-white min-h-screen py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-xs text-slate-400 mb-6">
          <Link href="/" className="hover:text-blue-600 transition">
            Главная
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <Link href="/catalog" className="hover:text-blue-600 transition">
            Каталог
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-[#0B1F33] font-bold">Подбор кондиционера</span>
        </nav>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Умный калькулятор</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1F33] tracking-tight">
            Подберём кондиционер за 30 секунд
          </h1>
          <p className="text-slate-500 text-sm sm:text-base mt-2.5 leading-relaxed">
            Ответьте на 3 простых вопроса — подберём надёжные сплит-системы из фактического наличия с расчётом монтажа под ключ.
          </p>
        </div>

        {/* Step Progress Tracker */}
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.05)] mb-12">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200/80">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-8 rounded-full bg-blue-600 text-white font-black text-sm flex items-center justify-center">
                {step}
              </span>
              <span className="font-bold text-sm sm:text-base text-[#0B1F33]">
                {step === 1 && 'Шаг 1. Выберите ориентировочную площадь'}
                {step === 2 && 'Шаг 2. Тип помещения'}
                {step === 3 && 'Шаг 3. Что для вас важнее?'}
                {step === 4 && 'Готово! Рекомендованные кондиционеры'}
              </span>
            </div>

            <button
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-slate-700 font-semibold flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Начать заново</span>
            </button>
          </div>

          {/* STEP 1: Area */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {areaOptions.map((opt) => {
                  const isSelected = selectedArea === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedArea(opt.id)}
                      className={`p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between min-h-[90px] ${
                        isSelected
                          ? 'bg-blue-50 border-blue-600 shadow-sm ring-2 ring-blue-500/20'
                          : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-blue-50/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-base font-black text-[#0B1F33]">
                          {opt.label}
                        </span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                      </div>
                      <span className="text-xs text-slate-500 leading-snug">
                        {opt.desc}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="py-3.5 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition shadow-md shadow-blue-500/20 flex items-center space-x-2"
                >
                  <span>Далее: выбор помещения</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Room Type */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {roomOptions.map((opt) => {
                  const isSelected = selectedRoom === opt.id;
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedRoom(opt.id)}
                      className={`p-5 rounded-2xl border text-left transition-all duration-200 flex items-center space-x-4 ${
                        isSelected
                          ? 'bg-blue-50 border-blue-600 shadow-sm ring-2 ring-blue-500/20'
                          : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-blue-50/20'
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-base font-black text-[#0B1F33]">
                            {opt.label}
                          </span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />}
                        </div>
                        <span className="text-xs text-slate-500 block truncate">
                          {opt.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="py-3 px-6 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl text-xs transition"
                >
                  Назад
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="py-3.5 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition shadow-md shadow-blue-500/20 flex items-center space-x-2"
                >
                  <span>Далее: приоритеты</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Priority */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {priorityOptions.map((opt) => {
                  const isSelected = selectedPriority === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedPriority(opt.id)}
                      className={`p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between min-h-[100px] ${
                        isSelected
                          ? 'bg-blue-50 border-blue-600 shadow-sm ring-2 ring-blue-500/20'
                          : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-blue-50/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-base font-black text-[#0B1F33]">
                          {opt.label}
                        </span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                      </div>
                      <span className="text-xs text-slate-500 leading-relaxed">
                        {opt.desc}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="py-3 px-6 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl text-xs transition"
                >
                  Назад
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="py-3.5 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition shadow-md shadow-blue-500/20 flex items-center space-x-2"
                >
                  <span>Показать подходящие модели</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Results */}
          {step === 4 && (
            <div className="space-y-8 animate-fadeIn">
              {/* Notice & Disclaimer */}
              <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 sm:p-5 text-xs text-amber-950 flex items-start space-x-3">
                <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-amber-900 mb-1">
                    Точную мощность рекомендуем подтвердить перед заказом
                  </div>
                  <p className="leading-relaxed text-amber-800">
                    Автоматический расчёт носит ориентировочный характер. Наш специалист бесплатно учтёт солнечную сторону, этаж, остекление и теплопритоки от бытовой техники, чтобы кондиционер гарантированно справлялся с нагрузкой.
                  </p>
                </div>
              </div>

              {/* Recommended 2-4 ProductCards */}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                  Оптимальные сплит-системы под ваши критерии:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matchedProducts.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onOrderInstall={handleOrderInstall}
                      onCheckFit={handleExpertConsultation}
                    />
                  ))}
                </div>
              </div>

              {/* CTA Block: Получить точный подбор специалиста */}
              <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                <div className="space-y-1 text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl font-black">
                    Нужен точный расчёт под вашу задачу?
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm max-w-lg leading-relaxed">
                    Специалист свяжется с вами, ответит на любые технические вопросы и назовёт фиксированную цену установки.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                  <button
                    onClick={handleExpertConsultation}
                    className="w-full sm:w-auto py-3.5 px-6 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-blue-500/30"
                  >
                    Получить точный подбор специалиста
                  </button>
                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto py-3.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs transition"
                  >
                    Сбросить
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
