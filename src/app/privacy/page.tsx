import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { COMPANY_CONFIG } from '@/config/company';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности | Центр Кондиционеров',
  description: 'Политика обработки персональных данных компании Центр Кондиционеров во Владивостоке.',
  robots: {
    index: false,
    follow: false
  },
  alternates: {
    canonical: '/privacy'
  }
};

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs font-semibold text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Вернуться на главную</span>
        </Link>

        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Политика конфиденциальности
          </h1>
        </div>

        <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-600 space-y-4 leading-relaxed">
          <p>
            Настоящая Политика обработки персональных данных определяет порядок сбора, хранения и защиты информации пользователей при использовании сайта компании «Центр Кондиционеров» ({COMPANY_CONFIG.name}).
          </p>

          <h2 className="text-base sm:text-lg font-bold text-slate-900 pt-4">
            1. Собираемые данные
          </h2>
          <p>
            При оформлении онлайн-заявки или обращении через формы сайта мы запрашиваем имя контактного лица, номер телефона, город и ориентировочные параметры помещения (площадь), необходимые исключительно для расчета мощности сплит-системы и согласования выезда специалистов.
          </p>

          <h2 className="text-base sm:text-lg font-bold text-slate-900 pt-4">
            2. Цели обработки
          </h2>
          <p>
            Сбор и обработка персональных данных осуществляются исключительно в целях:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Связи с клиентом для консультации и подбора климатической техники;</li>
            <li>Расчета стоимости сплит-системы и условий установки;</li>
            <li>Согласования даты и времени доставки и монтажа оборудования.</li>
          </ul>

          <h2 className="text-base sm:text-lg font-bold text-slate-900 pt-4">
            3. Защита информации
          </h2>
          <p>
            Мы не передаем контактные данные третьим лицам и маркетинговым агентствам. Все переданные сведения используются исключительно сервисной службой компании «Центр Кондиционеров».
          </p>

          <h2 className="text-base sm:text-lg font-bold text-slate-900 pt-4">
            4. Контакты
          </h2>
          <p>
            По всем вопросам обработки ваших персональных данных вы можете связаться с нами по электронной почте{' '}
            <a href={`mailto:${COMPANY_CONFIG.email}`} className="text-blue-600 underline">
              {COMPANY_CONFIG.email}
            </a>{' '}
            или по телефону {COMPANY_CONFIG.phones.primary.formatted}.
          </p>
        </div>
      </div>
    </div>
  );
}
