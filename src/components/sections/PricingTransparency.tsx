import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { CreditCard, Check, ArrowRight } from 'lucide-react';
import { COMPANY_CONFIG } from '@/config/company';

interface PricingTransparencyProps {
  products: Product[];
}

export const PricingTransparency: React.FC<PricingTransparencyProps> = ({ products }) => {
  // Find Dahatsu Legend 07 as the real reference product
  const referenceProduct = products.find((p) => p.slug === 'dahatsu-legend-07') || products[0];

  const priceDevice = referenceProduct?.price !== null && referenceProduct?.price !== undefined
    ? `${new Intl.NumberFormat('ru-RU').format(referenceProduct.price)} ₽`
    : null;

  const priceTotal = referenceProduct?.priceWithInstallation !== null && referenceProduct?.priceWithInstallation !== undefined
    ? `${new Intl.NumberFormat('ru-RU').format(referenceProduct.priceWithInstallation)} ₽`
    : null;

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <CreditCard className="w-3.5 h-3.5" />
            <span>Прозрачные цены</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Понятное отображение стоимости
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            В каталоге отображается стоимость оборудования отдельно и стоимость «под ключ» с установкой.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left explanation */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Пример расчёта</span>
              <h3 className="text-xl font-black text-slate-900 mt-1 mb-2">
                {referenceProduct?.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                Настенная сплит-система для помещения {referenceProduct?.area ? `до ${referenceProduct.area} м²` : ''}. Цены зафиксированы в подтверждённом каталоге.
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{COMPANY_CONFIG.paymentTerms}</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{COMPANY_CONFIG.warrantyText}</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Работаем во Владивостоке, Артёме и Уссурийске</span>
                </div>
              </div>
            </div>

            {/* Right price block */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              {priceDevice && (
                <div className="pb-4 border-b border-slate-100">
                  <div className="text-xs text-slate-400">Стоимость сплит-системы:</div>
                  <div className="text-2xl font-black text-slate-800">{priceDevice}</div>
                </div>
              )}

              {priceTotal && (
                <div>
                  <div className="text-xs text-blue-600 font-semibold">Итого с установкой:</div>
                  <div className="text-3xl font-black text-blue-600">{priceTotal}</div>
                </div>
              )}

              <div className="pt-2">
                <Link
                  href={`/catalog/${referenceProduct?.slug || ''}`}
                  className="w-full inline-flex items-center justify-center space-x-2 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-semibold transition"
                >
                  <span>Перейти к товару</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
