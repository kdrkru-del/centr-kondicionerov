import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PRODUCTS } from '@/data/products';
import { BRANDS } from '@/data/brands';
import { StructuredData } from '@/components/seo/StructuredData';
import { ProductDetailClient } from './ProductDetailClient';
import { BrandDetailClient } from '@/components/catalog/BrandDetailClient';
import { Product } from '@/types';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const productParams = PRODUCTS.map((p) => ({ slug: p.slug }));
  const brandParams = BRANDS.map((b) => ({ slug: b.slug }));
  return [...productParams, ...brandParams];
}

// Automatic similarity scoring for similar products
function getSimilarProducts(currentProduct: Product, allProducts: Product[]): Product[] {
  const others = allProducts.filter((p) => p.id !== currentProduct.id);

  const scored = others.map((p) => {
    let score = 0;
    // 1. Same brand (+3)
    if (p.brand === currentProduct.brand) score += 3;
    // 2. Same compressor type (+2)
    if (p.compressorType === currentProduct.compressorType) score += 2;

    // 3. Similar room area (+3 if diff <= 10m2)
    const pArea = p.area ?? p.areaMax ?? p.areaMin;
    const curArea = currentProduct.area ?? currentProduct.areaMax ?? currentProduct.areaMin;
    if (pArea && curArea && Math.abs(pArea - curArea) <= 10) {
      score += 3;
    }

    // 4. Similar price range (+2 if diff <= 15000)
    const pPrice = p.priceWithInstallation ?? p.price;
    const curPrice = currentProduct.priceWithInstallation ?? currentProduct.price;
    if (pPrice && curPrice && Math.abs(pPrice - curPrice) <= 15000) {
      score += 2;
    }

    return { product: p, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 4).map((item) => item.product);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lowerSlug = slug.toLowerCase();

  // 1. Check if slug is a Brand
  const brand = BRANDS.find((b) => b.slug === lowerSlug);
  if (brand) {
    return {
      title: `Кондиционеры ${brand.name} во Владивостоке — купить с установкой | Центр Кондиционеров`,
      description: `Сплит-системы ${brand.name} во Владивостоке, Артёме и Уссурийске. Продажа с гарантией до 4 лет и профессиональным монтажом. Актуальные цены и наличие.`,
      alternates: {
        canonical: `/catalog/${brand.slug}`
      },
      openGraph: {
        title: `Кондиционеры ${brand.name} с установкой во Владивостоке`,
        description: brand.description,
        type: 'website'
      }
    };
  }

  // 2. Check if slug is a Product
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return { title: 'Кондиционер не найден' };

  const areaPart = product.area
    ? ` для помещений до ${product.area} м²`
    : product.seriesAreaRange
    ? ` (${product.seriesAreaRange.replace('кв.м', 'м²')})`
    : '';

  const metaDescription = `${product.name}${areaPart}. Продажа, доставка и профессиональный монтаж во Владивостоке, Артёме и Уссурийске. Гарантия до 4 лет.`;

  return {
    title: `${product.name} во Владивостоке — купить с установкой | Центр Кондиционеров`,
    description: metaDescription,
    alternates: {
      canonical: `/catalog/${product.slug}`
    },
    openGraph: {
      title: `${product.name} с установкой во Владивостоке`,
      description: metaDescription,
      images: [{ url: product.image }]
    }
  };
}

export default async function CatalogSlugPage({ params }: Props) {
  const { slug } = await params;
  const lowerSlug = slug.toLowerCase();

  // 1. If slug matches a Brand: render BrandDetailClient
  const brand = BRANDS.find((b) => b.slug === lowerSlug);
  if (brand) {
    const brandProducts = PRODUCTS.filter(
      (p) => p.brand.toLowerCase() === brand.name.toLowerCase()
    );
    return <BrandDetailClient brand={brand} products={brandProducts} />;
  }

  // 2. If slug matches a Product: render ProductDetailClient
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (product) {
    const similarProducts = getSimilarProducts(product, PRODUCTS);
    const breadcrumbs = [
      { name: 'Главная', url: '/' },
      { name: 'Каталог', url: '/catalog' },
      { name: product.brand, url: `/catalog/${product.brand.toLowerCase()}` },
      { name: product.shortName || product.name, url: `/catalog/${product.slug}` }
    ];

    return (
      <>
        <StructuredData type="breadcrumbs" breadcrumbs={breadcrumbs} />
        <StructuredData type="product" product={product} />
        <ProductDetailClient product={product} similarProducts={similarProducts} />
      </>
    );
  }

  // Neither brand nor product
  notFound();
}
