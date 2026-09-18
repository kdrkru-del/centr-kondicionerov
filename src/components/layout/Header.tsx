'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Menu, X, Sparkles, MessageSquare, Heart, Scale } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';
import { useCompare } from '@/context/CompareContext';

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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Каталог', href: '/catalog' },
    { name: 'Подбор', href: '/selection' },
    { name: 'Гарантия', href: '/#warranty' },
    { name: 'Частые вопросы', href: '/#faq' },
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
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-header shadow-sm border-b border-slate-200/80 py-3'
            : 'bg-white/95 backdrop-blur-sm border-b border-slate-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & City */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center focus:outline-none group">
              <div className="relative h-10 w-44 sm:w-52">
                <Image
                  src="/images/logo.svg"
                  alt="Центр кондиционеров"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </Link>
            <div className="hidden xl:flex items-center text-xs text-slate-400 pl-3 border-l border-slate-200">
              Владивосток • Артём • Уссурийск
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-700 hover:text-blue-600 transition tracking-tight"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right contacts & CTA button */}
          <div className="hidden sm:flex items-center space-x-4">
            {/* Quick favorites & compare links */}
            <div className="flex items-center space-x-1.5">
              <Link
                href="/catalog?fav=1"
                className="p-2 rounded-xl text-slate-500 hover:text-red-500 hover:bg-red-50 transition relative flex items-center justify-center"
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
                className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition relative flex items-center justify-center"
                title="Сравнение моделей"
                aria-label="Сравнение"
              >
                <Scale className="w-4 h-4" />
                {compareCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center">
                    {compareCount}
                  </span>
                )}
              </Link>
            </div>

            <div className="text-right pl-2 border-l border-slate-200">
              <a
                href="tel:+74232761161"
                className="flex items-center space-x-1.5 text-sm font-bold text-slate-900 hover:text-blue-600 transition"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>+7 (4232) 76-11-61</span>
              </a>
              <div className="text-[11px] text-slate-500 font-medium">
                Без выходных
              </div>
            </div>

            <button
              onClick={handleCtaClick}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-semibold rounded-xl transition shadow-md shadow-blue-500/20 flex items-center space-x-1.5 min-h-[44px]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Подобрать кондиционер</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center space-x-2">
            <a
              href="tel:+74232761161"
              aria-label="Позвонить"
              className="p-2.5 text-slate-700 hover:text-blue-600 bg-slate-100 rounded-xl min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <Phone className="w-5 h-5 text-blue-600" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              className="p-2.5 text-slate-700 hover:text-blue-600 bg-slate-100 rounded-xl min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="fixed top-16 right-0 left-0 bg-white border-b border-slate-200 p-6 shadow-2xl space-y-5">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Навигация
            </div>
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-800 hover:text-blue-600 py-2 border-b border-slate-100"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-2 space-y-3">
              <div className="flex items-center justify-between text-sm py-2">
                <span className="text-slate-500">Города выезда:</span>
                <span className="font-semibold text-slate-800">Владивосток, Артём, Уссурийск</span>
              </div>
              <div className="flex items-center justify-between text-sm py-2">
                <span className="text-slate-500">Режим работы:</span>
                <span className="font-semibold text-slate-800">Пн–Вс 8:00 – 21:00</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href="tel:+74232761161"
                  className="flex items-center justify-center space-x-2 py-3 bg-slate-100 text-slate-800 rounded-xl font-semibold text-sm min-h-[44px]"
                >
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>Позвонить</span>
                </a>
                <a
                  href="https://wa.me/79147061161"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center space-x-2 py-3 bg-emerald-50 text-emerald-700 rounded-xl font-semibold text-sm min-h-[44px]"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <button
                onClick={handleCtaClick}
                className="w-full py-3.5 bg-blue-600 text-white font-semibold rounded-xl text-center shadow-lg shadow-blue-500/25 min-h-[44px]"
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
