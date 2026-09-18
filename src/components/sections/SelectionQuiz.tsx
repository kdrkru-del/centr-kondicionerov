'use client';

import React, { useState, useMemo } from 'react';
import { Product } from '@/types';
import { ProductCard } from '@/components/catalog/ProductCard';
import { Sparkles, ArrowRight, RotateCcw, CheckCircle2 } from 'lucide-react';

interface SelectionQuizProps {
  products: Product[];
  onOrderInstall: (product: Product) => void;
  onCheckFit: (product: Product) => void;
}

export const SelectionQuiz: React.FC<SelectionQuizProps> = ({
  products,
  onOrderInstall,
  onCheckFit
}) => {
  const [step, setStep] = useState(1);
  const [area, setArea] = useState<string>('20-25');
  const [roomType, setRoomType] = useState<string>('apartment');
  const [priority, setPriority] = useState<string>('optimal');

  const areaOptions = [
    { value: 'under-20', label: 'до 20 м²', desc: 'Спальня, детская, небольшая кухня' },
    { value: '20-25', label: '20–25 м²', desc: 'Стандартная жилая комната' },
    { value: '25-35', label: '25–35 м²', desc: 'Гостиная, просторная спальня или студия' },
    { value: '35-50', label: '35–50 м²', desc: 'Большая кухня-гостиная, зал в доме' },
    { value: '50-70', label: '50–70 м²', desc: 'Квартира целиком, просторный офис' },
    { value: 'over-70', label: '70+ м²', desc: 'Коттеджи, коммерческие помещения' }
  ];

  const roomTypeOptions = [
    { value: 'apartment', label: 'Квартира', icon: '🏢' },
    { value: 'house', label: 'Частный дом / Коттедж', icon: '🏡' },
    { value: 'office', label: 'Офис', icon: '💼' },
    { value: 'commercial', label: 'Коммерческое помещение', icon: '🏪' }
  ];

  const priorityOptions = [
    {
      value: 'price',
      label: 'Минимальная цена',
      desc: 'Доступные классические On/Off модели без переплат за лишние опции'
    },
    {
      value: 'inverter',
      label: 'Инвертор',
      desc: 'Экономия электроэнергии до 40%, плавная регулировка и тихий ночной режим'
    },
    {
      value: 'optimal',
      label: 'Оптимальный вариант',
      desc: 'Идеальный баланс цены, надёжности и комфортного микроклимата'
    },
    {
      value: 'premium',
      label: 'Премиальный вариант',
      desc: 'Максимальный комфорт, УФ-очистка воздуха, работа на обогрев до -25°C'
    }
  ];

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
  const recommendedProducts = useMemo(() => {
    let list = [...products];

    // Filter by priority
    if (priority === 'price') {
      list.sort((a, b) => {
        const aVal = a.priceWithInstallation ?? a.price ?? 999999;
        const bVal = b.priceWithInstallation ?? b.price ?? 999999;
        return aVal - bVal;
      });
    } else if (priority === 'inverter') {
      list = list.filter((p) => p.compressorType === 'Inverter');
      if (list.length === 0) list = products;
    } else if (priority === 'premium') {
      const prem = list.filter((p) => p.category === 'premium');
      if (prem.length > 0) list = prem;
    } else {
      // optimal: prefer Inverters & hits
      list.sort((a, b) => (b.isHit ? 1 : 0) - (a.isHit ? 1 : 0));
    }

    // Filter by area
    const areaFiltered = list.filter((p) => checkAreaOverlap(p, area));
    if (areaFiltered.length > 0) {
      list = areaFiltered;
    }

    // fallback
    if (list.length === 0) list = products;
    return list.slice(0, 3);
  }, [products, area, roomType, priority]);

  const handleReset = () => {
    setStep(1);
    setArea('20-25');
    setRoomType('apartment');
    setPriority('optimal');
  };

  return (
    <section id="quiz" className="py-16 sm:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Интерактивный мастер</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Подберём кондиционер за 30 секунд
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            Ответьте на 3 простых вопроса — алгоритм выберет оптимальные модели из наличия на складе.
          </p>
        </div>

        {/* Quiz Box */}
        <div className="bg-slate-50/80 rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg">
          {/* Step Progress */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-200/80">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center space-x-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
                    step === num
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : step > num
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white text-slate-400 border border-slate-200'
                  }`}
                >
                  {step > num ? '✓' : num}
                </div>
                <span className="hidden sm:inline text-xs font-medium text-slate-700">
                  {num === 1 ? 'Площадь' : num === 2 ? 'Помещение' : 'Приоритет'}
                </span>
              </div>
            ))}
          </div>

          {/* Step 1: Area */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-900">
                Шаг 1 из 3: Какая ориентировочная площадь помещения?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {areaOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setArea(opt.value)}
                    className={`p-4 rounded-2xl text-left border transition min-h-[50px] ${
                      area === opt.value
                        ? 'bg-white border-blue-600 ring-2 ring-blue-500/30 shadow-md'
                        : 'bg-white/70 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-slate-900 text-base">{opt.label}</div>
                    <div className="text-xs text-slate-500 mt-1">{opt.desc}</div>
                  </button>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition shadow-lg shadow-blue-500/25 flex items-center space-x-2"
                >
                  <span>Следующий шаг</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Room Type */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-900">
                Шаг 2 из 3: В какое помещение планируется установка?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {roomTypeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setRoomType(opt.value)}
                    className={`p-4 rounded-2xl text-left border transition flex items-center space-x-3 min-h-[50px] ${
                      roomType === opt.value
                        ? 'bg-white border-blue-600 ring-2 ring-blue-500/30 shadow-md'
                        : 'bg-white/70 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    <div className="font-bold text-slate-900 text-base">{opt.label}</div>
                  </button>
                ))}
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3 text-slate-600 hover:text-slate-900 text-sm font-medium"
                >
                  ← Назад
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition shadow-lg shadow-blue-500/25 flex items-center space-x-2"
                >
                  <span>Следующий шаг</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Priority */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-900">
                Шаг 3 из 3: Что для вас важнее всего при выборе?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {priorityOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setPriority(opt.value)}
                    className={`p-4 rounded-2xl text-left border transition min-h-[50px] ${
                      priority === opt.value
                        ? 'bg-white border-blue-600 ring-2 ring-blue-500/30 shadow-md'
                        : 'bg-white/70 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-slate-900 text-base">{opt.label}</div>
                    <div className="text-xs text-slate-500 mt-1">{opt.desc}</div>
                  </button>
                ))}
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-3 text-slate-600 hover:text-slate-900 text-sm font-medium"
                >
                  ← Назад
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm transition shadow-lg shadow-emerald-500/25 flex items-center space-x-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Показать результат</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Results */}
          {step === 4 && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-slate-200 gap-4">
                <div>
                  <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Подбор завершён</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">
                    Рекомендованные модели под ваши параметры
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    С учетом площади помещения и приоритета ({priorityOptions.find((p) => p.value === priority)?.label})
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 py-2 px-3 bg-white rounded-xl border border-slate-200 transition shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Пройти заново</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOrderInstall={onOrderInstall}
                    onCheckFit={onCheckFit}
                  />
                ))}
              </div>

              {/* Engineering confirmation disclaimer & Expert consultation CTA */}
              <div className="mt-8 p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-amber-900 flex items-center space-x-1.5">
                    <span>⚠️</span>
                    <span>Важно: точную мощность рекомендуем подтвердить перед заказом</span>
                  </div>
                  <p className="text-xs text-amber-800/90 leading-relaxed">
                    На итоговый выбор влияют солнечная сторона окон, высота потолков, этаж и количество людей или техники в помещении.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const targetProduct = recommendedProducts[0] || products[0];
                    if (targetProduct) {
                      onCheckFit(targetProduct);
                    }
                  }}
                  className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs sm:text-sm transition shadow-md shadow-blue-500/20 shrink-0 text-center"
                >
                  Получить точный подбор специалиста
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
