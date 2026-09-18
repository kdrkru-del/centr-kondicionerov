import React from 'react';
import { Metadata } from 'next';
import { CITIES } from '@/data/cities';
import { PRODUCTS } from '@/data/products';
import { CityPageTemplate } from '@/components/geo/CityPageTemplate';

const city = CITIES.ussuriysk;

export const metadata: Metadata = {
  title: city.title,
  description: city.description,
  alternates: {
    canonical: '/ussuriysk'
  }
};

export default function UssuriyskPage() {
  return <CityPageTemplate city={city} products={PRODUCTS} />;
}
