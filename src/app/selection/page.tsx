import React from 'react';
import { Metadata } from 'next';
import { SelectionClient } from './SelectionClient';

export const metadata: Metadata = {
  title: 'Подбор кондиционера по площади за 30 секунд во Владивостоке | Центр Кондиционеров',
  description:
    'Интерактивный мастер подбора кондиционера для квартиры, дома или офиса во Владивостоке. Расчёт мощности, честные цены на сплит-системы MDV, Amston, Dahatsu, Hunberg с установкой под ключ.',
  alternates: {
    canonical: '/selection'
  },
  openGraph: {
    title: 'Подбор кондиционера за 30 секунд | Центр Кондиционеров',
    description: 'Интерактивный мастер подбора сплит-системы под площадь и тип помещения во Владивостоке.',
    url: 'https://кондиционеры-владивосток.рф/selection',
    type: 'website'
  }
};

export default function SelectionPage() {
  return <SelectionClient />;
}
