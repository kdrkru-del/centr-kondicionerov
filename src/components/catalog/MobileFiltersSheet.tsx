'use client';

import React, { useState, useEffect } from 'react';
import { X, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';

interface MobileFiltersSheetProps {
  isOpen: boolean;
  onClose: () => void;
  brands: { slug: string; name: string; count: number }[];
  selectedBrands: string[];
  onToggleBrand: (slug: string) => void;
  selectedCompressor: 'all' | 'inverter' | 'on-off';
  onSelectCompressor: (val: 'all' | 'inverter' | 'on-off') => void;
  areaOptions: { id: string; label: string }[];
  selectedArea: string;
  onSelectArea: (id: string) => void;
  priceRanges: { id: string; label: string }[];
  selectedPriceRange: string;
  onSelectPriceRange: (id: string) => void;
  onlyWithInstallation: boolean;
  onToggleWithInstallation: () => void;
  onlyKnownPrice: boolean;
  onToggleKnownPrice: () => void;
  onlyHits: boolean;
  onToggleHits: () => void;
  onlyFavorites: boolean;
  onToggleFavorites: () => void;
  filteredCount: number;
  totalCount: number;
  onResetAll: () => void;
}

export const MobileFiltersSheet: React.FC<MobileFiltersSheetProps> = ({
  isOpen,
  onClose,
  brands,
  selectedBrands,
  onToggleBrand,
  selectedCompressor,
  onSelectCompressor,
  areaOptions,
  selectedArea,
  onSelectArea,
  priceRanges,
  selectedPriceRange,
  onSelectPriceRange,
  onlyWithInstallation,
  onToggleWithInstallation,
  onlyKnownPrice,
  onToggleKnownPrice,
  onlyHits,
  onToggleHits,
  onlyFavorites,
  onToggleFavorites,
  filteredCount,
  onResetAll
}) => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    brand: true,
    compressor: true,
    area: true,
    price: true,
    additional: true
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Фильтры каталога"
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-h-[88vh] bg-white rounded-t-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <div>
            <h2 className="text-lg font-black text-[#0B1F33]">Фильтры каталога</h2>
            <p className="text-xs text-slate-400">Найдено: {filteredCount} моделей</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition"
            aria-label="Закрыть фильтры"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Accordion content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Section: Brand */}
          <div className="border border-slate-200/80 rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('brand')}
              className="w-full px-4 py-3 bg-slate-50/80 flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider"
            >
              <span>Бренд</span>
              {openSections.brand ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openSections.brand && (
              <div className="p-4 space-y-2.5 bg-white">
                {brands.map((b) => {
                  const isChecked = selectedBrands.includes(b.slug);
                  return (
                    <label
                      key={b.slug}
                      className="flex items-center justify-between text-xs font-medium text-slate-700 cursor-pointer"
                    >
                      <div className="flex items-center space-x-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => onToggleBrand(b.slug)}
                          className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                        />
                        <span className={isChecked ? 'font-bold text-blue-600' : ''}>{b.name}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-bold">
                        {b.count}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section: Compressor */}
          <div className="border border-slate-200/80 rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('compressor')}
              className="w-full px-4 py-3 bg-slate-50/80 flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider"
            >
              <span>Тип компрессора</span>
              {openSections.compressor ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openSections.compressor && (
              <div className="p-4 flex gap-2 bg-white">
                {[
                  { id: 'all', label: 'Все' },
                  { id: 'inverter', label: 'Инвертор' },
                  { id: 'on-off', label: 'On/Off' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectCompressor(item.id as any)}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                      selectedCompressor === item.id
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Section: Area */}
          <div className="border border-slate-200/80 rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('area')}
              className="w-full px-4 py-3 bg-slate-50/80 flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider"
            >
              <span>Площадь помещения</span>
              {openSections.area ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openSections.area && (
              <div className="p-4 grid grid-cols-2 gap-2 bg-white">
                {areaOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onSelectArea(opt.id)}
                    className={`py-2 px-3 text-xs font-bold rounded-xl transition text-center ${
                      selectedArea === opt.id
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Section: Price */}
          <div className="border border-slate-200/80 rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('price')}
              className="w-full px-4 py-3 bg-slate-50/80 flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider"
            >
              <span>Бюджет</span>
              {openSections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openSections.price && (
              <div className="p-4 space-y-2 bg-white">
                {priceRanges.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => onSelectPriceRange(r.id)}
                    className={`w-full py-2 px-3 text-xs font-bold rounded-xl transition text-left ${
                      selectedPriceRange === r.id
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Section: Additional */}
          <div className="border border-slate-200/80 rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('additional')}
              className="w-full px-4 py-3 bg-slate-50/80 flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider"
            >
              <span>Дополнительно</span>
              {openSections.additional ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openSections.additional && (
              <div className="p-4 space-y-3 bg-white text-xs">
                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyWithInstallation}
                    onChange={onToggleWithInstallation}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                  />
                  <span className={onlyWithInstallation ? 'font-bold text-blue-600' : 'text-slate-700'}>
                    С установкой под ключ
                  </span>
                </label>

                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyKnownPrice}
                    onChange={onToggleKnownPrice}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                  />
                  <span className={onlyKnownPrice ? 'font-bold text-blue-600' : 'text-slate-700'}>
                    Только с известной ценой
                  </span>
                </label>

                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyHits}
                    onChange={onToggleHits}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                  />
                  <span className={onlyHits ? 'font-bold text-blue-600' : 'text-slate-700'}>
                    Хит продаж
                  </span>
                </label>

                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyFavorites}
                    onChange={onToggleFavorites}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                  />
                  <span className={onlyFavorites ? 'font-bold text-blue-600' : 'text-slate-700'}>
                    Только избранное
                  </span>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="p-4 border-t border-slate-100 bg-white flex items-center space-x-3 shrink-0">
          <button
            type="button"
            onClick={onResetAll}
            className="py-3 px-4 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 font-bold text-xs transition flex items-center justify-center space-x-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Сбросить</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shadow-md shadow-blue-500/20 text-center"
          >
            Показать {filteredCount} моделей
          </button>
        </div>
      </div>
    </div>
  );
};
