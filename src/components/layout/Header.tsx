'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Menu, X, Sparkles, MessageSquare, Heart, Scale, MapPin, Clock, ShieldCheck, ChevronDown } from 'lucide-react';
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
    { name: 'Каталог с ценами', href: '/catalog', highlight: true },
    { name: 'Калькулятор подбора', href: '/selection' },
    { name: 'Монтаж под ключ', href: '/installation' },
    { name: 'Гарантия 4 года', href: '/#warranty' },
    { name: 'Контакты', href: '/#contacts' }
  ];

  const handleCtaClick = () => {
    if (onOpenModal) {
      onOpenModal(undefined, 'Кнопка в шапке сайта');
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Pre-header Bar: Luxury subtle strip */}
      <div className="bg-[#0B1528] text-slate-300 text-[11px] sm:text-xs py-2 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1.5 text-slate-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>{COMPANY_CONFIG.citiesListText}</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
              <span className="text-[11px] text-emerald-400 font-normal">Монтажники на дежурстве</span>
            </div>
            <div className="flex items-center space-x-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Ежедневно 8:00 – 21:00</span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Гарантия до 4 лет • Оплата после установки</span>
            </div>
            <div className="flex items-center space-x-3 pl-3 border-l border-white/10">
              <a
                href="https://wa.me/79147061161"
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 transition flex items-center space-x-1 text-slate-300"
              >
                <MessageSquare className="w-3 h-3 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Premium Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0B1528]/95 backdrop-blur-md shadow-2xl border-b border-white/10 py-3'
            : 'bg-[#0B1528] border-b border-white/10 py-3.5 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo with Pure SVG Icon + Premium Typography */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3 focus:outline-none group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-sky-500 to-cyan-400 p-[1px] shadow-lg shadow-blue-500/20 group-hover:scale-105 transition duration-300">
                <div className="w-full h-full bg-[#0B1528] rounded-[11px] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-blue-500/20 transition" />
                  <svg className="w-6 h-6 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04" />
                    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className="text-base sm:text-lg font-black text-white tracking-tight leading-none">
                    ЦЕНТР
                  </span>
                  <span className="text-base sm:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400 tracking-tight leading-none">
                    КОНДИЦИОНЕРОВ
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 tracking-wider font-semibold uppercase mt-0.5">
                  Климатические системы и монтаж
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold transition tracking-tight ${
                  link.highlight
                    ? 'text-sky-400 hover:text-sky-300'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right contacts & CTA button */}
          <div className="hidden sm:flex items-center space-x-4">
            {/* Quick favorites & compare links */}
            <div className="flex items-center space-x-2">
              <Link
                href="/catalog?fav=1"
                className="p-2.5 rounded-xl text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition relative flex items-center justify-center"
                title="Избранные модели"
                aria-label="Избранное"
              >
                <Heart className="w-4 h-4" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center ring-2 ring-[#0B1528]">
                    {favorites.length}
                  </span>
                )}
              </Link>

              <Link
                href="/compare"
                className="p-2.5 rounded-xl text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition relative flex items-center justify-center"
                title="Сравнение моделей"
                aria-label="Сравнение"
              >
                <Scale className="w-4 h-4" />
                {compareCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-sky-500 text-white text-[10px] font-black flex items-center justify-center ring-2 ring-[#0B1528]">
                    {compareCount}
                  </span>
                )}
              </Link>
            </div>

            <div className="text-right pl-3 border-l border-white/15">
              <a
                href="tel:+74232761161"
                className="flex items-center space-x-1.5 text-sm sm:text-base font-extrabold text-white hover:text-sky-400 transition tracking-tight"
              >
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span>+7 (4232) 76-11-61</span>
              </a>
              <div className="text-[11px] text-slate-400 font-medium">
                Владивосток • Без выходных
              </div>
            </div>

            <button
              onClick={handleCtaClick}
              className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 active:scale-95 text-white text-xs sm:text-sm font-bold rounded-xl transition shadow-lg shadow-blue-500/25 flex items-center space-x-1.5 min-h-[42px]"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-200" />
              <span>Подобрать</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center space-x-2">
            <a
              href="tel:+74232761161"
              aria-label="Позвонить"
              className="p-2.5 text-white hover:text-sky-400 bg-white/10 rounded-xl min-h-[42px] min-w-[42px] flex items-center justify-center"
            >
              <Phone className="w-5 h-5 text-sky-400" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              className="p-2.5 text-white hover:text-sky-400 bg-white/10 rounded-xl min-h-[42px] min-w-[42px] flex items-center justify-center focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#070D18]/80 backdrop-blur-md animate-fadeIn">
          <div className="fixed top-16 right-0 left-0 bg-[#0B1528] border-b border-white/15 p-6 shadow-2xl space-y-5 max-h-[85vh] overflow-y-auto">
            <div className="text-xs font-bold text-sky-400 uppercase tracking-wider">
              Навигация
            </div>
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-200 hover:text-sky-400 py-2.5 border-b border-white/10"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-2 space-y-3">
              <div className="flex items-center justify-between text-xs py-2 text-slate-300">
                <span className="text-slate-400">Города выезда:</span>
                <span className="font-semibold text-white">Владивосток, Артём, Уссурийск</span>
              </div>
              <div className="flex items-center justify-between text-xs py-2 text-slate-300">
                <span className="text-slate-400">Режим работы:</span>
                <span className="font-semibold text-white">Пн–Вс 8:00 – 21:00</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href="tel:+74232761161"
                  className="flex items-center justify-center space-x-2 py-3 bg-white/10 text-white rounded-xl font-bold text-xs sm:text-sm min-h-[44px]"
                >
                  <Phone className="w-4 h-4 text-sky-400" />
                  <span>Позвонить</span>
                </a>
                <a
                  href="https://wa.me/79147061161"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center space-x-2 py-3 bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 rounded-xl font-bold text-xs sm:text-sm min-h-[44px]"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <button
                onClick={handleCtaClick}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-sky-500 text-white font-bold rounded-xl text-center shadow-lg shadow-blue-500/25 min-h-[44px] text-sm"
              >
                Подобрать кондиционер
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
