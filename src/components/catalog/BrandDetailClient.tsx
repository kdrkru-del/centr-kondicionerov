'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BrandInfo, Product } from '@/types';
import { BRANDS } from '@/data/brands';
import { ProductCard } from '@/components/catalog/ProductCard';
import { QuickViewModal } from '@/components/catalog/QuickViewModal';
import { useModal } from '@/components/providers/ModalProvider';
import {
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  SlidersHorizontal,
  Wrench,
  Layers,
  Phone,
  RotateCcw
} from 'lucide-react';
import { getAssetUrl } from '@/utils/asset';

interface Props {
  brand: BrandInfo;
  products: Product[];
}

export const BrandDetailClient: React.FC<Props> = ({ brand, products }) => {
  const { openModal } = useModal();

  // Local brand filters
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [selectedCompressor, setSelectedCompressor] = useState<'all' | 'inverter' | 'on-off'>('all');
  const [selectedPrice, setSelectedPrice] = useState<string>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Phone input for bottom form
  const [contactPhone, setContactPhone] = useState('');
  const [phoneSubmitted, setPhoneSubmitted] = useState(false);

  const otherBrands = BRANDS.filter((b) => b.slug !== brand.slug);

  const areaOptions = [
    { id: 'all', label: 'Все площади' },
    { id: 'under-20', label: 'до 20 м²' },
    { id: '21-25', label: '21–25 м²' },
    { id: '26-35', label: '26–35 м²' },
    { id: '36-50', label: '36–50 м²' },
    { id: 'over-50', label: '50+ м²' }
  ];

  // Helper to match area
  const checkArea = (p: Product, range: string): boolean => {
    if (range === 'all') return true;
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
    if (range === '21-25') return overlap(21, 25);
    if (range === '26-35') return overlap(26, 35);
    if (range === '36-50') return overlap(36, 50);
    if (range === 'over-50') return overlap(51, 300);
    return true;
  };

  // Helper to match price
  const checkPrice = (p: Product, range: string): boolean => {
    if (range === 'all') return true;
    const price = p.priceWithInstallation ?? p.price;
    if (price === null) return true;
    if (range === 'under-35') return price < 35000;
    if (range === '35-50') return price >= 35000 && price <= 50000;
    if (range === 'over-50') return price > 50000;
    return true;
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (!checkArea(p, selectedArea)) return false;
      if (selectedCompressor === 'inverter' && p.compressorType !== 'Inverter') return false;
      if (selectedCompressor === 'on-off' && p.compressorType !== 'On-Off') return false;
      if (!checkPrice(p, selectedPrice)) return false;
      return true;
    });
  }, [products, selectedArea, selectedCompressor, selectedPrice]);

  const handleResetFilters = () => {
    setSelectedArea('all');
    setSelectedCompressor('all');
    setSelectedPrice('all');
  };

  const handleOrderInstall = (product: Product) => {
    openModal(
      `${product.name}`,
      `Страница бренда ${brand.name} — Заказ с установкой`,
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

  const handleCheckFit = (product: Product) => {
    openModal(
      `Помощь с выбором: ${product.name}`,
      `Страница бренда ${brand.name} — Помочь с выбором`,
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

  const handleBottomFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactPhone || contactPhone.replace(/\D/g, '').length < 10) {
      return;
    }
    openModal(
      `Подбор кондиционера ${brand.name}`,
      `Нижняя форма страницы ${brand.name}`
    );
    setPhoneSubmitted(true);
  };

  return (
    <div className="py-8 sm:py-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs: Главная → Каталог → Бренд */}
        <nav className="flex items-center space-x-2 text-xs text-slate-400 mb-8">
          <Link href="/" className="hover:text-blue-600 transition">
            Главная
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <Link href="/catalog" className="hover:text-blue-600 transition">
            Каталог
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-[#0B1F33] font-bold uppercase">{brand.name}</span>
        </nav>

        {/* Brand Header Banner */}
        <div className="bg-slate-50/80 rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Продажа и установка во Владивостоке</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1F33] tracking-tight">
                Кондиционеры {brand.name} во Владивостоке
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                {brand.description}
              </p>

              {brand.features && brand.features.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {brand.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
              <div className="relative h-16 w-44 mb-3">
                <Image
                  src={getAssetUrl(brand.logo)}
                  alt={brand.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-center">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Гарантия</div>
                <div className="text-2xl font-black text-blue-600 mt-0.5">до 4-х лет</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Заводская поддержка</div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Products Section */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0B1F33] tracking-tight">
                Модели {brand.name} в наличии
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Все цены указаны за оборудование и с профессиональным монтажом под ключ
              </p>
            </div>
            <div className="text-xs font-bold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/60 shrink-0">
              Доступно моделей: <span className="text-blue-600 font-black">{filteredProducts.length}</span> из {products.length}
            </div>
          </div>

          {/* Filters Bar: Площадь, Компрессор, Цена */}
          <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-200/80 mb-8 space-y-4">
            <div className="flex flex-wrap items-center gap-4 text-xs">
              {/* Area filter */}
              <div className="flex items-center space-x-2">
                <span className="text-slate-400 font-semibold">Площадь:</span>
                <div className="flex flex-wrap gap-1">
                  {areaOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedArea(opt.id)}
                      className={`px-2.5 py-1 rounded-lg font-bold transition ${
                        selectedArea === opt.id
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Compressor filter */}
              <div className="flex items-center space-x-2">
                <span className="text-slate-400 font-semibold">Тип:</span>
                <div className="flex gap-1">
                  {[
                    { id: 'all', label: 'Все' },
                    { id: 'inverter', label: 'Инвертор' },
                    { id: 'on-off', label: 'On/Off' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedCompressor(t.id as any)}
                      className={`px-2.5 py-1 rounded-lg font-bold transition ${
                        selectedCompressor === t.id
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price filter */}
              <div className="flex items-center space-x-2">
                <span className="text-slate-400 font-semibold">Бюджет:</span>
                <div className="flex gap-1">
                  {[
                    { id: 'all', label: 'Любой' },
                    { id: 'under-35', label: 'до 35 000 ₽' },
                    { id: '35-50', label: '35–50 000 ₽' },
                    { id: 'over-50', label: '50 000+ ₽' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPrice(p.id)}
                      className={`px-2.5 py-1 rounded-lg font-bold transition ${
                        selectedPrice === p.id
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset */}
              {(selectedArea !== 'all' || selectedCompressor !== 'all' || selectedPrice !== 'all') && (
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center space-x-1 text-slate-400 hover:text-blue-600 transition font-bold"
                  title="Сбросить фильтры бренда"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Сбросить</span>
                </button>
              )}
            </div>
          </div>

          {/* Products Grid using ProductCard */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onOrderInstall={handleOrderInstall}
                  onCheckFit={handleCheckFit}
                  onQuickView={(prod) => setQuickViewProduct(prod)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 rounded-3xl p-10 text-center border border-slate-200">
              <p className="text-slate-600 text-sm mb-4">
                Среди моделей {brand.name} нет подходящих под выбранную комбинацию фильтров.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs"
              >
                Сбросить фильтры
              </button>
            </div>
          )}
        </div>

        {/* Bottom Form: «Поможем подобрать кондиционер [BRAND]» */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white mb-14 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold rounded-full uppercase tracking-wider">
                Помощь специалиста
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                Поможем подобрать кондиционер {brand.name}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                Оставьте номер телефона — специалист рассчитает необходимую мощность охлаждения для вашей квартиры, согласует удобное время и зафиксирует цену монтажа.
              </p>
            </div>

            <div className="lg:col-span-5">
              <form onSubmit={handleBottomFormSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    required
                    className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-500"
                  />
                  <button
                    type="submit"
                    className="py-3 px-6 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition shrink-0 shadow-lg shadow-blue-500/30"
                  >
                    Получить расчет
                  </button>
                </div>
                <div className="text-[11px] text-slate-400">
                  Перезвоним в течение 10 минут. Оплата только после выполнения монтажа.
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Internal Linking Block: Все кондиционеры, Другие бренды, Монтаж */}
        <div className="border-t border-slate-200/80 pt-10">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Полезные разделы и другие бренды:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 1. Все кондиционеры */}
            <Link
              href="/catalog"
              className="p-5 bg-slate-50 hover:bg-blue-50/50 rounded-2xl border border-slate-200/80 hover:border-blue-200 transition group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
                  <Layers className="w-4 h-4" />
                  <span>Общий каталог</span>
                </div>
                <div className="font-black text-[#0B1F33] text-base group-hover:text-blue-600 transition">
                  Все кондиционеры
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Полный выбор моделей всех брендов с фильтром по площади и бюджету.
                </p>
              </div>
              <div className="text-xs font-bold text-blue-600 mt-3 flex items-center space-x-1">
                <span>Перейти в каталог</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            {/* 2. Другие бренды */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Другие бренды
                </div>
                <div className="font-black text-[#0B1F33] text-base mb-2">
                  Популярные марки
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {otherBrands.map((b) => (
                    <Link
                      key={b.id}
                      href={`/catalog/${b.slug}`}
                      className="px-2.5 py-1 bg-white hover:bg-blue-600 hover:text-white rounded-lg text-xs font-bold text-slate-700 border border-slate-200 transition"
                    >
                      {b.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Монтаж */}
            <Link
              href="/#installation"
              className="p-5 bg-slate-50 hover:bg-blue-50/50 rounded-2xl border border-slate-200/80 hover:border-blue-200 transition group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
                  <Wrench className="w-4 h-4" />
                  <span>Установка под ключ</span>
                </div>
                <div className="font-black text-[#0B1F33] text-base group-hover:text-blue-600 transition">
                  Условия и стоимость монтажа
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Аккуратный монтаж с гарантией на технику до 4 лет.
                </p>
              </div>
              <div className="text-xs font-bold text-blue-600 mt-3 flex items-center space-x-1">
                <span>Подробнее о монтаже</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        onOrderInstall={handleOrderInstall}
        onCheckFit={handleCheckFit}
      />
    </div>
  );
};
