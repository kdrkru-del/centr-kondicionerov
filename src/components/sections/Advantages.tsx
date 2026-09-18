import React from 'react';
import { Shield, Clock, CircleDollarSign, CalendarDays } from 'lucide-react';

export const Advantages: React.FC = () => {
  const cards = [
    {
      value: 'До 4 лет',
      label: 'Гарантия на технику',
      description: 'Гарантия до 4 лет на оборудование. Конкретный срок зависит от выбранной модели.',
      icon: Shield,
      accent: 'blue'
    },
    {
      value: 'От 2 часов',
      label: 'Аккуратная установка',
      description: 'Оперативный монтаж сплит-системы опытными мастерами в удобное для вас время.',
      icon: Clock,
      accent: 'sky'
    },
    {
      value: '0 ₽',
      label: 'Оплата после монтажа',
      description: 'Оплата работ производится после завершения установки и проверки работоспособности.',
      icon: CircleDollarSign,
      accent: 'emerald'
    },
    {
      value: '7 дней',
      label: 'Работаем без выходных',
      description: 'Выездные бригады работают во Владивостоке, Артёме и Уссурийске в удобный для вас день.',
      icon: CalendarDays,
      accent: 'indigo'
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className="bg-slate-50/80 hover:bg-white rounded-3xl p-6 border border-slate-200/70 hover:border-blue-200 shadow-sm hover:shadow-xl transition-all duration-300 card-hover-elevation group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white group-hover:bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm border border-slate-100 transition">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-slate-900 tracking-tight">
                    {card.value}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">
                  {card.label}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
