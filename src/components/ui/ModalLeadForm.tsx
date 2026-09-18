'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ModalProductData } from '@/components/providers/ModalProvider';
import { Wrench } from 'lucide-react';

interface ModalLeadFormProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  productName?: string;
  source?: string;
  city?: string;
  productData?: ModalProductData | null;
}

export const ModalLeadForm: React.FC<ModalLeadFormProps> = ({
  isOpen,
  onClose,
  title = 'Подбор кондиционера с установкой',
  subtitle = 'Оставьте контакты — специалист уточнит детали помещения и назовёт точную фиксированную стоимость под ключ.',
  productName = '',
  source = 'Кнопка на сайте',
  city = 'Владивосток',
  productData = null
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
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
          productName: productData?.name || productName,
          productId: productData?.id,
          slug: productData?.slug,
          itemType: productData?.itemType,
          brand: productData?.brand,
          series: productData?.series,
          model: productData?.model,
          price: productData?.price,
          priceWithInstallation: productData?.priceWithInstallation,
          sourcePage: productData?.sourcePage,
          source,
          city
        })
      });

      if (!res.ok) {
        throw new Error('Ошибка отправки');
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

  const formattedPrice = productData?.priceWithInstallation
    ? `${new Intl.NumberFormat('ru-RU').format(productData.priceWithInstallation)} ₽ с монтажом`
    : productData?.price
    ? `${productData.priceFrom ? 'от ' : ''}${new Intl.NumberFormat('ru-RU').format(productData.price)} ₽`
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1F33]/70 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Закрыть модальное окно"
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {isSuccess ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Заявка принята!</h3>
            <p className="text-slate-600 mb-6 text-sm sm:text-base leading-relaxed">
              Спасибо за обращение! Наш специалист уже получил уведомление и свяжется с вами в течение 10 минут.
            </p>
            <div className="bg-slate-50 p-4 rounded-2xl text-left text-xs sm:text-sm text-slate-600 mb-6">
              <div className="font-semibold text-slate-800 mb-1">Что произойдет дальше:</div>
              <ul className="space-y-1 list-disc list-inside">
                <li>Уточним площадь и особенности комнаты</li>
                <li>Рассчитаем и зафиксируем итоговую стоимость</li>
                <li>Согласуем удобное время монтажа</li>
              </ul>
            </div>
            <button
              onClick={() => {
                setIsSuccess(false);
                setName('');
                setPhone('');
                onClose();
              }}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition shadow-lg shadow-blue-500/25"
            >
              Отлично, понятно
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
                {productData ? 'Заказ с установкой' : 'Бесплатная консультация'}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {title}
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-relaxed">
                {subtitle}
              </p>
            </div>

            {/* Product card preview */}
            {productData && (
              <div className="bg-slate-50 rounded-2xl p-3.5 mb-4 border border-slate-200/80 flex items-center space-x-3.5">
                {productData.image && (
                  <div className="relative w-16 h-12 shrink-0 bg-white rounded-xl border border-slate-200/60 p-1 flex items-center justify-center">
                    <Image
                      src={productData.image}
                      alt={productData.name || 'Кондиционер'}
                      fill
                      className="object-contain p-0.5"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-1.5 mb-0.5">
                    <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                      {productData.brand}
                    </span>
                    <span className="text-xs text-slate-500 truncate">
                      {productData.model}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {productData.name}
                  </div>
                  {formattedPrice && (
                    <div className="text-xs font-extrabold text-blue-600 mt-0.5">
                      {formattedPrice}
                    </div>
                  )}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Номер телефона <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full px-4 py-3 text-sm sm:text-base bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-slate-900 font-medium"
                />
                {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ваше имя <span className="text-slate-400 font-normal">(необязательно)</span>
                </label>
                <input
                  type="text"
                  autoComplete="name"
                  placeholder="Как к вам обращаться?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-slate-900"
                />
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold rounded-xl transition shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2 disabled:opacity-70 text-sm sm:text-base"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                      </svg>
                      Отправка...
                    </span>
                  ) : (
                    <span>Заказать с установкой</span>
                  )}
                </button>
              </div>

              <p className="text-center text-[11px] text-slate-400 leading-tight pt-1">
                Оплата после выполнения работ. Отправляя заявку, вы соглашаетесь с{' '}
                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  политикой конфиденциальности
                </a>.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
