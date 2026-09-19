'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Menu, X, Sparkles, MessageSquare, Heart, Scale, MapPin, Clock, ShieldCheck, ChevronRight } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';
import { useCompare } from '@/context/CompareContext';
import { COMPANY_CONFIG } from '@/config/company';

interface HeaderProps {
  onOpenModal?: (productName?: string, source?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { favorites } = useFavorites();
  const { compareCount } = useCompare();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Каталог сплит-систем', href: '/catalog', highlight: true },
    { name: 'Инженерный расчёт', href: '/selection' },
    { name: 'Стандарты монтажа', href: '/installation' },
    { name: 'Гарантия и сервис', href: '/#warranty' },
    { name: 'Контакты', href: '/#contacts' }
  ];

  const handleCtaClick = () => {
    if (onOpenModal) {
      onOpenModal(undefined, 'Кнопка в шапке сайта: Консультация инженера');
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* 1. Верхняя фирменная статусная плашка (уровень мирового бренда Daikin) */}
      <div className="bg-[#0B1528] text-slate-300 text-[11px] sm:text-xs py-2 hidden md:block border-b border-white/10 tracking-tight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1.5 text-white font-medium">
              <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>{COMPANY_CONFIG.citiesListText}</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 ml-1.5 animate-pulse" />
              <span className="text-[11px] text-emerald-400 font-semibold">Склад и монтажные бригады в наличии</span>
            </div>
            <div className="flex items-center space-x-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Ежедневно 8:00 – 21:00 без выходных</span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1.5 text-slate-200 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Официальная гарантия до 4 лет • Расчёт строго по факту сдачи</span>
            </div>
            <div className="flex items-center space-x-3 pl-3 border-l border-white/15">
              <a
                href="https://wa.me/79147061161"
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 transition flex items-center space-x-1.5 text-slate-200 font-medium group"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Основная линия навигации (Daikin Corporate Clean Style) */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200 py-3'
            : 'bg-white border-b border-slate-200 py-3.5 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Корпоративный логотип: Четкий, технологичный, респектабельный */}
          <div className="flex items-center shrink-0 mr-8">
            <Link href="/" className="flex items-center space-x-3.5 focus:outline-none group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#0062D2] flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:bg-[#004bb5] transition duration-200">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04" />
                  <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04" />
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5 whitespace-nowrap">
                  <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-none">
                    ЦЕНТР
                  </span>
                  <span className="text-lg sm:text-xl font-black text-[#0062D2] tracking-tight leading-none">
                    КОНДИЦИОНЕРОВ
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 tracking-[0.15em] font-bold uppercase mt-1 whitespace-nowrap">
                  Климатическое оборудование и монтаж
                </span>
              </div>
            </Link>
          </div>

          {/* Меню навигации */}
          <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9 shrink-0">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-bold transition tracking-tight ${
                  link.highlight
                    ? 'text-[#0062D2] hover:text-blue-800'
                    : 'text-slate-700 hover:text-[#0062D2]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Правый блок контактов: чёткий, без нагромождения и сжатий */}
          <div className="hidden sm:flex items-center space-x-4 shrink-0">
            {/* Быстрые иконки избранного и сравнения */}
            <div className="flex items-center space-x-1">
              <Link
                href="/catalog?fav=1"
                className="p-2.5 rounded-xl text-slate-600 hover:text-red-500 hover:bg-slate-100 transition relative flex items-center justify-center"
                title="Избранные модели"
                aria-label="Избранное"
              >
                <Heart className="w-4 h-4" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Link>

              <Link
                href="/compare"
                className="p-2.5 rounded-xl text-slate-600 hover:text-[#0062D2] hover:bg-slate-100 transition relative flex items-center justify-center"
                title="Сравнение моделей"
                aria-label="Сравнение"
              >
                <Scale className="w-4 h-4" />
                {compareCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#0062D2] text-white text-[10px] font-black flex items-center justify-center">
                    {compareCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Блок телефона: чётко в одну строку с плашкой Владивосток */}
            <div className="text-right pl-3 border-l border-slate-200">
              <a
                href="tel:+74232761161"
                className="text-base font-black text-slate-900 hover:text-[#0062D2] transition tracking-tight whitespace-nowrap block"
              >
                +7 (4232) 76-11-61
              </a>
              <div className="text-[11px] text-slate-500 font-semibold whitespace-nowrap">
                Владивосток • Без выходных
              </div>
            </div>

            {/* Кнопка вызова инженера: уверенный премиальный стиль Daikin */}
            <button
              onClick={handleCtaClick}
              className="px-5 py-2.5 bg-[#0062D2] hover:bg-[#004bb5] active:scale-[0.98] text-white text-sm font-bold rounded-lg transition-all duration-200 shadow-md shadow-[#0062D2]/25 flex items-center space-x-1.5 min-h-[42px] whitespace-nowrap"
            >
              <span>Консультация</span>
            </button>
          </div>

          {/* Мобильная кнопка меню */}
          <div className="flex sm:hidden items-center space-x-2">
            <a
              href="tel:+74232761161"
              aria-label="Позвонить"
              className="p-2.5 text-slate-700 hover:text-[#0062D2] bg-slate-100 rounded-xl min-h-[42px] min-w-[42px] flex items-center justify-center"
            >
              <Phone className="w-5 h-5 text-[#0062D2]" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              className="p-2.5 text-slate-700 hover:text-[#0062D2] bg-slate-100 rounded-xl min-h-[42px] min-w-[42px] flex items-center justify-center focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Выдвижное мобильное меню */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="fixed top-16 right-0 left-0 bg-white border-b border-slate-200 p-6 shadow-2xl space-y-5 max-h-[85vh] overflow-y-auto">
            <div className="text-xs font-bold text-[#0062D2] uppercase tracking-wider">
              Навигация
            </div>
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-800 hover:text-[#0062D2] py-2.5 border-b border-slate-100"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-2 space-y-3">
              <div className="flex items-center justify-between text-xs py-2 text-slate-600">
                <span>Города выезда:</span>
                <span className="font-semibold text-slate-900">Владивосток, Артём, Уссурийск</span>
              </div>
              <div className="flex items-center justify-between text-xs py-2 text-slate-600">
                <span>Режим работы:</span>
                <span className="font-semibold text-slate-900">Пн–Вс 8:00 – 21:00</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href="tel:+74232761161"
                  className="flex items-center justify-center space-x-2 py-3 bg-slate-100 text-slate-800 rounded-xl font-bold text-xs sm:text-sm min-h-[44px]"
                >
                  <Phone className="w-4 h-4 text-[#0062D2]" />
                  <span>Позвонить</span>
                </a>
                <a
                  href="https://wa.me/79147061161"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center space-x-2 py-3 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl font-bold text-xs sm:text-sm min-h-[44px]"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <button
                onClick={handleCtaClick}
                className="w-full py-3.5 bg-[#0062D2] text-white font-bold rounded-lg text-center shadow-lg shadow-[#0062D2]/25 min-h-[44px] text-sm"
              >
                Получить консультацию инженера
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
