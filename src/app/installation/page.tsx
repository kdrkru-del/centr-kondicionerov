import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { COMPANY_CONFIG } from '@/config/company';
import { ShieldCheck, Clock, CheckCircle2, Wrench, ArrowRight, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Установка кондиционеров во Владивостоке — стоимость монтажа под ключ | Центр Кондиционеров',
  description: 'Профессиональная установка сплит-систем во Владивостоке, Артёме и Уссурийске. Аккуратный монтаж за 2–4 часа без пыли и повреждений отделки, гарантия до 4 лет, оплата после выполнения работ.',
  alternates: {
    canonical: '/installation'
  },
  openGraph: {
    title: 'Установка кондиционеров во Владивостоке под ключ | Центр Кондиционеров',
    description: 'Монтаж сплит-систем с гарантией до 4 лет. Выезд в день обращения во Владивостоке, Артёме и Уссурийске.',
    url: 'https://кондиционеры-владивосток.рф/installation',
    type: 'website'
  }
};

export default function InstallationPage() {
  const steps = [
    {
      title: 'Стандартный монтаж за 2–4 часа',
      desc: 'Выполняем аккуратную установку без повреждения чистовой отделки и лишней пыли.'
    },
    {
      title: 'Полный комплект расходных материалов',
      desc: 'Межблочная фреоновая трасса в теплоизоляции, кабель питания, дренаж и усиленные кронштейны.'
    },
    {
      title: 'Вакуумирование и запуск',
      desc: 'Обязательная проверка герметичности контура, удаление влаги и воздуха, тестирование режимов охлаждения и обогрева.'
    },
    {
      title: 'Обучение и сдача работы',
      desc: 'Показываем, как управлять сплит-системой с пульта, чистить фильтры и настраивать комфортную температуру.'
    }
  ];

  return (
    <div className="bg-white min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-xs text-slate-400 mb-8" aria-label="Хлебные крошки">
          <Link href="/" className="hover:text-blue-600 transition">Главная</Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">Установка кондиционеров</span>
        </nav>

        {/* H1 and Intro */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Wrench className="w-3.5 h-3.5 text-blue-600" />
            <span>Профессиональный монтаж</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Установка кондиционеров <br />во Владивостоке
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Продаём и профессионально устанавливаем надежные сплит-системы в квартирах, частных домах и офисах. Работаем во Владивостоке, Артёме и Уссурийске. {COMPANY_CONFIG.warrantyText}.
          </p>
        </div>

        {/* Key standards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {steps.map((item, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center space-x-2.5 font-bold text-slate-900 text-base">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                <span>{item.title}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-7">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Transparent pricing note */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 mb-12 shadow-xl">
          <div className="max-w-2xl space-y-4">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold rounded-full uppercase tracking-wider">
              Честная стоимость
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Цена «под ключ» фиксируется до начала работ
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Мы не навязываем скрытых платежей на объекте. Для популярных моделей в нашем каталоге зафиксирована итоговая стоимость кондиционера вместе со стандартной установкой.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{COMPANY_CONFIG.paymentTerms}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Выезд в день обращения</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition"
              >
                <span>Выбрать модель в каталоге</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={COMPANY_CONFIG.phones.primary.tel}
                className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-sm transition"
              >
                <Phone className="w-4 h-4 text-blue-400" />
                <span>{COMPANY_CONFIG.phones.primary.formatted}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
