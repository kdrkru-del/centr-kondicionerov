'use client';

import React, { useState, useMemo, useEffect, useCallback, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import { BRANDS } from '@/data/brands';
import { Product } from '@/types';
import { ProductCard } from '@/components/catalog/ProductCard';
import { QuickViewModal } from '@/components/catalog/QuickViewModal';
import { MobileFiltersSheet } from '@/components/catalog/MobileFiltersSheet';
import { useModal } from '@/components/providers/ModalProvider';
import { useFavorites } from '@/context/FavoritesContext';
import { getAssetUrl } from '@/utils/asset';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  RotateCcw,
  ChevronRight,
  Sparkles,
  Wrench,
  CheckCircle2,
  HelpCircle,
  Layers,
  ArrowRight,
  ShieldCheck,
  Heart,
  X
} from 'lucide-react';

const AREA_PILLS = [
  { id: 'all', label: 'Все' },
  { id: 'under-20', label: 'до 20 м²' },
  { id: 'under-25', label: 'до 25 м²' },
  { id: 'under-35', label: 'до 35 м²' },
  { id: 'under-50', label: 'до 50 м²' },
  { id: 'under-70', label: 'до 70 м²' },
  { id: 'over-70', label: '70+ м²' }
];

const PRICE_RANGES = [
  { id: 'all', label: 'Любой бюджет' },
  { id: 'under-30', label: 'до 30 000 ₽' },
  { id: '30-40', label: '30 000 – 40 000 ₽' },
  { id: '40-50', label: '40 000 – 50 000 ₽' },
  { id: 'over-50', label: 'от 50 000 ₽' }
];

export const CatalogClient: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const { openModal } = useModal();
  const { favorites, isFavorite } = useFavorites();

  // URL state reading
  const initialSearch = searchParams.get('search') || '';
  const initialBrand = searchParams.get('brand') ? searchParams.get('brand')!.split(',') : [];
  const initialCompressor = (searchParams.get('type') as 'all' | 'inverter' | 'on-off') || 'all';
  const initialArea = searchParams.get('area') || 'all';
  const initialPrice = searchParams.get('price') || 'all';
  const initialInstall = searchParams.get('install') === '1';
  const initialKnownPrice = searchParams.get('knownPrice') === '1';
  const initialHit = searchParams.get('hit') === '1';
  const initialFav = searchParams.get('fav') === '1';
  const initialSort = searchParams.get('sort') || 'popularity';
  const initialView = (searchParams.get('view') as 'grid' | 'list') || 'grid';

  // State
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(initialBrand);
  const [selectedCompressor, setSelectedCompressor] = useState<'all' | 'inverter' | 'on-off'>(initialCompressor);
  const [selectedArea, setSelectedArea] = useState<string>(initialArea);
  const [selectedPrice, setSelectedPrice] = useState<string>(initialPrice);
  const [onlyWithInstallation, setOnlyWithInstallation] = useState<boolean>(initialInstall);
  const [onlyKnownPrice, setOnlyKnownPrice] = useState<boolean>(initialKnownPrice);
  const [onlyHits, setOnlyHits] = useState<boolean>(initialHit);
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(initialFav);
  const [sortBy, setSortBy] = useState<string>(initialSort);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(initialView);

  // Modals state
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Sync state to URL without reloading
  const updateUrl = useCallback(
    (params: Record<string, string | null>) => {
      const current = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, val]) => {
        if (val === null || val === '' || val === 'all' || val === '0' || val === 'false') {
          current.delete(key);
        } else {
          current.set(key, val);
        }
      });
      const qs = current.toString();
      const newUrl = qs ? `${pathname}?${qs}` : pathname;
      startTransition(() => {
        router.replace(newUrl, { scroll: false });
      });
    },
    [pathname, router, searchParams]
  );

  // Sync search input with URL (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      updateUrl({ search: searchQuery.trim() || null });
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, updateUrl]);

  // Brand count calculation
  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    BRANDS.forEach((b) => {
      counts[b.name.toLowerCase()] = PRODUCTS.filter(
        (p) => p.brand.toLowerCase() === b.name.toLowerCase()
      ).length;
    });
    return counts;
  }, []);

  const brandOptions = useMemo(() => {
    return BRANDS.map((b) => ({
      slug: b.slug,
      name: b.name,
      count: brandCounts[b.name.toLowerCase()] || 0
    }));
  }, [brandCounts]);

  // Handlers
  const handleToggleBrand = (slug: string) => {
    const next = selectedBrands.includes(slug)
      ? selectedBrands.filter((s) => s !== slug)
      : [...selectedBrands, slug];
    setSelectedBrands(next);
    updateUrl({ brand: next.length > 0 ? next.join(',') : null });
  };

  const handleSelectCompressor = (val: 'all' | 'inverter' | 'on-off') => {
    setSelectedCompressor(val);
    updateUrl({ type: val !== 'all' ? val : null });
  };

  const handleSelectArea = (id: string) => {
    setSelectedArea(id);
    updateUrl({ area: id !== 'all' ? id : null });
  };

  const handleSelectPrice = (id: string) => {
    setSelectedPrice(id);
    updateUrl({ price: id !== 'all' ? id : null });
  };

  const handleToggleInstallation = () => {
    const next = !onlyWithInstallation;
    setOnlyWithInstallation(next);
    updateUrl({ install: next ? '1' : null });
  };

  const handleToggleKnownPrice = () => {
    const next = !onlyKnownPrice;
    setOnlyKnownPrice(next);
    updateUrl({ knownPrice: next ? '1' : null });
  };

  const handleToggleHits = () => {
    const next = !onlyHits;
    setOnlyHits(next);
    updateUrl({ hit: next ? '1' : null });
  };

  const handleToggleFavorites = () => {
    const next = !onlyFavorites;
    setOnlyFavorites(next);
    updateUrl({ fav: next ? '1' : null });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSortBy(val);
    updateUrl({ sort: val !== 'popularity' ? val : null });
  };

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
    updateUrl({ view: mode !== 'grid' ? mode : null });
  };

  const handleResetAll = () => {
    setSearchQuery('');
    setSelectedBrands([]);
    setSelectedCompressor('all');
    setSelectedArea('all');
    setSelectedPrice('all');
    setOnlyWithInstallation(false);
    setOnlyKnownPrice(false);
    setOnlyHits(false);
    setOnlyFavorites(false);
    setSortBy('popularity');
    router.replace(pathname, { scroll: false });
  };

  // Checking strict confirmed area
  const checkArea = useCallback((p: Product, range: string): boolean => {
    if (range === 'all') return true;
    // Strict DATA_AUDIT rule: use only confirmed model area, not series range
    if (p.area === null) return false;
    if (range === 'under-20') return p.area <= 20;
    if (range === 'under-25') return p.area <= 25;
    if (range === 'under-35') return p.area <= 35;
    if (range === 'under-50') return p.area <= 50;
    if (range === 'under-70') return p.area <= 70;
    if (range === 'over-70') return p.area > 70;
    return true;
  }, []);

  // Checking price range
  const checkPrice = useCallback((p: Product, range: string): boolean => {
    if (range === 'all') return true;
    const price = p.priceWithInstallation ?? p.price;
    if (price === null) return false;
    if (range === 'under-30') return price < 30000;
    if (range === '30-40') return price >= 30000 && price <= 40000;
    if (range === '40-50') return price >= 40000 && price <= 50000;
    if (range === 'over-50') return price > 50000;
    return true;
  }, []);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // 1. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesModel = p.model.toLowerCase().includes(q);
        const matchesSeries = p.series.toLowerCase().includes(q);
        const matchesShort = p.shortName.toLowerCase().includes(q);
        if (!matchesBrand && !matchesName && !matchesModel && !matchesSeries && !matchesShort) {
          return false;
        }
      }

      // 2. Brand filter
      if (selectedBrands.length > 0) {
        const brandMatch = selectedBrands.some((b) => b.toLowerCase() === p.brand.toLowerCase());
        if (!brandMatch) return false;
      }

      // 3. Compressor
      if (selectedCompressor === 'inverter' && p.compressorType !== 'Inverter') return false;
      if (selectedCompressor === 'on-off' && p.compressorType !== 'On-Off') return false;

      // 4. Area
      if (!checkArea(p, selectedArea)) return false;

      // 5. Price
      if (!checkPrice(p, selectedPrice)) return false;

      // 6. Installation
      if (onlyWithInstallation && !p.priceWithInstallation) return false;

      // 7. Known price
      if (onlyKnownPrice && p.price === null && p.priceWithInstallation === null) return false;

      // 8. Hits
      if (onlyHits && !p.badge && !p.isHit) return false;

      // 9. Favorites
      if (onlyFavorites && !isFavorite(p.slug)) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') {
        const priceA = a.priceWithInstallation ?? a.price;
        const priceB = b.priceWithInstallation ?? b.price;
        if (priceA === null && priceB === null) return 0;
        if (priceA === null) return 1;
        if (priceB === null) return -1;
        return priceA - priceB;
      }
      if (sortBy === 'price-desc') {
        const priceA = a.priceWithInstallation ?? a.price;
        const priceB = b.priceWithInstallation ?? b.price;
        if (priceA === null && priceB === null) return 0;
        if (priceA === null) return 1;
        if (priceB === null) return -1;
        return priceB - priceA;
      }
      if (sortBy === 'area') {
        if (a.area === null && b.area === null) return 0;
        if (a.area === null) return 1;
        if (b.area === null) return -1;
        return a.area - b.area;
      }
      // Popularity default: hits and products first
      const aScore = (a.isHit || a.badge ? 2 : 0) + (a.itemType === 'product' ? 1 : 0);
      const bScore = (b.isHit || b.badge ? 2 : 0) + (b.itemType === 'product' ? 1 : 0);
      return bScore - aScore;
    });
  }, [
    searchQuery,
    selectedBrands,
    selectedCompressor,
    selectedArea,
    selectedPrice,
    onlyWithInstallation,
    onlyKnownPrice,
    onlyHits,
    onlyFavorites,
    sortBy,
    checkArea,
    checkPrice,
    isFavorite
  ]);

  // Active filters count for chips
  const activeFiltersCount =
    (searchQuery ? 1 : 0) +
    selectedBrands.length +
    (selectedCompressor !== 'all' ? 1 : 0) +
    (selectedArea !== 'all' ? 1 : 0) +
    (selectedPrice !== 'all' ? 1 : 0) +
    (onlyWithInstallation ? 1 : 0) +
    (onlyKnownPrice ? 1 : 0) +
    (onlyHits ? 1 : 0) +
    (onlyFavorites ? 1 : 0);

  // Modal order handler
  const handleOrderInstall = (product: Product) => {
    openModal(
      product.name,
      `Каталог — Заказ с установкой: ${product.name}`,
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
      `Помощь в выборе: ${product.name}`,
      `Каталог — Вопрос специалисту: ${product.name}`,
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

  return (
    <div className="bg-white min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ============================================================ */}
        {/* 2. ВЕРХ КАТАЛОГА (HERO SECTION) */}
        {/* ============================================================ */}
        <div className="bg-gradient-to-br from-slate-50 via-blue-50/20 to-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 mb-8 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.03)] relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          {/* Breadcrumb: Главная → Каталог */}
          <nav className="flex items-center space-x-2 text-xs text-slate-400 mb-4">
            <Link href="/" className="hover:text-blue-600 transition font-medium">
              Главная
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-[#0B1F33] font-bold">Каталог</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1F33] tracking-tight leading-[1.1]">
                Кондиционеры с установкой во Владивостоке
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl pt-1">
                Подберите кондиционер по площади, типу компрессора и бюджету. Если не уверены в выборе — поможем подобрать подходящую модель под особенности вашего помещения.
              </p>

              {/* Quick Search Bar */}
              <div className="pt-3 max-w-xl">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Поиск по бренду или модели (например: Legend, Reykjavik, Aurora)..."
                    className="w-full pl-11 pr-10 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs transition"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                      aria-label="Очистить поиск"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Desktop Hero Visual */}
            <div className="hidden lg:flex lg:col-span-4 justify-center items-center relative h-52">
              <div className="relative w-full h-full">
                <Image
                  src={getAssetUrl('/images/hero/air-conditioner-hero.png')}
                  alt="Премиальная сплит-система"
                  fill
                  priority
                  className="object-contain drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. БЫСТРЫЙ ВЫБОР ПО ПЛОЩАДИ */}
        {/* ============================================================ */}
        <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200/80 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-1.5">
              <span>Какая площадь помещения?</span>
            </span>
            {selectedArea !== 'all' && (
              <span className="text-[11px] text-blue-600 font-semibold">
                Показаны модели с подтверждённой площадью
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {AREA_PILLS.map((pill) => (
              <button
                key={pill.id}
                type="button"
                onClick={() => handleSelectArea(pill.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                  selectedArea === pill.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                <span>{pill.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* CATALOG MAIN GRID: LEFT SIDEBAR + RIGHT CONTENT */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ============================================================ */}
          {/* 6. DESKTOP STICKY SIDEBAR (260-280px) */}
          {/* ============================================================ */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.03)] space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-black text-[#0B1F33]">Фильтры</span>
              </div>
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={handleResetAll}
                  className="text-[11px] text-blue-600 hover:underline font-bold"
                >
                  Сбросить
                </button>
              )}
            </div>

            {/* Brand Filter */}
            <div>
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                Бренд
              </div>
              <div className="space-y-2">
                {brandOptions.map((b) => {
                  const isChecked = selectedBrands.includes(b.slug);
                  return (
                    <label
                      key={b.slug}
                      className="flex items-center justify-between text-xs text-slate-700 hover:text-blue-600 cursor-pointer select-none group"
                    >
                      <div className="flex items-center space-x-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleBrand(b.slug)}
                          className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                        />
                        <span className={isChecked ? 'font-black text-[#0B1F33]' : 'font-medium'}>
                          {b.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full group-hover:text-blue-600">
                        {b.count}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Compressor Type Filter */}
            <div className="pt-4 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                Тип компрессора
              </div>
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl text-xs">
                {[
                  { id: 'all', label: 'Все' },
                  { id: 'inverter', label: 'Инвертор' },
                  { id: 'on-off', label: 'On/Off' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectCompressor(item.id as any)}
                    className={`py-1.5 px-2 rounded-lg font-bold transition text-center ${
                      selectedCompressor === item.id
                        ? 'bg-white text-blue-600 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="pt-4 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                Бюджет
              </div>
              <div className="space-y-1.5">
                {PRICE_RANGES.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => handleSelectPrice(r.id)}
                    className={`w-full py-1.5 px-2.5 rounded-xl text-xs font-semibold transition text-left flex items-center justify-between ${
                      selectedPrice === r.id
                        ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{r.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Checkboxes */}
            <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs">
              <label className="flex items-center space-x-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyWithInstallation}
                  onChange={handleToggleInstallation}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                />
                <span className={onlyWithInstallation ? 'font-bold text-blue-600' : 'text-slate-700 font-medium'}>
                  С установкой под ключ
                </span>
              </label>

              <label className="flex items-center space-x-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyKnownPrice}
                  onChange={handleToggleKnownPrice}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                />
                <span className={onlyKnownPrice ? 'font-bold text-blue-600' : 'text-slate-700 font-medium'}>
                  Только с известной ценой
                </span>
              </label>

              <label className="flex items-center space-x-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyHits}
                  onChange={handleToggleHits}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                />
                <span className={onlyHits ? 'font-bold text-blue-600' : 'text-slate-700 font-medium'}>
                  Хиты продаж
                </span>
              </label>

              <label className="flex items-center space-x-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyFavorites}
                  onChange={handleToggleFavorites}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                />
                <span className={onlyFavorites ? 'font-bold text-blue-600' : 'text-slate-700 font-medium'}>
                  Только избранное ({favorites.length})
                </span>
              </label>
            </div>
          </aside>

          {/* ============================================================ */}
          {/* RIGHT MAIN CATALOG AREA */}
          {/* ============================================================ */}
          <main className="lg:col-span-9">
            {/* Top Toolbar: Counter, Sorting, View Switcher & Mobile Trigger */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center justify-between sm:justify-start space-x-3">
                <div className="text-sm font-black text-[#0B1F33]">
                  Найдено моделей: <span className="text-blue-600">{filteredProducts.length}</span>
                </div>

                {/* Mobile Filter Trigger */}
                <button
                  type="button"
                  onClick={() => setIsMobileFiltersOpen(true)}
                  className="lg:hidden px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center space-x-1.5 transition"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Фильтры</span>
                  {activeFiltersCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between sm:justify-end space-x-3">
                {/* Sorting Select */}
                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-slate-400 hidden sm:inline">Сортировка:</span>
                  <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer"
                  >
                    <option value="popularity">По популярности</option>
                    <option value="price-asc">Сначала дешевле</option>
                    <option value="price-desc">Сначала дороже</option>
                    <option value="area">По площади</option>
                  </select>
                </div>

                {/* Grid / List switcher (Desktop only) */}
                <div className="hidden sm:flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => handleViewModeChange('grid')}
                    className={`p-1.5 rounded-lg transition ${
                      viewMode === 'grid' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-400 hover:text-slate-700'
                    }`}
                    title="Сетка карточек"
                    aria-label="Сетка карточек"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleViewModeChange('list')}
                    className={`p-1.5 rounded-lg transition ${
                      viewMode === 'list' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-400 hover:text-slate-700'
                    }`}
                    title="Компактный список"
                    aria-label="Компактный список"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* ============================================================ */}
            {/* 19. ACTIVE CHIPS */}
            {/* ============================================================ */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mb-6 animate-in fade-in duration-200">
                {searchQuery && (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold">
                    <span>Поиск: &laquo;{searchQuery}&raquo;</span>
                    <button type="button" onClick={() => setSearchQuery('')} aria-label="Удалить фильтр поиска">
                      <X className="w-3 h-3 hover:text-blue-900" />
                    </button>
                  </span>
                )}

                {selectedBrands.map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold uppercase"
                  >
                    <span>{b}</span>
                    <button type="button" onClick={() => handleToggleBrand(b)} aria-label={`Удалить бренд ${b}`}>
                      <X className="w-3 h-3 hover:text-slate-900" />
                    </button>
                  </span>
                ))}

                {selectedCompressor !== 'all' && (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                    <span>{selectedCompressor === 'inverter' ? 'Инвертор' : 'On-Off'}</span>
                    <button type="button" onClick={() => handleSelectCompressor('all')} aria-label="Сбросить компрессор">
                      <X className="w-3 h-3 hover:text-slate-900" />
                    </button>
                  </span>
                )}

                {selectedArea !== 'all' && (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                    <span>{AREA_PILLS.find((p) => p.id === selectedArea)?.label}</span>
                    <button type="button" onClick={() => handleSelectArea('all')} aria-label="Сбросить площадь">
                      <X className="w-3 h-3 hover:text-slate-900" />
                    </button>
                  </span>
                )}

                {selectedPrice !== 'all' && (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                    <span>{PRICE_RANGES.find((r) => r.id === selectedPrice)?.label}</span>
                    <button type="button" onClick={() => handleSelectPrice('all')} aria-label="Сбросить бюджет">
                      <X className="w-3 h-3 hover:text-slate-900" />
                    </button>
                  </span>
                )}

                {onlyWithInstallation && (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold">
                    <span>С установкой</span>
                    <button type="button" onClick={handleToggleInstallation} aria-label="Сбросить с установкой">
                      <X className="w-3 h-3 hover:text-blue-900" />
                    </button>
                  </span>
                )}

                {onlyKnownPrice && (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                    <span>С известной ценой</span>
                    <button type="button" onClick={handleToggleKnownPrice} aria-label="Сбросить фильтр цены">
                      <X className="w-3 h-3 hover:text-slate-900" />
                    </button>
                  </span>
                )}

                {onlyHits && (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 text-xs font-semibold">
                    <span>Хиты продаж</span>
                    <button type="button" onClick={handleToggleHits} aria-label="Сбросить хиты продаж">
                      <X className="w-3 h-3 hover:text-amber-900" />
                    </button>
                  </span>
                )}

                {onlyFavorites && (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-red-50 text-red-700 text-xs font-semibold">
                    <span>Только избранное</span>
                    <button type="button" onClick={handleToggleFavorites} aria-label="Сбросить избранное">
                      <X className="w-3 h-3 hover:text-red-900" />
                    </button>
                  </span>
                )}

                <button
                  type="button"
                  onClick={handleResetAll}
                  className="text-xs text-blue-600 hover:text-blue-700 hover:underline font-bold px-2 py-1"
                >
                  Сбросить всё
                </button>
              </div>
            )}

            {/* ============================================================ */}
            {/* PRODUCTS GRID / LIST VIEW */}
            {/* ============================================================ */}
            {filteredProducts.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {filteredProducts.map((product, index) => {
                  // Native CTA block inserted after 6 items (index 5)
                  const showNativeBanner = index === 5 && filteredProducts.length > 5;

                  return (
                    <React.Fragment key={product.id}>
                      <ProductCard
                        product={product}
                        onOrderInstall={handleOrderInstall}
                        onCheckFit={handleCheckFit}
                        onQuickView={(p) => setQuickViewProduct(p)}
                        viewMode={viewMode}
                      />

                      {/* 23. CTA ПОСЛЕ ПЕРВЫХ КАРТОЧЕК */}
                      {showNativeBanner && (
                        <div
                          className={
                            viewMode === 'grid'
                              ? 'col-span-1 sm:col-span-2 xl:col-span-3 bg-gradient-to-r from-[#0B1F33] to-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl my-2'
                              : 'bg-gradient-to-r from-[#0B1F33] to-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl my-2'
                          }
                        >
                          <div className="space-y-1.5 text-center sm:text-left">
                            <h3 className="text-lg sm:text-xl font-black tracking-tight">
                              Не знаете, какой кондиционер выбрать?
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                              Назовите площадь помещения и особенности комнат — специалист бесплатно рассчитает необходимую мощность и предложит подходящие модели.
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => openModal(undefined, 'Каталог — CTA в сетке товаров')}
                            className="py-3 px-6 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold rounded-2xl text-xs sm:text-sm transition shrink-0 shadow-lg shadow-blue-500/30 flex items-center space-x-2"
                          >
                            <span>Подобрать кондиционер</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            ) : (
              /* EMPTY STATE */
              <div className="bg-slate-50 rounded-3xl p-10 sm:p-16 text-center border border-slate-200">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-[#0B1F33] mb-2">
                  По выбранным параметрам ничего не найдено
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto mb-6">
                  Попробуйте расширить фильтры или сбросить их, либо обратитесь к нашему специалисту за индивидуальным подбором.
                </p>
                <button
                  type="button"
                  onClick={handleResetAll}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-xs sm:text-sm transition shadow-sm"
                >
                  Сбросить все фильтры
                </button>
              </div>
            )}
          </main>
        </div>

        {/* ============================================================ */}
        {/* 24. БЛОК БРЕНДОВ ВНИЗУ */}
        {/* ============================================================ */}
        <div className="mt-16 pt-12 border-t border-slate-200/80">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
            <div>
              <h2 className="text-2xl font-black text-[#0B1F33] tracking-tight">
                Выберите бренд
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              Проверенная климатическая техника с гарантией
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {BRANDS.map((b) => (
              <Link
                key={b.slug}
                href={`/catalog/${b.slug}`}
                className="p-5 rounded-2xl border border-slate-200/80 hover:border-blue-400 hover:shadow-md transition bg-slate-50/50 hover:bg-white group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-10 w-full mb-3 flex items-center justify-center">
                    <Image
                      src={getAssetUrl(b.logo)}
                      alt={b.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="font-black text-[#0B1F33] group-hover:text-blue-600 transition text-sm text-center">
                    {b.name}
                  </div>
                  <div className="text-[11px] text-slate-500 text-center mt-1">
                    {b.shortDescription}
                  </div>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-blue-600">
                  <span>В каталог марки</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 25. SEO ТЕКСТ ВНИЗУ СТРАНИЦЫ (2-3 емких абзаца) */}
        {/* ============================================================ */}
        <div className="mt-12 pt-8 border-t border-slate-100 text-slate-600 text-xs sm:text-sm leading-relaxed space-y-3">
          <h2 className="text-base font-black text-[#0B1F33]">
            Продажа и установка кондиционеров во Владивостоке
          </h2>
          <p>
            Компания &laquo;Центр Кондиционеров&raquo; предлагает надежные сплит-системы настенного типа брендов MDV, AMSTON, DAHATSU и HUNBERG. Мы осуществляем продажу климатического оборудования с доставкой и профессиональным монтажом во Владивостоке, Артёме и Уссурийске.
          </p>
          <p>
            Монтаж выполняется опытными специалистами с соблюдением стандартов аккуратности. На технику действует гарантия до 4 лет. Условия и стоимость установки зависят от объекта и выбранного оборудования.
          </p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* QUICK VIEW MODAL */}
      {/* ============================================================ */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        onOrderInstall={handleOrderInstall}
        onCheckFit={handleCheckFit}
      />

      {/* ============================================================ */}
      {/* MOBILE FILTERS BOTTOM SHEET */}
      {/* ============================================================ */}
      <MobileFiltersSheet
        isOpen={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
        brands={brandOptions}
        selectedBrands={selectedBrands}
        onToggleBrand={handleToggleBrand}
        selectedCompressor={selectedCompressor}
        onSelectCompressor={handleSelectCompressor}
        areaOptions={AREA_PILLS}
        selectedArea={selectedArea}
        onSelectArea={handleSelectArea}
        priceRanges={PRICE_RANGES}
        selectedPriceRange={selectedPrice}
        onSelectPriceRange={handleSelectPrice}
        onlyWithInstallation={onlyWithInstallation}
        onToggleWithInstallation={handleToggleInstallation}
        onlyKnownPrice={onlyKnownPrice}
        onToggleKnownPrice={handleToggleKnownPrice}
        onlyHits={onlyHits}
        onToggleHits={handleToggleHits}
        onlyFavorites={onlyFavorites}
        onToggleFavorites={handleToggleFavorites}
        filteredCount={filteredProducts.length}
        totalCount={PRODUCTS.length}
        onResetAll={handleResetAll}
      />
    </div>
  );
};
