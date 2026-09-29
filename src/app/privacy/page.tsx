import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { COMPANY_CONFIG } from '@/config/company';
import { ShieldCheck, ArrowLeft, Lock, FileText, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности и обработки персональных данных | Центр Кондиционеров',
  description: 'Официальная политика обработки и защиты персональных данных пользователей сайта компании Центр Кондиционеров (Владивосток) в соответствии с ФЗ №152-ФЗ.',
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
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
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
                Редакция от {new Date().getFullYear()} г. | Соответствует требованиям Федерального закона РФ № 152-ФЗ «О персональных данных»
              </p>
            </div>
          </div>

          <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100 flex items-start space-x-3 text-xs sm:text-sm text-slate-700">
            <Lock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <p>
              Настоящая Политика определяет порядок и условия обработки персональных данных, собираемых через сайт{' '}
              <span className="font-semibold text-slate-900">центр-кондиционеров.рф</span>, а также устанавливает меры по обеспечению безопасности и защите конфиденциальной информации наших клиентов.
            </p>
          </div>
        </div>

        {/* Content Block */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200/80 prose prose-slate max-w-none text-xs sm:text-sm text-slate-600 leading-relaxed space-y-6">
          
          <section>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2 mb-3">
              <span>1. Общие положения</span>
            </h2>
            <p>
              1.1. Настоящая Политика в отношении обработки персональных данных (далее — «Политика») подготовлена в строгом соответствии с п. 2 ч. 1 ст. 18.1 Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» и действует в отношении всей информации, которую компания «Центр Кондиционеров» (далее — «Оператор») может получить о Пользователе во время использования им интернет-сайта{' '}
              <a href="https://центр-кондиционеров.рф" className="text-blue-600 font-medium hover:underline">
                https://центр-кондиционеров.рф
              </a>.
            </p>
            <p>
              1.2. Использование сервисов сайта, отправка контактных форм, заявок на расчет стоимости, обратного звонка и консультацию означает безоговорочное согласие Пользователя с настоящей Политикой и указанными в ней условиями обработки его персональных данных. В случае несогласия с этими условиями Пользователь должен воздержаться от использования форм обратной связи на сайте.
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2 mb-3">
              <span>2. Основные понятия</span>
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Персональные данные</strong> — любая информация, относящаяся прямо или косвенно к определенному или определяемому физическому лицу (субъекту персональных данных).
              </li>
              <li>
                <strong>Оператор</strong> — компания «Центр Кондиционеров», самостоятельно организующая и осуществляющая обработку персональных данных, а также определяющая цели обработки, состав данных и действия, совершаемые с ними.
              </li>
              <li>
                <strong>Обработка персональных данных</strong> — любое действие (операция) или совокупность действий, совершаемых с использованием средств автоматизации или без таковых, включая сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу, обезличивание, блокирование, удаление и уничтожение.
              </li>
              <li>
                <strong>Конфиденциальность персональных данных</strong> — обязательное для соблюдения Оператором требование не допускать распространения персональных данных без согласия субъекта или наличия иного законного основания.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2 mb-3">
              <span>3. Состав обрабатываемых персональных данных</span>
            </h2>
            <p>
              3.1. Оператор обрабатывает следующие категории данных, предоставляемых Пользователем добровольно при заполнении форм на сайте:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Имя Пользователя или контактного лица;</li>
              <li>Номер контактного мобильного/городского телефона;</li>
              <li>Адрес электронной почты (e-mail), если указан Пользователем;</li>
              <li>Адрес предполагаемого объекта монтажа оборудования (город, улица, дом/квартира);</li>
              <li>Технические характеристики помещения (площадь, тип стен, этажность), необходимые для расчета требуемой мощности оборудования.</li>
            </ul>
            <p>
              3.2. На сайте также осуществляется сбор и обработка обезличенных данных о посетителях (в т.ч. файлов «cookie», IP-адрес, данные об операционной системе и браузере) с помощью сервисов интернет-статистики (Яндекс.Метрика и др.) в целях оптимизации работы интерфейса и анализа посещаемости.
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2 mb-3">
              <span>4. Цели обработки персональных данных</span>
            </h2>
            <p>
              Обработка персональных данных Пользователя ограничивается достижением конкретных, заранее определенных и законных целей:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Предоставление персональной консультации по подбору климатического оборудования;</li>
              <li>Точный инженерный расчет мощности сплит-систем и сметной стоимости монтажных работ;</li>
              <li>Согласование времени выезда инженера-замерщика и монтажной бригады;</li>
              <li>Исполнение договоров поставки, монтажа и гарантийного сервисного обслуживания техники;</li>
              <li>Обратная связь с клиентом для контроля качества выполненных работ и оперативного сервиса.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2 mb-3">
              <span>5. Порядок сбора, хранения и защиты данных</span>
            </h2>
            <p>
              5.1. Безопасность персональных данных, обрабатываемых Оператором, обеспечивается путем реализации правовых, организационных и технических мер, необходимых для выполнения в полном объеме требований действующего законодательства РФ в области защиты информации.
            </p>
            <p>
              5.2. Оператор гарантирует сохранность персональных данных и принимает все возможные меры, исключающие доступ к персональным данным неуполномоченных лиц.
            </p>
            <p>
              5.3. <strong>Персональные данные Пользователя ни при каких условиях не передаются третьим лицам</strong>, сторонним рекламным сетям или маркетинговым брокерам, за исключением случаев, предусмотренных требованиями законодательства РФ либо при непосредственной передаче адреса доставки штатной сервисно-монтажной службе для выполнения заказа.
            </p>
            <p>
              5.4. Срок обработки персональных данных является неограниченным до момента отзыва согласия Пользователем. Хранение осуществляется в защищенных базах данных на территории Российской Федерации.
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2 mb-3">
              <span>6. Права Пользователя и отзыв согласия</span>
            </h2>
            <p>
              6.1. Пользователь имеет право на получение информации, касающейся обработки его персональных данных, требовать их уточнения, блокирования или уничтожения в случае, если данные являются неполными, устаревшими или неточными.
            </p>
            <p>
              6.2. Пользователь может в любой момент отозвать свое согласие на обработку персональных данных, направив соответствующее уведомление Оператору по электронной почте{' '}
              <a href={`mailto:${COMPANY_CONFIG.email}`} className="text-blue-600 font-semibold underline">
                {COMPANY_CONFIG.email}
              </a>{' '}
              с пометкой «Отзыв согласия на обработку персональных данных» или позвонив по номеру {COMPANY_CONFIG.phones.primary.formatted}.
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2 mb-3">
              <span>7. Файлы Cookie и аналитика</span>
            </h2>
            <p>
              Сайт использует технологию cookie для улучшения взаимодействия с Пользователем и повышения удобства навигации. Пользователь может в любой момент отключить сохранение cookie в настройках своего браузера, однако это может ограничить работоспособность отдельных интерактивных элементов сайта.
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2 mb-3">
              <span>8. Контактные данные Оператора</span>
            </h2>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-2">
              <p><strong>Наименование:</strong> Служба климатического оборудования «Центр Кондиционеров»</p>
              <p><strong>Регион обслуживания:</strong> г. Владивосток, Артем, Уссурийск, Надеждинский район и Приморский край</p>
              <p>
                <strong>Телефон для справок:</strong>{' '}
                <a href={COMPANY_CONFIG.phones.primary.tel} className="text-blue-600 font-semibold hover:underline">
                  {COMPANY_CONFIG.phones.primary.formatted}
                </a>{' '}
                / {COMPANY_CONFIG.phones.mobile.formatted}
              </p>
              <p>
                <strong>Электронная почта:</strong>{' '}
                <a href={`mailto:${COMPANY_CONFIG.email}`} className="text-blue-600 font-semibold hover:underline">
                  {COMPANY_CONFIG.email}
                </a>
              </p>
              <p><strong>Режим работы:</strong> Ежедневно с 8:00 до 21:00 (без выходных)</p>
            </div>
          </section>

        </div>

        {/* Bottom Back Button */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Вернуться на сайт центр-кондиционеров.рф</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
