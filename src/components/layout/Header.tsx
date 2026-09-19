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
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Каталог систем', href: '/catalog', highlight: true },
    { name: 'Калькулятор подбора', href: '/selection' },
    { name: 'Стандарты монтажа', href: '/installation' },
    { name: 'Гарантия 4 года', href: '/#warranty' },
    { name: 'Контакты', href: '/#contacts' }
  ];

  const handleCtaClick = () => {
    if (onOpenModal) {
      onOpenModal(undefined, 'Кнопка в шапке сайта: Вызов инженера');
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* 1. Верхняя сервисная строчка (Pre-header): Ювелирная светлая классика */}
      <div className="bg-[#FAF9F6] border-b border-slate-200/60 text-slate-600 text-[11px] sm:text-xs py-2 hidden md:block tracking-normal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1.5 text-slate-800 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#0062D2] shrink-0" />
              <span>{COMPANY_CONFIG.citiesListText}</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 ml-1.5 animate-pulse" />
              <span className="text-[11px] text-emerald-700 font-semibold">Штатные монтажные бригады на линии</span>
            </div>
            <div className="flex items-center space-x-1.5 text-slate-500">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Ежедневно 8:00 – 21:00</span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1.5 text-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0062D2]" />
              <span>Гарантия до 4 лет • Оплата после приёмки</span>
            </div>
            <div className="flex items-center space-x-3 pl-3 border-l border-slate-200">
              <a
                href="https://wa.me/79147061161"
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-600 transition flex items-center space-x-1.5 text-slate-700 font-medium group"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Основная линия навигации (Header): Деликатное матовое стекло */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_30px_-6px_rgba(0,0,0,0.06)] border-b border-slate-200/80 py-3'
            : 'bg-white/90 backdrop-blur-md border-b border-slate-200/60 py-3.5 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Логотип: Лаконичный технологичный знак + благородный шрифт */}
          <div className="flex items-center shrink-0 mr-6 xl:mr-10">
            <Link href="/" className="flex items-center space-x-3.5 focus:outline-none group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-[#0062D2] via-[#0284C7] to-[#38BDF8] p-[1.5px] shadow-sm shadow-blue-500/20 group-hover:scale-105 transition duration-300">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center relative overflow-hidden">
                  <svg className="w-6 h-6 text-[#0062D2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04" />
                    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5 whitespace-nowrap">
                  <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-none">
                    ЦЕНТР
                  </span>
                  <span className="text-base sm:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0062D2] to-sky-600 tracking-tight leading-none">
                    КОНДИЦИОНЕРОВ
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 tracking-widest font-semibold uppercase mt-1 whitespace-nowrap">
                  Инженерные климатические системы
                </span>
              </div>
            </Link>
          </div>

          {/* Меню навигации */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 shrink-0">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold transition tracking-tight ${
                  link.highlight
                    ? 'text-[#0062D2] hover:text-blue-700'
                    : 'text-slate-700 hover:text-[#0062D2]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Правый блок контактов и CTA */}
          <div className="hidden sm:flex items-center space-x-4">
            {/* Быстрый доступ к Избранному и Сравнению со счетчиками */}
            <div className="flex items-center space-x-1.5">
              <Link
                href="/catalog?fav=1"
                className="p-2.5 rounded-xl text-slate-500 hover:text-red-500 hover:bg-red-50/80 border border-slate-200/80 transition relative flex items-center justify-center"
                title="Избранные модели"
                aria-label="Избранное"
              >
                <Heart className="w-4 h-4" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                    {favorites.length}
                  </span>
                )}
              </Link>

              <Link
                href="/compare"
                className="p-2.5 rounded-xl text-slate-500 hover:text-[#0062D2] hover:bg-blue-50/80 border border-slate-200/80 transition relative flex items-center justify-center"
                title="Сравнение моделей"
                aria-label="Сравнение"
              >
                <Scale className="w-4 h-4" />
                {compareCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#0062D2] text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                    {compareCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Прямой телефон с жирным начертанием */}
            <div className="text-right pl-3 border-l border-slate-200">
              <a
                href="tel:+74232761161"
                className="flex items-center space-x-1.5 text-sm sm:text-base font-black text-slate-900 hover:text-[#0062D2] transition tracking-tight"
              >
                <Phone className="w-3.5 h-3.5 text-[#0062D2]" />
                <span>+7 (4232) 76-11-61</span>
              </a>
              <div className="text-[11px] text-slate-500 font-medium">
                Владивосток • Без выходных
              </div>
            </div>

            {/* Кнопка вызова инженера: статусный синий цвет #0062D2, скругление 12px, микро-отклик */}
            <button
              onClick={handleCtaClick}
              className="px-4 py-2.5 bg-[#0062D2] hover:bg-[#1D68BD] active:scale-[0.98] text-white text-xs sm:text-sm font-bold rounded-[12px] transition-all duration-200 shadow-md shadow-[#0062D2]/25 flex items-center space-x-1.5 min-h-[42px]"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-200" />
              <span>Вызов инженера</span>
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
                className="w-full py-3.5 bg-[#0062D2] text-white font-bold rounded-[12px] text-center shadow-lg shadow-[#0062D2]/25 min-h-[44px] text-sm"
              >
                Вызов инженера
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
