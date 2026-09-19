'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useModal } from '@/components/providers/ModalProvider';
import { useFavorites } from '@/context/FavoritesContext';
import { useCompare } from '@/context/CompareContext';
import { ProductCard } from '@/components/catalog/ProductCard';
import { InstallationIncluded } from '@/components/sections/InstallationIncluded';
import {
  Wrench,
  ShieldCheck,
  CheckCircle2,
  Maximize2,
  ChevronRight,
  Calendar,
  CreditCard,
  Sparkles,
  MessageSquare,
  Heart,
  Scale,
  Phone,
  ArrowRight
} from 'lucide-react';
import { getAssetUrl } from '@/utils/asset';

interface Props {
  product: Product;
  similarProducts: Product[];
}

function trackEvent(name: string, props: Record<string, unknown>) {
  if (typeof window !== 'undefined') {
    try {
      console.info('[analytics]', name, props);
    } catch {}
  }
}

export const ProductDetailClient: React.FC<Props> = ({ product, similarProducts }) => {
  const { openModal } = useModal();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { toggleCompare, isInCompare } = useCompare();
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [isStickyVisible, setIsStickyVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('product-hero');
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsStickyVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    trackEvent('product_view', {
      slug: product.slug,
      brand: product.brand,
      series: product.series,
      model: product.model,
      price: product.price,
      priceWithInstallation: product.priceWithInstallation,
      itemType: product.itemType
    });
  }, [product]);

  const formatPrice = (val: number) => new Intl.NumberFormat('ru-RU').format(val) + ' ₽';

  const equipmentPrice = product.price
    ? `${product.priceFrom ? 'от ' : ''}${formatPrice(product.price)}`
    : null;

  const installPrice = product.priceWithInstallation
    ? formatPrice(product.priceWithInstallation)
    : null;

  // Dynamic CTA label based strictly on confirmed data
  const ctaLabel = installPrice
    ? 'Заказать с установкой'
    : equipmentPrice
    ? 'Уточнить стоимость установки'
    : 'Узнать цену';

  // Area text calculation
  const areaLabel = product.area
    ? `до ${product.area} м²`
    : product.areaMax
    ? `до ${product.areaMax} м²`
    : product.seriesAreaRange
    ? `${product.seriesAreaRange.replace('кв.м', 'м²')}`
    : null;

  // Area badge
  const areaBadge = product.area
    ? `${product.area} м²`
    : product.areaMax
    ? `до ${product.areaMax} м²`
    : product.seriesAreaRange
    ? 'Серия ' + product.seriesAreaRange.replace('кв.м', 'м²').replace('от ', '')
    : null;

  const handleOrder = () => {
    trackEvent('product_order_click', { slug: product.slug, label: ctaLabel });
    openModal(
      product.itemType === 'product'
        ? `Заказать ${product.name} с установкой`
        : `Подобрать ${product.name}`,
      `Страница товара — ${ctaLabel}`,
      {
        id: product.id,
        slug: product.slug,
        itemType: product.itemType,
        brand: product.brand,
        series: product.series,
        model: product.model,
        name: product.name,
        price: product.price,
        priceFrom: product.priceFrom,
        priceWithInstallation: product.priceWithInstallation,
        image: product.image,
        sourcePage: `/catalog/${product.slug}`
      }
    );
  };

  const handleQuestion = () => {
    trackEvent('product_lead', { slug: product.slug });
    openModal(
      `Консультация по модели: ${product.name}`,
      'Страница товара — Получить консультацию',
      {
        id: product.id,
        slug: product.slug,
        itemType: product.itemType,
        brand: product.brand,
        series: product.series,
        model: product.model,
        name: product.name,
        price: product.price,
        priceFrom: product.priceFrom,
        priceWithInstallation: product.priceWithInstallation,
        image: product.image,
        sourcePage: `/catalog/${product.slug}`
      }
    );
  };

  // Only confirmed specs (never show empty dash rows)
  const specsList: { label: string; value: string }[] = [];

  specsList.push({
    label: 'Тип компрессора',
    value: product.compressorType === 'Inverter' ? 'Инверторный (DC Inverter)' : 'Классический (On/Off)'
  });

  if (product.area) {
    specsList.push({ label: 'Рекомендуемая площадь', value: `до ${product.area} м²` });
  } else if (product.seriesAreaRange) {
    specsList.push({ label: 'Диапазон площади серии', value: product.seriesAreaRange.replace('кв.м', 'м²') });
  }

  if (product.coolingCapacity) {
    specsList.push({ label: 'Мощность охлаждения', value: product.coolingCapacity });
  }

  if (product.heatingCapacity) {
    specsList.push({ label: 'Мощность обогрева', value: product.heatingCapacity });
  }

  if (product.noiseLevel) {
    specsList.push({ label: 'Уровень шума', value: product.noiseLevel });
  }

  if (product.energyClass) {
    specsList.push({ label: 'Класс энергоэффективности', value: product.energyClass });
  }

  if (product.wifi !== null && product.wifi !== undefined) {
    specsList.push({ label: 'Управление по Wi-Fi', value: product.wifi ? 'Встроенный / Поддерживается' : 'Нет' });
  }

  if (product.warranty) {
    specsList.push({ label: 'Заводская гарантия', value: product.warranty });
  }

  const favorited = isFavorite(product.slug);
  const compared = isInCompare(product.slug);

  return (
    <div className="bg-white min-h-screen pb-28 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* 1. Breadcrumbs: Главная → Каталог → Бренд → Модель */}
        <nav className="flex flex-wrap items-center space-x-2 text-xs text-slate-400 mb-8">
          <Link href="/" className="hover:text-blue-600 transition">
            Главная
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
          <Link href="/catalog" className="hover:text-blue-600 transition">
            Каталог
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
          <Link
            href={`/catalog/${product.brand.toLowerCase()}`}
            className="hover:text-blue-600 transition uppercase font-semibold"
          >
            {product.brand}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
          <span className="text-[#0B1F33] font-bold truncate max-w-[200px] sm:max-w-none">
            {product.shortName || product.name}
          </span>
        </nav>

        {/* 2. Основной экран товара */}
        <div id="product-hero" className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16">
          {/* Слева: Большая галерея (~55%) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-slate-50/80 rounded-3xl p-6 sm:p-10 border border-slate-200/80 relative flex items-center justify-center min-h-[340px] sm:min-h-[460px] lg:min-h-[500px] shadow-[0_4px_30px_-8px_rgba(0,0,0,0.05)] overflow-hidden">
              {/* Badges */}
              <div className="absolute top-5 left-5 flex flex-wrap gap-2 z-10">
                {(product.badge || product.isHit) && (
                  <span className="px-3 py-1 bg-amber-500 text-white text-[11px] font-black rounded-lg uppercase tracking-wider shadow-sm flex items-center space-x-1">
                    <Sparkles className="w-3 h-3" />
                    <span>{product.badge || 'Хит продаж'}</span>
                  </span>
                )}
                <span
                  className={`px-3 py-1 text-white text-[11px] font-black rounded-lg uppercase tracking-wider shadow-sm ${
                    product.compressorType === 'Inverter' ? 'bg-blue-600' : 'bg-slate-700'
                  }`}
                >
                  {product.compressorType === 'Inverter' ? 'INVERTER' : 'ON/OFF'}
                </span>
                {areaBadge && (
                  <span className="px-3 py-1 bg-white text-slate-700 text-[11px] font-semibold rounded-lg border border-slate-200 shadow-2xs">
                    {areaBadge}
                  </span>
                )}
              </div>

              {/* Favorites & Compare actions */}
              <div className="absolute top-5 right-5 flex flex-col gap-2 z-10">
                <button
                  type="button"
                  onClick={() => {
                    trackEvent('favorite_add', { slug: product.slug });
                    toggleFavorite(product.slug);
                  }}
                  className={`w-9 h-9 rounded-full flex items-center justify-center border shadow-xs transition ${
                    favorited
                      ? 'bg-red-50 border-red-200 text-red-500'
                      : 'bg-white border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200'
                  }`}
                  aria-label={favorited ? 'Удалить из избранного' : 'Добавить в избранное'}
                >
                  <Heart className="w-4 h-4" fill={favorited ? 'currentColor' : 'none'} />
                </button>
                {product.itemType === 'product' && (
                  <button
                    type="button"
                    onClick={() => {
                      trackEvent('compare_add', { slug: product.slug });
                      toggleCompare(product.slug);
                    }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center border shadow-xs transition ${
                      compared
                        ? 'bg-blue-50 border-blue-300 text-blue-600'
                        : 'bg-white border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-300'
                    }`}
                    aria-label={compared ? 'Удалить из сравнения' : 'Добавить к сравнению'}
                  >
                    <Scale className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Main Image */}
              <div className="relative w-full h-72 sm:h-96 lg:h-[400px]">
                <Image
                  src={getAssetUrl(selectedImage)}
                  alt={product.name}
                  fill
                  priority
                  className="object-contain transition-all duration-300 drop-shadow-md"
                />
              </div>
            </div>

            {/* Gallery Thumbnails (if multiple images) */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-16 rounded-xl border p-1 bg-slate-50 transition shrink-0 ${
                      selectedImage === img
                        ? 'border-blue-600 ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} - ракурс ${idx + 1}`}
                      fill
                      className="object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Справа: Бренд, Название, Цены, Главные свойства, CTA (~45%) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-blue-600 mb-2">
                <Link href={`/catalog/${product.brand.toLowerCase()}`} className="hover:underline">
                  {product.brand}
                </Link>
                {product.series && (
                  <>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-400 font-semibold normal-case">Серия {product.series}</span>
                  </>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-[#0B1F33] tracking-tight leading-[1.1]">
                {product.name}
              </h1>

              {product.description && (
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                  {product.description}
                </p>
              )}
            </div>

            {/* 2–4 главных характеристики */}
            <div className="grid grid-cols-2 gap-2.5 p-4 bg-slate-50/80 rounded-2xl border border-slate-200/70 text-xs">
              {areaLabel && (
                <div>
                  <span className="text-slate-400 block mb-0.5">Площадь помещения:</span>
                  <span className="font-bold text-[#0B1F33] text-sm">{areaLabel}</span>
                </div>
              )}
              <div>
                <span className="text-slate-400 block mb-0.5">Тип компрессора:</span>
                <span className="font-bold text-[#0B1F33] text-sm">
                  {product.compressorType === 'Inverter' ? 'Инверторный' : 'Классический (On/Off)'}
                </span>
              </div>
              {product.warranty && (
                <div>
                  <span className="text-slate-400 block mb-0.5">Заводская гарантия:</span>
                  <span className="font-bold text-[#0B1F33] text-sm">{product.warranty}</span>
                </div>
              )}
              {product.noiseLevel && (
                <div>
                  <span className="text-slate-400 block mb-0.5">Уровень шума:</span>
                  <span className="font-bold text-[#0B1F33] text-sm">{product.noiseLevel}</span>
                </div>
              )}
            </div>

            {/* 5. Цена под ключ и оборудование */}
            <div className="bg-gradient-to-br from-blue-50/60 via-slate-50 to-white p-6 rounded-3xl border border-blue-200/80 space-y-4">
              <div className="flex items-baseline justify-between text-xs text-slate-500">
                <span>Цена кондиционера:</span>
                <span className="font-bold text-slate-800 text-base">
                  {equipmentPrice || 'По запросу'}
                </span>
              </div>

              {installPrice ? (
                <div className="pt-3 border-t border-blue-100 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs font-bold text-blue-900 uppercase tracking-tight block flex items-center space-x-1">
                      <Wrench className="w-3.5 h-3.5 text-blue-600" />
                      <span>С установкой под ключ:</span>
                    </span>
                    <span className="text-[11px] text-slate-500 mt-0.5 block">
                      Оборудование + доставка + монтаж
                    </span>
                  </div>
                  <span className="text-3xl font-black text-blue-600">
                    {installPrice}
                  </span>
                </div>
              ) : (
                <div className="pt-3 border-t border-blue-100 text-xs text-slate-500 flex items-center justify-between">
                  <span>Стоимость монтажа:</span>
                  <span className="font-semibold text-slate-700">рассчитывается по параметрам трассы</span>
                </div>
              )}
            </div>

            {/* Dynamic CTA Buttons */}
            <div className="space-y-3 pt-1">
              <button
                type="button"
                onClick={handleOrder}
                className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold rounded-2xl shadow-xl shadow-blue-500/25 transition text-base flex items-center justify-center space-x-2 min-h-[52px]"
              >
                <Wrench className="w-5 h-5" />
                <span>{ctaLabel}</span>
              </button>

              <button
                type="button"
                onClick={handleQuestion}
                className="w-full py-3.5 px-6 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-2xl border border-slate-200 hover:border-slate-300 transition text-sm flex items-center justify-center space-x-2 min-h-[46px]"
              >
                <MessageSquare className="w-4 h-4 text-slate-400" />
                <span>Получить консультацию</span>
              </button>
            </div>

            {/* Reassurance pills */}
            <div className="grid grid-cols-2 gap-3 pt-1 text-xs text-slate-600">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Гарантия до 4 лет</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Оплата после проверки работы</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
                <span>Работаем без выходных</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <span>Владивосток, Артём, Уссурийск</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Блок: «Подойдёт для помещения» (только подтверждённые данные) */}
        <div className="bg-slate-50/80 rounded-3xl p-6 sm:p-8 border border-slate-200/80 mb-16">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
            <Maximize2 className="w-4 h-4" />
            <span>Подбор помещения</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0B1F33] mb-3">
            Подойдёт для помещения
          </h2>

          {product.area ? (
            <div className="space-y-2 text-sm text-slate-600">
              <p>
                Данная модель рассчитана на площадь помещения <b className="text-slate-900">до {product.area} м²</b> при стандартной высоте потолков до 2.8 м.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 text-xs">
                  <div className="font-bold text-slate-800 mb-0.5">Спальня или детская</div>
                  <div className="text-slate-500">Комфортная бесшумная работа без резких сквозняков</div>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 text-xs">
                  <div className="font-bold text-slate-800 mb-0.5">Стандартная комната</div>
                  <div className="text-slate-500">Быстрое охлаждение летом и эффективный подогрев в межсезонье</div>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 text-xs">
                  <div className="font-bold text-slate-800 mb-0.5">Рабочий кабинет</div>
                  <div className="text-slate-500">Поддержание стабильной заданной температуры круглый год</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-sm text-slate-600">
              <p>
                {product.seriesAreaRange ? (
                  <>
                    Линейка сплит-систем {product.series} перекрывает диапазон помещений <b className="text-slate-900">{product.seriesAreaRange.replace('кв.м', 'м²')}</b>.
                  </>
                ) : (
                  <>Площадь помещения для конкретной модификации подбирается индивидуально.</>
                )}
              </p>
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 text-xs text-amber-900 mt-2">
                <b>Обратите внимание:</b> Точную мощность рекомендуем подтвердить перед заказом. Наш специалист бесплатно рассчитает нагрузку с учётом солнечной стороны, остекления и количества техники в комнате.
              </div>
            </div>
          )}
        </div>

        {/* 4. Характеристики (только заполненные, без "неизвестно") */}
        <div className="mb-16">
          <h2 className="text-2xl font-black text-[#0B1F33] tracking-tight mb-6">
            Технические характеристики
          </h2>

          <div className="bg-slate-50/80 rounded-3xl border border-slate-200/80 overflow-hidden divide-y divide-slate-200/60 text-xs sm:text-sm shadow-2xs">
            {specsList.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 sm:px-6 hover:bg-slate-100/50 transition">
                <span className="text-slate-500 font-medium">{item.label}</span>
                <span className="text-slate-900 font-bold text-right">{item.value}</span>
              </div>
            ))}

            {/* Render extra raw specifications from site if they have real content */}
            {product.specifications &&
              Object.entries(product.specifications).map(([key, val]) => {
                if (!val || val === '-' || val.toLowerCase().includes('неизвест')) return null;
                return (
                  <div key={key} className="flex items-center justify-between p-4 sm:px-6 hover:bg-slate-100/50 transition">
                    <span className="text-slate-500 font-medium">{key}</span>
                    <span className="text-slate-900 font-bold text-right">{val}</span>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Гарантия компании */}
        <div className="bg-emerald-50/60 rounded-3xl border border-emerald-200/70 p-6 sm:p-8 mb-16">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-[#0B1F33] mb-2">Гарантия до 4 лет</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Гарантия до 4 лет. Конкретный срок зависит от выбранного оборудования. Уточните условия при заказе.
              </p>
            </div>
          </div>
        </div>

        {/* Преимущества компании */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
              Надёжный климатический партнёр
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B1F33] tracking-tight mt-3">
              Почему стоит заказать монтаж у нас
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="font-black text-slate-900 text-sm">Гарантия до 4 лет</div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Гарантия до 4 лет на климатическое оборудование.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="font-black text-slate-900 text-sm">Без выходных</div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Работаем ежедневно во Владивостоке, Артёме и Уссурийске.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="font-black text-slate-900 text-sm">Оплата после работы</div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Никаких рисков — оплачиваете установку только после запуска и проверки работы.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="font-black text-slate-900 text-sm">Удобная оплата</div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Наличные, перевод, банковские карты и безналичный расчёт для организаций.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Блок установки кондиционера */}
      <InstallationIncluded product={product} />

      {/* 8. Похожие модели (динамический подбор до 4 моделей) */}
      {similarProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200/80">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Альтернативные варианты
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0B1F33] tracking-tight mt-1">
                Похожие модели
              </h2>
            </div>
            <Link
              href={`/catalog/${product.brand.toLowerCase()}`}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
            >
              <span>Все модели {product.brand}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onOrderInstall={(prod) =>
                  openModal(
                    prod.itemType === 'product'
                      ? `Заказать ${prod.name} с установкой`
                      : `Подобрать ${prod.name}`,
                    'Похожие модели — Заказать с установкой',
                    {
                      id: prod.id,
                      slug: prod.slug,
                      itemType: prod.itemType,
                      brand: prod.brand,
                      series: prod.series,
                      model: prod.model,
                      name: prod.name,
                      price: prod.price,
                      priceFrom: prod.priceFrom,
                      priceWithInstallation: prod.priceWithInstallation,
                      image: prod.image,
                      sourcePage: `/catalog/${product.slug}`
                    }
                  )
                }
                onCheckFit={(prod) =>
                  openModal(
                    `Помощь с выбором: ${prod.name}`,
                    'Похожие модели — Консультация',
                    {
                      id: prod.id,
                      slug: prod.slug,
                      itemType: prod.itemType,
                      brand: prod.brand,
                      series: prod.series,
                      model: prod.model,
                      name: prod.name,
                      price: prod.price,
                      priceFrom: prod.priceFrom,
                      priceWithInstallation: prod.priceWithInstallation,
                      image: prod.image,
                      sourcePage: `/catalog/${product.slug}`
                    }
                  )
                }
              />
            ))}
          </div>
        </div>
      )}

      {/* 9. CTA внизу страницы */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-[#0B1F33] rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold rounded-full uppercase tracking-wider">
              Бесплатная консультация специалиста
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Не уверены, что эта модель вам подходит?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Бесплатно поможем рассчитать теплопритоки помещения, учтём этаж и площадь остекления, подберём оптимальный кондиционер со склада во Владивостоке.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() =>
                  openModal(
                    `Подбор аналога для ${product.name}`,
                    'Нижний CTA на странице товара'
                  )
                }
                className="inline-flex items-center space-x-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition shadow-lg shadow-blue-500/30 text-sm"
              >
                <span>Подобрать кондиционер</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 10. Mobile ProductStickyBar (заменяет глобальный MobileBottomBar на странице товара) */}
      <div
        className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 shadow-2xl flex items-center justify-between gap-3 transition-transform duration-300 ${
          isStickyVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <div className="min-w-0">
          <div className="text-[10px] text-slate-400 font-bold uppercase truncate">
            {product.shortName || product.name}
          </div>
          <div className="text-sm font-black text-blue-600 truncate">
            {installPrice ? `${installPrice} с монтажом` : (equipmentPrice || 'По запросу')}
          </div>
        </div>

        <button
          type="button"
          onClick={handleOrder}
          className="shrink-0 py-3 px-5 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-blue-500/25 flex items-center space-x-1.5 min-h-[44px]"
        >
          <Wrench className="w-4 h-4" />
          <span>{ctaLabel}</span>
        </button>
      </div>

      {/* Нижний отступ для мобильных, чтобы контент не перекрывался баром */}
      <div className="h-16 lg:hidden" />
    </div>
  );
};
