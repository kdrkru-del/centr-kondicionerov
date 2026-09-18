import React from 'react';
import { ShieldCheck, Award, Wrench, HeadphonesIcon, CheckCircle2 } from 'lucide-react';

export const WarrantySection: React.FC = () => {
  const points = [
    {
      title: 'Гарантия до 4-х лет',
      desc: 'Гарантия на климатическую технику до 4 лет. Полная ответственность за результат.',
      icon: Award
    },
    {
      title: 'Выезд в день обращения',
      desc: 'Оперативная доставка и монтаж кондиционера во Владивостоке, Артёме и Уссурийске.',
      icon: Wrench
    },
    {
      title: 'Оплата после выполнения',
      desc: 'Никаких предоплат за работу — проверяете охлаждение и только потом оплачиваете.',
      icon: ShieldCheck
    },
    {
      title: 'Проверенные бренды',
      desc: 'Мы работаем с надежными марками MDV, Amston, Dahatsu и Hunberg.',
      icon: HeadphonesIcon
    }
  ];

  return (
    <section id="warranty" className="py-16 sm:py-24 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Background climate glow */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Why we take full responsibility */}
          <div className="lg:col-span-6 space-y-6">
            <span className="px-3.5 py-1.5 bg-blue-500/20 text-blue-300 text-xs font-bold rounded-full uppercase tracking-wider border border-blue-500/30">
              Комплексный подход
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Почему мы устанавливаем <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">
                только свои кондиционеры?
              </span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Наша компания предлагает комплексный подход: продажу и профессиональную установку кондиционеров. Мы работаем только с проверенными брендами и моделями, которые сами подбираем и поставляем.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span><b>Качество оборудования</b> — мы знаем особенности наших кондиционеров и предоставляем гарантию до 4 лет.</span>
              </div>
              <div className="flex items-start space-x-3 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span><b>Идеальный монтаж</b> — наши специалисты имеют опыт работы именно с этими моделями, что исключает ошибки при установке.</span>
              </div>
              <div className="flex items-start space-x-3 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span><b>Ответственность</b> — если оборудование и монтаж выполняем мы, мы полностью отвечаем за результат без споров о несовместимости.</span>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Guarantee Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {points.map((point, index) => {
              const Icon = point.icon;
              return (
                <div
                  key={index}
                  className="bg-slate-800/70 border border-slate-700/80 hover:border-blue-500/50 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">
                      {point.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {point.desc}
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
