'use client';

import React from 'react';
import { Wrench } from 'lucide-react';
import { Product } from '@/types';
import { useModal } from '@/components/providers/ModalProvider';

interface InstallationIncludedProps {
  product?: Product;
}

export const InstallationIncluded: React.FC<InstallationIncludedProps> = ({ product }) => {
  const { openModal } = useModal();

  const formatPrice = (val: number) =>
    new Intl.NumberFormat('ru-RU').format(val);

  const handleOpen = () => {
    if (product) {
      openModal(
        `Установка: ${product.name}`,
        'Блок «Установка кондиционера»',
        {
          id: product.id,
          slug: product.slug,
          itemType: product.itemType,
          brand: product.brand,
          series: product.series,
          model: product.model,
          name: product.name,
          price: product.price,
          priceFrom: product.priceFrom,
          priceWithInstallation: product.priceWithInstallation,
          image: product.image,
          sourcePage: `/catalog/${product.slug}`
        }
      );
    } else {
      openModal(
        'Установка кондиционера',
        'Блок «Установка кондиционера»'
      );
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-slate-50/70 border-t border-slate-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1 rounded-full inline-block mb-3">
          Монтажные работы
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
          Установка кондиционера
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-xl mx-auto leading-relaxed">
          Условия и стоимость установки зависят от объекта и выбранного оборудования.
        </p>

        {product?.priceWithInstallation && (
          <div className="mt-6 inline-flex items-center gap-2 bg-blue-50/90 border border-blue-200/80 rounded-2xl px-5 py-3 text-sm font-semibold text-[#0B1F33]">
            <Wrench className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              {product.shortName || product.name}:{' '}
              <b className="text-blue-600 text-base font-black">
                {formatPrice(product.priceWithInstallation)} ₽ с установкой
              </b>
            </span>
          </div>
        )}

        <div className="mt-8">
          <button
            type="button"
            onClick={handleOpen}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold rounded-2xl shadow-lg shadow-blue-500/25 transition text-sm sm:text-base min-h-[48px]"
          >
            <Wrench className="w-4 h-4" />
            <span>Уточнить условия установки</span>
          </button>
        </div>
      </div>
    </section>
  );
};
