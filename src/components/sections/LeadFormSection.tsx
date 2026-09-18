'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { COMPANY_CONFIG } from '@/config/company';

export const LeadFormSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (!digits) return '';
    let res = '+7 ';
    const clean = digits.startsWith('7') || digits.startsWith('8') ? digits.slice(1) : digits;
    if (clean.length > 0) res += '(' + clean.substring(0, 3);
    if (clean.length >= 3) res += ') ' + clean.substring(3, 6);
    if (clean.length >= 6) res += '-' + clean.substring(6, 8);
    if (clean.length >= 8) res += '-' + clean.substring(8, 10);
    return res;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) {
      setError('Пожалуйста, введите корректный номер телефона');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim() || undefined,
          phone,
          type: 'home-selection',
          sourcePage: '/',
          source: 'Финальная форма на главной'
        })
      });

      if (!res.ok) {
        throw new Error('Ошибка сервера при отправке заявки');
      }

      setIsSuccess(true);
      if (typeof window !== 'undefined' && (window as any).ym) {
        (window as any).ym(101376260, 'reachGoal', 'lead_submit');
      }
    } catch {
      setError('Не удалось отправить заявку. Пожалуйста, позвоните нам напрямую или попробуйте снова.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacts" className="py-16 sm:py-24 bg-slate-50/70 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Contact Information & Messengers */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold rounded-full uppercase tracking-wider">
                  Контакты и заказ
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-3 mb-4">
                  {COMPANY_CONFIG.name}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-8">
                  Подберём сплит-систему под параметры помещения, назовём итоговую цену под ключ и согласуем удобное время выезда.
                </p>

                <div className="space-y-4 text-sm">
                  <div>
                    <div className="text-xs text-slate-400">Основной телефон:</div>
                    <a
                      href={COMPANY_CONFIG.phones.primary.tel}
                      className="text-lg font-black text-white hover:text-blue-400 flex items-center space-x-2 transition mt-0.5"
                    >
                      <Phone className="w-4 h-4 text-blue-400" />
                      <span>{COMPANY_CONFIG.phones.primary.formatted}</span>
                    </a>
                  </div>

                  <div>
                    <div className="text-xs text-slate-400">Мобильный / WhatsApp:</div>
                    <a
                      href={COMPANY_CONFIG.phones.mobile.tel}
                      className="text-base font-bold text-white hover:text-blue-400 flex items-center space-x-2 transition mt-0.5"
                    >
                      <Phone className="w-4 h-4 text-slate-400" />
                      <span>{COMPANY_CONFIG.phones.mobile.formatted}</span>
                    </a>
                  </div>

                  <div>
                    <div className="text-xs text-slate-400">Электронная почта:</div>
                    <a
                      href={`mailto:${COMPANY_CONFIG.email}`}
                      className="text-sm text-slate-200 hover:text-blue-400 flex items-center space-x-2 transition mt-0.5"
                    >
                      <Mail className="w-4 h-4 text-blue-400" />
                      <span>{COMPANY_CONFIG.email}</span>
                    </a>
                  </div>

                  <div className="pt-2">
                    <div className="text-xs text-slate-400">Города выезда:</div>
                    <div className="font-semibold text-white flex items-center space-x-2 mt-0.5">
                      <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>{COMPANY_CONFIG.citiesListText}</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-400">Режим работы:</div>
                    <div className="font-semibold text-white flex items-center space-x-2 mt-0.5">
                      <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>{COMPANY_CONFIG.workingHours.full}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messengers buttons */}
              <div className="pt-8 border-t border-slate-700/80 mt-8">
                <div className="text-xs text-slate-400 mb-3">Быстрая связь в мессенджерах:</div>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={COMPANY_CONFIG.messengers.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="py-3 px-4 bg-emerald-600/90 hover:bg-emerald-600 rounded-xl font-bold text-xs text-white flex items-center justify-center space-x-2 transition"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={COMPANY_CONFIG.messengers.telegram}
                    target="_blank"
                    rel="noreferrer"
                    className="py-3 px-4 bg-sky-600/90 hover:bg-sky-600 rounded-xl font-bold text-xs text-white flex items-center justify-center space-x-2 transition"
                  >
                    <Send className="w-4 h-4" />
                    <span>Telegram</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Conversion Form - Strictly Name + Phone */}
            <div className="lg:col-span-7 p-8 sm:p-12">
              {isSuccess ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">
                    Спасибо! Ваша заявка принята
                  </h3>
                  <p className="text-slate-600 max-w-md mx-auto text-sm sm:text-base mb-6 leading-relaxed">
                    Мы свяжемся с вами по указанному номеру, уточним детали помещения и ответим на все вопросы.
                  </p>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setName('');
                      setPhone('');
                    }}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl text-sm hover:bg-blue-700 transition"
                  >
                    Отправить еще одну заявку
                  </button>
                </div>
              ) : (
                <div>
                  <div className="mb-8">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                      Быстрая заявка
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                      Подберём кондиционер под ваше помещение
                    </h3>
                    <p className="text-slate-500 text-sm mt-1.5 leading-relaxed">
                      Оставьте номер телефона — перезвоним, проконсультируем и зафиксируем точную цену оборудования с установкой.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Ваше имя <span className="text-slate-400 font-normal lowercase">(необязательно)</span>
                      </label>
                      <input
                        type="text"
                        autoComplete="name"
                        placeholder="Как к вам обращаться?"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Номер телефона <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        required
                        placeholder="+7 (___) ___-__-__"
                        value={phone}
                        onChange={(e) => setPhone(formatPhone(e.target.value))}
                        className="w-full px-4 py-3.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-slate-900 font-medium"
                      />
                      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold rounded-xl text-base transition shadow-xl shadow-blue-500/25 flex items-center justify-center space-x-2 disabled:opacity-70 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <span>Отправка заявки...</span>
                        ) : (
                          <span>Отправить заявку</span>
                        )}
                      </button>
                    </div>

                    <div className="pt-2 flex flex-col items-center justify-center space-y-1 text-xs text-slate-400 text-center">
                      <div className="flex items-center space-x-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{COMPANY_CONFIG.paymentTerms}.</span>
                      </div>
                      <div>
                        Нажимая кнопку, вы соглашаетесь с{' '}
                        <a href="/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                          политикой конфиденциальности
                        </a>.
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
