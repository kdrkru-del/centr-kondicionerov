import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { COMPANY_CONFIG } from '@/config/company';
import { ShieldCheck, ArrowLeft, Lock, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности и обработки персональных данных | Центр Кондиционеров',
  description: 'Официальная политика обработки и защиты персональных данных пользователей сайта компании Центр Кондиционеров (ООО «Окна-Центр») в соответствии с ФЗ №152-ФЗ.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16 text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs font-semibold text-blue-600 hover:text-blue-700 mb-8 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Вернуться на главную</span>
        </Link>

        {/* Header Block */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200/80 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
                Политика конфиденциальности и обработки персональных данных
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Утверждена Генеральным директором ООО «Окна-Центр» Кошовенко Д. С. | Действует с 1 сентября 2025 г.
              </p>
            </div>
          </div>

          <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100 flex items-start space-x-3 text-xs sm:text-sm text-slate-700">
            <Lock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <p>
              Настоящая Политика определяет порядок и условия обработки персональных данных, собираемых через сайт{' '}
              <span className="font-semibold text-slate-900">центр-кондиционеров.рф</span> (и домен <code>centr-kondicionerov.ru</code>), а также устанавливает меры по обеспечению безопасности и защите конфиденциальной информации клиентов <strong>ООО «Окна-Центр»</strong> (ИНН 2543168553) в соответствии с требованиями 152-ФЗ РФ.
            </p>
          </div>
        </div>

        {/* Content Block */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200/80 text-xs sm:text-sm text-slate-600 leading-relaxed space-y-6">
          
          <section>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 mb-3">
              1. Общие положения
            </h2>
            <p className="mb-2">
              1.1. Настоящая Политика в отношении обработки персональных данных (далее — «Политика») подготовлена в строгом соответствии с п. 2 ч. 1 ст. 18.1 Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных».
            </p>
            <p className="mb-2">
              1.2. <strong>Оператор персональных данных:</strong> {COMPANY_CONFIG.legalName} ({COMPANY_CONFIG.shortLegalName}), ОГРН {COMPANY_CONFIG.ogrn}, ИНН {COMPANY_CONFIG.inn}, КПП {COMPANY_CONFIG.kpp}. Юридический адрес: {COMPANY_CONFIG.legalAddress}.
            </p>
            <p>
              1.3. Обработка персональных данных осуществляется с согласия Пользователя, предоставляемого путем осознанной установки отдельного флажка (чекбокса) в формах сайта, либо в целях заключения договора по инициативе субъекта (п. 5 ч. 1 ст. 6 152-ФЗ).
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 mb-3">
              2. Цели сбора и состав обрабатываемых данных
            </h2>
            <p className="mb-2">Персональные данные собираются исключительно для следующих законных целей:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Подбор модели кондиционера или сплит-системы по параметрам помещения;</li>
              <li>Расчет предварительной стоимости оборудования с учетом стандартного или индивидуального монтажа;</li>
              <li>Связь с заказчиком для согласования времени бесплатного выезда специалиста на осмотр трассы и монтаж;</li>
              <li>Заключение договора купли-продажи, оформление гарантийного талона (до 4 лет гарантии) и сервисного обслуживания.</li>
            </ul>
            <p className="mt-3 mb-1 font-semibold text-slate-800">Состав данных:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Имя (или имя контактного лица);</li>
              <li>Номер мобильного телефона;</li>
              <li>Населенный пункт (Владивосток, Артём, Уссурийск и др.);</li>
              <li>Параметры подбора (площадь, бренд, тип сплит-системы);</li>
              <li>Технические метаданные (IP-адрес, дата и время отправки, UTM-метки рекламной кампании).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 mb-3">
              3. Локализация баз данных в РФ (ч. 5 ст. 18 152-ФЗ)
            </h2>
            <p className="mb-2">
              Оператор гарантирует, что запись, систематизация, накопление, хранение, уточнение и извлечение персональных данных граждан РФ производятся с использованием баз данных, физически расположенных на территории Российской Федерации.
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 mb-3">
              4. Сроки обработки и уничтожение персональных данных
            </h2>
            <p className="mb-2">
              Персональные данные хранятся в течение срока, необходимого для достижения целей обработки (подбор оборудования, монтаж, срок действия гарантии), либо до момента отзыва согласия субъектом. При отзыве согласия данные подлежат уничтожению в срок, не превышающий 30 календарных дней (ст. 21 152-ФЗ).
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 mb-3">
              5. Права субъекта персональных данных
            </h2>
            <p className="mb-2">Субъект персональных данных имеет право:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Запрашивать сведения о порядке и основаниях обработки своих данных;</li>
              <li>Требовать уточнения, блокирования или уничтожения неполных или недостоверных данных;</li>
              <li>Отозвать согласие в любой момент, направив письмо на официальную электронную почту: <a href={`mailto:${COMPANY_CONFIG.email}`} className="text-blue-600 underline">{COMPANY_CONFIG.email}</a>.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 mb-3">
              6. Файлы cookie и Яндекс.Метрика
            </h2>
            <p className="mb-2">
              Сайт использует файлы cookie и веб-аналитику Яндекс.Метрика для оценки источников трафика. Персональные данные из форм ввода в аналитические отчеты не передаются. Пользователь может отключить сохранение cookie в настройках браузера.
            </p>
          </section>

          <section className="bg-slate-50 p-5 rounded-xl border border-slate-200">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center space-x-2 mb-3">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>7. Официальные реквизиты Оператора</span>
            </h2>
            <div className="space-y-1 font-mono text-xs text-slate-700">
              <p><strong>Оператор:</strong> {COMPANY_CONFIG.legalName}</p>
              <p><strong>Сокращенно:</strong> {COMPANY_CONFIG.shortLegalName}</p>
              <p><strong>ИНН:</strong> {COMPANY_CONFIG.inn} | <strong>КПП:</strong> {COMPANY_CONFIG.kpp}</p>
              <p><strong>ОГРН:</strong> {COMPANY_CONFIG.ogrn} | <strong>ОКПО:</strong> {COMPANY_CONFIG.okpo}</p>
              <p><strong>Генеральный директор:</strong> {COMPANY_CONFIG.director}</p>
              <p><strong>Юридический адрес:</strong> {COMPANY_CONFIG.legalAddress}</p>
              <p><strong>Телефоны:</strong> {COMPANY_CONFIG.phones.primary.formatted}, {COMPANY_CONFIG.phones.mobile.formatted}</p>
              <p><strong>Email:</strong> <a href={`mailto:${COMPANY_CONFIG.email}`} className="text-blue-600 underline">{COMPANY_CONFIG.email}</a></p>
            </div>
          </section>

        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-600 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Вернуться на сайт центр-кондиционеров.рф</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
