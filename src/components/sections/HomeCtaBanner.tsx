import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface HomeCtaBannerProps {
  onOpenModal: (productName?: string, source?: string) => void;
}

export const HomeCtaBanner: React.FC<HomeCtaBannerProps> = ({ onOpenModal }) => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-8 sm:p-12 text-white shadow-xl">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Профессиональный монтаж во Владивостоке</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-4">
              Не уверены, какая мощность подойдёт для вашего помещения?
            </h2>

            <p className="text-slate-300 text-sm sm:text-base mb-8 max-w-2xl leading-relaxed">
              Ответьте на 3 простых вопроса в онлайн-подборе или оставьте заявку — специалист перезвонит, рассчитает точную нагрузку и назовёт итоговую стоимость с установкой.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/selection"
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/30 transition flex items-center justify-center space-x-2 text-base"
              >
                <Sparkles className="w-5 h-5 text-blue-200" />
                <span>Пройти онлайн-подбор</span>
              </Link>

              <button
                type="button"
                onClick={() => onOpenModal('Заказ звонка специалиста', 'Баннер середины страницы')}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-2xl border border-white/20 transition flex items-center justify-center space-x-2 text-base"
              >
                <span>Консультация специалиста</span>
                <ArrowRight className="w-4 h-4 text-slate-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
