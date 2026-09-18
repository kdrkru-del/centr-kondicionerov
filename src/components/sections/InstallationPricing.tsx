'use client';

import React, { useState } from 'react';
import { Calculator, Check, ArrowRight, ShieldCheck, HelpCircle, Wrench } from 'lucide-react';

interface InstallationPricingProps {
  onOpenModal: (productName?: string, source?: string) => void;
}

export const InstallationPricing: React.FC<InstallationPricingProps> = ({ onOpenModal }) => {
  const [selectedBase, setSelectedBase] = useState<'amston' | 'dahatsu' | 'other'>('amston');
  const [extraOptions, setExtraOptions] = useState<{
    extraTrack: boolean;
    strobe: boolean;
    highAltitude: boolean;
    dismantle: boolean;
  }>({
    extraTrack: false,
    strobe: false,
    highAltitude: false,
    dismantle: false
  });

  const baseSolutions = [
    {
      id: 'amston' as const,
      name: 'Amston Reykjavik ASH-07',
      label: 'Amston ASH-07',
      price: '32 900 ₽',
      desc: 'Кондиционер + профессиональный монтаж под ключ'
    },
    {
      id: 'dahatsu' as const,
      name: 'Dahatsu "Legend" 07',
      label: 'Dahatsu Legend 07',
      price: '48 000 ₽',
      desc: 'Инверторный кондиционер 20 м² + монтаж под ключ'
    },
    {
      id: 'other' as const,
      name: 'Другая модель из каталога',
      label: 'Другая модель',
      price: 'по расчету',
      desc: 'MDV, Amston, Hunberg, Dahatsu под площадь помещения'
    }
  ];

  const hasExtra = Object.values(extraOptions).some(Boolean);

  return (
    <section id="installation" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Установка под ключ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Кондиционеры с установкой под ключ
          </h2>
          <p className="text-slate-500 text-base mt-2">
            Фиксированные подтвержденные цены на популярные комплекты и прозрачный расчет индивидуальных условий.
          </p>
        </div>

        {/* Pricing Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Configurator */}
          <div className="lg:col-span-7 bg-slate-50/90 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Параметры установки
              </h3>
              <p className="text-xs text-slate-500">
                Выберите готовое решение с монтажом или укажите дополнительные работы
              </p>
            </div>

            {/* Model selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                1. Базовый комплект кондиционера с установкой
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {baseSolutions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedBase(item.id)}
                    className={`p-3.5 rounded-2xl text-left border transition ${
                      selectedBase === item.id
                        ? 'bg-white border-blue-600 ring-2 ring-blue-500/20 shadow-sm'
                        : 'bg-white/60 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-xs sm:text-sm text-slate-900">{item.label}</div>
                    <div className="text-xs font-black text-blue-600 mt-1">{item.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Additional options checkboxes */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                2. Требуется дополнительная работа?
              </label>
              <div className="space-y-2">
                {[
                  { key: 'extraTrack' as const, label: 'Увеличенная длина трассы (свыше стандартной)' },
                  { key: 'strobe' as const, label: 'Штробление стены под трассу (во время ремонта)' },
                  { key: 'dismantle' as const, label: 'Демонтаж старого кондиционера' },
                  { key: 'highAltitude' as const, label: 'Сложный высотный доступ / работа с лестницы' }
                ].map((opt) => (
                  <label
                    key={opt.key}
                    className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/70 hover:border-slate-300 cursor-pointer text-xs"
                  >
                    <div className="flex items-center space-x-2.5">
                      <input
                        type="checkbox"
                        checked={extraOptions[opt.key]}
                        onChange={(e) =>
                          setExtraOptions({ ...extraOptions, [opt.key]: e.target.checked })
                        }
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                      />
                      <span className="text-slate-700 font-medium">{opt.label}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">Стоимость рассчитает специалист</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Price Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-7 sm:p-9 shadow-2xl space-y-6">
            <div>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold rounded-full uppercase tracking-wider">
                Условия под ключ
              </span>
              <h3 className="text-2xl font-black mt-2 text-white">
                Стоимость с установкой
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {selectedBase === 'amston' && 'Amston Reykjavik ASH-07 с профессиональным монтажом'}
                {selectedBase === 'dahatsu' && 'Dahatsu Legend 07 инвертор с профессиональным монтажом'}
                {selectedBase === 'other' && 'Любая выбранная модель кондиционера с расчетом установки'}
              </p>
            </div>

            <div className="space-y-3.5 text-sm border-t border-slate-700/80 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Базовый комплект с установкой:</span>
                <span className="font-bold text-white">
                  {baseSolutions.find((b) => b.id === selectedBase)?.price}
                </span>
              </div>

              {hasExtra && (
                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
                  <div className="text-xs font-bold text-amber-300 flex items-center space-x-1.5">
                    <span>⚠️</span>
                    <span>Выбраны дополнительные работы</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Стоимость рассчитает специалист после уточнения параметров объекта.
                  </p>
                </div>
              )}
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700">
              <div className="text-xs text-slate-400 mb-1">Итоговая стоимость:</div>
              <div className="text-3xl font-black text-blue-400">
                {selectedBase === 'other'
                  ? 'По расчету'
                  : hasExtra
                  ? `${baseSolutions.find((b) => b.id === selectedBase)?.price} + расчет доп. работ`
                  : baseSolutions.find((b) => b.id === selectedBase)?.price}
              </div>
              <div className="text-[11px] text-slate-400 mt-2 flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Оплата после выполнения. Гарантия до 4-х лет.</span>
              </div>
            </div>

            <button
              onClick={() =>
                onOpenModal(
                  `Расчет монтажа: ${baseSolutions.find((b) => b.id === selectedBase)?.name}${
                    hasExtra ? ' (с доп. работами)' : ''
                  }`,
                  'Калькулятор установки'
                )
              }
              className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white font-bold rounded-2xl shadow-lg shadow-blue-600/30 transition text-sm sm:text-base flex items-center justify-center space-x-2"
            >
              <span>Получить расчет специалиста</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
