import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Home, Search, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Страница не найдена (404) | Центр Кондиционеров',
  description: 'Запрашиваемая страница не существует или была перемещена.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4 py-16">
      <div className="max-w-md w-full text-center bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 font-black text-2xl">
          404
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
          Страница не найдена
        </h1>
        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
          Возможно, адрес был изменен или страница была перемещена при обновлении каталога. Воспользуйтесь разделами ниже:
        </p>

        <div className="space-y-3">
          <Link
            href="/catalog"
            className="w-full inline-flex items-center justify-center space-x-2 py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition shadow-md shadow-blue-500/20"
          >
            <Search className="w-4 h-4" />
            <span>Каталог кондиционеров</span>
          </Link>

          <Link
            href="/selection"
            className="w-full inline-flex items-center justify-center space-x-2 py-3.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-sm font-semibold transition"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Подобрать кондиционер</span>
          </Link>

          <Link
            href="/"
            className="w-full inline-flex items-center justify-center space-x-2 py-3 px-4 text-slate-500 hover:text-slate-800 text-xs font-semibold transition"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Вернуться на главную</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
