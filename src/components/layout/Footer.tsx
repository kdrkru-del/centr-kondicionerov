import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-28 md:pb-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: About company */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center space-x-3 focus:outline-none group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-sky-500 to-cyan-400 p-[1px] shadow-lg shadow-blue-500/20 group-hover:scale-105 transition duration-300">
                <div className="w-full h-full bg-[#0B1528] rounded-[11px] flex items-center justify-center">
                  <svg className="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04" />
                    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className="text-base font-black text-white tracking-tight leading-none">
                    ЦЕНТР
                  </span>
                  <span className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400 tracking-tight leading-none">
                    КОНДИЦИОНЕРОВ
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 tracking-wider font-semibold uppercase mt-0.5">
                  Климатические системы и монтаж
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Специализированный центр климатической техники. Продажа, профессиональный чистый монтаж и сервисное обслуживание настенных сплит-систем во Владивостоке, Артёме и Уссурийске.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800/80 rounded-lg text-xs text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Гарантия до 4 лет</span>
              </div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800/80 rounded-lg text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                <span>0 ₽ предоплата за работу</span>
              </div>
            </div>
          </div>

          {/* Col 2: Каталог брендов */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Бренды в наличии
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/catalog/mdv" className="hover:text-blue-400 transition">
                  Кондиционеры MDV
                </Link>
              </li>
              <li>
                <Link href="/catalog/amston" className="hover:text-blue-400 transition">
                  Кондиционеры AMSTON
                </Link>
              </li>
              <li>
                <Link href="/catalog/dahatsu" className="hover:text-blue-400 transition">
                  Кондиционеры DAHATSU
                </Link>
              </li>
              <li>
                <Link href="/catalog/hunberg" className="hover:text-blue-400 transition">
                  Кондиционеры HUNBERG
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="text-blue-400 hover:underline inline-block pt-1">
                  Весь каталог →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Города обслуживания */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Города работы
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-blue-400 transition">
                  Владивосток и пригород
                </Link>
              </li>
              <li>
                <Link href="/artem" className="hover:text-blue-400 transition">
                  Артём и пос. Угловое
                </Link>
              </li>
              <li>
                <Link href="/ussuriysk" className="hover:text-blue-400 transition">
                  Уссурийск
                </Link>
              </li>
              <li>
                <a href="#installation" className="hover:text-blue-400 transition">
                  Условия и цены монтажа
                </a>
              </li>
              <li>
                <a href="#warranty" className="hover:text-blue-400 transition">
                  Гарантийные обязательства
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Контакты */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Связь с нами
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="tel:+74232761161"
                  className="text-white font-bold hover:text-blue-400 flex items-center space-x-2 transition"
                >
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>+7 (4232) 76-11-61</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+79147061161"
                  className="hover:text-blue-400 flex items-center space-x-2 transition"
                >
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span>+7 (914) 706-11-61</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:centrkondicionerov@gmail.com"
                  className="hover:text-blue-400 flex items-center space-x-2 transition text-xs"
                >
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>centrkondicionerov@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start space-x-2 text-xs">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>г. Владивосток, склад и монтажная служба</span>
              </li>
              <li className="flex items-center space-x-2 text-xs">
                <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                <span>Работаем без выходных</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row: copyright & requisites */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Центр Кондиционеров. Все права защищены. Продажа и установка климатической техники во Владивостоке.
          </div>
          <div className="flex flex-wrap gap-4">
            <span>ОГРНИП / ИНН компании</span>
            <span>Политика конфиденциальности</span>
            <span>Не является публичной офертой</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
