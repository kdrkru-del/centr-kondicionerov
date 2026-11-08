'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export const CookieBanner: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('kondic_cookie_consent');
      if (!consent) setShow(true);
    } catch {}
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('kondic_cookie_consent', 'accepted');
    } catch {}
    setShow(false);
  };

  if (!show) return null;

  return (
    <aside
      aria-label="Уведомление об использовании файлов cookie"
      className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-5 bg-slate-900/95 backdrop-blur-md text-slate-200 border-t border-slate-800 shadow-2xl transition-all"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p className="leading-relaxed text-slate-300 text-center sm:text-left">
          Мы используем файлы cookie и счетчики аналитики (Яндекс.Метрика) для технической работы сайта и улучшения сервиса. Продолжая использовать сайт, вы соглашаетесь с{' '}
          <Link href="/privacy" className="text-blue-400 hover:text-blue-300 underline font-medium">
            Политикой конфиденциальности
          </Link>.
        </p>
        <button
          onClick={handleAccept}
          className="shrink-0 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
        >
          Принять и продолжить
        </button>
      </div>
    </aside>
  );
};
