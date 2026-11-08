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
    { name: 'Подбор кондиционера', href: '/selection' },
    { name: 'Стандарты монтажа', href: '/installation' },
    { name: 'Гарантия и сервис', href: '/#warranty' },
    { name: 'Контакты', href: '/#contacts' }
  ];

  const handleCtaClick = () => {
    if (onOpenModal) {
      onOpenModal(undefined, 'Кнопка в шапке сайта: Консультация');
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Основная линия навигации (Daikin Corporate Clean Style) */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200 py-2.5 sm:py-3'
            : 'bg-white border-b border-slate-200 py-3 sm:py-3.5'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Корпоративный логотип */}
          <div className="flex items-center shrink-0 min-w-0">
            <Link href="/" className="flex items-center space-x-2.5 sm:space-x-3 focus:outline-none group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0062D2] flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:bg-[#004bb5] transition duration-200 shrink-0">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04" />
                  <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04" />
                </svg>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center space-x-1 sm:space-x-1.5 whitespace-nowrap">
                  <span className="text-sm xs:text-base sm:text-lg font-black text-slate-900 tracking-tight leading-none">
                    ЦЕНТР
                  </span>
                  <span className="text-sm xs:text-base sm:text-lg font-black text-[#0062D2] tracking-tight leading-none">
                    КОНДИЦИОНЕРОВ
                  </span>
                </div>
                <div className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-tight mt-0.5 leading-tight">
                  <span className="hidden sm:inline">Климатическое оборудование и монтаж</span>
                  <span className="sm:hidden">Климатическая техника</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Меню навигации (на больших экранах >= 1280px) */}
          <nav className="hidden xl:flex items-center space-x-5 2xl:space-x-7 shrink-0">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs 2xl:text-sm font-bold transition tracking-tight ${
                  link.highlight
                    ? 'text-[#0062D2] hover:text-blue-800'
                    : 'text-slate-700 hover:text-[#0062D2]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Правый блок: Избранное, сравнение, телефон, кнопка меню */}
          <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
            {/* Быстрые иконки избранного и сравнения */}
            <div className="hidden sm:flex items-center space-x-1">
              <Link
                href="/catalog?fav=1"
                className="p-2 rounded-xl text-slate-600 hover:text-red-500 hover:bg-slate-100 transition relative flex items-center justify-center"
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
                className="p-2 rounded-xl text-slate-600 hover:text-[#0062D2] hover:bg-slate-100 transition relative flex items-center justify-center"
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

            {/* Блок прямого телефона (на экранах >= 640px) */}
            <div className="hidden sm:flex items-center space-x-2 pl-3 border-l border-slate-200">
              <div className="text-right">
                <a
                  href="tel:+74232761161"
                  className="text-sm lg:text-base font-black text-slate-900 hover:text-[#0062D2] transition tracking-tight whitespace-nowrap block"
                >
                  +7 (4232) 76-11-61
                </a>
                <div className="text-[10px] text-slate-500 font-semibold whitespace-nowrap">
                  Владивосток • Без выходных
                </div>
              </div>
              <div className="flex items-center space-x-1 pl-1">
                <a
                  href="https://wa.me/79147061161?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%9F%D0%BE%D0%B4%D1%81%D0%BA%D0%B0%D0%B6%D0%B8%D1%82%D0%B5%20%D0%BF%D0%BE%20%D0%BF%D0%BE%D0%B4%D0%B1%D0%BE%D1%80%D1%83%20%D0%BA%D0%BE%D0%BD%D0%B4%D0%B8%D1%86%D0%B8%D0%BE%D0%BD%D0%B5%D1%80%D0%B0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 flex items-center justify-center transition"
                  title="Написать в WhatsApp"
                  aria-label="WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
                <a
                  href="https://t.me/+79147061161"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-600 flex items-center justify-center transition"
                  title="Написать в Telegram"
                  aria-label="Telegram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Мобильная кнопка вызова для смартфонов */}
            <a
              href="tel:+74232761161"
              aria-label="Позвонить"
              className="sm:hidden p-2 text-slate-700 hover:text-[#0062D2] bg-slate-100 rounded-xl min-h-[40px] min-w-[40px] flex items-center justify-center"
            >
              <Phone className="w-4 h-4 text-[#0062D2]" />
            </a>

            {/* Кнопка мобильного меню (для планшетов и экранов < 1280px) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              className="xl:hidden p-2 text-slate-700 hover:text-[#0062D2] bg-slate-100 rounded-xl min-h-[40px] min-w-[40px] flex items-center justify-center focus:outline-none"
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
                <span className="font-semibold text-slate-900">Без выходных</span>
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
                Получить консультацию
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
