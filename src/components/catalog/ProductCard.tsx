'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useFavorites } from '@/context/FavoritesContext';
import { useCompare } from '@/context/CompareContext';
import {
  Wrench,
  Sparkles,
  Heart,
  Scale,
  Eye,
  ArrowRight,
  MessageSquare,
  Check
} from 'lucide-react';
import { getAssetUrl } from '@/utils/asset';

interface ProductCardProps {
  product: Product;
  onOrderInstall: (product: Product) => void;
  onCheckFit?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  viewMode?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOrderInstall,
  onCheckFit,
  onQuickView,
  viewMode = 'grid'
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isInCompare, toggleCompare, canCompare = true } = useCompare() as any;

  const favorite = isFavorite(product.slug);
  const compared = isInCompare(product.slug);
  const isSeries = product.itemType === 'series';

  const formatPrice = (val: number) => new Intl.NumberFormat('ru-RU').format(val);

  // Area calculation
  const areaLabel = product.area
    ? `до ${product.area} м²`
    : product.seriesAreaRange
    ? product.seriesAreaRange
    : 'Площадь по запросу';

  const areaBadge = product.area
    ? `${product.area} м²`
    : product.seriesAreaRange
    ? `Серия ${product.seriesAreaRange.replace('кв.м', 'м²').replace('от ', '')}`
    : 'Серия';

  // ============================================================
  // LIST VIEW MODE (Compact horizontal layout for Desktop)
  // ============================================================
  if (viewMode === 'list') {
    return (
      <div className="group relative bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 hover:border-blue-400/80 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_-6px_rgba(43,140,255,0.12)] hover:-translate-y-1 transition-all duration-300 p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
        {/* Left: Image */}
        <div className="relative w-full sm:w-48 h-40 shrink-0 bg-slate-50/70 rounded-2xl flex items-center justify-center p-3 border border-slate-100">
          <Link href={`/catalog/${product.slug}`} className="relative w-full h-full block">
            <Image
              src={getAssetUrl(product.image)}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, 200px"
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Badges in list */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.badge && (
              <span className="px-2 py-0.5 bg-amber-500 text-white text-[10px] font-black rounded-md uppercase tracking-wider">
                {product.badge}
              </span>
            )}
            {isSeries && (
              <span className="px-2 py-0.5 bg-slate-200 text-slate-800 text-[10px] font-bold rounded-md uppercase tracking-wider">
                СЕРИЯ
              </span>
            )}
          </div>
        </div>

        {/* Center: Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-xs font-black uppercase tracking-wider text-blue-600">
              {product.brand}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-medium truncate">
              {product.series}
            </span>
          </div>

          <Link href={`/catalog/${product.slug}`}>
            <h3 className="text-base sm:text-lg font-black text-[#0B1F33] hover:text-blue-600 transition leading-snug">
              {product.shortName || product.name}
            </h3>
          </Link>

          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-600">
            <span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-semibold rounded-lg">
              {areaLabel}
            </span>
            <span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-semibold rounded-lg">
              {product.compressorType === 'Inverter' ? 'Инвертор' : 'On-Off'}
            </span>
          </div>
        </div>

        {/* Right: Pricing & CTA */}
        <div className="sm:w-64 shrink-0 flex flex-col justify-between sm:border-l sm:border-slate-100 sm:pl-6 pt-3 sm:pt-0 border-t border-slate-100 sm:border-t-0">
          <div className="mb-3">
            {isSeries ? (
              <div>
                <div className="text-[11px] text-slate-400">Стоимость серии:</div>
                <div className="text-xl font-black text-[#0B1F33]">
                  {product.price ? `от ${formatPrice(product.price)} ₽` : 'По запросу'}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Точный подбор по площади</div>
              </div>
            ) : product.priceWithInstallation ? (
              <div>
                <div className="text-xs font-bold text-blue-700 flex items-center space-x-1">
                  <Wrench className="w-3 h-3 text-blue-600" />
                  <span>С установкой:</span>
                </div>
                <div className="text-2xl font-black text-blue-600">
                  {formatPrice(product.priceWithInstallation)} ₽
                </div>
                {product.price && (
                  <div className="text-[11px] text-slate-500">
                    Оборудование: {formatPrice(product.price)} ₽
                  </div>
                )}
              </div>
            ) : product.price ? (
              <div>
                <div className="text-[11px] text-slate-400">Оборудование:</div>
                <div className="text-2xl font-black text-[#0B1F33]">
                  {product.priceFrom ? 'от ' : ''}{formatPrice(product.price)} ₽
                </div>
              </div>
            ) : (
              <div>
                <div className="text-[11px] text-slate-400">Цена:</div>
                <div className="text-xl font-black text-slate-700">По запросу</div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => onOrderInstall(product)}
              className="flex-1 py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition flex items-center justify-center space-x-1 shadow-sm"
            >
              <span>{isSeries ? 'Подобрать' : 'С установкой'}</span>
            </button>
            <Link
              href={`/catalog/${product.slug}`}
              className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
            >
              Подробнее
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // GRID VIEW MODE (Standard Card)
  // ============================================================
  return (
    <div className="group relative bg-white rounded-3xl border border-slate-200/90 hover:border-blue-400/80 shadow-[0_4px_18px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_32px_-8px_rgba(43,140,255,0.14)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Top Floating Controls: Badges (left) and Actions (right) */}
      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-20 pointer-events-none">
        {/* Left: Badges */}
        <div className="flex flex-wrap gap-1.5 pointer-events-auto">
          {(product.badge || product.isHit) && (
            <span className="px-2.5 py-1 bg-amber-500 text-white text-[10px] font-black rounded-lg uppercase tracking-wider shadow-xs flex items-center space-x-1">
              <Sparkles className="w-3 h-3" />
              <span>{product.badge || 'ХИТ ПРОДАЖ'}</span>
            </span>
          )}

          <span
            className={`px-2.5 py-1 text-white text-[10px] font-black rounded-lg uppercase tracking-wider shadow-xs ${
              product.compressorType === 'Inverter' ? 'bg-blue-600' : 'bg-slate-700'
            }`}
          >
            {product.compressorType === 'Inverter' ? 'INVERTER' : 'ON/OFF'}
          </span>

          {isSeries && (
            <span className="px-2 py-1 bg-slate-100 text-slate-700 text-[10px] font-bold rounded-lg border border-slate-200 uppercase tracking-wider">
              СЕРИЯ
            </span>
          )}
        </div>

        {/* Right: Favorite & Compare buttons */}
        <div className="flex items-center space-x-1 pointer-events-auto">
          {/* Compare toggle (only for products) */}
          {!isSeries && (
            <button
              type="button"
              onClick={() => toggleCompare(product.slug)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition backdrop-blur-md shadow-xs ${
                compared
                  ? 'bg-blue-600 text-white shadow-blue-500/30'
                  : 'bg-white/90 text-slate-400 hover:text-blue-600 hover:bg-white border border-slate-200/70'
              }`}
              title={compared ? 'Удалить из сравнения' : 'Добавить к сравнению'}
              aria-label={compared ? 'Удалить из сравнения' : 'Добавить к сравнению'}
            >
              {compared ? <Check className="w-3.5 h-3.5" /> : <Scale className="w-3.5 h-3.5" />}
            </button>
          )}

          {/* Favorite button */}
          <button
            type="button"
            onClick={() => toggleFavorite(product.slug)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition backdrop-blur-md shadow-xs ${
              favorite
                ? 'bg-red-50 text-red-500 border border-red-200'
                : 'bg-white/90 text-slate-400 hover:text-red-500 hover:bg-white border border-slate-200/70'
            }`}
            title={favorite ? 'Удалить из избранного' : 'Добавить в избранное'}
            aria-label={favorite ? 'Удалить из избранного' : 'Добавить в избранное'}
          >
            <Heart className={`w-4 h-4 ${favorite ? 'fill-red-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Product Image Area (~35-40% height) */}
      <div className="relative pt-12 pb-3 px-6 bg-gradient-to-b from-slate-50/70 to-white flex items-center justify-center min-h-[190px] sm:min-h-[210px] group/img">
        <Link href={`/catalog/${product.slug}`} className="relative w-full h-40 sm:h-44 block focus:outline-none">
          <Image
            src={getAssetUrl(product.image)}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain transition-transform duration-500 group-hover/img:scale-105"
          />
        </Link>

        {/* Desktop Quick View Overlay Button */}
        {onQuickView && (
          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="hidden sm:flex absolute bottom-2.5 px-3 py-1.5 bg-white/95 hover:bg-white text-slate-700 text-xs font-bold rounded-xl shadow-md border border-slate-200 items-center space-x-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:text-blue-600 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Быстрый просмотр</span>
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="p-5 sm:p-6 pt-2 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand uppercase + Area tag */}
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-black uppercase tracking-wider text-blue-600">
              {product.brand}
            </span>
            <span className="text-[11px] font-semibold text-slate-600 bg-slate-100/90 px-2 py-0.5 rounded-md border border-slate-200/50">
              {areaBadge}
            </span>
          </div>

          {/* Model Name */}
          <Link href={`/catalog/${product.slug}`} className="block">
            <h3 className="text-base sm:text-lg font-black text-[#0B1F33] group-hover:text-blue-600 transition leading-snug line-clamp-2">
              {product.shortName || product.name}
            </h3>
          </Link>

          {/* Truthful Specs Details */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">
                {isSeries ? 'Диапазон серии:' : 'Площадь:'}
              </span>
              <span className="font-semibold text-slate-800">{areaLabel}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Компрессор:</span>
              <span className="font-semibold text-slate-800">
                {product.compressorType === 'Inverter' ? 'Инверторный' : 'Классический (On-Off)'}
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Block */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          {isSeries ? (
            /* SERIES CARD PRICING */
            <div className="mb-3.5">
              <div className="text-[11px] text-slate-400">Стоимость серии:</div>
              <div className="text-xl sm:text-2xl font-black text-[#0B1F33] leading-tight mt-0.5">
                {product.price ? `от ${formatPrice(product.price)} ₽` : 'По запросу'}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Подберём точную модель под вашу площадь
              </div>
            </div>
          ) : product.priceWithInstallation ? (
            /* PRODUCT WITH INSTALLATION PRICING */
            <div className="mb-3.5">
              <div className="flex items-baseline justify-between text-xs text-slate-500 mb-1.5">
                <span>Цена кондиционера:</span>
                <span className="font-bold text-slate-700">
                  {product.price ? `${formatPrice(product.price)} ₽` : 'по запросу'}
                </span>
              </div>

              {/* Turnkey price prominent */}
              <div className="bg-blue-50/80 rounded-2xl p-2.5 sm:p-3 border border-blue-100/90 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-blue-700 flex items-center space-x-1">
                    <Wrench className="w-3 h-3 text-blue-600" />
                    <span>С установкой:</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-blue-600 leading-tight mt-0.5">
                    {formatPrice(product.priceWithInstallation)} ₽
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-white text-blue-700 px-2 py-0.5 rounded-lg border border-blue-200/80 uppercase shadow-2xs">
                  Под ключ
                </span>
              </div>
            </div>
          ) : product.price ? (
            /* PRODUCT EQUIPMENT PRICE ONLY */
            <div className="mb-3.5">
              <div className="text-[11px] text-slate-400">
                {product.priceFrom ? 'Цена от:' : 'Цена кондиционера:'}
              </div>
              <div className="text-xl sm:text-2xl font-black text-[#0B1F33] leading-tight mt-0.5">
                {product.priceFrom ? 'от ' : ''}{formatPrice(product.price)} ₽
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Монтаж рассчитывается по объекту
              </div>
            </div>
          ) : (
            /* PRICE UNKNOWN */
            <div className="mb-3.5 py-1">
              <div className="text-[11px] text-slate-400">Цена:</div>
              <div className="text-xl font-black text-slate-700 leading-tight mt-0.5">
                По запросу
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Уточняйте наличие и цену у специалиста
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => onOrderInstall(product)}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold rounded-2xl text-xs sm:text-sm transition shadow-md shadow-blue-500/20 flex items-center justify-center space-x-1.5 min-h-[44px]"
            >
              <Wrench className="w-4 h-4" />
              <span>{isSeries ? 'Подобрать модель' : 'С установкой'}</span>
            </button>

            <div className="flex items-center space-x-2">
              <Link
                href={`/catalog/${product.slug}`}
                className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs text-center transition min-h-[36px] flex items-center justify-center"
              >
                {isSeries ? 'Подробнее о серии' : 'Подробнее'}
              </Link>

              {onCheckFit && (
                <button
                  type="button"
                  onClick={() => onCheckFit(product)}
                  className="py-2 px-3 text-slate-500 hover:text-blue-600 hover:bg-blue-50/60 font-medium rounded-xl text-xs transition border border-transparent hover:border-blue-100 min-h-[36px] flex items-center space-x-1"
                  title="Задать вопрос специалисту"
                  aria-label="Задать вопрос специалисту"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Консультация</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
