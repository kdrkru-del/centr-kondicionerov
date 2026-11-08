import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { COMPANY_CONFIG } from '@/config/company';
import { CheckCircle2, ArrowLeft, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Согласие на обработку персональных данных — Центр Кондиционеров',
  description: 'Условия согласия на обработку персональных данных клиентов компании Центр Кондиционеров (ООО «Окна-Центр»).',
  robots: { index: true, follow: true },
  alternates: { canonical: '/consent' },
};

export default function ConsentPage() {
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

        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200/80 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
                Согласие на обработку персональных данных
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                В соответствии со статьей 9 Федерального закона № 152-ФЗ «О персональных данных»
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200/80 text-xs sm:text-sm text-slate-600 leading-relaxed space-y-6">
          <p>
            Отправляя контактную форму, заявку на бесплатный подбор сплит-системы, расчет стоимости монтажа или обратный звонок на сайте <strong>центр-кондиционеров.рф</strong> (или <code>centr-kondicionerov.ru</code>), я, действуя свободно, своей волей и в своем интересе, выражаю свое конкретное, предметное, информированное, сознательное и однозначное согласие <strong>{COMPANY_CONFIG.legalName}</strong> (ОГРН {COMPANY_CONFIG.ogrn}, ИНН {COMPANY_CONFIG.inn}, юридический адрес: {COMPANY_CONFIG.legalAddress}) на обработку моих персональных данных на следующих условиях:
          </p>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">1. Состав предоставляемых данных</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Имя;</li>
              <li>Номер мобильного телефона;</li>
              <li>Населенный пункт (Владивосток, Артём, Уссурийск и др.);</li>
              <li>Сведения о заказе (модель кондиционера, площадь помещения, этажность, необходимость монтажа);</li>
              <li>Технические параметры сессии (IP-адрес, источник перехода).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">2. Цели обработки</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Консультирование по ассортименту климатического оборудования;</li>
              <li>Предварительный расчет стоимости сплит-системы и монтажных работ;</li>
              <li>Согласование времени выезда монтажной бригады;</li>
              <li>Оформление гарантии до 4 лет и сервисное сопровождение.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">3. Локализация и перечень действий с данными</h2>
            <p>
              Сбор, запись, систематизация, накопление, хранение в базе данных на территории Российской Федерации (ч. 5 ст. 18 152-ФЗ), уточнение (обновление, изменение), использование, блокирование, удаление, уничтожение.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">4. Срок действия и порядок отзыва</h2>
            <p>
              Согласие действует до достижения целей обработки либо до момента его отзыва. Согласие может быть отозвано в любой момент путем направления письма на электронную почту: <strong>{COMPANY_CONFIG.email}</strong>.
            </p>
          </section>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Оператор: ООО «Окна-Центр» (ИНН 2543168553)</span>
            <Link href="/privacy" className="text-blue-600 underline font-medium">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
