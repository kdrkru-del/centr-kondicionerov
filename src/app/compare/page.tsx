import React from 'react';
import { Metadata } from 'next';
import { CompareClient } from './CompareClient';

export const metadata: Metadata = {
  title: 'Сравнение кондиционеров во Владивостоке | Центр Кондиционеров',
  description: 'Сравнение характеристик, цен и комплектаций сплит-систем во Владивостоке. Помощь в выборе подходящей модели для квартиры или дома.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: '/compare'
  }
};

export default function ComparePage() {
  return <CompareClient />;
}
