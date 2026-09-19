import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, CheckCircle2, Sliders, Layers } from 'lucide-react';

export const SelectionTeaser: React.FC = () => {
  const steps = [
    {
      icon: Layers,
      step: 'Шаг 1',
      title: 'Площадь помещения',
      desc: 'Выберите диапазон площади вашей комнаты или квартиры',
    },
    {
      icon: Sliders,
      step: 'Шаг 2',
      title: 'Тип объекта и приоритет',
      desc: 'Квартира, дом или офис; акцент на цену или инверторные технологии',
    },
    {
      icon: CheckCircle2,
      step: 'Шаг 3',
      title: 'Подходящие модели',
      desc: 'Покажем подходящие варианты сплит-систем из каталога',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50/70 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Быстрый подбор кондиционера
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            Ответьте на 3 вопроса — система отфильтрует проверенные модели под ваши требования и площадь.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-5xl mx-auto">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-sm relative flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 font-bold">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href="/selection"
            className="inline-flex items-center space-x-2.5 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/25 transition text-base"
          >
            <span>Запустить онлайн-подбор</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
