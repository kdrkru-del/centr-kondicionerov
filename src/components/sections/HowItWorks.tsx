import React from 'react';
import { PhoneCall, SlidersHorizontal, FileText, Truck, ShieldCheck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Оставляете заявку',
      desc: 'На сайте или по телефону. Специалист уточнит площадь и ваши пожелания.',
      icon: PhoneCall
    },
    {
      num: '02',
      title: 'Подбираем модель',
      desc: 'Предложим 2–3 варианта под бюджет с честным расчетом мощности.',
      icon: SlidersHorizontal
    },
    {
      num: '03',
      title: 'Согласуем стоимость',
      desc: 'Фиксируем цену оборудования и монтажа. Никаких доплат на объекте.',
      icon: FileText
    },
    {
      num: '04',
      title: 'Доставка и монтаж',
      desc: 'Оперативно доставим и аккуратно смонтируем выбранную сплит-систему.',
      icon: Truck
    },
    {
      num: '05',
      title: 'Проверка и гарантия',
      desc: 'Тестируем систему, предоставляем гарантию до 4 лет. Оплата строго по факту.',
      icon: ShieldCheck
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50/70 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1 rounded-full">
            Простой и понятный процесс
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
            Как мы работаем
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            От вашей заявки до комфортной прохлады в помещении — всего 5 прозрачных шагов.
          </p>
        </div>

        {/* Steps Grid: horizontal on desktop, vertical on mobile */}
        <div className="relative">
          {/* Connector line on desktop */}
          <div className="hidden lg:block absolute top-12 left-10 right-10 h-0.5 bg-blue-100 -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between text-left card-hover-elevation"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-2xl font-black text-slate-200">
                        {step.num}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
