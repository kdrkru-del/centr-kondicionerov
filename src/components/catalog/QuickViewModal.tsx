'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { X, Wrench, Shield, CheckCircle, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import { getAssetUrl } from '@/utils/asset';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onOrderInstall: (product: Product) => void;
  onCheckFit?: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onOrderInstall,
  onCheckFit
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const formatPrice = (val: number) => new Intl.NumberFormat('ru-RU').format(val);
  const isSeries = product.itemType === 'series';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Быстрый просмотр: ${product.name}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100/90 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition"
          aria-label="Закрыть быстрое окно"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            {/* Image Column */}
            <div className="sm:col-span-5 relative h-56 sm:h-72 bg-gradient-to-b from-slate-50 to-white rounded-2xl border border-slate-100 flex items-center justify-center p-4">
              <Image
                src={getAssetUrl(product.image)}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, 300px"
                className="object-contain p-2"
              />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1">
                {product.badge && (
                  <span className="px-2 py-0.5 bg-amber-500 text-white text-[10px] font-black rounded uppercase tracking-wider flex items-center space-x-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>{product.badge}</span>
                  </span>
                )}
                <span
                  className={`px-2 py-0.5 text-white text-[10px] font-black rounded uppercase tracking-wider ${
                    product.compressorType === 'Inverter' ? 'bg-blue-600' : 'bg-slate-700'
                  }`}
                >
                  {product.compressorType === 'Inverter' ? 'INVERTER' : 'ON/OFF'}
                </span>
                {isSeries && (
                  <span className="px-2 py-0.5 bg-slate-200 text-slate-800 text-[10px] font-bold rounded uppercase tracking-wider">
                    СЕРИЯ
                  </span>
                )}
              </div>
            </div>

            {/* Info Column */}
            <div className="sm:col-span-7 flex flex-col justify-between">
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-blue-600 mb-1">
                  {product.brand}
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#0B1F33] leading-tight mb-3">
                  {product.name}
                </h2>

                {/* Specs Box */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60 space-y-2 text-xs mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Тип компрессора:</span>
                    <span className="font-bold text-slate-800">
                      {product.compressorType === 'Inverter' ? 'Инвертор (DC Inverter)' : 'Классический (On-Off)'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">
                      {isSeries ? 'Диапазон площади серии:' : 'Площадь помещения:'}
                    </span>
                    <span className="font-bold text-blue-600">
                      {product.area
                        ? `${product.area} м²`
                        : product.seriesAreaRange
                        ? product.seriesAreaRange
                        : 'Уточняйте у специалиста'}
                    </span>
                  </div>

                  {product.series && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Линейка:</span>
                      <span className="font-semibold text-slate-700">{product.series}</span>
                    </div>
                  )}
                </div>

                {/* Pricing Display */}
                {isSeries ? (
                  <div className="bg-blue-50/60 rounded-2xl p-4 border border-blue-100 mb-6">
                    <div className="text-xs text-slate-500">Стоимость оборудования серии:</div>
                    <div className="text-xl sm:text-2xl font-black text-[#0B1F33] mt-0.5">
                      {product.price ? `от ${formatPrice(product.price)} ₽` : 'По запросу'}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                      Точную стоимость модели под вашу площадь рассчитает специалист компании.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 mb-6">
                    {product.priceWithInstallation ? (
                      <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200/80 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-blue-800 flex items-center space-x-1">
                            <Wrench className="w-3.5 h-3.5 text-blue-600" />
                            <span>С установкой под ключ:</span>
                          </div>
                          <div className="text-2xl font-black text-blue-600 mt-0.5">
                            {formatPrice(product.priceWithInstallation)} ₽
                          </div>
                        </div>
                        {product.price && (
                          <div className="text-right">
                            <div className="text-[11px] text-slate-400">Без монтажа:</div>
                            <div className="text-sm font-bold text-slate-700">
                              {formatPrice(product.price)} ₽
                            </div>
                          </div>
                        )}
                      </div>
                    ) : product.price ? (
                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                        <div className="text-xs text-slate-500">
                          {product.priceFrom ? 'Цена от:' : 'Цена кондиционера:'}
                        </div>
                        <div className="text-2xl font-black text-[#0B1F33] mt-0.5">
                          {product.priceFrom ? 'от ' : ''}{formatPrice(product.price)} ₽
                        </div>
                        <div className="text-[11px] text-slate-400 mt-1">
                          Монтаж рассчитывается по объекту
                        </div>
                      </div>
                    ) : (
                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                        <div className="text-xs text-slate-500">Цена:</div>
                        <div className="text-xl font-black text-slate-700 mt-0.5">По запросу</div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOrderInstall(product);
                  }}
                  className="w-full py-3 px-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-sm transition flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/20"
                >
                  <Wrench className="w-4 h-4" />
                  <span>{isSeries ? 'Подобрать модель под площадь' : 'Заказать с установкой'}</span>
                </button>

                <div className="flex items-center space-x-2">
                  <Link
                    href={`/catalog/${product.slug}`}
                    onClick={onClose}
                    className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-xs text-center transition flex items-center justify-center space-x-1"
                  >
                    <span>Перейти на страницу товара</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {onCheckFit && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onCheckFit(product);
                      }}
                      className="py-2.5 px-4 border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 font-medium rounded-2xl text-xs transition flex items-center space-x-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Задать вопрос</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
