'use client';

import React from 'react';
import { PRODUCTS } from '@/data/products';
import { useModal } from '@/components/providers/ModalProvider';
import { Hero } from '@/components/sections/Hero';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { AreaSelector } from '@/components/sections/AreaSelector';
import { PopularProducts } from '@/components/sections/PopularProducts';
import { HomeCtaBanner } from '@/components/sections/HomeCtaBanner';
import { BrandsSection } from '@/components/sections/BrandsSection';
import { SelectionTeaser } from '@/components/sections/SelectionTeaser';
import { PricingTransparency } from '@/components/sections/PricingTransparency';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { WarrantySection } from '@/components/sections/WarrantySection';
import { FaqSection } from '@/components/sections/FaqSection';
import { LeadFormSection } from '@/components/sections/LeadFormSection';
import { Product } from '@/types';

export default function HomePage() {
  const { openModal } = useModal();

  const handleOrderInstall = (product: Product) => {
    const priceText = product.priceWithInstallation
      ? `${new Intl.NumberFormat('ru-RU').format(product.priceWithInstallation)} ₽ с монтажом`
      : product.price
      ? `${new Intl.NumberFormat('ru-RU').format(product.price)} ₽`
      : 'по запросу';

    openModal(`${product.name} (${priceText})`, 'Карточка товара на главной');
  };

  const handleCheckFit = (product: Product) => {
    openModal(
      `Подойдет ли модель: ${product.name}`,
      'Вопрос по совместимости на главной'
    );
  };

  return (
    <div className="w-full">
      {/* 1. Hero with confirmed H1 and 3 clear CTAs */}
      <Hero onOpenModal={(prod, src) => openModal(prod, src)} />

      {/* 2. Trust strip (Гарантия до 4 лет, Без выходных, Оплата по факту, 3 города) */}
      <TrustStrip />

      {/* 3. Area Selector (6 confirmed ranges, max 3 cards preview, catalog link) */}
      <AreaSelector
        products={PRODUCTS}
        onOrderInstall={handleOrderInstall}
        onCheckFit={handleCheckFit}
      />

      {/* 4. Popular products (confirmed hits only) */}
      <PopularProducts
        products={PRODUCTS}
        onOrderInstall={handleOrderInstall}
        onCheckFit={handleCheckFit}
      />

      {/* 5. Mid-page CTA */}
      <HomeCtaBanner onOpenModal={(prod, src) => openModal(prod, src)} />

      {/* 6. Confirmed Brands */}
      <BrandsSection />

      {/* 7. Selection Teaser (3-step preview linking to /selection) */}
      <SelectionTeaser />

      {/* 8. Pricing transparency (Dahatsu Legend 07 calculation example) */}
      <PricingTransparency products={PRODUCTS} />

      {/* 9. 5-step process */}
      <HowItWorks />

      {/* 10. Comprehensive warranty */}
      <WarrantySection />

      {/* 11. FAQ */}
      <FaqSection />

      {/* 12. Final lead form */}
      <LeadFormSection />
    </div>
  );
}
